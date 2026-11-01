// lib/ai/credential-encryption.ts — Cryptographic Security for AI Credentials
//
// Mandate: Zero plaintext credential storage in database.
// Algorithm: AES-256-GCM with 12-byte random IV and 16-byte authentication tag.
// Server-only boundary: Decrypted keys MUST NEVER leave server context.

import 'server-only';
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96 bits recommended for AES-GCM
const AUTH_TAG_LENGTH = 16;
const CURRENT_KEY_VERSION = 1;

/**
 * Resolves the 32-byte encryption key from AI_ENCRYPTION_MASTER_KEY or derives a fallback.
 */
function getMasterKey(): Buffer {
  const envKey = process.env.AI_ENCRYPTION_MASTER_KEY;
  if (envKey) {
    // If provided as 64-char hex string
    if (/^[0-9a-fA-F]{64}$/.test(envKey)) {
      return Buffer.from(envKey, 'hex');
    }
    // If provided as base64 string
    const b64Buf = Buffer.from(envKey, 'base64');
    if (b64Buf.length === 32) {
      return b64Buf;
    }
    // Otherwise derive 32-byte key using SHA-256
    return crypto.createHash('sha256').update(envKey).digest();
  }

  // Development/fallback: derive from NEXTAUTH_SECRET or a stable deployment salt
  const fallbackSecret = process.env.NEXTAUTH_SECRET || 'kunwar-analytics-ai-master-key-seed-2026';
  return crypto.createHash('sha256').update(fallbackSecret).digest();
}

export interface EncryptedPayload {
  ciphertext: string; // hex
  nonce: string;      // hex (12 bytes)
  authTag: string;    // hex (16 bytes)
  keyVersion: number;
}

/**
 * Encrypts a plaintext secret using AES-256-GCM with a fresh random 12-byte nonce.
 */
export function encryptSecret(plaintext: string): EncryptedPayload {
  if (!plaintext || typeof plaintext !== 'string') {
    throw new Error('Plaintext secret must be a non-empty string');
  }

  const key = getMasterKey();
  const nonce = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, nonce, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: encrypted,
    nonce: nonce.toString('hex'),
    authTag: authTag.toString('hex'),
    keyVersion: CURRENT_KEY_VERSION,
  };
}

/**
 * Decrypts a ciphertext using AES-256-GCM and verifies the authentication tag.
 * Throws if tampering or invalid key is detected.
 */
export function decryptSecret(payload: {
  ciphertext: string;
  nonce: string;
  authTag: string;
  keyVersion?: number;
}): string {
  const { ciphertext, nonce, authTag } = payload;
  if (!ciphertext || !nonce || !authTag) {
    throw new Error('Missing encryption components (ciphertext, nonce, or authTag)');
  }

  const key = getMasterKey();
  const ivBuffer = Buffer.from(nonce, 'hex');
  const authTagBuffer = Buffer.from(authTag, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, ivBuffer, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  decipher.setAuthTag(authTagBuffer);

  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Generates an institutional masked key string for safe client display.
 * Example: 'gsk_1234567890abcdef' -> 'gsk_••••••••••••cdef'
 * Example: 'AIzaSyA1234567890BC'  -> 'AIza••••••••••••90BC'
 */
export function maskApiKey(apiKey: string): string {
  if (!apiKey) return '••••••••';
  const clean = apiKey.trim();
  if (clean.length <= 8) {
    return '••••••••';
  }

  // Preserve prefix if recognisable (e.g. 'gsk_', 'AIza')
  let prefix = '';
  if (clean.startsWith('gsk_')) {
    prefix = 'gsk_';
  } else if (clean.startsWith('AIza')) {
    prefix = 'AIza';
  } else {
    prefix = clean.slice(0, 3);
  }

  const suffix = clean.slice(-4);
  const dotsCount = Math.max(8, clean.length - prefix.length - suffix.length);
  return `${prefix}${'•'.repeat(dotsCount)}${suffix}`;
}

