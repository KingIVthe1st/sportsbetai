import { z } from "zod";
import type { PicksPayload } from "@/types/picks";
import { formatLongDate } from "@/lib/utils";

const pickSchema = z.object({
  home_team: z.string(),
  away_team: z.string(),
  home_name: z.string(),
  away_name: z.string(),
  game_time: z.string(),
  model_spread: z.number(),
  xgb_prob: z.number(),
  elo_prob: z.number(),
  models_agree: z.boolean(),
  factors: z.array(z.string()),
  pick_score: z.number(),
  confidence: z.enum(["HIGH", "MEDIUM", "LOW"]),
  recommended_pick: z.string(),
  market_spread: z.number(),
  market_total: z.number(),
  ml_home: z.number(),
  ml_away: z.number()
});

export const picksPayloadSchema = z.object({
  date: z.string().regex(/^\d{8}$/),
  generated_at: z.string(),
  engine: z.string(),
  total_games: z.number().int().nonnegative(),
  picks: z.array(pickSchema)
});

export function parsePicksPayload(payload: unknown): PicksPayload {
  return picksPayloadSchema.parse(payload);
}

function confidenceStars(confidence: string) {
  if (confidence === "HIGH") return "⭐⭐⭐";
  if (confidence === "MEDIUM") return "⭐⭐";
  return "⭐";
}

export function buildPicksEmailHtml(data: PicksPayload): string {
  const highs = data.picks.filter((p) => p.confidence === "HIGH");
  const mediums = data.picks.filter((p) => p.confidence === "MEDIUM");
  const parlay = highs.slice(0, 3);

  const renderRow = (p: PicksPayload["picks"][number]) => `
    <div style="padding:16px;border:1px solid #1f2937;border-radius:12px;margin-bottom:12px;background:#111827">
      <div style="font-size:16px;font-weight:700;color:#fff">${p.away_team} @ ${p.home_team} ${confidenceStars(p.confidence)}</div>
      <div style="font-size:14px;color:#94A3B8;margin-top:6px">
        Score: ${p.pick_score.toFixed(2)}/10 | XGBoost: ${(p.xgb_prob * 100).toFixed(1)}% | Models agree: ${p.models_agree ? "Yes" : "No"}
      </div>
      <div style="font-size:14px;color:#fff;margin-top:8px">
        Pick: ${p.recommended_pick} ${p.market_spread} | O/U: ${p.market_total}
      </div>
      <div style="font-size:13px;color:#94A3B8;margin-top:8px">Factor: ${p.factors.join(" | ")}</div>
    </div>
  `;

  return `
  <div style="max-width:680px;margin:0 auto;background:#0A0E17;color:#fff;padding:24px;font-family:Inter,sans-serif">
    <div style="border-bottom:1px solid #1f2937;padding-bottom:14px;margin-bottom:16px">
      <h1 style="margin:0;font-size:22px">AI Sports Betting Pro</h1>
      <p style="margin:6px 0 0;color:#94A3B8">${formatLongDate(data.date)}</p>
    </div>
    <p style="color:#cbd5e1">Today's top plays - XGBoost + Elo ensemble</p>

    <h2 style="font-size:16px;color:#00F0FF;margin-top:24px">HIGH CONFIDENCE</h2>
    ${highs.length ? highs.map(renderRow).join("") : '<p style="color:#94A3B8">No high-confidence picks today.</p>'}

    <h2 style="font-size:16px;color:#00F0FF;margin-top:24px">MEDIUM CONFIDENCE</h2>
    ${mediums.length ? mediums.map(renderRow).join("") : '<p style="color:#94A3B8">No medium-confidence picks today.</p>'}

    <h2 style="font-size:16px;color:#10B981;margin-top:24px">PARLAY OF THE DAY</h2>
    <p style="color:#e2e8f0">${parlay.length ? parlay.map((p) => p.recommended_pick).join(" + ") : "No parlay today"}</p>
    <p style="color:#94A3B8">Est. payout: +420</p>

    <h3 style="margin-top:28px;font-size:14px;color:#cbd5e1">DISCLAIMER</h3>
    <p style="font-size:12px;color:#94A3B8">For entertainment purposes only. Not financial advice.</p>
    <p style="font-size:12px;color:#64748b">Manage Subscription | Unsubscribe</p>
  </div>`;
}

export function picksEmailSubject(date: string): string {
  return `🏀 AI Sports Betting Pro — Your Picks for ${formatLongDate(date)}`;
}
