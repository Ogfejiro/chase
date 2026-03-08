"use client";

import { useState, useEffect } from "react";

// ─── Update these ─────────────────────────────────────────────────────────────
const SITE_NAME = "Chase";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? "bg-[rgba(5,11,24,0.92)] backdrop-blur-xl border-b border-[rgba(0,180,255,0.20)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 no-underline group">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 border border-[#00b4ff] rotate-45 group-hover:rotate-[225deg] transition-transform duration-700" />
            <div className="absolute inset-[5px] bg-[#00b4ff] rotate-45 group-hover:rotate-[225deg] transition-transform duration-700 delay-75" />
          </div>
          <span style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)" }} className="text-2xl text-white tracking-[0.12em]">{SITE_NAME}</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {["About", "Projects", "Network", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }}
              className="text-xs text-[rgba(242,237,230,0.90)] hover:text-[#00b4ff] transition-colors duration-200 tracking-widest uppercase no-underline">
              {item}
            </a>
          ))}
          <a href="#contact"
            style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }}
            className="text-xs px-5 py-2.5 border border-[#00b4ff] text-[#00b4ff] hover:bg-[rgba(0,180,255,0.18)] hover:shadow-[0_0_20px_rgba(0,180,255,0.2)] transition-all duration-300 tracking-widest uppercase no-underline">
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`block w-6 h-px bg-[#00b4ff] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-px bg-[#00b4ff] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[#00b4ff] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden border-t border-[rgba(0,180,255,0.20)] bg-[rgba(5,11,24,0.97)] transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-6 flex flex-col gap-5">
          {["About", "Projects", "Network", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }}
              className="text-sm text-[rgba(242,237,230,0.85)] hover:text-[#00b4ff] transition-colors uppercase tracking-widest no-underline">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}