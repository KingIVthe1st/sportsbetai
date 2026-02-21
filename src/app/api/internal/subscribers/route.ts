import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { validateInternalBearer } from "@/lib/auth";

export async function GET(req: Request) {
  if (!validateInternalBearer(req.headers.get("authorization"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();

  const [{ count: active }, { count: canceled }, { count: pastDue }] = await Promise.all([
    supabase.from("subscribers").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("subscribers").select("id", { count: "exact", head: true }).eq("status", "canceled"),
    supabase.from("subscribers").select("id", { count: "exact", head: true }).eq("status", "past_due")
  ]);

  const monthlyPrice = Number(process.env.NEXT_PUBLIC_PRICE_MONTHLY ?? "29");
  return NextResponse.json({
    active: active ?? 0,
    canceled: canceled ?? 0,
    past_due: pastDue ?? 0,
    mrr: (active ?? 0) * monthlyPrice
  });
}
