"use client";

import { useState } from "react";
import { useReveal } from "../lib/useReveal";
import { SITE } from "../lib/data";
import ContactGraphic from "./ContactGraphic";

export default function Contact() {
  const ref = useReveal();
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: wire up to your preferred form service (e.g. Resend, Formspree, EmailJS)
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="relative border-b border-[rgba(0,255,136,0.08)] overflow-hidden">
      {/* Waveform graphic */}
      <ContactGraphic />
      {/* Section header */}
      <div className="border-b border-[rgba(0,255,136,0.1)] flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
          <span
            style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
            className="text-[10px] text-[rgba(0,255,136,0.6)] tracking-widest uppercase"
          >
            03 // Contact
          </span>
        </div>
        <span
          style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
          className="text-[10px] text-[rgba(242,237,230,0.2)] tracking-widest hidden md:block"
        >
          OPEN CHANNEL
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Left: heading + info */}
        <div>
          <div className="reveal">
            <h2
              className="text-[clamp(42px,7vw,80px)] leading-none text-white mb-6"
              style={{ fontFamily: "var(--font-display, 'Bebas Neue', cursive)" }}
            >
              Let's build<br />
              <span className="text-[#00ff88]">something</span><br />
              great
            </h2>
          </div>

          <p
            className="reveal reveal-d1 text-[rgba(242,237,230,0.5)] text-sm leading-relaxed mb-10 font-light"
            style={{ fontFamily: "var(--font-sans, 'Cabinet Grotesk', sans-serif)" }}
          >
            Whether you need a community built from zero, a narrative crafted that converts,
            or an ambassador program scaled — I'm ready. Drop a message.
          </p>

          {/* Contact details */}
          <div className="reveal reveal-d2 space-y-4 mb-10">
            <div className="flex items-center gap-4">
              <span
                style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
                className="text-[9px] text-[rgba(0,255,136,0.4)] tracking-widest w-16 uppercase"
              >
                Email
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="text-[rgba(242,237,230,0.6)] text-sm hover:text-[#00ff88] transition-colors no-underline"
                style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
              >
                {SITE.email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span
                style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
                className="text-[9px] text-[rgba(0,255,136,0.4)] tracking-widest w-16 uppercase"
              >
                X
              </span>
              <a
                href={SITE.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(242,237,230,0.6)] text-sm hover:text-[#00ff88] transition-colors no-underline"
                style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
              >
                {SITE.handle}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span
                style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
                className="text-[9px] text-[rgba(0,255,136,0.4)] tracking-widest w-16 uppercase"
              >
                Telegram
              </span>
              <a
                href={SITE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(242,237,230,0.6)] text-sm hover:text-[#00ff88] transition-colors no-underline"
                style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
              >
                {SITE.handle}
              </a>
            </div>
          </div>

          {/* Social icons */}
          <div className="reveal reveal-d3 flex gap-3">
            {/* X / Twitter */}
            <a
              href={SITE.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-[rgba(0,255,136,0.15)] flex items-center justify-center text-[rgba(242,237,230,0.4)] hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-200 no-underline"
              aria-label="Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Telegram */}
            <a
              href={SITE.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-[rgba(0,255,136,0.15)] flex items-center justify-center text-[rgba(242,237,230,0.4)] hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-200 no-underline"
              aria-label="Telegram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-[rgba(0,255,136,0.15)] flex items-center justify-center text-[rgba(242,237,230,0.4)] hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-200 no-underline"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div className="reveal reveal-d1">
          {/* Terminal header */}
          <div className="border border-[rgba(0,255,136,0.15)] border-b-0">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(0,255,136,0.1)] bg-[rgba(0,255,136,0.02)]">
              <div className="w-2 h-2 rounded-full bg-[rgba(242,237,230,0.1)]" />
              <div className="w-2 h-2 rounded-full bg-[rgba(242,237,230,0.1)]" />
              <div className="w-2 h-2 rounded-full bg-[rgba(0,255,136,0.4)]" />
              <span
                style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
                className="text-[9px] text-[rgba(0,255,136,0.3)] tracking-widest ml-3"
              >
                TRANSMISSION.init
              </span>
            </div>

            {/* Prompt line */}
            <div className="px-4 py-3 border-b border-[rgba(0,255,136,0.06)]">
              <span
                style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
                className="text-[11px] text-[rgba(0,255,136,0.5)] cursor-blink"
              >
                &gt; Opening secure channel to Chase...
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-[rgba(0,255,136,0.15)] p-6 space-y-4 border-t-0"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
                  className="block text-[9px] text-[rgba(0,255,136,0.4)] tracking-widest uppercase mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label
                  style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
                  className="block text-[9px] text-[rgba(0,255,136,0.4)] tracking-widest uppercase mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <label
                style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
                className="block text-[9px] text-[rgba(0,255,136,0.4)] tracking-widest uppercase mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="What's the mission?"
                value={formState.subject}
                onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))}
                required
              />
            </div>

            <div>
              <label
                style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
                className="block text-[9px] text-[rgba(0,255,136,0.4)] tracking-widest uppercase mb-2"
              >
                Message
              </label>
              <textarea
                className="form-input resize-none"
                placeholder="Tell me about your project..."
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#00ff88] text-[#04080f] font-bold tracking-widest uppercase text-xs hover:bg-white transition-colors duration-300 relative overflow-hidden group"
              style={{ fontFamily: "var(--font-mono, 'Space Mono', monospace)" }}
            >
              {sent ? "✓ MESSAGE SENT" : "Send Transmission →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}