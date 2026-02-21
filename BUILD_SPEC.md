# AI Sports Betting Pro - Full Build Specification

**Delegated from:** Farrah AI (VPS)  
**Builder:** Fero (Mac Mini) via Codex CLI  
**Target:** Production-ready subscription site for AI sports picks

---

## 🎯 WHAT YOU'RE BUILDING

A premium sports picks subscription website called "AI Sports Betting Pro". People land on the site, sign up for a paid monthly subscription, and receive daily AI-powered sports picks automatically via email every day.

The brain behind it: There's a live XGBoost + Elo machine learning engine running on Farrah's VPS generating daily NBA picks. Farrah pushes the picks to this website every day via a secure internal API.

The website handles subscriptions, storage, and delivery — it does NOT run the engine itself.

---

## 🧩 HOW IT ALL CONNECTS

VPS (Farrah) → picks engine runs daily → POST /api/internal/picks → website stores picks + emails all active subscribers

1. Farrah's cron job runs the picks engine daily ~2-3pm ET
2. Farrah POSTs picks JSON to the site's internal API
3. Site emails all active subscribers with that day's formatted picks
4. New subscribers pay via Stripe → activate immediately
5. Stripe webhooks auto-activate/deactivate based on payment status

---

## 🛠 TECH STACK

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe (subscriptions + webhooks)
- **Email:** Resend (resend.com)
- **Deploy:** Vercel
- **Auth:** Supabase Auth (magic link for subscribers)

---

## 📄 PAGES

### 1. `/` — Landing Page (MOST IMPORTANT)

**Design Reference:** Match aiicbetting.com aesthetic exactly

**Sections in order:**
- Navbar — fixed, glassmorphism
- Hero — animated node network + headline + 3 overlapping pick cards + CTA
- Stats Bar — 4 social proof numbers
- How It Works — 3 steps
- Feature Cards — 3 columns
- Sample Picks — blurred/teased picks card (FOMO)
- Pricing — single plan
- FAQ — 5 questions
- Footer

### 2. Stripe Checkout
CTA → Stripe hosted checkout → redirect to `/welcome`

### 3. `/welcome`
"You're in. Picks arrive daily at 3pm ET."
CTA: Add sender to contacts (deliverability tip)

### 4. `/portal` (auth required)
- Subscription status + cancel button
- Today's picks card
- Last 30 days picks history

### 5. `/admin` (protected by `ADMIN_SECRET` header/password)
- Active subscriber count + MRR
- Today's picks status (delivered Y/N)
- Manual "Push Picks Now" trigger button
- Subscriber list with statuses
- Delivery log

---

## 🗄 DATABASE — Supabase

