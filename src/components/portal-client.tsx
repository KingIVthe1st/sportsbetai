"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type PicksResponse = {
  today: { date: string; picks_json: { picks: Array<{ away_team: string; home_team: string; recommended_pick: string; pick_score: number; confidence: string }> } } | null;
  history: Array<{ date: string; picks_json: { picks: Array<{ away_team: string; home_team: string; recommended_pick: string; pick_score: number }> } }>;
  disclaimer: string;
};

export function PortalClient() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState("Checking session...");
  const [data, setData] = useState<PicksResponse | null>(null);

  useEffect(() => {
    const run = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.access_token) {
        setStatus("Sign in with your subscriber email to view picks.");
        return;
      }
      const accessToken = session.session.access_token;
      setToken(accessToken);
      setStatus("Loading picks...");
      const res = await fetch("/api/picks/today", { headers: { Authorization: `Bearer ${accessToken}` } });
      const json = await res.json();
      if (!res.ok) {
        setStatus(json.error ?? "Failed to load picks");
        return;
      }
      setData(json);
      setStatus("Active subscription confirmed");
    };
    void run();
  }, [supabase]);

  const sendMagicLink = async () => {
    const redirectTo = `${window.location.origin}/portal`;
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
    setStatus(error ? error.message : "Magic link sent. Check your email.");
  };

  const openBillingPortal = async () => {
    if (!token) return;
    const res = await fetch("/api/stripe/portal", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    if (json.url) window.location.href = json.url;
    else setStatus(json.error ?? "Could not open billing portal");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      <h1 className="text-3xl font-bold">Subscriber Portal</h1>
      <p className="mt-2 text-text-muted">{status}</p>

      {!data && (
        <Card className="mt-6 p-6">
          <p className="mb-3">Sign in via magic link</p>
          <div className="flex gap-2">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            <Button onClick={sendMagicLink}>Send Link</Button>
          </div>
        </Card>
      )}

      {data && (
        <>
          <Card className="mt-6 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Subscription: Active</h2>
              <Button variant="outline" onClick={openBillingPortal}>Manage / Cancel</Button>
            </div>
          </Card>

          <Card className="mt-4 p-6">
            <h3 className="text-lg font-semibold">Today's Picks</h3>
            {data.today?.picks_json?.picks?.length ? (
              <div className="mt-3 space-y-2">
                {data.today.picks_json.picks.map((p, idx) => (
                  <div key={`${p.home_team}-${idx}`} className="rounded border border-white/10 p-3 text-sm">
                    {p.away_team} @ {p.home_team} | Pick: {p.recommended_pick} | Score: {p.pick_score.toFixed(2)} ({p.confidence})
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-text-muted">No picks posted yet for today.</p>
            )}
          </Card>

          <Card className="mt-4 p-6">
            <h3 className="text-lg font-semibold">Last 30 Days</h3>
            <div className="mt-3 space-y-2">
              {data.history.map((row) => (
                <div key={row.date} className="rounded border border-white/10 p-3 text-sm">
                  {row.date}: {row.picks_json?.picks?.length ?? 0} picks
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-text-muted">{data.disclaimer}</p>
          </Card>
        </>
      )}
    </div>
  );
}
