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

interface Collaborator {
  id: string;
  name: string;
  role: string;
  domain: string;
  status: "ACTIVE" | "COMPLETED" | "ONGOING";
  image: string;   // path e.g. /images/collab-1.jpg
  xLink: string;   // their X/Twitter profile URL
}

// ─── UPDATE with Chase's real collaborators ───────────────────────────────────
const COLLABORATORS: Collaborator[] = [
  {
    id: "col-01",
    name:"10XOFWEB3",
    role: "Marketer",
    domain: "Marketer",
    status: "ACTIVE",
    image: "/images/10x.jpg",   // ← add image
    xLink: "https://x.com/10xofweb3?s=21", // ← add X link
  },
  {
    id: "col-02",
    name: "AlegeOfficial",
    role: "Branded Marketer",
    domain: "Branded Marketer",
    status: "COMPLETED",
    image: "/images/redguy.jpg",
    xLink: "https://x.com/alegeofficial?s=21",
  },
  {
    id: "col-03",
    name: "SENSEI",
    role: "Project Manager",
    domain: "Project Manager",
    status: "ONGOING",
    image: "/images/greyguy.jpg",
    xLink: "https://x.com/big_sensei?s=21",
  },
];

const STATUS_CONFIG = {
  ACTIVE:    { color: "#00b4ff", label: "Currently Working Together", dot: "animate-pulse" },
  COMPLETED: { color: "#60a5fa", label: "Project Completed",          dot: "" },
  ONGOING:   { color: "#f59e0b", label: "Ongoing Collaboration",      dot: "animate-pulse" },
};

function CollabCard({ collab, index }: { collab: Collaborator; index: number }) {
  const cfg = STATUS_CONFIG[collab.status];
  const aosFade = ["fade-up", "fade-up", "fade-up"][index];
  const delay = index * 150;

  return (
    <a
      href={collab.xLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline group cursor-pointer"
      data-aos={aosFade}
      data-aos-delay={delay}
      data-aos-duration="800"
    >
      <div className="relative border border-[rgba(0,180,255,0.18)] hover:border-[rgba(0,180,255,0.5)] bg-[rgba(3,8,16,0.85)] transition-all duration-300 overflow-hidden">

        {/* Left accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#00b4ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(0,180,255,0.12)]">
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="text-[rgba(0,180,255,0.6)] tracking-widest">
            Collaborator {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} style={{ background: cfg.color }} />
            <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "8px", color: cfg.color }} className="tracking-widest">{cfg.label}</span>
          </div>
        </div>

        {/* Image fades in via AOS */}
        <div
          className="relative w-full h-52 overflow-hidden bg-[rgba(0,180,255,0.04)]"
          data-aos="fade-in"
          data-aos-delay={delay + 200}
          data-aos-duration="1000"
        >
          {collab.image ? (
            <img
              src={collab.image}
              alt={collab.name}
              className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            /* Placeholder until image is added */
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[rgba(0,180,255,0.25)] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="rgba(0,180,255,0.35)" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "8px" }} className="text-[rgba(0,180,255,0.3)] tracking-widest uppercase">
                Add image → public/images/collab-{index + 1}.jpg
              </span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,8,16,0.8)] via-transparent to-transparent" />

          {/* X icon overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[rgba(3,8,16,0.4)]">
            <div className="w-12 h-12 rounded-full bg-[#00b4ff] flex items-center justify-center shadow-[0_0_20px_rgba(0,180,255,0.5)]">
              <svg viewBox="0 0 24 24" fill="#030810" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Name + role text fades up */}
        <div
          className="px-4 pt-4 pb-2"
          data-aos="fade-up"
          data-aos-delay={delay + 300}
          data-aos-duration="700"
        >
          <div style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", fontSize: "clamp(22px,3vw,30px)", lineHeight: 1, letterSpacing: "0.06em" }} className="text-white group-hover:text-[#00b4ff] transition-colors duration-300">
            {collab.name}
          </div>
          <div style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)", fontSize: "13px" }} className="text-white/95 mt-1">
            {collab.role}
          </div>
        </div>

        <div className="px-4 pb-4 flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="text-[rgba(0,180,255,0.6)] border border-[rgba(0,180,255,0.2)] px-2 py-0.5 tracking-wider">
            {collab.domain}
          </span>
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "8px" }} className="text-[rgba(0,180,255,0.4)] tracking-widest group-hover:text-[#00b4ff] transition-colors">
            VIEW ON X →
          </span>
        </div>

      </div>
    </a>
  );
}

export default function Collaborators() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="network" ref={ref} className="relative border-b border-[rgba(0,180,255,0.12)] overflow-hidden">
      <div className="border-b border-[rgba(0,180,255,0.12)] flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full animate-pulse" />
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(0,180,255,0.7)] tracking-widest uppercase">
            People I&apos;ve Worked With
          </span>
        </div>
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-white/60 tracking-widest hidden md:block">
          Click any card to visit their X profile
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", letterSpacing: "-0.01em" }} className="text-[clamp(40px,6vw,72px)] leading-none text-white">
              Who I&apos;ve <span className="text-[#00b4ff]">Collaborated</span> With
            </h2>
            <p style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "10px" }} className="text-[rgba(0,180,255,0.5)] tracking-widest uppercase mt-3">
              {COLLABORATORS.length} collaborators · click any card to visit their X
            </p>
          </div>
          <p style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }} className="text-white/95 text-sm leading-relaxed max-w-sm font-normal" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
            These are the founders, strategists, and creators I&apos;ve partnered with. Click any card to find them on X.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COLLABORATORS.map((collab, i) => (
            <CollabCard key={collab.id} collab={collab} index={i} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 border border-[rgba(0,180,255,0.12)] grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(0,180,255,0.12)]" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
          {[
            { value: "12+",  label: "Protocols & Projects" },
            { value: "3",    label: "Active Collaborators" },
            { value: "4",    label: "Blockchains Covered" },
            { value: "100%", label: "Always Delivered" },
          ].map((item, i) => (
            <div key={i} className="px-6 py-5 text-center group hover:bg-[rgba(0,180,255,0.04)] transition-colors">
              <div style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)", fontSize: "clamp(26px,4vw,38px)", lineHeight: 1 }} className="text-[#00b4ff] group-hover:text-white transition-colors">{item.value}</div>
              <div style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="text-white/60 tracking-widest uppercase mt-1.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}