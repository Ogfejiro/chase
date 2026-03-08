"use client";

import { useEffect, useState } from "react";

const STATS = [
  { value: "50+",  label: "CAMPAIGNS LED" },
  { value: "3+",   label: "YEARS ACTIVE" },
  { value: "10K+", label: "COMMUNITY BUILT" },
  { value: "∞",    label: "WORDS WRITTEN" },
];

const ROLES = ["AMBASSADOR LEAD", "COMMUNITY BUILDER", "KOL + WRITER", "WEB3 STRATEGIST"];

const X_LINK = "https://x.com/chas30bg?s=21";

function HeroGraphic() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <img
        src="/images/Hero.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ display: "block" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(5,11,24,0.25)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #050b18, rgba(5,11,24,0.35), transparent)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,11,24,0.2), transparent, #050b18)" }} />
    </div>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayRole, setDisplayRole] = useState(ROLES[0]);
  const [scrambling, setScrambling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrambling(true);
      const nextIndex = (roleIndex + 1) % ROLES.length;
      const target = ROLES[nextIndex];
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let frame = 0;
      const totalFrames = 14;
      const scramble = setInterval(() => {
        const progress = frame / totalFrames;
        const resolved = Math.floor(progress * target.length);
        setDisplayRole(target.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < resolved) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(""));
        frame++;
        if (frame > totalFrames) {
          clearInterval(scramble);
          setDisplayRole(target);
          setScrambling(false);
          setRoleIndex(nextIndex);
        }
      }, 50);
    }, 3200);
    return () => clearInterval(interval);
  }, [roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      <HeroGraphic />

      {/* Corner accents — hidden on mobile to reduce clutter */}
      <div className="absolute top-20 left-0 w-16 h-16 md:w-24 md:h-24 border-l border-t border-[rgba(0,180,255,0.3)]" />
      <div className="absolute top-20 right-0 w-16 h-16 md:w-24 md:h-24 border-r border-t border-[rgba(0,180,255,0.3)]" />
      <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 border-l border-b border-[rgba(0,180,255,0.3)]" />
      <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-r border-b border-[rgba(0,180,255,0.3)]" />

      {/* Top bar */}
      <div className="absolute top-6 md:top-20 left-0 right-0 flex justify-between items-center px-5 md:px-16 z-10">
        <div style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] md:text-[10px] text-[rgba(0,180,255,0.7)] tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00b4ff] inline-block animate-pulse" />
          SIGNAL ACTIVE
        </div>
        <div style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(0,180,255,0.6)] tracking-widest hidden md:block">WEB3 // ONCHAIN // CULTURE</div>
        <div style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] md:text-[10px] text-[rgba(0,180,255,0.6)] tracking-widest">EST. 2021</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-10 pt-24 md:pt-10 pb-24">

        {/* Avatar + Name */}
        <div className="flex items-end gap-3 md:gap-5 mb-3 md:mb-2" data-aos="fade-up" data-aos-duration="800">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#00b4ff] shadow-[0_0_20px_rgba(0,180,255,0.5)]">
              <img src="/images/chasepic.jpg" alt="Chase" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#00b4ff] border-2 border-[#050b18] animate-pulse" />
          </div>
          <h1
            className="leading-none tracking-[-0.02em] text-white select-none"
            style={{
              fontFamily: "var(--font-display,'Bebas Neue',cursive)",
              fontSize: "clamp(60px,15vw,220px)",
              lineHeight: 0.9,
            }}
          >
            CHASE
          </h1>
        </div>

        {/* Role scrambler */}
        <div className="flex items-center gap-3 mb-5 md:mb-8" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
          <div className="h-px w-10 md:w-20 bg-gradient-to-r from-[#00b4ff] to-transparent flex-shrink-0" />
          <span
            style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }}
            className={`text-xs md:text-base text-[#00b4ff] tracking-[0.15em] md:tracking-[0.2em] uppercase transition-opacity ${scrambling ? "opacity-60" : "opacity-100"}`}
          >
            {displayRole}
          </span>
          <div className="h-px w-10 md:w-20 bg-gradient-to-l from-[#00b4ff] to-transparent flex-shrink-0" />
        </div>

        {/* Bio */}
        <p
          className="text-white/90 text-sm md:text-lg max-w-sm md:max-w-xl leading-relaxed mb-8 md:mb-10 font-light"
          style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}
          data-aos="fade-up" data-aos-delay="200" data-aos-duration="800"
        >
          Masterful writer. Strategic voice. Community architect.{" "}
          <span className="text-white font-medium">Driving impact in Web3</span>{" "}
          through craft, culture, and connection.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 md:gap-4 mb-10 md:mb-16" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
          <a
            href="#contact"
            className="group relative px-6 md:px-8 py-3 md:py-3.5 bg-[#00b4ff] text-[#050b18] no-underline overflow-hidden"
            style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "11px", letterSpacing: "0.1em", fontWeight: 700, textTransform: "uppercase" }}
          >
            <span className="relative z-10">Hire Me →</span>
            <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
          </a>
          <a
            href={X_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 md:px-8 py-3 md:py-3.5 border border-[rgba(0,180,255,0.45)] text-white hover:border-[#00b4ff] hover:text-[#00b4ff] transition-all duration-300 no-underline"
            style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Follow on X →
          </a>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[rgba(0,180,255,0.25)]"
          data-aos="fade-up" data-aos-delay="400" data-aos-duration="800"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="px-4 md:px-6 py-4 md:py-5 border-r border-[rgba(0,180,255,0.25)] last:border-r-0 flex flex-col gap-1 group hover:bg-[rgba(0,180,255,0.06)] transition-colors duration-200">
              <span
                className="text-[#00b4ff] group-hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", fontSize: "clamp(22px,5vw,42px)", lineHeight: 1 }}
              >
                {stat.value}
              </span>
              <span
                className="text-white/70 tracking-widest"
                style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "8px" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] text-[rgba(0,180,255,0.6)] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 md:h-12 bg-gradient-to-b from-[rgba(0,180,255,0.5)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}