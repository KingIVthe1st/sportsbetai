import { createClient } from "@supabase/supabase-js";
import { getEnv } from "@/lib/env";

export async function getUserFromAuthHeader(authHeader: string | null) {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);

  const client = createClient(getEnv("NEXT_PUBLIC_SUPABASE_URL"), getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return null;
  return { user: data.user, token };
}

export function validateInternalBearer(authHeader: string | null): boolean {
  if (!authHeader?.startsWith("Bearer ")) return false;
  return authHeader.slice(7) === getEnv("INTERNAL_API_SECRET");
}

export function validateAdminSecret(secret: string | null): boolean {
  return Boolean(secret && secret === getEnv("ADMIN_SECRET"));
}
