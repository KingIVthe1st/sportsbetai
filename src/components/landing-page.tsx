"use client";

import { motion } from "framer-motion";
import { Brain, TrendingUp, Shuffle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckoutButton } from "@/components/checkout-button";

const stats = [
  { n: "835", l: "Games Analyzed" },
  { n: "68.3%", l: "Model Accuracy" },
  { n: "XGBoost + Elo", l: "Ensemble Engine" },
  { n: "Daily", l: "Picks Delivered" }
];

const faqs = [
  ["How often do I get picks?", "Daily around 3pm ET."],
  ["What sports are included?", "NBA is supported in this version."],
  ["Can I cancel anytime?", "Yes, use Stripe billing portal."],
  ["Do you guarantee profits?", "No. Entertainment only, no guarantees."],
  ["How are picks generated?", "XGBoost + Elo ensemble with context factors."]
];

export function LandingPage() {
  return (
    <main className="min-h-screen text-white">
      <nav className="fixed left-0 top-0 z-50 h-[68px] w-full border-b border-white/5 bg-[rgba(10,14,23,0.85)] backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2 text-sm font-semibold md:text-base">
            <span>AI Sports Betting</span>
            <span className="rounded bg-accent-cyan px-2 py-0.5 text-bg-primary">PRO</span>
          </div>
          <div className="hidden gap-6 text-sm text-white/80 md:flex">
            <a href="#sample">Live Picks</a>
            <a href="#how">How It Works</a>
            <a href="#features">Track Record</a>
            <a href="#pricing">Pricing</a>
          </div>
          <Button className="rounded-full px-5">Start Free Trial</Button>
        </div>
      </nav>

      <section className="relative overflow-hidden px-4 pb-24 pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-24 z-0 mx-auto h-36 max-w-4xl animate-wave-drift opacity-50">
          <svg viewBox="0 0 1200 180" className="h-full w-full blur-[2px]">
            <path d="M0 90 C180 20, 320 150, 520 90 C700 35, 860 150, 1200 80" stroke="#00F0FF" strokeWidth="3" fill="none" />
            <path d="M0 110 C180 140, 280 50, 500 100 C700 140, 900 40, 1200 120" stroke="#10B981" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(40px,5vw,56px)] font-extrabold uppercase leading-[1.1] tracking-[0.02em]"
          >
            OUTSMART THE SPORTSBOOKS
            <br />
            WITH MACHINE LEARNING
          </motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
            AI-powered picks delivered to your inbox every day. No guesswork - just edge.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CheckoutButton />
            <a href="#sample" className="text-accent-cyan">View Sample Picks ↓</a>
          </div>

          <div className="mt-12 grid items-end gap-5 md:grid-cols-3">
            {["card-left", "card-center", "card-right"].map((klass, i) => (
              <Card
                key={klass}
                className={`dashboard-card animate-float-slow border-card-border bg-card-bg p-6 ${
                  klass === "card-center"
                    ? "scale-105"
                    : klass === "card-left"
                      ? "scale-90 opacity-70 md:rotate-y-6"
                      : "scale-90 opacity-70"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-semibold">AI Picks Engine</p>
                  <Badge className="bg-red-500/20 text-red-200">Live</Badge>
                </div>
                <p className="text-xs text-text-muted">2m ago</p>
                <p className="mt-4 text-sm">LAL Lakers vs. DEN Nuggets</p>
                <div className="mt-3 flex gap-2 text-xs">
                  <span className="rounded-md bg-white/10 px-3 py-2">-8.5</span>
                  <span className="rounded-md bg-white/10 px-3 py-2">-1.20</span>
                  <span className="rounded-md bg-[#00E5FF] px-4 py-2 font-bold text-bg-primary shadow-[0_0_16px_rgba(0,229,255,0.4)]">
                    8.87
                  </span>
                </div>
                {i === 1 && (
                  <>
                    <p className="mt-4 text-sm">AI Confidence Score: 8.87/10</p>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[88%] rounded-full bg-gradient-to-r from-accent-green to-accent-cyan" />
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-bg-secondary/80 px-4 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-2xl font-bold text-accent-cyan">{s.n}</p>
              <p className="mt-1 text-sm text-white">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold">How It Works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["Subscribe", "Receive Picks", "Place With Discipline"].map((s, i) => (
            <Card key={s} className="cyan-glow p-6">
              <p className="text-accent-cyan">0{i + 1}</p>
              <p className="mt-2 text-lg font-semibold">{s}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-center text-3xl font-bold">Features</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="cyan-glow p-8"><Brain className="mb-4 text-accent-cyan" /><h3 className="font-semibold">XGBoost ML Engine</h3><p className="mt-2 text-sm text-text-muted">835 games trained. 68.3% model accuracy. Retrained nightly with latest results.</p></Card>
          <Card className="cyan-glow p-8"><TrendingUp className="mb-4 text-accent-cyan" /><h3 className="font-semibold">Daily Edge Analysis</h3><p className="mt-2 text-sm text-text-muted">Spread picks, totals, injuries, travel fatigue, and context adjustments.</p></Card>
          <Card className="cyan-glow p-8"><Shuffle className="mb-4 text-accent-cyan" /><h3 className="font-semibold">Parlay Builder</h3><p className="mt-2 text-sm text-text-muted">Top confidence plays combined into daily parlay recommendations.</p></Card>
        </div>
      </section>

      <section id="sample" className="mx-auto max-w-4xl px-4 py-12">
        <Card className="relative overflow-hidden p-8">
          <h3 className="text-xl font-bold">Sample Picks Preview</h3>
          <p className="mt-4 blur-[2px]">MIA -11.5 | DAL +4.0 | BOS/NYK UNDER 224.5</p>
          <p className="mt-2 text-sm text-text-muted">Subscribe to unlock full daily card.</p>
          <Sparkles className="absolute bottom-5 right-5 h-16 w-16 text-white/10" />
        </Card>
      </section>

      <section id="pricing" className="mx-auto max-w-3xl px-4 py-12">
        <Card className="p-8 text-center">
          <h3 className="text-3xl font-bold">$29 / month</h3>
          <p className="mt-2 text-text-muted">Cancel anytime. Daily delivery at ~3pm ET.</p>
          <CheckoutButton className="mx-auto mt-6" />
        </Card>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h3 className="text-center text-2xl font-bold">FAQ</h3>
        <div className="mt-6 space-y-3">
          {faqs.map(([q, a]) => (
            <Card key={q} className="p-4">
              <p className="font-semibold">{q}</p>
              <p className="mt-1 text-sm text-text-muted">{a}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-text-muted">
        <p>For entertainment purposes only. Not financial advice.</p>
        <p className="mt-2">© {new Date().getFullYear()} AI Sports Betting Pro</p>
      </footer>
    </main>
  );
}
