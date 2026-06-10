export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL?.toLowerCase() ?? "";
}

export function isAdminEmail(email: string | undefined | null): boolean {
  const adminEmail = getAdminEmail();
  if (!adminEmail || !email) return false;
  return email.toLowerCase() === adminEmail;
}