```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'active', -- active | canceled | past_due
  plan TEXT DEFAULT 'monthly',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE daily_picks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL, -- YYYYMMDD
  picks_json JSONB NOT NULL, -- raw engine output
  formatted_html TEXT, -- email HTML
  delivered_at TIMESTAMPTZ,
  subscriber_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE delivery_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  picks_date TEXT,
  subscriber_id UUID REFERENCES subscribers(id),
  email TEXT,
  status TEXT, -- sent | failed
  sent_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔌 API ENDPOINTS

### `POST /api/internal/picks` ← MOST CRITICAL

Farrah calls this daily. Must work perfectly.

**Auth:** `Authorization: Bearer {INTERNAL_API_SECRET}`

**Exact request body (this is what the engine outputs):**

```json
{
  "date": "20260221",
  "generated_at": "2026-02-21T19:00:08Z",
  "engine": "xgb_ensemble_v3",
  "total_games": 6,
  "picks": [
    {
      "home_team": "MIA",
      "away_team": "MEM",
      "home_name": "Miami Heat",
      "away_name": "Memphis Grizzlies",
      "game_time": "2026-02-22T01:00Z",
      "model_spread": 9.1,
      "xgb_prob": 0.947,
      "elo_prob": 0.7833,
      "models_agree": true,
      "factors": ["⚠️ Home team B2B", "✈️ Travel: MEM -2.0 pts"],
      "pick_score": 8.87,
      "confidence": "HIGH",
      "recommended_pick": "MIA",
      "market_spread": -11.5,
      "market_total": 236.5,
      "ml_home": -550,
      "ml_away": 410
    }
  ]
}
```

**What it does:**
1. Validates bearer token
2. Stores picks in `daily_picks` table
3. Formats picks into HTML email
4. Emails ALL active subscribers via Resend
5. Logs each delivery in `delivery_log`
6. Returns `{ "success": true, "delivered": 47, "date": "20260221" }`

### `GET /api/internal/subscribers`

Auth: Same bearer token

Returns:
```json
{
  "active": 47,
  "canceled": 3,
  "past_due": 2,
  "mrr": 1363
}
```

Farrah polls this for heartbeat monitoring.

### `POST /api/stripe/webhook`

Handle:
- `customer.subscription.created` → status = active
- `customer.subscription.deleted` → status = canceled
- `invoice.payment_failed` → status = past_due
- `checkout.session.completed` → save stripe_customer_id + subscription_id

### `GET /api/picks/today`

Supabase auth required. Returns today's picks for subscriber portal.

---

## 📧 EMAIL FORMAT

**Subject:** `🏀 AI Sports Betting Pro — Your Picks for [Day, Month DD]`

**HTML Email:**

```
[Header: "AI Sports Betting Pro" logo + date, dark bg #0A0E17]

"Today's top plays — XGBoost + Elo ensemble"

──── HIGH CONFIDENCE ────

[AWAY] @ [HOME] ⭐⭐⭐
Score: 8.87/10 | XGBoost: 94.7% | Models agree ✓

Pick: MIA -11.5 | O/U: 236.5 (UNDER)
Factor: MEM on B2B + 1 TZ travel fatigue

─────────────────────────

[Repeat for each HIGH pick]

──── MEDIUM CONFIDENCE ────

[2-star picks, same format]

──── PARLAY OF THE DAY ────

[Top 3 HIGH picks combined]
Est. payout: +420

──── DISCLAIMER ────

For entertainment purposes only. Not financial advice.

[Footer: Manage Subscription | Unsubscribe]
```

---

## 🔑 ENV VARS NEEDED

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=

# Resend
RESEND_API_KEY=
FROM_EMAIL=picks@aisportsbettingpro.com

# Internal (Farrah uses this token to push picks)
INTERNAL_API_SECRET=

# Admin
ADMIN_SECRET=

# Site config
NEXT_PUBLIC_PRICE_MONTHLY=29
NEXT_PUBLIC_SITE_NAME=AI Sports Betting Pro
NEXT_PUBLIC_SITE_URL=https://aisportsbettingpro.vercel.app
```

---

## 🎨 DESIGN SPECS — MATCH THIS EXACTLY

Reference: the site `aiicbetting.com` — same aesthetic, we're building our own version.

### Colors

```css
--bg-primary: #0A0E17;
--bg-secondary: #0D1219;
--accent-cyan: #00F0FF;
--accent-green: #10B981;
--text-primary: #FFFFFF;
--text-muted: #94A3B8;
--card-bg: rgba(13, 18, 30, 0.75);
--card-border: rgba(0, 240, 255, 0.12);
```

### Font
`Inter` from Google Fonts — used everywhere.

### Navbar (fixed, glassmorphism)

```css
background: rgba(10, 14, 23, 0.85);
backdrop-filter: blur(12px);
border-bottom: 1px solid rgba(255,255,255,0.05);
height: 68px;
```

- Logo: "AI Sports Betting" white + "PRO" in cyan pill badge (`bg: #00F0FF, color: #0A0E17, border-radius: 4px, padding: 2px 8px, font-weight: 700`)
- Nav links: "Live Picks" · "How It Works" · "Track Record" · "Pricing" (14px, `rgba(255,255,255,0.8)`)
- CTA button: "Start Free Trial" (`bg: #10B981, border-radius: 24px, padding: 10px 24px, box-shadow: 0 0 24px rgba(16,185,129,0.35)`)

### Hero Background

```css
background: radial-gradient(ellipse at 50% 0%, #111827 0%, #0A0E17 70%);
```

Plus subtle grid overlay: `rgba(255,255,255,0.02)` 1px lines at 60px spacing.

### Hero — Animated Node Network (TOP OF HERO)

- Connected graph of cyan glowing squares/rectangles
- Thin connecting lines `#00F0FF` at 25% opacity
- Slight isometric tilt (15° X rotation)
- Nodes look like mini dashboard cards
- Fades at edges with opacity mask
- Gentle float animation via `requestAnimationFrame` or Framer Motion
- Build as SVG canvas or Framer Motion animated divs

### Hero Headline

```css
font-size: clamp(40px, 5vw, 56px);
font-weight: 800;
text-transform: uppercase;
text-align: center;
color: #FFFFFF;
line-height: 1.1;
letter-spacing: 0.02em;
```

Text: `"OUTSMART THE SPORTSBOOKS / WITH MACHINE LEARNING"`

Sub: `"AI-powered picks delivered to your inbox every day. No guesswork — just edge."` — 18px, `#94A3B8`, centered.

CTAs: Primary green pill "Get Today's Picks — $29/mo" + secondary cyan text link "View Sample Picks ↓"

### Hero — 3 Overlapping Dashboard Cards (CENTERPIECE)

```css
.dashboard-card {
  background: rgba(13, 18, 30, 0.75);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 240, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 48px rgba(0,240,255,0.06);
  padding: 20px 24px;
  width: 340px;
}

.card-center {
  transform: scale(1.05);
  z-index: 3;
}

.card-left {
  transform: scale(0.9) rotateY(5deg);
  z-index: 1;
  opacity: 0.7;
}

.card-right {
  transform: scale(0.9) rotateY(-5deg);
  z-index: 1;
  opacity: 0.7;
}
```

Card content (use real sample picks):

```
[Header]
"AI Picks Engine" 🔴 "Live"
"2m ago"

[Matchup row]
LAL Lakers vs. DEN Nuggets
(use team logos from ESPN or placeholder SVGs)

[Odds pills row]
[-8.5] [-1.20] [8.87 ← CYAN HIGHLIGHT]

[Center card only:]
"AI Confidence Score: 8.87/10"
[Progress bar: linear-gradient(90deg, #10B981, #00F0FF), 88% filled]
```

Highlighted pill:
```css
background: #00E5FF;
box-shadow: 0 0 16px rgba(0,229,255,0.4);
border-radius: 8px;
padding: 8px 20px;
font-weight: 700;
color: #0A0E17;
```

### Cyan Wave / Light Streak

Behind the cards, full-width SVG or canvas:
- 2-3 intertwining sine curves in `#00F0FF`
- `filter: blur(2px)` + `0 0 60px rgba(0,240,255,0.3)` glow
- Fades at both ends
- Slow drift animation (15s loop)
- Add a green `#10B981` wave from the left side

### Stats Bar (below hero)

4 columns, full-width, dark section:

```
[00F0FF number] [white label below]
835              68.3%           XGBoost + Elo    Daily
Games Analyzed   Model Accuracy  Ensemble Engine  Picks Delivered
```

Animate numbers counting up on scroll (Framer Motion `useInView`).

### Feature Cards (3 col grid)

```css
.feature-card {
  background: rgba(15, 23, 35, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 32px;
}

.icon-wrap {
  width: 60px;
  height: 60px;
  border-radius: 14px;
  background: rgba(0, 240, 255, 0.08);
}

/* Icon: lucide-react, color #00F0FF, size 28px */
```

Cards:
1. **XGBoost ML Engine** (Brain icon) — "835 games trained. 68.3% model accuracy. Retrained nightly with latest results."
2. **Daily Edge Analysis** (TrendingUp icon) — "Spread picks, over/unders, injury adjustments, travel fatigue — all factored in automatically."
3. **Parlay Builder** (Shuffle icon) — "We combine our top confidence plays into daily parlay recommendations with estimated payouts."

### Glassmorphism (standard)

```css
background: rgba(15, 23, 42, 0.6);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
```

### Extras

- 4-pointed sparkle star SVG, bottom-right, `rgba(255,255,255,0.08)`, ~100px
- All hover states: subtle cyan glow appears on cards
- Page transitions: Framer Motion fade
- Mobile-first, fully responsive

---

## ✅ MVP CHECKLIST

- [ ] Premium landing page (all sections above)
- [ ] Stripe monthly subscription + webhook handler
- [ ] Supabase tables (subscribers, daily_picks, delivery_log)
- [ ] `POST /api/internal/picks` — validates token, stores picks, emails subscribers
- [ ] `GET /api/internal/subscribers` — subscriber stats for Farrah
- [ ] Welcome email on signup (Resend)
- [ ] `/welcome` page
- [ ] `/admin` dashboard (subs, MRR, manual trigger)
- [ ] Unsubscribe / Stripe portal link

---

## 🚫 CONSTRAINTS

1. Site does NOT run the picks engine — Farrah's VPS does
2. Picks are never shown publicly — login + active subscription required
3. Disclaimer on all picks pages: "For entertainment purposes only. Not financial advice."
4. The `POST /api/internal/picks` endpoint is the #1 priority — test it thoroughly
5. Provide a working `curl` test command so Farrah can verify the push works

---

## 📤 DELIVERABLES

1. GitHub repo link
2. Live Vercel URL
3. All env var keys (blank values — Ivanlee fills them in)
4. `curl` test command for the picks push endpoint
5. Confirmation that Supabase tables are created

---

## 🤝 FARRAH INTEGRATION (after site is live)

Once you share the live URL and `INTERNAL_API_SECRET`, Farrah will:

1. Save the endpoint + secret to her TOOLS.md config
2. Update the daily picks cron to POST picks to the site after generation
3. Monitor subscriber count via the `/api/internal/subscribers` endpoint
4. Alert Ivanlee at subscriber milestones (10, 25, 50, 100)

---

Built by VibeWorks. Powered by Farrah AI.
