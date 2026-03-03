"use client";

import { useRef, useEffect, useState } from "react";
import { useReveal } from "../lib/useReveal";
interface Collaborator {
  id: string;
  codename: string;
  name: string;
  role: string;
  domain: string;
  signal: number; // 0–100
  status: "ACTIVE" | "COMPLETED" | "ONGOING";
  brief: string;
  link?: string;
}

const COLLABORATORS: Collaborator[] = [
  {
    id: "col-01",
    codename: "PHANTOM",
    name: "Alex Rivera",         // ← update
    role: "Protocol Founder",
    domain: "DeFi Infrastructure",
    signal: 94,
    status: "ACTIVE",
    brief: "Co-led ambassador expansion across 4 chains. Built the community layer from zero to 8k holders.",
    link: "#",
  },
  {
    id: "col-02",
    codename: "CIPHER",
    name: "Maya Chen",           // ← update
    role: "Growth Lead",
    domain: "NFT Ecosystem",
    signal: 88,
    status: "COMPLETED",
    brief: "Partnered on narrative strategy and KOL outreach. Secondary volume 3× post-launch.",
    link: "#",
  },
  {
    id: "col-03",
    codename: "VECTOR",
    name: "Darius Obi",          // ← update
    role: "DAO Architect",
    domain: "Governance",
    signal: 91,
    status: "ONGOING",
    brief: "Designing community governance frameworks together. Active contributor to tokenomics writing.",
    link: "#",
  },
  {
    id: "col-04",
    codename: "NEXUS",
    name: "Sara Volkov",         // ← update
    role: "Brand Strategist",
    domain: "Web3 Marketing",
    signal: 85,
    status: "COMPLETED",
    brief: "Co-authored brand voice guide for a Tier-1 protocol. Reached 200k impressions in launch week.",
    link: "#",
  },
  {
    id: "col-05",
    codename: "HERALD",
    name: "James Kwon",          // ← update
    role: "Content Director",
    domain: "Crypto Media",
    signal: 97,
    status: "ACTIVE",
    brief: "Running a long-term content co-creation channel. Combined reach of 120k+ across platforms.",
    link: "#",
  },
  {
    id: "col-06",
    codename: "SIGNAL",
    name: "Leila Nasser",        // ← update
    role: "Community Lead",
    domain: "Layer 2 Protocol",
    signal: 79,
    status: "ONGOING",
    brief: "Ambassador program design and execution. Onboarded 300+ advocates across Discord and Telegram.",
    link: "#",
  },
];

const STATUS_CONFIG = {
  ACTIVE:    { color: "#00ff88", label: "ACTIVE",    dot: "animate-pulse" },
  COMPLETED: { color: "#60a5fa", label: "COMPLETED", dot: "" },
  ONGOING:   { color: "#f59e0b", label: "ONGOING",   dot: "animate-pulse" },
};

