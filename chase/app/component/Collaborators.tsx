"use client";

import { useEffect, useRef, useState } from "react";

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

interface Collaborator {
  id: string;
  name: string;
  role: string;
  domain: string;
  status: "ACTIVE" | "COMPLETED" | "ONGOING";
  brief: string;
  image: string; // ← path to image e.g. "/images/collab-1.jpg"
  link?: string;
}

// ─── UPDATE THESE with Chase's real collaborators ─────────────────────────────
const COLLABORATORS: Collaborator[] = [
  {
    id: "col-01",
    name: "10x of Web3",        // ← update
    role: "Web3 Markerter",               // ← update
    domain: "Their Field",            // ← update
    status: "ACTIVE",
    brief: "Write what you both worked on together and what the result was.",  // ← update
    image: "/images/10x.jpg",   // ← add your image here
    link: "#",                        // ← update with their profile link
  },
  {
    id: "col-02",
    name: "Collaborator Name",        // ← update
    role: "Their Role",               // ← update
    domain: "Their Field",            // ← update
    status: "COMPLETED",
    brief: "Write what you both worked on together and what the result was.",  // ← update
    image: "/images/redguy.jpg",   // ← add your image here
    link: "#",
  },
  {
    id: "col-03",
    name: "Collaborator Name",        // ← update
    role: "Their Role",               // ← update
    domain: "Their Field",            // ← update
    status: "ONGOING",
    brief: "Write what you both worked on together and what the result was.",  // ← update
    image: "/images/greyguy.jpg",   // ← add your image here
    link: "#",
  },
];

const STATUS_CONFIG = {
  ACTIVE:    { color: "#00b4ff", label: "Currently Working Together", dot: "animate-pulse" },
  COMPLETED: { color: "#60a5fa", label: "Project Completed",          dot: "" },
  ONGOING:   { color: "#f59e0b", label: "Ongoing Collaboration",      dot: "animate-pulse" },
};

