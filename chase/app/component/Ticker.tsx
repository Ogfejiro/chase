const TICKER_ITEMS = [
  "AMBASSADOR LEAD",
  "COMMUNITY ARCHITECT",
  "WEB3 STRATEGIST",
  "KOL & WRITER",
  "NARRATIVE ENGINEER",
];

export default function Ticker() {
  // Triple so the seamless loop never shows a gap
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="border-y border-[rgba(0,180,255,0.15)] bg-[rgba(0,180,255,0.02)] py-4 overflow-hidden relative">
      {/* Fade left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060d1f] to-transparent z-10 pointer-events-none" />
      {/* Fade right edge */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060d1f] to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center w-max"
        style={{ animation: "tickerFloat 20s linear infinite" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-5 px-8"
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', cursive)",
              fontSize: "clamp(24px, 3vw, 34px)",
              letterSpacing: "0.08em",
              color: i % TICKER_ITEMS.length === 0
                ? "#00b4ff"
                : "rgba(242,237,230,0.8)",
              whiteSpace: "nowrap",
            }}
          >
            {item}
            <span style={{
              display: "inline-block",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#00b4ff",
              opacity: 0.45,
              flexShrink: 0,
            }} />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes tickerFloat {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}