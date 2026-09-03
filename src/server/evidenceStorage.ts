import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads', 'evidence');

// Ensure uploads directory exists securely
function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

export const ALLOWED_MIME_TYPES = new Set([
  // Images
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/bmp',
  // Audio
  'audio/mpeg',
  'audio/mp3',
  'audio/m4a',
  'audio/wav',
  'audio/ogg',
  'audio/webm',
  'audio/x-m4a',
  // Documents
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

/**
 * Sanitize filename to prevent path traversal and shell injection
 */
export function sanitizeFilename(rawName: string): string {
  if (!rawName) return 'evidence_file';
  // Remove directories and path traversals
  const base = path.basename(rawName);
  // Replace unsafe chars with underscore
  return base.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/^\.+/, '');
}

/**
 * Persist an evidence file to secure server storage
 */
export async function storeEvidenceFile(
  evidenceId: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer
): Promise<{
  id: string;
  fileName: string;
  storageKey: string;
  fileSize: string;
  fileSizeBytes: number;
  mimeType: string;
  encryptedHash: string;
}> {
  ensureUploadsDir();

  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File size (${(buffer.length / (1024 * 1024)).toFixed(1)}MB) exceeds statutory limit of 25MB.`);
  }

  const safeName = sanitizeFilename(fileName);
  const ext = path.extname(safeName) || '.bin';
  const storageKey = `${evidenceId}${ext}`;
  const filePath = path.join(UPLOADS_DIR, storageKey);

  // Compute SHA-256 integrity hash
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');

  console.log(`[Evidence] Writing ${safeName} (${mimeType}), bytes=${buffer.length}, storageKey=${storageKey}.`);
  if (buffer.length === 0) {
    throw new Error('Evidence file is empty before storage.');
  }

  // Write file to disk
  await fs.promises.writeFile(filePath, buffer);
  const storedStats = await fs.promises.stat(filePath);
  console.log(`[Evidence] Stored ${storageKey}, bytes=${storedStats.size}.`);
  if (storedStats.size !== buffer.length) {
    throw new Error('Evidence file size changed during storage.');
  }

  const formattedSize =
    buffer.length > 1024 * 1024
      ? `${(buffer.length / (1024 * 1024)).toFixed(1)} MB`
      : `${(buffer.length / 1024).toFixed(0)} KB`;

  return {
    id: evidenceId,
    fileName: safeName,
    storageKey,
    fileSize: formattedSize,
    fileSizeBytes: buffer.length,
    mimeType,
    encryptedHash: hash,
  };
}

/**
 * Retrieve an evidence file from secure storage
 */
export async function getEvidenceFileBuffer(storageKey: string): Promise<Buffer | null> {
  const safeKey = path.basename(storageKey);
  const filePath = path.join(UPLOADS_DIR, safeKey);
  if (!fs.existsSync(filePath)) {
    console.warn(`[Evidence] File not found for storageKey=${safeKey}.`);
    return null;
  }
  const buffer = await fs.promises.readFile(filePath);
  console.log(`[Evidence] Read ${safeKey}, bytes=${buffer.length}.`);
  return buffer;
}