function NetworkLines({ cardRefs }: { cardRefs: React.RefObject<(HTMLDivElement | null)[]> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number, t = 0;
    function draw() {
      if (!ctx || !canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cards = cardRefs.current;
      if (!cards) return;
      const pr = parent.getBoundingClientRect();
      const rects = cards.filter(Boolean).map((el) => {
        const r = el!.getBoundingClientRect();
        return { cx: r.left - pr.left + r.width / 2, cy: r.top - pr.top + r.height / 2 };
      });
      [[0,1],[1,2],[0,2]].forEach(([a, b]) => {
        const from = rects[a], to = rects[b];
        if (!from || !to) return;
        ctx.beginPath(); ctx.setLineDash([3, 8]);
        ctx.moveTo(from.cx, from.cy); ctx.lineTo(to.cx, to.cy);
        ctx.strokeStyle = "rgba(0,180,255,0.07)"; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
        const progress = ((t * (0.0015 + a * 0.0003) + (a + b) * 0.13) % 1 + 1) % 1;
        const px = from.cx + (to.cx - from.cx) * progress;
        const py = from.cy + (to.cy - from.cy) * progress;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 8);
        grd.addColorStop(0, "rgba(0,180,255,0.6)");
        grd.addColorStop(1, "rgba(0,180,255,0)");
        ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fillStyle = "rgba(0,180,255,0.9)"; ctx.fill();
      });
      t++; raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [cardRefs]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

function CollabCard({ collab, cardRef, index }: {
  collab: Collaborator;
  cardRef: (el: HTMLDivElement | null) => void;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const cfg = STATUS_CONFIG[collab.status];
  const delayClass = ["", "reveal-d1", "reveal-d2"][index] ?? "";

  return (
    <div ref={cardRef} className={`reveal ${delayClass} relative z-10`} style={{ perspective: "900px" }}>
      <div
        className="relative w-full transition-transform duration-700 cursor-pointer"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", minHeight: "340px" }}
        onClick={() => setFlipped(f => !f)}
      >

        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 border border-[rgba(0,180,255,0.13)] hover:border-[rgba(0,180,255,0.35)] bg-[rgba(6,13,31,0.85)] transition-all duration-300 group overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(0,180,255,0.08)]">
            <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="text-[rgba(0,180,255,0.4)] tracking-widest">
              Collaborator {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} style={{ background: cfg.color }} />
              <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "8px", color: cfg.color }} className="tracking-widest">{cfg.label}</span>
            </div>
          </div>

          {/* ── IMAGE PLACEHOLDER ── */}
          {/* Replace the src below with collab.image once you add the real images */}
          <div className="relative w-full h-48 border-b border-[rgba(0,180,255,0.08)] overflow-hidden bg-[rgba(0,180,255,0.03)]">
            {collab.image ? (
              <img
                src={collab.image}
                alt={collab.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
            ) : (
              /* Placeholder shown until you add the real image */
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[rgba(0,180,255,0.2)] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="rgba(0,180,255,0.3)" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "8px" }} className="text-[rgba(0,180,255,0.25)] tracking-widest uppercase">
                  Add image → public/images/collab-{index + 1}.jpg
                </span>
              </div>
            )}
            {/* Green tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,13,31,0.7)] via-transparent to-transparent" />
          </div>

          {/* Name + role */}
          <div className="px-4 pt-4 pb-2">
            <div style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", fontSize: "clamp(22px,3vw,30px)", lineHeight: 1, letterSpacing: "0.06em" }} className="text-white group-hover:text-[#00b4ff] transition-colors duration-300">
              {collab.name}
            </div>
            <div style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)", fontSize: "12px" }} className="text-[rgba(242,237,230,0.45)] mt-1">{collab.role}</div>
          </div>

          <div className="px-4 pb-4">
            <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="text-[rgba(0,180,255,0.5)] border border-[rgba(0,180,255,0.15)] px-2 py-0.5 tracking-wider">{collab.domain}</span>
          </div>

          <div style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "8px" }} className="absolute bottom-2.5 right-4 text-[rgba(0,180,255,0.25)] tracking-widest group-hover:text-[rgba(0,180,255,0.5)] transition-colors">
            TAP TO SEE WHAT WE BUILT →
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 border border-[rgba(0,180,255,0.3)] bg-[rgba(0,18,8,0.97)] p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="text-[rgba(0,180,255,0.4)] tracking-widest mb-3 uppercase">
              What we worked on together
            </div>
            <p style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)", fontSize: "14px", lineHeight: "1.8" }} className="text-[rgba(242,237,230,0.75)]">
              {collab.brief}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(0,180,255,0.1)]">
            {collab.link && (
              <a href={collab.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }}
                className="text-[#00b4ff] hover:text-white transition-colors tracking-widest uppercase no-underline">
                View Profile →
              </a>
            )}
            <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="text-[rgba(0,180,255,0.3)] tracking-widest">← Tap to go back</span>
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
    <section id="network" ref={ref} className="relative border-b border-[rgba(0,180,255,0.08)] overflow-hidden">
      <div className="border-b border-[rgba(0,180,255,0.1)] flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full animate-pulse" />
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(0,180,255,0.6)] tracking-widest uppercase">
            People I&apos;ve Worked With
          </span>
        </div>
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(242,237,230,0.2)] tracking-widest hidden md:block">
          Tap any card to see what we built
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="reveal">
            <h2 style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", letterSpacing: "-0.01em" }} className="text-[clamp(40px,6vw,72px)] leading-none text-white">
              Who I&apos;ve <span className="text-[#00b4ff]">Collaborated</span> With
            </h2>
            <p style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "10px" }} className="text-[rgba(0,180,255,0.35)] tracking-widest uppercase mt-3">
              {COLLABORATORS.length} collaborators · tap any card to read the full story
            </p>
          </div>
          <p style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }} className="reveal reveal-d1 text-[rgba(242,237,230,0.5)] text-sm leading-relaxed max-w-sm font-light">
            These are the founders, strategists, and creators I&apos;ve partnered with to build things that actually worked. Every card has a real story behind it.
          </p>
        </div>

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

        <div className="reveal reveal-d3 mt-16 border border-[rgba(0,180,255,0.08)] grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(0,180,255,0.08)]">
          {[
            { value: "12+",  label: "Protocols & Projects" },
            { value: "3",    label: "Active Collaborators" },
            { value: "4",    label: "Blockchains Covered" },
            { value: "100%", label: "Always Delivered" },
          ].map((item, i) => (
            <div key={i} className="px-6 py-5 text-center group hover:bg-[rgba(0,180,255,0.02)] transition-colors">
              <div style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", fontSize: "clamp(26px,4vw,38px)", lineHeight: 1 }} className="text-[#00b4ff] group-hover:text-white transition-colors">{item.value}</div>
              <div style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="text-[rgba(242,237,230,0.25)] tracking-widest uppercase mt-1.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}