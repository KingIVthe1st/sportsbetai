import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { getUserFromAuthHeader } from "@/lib/auth";
import { yyyymmdd } from "@/lib/utils";

export async function GET(req: Request) {
  const auth = await getUserFromAuthHeader(req.headers.get("authorization"));
  if (!auth?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("status")
    .eq("email", auth.user.email)
    .maybeSingle();

  if (!subscriber || subscriber.status !== "active") {
    return NextResponse.json({ error: "Subscription inactive" }, { status: 403 });
  }

  const today = yyyymmdd();

  const [{ data: todayPicks, error: todayErr }, { data: history, error: historyErr }] = await Promise.all([
    supabase.from("daily_picks").select("date,picks_json,delivered_at").eq("date", today).maybeSingle(),
    supabase.from("daily_picks").select("date,picks_json,delivered_at").order("date", { ascending: false }).limit(30)
  ]);

  if (todayErr || historyErr) {
    return NextResponse.json({ error: "Failed to load picks" }, { status: 500 });
  }

  return NextResponse.json({
    today: todayPicks,
    history: history ?? [],
    disclaimer: "For entertainment purposes only. Not financial advice."
  });
}
