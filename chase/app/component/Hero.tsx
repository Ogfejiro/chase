"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data (inlined — update here) ────────────────────────────────────────────
const STATS = [
  { value: "50+",  label: "CAMPAIGNS LED" },
  { value: "3+",   label: "YEARS ACTIVE" },
  { value: "10K+", label: "COMMUNITY BUILT" },
  { value: "∞",    label: "WORDS WRITTEN" },
];

const ROLES = ["AMBASSADOR LEAD", "COMMUNITY BUILDER", "KOL + WRITER", "WEB3 STRATEGIST"];

// ─── Canvas node-network graphic ──────────────────────────────────────────────
interface Node { x: number; y: number; vx: number; vy: number; r: number; pulse: number; pulseSpeed: number; }

function HeroGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let w = canvas.offsetWidth, h = canvas.offsetHeight;
    canvas.width = w; canvas.height = h;
    const nodes: Node[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1, pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.02 + Math.random() * 0.02,
    }));
    const MAX_DIST = 130;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy; n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,180,255,${(1 - dist / MAX_DIST) * 0.25})`;
            ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      }
      nodes.forEach((n, i) => {
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const radius = n.r + glow * 2;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 6);
        grad.addColorStop(0, `rgba(0,180,255,${0.15 * glow})`);
        grad.addColorStop(1, "rgba(0,180,255,0)");
        ctx.beginPath(); ctx.arc(n.x, n.y, radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,180,255,${0.5 + glow * 0.5})`; ctx.fill();
        if (i % 6 === 0) {
          const size = 14 + Math.sin(n.pulse) * 3;
          ctx.save(); ctx.translate(n.x, n.y); ctx.rotate(n.pulse * 0.3);
          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const a = (Math.PI / 3) * s - Math.PI / 6;
            s === 0 ? ctx.moveTo(Math.cos(a) * size, Math.sin(a) * size) : ctx.lineTo(Math.cos(a) * size, Math.sin(a) * size);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(0,180,255,${0.15 + Math.sin(n.pulse) * 0.1})`; ctx.lineWidth = 0.8; ctx.stroke();
          ctx.restore();
        }
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { w = canvas.offsetWidth; h = canvas.offsetHeight; canvas.width = w; canvas.height = h; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return (
    <div className="absolute inset-0 hidden lg:block pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-[#060d1f] via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060d1f] via-transparent to-[#060d1f] z-10" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
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
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden scanline-host">
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,180,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.03) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <HeroGraphic />
      <div className="absolute top-20 left-0 w-24 h-24 border-l border-t border-[rgba(0,180,255,0.2)]" />
      <div className="absolute top-20 right-0 w-24 h-24 border-r border-t border-[rgba(0,180,255,0.2)]" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l border-b border-[rgba(0,180,255,0.2)]" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-[rgba(0,180,255,0.2)]" />
      <div className="absolute top-0 left-[15%] bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(0,180,255,0.06)] to-transparent hidden md:block" />
      <div className="absolute top-0 right-[15%] bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(0,180,255,0.06)] to-transparent hidden md:block" />
      <div className="absolute top-20 left-0 right-0 flex justify-between items-center px-8 md:px-16">
        <div style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(0,180,255,0.4)] tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00b4ff] inline-block animate-pulse" />SIGNAL ACTIVE
        </div>
        <div style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(0,180,255,0.4)] tracking-widest hidden md:block">WEB3 // ONCHAIN // CULTURE</div>
        <div style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(0,180,255,0.4)] tracking-widest">EST. 2021</div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-10">
        <div className="flex items-center gap-5 mb-2">
          {/* ── PROFILE PICTURE — replace /images/pfp.jpg with Chase's real PFP ── */}
          <div className="relative flex-shrink-0 self-end mb-3">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#00b4ff] shadow-[0_0_20px_rgba(0,180,255,0.35)]">
              <img src="/images/chasepic.jpg" alt="Chase" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[#00b4ff] border-2 border-[#060d1f] animate-pulse" />
          </div>
          <div className="overflow-hidden">
            <h1 data-text="CHASE" className="glitch text-[clamp(80px,20vw,220px)] leading-none tracking-[-0.02em] text-white select-none" style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)" }}>CHASE</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-8 overflow-hidden">
          <div className="h-px flex-1 bg-gradient-to-r from-[#00b4ff] to-transparent max-w-[80px]" />
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className={`text-sm md:text-base text-[#00b4ff] tracking-[0.2em] uppercase transition-opacity ${scrambling ? "opacity-60" : "opacity-100"}`}>{displayRole}</span>
          <div className="h-px flex-1 bg-gradient-to-l from-[#00b4ff] to-transparent max-w-[80px]" />
        </div>
        <p className="text-[rgba(242,237,230,0.55)] text-base md:text-lg max-w-xl leading-relaxed mb-10 font-light" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>
          Masterful writer. Strategic voice. Community architect.{" "}
          <span className="text-[rgba(242,237,230,0.85)] font-medium">Driving impact in Web3</span>{" "}
          through craft, culture, and connection — one word, one community, one campaign at a time.
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <a href="#contact" className="group relative px-8 py-3.5 bg-[#00b4ff] text-[#060d1f] no-underline overflow-hidden" style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "12px", letterSpacing: "0.12em", fontWeight: 700, textTransform: "uppercase" }}>
            <span className="relative z-10">Hire Me →</span>
            <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
          </a>
          <a href="#projects" className="px-8 py-3.5 border border-[rgba(0,180,255,0.3)] text-[rgba(242,237,230,0.7)] hover:border-[#00b4ff] hover:text-[#00b4ff] transition-all duration-300 no-underline" style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            View Work
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[rgba(0,180,255,0.12)]">
          {STATS.map((stat, i) => (
            <div key={i} className="px-6 py-5 border-r border-[rgba(0,180,255,0.12)] last:border-r-0 flex flex-col gap-1 group hover:bg-[rgba(0,180,255,0.03)] transition-colors duration-200">
              <span className="text-[#00b4ff] group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", fontSize: "clamp(28px,4vw,42px)", lineHeight: 1 }}>{stat.value}</span>
              <span className="text-[rgba(242,237,230,0.3)] tracking-widest" style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] text-[rgba(0,180,255,0.3)] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[rgba(0,180,255,0.3)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}