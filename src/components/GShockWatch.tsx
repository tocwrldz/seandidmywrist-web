import React from 'react';
import { motion } from 'motion/react';

interface GShockWatchProps {
  size?: number;
  bezelColor?: string;
  dialColor?: string;
  indicesColor?: string;
  accentColor?: string;
  strapColor?: string;
  animateHands?: boolean;
  className?: string;
}

export const GShockWatch: React.FC<GShockWatchProps> = ({
  size = 280,
  bezelColor = '#18181b',
  dialColor = '#121214',
  indicesColor = '#e4e4e7',
  accentColor = '#f59e0b',
  strapColor = '#1c1c20',
  animateHands = true,
  className = ''
}) => {
  const isRainbow = indicesColor === 'rainbow';
  const isRasta = indicesColor === 'rasta';

  const rainbowColors = [
    '#ef4444', // 12 (red)
    '#f97316', // 1 (orange)
    '#f59e0b', // 2 (amber)
    '#eab308', // 3 (yellow)
    '#84cc16', // 4 (lime)
    '#22c55e', // 5 (green)
    '#10b981', // 6 (emerald)
    '#06b6d4', // 7 (cyan)
    '#3b82f6', // 8 (blue)
    '#6366f1', // 9 (indigo)
    '#8b5cf6', // 10 (purple)
    '#ec4899'  // 11 (pink)
  ];

  const rastaColors = [
    '#22c55e', '#22c55e', '#eab308', '#eab308',
    '#ef4444', '#ef4444', '#22c55e', '#22c55e',
    '#eab308', '#eab308', '#ef4444', '#ef4444'
  ];

  return (
    <div
      style={{ width: size, height: size * 1.32 }}
      className={`relative flex items-center justify-center select-none ${className}`}
      aria-label="Realistic Casio G-Shock GA2100 CasiOak Illustration"
    >
      <svg
        viewBox="0 0 200 264"
        className="w-full h-full drop-shadow-[6px_6px_0px_#000000]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Metallic Gradients for Bezel Screws and Pushers */}
          <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e4e4e7" />
            <stop offset="50%" stopColor="#71717a" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>

          <linearGradient id="pusherGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a1a1aa" />
            <stop offset="50%" stopColor="#52525b" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>

          <radialGradient id="dialDepth" cx="50%" cy="50%" r="50%">
            <stop offset="65%" stopColor={dialColor} />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>

          <linearGradient id="bezelBevel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* ================= TOP RESIN STRAP ================= */}
        {/* Main strap body */}
        <path
          d="M 64 0 L 136 0 L 130 54 L 70 54 Z"
          fill={strapColor}
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Characteristic GA2100 upper dual rectangular vents */}
        <rect x="76" y="10" width="18" height="7" rx="1.5" fill="#0c0c0e" stroke="#000000" strokeWidth="1.5" />
        <rect x="106" y="10" width="18" height="7" rx="1.5" fill="#0c0c0e" stroke="#000000" strokeWidth="1.5" />
        {/* Accordion ripple groove accents */}
        <line x1="72" y1="26" x2="128" y2="26" stroke="#000000" strokeWidth="2.5" />
        <line x1="71" y1="38" x2="129" y2="38" stroke="#000000" strokeWidth="2.5" />

        {/* ================= BOTTOM RESIN STRAP ================= */}
        {/* Main strap body */}
        <path
          d="M 70 210 L 130 210 L 136 264 L 64 264 Z"
          fill={strapColor}
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Characteristic GA2100 lower dual rectangular vents */}
        <rect x="76" y="247" width="18" height="7" rx="1.5" fill="#0c0c0e" stroke="#000000" strokeWidth="1.5" />
        <rect x="106" y="247" width="18" height="7" rx="1.5" fill="#0c0c0e" stroke="#000000" strokeWidth="1.5" />
        {/* Pin adjustment holes */}
        <circle cx="100" cy="223" r="2.5" fill="#000000" />
        <circle cx="100" cy="235" r="2.5" fill="#000000" />

        {/* ================= SIDE KNURLED BUTTON PUSHERS ================= */}
        {/* Top-Left: ADJUST (at 10:00) */}
        <rect x="33" y="93" width="7" height="13" rx="2" fill="url(#pusherGrad)" stroke="#000000" strokeWidth="2" />
        <line x1="33" y1="97" x2="40" y2="97" stroke="#18181b" strokeWidth="1" />
        <line x1="33" y1="102" x2="40" y2="102" stroke="#18181b" strokeWidth="1" />

        {/* Bottom-Left: MODE (at 8:00) */}
        <rect x="33" y="154" width="7" height="13" rx="2" fill="url(#pusherGrad)" stroke="#000000" strokeWidth="2" />
        <line x1="33" y1="158" x2="40" y2="158" stroke="#18181b" strokeWidth="1" />
        <line x1="33" y1="163" x2="40" y2="163" stroke="#18181b" strokeWidth="1" />

        {/* Top-Right: LIGHT (at 2:00) */}
        <rect x="160" y="93" width="7" height="13" rx="2" fill="url(#pusherGrad)" stroke="#000000" strokeWidth="2" />
        <line x1="160" y1="97" x2="167" y2="97" stroke="#18181b" strokeWidth="1" />
        <line x1="160" y1="102" x2="167" y2="102" stroke="#18181b" strokeWidth="1" />

        {/* Bottom-Right: START (at 4:00) */}
        <rect x="160" y="154" width="7" height="13" rx="2" fill="url(#pusherGrad)" stroke="#000000" strokeWidth="2" />
        <line x1="160" y1="158" x2="167" y2="158" stroke="#18181b" strokeWidth="1" />
        <line x1="160" y1="163" x2="167" y2="163" stroke="#18181b" strokeWidth="1" />

        {/* ================= CASIOAK REALISTIC OCTAGONAL RESIN BEZEL ================= */}
        {/* Outer Case step */}
        <path
          d="M 66 56 L 134 56 L 166 88 L 166 172 L 134 204 L 66 204 L 34 172 L 34 88 Z"
          fill="#101012"
          stroke="#000000"
          strokeWidth="4"
        />

        {/* Main 8-Sided Octagonal Bezel */}
        <path
          d="M 70 60 L 130 60 L 161 91 L 161 169 L 130 200 L 70 200 L 39 169 L 39 91 Z"
          fill={bezelColor}
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Bezel 3D Bevel highlight */}
        <path
          d="M 70 60 L 130 60 L 161 91 L 161 169 L 130 200 L 70 200 L 39 169 L 39 91 Z"
          fill="url(#bezelBevel)"
          pointerEvents="none"
        />

        {/* 4 Authentic Socket Cap Hex Screws (at 1:30, 4:30, 7:30, 10:30 corners) */}
        {/* Top-Left screw */}
        <circle cx="53" cy="75" r="3.2" fill="url(#metalGrad)" stroke="#000000" strokeWidth="1.2" />
        <rect x="52.2" y="73" width="1.6" height="4" fill="#18181b" />
        {/* Top-Right screw */}
        <circle cx="147" cy="75" r="3.2" fill="url(#metalGrad)" stroke="#000000" strokeWidth="1.2" />
        <rect x="146.2" y="73" width="1.6" height="4" fill="#18181b" />
        {/* Bottom-Right screw */}
        <circle cx="147" cy="185" r="3.2" fill="url(#metalGrad)" stroke="#000000" strokeWidth="1.2" />
        <rect x="146.2" y="183" width="1.6" height="4" fill="#18181b" />
        {/* Bottom-Left screw */}
        <circle cx="53" cy="185" r="3.2" fill="url(#metalGrad)" stroke="#000000" strokeWidth="1.2" />
        <rect x="52.2" y="183" width="1.6" height="4" fill="#18181b" />

        {/* ================= ENGRAVED BEZEL LETTERING ================= */}
        {/* 12:00: G-SHOCK */}
        <text
          x="100"
          y="72"
          textAnchor="middle"
          fill="#d4d4d8"
          fontSize="7"
          fontWeight="900"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          letterSpacing="1.2"
        >
          G-SHOCK
        </text>

        {/* 6:00: PROTECTION */}
        <text
          x="100"
          y="193"
          textAnchor="middle"
          fill="#d4d4d8"
          fontSize="6.2"
          fontWeight="900"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          letterSpacing="1.2"
        >
          PROTECTION
        </text>

        {/* Button indicator labels along bezel edges */}
        <text x="44" y="99" textAnchor="end" fill="#71717a" fontSize="3.8" fontWeight="bold">ADJUST</text>
        <text x="44" y="161" textAnchor="end" fill="#71717a" fontSize="3.8" fontWeight="bold">MODE</text>
        <text x="156" y="99" textAnchor="start" fill="#71717a" fontSize="3.8" fontWeight="bold">LIGHT</text>
        <text x="156" y="161" textAnchor="start" fill="#71717a" fontSize="3.8" fontWeight="bold">START</text>

        {/* ================= DIAL & INNER CHAPTER RING (REHAUT) ================= */}
        {/* Outer rehaut bezel step */}
        <circle cx="100" cy="130" r="50" fill="#09090b" stroke="#000000" strokeWidth="2.5" />

        {/* Deep dial face */}
        <circle cx="100" cy="130" r="47" fill="url(#dialDepth)" stroke="#000000" strokeWidth="2" />

        {/* 60 Minute Chapter Track (Fine Tick Marks) */}
        {[...Array(60)].map((_, m) => {
          if (m % 5 === 0) return null; // 5-minute batons take priority
          const angle = m * 6;
          const rad = (angle - 90) * (Math.PI / 180);
          const x1 = 100 + 44.5 * Math.cos(rad);
          const y1 = 130 + 44.5 * Math.sin(rad);
          const x2 = 100 + 46.5 * Math.cos(rad);
          const y2 = 130 + 46.5 * Math.sin(rad);
          return (
            <line
              key={`tick-${m}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#52525b"
              strokeWidth="0.8"
            />
          );
        })}

        {/* ================= 12 CHUNKY 3D FACETED INDEX BATONS ================= */}
        {[...Array(12)].map((_, i) => {
          const angle = i * 30; // 0 deg = 12:00, 30 deg = 1:00
          const rad = (angle - 90) * (Math.PI / 180);
          const rInner = 35;
          const rOuter = 46;

          let color = indicesColor;
          if (isRainbow) color = rainbowColors[i];
          if (isRasta) color = rastaColors[i];

          // 12:00 Double-Baton Marker
          if (i === 0) {
            return (
              <g key="idx-12">
                <line x1={97.2} y1={130 - rInner} x2={97.2} y2={130 - rOuter} stroke={color} strokeWidth="3" strokeLinecap="square" />
                <line x1={102.8} y1={130 - rInner} x2={102.8} y2={130 - rOuter} stroke={color} strokeWidth="3" strokeLinecap="square" />
                <line x1={97.2} y1={130 - rInner} x2={97.2} y2={130 - rOuter} stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
                <line x1={102.8} y1={130 - rInner} x2={102.8} y2={130 - rOuter} stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
              </g>
            );
          }

          const x1 = 100 + rInner * Math.cos(rad);
          const y1 = 130 + rInner * Math.sin(rad);
          const x2 = 100 + rOuter * Math.cos(rad);
          const y2 = 130 + rOuter * Math.sin(rad);

          return (
            <g key={`idx-${i}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth="3.2"
                strokeLinecap="square"
              />
              {/* Highlight facet */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#ffffff"
                strokeWidth="1"
                strokeOpacity="0.35"
              />
            </g>
          );
        })}

        {/* ================= 9:00 RETROGRADE DAY-OF-WEEK SUBDIAL ================= */}
        <circle cx="75" cy="130" r="10.5" fill="#0d0d0f" stroke="#000000" strokeWidth="1.5" />
        <circle cx="75" cy="130" r="9" fill="none" stroke="#27272a" strokeWidth="0.8" />
        {/* Day markings around the arc */}
        <text x="68" y="125" fontSize="2.8" fill="#a1a1aa" fontWeight="bold">SU</text>
        <text x="71" y="122.5" fontSize="2.8" fill="#a1a1aa" fontWeight="bold">M</text>
        <text x="75" y="122" fontSize="2.8" fill="#a1a1aa" fontWeight="bold">T</text>
        <text x="78.5" y="122.5" fontSize="2.8" fill="#a1a1aa" fontWeight="bold">W</text>
        <text x="81.5" y="125" fontSize="2.8" fill="#a1a1aa" fontWeight="bold">T</text>
        <text x="82.5" y="129" fontSize="2.8" fill="#a1a1aa" fontWeight="bold">F</text>
        <text x="81" y="133.5" fontSize="2.8" fill="#a1a1aa" fontWeight="bold">S</text>

        {/* Retrograde needle pointer pointing to Friday / Saturday */}
        <line x1="75" y1="130" x2="81.5" y2="126" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="75" cy="130" r="2" fill="#27272a" stroke="#000000" strokeWidth="0.8" />

        {/* ================= 4:30 ANGLED DIGITAL LCD DISPLAY ================= */}
        <g transform="translate(109, 137) rotate(-4)">
          {/* LCD Bezel Frame */}
          <rect x="0" y="0" width="26" height="15" rx="2" fill="#09090b" stroke="#000000" strokeWidth="1.5" />
          <rect x="1.5" y="1.5" width="23" height="12" rx="1" fill="#030303" />
          {/* LCD Segment Display (Green luminescence or inverted stealth) */}
          <text
            x="13"
            y="7.5"
            textAnchor="middle"
            fill="#4ade80"
            fontSize="4.2"
            fontFamily="monospace"
            fontWeight="900"
            letterSpacing="0.5"
          >
            10:58
          </text>
          <text
            x="13"
            y="12"
            textAnchor="middle"
            fill="#86efac"
            fontSize="3.4"
            fontFamily="monospace"
            fontWeight="bold"
          >
            SEC 42
          </text>
        </g>

        {/* ================= CASIO BRANDING ETCHINGS ON DIAL ================= */}
        <text
          x="100"
          y="105"
          textAnchor="middle"
          fill="#e4e4e7"
          fontSize="5.2"
          fontWeight="900"
          fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
          letterSpacing="0.8"
        >
          CASIO
        </text>
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fill="#a1a1aa"
          fontSize="3.8"
          fontWeight="bold"
          fontFamily="sans-serif"
          letterSpacing="0.4"
        >
          WR 20BAR
        </text>
        <text
          x="100"
          y="163"
          textAnchor="middle"
          fill="#71717a"
          fontSize="3.2"
          fontWeight="bold"
          fontFamily="sans-serif"
          letterSpacing="0.6"
        >
          CARBON CORE GUARD
        </text>

        {/* ================= REALISTIC GA2100 CENTER HANDS (SIMULTANEOUS MOVEMENT) ================= */}
        <g transform="translate(100, 130)">
          {/* Base Pinion Mount */}
          <circle cx="0" cy="0" r="5" fill="#000000" stroke="#71717a" strokeWidth="1" />

          {animateHands ? (
            <>
              {/* HOUR HAND: Wide sword hand with white Neobrite luminous cutout */}
              {/* Continuous smooth clockwise rotation */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 72, repeat: Infinity, ease: 'linear' }}
              >
                {/* Outer black sword shell */}
                <path
                  d="M -3.5 4 L -3.5 -6 L -2.5 -22 L 0 -26 L 2.5 -22 L 3.5 -6 L 3.5 4 Z"
                  fill="#000000"
                  stroke="#18181b"
                  strokeWidth="0.8"
                />
                {/* Neobrite luminescent inset window */}
                <path
                  d="M -2 -7 L -1.5 -20 L 0 -23 L 1.5 -20 L 2 -7 Z"
                  fill="#f4f4f5"
                />
              </motion.g>

              {/* MINUTE HAND: Longer faceted sword hand with white Neobrite luminous cutout */}
              {/* Simultaneous continuous smooth clockwise rotation (12x faster than hour hand) */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                {/* Outer black sword shell */}
                <path
                  d="M -3 5 L -3 -6 L -2 -34 L 0 -39 L 2 -34 L 3 -6 L 3 5 Z"
                  fill="#000000"
                  stroke="#18181b"
                  strokeWidth="0.8"
                />
                {/* Neobrite luminescent inset window */}
                <path
                  d="M -1.8 -7 L -1.2 -32 L 0 -36 L 1.2 -32 L 1.8 -7 Z"
                  fill="#f4f4f5"
                />
                {/* Tip accent marker */}
                <polygon points="0,-38 -1.2,-34 1.2,-34" fill={accentColor} />
              </motion.g>
            </>
          ) : (
            <>
              {/* Static position: classic 10:10 display pose */}
              {/* Hour hand pointing at ~10:10 (rotated -55 deg) */}
              <g transform="rotate(-55)">
                <path
                  d="M -3.5 4 L -3.5 -6 L -2.5 -22 L 0 -26 L 2.5 -22 L 3.5 -6 L 3.5 4 Z"
                  fill="#000000"
                  stroke="#18181b"
                  strokeWidth="0.8"
                />
                <path
                  d="M -2 -7 L -1.5 -20 L 0 -23 L 1.5 -20 L 2 -7 Z"
                  fill="#f4f4f5"
                />
              </g>

              {/* Minute hand pointing at ~10 min past (rotated +60 deg) */}
              <g transform="rotate(60)">
                <path
                  d="M -3 5 L -3 -6 L -2 -34 L 0 -39 L 2 -34 L 3 -6 L 3 5 Z"
                  fill="#000000"
                  stroke="#18181b"
                  strokeWidth="0.8"
                />
                <path
                  d="M -1.8 -7 L -1.2 -32 L 0 -36 L 1.2 -32 L 1.8 -7 Z"
                  fill="#f4f4f5"
                />
                <polygon points="0,-38 -1.2,-34 1.2,-34" fill={accentColor} />
              </g>
            </>
          )}

          {/* Polished Center Pin Cap & Arbor */}
          <circle cx="0" cy="0" r="3.2" fill="url(#metalGrad)" stroke="#000000" strokeWidth="1" />
          <circle cx="0" cy="0" r="1.2" fill="#09090b" />
        </g>
      </svg>
    </div>
  );
};
