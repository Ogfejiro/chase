"use client";

import { useState, useEffect, useRef } from "react";

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

// ─── UPDATE THESE with Chase's real details ───────────────────────────────────
const SITE = {
  email: "chas30bg@gmail.com",       // ← update
  handle: "@Chase30BG",          // ← update
  twitter: "https://x.com/chas30bg?s=21",   // ← update
  telegram: "https://t.me/Chas30BG",         // ← update
  discord: "https://discord.com/users/case30bg", // ← update with Chase's Discord link
};

function ContactGraphic() {
  const bars = Array.from({ length: 32 }, (_, i) => i);
  return (
    <div className="absolute left-0 bottom-0 top-0 w-56 opacity-[0.22] pointer-events-none hidden xl:flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050b18] z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050b18] via-transparent to-[#050b18] z-10" />
      <svg viewBox="0 0 220 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <filter id="glow-wave">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <line x1="110" y1="20" x2="110" y2="480" stroke="#00b4ff" strokeWidth="0.4" strokeOpacity="0.2" strokeDasharray="2 6"/>
        {bars.map((i) => {
          const y = 30 + i * 14;
          const base = 20 + Math.abs(Math.sin(i * 0.45)) * 60 + Math.abs(Math.sin(i * 0.9)) * 30;
          const w = Math.min(base, 85);
          const dur = `${1.2 + (i % 5) * 0.3}s`;
          const delay = `${(i % 7) * 0.15}s`;
          return (
            <g key={i}>
              <rect x={110 - w} y={y} width={w} height="6" rx="1" fill="#00b4ff" fillOpacity="0.5" filter="url(#glow-wave)">
                <animate attributeName="width" values={`${w};${w*0.4};${w}`} dur={dur} begin={delay} repeatCount="indefinite"/>
                <animate attributeName="fill-opacity" values="0.5;0.2;0.5" dur={dur} begin={delay} repeatCount="indefinite"/>
                <animate attributeName="x" values={`${110-w};${110-w*0.4};${110-w}`} dur={dur} begin={delay} repeatCount="indefinite"/>
              </rect>
              <rect x={110} y={y} width={w} height="6" rx="1" fill="#00b4ff" fillOpacity="0.5" filter="url(#glow-wave)">
                <animate attributeName="width" values={`${w};${w*0.4};${w}`} dur={dur} begin={delay} repeatCount="indefinite"/>
                <animate attributeName="fill-opacity" values="0.5;0.2;0.5" dur={dur} begin={delay} repeatCount="indefinite"/>
              </rect>
            </g>
          );
        })}
        <circle r="4" fill="#00b4ff" fillOpacity="0.9" filter="url(#glow-wave)">
          <animateMotion dur="4s" repeatCount="indefinite" path="M110,20 L110,480"/>
          <animate attributeName="fill-opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite"/>
        </circle>
        {[120, 240, 360].map((y, i) => (
          <line key={i} x1="10" y1={y} x2="210" y2={y} stroke="#00b4ff" strokeWidth="0.3" strokeOpacity="0.12" strokeDasharray="4 8"/>
        ))}
      </svg>
    </div>
  );
}

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire to Resend / Formspree / EmailJS in production
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="relative border-b border-[rgba(0,180,255,0.18)] overflow-hidden">
      <ContactGraphic />

      {/* Section label */}
      <div className="border-b border-[rgba(0,180,255,0.20)] flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full animate-pulse"/>
          <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(0,180,255,0.6)] tracking-widest uppercase">
            Get in Touch
          </span>
        </div>
        <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="text-[10px] text-[rgba(242,237,230,0.55)] tracking-widest hidden md:block">
          I usually reply within 24 hours
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

        {/* Left — context */}
        <div>
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 className="text-[clamp(42px,7vw,80px)] leading-none text-white mb-6" style={{ fontFamily: "var(--font-display,'Bebas Neue',cursive)" }}>
              Have a project<br />in mind? <span className="text-[#00b4ff]">Let&apos;s talk.</span>
            </h2>
          </div>

          <p style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }} className="reveal reveal-d1 text-[rgba(242,237,230,0.85)] text-base leading-relaxed mb-6 font-light">
            Whether you&apos;re launching something new, growing a community, or need someone to sharpen your voice in Web3 — I&apos;d love to hear about it.
          </p>
          <p style={{ fontFamily: "var(--font-sans,'Cabinet Grotesk',sans-serif)" }} className="reveal reveal-d1 text-[rgba(242,237,230,0.85)] text-base leading-relaxed mb-10 font-light">
            Fill in the form or reach out directly on any of the platforms below. No long back-and-forth — just a straight conversation about what you need.
          </p>

          {/* Direct contact */}
          <div className="reveal reveal-d2 space-y-4 mb-10">
            {[
              { label: "Email",      val: SITE.email,  href: `mailto:${SITE.email}` },
              { label: "X / Twitter",val: SITE.handle, href: SITE.twitter },
              { label: "Telegram",   val: SITE.handle, href: SITE.telegram },
              { label: "Discord",    val: SITE.handle, href: SITE.discord },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="text-[rgba(0,180,255,0.4)] tracking-widest w-24 uppercase shrink-0">{item.label}</span>
                <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "12px" }} className="text-[rgba(242,237,230,0.85)] hover:text-[#00b4ff] transition-colors no-underline">{item.val}</a>
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div className="reveal reveal-d3 flex gap-3">
            {[
              { href: `mailto:${SITE.email}`, label: "Email", path: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
              { href: SITE.twitter,  label: "Twitter",  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
              { href: SITE.telegram, label: "Telegram", path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" },
              { href: SITE.discord,  label: "Discord",  path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-10 h-10 border border-[rgba(0,180,255,0.28)] flex items-center justify-center text-[rgba(242,237,230,0.90)] hover:border-[#00b4ff] hover:text-[#00b4ff] transition-all duration-200 no-underline">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d={s.path}/></svg>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
          {/* Terminal header */}
          <div className="border border-[rgba(0,180,255,0.28)] border-b-0">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(0,180,255,0.20)] bg-[rgba(0,180,255,0.02)]">
              <div className="w-2 h-2 rounded-full bg-[rgba(242,237,230,0.1)]"/>
              <div className="w-2 h-2 rounded-full bg-[rgba(242,237,230,0.1)]"/>
              <div className="w-2 h-2 rounded-full bg-[rgba(0,180,255,0.4)]"/>
              <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="text-[rgba(0,180,255,0.3)] tracking-widest ml-3">
                Send Chase a message
              </span>
            </div>
            <div className="px-4 py-3 border-b border-[rgba(0,180,255,0.06)]">
              <span style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "11px" }} className="text-[rgba(0,180,255,0.5)]">
                &gt; Ready to receive your message...
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="border border-[rgba(0,180,255,0.28)] p-4 sm:p-6 space-y-4 border-t-0 w-full min-w-0">
            <div className="flex flex-col gap-4">
              {[
                { id: "name",  label: "Your Name",    type: "text",  ph: "e.g. Alex" },
                { id: "email", label: "Your Email",   type: "email", ph: "you@email.com" },
              ].map((f) => (
                <div key={f.id}>
                  <label style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="block text-[rgba(0,180,255,0.4)] tracking-widest uppercase mb-2">{f.label}</label>
                  <input type={f.type} className="form-input" placeholder={f.ph}
                    value={form[f.id as keyof typeof form]}
                    onChange={(e) => setForm(s => ({ ...s, [f.id]: e.target.value }))}
                    required />
                </div>
              ))}
            </div>

            <div>
              <label style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="block text-[rgba(0,180,255,0.4)] tracking-widest uppercase mb-2">What do you need help with?</label>
              <input type="text" className="form-input" placeholder="e.g. Community building, ambassador program, content..."
                value={form.subject}
                onChange={(e) => setForm(s => ({ ...s, subject: e.target.value }))}
                required />
            </div>

            <div>
              <label style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="block text-[rgba(0,180,255,0.4)] tracking-widest uppercase mb-2">Tell me more</label>
              <textarea className="form-input resize-none"
                placeholder="Give me a quick overview of your project and what you're looking for. The more detail, the better."
                rows={5}
                value={form.message}
                onChange={(e) => setForm(s => ({ ...s, message: e.target.value }))}
                required />
            </div>

            <a
              href={SITE.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-[#00b4ff] text-[#050b18] font-bold tracking-widest uppercase text-xs hover:bg-white transition-colors duration-300 text-center no-underline"
              style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }}
            >
              Send Message on Telegram →
            </a>

            <p style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: "9px" }} className="text-[rgba(242,237,230,0.55)] tracking-widest text-center">
              I typically respond within 24 hours
            </p>
          </form>
        </div>

      </div>
    </section>
  );
}