// lib/admin-constants.ts — single source of truth for platform administrative emails
//
// Ensures platform owners/superadmins retain administrative access across
// proxy network boundary checks, JWT tokens, NextAuth sessions, and auth guards.

export const ADMIN_EMAILS: readonly string[] = [
  'sumitsingh7445@gmail.com',
  ...(process.env.ADMIN_EMAIL ? [process.env.ADMIN_EMAIL] : []),
].map((e) => e.toLowerCase().trim());

/**
 * Returns true if the provided email matches any configured platform administrator email.
 */
export function isPlatformAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

