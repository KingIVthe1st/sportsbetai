"use client";

export function FlowingWaves() {
  return (
    <div className="absolute inset-x-0 top-0 h-[250px] overflow-hidden">
      {/* Dark base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060d1a] via-[#0a1225] to-transparent" />

      {/* Floating neon node boxes */}
      <div className="absolute top-[30px] left-[12%] h-[45px] w-[45px] rounded-lg border-2 border-[#00FF41]/40 bg-[#00FF41]/8 animate-float-slow" />
      <div className="absolute top-[60px] left-[30%] h-[35px] w-[35px] rounded-lg border-2 border-[#00D9FF]/35 bg-[#00D9FF]/8 animate-float-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[25px] left-[50%] h-[40px] w-[40px] rounded-lg border-2 border-[#00FF41]/30 bg-[#00FF41]/6 animate-float-slow" style={{ animationDelay: "4s" }} />
      <div className="absolute top-[50px] left-[70%] h-[38px] w-[38px] rounded-lg border-2 border-[#00D9FF]/40 bg-[#00D9FF]/8 animate-float-slow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[35px] left-[88%] h-[32px] w-[32px] rounded-lg border-2 border-[#00FF41]/25 bg-[#00FF41]/5 animate-float-slow" style={{ animationDelay: "3s" }} />

      {/* THICK neon green wave lines */}
      <svg
        viewBox="0 0 1400 250"
        className="absolute top-0 left-0 w-full h-full animate-wave-drift"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="greenThick1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0" />
            <stop offset="15%" stopColor="#39FF14" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00FF7F" stopOpacity="1" />
            <stop offset="85%" stopColor="#39FF14" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="greenThick2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
            <stop offset="20%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cyanThin" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0" />
            <stop offset="30%" stopColor="#00D9FF" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#00D9FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
          </linearGradient>
          <filter id="waveGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="waveGlowStrong">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Primary THICK green energy streaks */}
        <path
          d="M0,70 Q200,20 450,80 T900,50 T1400,80"
          fill="none"
          stroke="url(#greenThick1)"
          strokeWidth="50"
          filter="url(#waveGlowStrong)"
          opacity="0.5"
        />
        <path
          d="M0,100 Q300,50 600,110 T1000,80 T1400,110"
          fill="none"
          stroke="url(#greenThick1)"
          strokeWidth="40"
          filter="url(#waveGlow)"
          opacity="0.45"
        />
        <path
          d="M0,130 Q250,80 500,140 T900,110 T1400,150"
          fill="none"
          stroke="url(#greenThick2)"
          strokeWidth="45"
          filter="url(#waveGlow)"
          opacity="0.4"
        />

        {/* Thinner accent lines on top */}
        <path
          d="M0,75 Q350,30 700,90 T1400,65"
          fill="none"
          stroke="url(#greenThick1)"
          strokeWidth="4"
          filter="url(#waveGlow)"
          opacity="0.9"
        />
        <path
          d="M0,105 Q400,60 800,120 T1400,95"
          fill="none"
          stroke="url(#greenThick1)"
          strokeWidth="3"
          filter="url(#waveGlow)"
          opacity="0.8"
        />
        <path
          d="M0,135 Q300,95 650,145 T1300,120"
          fill="none"
          stroke="url(#greenThick2)"
          strokeWidth="3"
          filter="url(#waveGlow)"
          opacity="0.6"
        />

        {/* Cyan accent */}
        <path
          d="M0,160 Q300,130 650,170 T1300,145"
          fill="none"
          stroke="url(#cyanThin)"
          strokeWidth="2"
          filter="url(#waveGlow)"
          opacity="0.4"
        />
      </svg>

      {/* Bottom fade to dark */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0E17] to-transparent" />

      {/* Atmospheric glow */}
      <div className="absolute top-0 left-1/2 h-40 w-[800px] -translate-x-1/2 bg-gradient-to-b from-[#39FF14]/10 via-[#39FF14]/5 to-transparent blur-3xl" />
    </div>
  );
}
