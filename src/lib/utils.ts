import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCaseNumber(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `R-${randomDigits}`;
}

export function generatePasskey(): string {
  const words = ['SAFE', 'CARE', 'GUARD', 'TRUST', 'SHIELD', 'VALOR', 'HAVEN', 'LIGHT'];
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${randomWord}-${randomNum}`;
}

export function generateMockHash(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `sha256:7f8e${hex}9a4c82b901ddfa45610`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}
