import { NextResponse } from "next/server";
import { buildPicksEmailHtml, parsePicksPayload, picksEmailSubject } from "@/lib/picks";
import { resend } from "@/lib/resend";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { getEnv } from "@/lib/env";
import { validateInternalBearer } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    if (!validateInternalBearer(req.headers.get("authorization"))) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const payload = parsePicksPayload(await req.json());
    const supabase = createSupabaseAdminClient();
    const formattedHtml = buildPicksEmailHtml(payload);

    const { error: insertErr } = await supabase.from("daily_picks").upsert(
      {
        date: payload.date,
        picks_json: payload,
        formatted_html: formattedHtml,
        delivered_at: null,
        subscriber_count: 0
      },
      { onConflict: "date" }
    );
    if (insertErr) throw insertErr;

    const { data: subscribers, error: subsErr } = await supabase
      .from("subscribers")
      .select("id,email")
      .eq("status", "active");
    if (subsErr) throw subsErr;

    const activeSubscribers = subscribers ?? [];
    let delivered = 0;

    if (activeSubscribers.length > 0) {
      const result = await resend().emails.send({
        from: getEnv("FROM_EMAIL"),
        to: activeSubscribers.map((s) => s.email),
        subject: picksEmailSubject(payload.date),
        html: formattedHtml
      });

      if (result.error) {
        await Promise.all(
          activeSubscribers.map((sub) =>
            supabase.from("delivery_log").insert({
              picks_date: payload.date,
              subscriber_id: sub.id,
              email: sub.email,
              status: "failed"
            })
          )
        );
        throw new Error(result.error.message);
      }

      delivered = activeSubscribers.length;
      await Promise.all(
        activeSubscribers.map((sub) =>
          supabase.from("delivery_log").insert({
            picks_date: payload.date,
            subscriber_id: sub.id,
            email: sub.email,
            status: "sent"
          })
        )
      );
    }

    const { error: updateErr } = await supabase
      .from("daily_picks")
      .update({ delivered_at: new Date().toISOString(), subscriber_count: delivered })
      .eq("date", payload.date);

    if (updateErr) throw updateErr;

    return NextResponse.json({ success: true, delivered, date: payload.date });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
