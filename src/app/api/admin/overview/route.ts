import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { validateAdminSecret } from "@/lib/auth";
import { yyyymmdd } from "@/lib/utils";

export async function GET(req: Request) {
  const secret = req.headers.get("x-admin-secret");
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();
  const today = yyyymmdd();

  const [{ count: active }, { data: todayPick }, { data: subs }, { data: logs }] = await Promise.all([
    supabase.from("subscribers").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("daily_picks").select("date,delivered_at,subscriber_count").eq("date", today).maybeSingle(),
    supabase.from("subscribers").select("email,status,created_at").order("created_at", { ascending: false }).limit(100),
    supabase.from("delivery_log").select("email,status,sent_at,picks_date").order("sent_at", { ascending: false }).limit(100)
  ]);

  const monthlyPrice = Number(process.env.NEXT_PUBLIC_PRICE_MONTHLY ?? "29");

  return NextResponse.json({
    activeSubscribers: active ?? 0,
    mrr: (active ?? 0) * monthlyPrice,
    todayStatus: todayPick,
    subscribers: subs ?? [],
    deliveryLog: logs ?? []
  });
}
