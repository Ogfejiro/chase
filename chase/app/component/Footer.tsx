const SITE_NAME = "Chase"; // ← update

export default function Footer() {
  const year = new Date().getFullYear();
  const phrase = "SIGNAL OVER NOISE ◆ WEB3 IS CULTURE ◆ WORDS MOVE MARKETS ◆ BUILD THE FUTURE ◆ ";
  return (
    <footer className="border-t border-[rgba(0,180,255,0.18)]">
      <div className="border-b border-[rgba(0,180,255,0.06)] py-2.5 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050b18] to-transparent z-10 pointer-events-none"/>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050b18] to-transparent z-10 pointer-events-none"/>
        <div className="ticker-track-slow" style={{ animationDirection:"reverse" }}>
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} style={{ fontFamily:"var(--font-mono,'Space Mono',monospace)" }} className="text-[9px] text-[rgba(0,180,255,0.22)] tracking-widest uppercase whitespace-nowrap px-2">{phrase}</span>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-5 h-5 flex-shrink-0">
            <div className="absolute inset-0 border border-[rgba(0,180,255,0.4)] rotate-45"/>
            <div className="absolute inset-[4px] bg-[rgba(0,180,255,0.4)] rotate-45"/>
          </div>
          <span style={{fontFamily:"var(--font-mono,'Space Mono',monospace)"}} className="text-[10px] text-[rgba(242,237,230,0.60)] tracking-widest">© {year} {SITE_NAME}. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          {["About","Projects","Network","Contact"].map((item)=>(
            <a key={item} href={`#${item.toLowerCase()}`} style={{fontFamily:"var(--font-mono,'Space Mono',monospace)"}} className="text-[10px] text-[rgba(242,237,230,0.60)] hover:text-[#00b4ff] transition-colors tracking-widest uppercase no-underline">{item}</a>
          ))}
        </div>
        <span style={{fontFamily:"var(--font-mono,'Space Mono',monospace)"}} className="text-[9px] text-[rgba(0,180,255,0.25)] tracking-widest flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-[#00b4ff] inline-block animate-pulse"/>SIGNAL ACTIVE
        </span>
      </div>
    </footer>
  );
}