"use client";

import { useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    container.querySelectorAll<HTMLElement>(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

interface Skill { code: string; title: string; description: string; level: number; }

const SKILLS: Skill[] = [
  { code: "01", title: "Ambassador Lead", description: "I build and run ambassador programs from scratch — finding the right people, giving them direction, and turning them into a coordinated force that grows protocols.", level: 92 },
  { code: "02", title: "Community Building", description: "I don't just grow numbers. I build communities where people actually show up, talk, and stay — because they feel like they belong to something real.", level: 95 },
  { code: "03", title: "KOL & Content", description: "I create content that gets attention and earns trust. Threads, announcements, long-form — written to move people from curious to convinced.", level: 88 },
  { code: "04", title: "Web3 Writing", description: "Whether it's a whitepaper, a tweet thread, or a launch post — I write with clarity and conviction. Every word has a job to do.", level: 97 },
];

function SignalBar({ level }: { level: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.setProperty("--level", `${level}%`);
          el.classList.add("animated");
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);
  return (
    <div className="h-1 w-full bg-[rgba(0,180,255,0.08)] overflow-hidden">
      <div ref={barRef} className="signal-bar-fill" style={{ ["--level" as string]: "0%" }} />
    </div>
  );
}

function AboutGraphic() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.18] pointer-events-none hidden xl:block">
      <svg suppressHydrationWarning viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="about-orb-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00b4ff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#00b4ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00b4ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="about-orb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00b4ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00b4ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="210" cy="210" r="200" fill="url(#about-orb-glow)" />
        <ellipse cx="210" cy="210" rx="190" ry="55" stroke="#00b4ff" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="4 6">
          <animateTransform attributeName="transform" type="rotate" from="0 210 210" to="360 210 210" dur="22s" repeatCount="indefinite" />
        </ellipse>
        <circle r="4" fill="#00b4ff">
          <animateMotion dur="22s" repeatCount="indefinite"><mpath xlinkHref="#about-path-r1" /></animateMotion>
        </circle>
        <path id="about-path-r1" d="M 20,210 A 190,55 0 1,1 400,210 A 190,55 0 1,1 20,210" fill="none" />
        <ellipse cx="210" cy="210" rx="145" ry="70" stroke="#00b4ff" strokeWidth="0.6" strokeOpacity="0.5" transform="rotate(-30 210 210)">
          <animateTransform attributeName="transform" type="rotate" from="-30 210 210" to="330 210 210" dur="14s" repeatCount="indefinite" />
        </ellipse>
        <circle r="5" fill="#00b4ff" fillOpacity="0.9">
          <animateMotion dur="14s" repeatCount="indefinite"><mpath xlinkHref="#about-path-r2" /></animateMotion>
        </circle>
        <path id="about-path-r2" d="M 65,210 A 145,70 0 1,1 355,210 A 145,70 0 1,1 65,210" fill="none" transform="rotate(-30 210 210)" />
        <ellipse cx="210" cy="210" rx="100" ry="30" stroke="#00b4ff" strokeWidth="0.8" strokeOpacity="0.6" transform="rotate(60 210 210)">
          <animateTransform attributeName="transform" type="rotate" from="60 210 210" to="420 210 210" dur="9s" repeatCount="indefinite" />
        </ellipse>
        <circle r="3.5" fill="#00b4ff">
          <animateMotion dur="9s" repeatCount="indefinite"><mpath xlinkHref="#about-path-r3" /></animateMotion>
        </circle>
        <path id="about-path-r3" d="M 110,210 A 100,30 0 1,1 310,210 A 100,30 0 1,1 110,210" fill="none" transform="rotate(60 210 210)" />
        <polygon points="210,168 243,189 243,231 210,252 177,231 177,189" stroke="#00b4ff" strokeWidth="0.8" strokeOpacity="0.5" fill="none">
          <animateTransform attributeName="transform" type="rotate" from="0 210 210" to="360 210 210" dur="18s" repeatCount="indefinite" />
        </polygon>
        <polygon points="210,182 232,194 232,226 210,238 188,226 188,194" stroke="#00b4ff" strokeWidth="0.5" strokeOpacity="0.3" fill="none">
          <animateTransform attributeName="transform" type="rotate" from="360 210 210" to="0 210 210" dur="12s" repeatCount="indefinite" />
        </polygon>
        <circle cx="210" cy="210" r="16" fill="url(#about-orb-core)">
          <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="210" cy="210" r="6" fill="#00b4ff" fillOpacity="0.95">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
        </circle>
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return <line suppressHydrationWarning key={i} x1={210 + Math.cos(angle) * 195} y1={210 + Math.sin(angle) * 195} x2={210 + Math.cos(angle) * 202} y2={210 + Math.sin(angle) * 202} stroke="#00b4ff" strokeWidth="0.8" strokeOpacity="0.4" />;
        })}
      </svg>
    </div>
  );
}

