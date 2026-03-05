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

interface Project {
  id: string;
  code: string;
  status: "COMPLETED" | "ONGOING" | "CLASSIFIED";
  tags: string[];
  name: string;
  description: string;
  impact: string;
  image: string; // ← path to your image e.g. "/images/project-1.jpg"
  link: string;
}

// ─── UPDATE with Chase's real projects & images ───────────────────────────────
const PROJECTS: Project[] = [
  {
    id: "project-01",
    code: "Project 01",
    status: "COMPLETED",
    tags: ["Ambassador Program", "Community", "NFT"],
    name: "NFT Launch — Ambassador Lead",
    description: "I led the full ambassador and community strategy for a major NFT launch. That meant finding the right people, onboarding them properly, shaping the narrative, and keeping holders engaged long after mint day.",
    impact: "→ Strong secondary volume and a community that stayed active post-mint.",
    image: "/images/project-1.jpg",  // ← replace with your image
    link: "#contact",
  },
  {
    id: "project-02",
    code: "Project 02",
    status: "COMPLETED",
    tags: ["DeFi", "Content", "KOL"],
    name: "DeFi Protocol — Growth & Content",
    description: "Worked as a KOL and content lead for a growing DeFi protocol. I wrote the threads, shaped the messaging, and made sure the right people were paying attention at the right time.",
    impact: "→ Grew TVL and built lasting credibility in a crowded space.",
    image: "/images/project-2.jpg",  // ← replace with your image
    link: "#contact",
  },
  {
    id: "project-03",
    code: "Project 03",
    status: "ONGOING",
    tags: ["KOL", "Writing", "Strategy"],
    name: "KOL",
    description: "Currently helping a DAO turn passive token holders into people who actually participate. I handle the governance communication, onboarding content, and writing that makes complex decisions feel approachable.",
    impact: "→ Governance participation is up and the community feels more alive.",
    image: "/images/kol.jpg",  // ← replace with your image
    link: "https://x.com/chas30bg/status/2028336779665793032",
  },
];

const STATUS_COLORS: Record<Project["status"], string> = {
  COMPLETED:  "text-[#00b4ff] border-[rgba(0,180,255,0.3)]",
  ONGOING:    "text-[#f59e0b] border-[rgba(245,158,11,0.3)]",
  CLASSIFIED: "text-[rgba(242,237,230,0.4)] border-[rgba(242,237,230,0.1)]",
};

const STATUS_LABELS: Record<Project["status"], string> = {
  COMPLETED:  "Completed",
  ONGOING:    "In Progress",
  CLASSIFIED: "Confidential",
};

function ProjectCard({ project, delay }: { project: Project; delay: string }) {
  return (
    <div className={`reveal ${delay} relative border border-[rgba(0,180,255,0.1)] hover:border-[rgba(0,180,255,0.3)] transition-all duration-500 group bg-[rgba(0,180,255,0.01)] hover:bg-[rgba(0,180,255,0.03)] flex flex-col`}>

      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(0,180,255,0.08)]">
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] text-[rgba(0,180,255,0.4)] tracking-widest">{project.code}</span>
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className={`text-[9px] tracking-widest border px-2 py-0.5 ${STATUS_COLORS[project.status]}`}>{STATUS_LABELS[project.status]}</span>
      </div>

      {/* ── IMAGE AREA ── */}
      {/* Drop your image files into public/images/ and update the image path in PROJECTS above */}
      <div className="relative w-full h-52 border-b border-[rgba(0,180,255,0.08)] overflow-hidden bg-[rgba(0,180,255,0.02)]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          /* Shown until you add the real image */
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 border-2 border-dashed border-[rgba(0,180,255,0.2)] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="rgba(0,180,255,0.3)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "8px" }} className="text-[rgba(0,180,255,0.25)] tracking-widest uppercase text-center px-4">
              Add image → public/images/{project.id}.jpg
            </span>
          </div>
        )}
        {/* Gradient overlay so text below reads cleanly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,13,31,0.6)] via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="px-5 py-6 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] tracking-widest uppercase text-[rgba(242,237,230,0.35)] border border-[rgba(242,237,230,0.08)] px-2 py-0.5">{tag}</span>
          ))}
        </div>

        <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#00b4ff] transition-colors duration-300" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>{project.name}</h3>
        <p className="text-[rgba(242,237,230,0.55)] text-sm leading-relaxed mb-4 font-light flex-1" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>{project.description}</p>
        <p style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[11px] text-[#00b4ff] mb-6">{project.impact}</p>

        <div className="h-px bg-[rgba(0,180,255,0.08)] mb-5" />

        <a href={project.link} className="group/btn flex items-center gap-2 no-underline">
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] tracking-widest uppercase text-[rgba(242,237,230,0.4)] group-hover/btn:text-[#00b4ff] transition-colors">Get in touch</span>
          <div className="h-px w-6 bg-[rgba(242,237,230,0.2)] group-hover/btn:w-10 group-hover/btn:bg-[#00b4ff] transition-all duration-300" />
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useReveal();
  return (
    <section id="projects" ref={ref} className="relative border-b border-[rgba(0,180,255,0.08)]">
      <div className="border-b border-[rgba(0,180,255,0.1)] flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full animate-pulse" />
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(0,180,255,0.6)] tracking-widest uppercase">My Work</span>
        </div>
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(242,237,230,0.2)] tracking-widest hidden md:block">Real projects, real results</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="reveal">
            <h2 className="text-[clamp(40px,6vw,72px)] leading-none text-white tracking-tight" style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)" }}>
              Projects I&apos;ve<br /><span className="text-[#00b4ff]">Worked On</span>
            </h2>
          </div>
          <p className="reveal reveal-d1 text-[rgba(242,237,230,0.5)] text-sm leading-relaxed max-w-xs font-light" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>
            A look at some of the campaigns, communities, and protocols I&apos;ve helped build and grow. Each one had real stakes and real results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-[rgba(0,180,255,0.08)]">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="border-r border-[rgba(0,180,255,0.08)] last:border-r-0">
              <ProjectCard project={project} delay={["", "reveal-d1", "reveal-d2"][i] ?? ""} />
            </div>
          ))}
        </div>

        <div className="reveal reveal-d3 flex items-center gap-4 mt-10">
          <div className="h-px flex-1 bg-[rgba(0,180,255,0.06)]" />
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] text-[rgba(0,180,255,0.3)] tracking-widest uppercase whitespace-nowrap">More projects available on request</span>
          <div className="h-px flex-1 bg-[rgba(0,180,255,0.06)]" />
        </div>
      </div>
    </section>
  );
}