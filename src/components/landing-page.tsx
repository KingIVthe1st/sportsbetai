"use client";

import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence, useScroll } from "framer-motion";
import { Brain, TrendingUp, Shuffle, ChevronDown, Lock, Shield, Check, X, AlertTriangle, Zap } from "lucide-react";
import { CheckoutButton } from "@/components/checkout-button";
import { FlowingWaves } from "@/components/flowing-waves";
import { useRef, useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const stats = [
  { value: 835, suffix: "+", label: "Exploited Games" },
  { value: 68.3, suffix: "%", label: "Strike Rate", decimals: 1 },
  { value: 37, suffix: "", label: "Vector Analysis" },
  { value: 7.0, suffix: "+", label: "Profit Threshold", decimals: 1 },
];

const weapons = [
  {
    step: "01",
    icon: Brain,
    title: "The Alpha Engine",
    subtitle: "Finds outcomes hidden from the public eye.",
    text: "Our primary AI simulates every game using a 37-point data profile — from player efficiency metrics to travel fatigue. Two independent models must agree before any pick reaches you. If they disagree, we don't send it. You only get A+ setups.",
  },
  {
    step: "02",
    icon: TrendingUp,
    title: "The Signal Engine",
    subtitle: "Exploits the sportsbooks' pricing errors.",
    text: "Scans market odds in real-time, cross-referencing our Alpha Engine to find statistical value the books haven't corrected. When a line is mispriced, you get the alert — before the edge disappears.",
  },
  {
    step: "03",
    icon: Shuffle,
    title: "The Multiplier",
    subtitle: "Engineered parlays, not random stacks.",
    text: "Identifies correlated outcomes to construct high-probability, high-payout parlays. Every leg is AI-validated independently — so you never stack a parlay with a weak link dragging it down.",
  },
];

const testimonials = [
  {
    quote: "Tracked their picks for a month without betting. The results were undeniable. I'm up over $4,200 in my first two months of real betting. This is a legitimate tool.",
    name: "Mark S.",
    location: "Las Vegas, NV",
    winAmount: "+$4,200",
  },
  {
    quote: "I don't have time to analyze 37 data points. AI Sports Betting Pro does the heavy lifting. I get the email, place bets in 5 minutes, and my bankroll keeps growing.",
    name: "David R.",
    location: "Chicago, IL",
    winAmount: "+$7,150",
  },
  {
    quote: "The quality of analysis is top-tier. The edge is real. The discipline the system forces is what separates professional bettors from the public.",
    name: "James K.",
    location: "Miami, FL",
    winAmount: "+$3,890",
  },
];

const faqs = [
  { q: "Why is it $250/month?", a: "Because it works. We're not a discount tout service selling 50/50 guesses. This is a professional-grade data intelligence platform. The price filters out casual gamblers and ensures our members are serious. For a disciplined bettor, one or two wins a week covers the subscription. The rest is your profit." },
  { q: "How are you different from other pick sites?", a: "They sell opinions. We deliver a mathematical edge. Our dual-engine AI is the same level of technology used by financial trading firms. There are no 'gut feelings' or 'locks of the century.' Just data, probability, and relentless analysis." },
  { q: "How can I trust your win rate?", a: "Every pick is tracked and timestamped. Our Brier Score (0.2151) and MAE (10.6) are public because — unlike a simple win/loss record — they can't be faked. When we say 70% confidence, it actually wins ~70% of the time." },
  { q: "What exactly do I get?", a: "Daily picks at 3pm ET: high-confidence spreads, totals, moneylines, and AI-optimized parlays. Each pick includes Edge Score, confidence rating, injury adjustments, and exact reasoning. Plus full access to The Multiplier parlay builder." },
  { q: "Can I cancel anytime?", a: "One click from your dashboard. No phone calls, no hassle. We only want members who are profiting and want to be here." },
];

const pricingFeatures = [
  "Daily AI Intelligence Reports (3pm ET)",
  "68.3% Documented Strike Rate",
  "Alpha & Signal Engine Access",
  "Spreads / Totals / Moneylines / Parlays",
  "Full Market & Injury Tracking",
  "37-Point Vector Analysis Per Game",
  "Cancel Anytime — Zero Friction",
];

/* ═══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function Counter({ target, decimals = 0, suffix = "" }: { target: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => (decimals ? v.toFixed(decimals) : Math.round(v).toString()));
  const [text, setText] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const c = animate(value, target, { duration: 1.9, ease: "easeOut" });
    const u = display.on("change", (v) => setText(v));
    return () => { c.stop(); u(); };
  }, [inView, target, display, value]);
  return <span ref={ref} className="tabular-nums">{text}{suffix}</span>;
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="border-b border-white/10 cursor-pointer group"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4 py-5">
        <h4 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">{q}</h4>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5 text-accent-cyan/50 flex-shrink-0" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <p className="pb-5 text-sm leading-relaxed text-text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [navVisible, setNavVisible] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < 100) { setNavVisible(true); }
      else if (current > lastScroll.current) { setNavVisible(false); }
      else { setNavVisible(true); }
      lastScroll.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen text-white overflow-x-hidden bg-bg-primary">

      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: navVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-bg-primary/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-1.5 flex-shrink-0 min-w-0">
            <span className="text-sm sm:text-lg font-bold truncate">AI Sports Betting</span>
            <span className="rounded-md bg-[#00FF41] px-1.5 sm:px-2.5 py-0.5 text-bg-primary text-[10px] sm:text-xs font-black tracking-wider flex-shrink-0">PRO</span>
          </div>
          <div className="hidden gap-8 text-xs font-medium uppercase tracking-[0.15em] text-white/50 md:flex">
            <a href="#weapons" className="hover:text-[#00FF41] transition-colors">Arsenal</a>
            <a href="#proof" className="hover:text-[#00FF41] transition-colors">Proof</a>
            <a href="#pricing" className="hover:text-[#00FF41] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#00FF41] transition-colors">FAQ</a>
          </div>
          <a href="#pricing">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-[#00FF41] px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-bg-primary hover:bg-[#00DD38] transition-colors whitespace-nowrap"
            >
              Claim Your Edge
            </motion.button>
          </a>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
        <FlowingWaves />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary z-[2]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block border border-[#00FF41]/20 rounded-full px-5 py-1.5 mb-6"
          >
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#00FF41]">AI-Powered Market Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-[clamp(2.5rem,7vw,5rem)] font-black leading-[1.05] tracking-tight"
          >
            Stop Gambling.
            <br />
            <span className="text-[#00FF41]">Start Exploiting.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Our AI reads the market, finds the statistical weak points, and delivers a lethal betting edge to your inbox daily. Betting without it is a donation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CheckoutButton className="h-14 bg-[#00FF41] text-bg-primary font-bold text-base sm:text-lg px-6 sm:px-10 rounded-xl hover:bg-[#00DD38] transition-all shadow-[0_0_30px_rgba(0,255,65,0.3)]" />
            <a href="#weapons" className="text-sm text-white/40 hover:text-white/70 transition-colors font-medium uppercase tracking-widest border border-white/10 rounded-full px-6 py-3 hover:border-white/20">
              See The Arsenal ↓
            </a>
          </motion.div>

          {/* Live dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-16 mx-auto max-w-2xl"
          >
            <div className="glass p-6 border border-accent-cyan/20 shadow-[0_0_60px_rgba(0,240,255,0.1)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00FF41] animate-pulse" />
                  <span className="text-xs font-semibold text-white/80">Live Intelligence Feed</span>
                </div>
                <span className="text-[10px] text-white/30 uppercase tracking-wider">Updated 3pm ET</span>
              </div>
              {[
                { game: "BOS -3.5 vs MIA", edge: "8.2", conf: "HIGH" },
                { game: "DAL/PHX OVER 228.5", edge: "7.6", conf: "HIGH" },
                { game: "NYK ML + SAC +5.5", edge: "9.1", conf: "ELITE" },
              ].map((pick, i) => (
                <motion.div
                  key={pick.game}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + i * 0.2, duration: 0.5 }}
                  className="flex items-center justify-between py-3 border-t border-white/5 blur-[3px] select-none"
                >
                  <span className="text-sm text-white/80">{pick.game}</span>
                  <div className="flex gap-4 text-xs font-mono">
                    <span className="text-white/50">Edge: {pick.edge}</span>
                    <span className={pick.conf === "ELITE" ? "text-[#00FF41]" : "text-accent-cyan"}>{pick.conf}</span>
                  </div>
                </motion.div>
              ))}
              <div className="mt-4 text-center">
                <Lock className="h-4 w-4 text-white/20 mx-auto mb-1" />
                <p className="text-[11px] text-white/30 uppercase tracking-wider">Full intelligence unlocks with membership</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/15 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41]" />
          </motion.div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-red-950/5 to-bg-primary" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-red-400/60 mb-4">The Problem</p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              That &ldquo;Bad Beat&rdquo; Wasn&rsquo;t Bad Luck.
              <br />
              <span className="text-red-400">It Was a Data Problem.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { icon: X, label: "\"Expert\" Twitter picks", sub: "Opinions disguised as analysis" },
              { icon: AlertTriangle, label: "Gut-feel parlays", sub: "Hope is not a strategy" },
              { icon: X, label: "Public information bets", sub: "The books already priced it in" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="border border-red-400/15 rounded-xl p-5 bg-red-400/5 hover:border-red-400/30 transition-colors"
              >
                <item.icon className="h-6 w-6 text-red-400/60 mx-auto" />
                <p className="mt-2 text-base font-bold text-white/80">{item.label}</p>
                <p className="text-xs text-white/40 mt-1">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 text-base text-white/55 max-w-lg mx-auto leading-relaxed"
          >
            It&rsquo;s a data war, and the sportsbooks have the heavy artillery. You&rsquo;re fighting them with instinct and public information.
            <br />
            <span className="text-[#00FF41] font-semibold mt-2 inline-block">It&rsquo;s time to level the playing field.</span>
          </motion.p>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative py-12 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
              whileHover={{ y: -4 }}
            >
              <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-[#00FF41]/30 group-hover:bg-[#00FF41] transition-colors duration-300" />
              <p className="text-4xl sm:text-5xl font-black text-[#00FF41]">
                <Counter target={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── WEAPONS / ARSENAL ─── */}
      <section id="weapons" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#00FF41]/50 mb-2">The Weapon System</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Your New Arsenal.</h2>
            <p className="mt-3 text-white/40 max-w-lg text-sm leading-relaxed">Three proprietary engines working in concert. Each one gives you an edge the market can&rsquo;t see. Together, they make you dangerous.</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {weapons.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, boxShadow: "0 0 40px rgba(0,255,65,0.08)" }}
                className="glass p-8 hover:border-[#00FF41]/20 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-xl bg-[#00FF41]/10 border border-[#00FF41]/20 flex items-center justify-center group-hover:bg-[#00FF41]/15 transition-colors">
                    <w.icon className="h-6 w-6 text-[#00FF41]" />
                  </div>
                  <span className="text-4xl font-black text-white/5">{w.step}</span>
                </div>
                <h3 className="text-xl font-bold">{w.title}</h3>
                <p className="mt-1 text-sm font-semibold text-[#00FF41]/70">{w.subtitle}</p>
                <p className="mt-4 text-[13px] sm:text-sm leading-relaxed text-white/60">{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VERIFIED METRICS ─── */}
      <section id="proof" className="py-20 sm:py-28 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent-cyan/50 mb-2">Independently Verified</p>
            <h2 className="text-3xl sm:text-5xl font-black">Our Intelligence is Verified.</h2>
            <p className="mt-3 text-white/40 text-sm">No smoke and mirrors. Just pure statistical performance.</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { val: "68.3%", label: "Win Rate", sub: "Consistent wins across all major leagues", color: "text-[#00FF41]" },
              { val: "0.2151", label: "Brier Score", sub: "A coin flip is 0.25. We are significantly better.", color: "text-accent-cyan" },
              { val: "10.6", label: "MAE Points", sub: "We predict scores with chilling accuracy.", color: "text-[#00FF41]" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="glass p-8 text-center hover:border-accent-cyan/20 transition-all"
              >
                <p className={`text-4xl sm:text-5xl font-black ${m.color}`}>{m.val}</p>
                <p className="mt-2 text-sm font-bold text-white">{m.label}</p>
                <p className="mt-1 text-xs text-white/40">{m.sub}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 text-center text-xs text-white/30"
          >
            Updated nightly. Full historical backtest available. No cherry-picking.
          </motion.p>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#00FF41]/50 mb-2">Real Members. Real Returns.</p>
            <h2 className="text-3xl sm:text-5xl font-black">Reports From The Field.</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="glass p-7 relative group hover:border-[#00FF41]/15 transition-all"
              >
                <div className="absolute right-4 -top-3">
                  <span className="bg-[#00FF41] text-bg-primary text-xs font-bold px-3 py-1 rounded-full shadow-lg">{t.winAmount}</span>
                </div>
                <div className="flex gap-0.5 text-[#00FF41] text-sm mb-4">
                  {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                </div>
                <p className="text-sm leading-relaxed text-white/75 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="h-10 w-10 rounded-full bg-[#00FF41]/10 border border-[#00FF41]/20 flex items-center justify-center text-sm font-bold text-[#00FF41]">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3-STEP PROCESS ─── */}
      <section className="py-20 sm:py-28 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-5xl font-black">Deploy Your Edge in 3 Minutes.</h2>
            <p className="mt-3 text-white/40 text-sm max-w-xl mx-auto">No spreadsheets. No hours of research. Just open your email, place your bets, and let the math work.</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { num: "01", title: "Authorize Access", desc: "Create your account in under 60 seconds. Instant access. No setup fees." },
              { num: "02", title: "Receive Intelligence", desc: "Daily picks at 3pm ET — fully analyzed with edge scores and confidence ratings." },
              { num: "03", title: "Execute & Profit", desc: "Use our data to place smarter, sharper, and more confident wagers." },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="glass p-8 text-center hover:border-accent-cyan/15 transition-all"
              >
                <span className="text-5xl font-black text-accent-cyan/15">{step.num}</span>
                <h3 className="text-xl font-bold mt-2">{step.title}</h3>
                <p className="mt-3 text-sm text-white/50 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#00FF41]/50 mb-2">Limited Enrollment</p>
            <h2 className="text-3xl sm:text-5xl font-black">An Investment in Market Intelligence.</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00FF41]/10 via-accent-cyan/5 to-[#00FF41]/10 blur-xl opacity-60 pointer-events-none" />
            <div className="relative glass overflow-hidden p-8 sm:p-10 border-2 border-[#00FF41]/20">
              <div className="text-center">
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="inline-block bg-[#00FF41] text-bg-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6"
                >
                  🔥 Limited Enrollment — Protecting Member Edge
                </motion.span>

                <p className="text-white/30 line-through text-lg">$500/month</p>
                <h3 className="text-5xl sm:text-6xl font-black mt-1">
                  <span className="text-[#00FF41]">$250</span>
                  <span className="text-xl text-white/30">/month</span>
                </h3>
                <p className="text-sm text-white/50 mt-2 font-mono">This isn&rsquo;t a cost. It&rsquo;s an investment in a statistical weapon.</p>
              </div>

              <div className="mt-8 space-y-3 max-w-md mx-auto">
                {pricingFeatures.map((feat, i) => (
                  <motion.div
                    key={feat}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <Check className="h-4 w-4 text-[#00FF41] flex-shrink-0" />
                    <span className="text-white/70">{feat}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{ boxShadow: ["0 0 20px rgba(0,255,65,0.1)", "0 0 40px rgba(0,255,65,0.25)", "0 0 20px rgba(0,255,65,0.1)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-full"
                >
                  <CheckoutButton className="h-14 w-full bg-[#00FF41] text-bg-primary font-bold text-base sm:text-lg px-10 rounded-xl hover:bg-[#00DD38] transition-all" />
                </motion.div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-[10px] font-mono uppercase tracking-wider text-white/25">
                <div className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /><span>Secure Payment</span></div>
                <div className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /><span>Cancel Anytime</span></div>
                <div className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /><span>Instant Access</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-5xl font-black">Your Final Questions, Answered.</h2>
          <p className="mt-3 text-white/40 text-sm">Fair. Here&rsquo;s everything you need to make a decision.</p>
        </motion.div>
        <div>
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative py-20 sm:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-[#00FF41]/[0.02] to-bg-primary" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black"
          >
            You Can Keep Guessing.
            <br />
            <span className="text-[#00FF41]">Or You Can Start Winning.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-5 text-white/50 text-base sm:text-lg max-w-md mx-auto"
          >
            The house has an edge. The market has an edge. It&rsquo;s time you got yours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8"
          >
            <CheckoutButton className="h-16 w-full sm:w-auto bg-[#00FF41] text-bg-primary font-bold text-xl px-12 rounded-xl hover:bg-[#00DD38] transition-all shadow-[0_0_40px_rgba(0,255,65,0.2)]" />
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-10 px-6 pb-24 sm:pb-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold text-white/40">AI Sports Betting</span>
            <span className="rounded-md bg-[#00FF41]/20 text-[#00FF41] px-2 py-0.5 text-[10px] font-bold">PRO</span>
          </div>
          <div className="text-center sm:text-right text-[10px] text-white/20 font-mono space-y-1">
            <p>For entertainment purposes only. Not financial advice.</p>
            <p>Gambling problem? Call 1-800-GAMBLER.</p>
            <p>© {new Date().getFullYear()} AI Sports Betting Pro. The data is waiting. The edge is real.</p>
          </div>
        </div>
      </footer>

      {/* ─── MOBILE STICKY CTA ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-bg-primary via-bg-primary/95 to-transparent sm:hidden">
        <CheckoutButton className="w-full h-12 bg-[#00FF41] text-bg-primary font-bold rounded-xl shadow-[0_-2px_20px_rgba(0,255,65,0.2)]" />
      </div>
    </main>
  );
}
