"use client";

import { useReveal } from "../lib/useReveal";
import { PROJECTS } from "../lib/data";
import { SigilNFT, SigilDeFi, SigilDAO } from "./ProjectSigils";

interface Project {
  id: string;
  code: string;
  status: "COMPLETED" | "ONGOING" | "CLASSIFIED";
  tags: string[];
  name: string;
  description: string;
  impact: string;
  link: string;
}

const SIGILS: Record<string, React.ReactNode> = {
  nft:  <SigilNFT />,
  defi: <SigilDeFi />,
  dao:  <SigilDAO />,
};

const STATUS_COLORS: Record<Project["status"], string> = {
  COMPLETED: "text-[#00ff88] border-[rgba(0,255,136,0.3)]",
  ONGOING: "text-[#f59e0b] border-[rgba(245,158,11,0.3)]",
  CLASSIFIED: "text-[rgba(242,237,230,0.4)] border-[rgba(242,237,230,0.1)]",
};

function DossierCard({ project, delay }: { project: Project; delay: string }) {
  const sigil = SIGILS[project.id];
  return (
    <div className={`dossier-card reveal ${delay} relative border border-[rgba(0,255,136,0.1)] hover:border-[rgba(0,255,136,0.3)] transition-all duration-500 group bg-[rgba(0,255,136,0.01)] hover:bg-[rgba(0,255,136,0.03)]`}>
      {/* Left accent line */}
      <div className="dossier-line" />

      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(0,255,136,0.08)]">
        <span
          style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
          className="text-[9px] text-[rgba(0,255,136,0.4)] tracking-widest"
        >
          {project.code}
        </span>
        <span
          style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
          className={`text-[9px] tracking-widest border px-2 py-0.5 ${STATUS_COLORS[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      {/* Sigil graphic */}
      {sigil && (
        <div className="border-b border-[rgba(0,255,136,0.08)]">
          {sigil}
        </div>
      )}

      {/* Body */}
      <div className="px-5 py-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
              className="text-[9px] tracking-widest uppercase text-[rgba(242,237,230,0.35)] border border-[rgba(242,237,230,0.08)] px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="text-white text-xl font-bold mb-3 group-hover:text-[#00ff88] transition-colors duration-300"
          style={{ fontFamily: "var(--font-sans, 'Cabinet Grotesk', sans-serif)" }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          className="text-[rgba(242,237,230,0.45)] text-sm leading-relaxed mb-4 font-light"
          style={{ fontFamily: "var(--font-sans, 'Cabinet Grotesk', sans-serif)" }}
        >
          {project.description}
        </p>

        {/* Impact */}
        <p
          style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
          className="text-[11px] text-[#00ff88] mb-6"
        >
          {project.impact}
        </p>

        {/* Divider */}
        <div className="h-px bg-[rgba(0,255,136,0.08)] mb-5" />

        {/* CTA */}
        <a
          href={project.link}
          className="group/btn flex items-center gap-2 no-underline"
        >
          <span
            style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
            className="text-[10px] tracking-widest uppercase text-[rgba(242,237,230,0.4)] group-hover/btn:text-[#00ff88] transition-colors"
          >
            View Project
          </span>
          <div className="h-px w-6 bg-[rgba(242,237,230,0.2)] group-hover/btn:w-10 group-hover/btn:bg-[#00ff88] transition-all duration-300" />
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useReveal();

  return (
    <section id="projects" ref={ref} className="relative border-b border-[rgba(0,255,136,0.08)]">
      {/* Section header */}
      <div className="border-b border-[rgba(0,255,136,0.1)] flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
          <span
            style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
            className="text-[10px] text-[rgba(0,255,136,0.6)] tracking-widest uppercase"
          >
            02 // Operations
          </span>
        </div>
        <span
          style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
          className="text-[10px] text-[rgba(242,237,230,0.2)] tracking-widest hidden md:block"
        >
          MISSION DOSSIERS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="reveal">
            <h2
              className="text-[clamp(40px,6vw,72px)] leading-none text-white tracking-tight"
              style={{ fontFamily: "var(--font-display, 'Bebas Neue', cursive)" }}
            >
              Selected<br />
              <span className="text-[#00ff88]">Operations</span>
            </h2>
          </div>
          <p
            className="reveal reveal-d1 text-[rgba(242,237,230,0.4)] text-sm leading-relaxed max-w-xs font-light"
            style={{ fontFamily: "var(--font-sans, 'Cabinet Grotesk', sans-serif)" }}
          >
            A snapshot of campaigns, communities, and content that drove real results — on-chain and off.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-3 gap-0 border border-[rgba(0,255,136,0.08)]">
          {PROJECTS.map((project, i) => {
            const delays = ["", "reveal-d1", "reveal-d2"];
            const typedProject: Project = {
              ...project,
              status: project.status as "COMPLETED" | "ONGOING" | "CLASSIFIED",
            };
            return (
              <div
                key={project.id}
                className="border-r border-[rgba(0,255,136,0.08)] last:border-r-0"
              >
                <DossierCard project={typedProject} delay={delays[i] ?? ""} />
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="reveal reveal-d3 flex items-center gap-4 mt-10">
          <div className="h-px flex-1 bg-[rgba(0,255,136,0.06)]" />
          <span
            style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
            className="text-[9px] text-[rgba(0,255,136,0.3)] tracking-widest uppercase whitespace-nowrap"
          >
            More available on request
          </span>
          <div className="h-px flex-1 bg-[rgba(0,255,136,0.06)]" />
        </div>
      </div>
    </section>
  );
}