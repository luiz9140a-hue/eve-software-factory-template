const ADMIN_EMAILS = new Set<string>(
  (import.meta.env.VITE_ADMIN_EMAILS ?? 'luiz9140a@gmail.com')
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean),
)

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.has(email.trim().toLowerCase())
}
