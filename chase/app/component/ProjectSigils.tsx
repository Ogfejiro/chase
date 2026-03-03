"use client";

// Three unique animated SVG sigils — one per project card

export function SigilNFT() {
  // Interlocking triangles (Star of David / Merkaba style) — symbolises duality, assets, value
  return (
    <div className="w-full h-44 flex items-center justify-center relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.06)_0%,transparent_70%)]" />
      <svg viewBox="0 0 160 160" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-nft">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer rotating ring with dashes */}
        <circle cx="80" cy="80" r="72" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="3 5">
          <animateTransform attributeName="transform" type="rotate" from="0 80 80" to="360 80 80" dur="20s" repeatCount="indefinite" />
        </circle>

        {/* Triangle up */}
        <polygon
          points="80,22 130,108 30,108"
          stroke="#00ff88" strokeWidth="1.2" strokeOpacity="0.7" fill="rgba(0,255,136,0.04)"
          filter="url(#glow-nft)"
        >
          <animateTransform attributeName="transform" type="rotate" from="0 80 80" to="360 80 80" dur="12s" repeatCount="indefinite" />
        </polygon>

        {/* Triangle down */}
        <polygon
          points="80,138 30,52 130,52"
          stroke="#00ff88" strokeWidth="1.2" strokeOpacity="0.7" fill="rgba(0,255,136,0.04)"
          filter="url(#glow-nft)"
        >
          <animateTransform attributeName="transform" type="rotate" from="360 80 80" to="0 80 80" dur="12s" repeatCount="indefinite" />
        </polygon>

        {/* Inner hexagon at intersection */}
        <polygon
          points="80,52 104,66 104,94 80,108 56,94 56,66"
          stroke="#00ff88" strokeWidth="0.6" strokeOpacity="0.3" fill="none"
        />

        {/* Core */}
        <circle cx="80" cy="80" r="5" fill="#00ff88" fillOpacity="0.9">
          <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Small dots at triangle vertices */}
        {[[80,22],[130,108],[30,108],[80,138],[30,52],[130,52]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#00ff88" fillOpacity="0.5">
            <animate attributeName="fill-opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {/* Corner ticks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[rgba(0,255,136,0.3)]" />
      <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-[rgba(0,255,136,0.3)]" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-[rgba(0,255,136,0.3)]" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[rgba(0,255,136,0.3)]" />
    </div>
  );
}

export function SigilDeFi() {
  // Concentric pulsing rings with data spokes — radar / signal dish feel
  return (
    <div className="w-full h-44 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.05)_0%,transparent_70%)]" />
      <svg viewBox="0 0 160 160" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-defi">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Radar sweep */}
        <path d="M80,80 L80,16" stroke="#00ff88" strokeWidth="1.5" strokeOpacity="0.6" filter="url(#glow-defi)">
          <animateTransform attributeName="transform" type="rotate" from="0 80 80" to="360 80 80" dur="4s" repeatCount="indefinite" />
        </path>

        {/* Rings */}
        {[64, 48, 32, 16].map((r, i) => (
          <circle
            key={i}
            cx="80" cy="80" r={r}
            stroke="#00ff88"
            strokeWidth={i === 0 ? "0.8" : "0.4"}
            strokeOpacity={0.15 + i * 0.07}
            strokeDasharray={i % 2 === 0 ? "none" : "2 4"}
          >
            {i === 0 && (
              <animate attributeName="stroke-opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite" />
            )}
          </circle>
        ))}

        {/* 8 spokes */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={80 + Math.cos(angle) * 16}
              y1={80 + Math.sin(angle) * 16}
              x2={80 + Math.cos(angle) * 64}
              y2={80 + Math.sin(angle) * 64}
              stroke="#00ff88" strokeWidth="0.4" strokeOpacity="0.15"
            />
          );
        })}

        {/* Tick marks on outer ring */}
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const len = i % 6 === 0 ? 6 : 3;
          return (
            <line
              key={i}
              x1={80 + Math.cos(angle) * 64}
              y1={80 + Math.sin(angle) * 64}
              x2={80 + Math.cos(angle) * (64 + len)}
              y2={80 + Math.sin(angle) * (64 + len)}
              stroke="#00ff88" strokeWidth="0.7" strokeOpacity="0.4"
            />
          );
        })}

        {/* Signal blip dot that orbits */}
        <circle r="3" fill="#00ff88" fillOpacity="0.9" filter="url(#glow-defi)">
          <animateMotion dur="4s" repeatCount="indefinite">
            <mpath xlinkHref="#radar-path" />
          </animateMotion>
        </circle>
        <circle id="radar-path-vis" cx="80" cy="16" r="64" fill="none" />
        <path id="radar-path" d="M80,16 A64,64 0 1,1 79.9,16" fill="none" />

        {/* Core crosshair */}
        <line x1="72" y1="80" x2="88" y2="80" stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="80" y1="72" x2="80" y2="88" stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.5" />
        <circle cx="80" cy="80" r="3" fill="#00ff88" fillOpacity="0.8">
          <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[rgba(0,255,136,0.3)]" />
      <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-[rgba(0,255,136,0.3)]" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-[rgba(0,255,136,0.3)]" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[rgba(0,255,136,0.3)]" />
    </div>
  );
}