export default function About() {
  const ref = useReveal();
  return (
    <section id="about" ref={ref} className="relative border-b border-[rgba(0,180,255,0.08)] overflow-hidden">
      <AboutGraphic />

      {/* Section label */}
      <div className="border-b border-[rgba(0,180,255,0.1)] flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full animate-pulse" />
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(0,180,255,0.6)] tracking-widest uppercase">
            About Me
          </span>
        </div>
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(242,237,230,0.2)] tracking-widest hidden md:block">
          Who is Chase?
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* Left — bio */}
        <div>
          <div className="reveal">
            <h2 className="text-[clamp(42px,7vw,80px)] leading-none text-white mb-6" style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", letterSpacing: "-0.01em" }}>
              The person<br /><span className="text-[#00b4ff]">behind</span><br />the work
            </h2>
          </div>
          <div className="reveal reveal-d1 space-y-5">
            <p className="text-[rgba(242,237,230,0.65)] leading-[1.9] font-light text-base" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>
              I&apos;m <span className="text-[#f2ede6] font-medium">Chase</span> — a Web3 professional who has spent years helping protocols grow their communities, sharpen their voice, and turn strangers into believers.
            </p>
            <p className="text-[rgba(242,237,230,0.65)] leading-[1.9] font-light text-base" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>
              I combine <span className="text-[#f2ede6] font-medium">strategic thinking with strong writing</span> — so every campaign I touch has both a clear direction and words that actually land. I&apos;ve led ambassador programs, built communities from zero, and written content that moves markets.
            </p>
            <p className="text-[rgba(242,237,230,0.65)] leading-[1.9] font-light text-base" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>
              If you need someone who can <span className="text-[#00b4ff]">build, grow, and communicate</span> — that&apos;s exactly what I do.
            </p>
          </div>
          <div className="reveal reveal-d2 mt-10">
            <a href="#contact" className="group inline-flex items-center gap-3 no-underline">
              <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[11px] tracking-widest uppercase text-[#00b4ff] group-hover:text-white transition-colors">Work with me</span>
              <div className="h-px w-12 bg-[#00b4ff] group-hover:w-20 transition-all duration-500" />
            </a>
          </div>
        </div>

        {/* Right — skills */}
        <div className="reveal reveal-d1">
          <div style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] text-[rgba(0,180,255,0.4)] tracking-widest mb-6 uppercase">
            What I&apos;m good at
          </div>
          <div className="space-y-0 border border-[rgba(0,180,255,0.12)]">
            {SKILLS.map((skill: Skill, i: number) => (
              <div key={i} className="group px-5 py-5 border-b border-[rgba(0,180,255,0.08)] last:border-b-0 hover:bg-[rgba(0,180,255,0.03)] transition-colors duration-200">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="mb-1.5">
                      <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] text-[rgba(0,180,255,0.4)] tracking-widest">#{skill.code}</span>
                    </div>
                    <h3 className="text-[rgba(242,237,230,0.9)] font-semibold text-sm group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>{skill.title}</h3>
                  </div>
                  <span className="text-[#00b4ff] flex-shrink-0 mt-1" style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", fontSize: "22px", lineHeight: 1 }}>{skill.level}%</span>
                </div>
                <p className="text-[rgba(242,237,230,0.45)] text-xs leading-relaxed mb-3 font-light" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>{skill.description}</p>
                <SignalBar level={skill.level} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}