import crypto from 'crypto';
import { isMongoConnected } from './db/connection';
import { OtpRecordModel } from './db/models/OtpRecord';
import { SurvivorIdentityModel } from './db/models/SurvivorIdentity';

// Cryptographically secure runtime fallback secret if JWT_SECRET env is not configured
const RUNTIME_GENERATED_JWT_SECRET = crypto.randomBytes(32).toString('hex');
const JWT_SECRET = process.env.JWT_SECRET || RUNTIME_GENERATED_JWT_SECRET;

// In-memory OTP Store fallback: Key -> { otpHash, expiresAt, attempts, verified, type, metadata }
interface OtpEntry {
  otpHash: string;
  expiresAt: number;
  attempts: number;
  verified: boolean;
  type: 'survivor' | 'icc';
  metadata?: Record<string, any>;
}

const otpStore = new Map<string, OtpEntry>();
const rateLimits = new Map<string, number[]>();

export interface SessionPayload {
  userId: string;
  email: string;
  role: 'ICC_ADMIN' | 'SUPER_ADMIN' | 'SURVIVOR';
  institutionId: string;
  institutionName: string;
  name: string;
  issuedAt: number;
  expiresAt: number;
}

const activeSessions = new Map<string, SessionPayload>();

/**
 * Hash helper using HMAC-SHA256
 */
export function hashValue(val: string): string {
  return crypto.createHmac('sha256', JWT_SECRET).update(val.trim()).digest('hex');
}

/**
 * Generate a cryptographically secure random 6-digit numeric OTP using CSPRNG
 */
export function generateOtp(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Check and record rate limits (e.g. max 5 requests per 5 minutes per email/identifier)
 */
export function checkRateLimit(key: string, maxRequests = 5, windowMs = 5 * 60 * 1000): boolean {
  const now = Date.now();
  const normalizedKey = key.toLowerCase().trim();
  const timestamps = rateLimits.get(normalizedKey) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  validTimestamps.push(now);
  rateLimits.set(normalizedKey, validTimestamps);
  return true;
}

/**
 * Store OTP record in MongoDB (with in-memory fallback)
 * - 10-minute expiration
 * - Hashed before storage
 * - Invalidates any previous active OTP for this email and type
 */
export async function saveOtp(
  email: string,
  otp: string,
  type: 'survivor' | 'icc',
  metadata?: Record<string, any>,
  ttlMinutes = 10
): Promise<void> {
  const normalized = email.toLowerCase().trim();
  const otpHash = hashValue(otp);
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
  const storeKey = `${type}:${normalized}`;

  // In-memory fallback
  otpStore.set(storeKey, {
    otpHash,
    expiresAt: expiresAt.getTime(),
    attempts: 0,
    verified: false,
    type,
    metadata,
  });

  // MongoDB persistence
  if (isMongoConnected()) {
    try {
      // Invalidate previous active OTPs for this email and type
      await OtpRecordModel.deleteMany({ email: normalized, type });
      await OtpRecordModel.create({
        email: normalized,
        otpHash,
        type,
        expiresAt,
        attempts: 0,
        verified: false,
        metadata,
      });
    } catch (err) {
      console.error('[MongoDB OTP Save Error]', err);
    }
  }
}

/**
 * Verify OTP against stored hash in MongoDB / memory
 * - Enforces 5-attempt maximum
 * - Single-use (burns OTP record upon successful verification)
 * - Enforces expiration
 */
export async function verifyOtp(
  email: string,
  otp: string,
  expectedType: 'survivor' | 'icc' = 'survivor'
): Promise<{ valid: boolean; error?: string; metadata?: Record<string, any> }> {
  const normalized = email.toLowerCase().trim();
  const candidateHash = hashValue(otp);
  const storeKey = `${expectedType}:${normalized}`;

  if (isMongoConnected()) {
    try {
      const record = await OtpRecordModel.findOne({
        email: normalized,
        type: expectedType,
        expiresAt: { $gt: new Date() },
      }).sort({ createdAt: -1 });

      if (!record) {
        return { valid: false, error: 'Verification code not found or has expired. Please request a new code.' };
      }

      if (record.attempts >= 5) {
        await OtpRecordModel.deleteOne({ _id: record._id });
        return { valid: false, error: 'Maximum verification attempts exceeded (5). Please request a new code.' };
      }

      if (record.otpHash !== candidateHash) {
        record.attempts += 1;
        await record.save();
        const remaining = Math.max(0, 5 - record.attempts);
        return {
          valid: false,
          error: `Invalid verification code. ${remaining} attempt(s) remaining.`,
        };
      }

      // Verified successfully - Burn the OTP so it cannot be reused (Single-Use)
      const metadata = record.metadata;
      await OtpRecordModel.deleteOne({ _id: record._id });

      // If survivor verification, register verified identity status in SurvivorIdentityModel
      if (expectedType === 'survivor') {
        const emailHash = hashValue(normalized);
        const domain = normalized.split('@')[1] ? `@${normalized.split('@')[1]}` : undefined;
        await SurvivorIdentityModel.findOneAndUpdate(
          { email: normalized },
          {
            email: normalized,
            emailHash,
            verificationStatus: 'verified',
            lastVerifiedAt: new Date(),
            institutionDomain: domain,
          },
          { upsert: true, new: true }
        );
      }

      return { valid: true, metadata };
    } catch (err) {
      console.error('[MongoDB OTP Verify Error]', err);
    }
  }

  // Fallback to in-memory store
  const entry = otpStore.get(storeKey);

  if (!entry) {
    return { valid: false, error: 'Verification code not found or has expired. Please request a new code.' };
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(storeKey);
    return { valid: false, error: 'Verification code has expired. Please request a new code.' };
  }

  if (entry.attempts >= 5) {
    otpStore.delete(storeKey);
    return { valid: false, error: 'Maximum verification attempts exceeded (5). Please request a new code.' };
  }

  if (candidateHash !== entry.otpHash) {
    entry.attempts += 1;
    const remaining = Math.max(0, 5 - entry.attempts);
    return {
      valid: false,
      error: `Invalid verification code. ${remaining} attempt(s) remaining.`,
    };
  }

  // Verified - Burn in-memory OTP
  const metadata = entry.metadata;
  otpStore.delete(storeKey);

  return { valid: true, metadata };
}

/**
 * Create a secure session token
 */
export function createSession(payload: Omit<SessionPayload, 'issuedAt' | 'expiresAt'>, ttlHours = 24): string {
  const token = 'sr_sess_' + crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const session: SessionPayload = {
    ...payload,
    issuedAt: now,
    expiresAt: now + ttlHours * 60 * 60 * 1000,
  };
  activeSessions.set(token, session);
  return token;
}

/**
 * Verify and get active session from Bearer token
 */
export function getSession(token: string): SessionPayload | null {
  if (!token) return null;
  const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
  const session = activeSessions.get(cleanToken);

  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(cleanToken);
    return null;
  }

  return session;
}

/**
 * Invalidate a session
 */
export function deleteSession(token: string): void {
  const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
  activeSessions.delete(cleanToken);
}
