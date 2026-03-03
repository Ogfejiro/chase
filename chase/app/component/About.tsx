"use client";

import { useEffect, useRef } from "react";
import { useReveal } from "../lib/useReveal";
import { SKILLS } from "../lib/data";
import AboutGraphic from "./AboutGraphics";

interface Skill {
  code: string;
  title: string;
  level: number;
  description: string;
}
function SignalBar({ level, code }: { level: number; code: string }) {
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
    <div className="h-1 w-full bg-[rgba(0,255,136,0.08)] rounded-none overflow-hidden">
      <div
        ref={barRef}
        className="signal-bar-fill"
        style={{ ["--level" as string]: "0%" }}
      />
    </div>
  );
}

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" ref={ref} className="relative border-b border-[rgba(0,255,136,0.08)] overflow-hidden">
      {/* Orbital graphic background */}
      <AboutGraphic />
      {/* Section header bar */}
      <div className="border-b border-[rgba(0,255,136,0.1)] flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
          <span
            style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
            className="text-[10px] text-[rgba(0,255,136,0.6)] tracking-widest uppercase"
          >
            01 // About
          </span>
        </div>
        <span
          style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
          className="text-[10px] text-[rgba(242,237,230,0.2)] tracking-widest hidden md:block"
        >
          OPERATOR PROFILE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left: bio */}
        <div>
          <div className="reveal">
            <h2
              className="text-[clamp(42px,7vw,80px)] leading-none text-white mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-display, 'Bebas Neue', cursive)", letterSpacing: "-0.01em" }}
            >
              The craft<br />
              <span className="text-[#00ff88]">behind</span><br />
              the noise
            </h2>
          </div>

          <div className="reveal reveal-d1 space-y-5">
            <p
              className="text-[rgba(242,237,230,0.55)] leading-[1.9] font-light"
              style={{ fontFamily: "var(--font-sans, 'Cabinet Grotesk', sans-serif)" }}
            >
              I'm <span className="text-[#f2ede6] font-medium">Chase</span> — a Web3 professional
              who believes that <span className="text-[#00ff88]">words move markets</span>, communities build
              empires, and the right voice at the right moment can change everything.
            </p>
            <p
              className="text-[rgba(242,237,230,0.55)] leading-[1.9] font-light"
              style={{ fontFamily: "var(--font-sans, 'Cabinet Grotesk', sans-serif)" }}
            >
              From leading ambassador programs to shaping narratives as a KOL, I bring
              a rare combination of{" "}
              <span className="text-[#f2ede6] font-medium">
                strategic thinking and storytelling craft
              </span>{" "}
              to every project. I don't do generic. I do impact.
            </p>
          </div>

          <div className="reveal reveal-d2 mt-10">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 no-underline"
            >
              <span
                style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
                className="text-[11px] tracking-widest uppercase text-[#00ff88] group-hover:text-white transition-colors"
              >
                Let's talk
              </span>
              <div className="h-px w-12 bg-[#00ff88] group-hover:w-20 transition-all duration-500" />
            </a>
          </div>
        </div>

        {/* Right: skill dashboard */}
        <div className="reveal reveal-d1">
          <div
            style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
            className="text-[9px] text-[rgba(0,255,136,0.4)] tracking-widest mb-6 uppercase"
          >
            Signal Strength // Capability Index
          </div>

          <div className="space-y-0 border border-[rgba(0,255,136,0.12)]">
            {SKILLS.map((skill: Skill, i) => (
              <div
                key={i}
                className="group px-5 py-5 border-b border-[rgba(0,255,136,0.08)] last:border-b-0 hover:bg-[rgba(0,255,136,0.03)] transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span
                        style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
                        className="text-[9px] text-[rgba(0,255,136,0.4)] tracking-widest"
                      >
                        {skill.code}
                      </span>
                    </div>
                    <h3
                      className="text-[rgba(242,237,230,0.9)] font-semibold text-sm group-hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-sans, 'Cabinet Grotesk', sans-serif)" }}
                    >
                      {skill.title}
                    </h3>
                  </div>
                  <span
                    className="text-[#00ff88] flex-shrink-0 mt-1"
                    style={{ fontFamily: "var(--font-display, 'Bebas Neue', cursive)", fontSize: "22px", lineHeight: 1 }}
                  >
                    {skill.level}
                  </span>
                </div>

                <p
                  className="text-[rgba(242,237,230,0.35)] text-xs leading-relaxed mb-3 font-light"
                  style={{ fontFamily: "var(--font-sans, 'Cabinet Grotesk', sans-serif)" }}
                >
                  {skill.description}
                </p>

                <SignalBar level={skill.level} code={skill.code} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}