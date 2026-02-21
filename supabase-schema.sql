CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'active',
  plan TEXT DEFAULT 'monthly',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_picks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT UNIQUE NOT NULL,
  picks_json JSONB NOT NULL,
  formatted_html TEXT,
  delivered_at TIMESTAMPTZ,
  subscriber_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS delivery_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  picks_date TEXT,
  subscriber_id UUID REFERENCES subscribers(id),
  email TEXT,
  status TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_daily_picks_date ON daily_picks(date);
CREATE INDEX IF NOT EXISTS idx_delivery_log_picks_date ON delivery_log(picks_date);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_subscribers_updated_at ON subscribers;
CREATE TRIGGER trg_subscribers_updated_at
BEFORE UPDATE ON subscribers
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
