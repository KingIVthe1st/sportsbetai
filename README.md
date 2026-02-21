# AI Sports Betting Pro

Manual Next.js 14+ App Router setup for subscription-based AI sports picks delivery.

## Stack

- Next.js 14 + React 18 + TypeScript
- Tailwind CSS + shadcn-style component utilities
- Supabase (Postgres + Auth)
- Stripe (checkout + billing portal + webhooks)
- Resend (daily picks + welcome email)

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Copy env template and fill values:

```bash
cp .env.example .env.local
```

3. Create database tables in Supabase SQL editor:

```bash
# run file contents in supabase-schema.sql
```

4. Start app:

```bash
npm run dev
```

## Required Routes

- `POST /api/internal/picks` (Bearer `INTERNAL_API_SECRET`)
- `GET /api/internal/subscribers` (Bearer `INTERNAL_API_SECRET`)
- `POST /api/stripe/webhook`
- `GET /api/picks/today` (Supabase auth bearer token)
- `GET /admin` dashboard (uses `x-admin-secret` for API calls)

## Curl Test Command (Farrah integration)

```bash
curl -X POST "http://localhost:3000/api/internal/picks" \
  -H "Authorization: Bearer YOUR_INTERNAL_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "date":"20260221",
    "generated_at":"2026-02-21T19:00:08Z",
    "engine":"xgb_ensemble_v3",
    "total_games":1,
    "picks":[{
      "home_team":"MIA",
      "away_team":"MEM",
      "home_name":"Miami Heat",
      "away_name":"Memphis Grizzlies",
      "game_time":"2026-02-22T01:00Z",
      "model_spread":9.1,
      "xgb_prob":0.947,
      "elo_prob":0.7833,
      "models_agree":true,
      "factors":["Home team B2B","Travel MEM -2.0"],
      "pick_score":8.87,
      "confidence":"HIGH",
      "recommended_pick":"MIA",
      "market_spread":-11.5,
      "market_total":236.5,
      "ml_home":-550,
      "ml_away":410
    }]
  }'
```

Expected success response:

```json
{ "success": true, "delivered": 47, "date": "20260221" }
```

## Notes

- Picks are never public; `/api/picks/today` requires valid Supabase auth and active subscriber status.
- Picks disclaimer: "For entertainment purposes only. Not financial advice."
