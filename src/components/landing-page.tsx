"use client";

import { motion } from "framer-motion";
import { Brain, TrendingUp, Shuffle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckoutButton } from "@/components/checkout-button";

const stats = [
  { n: "835+", l: "Games Trained", sub: "Real NBA outcomes" },
  { n: "68.3%", l: "Win Rate", sub: "Historical accuracy" },
  { n: "2 Models", l: "Cross-Validated", sub: "XGBoost + Elo ensemble" },
  { n: "Every Day", l: "Fresh Picks", sub: "3pm ET delivery" }
];

const faqs = [
  ["How is this different from ChatGPT?", "ChatGPT can't access real game data or train on outcomes. Our XGBoost + Elo models are built on 835+ actual NBA games with statistical validation. It's the difference between language prediction and mathematical sports modeling."],
  ["What's your win rate?", "68.3% historical accuracy across all picks. We track every prediction and update models nightly. Not cherry-picked — that's the real ensemble performance across hundreds of games."],
  ["Can I cancel anytime?", "Yes, instantly. One-click cancel in your account portal. No questions asked, no retention games. You're in control."],
  ["When do picks arrive?", "Every day at 3pm ET. Gives you time to review before game time. Includes spreads, totals, confidence ratings, and parlay suggestions."],
  ["Do you guarantee wins?", "No guarantees. Sports betting carries risk. This is entertainment and for informational purposes only. We provide AI-backed analysis, you make the final call."]
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
            className="text-[clamp(40px,5vw,64px)] font-black uppercase leading-[1.05] tracking-tight"
          >
            <span className="bg-gradient-to-r from-accent-cyan via-white to-accent-green bg-clip-text text-transparent">
              BEAT THE BOOKIES
            </span>
            <br />
            <span className="text-white">WITH AI PRECISION</span>
          </motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-white/90">
            Not another ChatGPT prompt. This is <span className="text-accent-cyan font-bold">835 games of training data</span>, 
            XGBoost + Elo ensemble models, and <span className="text-accent-green font-bold">68.3% proven accuracy</span> — 
            delivered to your inbox every single day.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base text-text-muted">
            While others guess with generic AI, you get picks backed by statistical models 
            that factor in momentum, travel fatigue, B2B schedules, and injury adjustments automatically.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CheckoutButton className="text-lg px-8 py-4 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]" />
            <a href="#sample" className="text-base font-medium text-accent-cyan hover:text-white transition-colors">
              See Sample Picks ↓
            </a>
          </div>
          <p className="mt-6 text-sm text-text-muted">
            ⚡ Instant access • 💳 Cancel anytime • 🔒 Secure checkout
          </p>

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

      <section className="border-y border-white/5 bg-bg-secondary/80 px-4 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-3xl font-black text-accent-cyan">{s.n}</p>
              <p className="mt-2 text-base font-semibold text-white">{s.l}</p>
              <p className="mt-1 text-xs text-text-muted">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-black">Simple 3-Step System</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-text-muted">
            No spreadsheets. No manual research. Just proven AI picks in your inbox.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="group hover:scale-105 transition-all duration-300 cyan-glow p-8">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-accent-cyan/30">01</span>
              <h3 className="text-2xl font-bold">Subscribe</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              $29/month gets you unlimited picks. No contracts, no setup fees. 
              Cancel anytime with one click.
            </p>
          </Card>
          <Card className="group hover:scale-105 transition-all duration-300 cyan-glow p-8">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-accent-cyan/30">02</span>
              <h3 className="text-2xl font-bold">Receive Picks</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Every day at 3pm ET, fresh picks hit your inbox. High-confidence spreads, 
              totals, and parlays — all pre-analyzed.
            </p>
          </Card>
          <Card className="group hover:scale-105 transition-all duration-300 cyan-glow p-8">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-accent-cyan/30">03</span>
              <h3 className="text-2xl font-bold">Place & Win</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Take the picks to your sportsbook. Stick to the confidence ratings. 
              Let the AI edge work for you.
            </p>
          </Card>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-black">
            Why This Beats <span className="line-through opacity-50">ChatGPT</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-text-muted">
            ChatGPT can't analyze real game data. Our models train on every matchup, 
            track team performance trends, and learn from 835+ games of outcomes.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="group hover:border-accent-cyan/40 transition-all duration-300 cyan-glow p-8">
            <Brain className="mb-4 h-12 w-12 text-accent-cyan group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold">Real Training Data</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Not language patterns — actual NBA outcomes. 835 games analyzed. 
              XGBoost models retrained nightly. Elo ratings updated after every game. 
              <span className="block mt-2 text-accent-green font-semibold">68.3% historical accuracy.</span>
            </p>
          </Card>
          <Card className="group hover:border-accent-cyan/40 transition-all duration-300 cyan-glow p-8">
            <TrendingUp className="mb-4 h-12 w-12 text-accent-cyan group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold">Context-Aware Analysis</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Travel fatigue quantified. Back-to-back penalties calculated. 
              Injury impact weighted. Momentum trends tracked. 
              <span className="block mt-2 text-accent-green font-semibold">Every edge factor, automated.</span>
            </p>
          </Card>
          <Card className="group hover:border-accent-cyan/40 transition-all duration-300 cyan-glow p-8">
            <Shuffle className="mb-4 h-12 w-12 text-accent-cyan group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold">High-Confidence Parlays</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Models agree? We combine them. Daily parlays built from picks where 
              XGBoost + Elo both signal value. 
              <span className="block mt-2 text-accent-green font-semibold">Smart correlation, max payout.</span>
            </p>
          </Card>
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

      <section id="pricing" className="mx-auto max-w-4xl px-4 py-20">
        <Card className="relative overflow-hidden border-2 border-accent-cyan/30 p-10 text-center">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-accent-green px-4 py-1 text-sm font-bold text-black">
              🔥 LIMITED TIME
            </span>
          </div>
          <h3 className="mt-4 text-5xl font-black">
            <span className="text-accent-cyan">$29</span>
            <span className="text-2xl text-text-muted">/month</span>
          </h3>
          <p className="mt-4 text-xl text-white">Unlimited AI-Powered Picks</p>
          <div className="mx-auto mt-6 grid max-w-md gap-3 text-left">
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">Daily picks at 3pm ET</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">XGBoost + Elo ensemble analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">High-confidence parlay suggestions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">Cancel anytime, no questions asked</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">68.3% historical win rate</span>
            </div>
          </div>
          <CheckoutButton className="mx-auto mt-8 text-lg" />
          <p className="mt-4 text-sm text-text-muted">
            Less than $1 per day. Most subscribers profit from a single winning bet.
          </p>
        </Card>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="text-center">
          <h3 className="text-4xl font-black">Questions?</h3>
          <p className="mt-3 text-lg text-text-muted">Everything you need to know before you start winning.</p>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map(([q, a]) => (
            <Card key={q} className="group hover:border-accent-cyan/30 transition-all p-6">
              <p className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">{q}</p>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{a}</p>
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
