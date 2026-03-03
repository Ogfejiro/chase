const TICKER_ITEMS = ["AMBASSADOR LEAD","COMMUNITY ARCHITECT","WEB3 STRATEGIST","KOL","MASTERFUL WRITER","PROTOCOL GROWTH","DAO BUILDER","NARRATIVE ENGINEER","INFLUENCE OPS","ONCHAIN CULTURE","HOLDER RETENTION","BRAND VOICE","THREAD CRAFT","SIGNAL OVER NOISE"];

export default function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="border-y border-[rgba(0,255,136,0.15)] bg-[rgba(0,255,136,0.02)] py-3 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#04080f] to-transparent z-10 pointer-events-none"/>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#04080f] to-transparent z-10 pointer-events-none"/>
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: "var(--font-mono,'Space Mono',monospace)" }} className="flex items-center gap-5 px-5 text-[11px] tracking-widest uppercase whitespace-nowrap">
            <span className="text-[rgba(242,237,230,0.35)] hover:text-[#00ff88] transition-colors cursor-default">{item}</span>
            <span className="text-[rgba(0,255,136,0.3)] text-[8px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}