// Canvas lines connecting cards
function NetworkLines({ cardRefs }: { cardRefs: React.RefObject<(HTMLDivElement | null)[]> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    function draw() {
      if (!ctx || !canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cards = cardRefs.current;
      if (!cards) return;

      const rects = cards
        .filter(Boolean)
        .map((el) => {
          const r = el!.getBoundingClientRect();
          const pr = parent.getBoundingClientRect();
          return {
            cx: r.left - pr.left + r.width / 2,
            cy: r.top - pr.top + r.height / 2,
          };
        });

      // Connect pairs: 0↔1, 1↔2, 2↔3, 3↔4, 4↔5, 0↔3, 1↔4, 2↔5
      const pairs = [[0,1],[1,2],[3,4],[4,5],[0,3],[1,4],[2,5]];

      pairs.forEach(([a, b]) => {
        const from = rects[a];
        const to   = rects[b];
        if (!from || !to) return;

        // Dashed line
        ctx.beginPath();
        ctx.setLineDash([3, 8]);
        ctx.moveTo(from.cx, from.cy);
        ctx.lineTo(to.cx, to.cy);
        ctx.strokeStyle = "rgba(0,255,136,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);

        // Travelling pulse bead
        const speed = 0.0015 + (a * 0.0003);
        const progress = ((t * speed + (a + b) * 0.13) % 1 + 1) % 1;
        const px = from.cx + (to.cx - from.cx) * progress;
        const py = from.cy + (to.cy - from.cy) * progress;

        const grd = ctx.createRadialGradient(px, py, 0, px, py, 8);
        grd.addColorStop(0, "rgba(0,255,136,0.6)");
        grd.addColorStop(1, "rgba(0,255,136,0)");
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,136,0.9)";
        ctx.fill();
      });

      t++;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, [cardRefs]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

function CollabCard({
  collab,
  cardRef,
  index,
}: {
  collab: Collaborator;
  cardRef: (el: HTMLDivElement | null) => void;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const cfg = STATUS_CONFIG[collab.status];
  const delayClass = ["", "reveal-d1", "reveal-d2", "reveal-d1", "reveal-d2", "reveal-d3"][index] ?? "";

  return (
    <div
      ref={cardRef}
      className={`reveal ${delayClass} relative z-10`}
      style={{ perspective: "900px" }}
    >
      <div
        className="relative w-full transition-transform duration-700 cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "220px",
        }}
        onClick={() => setFlipped((f) => !f)}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 border border-[rgba(0,255,136,0.13)] hover:border-[rgba(0,255,136,0.35)] bg-[rgba(4,8,15,0.85)] backdrop-blur-sm transition-all duration-300 group"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(0,255,136,0.08)]">
            <span
              style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }}
              className="text-[rgba(0,255,136,0.4)] tracking-widest"
            >
              {collab.id.toUpperCase()}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}
                style={{ background: cfg.color }}
              />
              <span
                style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "8px", color: cfg.color }}
                className="tracking-widest"
              >
                {cfg.label}
              </span>
            </div>
          </div>

          {/* Codename */}
          <div className="px-4 pt-4 pb-2">
            <div
              style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", fontSize: "clamp(28px,3.5vw,38px)", lineHeight: 1, letterSpacing: "0.06em" }}
              className="text-white group-hover:text-[#00ff88] transition-colors duration-300"
            >
              {collab.codename}
            </div>
            <div
              style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)", fontSize: "12px" }}
              className="text-[rgba(242,237,230,0.45)] mt-1"
            >
              {collab.name}
            </div>
          </div>

          {/* Role + domain */}
          <div className="px-4 pb-4">
            <div
              style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)", fontSize: "13px" }}
              className="text-[rgba(242,237,230,0.7)] font-medium"
            >
              {collab.role}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span
                style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }}
                className="text-[rgba(0,255,136,0.5)] border border-[rgba(0,255,136,0.15)] px-2 py-0.5 tracking-wider"
              >
                {collab.domain}
              </span>
            </div>
          </div>

          {/* Signal bar */}
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span
                style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "8px" }}
                className="text-[rgba(0,255,136,0.3)] tracking-widest uppercase"
              >
                Collab Signal
              </span>
              <span
                style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", fontSize: "16px", lineHeight: 1 }}
                className="text-[#00ff88]"
              >
                {collab.signal}
              </span>
            </div>
            <div className="h-px w-full bg-[rgba(0,255,136,0.08)]">
              <div
                className="h-full bg-gradient-to-r from-[#00cc66] to-[#00ff88]"
                style={{
                  width: `${collab.signal}%`,
                  boxShadow: "0 0 6px rgba(0,255,136,0.4)",
                  transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
          </div>

          {/* Flip hint */}
          <div
            style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "8px" }}
            className="absolute bottom-2.5 right-4 text-[rgba(0,255,136,0.25)] tracking-widest group-hover:text-[rgba(0,255,136,0.5)] transition-colors"
          >
            FLIP FOR BRIEF →
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 border border-[rgba(0,255,136,0.3)] bg-[rgba(0,18,8,0.95)] backdrop-blur-sm p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Back top */}
          <div>
            <div
              style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }}
              className="text-[rgba(0,255,136,0.4)] tracking-widest mb-3 uppercase"
            >
              Mission Brief // {collab.id.toUpperCase()}
            </div>
            <p
              style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)", fontSize: "13px", lineHeight: "1.75" }}
              className="text-[rgba(242,237,230,0.7)]"
            >
              {collab.brief}
            </p>
          </div>

          {/* Back bottom */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(0,255,136,0.1)]">
            {collab.link && (
              <a
                href={collab.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }}
                className="text-[#00ff88] hover:text-white transition-colors tracking-widest uppercase no-underline"
              >
                View Profile →
              </a>
            )}
            <span
              style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }}
              className="text-[rgba(0,255,136,0.3)] tracking-widest"
            >
              ← FLIP BACK
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Collaborators() {
  const ref = useReveal();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section
      id="collaborators"
      ref={ref}
      className="relative border-b border-[rgba(0,255,136,0.08)] overflow-hidden"
    >
      {/* Section header */}
      <div className="border-b border-[rgba(0,255,136,0.1)] flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
          <span
            style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }}
            className="text-[10px] text-[rgba(0,255,136,0.6)] tracking-widest uppercase"
          >
            04 // The Network
          </span>
        </div>
        <span
          style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }}
          className="text-[10px] text-[rgba(242,237,230,0.2)] tracking-widest hidden md:block"
        >
          VERIFIED COLLABORATORS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="reveal">
            <h2
              style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", letterSpacing: "-0.01em" }}
              className="text-[clamp(40px,6vw,72px)] leading-none text-white"
            >
              The <span className="text-[#00ff88]">Network</span>
            </h2>
            <p
              style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "10px" }}
              className="text-[rgba(0,255,136,0.35)] tracking-widest uppercase mt-3"
            >
              {COLLABORATORS.length} verified connections · live signal active
            </p>
          </div>
          <p
            style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}
            className="reveal reveal-d1 text-[rgba(242,237,230,0.4)] text-sm leading-relaxed max-w-xs font-light"
          >
            The builders, founders, and creatives Chase has partnered with to move the Web3 space forward. Click any card to reveal the mission brief.
          </p>
        </div>

        {/* Network board — canvas lines + card grid */}
        <div className="relative">
          <NetworkLines cardRefs={cardRefs} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {COLLABORATORS.map((collab, i) => (
              <CollabCard
                key={collab.id}
                collab={collab}
                cardRef={(el) => { cardRefs.current[i] = el; }}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Bottom strip — trust signals */}
        <div className="reveal reveal-d3 mt-16 border border-[rgba(0,255,136,0.08)] grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(0,255,136,0.08)]">
          {[
            { value: "12+", label: "Protocols Worked With" },
            { value: "6",   label: "Active Collaborators" },
            { value: "4",   label: "Chains Covered" },
            { value: "100%", label: "Delivery Rate" },
          ].map((item, i) => (
            <div key={i} className="px-6 py-5 text-center group hover:bg-[rgba(0,255,136,0.02)] transition-colors">
              <div
                style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", fontSize: "clamp(26px,4vw,38px)", lineHeight: 1 }}
                className="text-[#00ff88] group-hover:text-white transition-colors"
              >
                {item.value}
              </div>
              <div
                style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }}
                className="text-[rgba(242,237,230,0.25)] tracking-widest uppercase mt-1.5"
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}