import { IncidentReport, CaseStatus, IccUser } from '../types';

const ICC_TOKEN_KEY = 'silentshield_icc_token';
const ICC_USER_KEY = 'silentshield_icc_user';

// ==========================================
// ICC Session Storage Helpers
// ==========================================
export function getIccToken(): string | null {
  return (
    sessionStorage.getItem(ICC_TOKEN_KEY) ||
    localStorage.getItem(ICC_TOKEN_KEY) ||
    sessionStorage.getItem('safereport_icc_token') ||
    localStorage.getItem('safereport_icc_token')
  );
}

export function getIccUser(): IccUser | null {
  const raw =
    sessionStorage.getItem(ICC_USER_KEY) ||
    localStorage.getItem(ICC_USER_KEY) ||
    sessionStorage.getItem('safereport_icc_user') ||
    localStorage.getItem('safereport_icc_user');
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
  sessionStorage.removeItem('safereport_icc_token');
  sessionStorage.removeItem('safereport_icc_user');
  localStorage.removeItem('safereport_icc_token');
  localStorage.removeItem('safereport_icc_user');
}

// ==========================================
// API Calls: Survivor Reports
// ==========================================

export async function submitReport(
  reportData: Partial<IncidentReport>
): Promise<{ success: boolean; report: IncidentReport; message: string }> {
  const res = await fetch('/api/reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

export async function iccGetEvidenceFile(caseNumber: string, evidenceId: string, download = false): Promise<Blob> {
  const token = getIccToken();
  if (!token) throw new Error('Unauthorized.');

  const res = await fetch(
    `/api/icc/cases/${encodeURIComponent(caseNumber)}/evidence/${encodeURIComponent(evidenceId)}/download${download ? '?download=1' : ''}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to access evidence.');
  }

  return res.blob();
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
