"use client";

export default function ContactGraphic() {
  // Animated waveform bars + orbiting signal particles
  const bars = Array.from({ length: 32 }, (_, i) => i);

  return (
    <div className="absolute left-0 bottom-0 top-0 w-56 opacity-[0.22] pointer-events-none hidden xl:flex items-center justify-center overflow-hidden">
      {/* Vertical fade edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#04080f] z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04080f] via-transparent to-[#04080f] z-10" />

      <svg
        viewBox="0 0 220 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <filter id="glow-wave">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Vertical axis line */}
        <line x1="110" y1="20" x2="110" y2="480" stroke="#00ff88" strokeWidth="0.4" strokeOpacity="0.2" strokeDasharray="2 6" />

        {/* Waveform bars centred on vertical axis */}
        {bars.map((i) => {
          const y = 30 + i * 14;
          // Sine-modulated widths to look like an audio waveform
          const base = 20 + Math.abs(Math.sin(i * 0.45)) * 60 + Math.abs(Math.sin(i * 0.9)) * 30;
          const w = Math.min(base, 85);
          const animDur = `${1.2 + (i % 5) * 0.3}s`;
          const animDelay = `${(i % 7) * 0.15}s`;

          return (
            <g key={i}>
              {/* Left bar */}
              <rect
                x={110 - w} y={y} width={w} height="6" rx="1"
                fill="#00ff88"
                fillOpacity="0.5"
                filter="url(#glow-wave)"
              >
                <animate
                  attributeName="width"
                  values={`${w};${w * 0.4};${w}`}
                  dur={animDur}
                  begin={animDelay}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  values="0.5;0.2;0.5"
                  dur={animDur}
                  begin={animDelay}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="x"
                  values={`${110 - w};${110 - w * 0.4};${110 - w}`}
                  dur={animDur}
                  begin={animDelay}
                  repeatCount="indefinite"
                />
              </rect>

              {/* Right bar (mirror) */}
              <rect
                x={110} y={y} width={w} height="6" rx="1"
                fill="#00ff88"
                fillOpacity="0.5"
                filter="url(#glow-wave)"
              >
                <animate
                  attributeName="width"
                  values={`${w};${w * 0.4};${w}`}
                  dur={animDur}
                  begin={animDelay}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  values="0.5;0.2;0.5"
                  dur={animDur}
                  begin={animDelay}
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          );
        })}

        {/* Travelling signal dot along the axis */}
        <circle r="4" fill="#00ff88" fillOpacity="0.9" filter="url(#glow-wave)">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M110,20 L110,480"
          />
          <animate attributeName="fill-opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Horizontal scan lines */}
        {[120, 240, 360].map((y, i) => (
          <line
            key={i}
            x1="10" y1={y} x2="210" y2={y}
            stroke="#00ff88" strokeWidth="0.3" strokeOpacity="0.12"
            strokeDasharray="4 8"
          />
        ))}

        {/* Top label */}
        <text
          x="110" y="12"
          textAnchor="middle"
          fill="#00ff88"
          fillOpacity="0.35"
          fontSize="7"
          fontFamily="'Space Mono', monospace"
          letterSpacing="2"
        >
          SIGNAL
        </text>

        {/* Bottom label */}
        <text
          x="110" y="494"
          textAnchor="middle"
          fill="#00ff88"
          fillOpacity="0.35"
          fontSize="7"
          fontFamily="'Space Mono', monospace"
          letterSpacing="2"
        >
          ACTIVE
        </text>
      </svg>
    </div>
  );
}