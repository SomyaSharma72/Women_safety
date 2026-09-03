import { IncidentReport, CaseStatus, IccUser } from '../types';

const SURVIVOR_TOKEN_KEY = 'safereport_survivor_token';
const SURVIVOR_EMAIL_KEY = 'safereport_survivor_email';
const ICC_TOKEN_KEY = 'safereport_icc_token';
const ICC_USER_KEY = 'safereport_icc_user';

// ==========================================
// Survivor Session Storage Helpers
// ==========================================
export function getSurvivorToken(): string | null {
  return sessionStorage.getItem(SURVIVOR_TOKEN_KEY) || localStorage.getItem(SURVIVOR_TOKEN_KEY);
}

export function getSurvivorEmail(): string | null {
  return sessionStorage.getItem(SURVIVOR_EMAIL_KEY) || localStorage.getItem(SURVIVOR_EMAIL_KEY);
}

export function setSurvivorSession(token: string, email: string): void {
  sessionStorage.setItem(SURVIVOR_TOKEN_KEY, token);
  sessionStorage.setItem(SURVIVOR_EMAIL_KEY, email);
  localStorage.setItem(SURVIVOR_TOKEN_KEY, token);
  localStorage.setItem(SURVIVOR_EMAIL_KEY, email);
}

export function clearSurvivorSession(): void {
  sessionStorage.removeItem(SURVIVOR_TOKEN_KEY);
  sessionStorage.removeItem(SURVIVOR_EMAIL_KEY);
  localStorage.removeItem(SURVIVOR_TOKEN_KEY);
  localStorage.removeItem(SURVIVOR_EMAIL_KEY);
}

// ==========================================
// ICC Session Storage Helpers
// ==========================================
export function getIccToken(): string | null {
  return sessionStorage.getItem(ICC_TOKEN_KEY) || localStorage.getItem(ICC_TOKEN_KEY);
}

export function getIccUser(): IccUser | null {
  const raw = sessionStorage.getItem(ICC_USER_KEY) || localStorage.getItem(ICC_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setIccSession(token: string, user: IccUser): void {
  sessionStorage.setItem(ICC_TOKEN_KEY, token);
  sessionStorage.setItem(ICC_USER_KEY, JSON.stringify(user));
  localStorage.setItem(ICC_TOKEN_KEY, token);
  localStorage.setItem(ICC_USER_KEY, JSON.stringify(user));
}

export function clearIccSession(): void {
  sessionStorage.removeItem(ICC_TOKEN_KEY);
  sessionStorage.removeItem(ICC_USER_KEY);
  localStorage.removeItem(ICC_TOKEN_KEY);
  localStorage.removeItem(ICC_USER_KEY);
}

// ==========================================
// API Calls: Survivor Verification & Reports
// ==========================================

export async function sendSurvivorOtp(email: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch('/api/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to send verification code.');
  }
  return data;
}

export async function verifySurvivorOtp(
  email: string,
  otp: string
): Promise<{ success: boolean; verificationToken: string; email: string }> {
  const res = await fetch('/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to verify OTP code.');
  }

  setSurvivorSession(data.verificationToken, data.email);
  return data;
}

export async function submitReport(
  reportData: Partial<IncidentReport>
): Promise<{ success: boolean; report: IncidentReport; message: string }> {
  const token = getSurvivorToken();
  if (!token) {
    throw new Error('Email verification is required before submitting a report.');
  }

  const res = await fetch('/api/reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reportData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to submit report.');
  }

  return data;
}

// ==========================================
// API Calls: ICC Officer Login
// ==========================================

export async function iccLogin(
  email: string,
  password: string
): Promise<{
  success: boolean;
  token: string;
  user: IccUser;
}> {
  const res = await fetch('/api/icc/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'ICC login failed.');
  }

  setIccSession(data.token, data.user);
  return data;
}

export async function iccGetMe(): Promise<IccUser> {
  const token = getIccToken();
  if (!token) throw new Error('Not logged in.');

  const res = await fetch('/api/icc/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    clearIccSession();
    throw new Error(data.error || 'Session invalid.');
  }
  return data.user;
}

export async function iccLogout(): Promise<void> {
  const token = getIccToken();
  if (token) {
    try {
      await fetch('/api/icc/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // ignore
    }
  }
  clearIccSession();
}

// ==========================================
// API Calls: ICC Cases & Status Management
// ==========================================

export async function iccGetCases(): Promise<{
  success: boolean;
  reports: IncidentReport[];
  institution: { id: string; name: string };
  officer: { name: string; role: string };
}> {
  const token = getIccToken();
  if (!token) {
    throw new Error('Unauthorized: Please log in to the ICC Portal.');
  }

  const res = await fetch('/api/icc/cases', {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      clearIccSession();
    }
    throw new Error(data.error || 'Failed to load ICC cases.');
  }

  return data;
}

export async function iccGetCase(caseNumber: string): Promise<IncidentReport> {
  const token = getIccToken();
  if (!token) throw new Error('Unauthorized.');

  const res = await fetch(`/api/icc/cases/${caseNumber}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Failed to fetch case ${caseNumber}`);
  }
  return data.report;
}

export async function iccUpdateStatus(
  caseNumber: string,
  status: CaseStatus,
  reviewerNote: string
): Promise<IncidentReport> {
  const token = getIccToken();
  if (!token) throw new Error('Unauthorized.');

  const res = await fetch(`/api/icc/cases/${caseNumber}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, reviewerNote }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update case status.');
  }
  return data.report;
}

// ==========================================
// API Calls: Public Case Tracking
// ==========================================

export async function trackCase(caseNumber: string): Promise<any> {
  const res = await fetch(`/api/cases/track/${encodeURIComponent(caseNumber)}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'No case found with this Case ID.');
  }
  return data.caseData;
}
