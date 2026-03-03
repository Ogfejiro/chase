"use client";

export default function AboutGraphic() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.18] pointer-events-none hidden xl:block">
      <svg
        suppressHydrationWarning
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="orb-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#00ff88" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer glow wash */}
        <circle cx="210" cy="210" r="200" fill="url(#orb-glow)" />

        {/* Ring 1 — outermost slow */}
        <ellipse
          cx="210" cy="210" rx="190" ry="55"
          stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.4"
          strokeDasharray="4 6"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 210 210"
            to="360 210 210"
            dur="22s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Ring 1 orbiting dot */}
        <circle r="4" fill="#00ff88">
          <animateMotion dur="22s" repeatCount="indefinite">
            <mpath xlinkHref="#path-r1" />
          </animateMotion>
        </circle>
        <path id="path-r1" d="M 20,210 A 190,55 0 1,1 400,210 A 190,55 0 1,1 20,210" fill="none" />

        {/* Ring 2 — medium tilt */}
        <ellipse
          cx="210" cy="210" rx="145" ry="70"
          stroke="#00ff88" strokeWidth="0.6" strokeOpacity="0.5"
          transform="rotate(-30 210 210)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="-30 210 210"
            to="330 210 210"
            dur="14s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Ring 2 dot */}
        <circle r="5" fill="#00ff88" fillOpacity="0.9">
          <animateMotion dur="14s" repeatCount="indefinite">
            <mpath xlinkHref="#path-r2" />
          </animateMotion>
        </circle>
        <path id="path-r2" d="M 65,210 A 145,70 0 1,1 355,210 A 145,70 0 1,1 65,210" fill="none" transform="rotate(-30 210 210)" />

        {/* Ring 3 — steep inner */}
        <ellipse
          cx="210" cy="210" rx="100" ry="30"
          stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.6"
          transform="rotate(60 210 210)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="60 210 210"
            to="420 210 210"
            dur="9s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Ring 3 dot — smallest orbit */}
        <circle r="3.5" fill="#00ff88">
          <animateMotion dur="9s" repeatCount="indefinite">
            <mpath xlinkHref="#path-r3" />
          </animateMotion>
        </circle>
        <path id="path-r3" d="M 110,210 A 100,30 0 1,1 310,210 A 100,30 0 1,1 110,210" fill="none" transform="rotate(60 210 210)" />

        {/* Horizontal equator line */}
        <line x1="20" y1="210" x2="400" y2="210" stroke="#00ff88" strokeWidth="0.3" strokeOpacity="0.2" strokeDasharray="2 8" />

        {/* Inner hexagon — slowly rotating */}
        <polygon
          points="210,168 243,189 243,231 210,252 177,231 177,189"
          stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.5" fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 210 210"
            to="360 210 210"
            dur="18s"
            repeatCount="indefinite"
          />
        </polygon>

        {/* Inner hexagon — counter */}
        <polygon
          points="210,182 232,194 232,226 210,238 188,226 188,194"
          stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.3" fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 210 210"
            to="0 210 210"
            dur="12s"
            repeatCount="indefinite"
          />
        </polygon>

        {/* Core orb */}
        <circle cx="210" cy="210" r="16" fill="url(#orb-core)">
          <animate attributeName="r" values="14;18;14" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="210" cy="210" r="6" fill="#00ff88" fillOpacity="0.95">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Tick marks on outer ring */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const inner = 195;
          const outer = 202;
          const x1 = 210 + Math.cos(angle) * inner;
          const y1 = 210 + Math.sin(angle) * inner;
          const x2 = 210 + Math.cos(angle) * outer;
          const y2 = 210 + Math.sin(angle) * outer;
          return (
            <line
              suppressHydrationWarning
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.4"
            />
          );
        })}
      </svg>
    </div>
  );
}