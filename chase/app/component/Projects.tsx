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
  image: string;
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: "project-01",
    code: "Project 01",
    status: "COMPLETED",
    tags: ["KOL", "Content", "NFT"],
    name: "Humanity Protocol — KOL",
    description: "Served as a KOL for Humanity Protocol, creating content that built awareness and drove engagement. I crafted threads and posts that positioned the project in front of the right audience at the right time.",
    impact: "→ Grew visibility and brought in a targeted, engaged audience.",
    image: "/images/IMG_0226.JPG",
    link: "https://x.com/humanityprot?s=21",
  },
  {
    id: "project-02",
    code: "Project 02",
    status: "COMPLETED",
    tags: ["KOL", "DeFi", "Content"],
    name: "Mixer Fi — KOL",
    description: "Acted as a KOL for Mixer Fi, a DeFi protocol. I wrote the content, shaped the narrative, and made sure the project's message reached the people it needed to reach — clearly and convincingly.",
    impact: "→ Built credibility and drove meaningful attention to the protocol.",
    image: "/images/IMG_0228.JPG",
    link: "https://x.com/mixer_fi?s=21",
  },
  {
    id: "project-03",
    code: "Project 03",
    status: "ONGOING",
    tags: ["Ambassador", "Community", "Strategy"],
    name: "Aetherium X — Ambassador",
    description: "Currently serving as an Ambassador for Aetherium X. I represent the project, onboard new community members, and act as a trusted face between the team and the wider Web3 audience.",
    impact: "→ Growing the community and strengthening trust in the project.",
    image: "/images/kol.jpg",
    link: "https://x.com/aetheriumx_fun?s=21",
  },
];

const STATUS_COLORS: Record<Project["status"], string> = {
  COMPLETED:  "text-[#00b4ff] border-[rgba(0,180,255,0.3)]",
  ONGOING:    "text-[#f59e0b] border-[rgba(245,158,11,0.3)]",
  CLASSIFIED: "text-[rgba(242,237,230,0.90)] border-[rgba(242,237,230,0.1)]",
};

const STATUS_LABELS: Record<Project["status"], string> = {
  COMPLETED:  "Completed",
  ONGOING:    "In Progress",
  CLASSIFIED: "Confidential",
};

function ProjectCard({ project, delay }: { project: Project; delay: string }) {
  return (
    <div className={`reveal ${delay} relative border border-[rgba(0,180,255,0.20)] hover:border-[rgba(0,180,255,0.3)] transition-all duration-500 group bg-[rgba(0,180,255,0.01)] hover:bg-[rgba(0,180,255,0.03)] flex flex-col`}>

      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(0,180,255,0.18)]">
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] text-[rgba(0,180,255,0.4)] tracking-widest">{project.code}</span>
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className={`text-[9px] tracking-widest border px-2 py-0.5 ${STATUS_COLORS[project.status]}`}>{STATUS_LABELS[project.status]}</span>
      </div>

      <div className="relative w-full h-52 border-b border-[rgba(0,180,255,0.18)] overflow-hidden bg-[rgba(0,180,255,0.02)]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
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
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,11,24,0.6)] via-transparent to-transparent" />
      </div>

      <div className="px-5 py-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] tracking-widest uppercase text-[rgba(242,237,230,0.70)] border border-[rgba(242,237,230,0.08)] px-2 py-0.5">{tag}</span>
          ))}
        </div>

        <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#00b4ff] transition-colors duration-300" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>{project.name}</h3>
        <p className="text-[rgba(242,237,230,0.85)] text-sm leading-relaxed mb-4 font-light flex-1" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>{project.description}</p>
        <p style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[11px] text-[#00b4ff] mb-6">{project.impact}</p>

        <div className="h-px bg-[rgba(0,180,255,0.18)] mb-5" />

        <a href={project.link} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center gap-2 no-underline">
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] tracking-widest uppercase text-[rgba(242,237,230,0.90)] group-hover/btn:text-[#00b4ff] transition-colors">View Project →</span>
          <div className="h-px w-6 bg-[rgba(242,237,230,0.55)] group-hover/btn:w-10 group-hover/btn:bg-[#00b4ff] transition-all duration-300" />
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useReveal();
  return (
    <section id="projects" ref={ref} className="relative border-b border-[rgba(0,180,255,0.18)]">
      <div className="border-b border-[rgba(0,180,255,0.20)] flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full animate-pulse" />
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(0,180,255,0.6)] tracking-widest uppercase">My Work</span>
        </div>
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(242,237,230,0.55)] tracking-widest hidden md:block">Real projects, real results</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-[clamp(40px,6vw,72px)] leading-none text-white tracking-tight" style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)" }}>
              Projects I&apos;ve<br /><span className="text-[#00b4ff]">Worked On</span>
            </h2>
          </div>
          <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="800" className="text-[rgba(242,237,230,0.80)] text-sm leading-relaxed max-w-xs font-light" style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }}>
            A look at some of the protocols and communities I&apos;ve worked with — as a KOL and as an Ambassador. Each one had real stakes and real results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-[rgba(0,180,255,0.18)]">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="border-r border-[rgba(0,180,255,0.18)] last:border-r-0">
              <ProjectCard project={project} delay={["", "reveal-d1", "reveal-d2"][i] ?? ""} />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-10">
          <div className="h-px flex-1 bg-[rgba(0,180,255,0.06)]" />
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] text-[rgba(0,180,255,0.5)] tracking-widest uppercase whitespace-nowrap">More projects available on request</span>
          <div className="h-px flex-1 bg-[rgba(0,180,255,0.06)]" />
        </div>
      </div>
    </section>
  );
}