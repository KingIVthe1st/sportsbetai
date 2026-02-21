"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdminData = {
  activeSubscribers: number;
  mrr: number;
  todayStatus: { date: string; delivered_at: string | null; subscriber_count: number } | null;
  subscribers: Array<{ email: string; status: string; created_at: string }>;
  deliveryLog: Array<{ email: string; status: string; sent_at: string; picks_date: string }>;
};

export function AdminClient() {
  const [secret, setSecret] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [status, setStatus] = useState("Enter admin secret to load dashboard");

  const load = async () => {
    const res = await fetch("/api/admin/overview", { headers: { "x-admin-secret": secret } });
    const json = await res.json();
    if (!res.ok) {
      setStatus(json.error ?? "Failed");
      return;
    }
    setData(json);
    setStatus("Loaded");
  };

  const pushNow = async () => {
    const res = await fetch("/api/admin/push", {
      method: "POST",
      headers: { "x-admin-secret": secret, "content-type": "application/json" },
      body: JSON.stringify({ triggered_at: new Date().toISOString() })
    });
    const json = await res.json();
    setStatus(json.message ?? "Done");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-text-muted">{status}</p>

      <Card className="mt-6 p-6">
        <div className="flex gap-2">
          <Input type="password" value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="ADMIN_SECRET" />
          <Button onClick={load}>Load</Button>
          <Button variant="outline" onClick={pushNow}>Push Picks Now</Button>
        </div>
      </Card>

      {data && (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card className="p-6"><p className="text-sm text-text-muted">Active Subs</p><p className="text-2xl font-bold text-accent-cyan">{data.activeSubscribers}</p></Card>
            <Card className="p-6"><p className="text-sm text-text-muted">MRR</p><p className="text-2xl font-bold text-accent-green">${data.mrr}</p></Card>
            <Card className="p-6"><p className="text-sm text-text-muted">Today Delivered</p><p className="text-2xl font-bold">{data.todayStatus?.delivered_at ? "Yes" : "No"}</p></Card>
          </div>

          <Card className="mt-4 p-6">
            <h3 className="text-lg font-semibold">Subscribers</h3>
            <div className="mt-3 space-y-2 text-sm">
              {data.subscribers.map((s) => (
                <div key={`${s.email}-${s.created_at}`} className="rounded border border-white/10 p-3">
                  {s.email} - {s.status}
                </div>
              ))}
            </div>
          </Card>

          <Card className="mt-4 p-6">
            <h3 className="text-lg font-semibold">Delivery Log</h3>
            <div className="mt-3 space-y-2 text-sm">
              {data.deliveryLog.map((s) => (
                <div key={`${s.email}-${s.sent_at}`} className="rounded border border-white/10 p-3">
                  {s.picks_date}: {s.email} - {s.status}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
