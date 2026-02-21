const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_PRICE_ID",
  "RESEND_API_KEY",
  "FROM_EMAIL",
  "INTERNAL_API_SECRET",
  "ADMIN_SECRET",
  "NEXT_PUBLIC_SITE_URL"
] as const;

export function getEnv(name: (typeof required)[number]): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function hasEnv(name: string): boolean {
  return Boolean(process.env[name]);
}