export function SigilDAO() {
  // Branching tree / network — growth, governance, connections
  return (
    <div className="w-full h-44 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.05)_0%,transparent_70%)]" />
      <svg viewBox="0 0 160 160" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-dao">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Outer ring */}
        <circle cx="80" cy="80" r="70" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="1 3">
          <animateTransform attributeName="transform" type="rotate" from="0 80 80" to="-360 80 80" dur="30s" repeatCount="indefinite" />
        </circle>

        {/* Spiderweb structure — centre to outer nodes */}
        {/* Centre → ring1 nodes (6 nodes) */}
        {Array.from({ length: 6 }, (_, i) => {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const x = 80 + Math.cos(angle) * 38;
          const y = 80 + Math.sin(angle) * 38;
          return (
            <g key={i}>
              <line x1="80" y1="80" x2={x} y2={y} stroke="#00ff88" strokeWidth="0.7" strokeOpacity="0.35" filter="url(#glow-dao)" />
              {/* Ring1 node → 2 outer leaves */}
              {[-.35, .35].map((offset, j) => {
                const leafAngle = angle + offset;
                const lx = x + Math.cos(leafAngle) * 26;
                const ly = y + Math.sin(leafAngle) * 26;
                return (
                  <g key={j}>
                    <line x1={x} y1={y} x2={lx} y2={ly} stroke="#00ff88" strokeWidth="0.4" strokeOpacity="0.2" />
                    <circle cx={lx} cy={ly} r="2" fill="#00ff88" fillOpacity="0.4">
                      <animate attributeName="fill-opacity" values="0.2;0.6;0.2" dur={`${2.5 + i * 0.2 + j * 0.3}s`} repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              })}
              {/* Ring1 node dot */}
              <circle cx={x} cy={y} r="3.5" fill="#00ff88" fillOpacity="0.7" filter="url(#glow-dao)">
                <animate attributeName="r" values="3;4.5;3" dur={`${2 + i * 0.25}s`} repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.5;0.9;0.5" dur={`${2 + i * 0.25}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* Connect ring1 nodes in a hexagon */}
        {Array.from({ length: 6 }, (_, i) => {
          const a1 = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const a2 = ((i + 1) / 6) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              x1={80 + Math.cos(a1) * 38} y1={80 + Math.sin(a1) * 38}
              x2={80 + Math.cos(a2) * 38} y2={80 + Math.sin(a2) * 38}
              stroke="#00ff88" strokeWidth="0.4" strokeOpacity="0.2"
            />
          );
        })}

        {/* Centre core */}
        <circle cx="80" cy="80" r="8" fill="rgba(0,255,136,0.08)" stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.5" />
        <circle cx="80" cy="80" r="3.5" fill="#00ff88" fillOpacity="0.9" filter="url(#glow-dao)">
          <animate attributeName="r" values="3;5;3" dur="2.8s" repeatCount="indefinite" />
        </circle>

        {/* Travelling pulse on one spoke */}
        <circle r="2" fill="#00ff88" fillOpacity="0.8" filter="url(#glow-dao)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M80,80 L118,42" />
          <animate attributeName="fill-opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[rgba(0,255,136,0.3)]" />
      <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-[rgba(0,255,136,0.3)]" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-[rgba(0,255,136,0.3)]" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[rgba(0,255,136,0.3)]" />
    </div>
  );
}