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
  bezelColor = '#121212',
  dialColor = '#181818',
  indicesColor = '#e5e7eb',
  accentColor = '#f59e0b',
  strapColor = '#151515',
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
      style={{ width: size, height: size * 1.3 }}
      className={`relative flex items-center justify-center select-none ${className}`}
      aria-label="Casio G-Shock GA2100 CasiOak Watch Illustration"
    >
      <svg
        viewBox="0 0 200 260"
        className="w-full h-full drop-shadow-[8px_8px_0px_#000000]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* TOP STRAP */}
        <path
          d="M 68 0 L 132 0 L 126 55 L 74 55 Z"
          fill={strapColor}
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Strap ribbing grooves */}
        <line x1="78" y1="18" x2="122" y2="18" stroke="#000000" strokeWidth="2.5" />
        <line x1="77" y1="32" x2="123" y2="32" stroke="#000000" strokeWidth="2.5" />

        {/* BOTTOM STRAP */}
        <path
          d="M 74 205 L 126 205 L 132 260 L 68 260 Z"
          fill={strapColor}
          stroke="#000000"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Bottom strap holes */}
        <circle cx="100" cy="225" r="2.5" fill="#000000" />
        <circle cx="100" cy="242" r="2.5" fill="#000000" />

        {/* SIDE BUTTON PUSHERS (4 real G-Shock pushers) */}
        <rect x="36" y="92" width="6" height="12" rx="2" fill="#27272a" stroke="#000000" strokeWidth="2.5" />
        <rect x="36" y="156" width="6" height="12" rx="2" fill="#27272a" stroke="#000000" strokeWidth="2.5" />
        <rect x="158" y="92" width="6" height="12" rx="2" fill="#27272a" stroke="#000000" strokeWidth="2.5" />
        <rect x="158" y="156" width="6" height="12" rx="2" fill="#27272a" stroke="#000000" strokeWidth="2.5" />

        {/* CASIOAK OCTAGONAL BEZEL (G-Shock GA2100 Octagon) */}
        <path
          d="M 70 60
             L 130 60
             L 160 90
             L 160 170
             L 130 200
             L 70 200
             L 40 170
             L 40 90 Z"
          fill={bezelColor}
          stroke="#000000"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* G-SHOCK / PROTECTION TEXT ETCHINGS */}
        <text
          x="100"
          y="72"
          textAnchor="middle"
          fill="#d4d4d8"
          fontSize="7"
          fontWeight="900"
          fontFamily="sans-serif"
          letterSpacing="1"
        >
          G-SHOCK
        </text>
        <text
          x="100"
          y="193"
          textAnchor="middle"
          fill="#d4d4d8"
          fontSize="6.5"
          fontWeight="900"
          fontFamily="sans-serif"
          letterSpacing="1"
        >
          PROTECTION
        </text>

        {/* INNER CIRCULAR DIAL RING */}
        <circle
          cx="100"
          cy="130"
          r="48"
          fill={dialColor}
          stroke="#000000"
          strokeWidth="4"
        />

        {/* 12:00 REFERENCE MARKER & DIAL INDICES */}
        {[...Array(12)].map((_, i) => {
          const angle = i * 30; // 0 deg = 12:00, 30 deg = 1:00, etc.
          const rad = (angle - 90) * (Math.PI / 180);
          const rInner = 36;
          const rOuter = 44;
          const x1 = 100 + rInner * Math.cos(rad);
          const y1 = 130 + rInner * Math.sin(rad);
          const x2 = 100 + rOuter * Math.cos(rad);
          const y2 = 130 + rOuter * Math.sin(rad);

          let strokeColor = indicesColor;
          if (isRainbow) strokeColor = rainbowColors[i];
          if (isRasta) strokeColor = rastaColors[i];

          // 12:00 double marker
          if (i === 0) {
            return (
              <g key={i}>
                <line
                  x1={98}
                  y1={130 - rInner}
                  x2={98}
                  y2={130 - rOuter}
                  stroke={strokeColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <line
                  x1={102}
                  y1={130 - rInner}
                  x2={102}
                  y2={130 - rOuter}
                  stroke={strokeColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>
            );
          }

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}

        {/* GA2100 SUB-DIAL AT 9:00 (DAY OF WEEK POINTER) */}
        <circle
          cx="76"
          cy="130"
          r="10"
          fill="#111111"
          stroke="#000000"
          strokeWidth="1.5"
        />
        {/* Subdial hand */}
        <line
          x1="76"
          y1="130"
          x2="72"
          y2="124"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* GA2100 DIGITAL LCD WINDOW AT 4:30 */}
        <rect
          x="108"
          y="136"
          width="24"
          height="14"
          rx="2"
          fill="#0a0a0a"
          stroke="#000000"
          strokeWidth="1.5"
        />
        <text
          x="120"
          y="146"
          textAnchor="middle"
          fill="#22c55e"
          fontSize="6"
          fontFamily="monospace"
          fontWeight="bold"
        >
          10:16
        </text>

        {/* BRAND ETCHINGS ON DIAL */}
        <text
          x="100"
          y="108"
          textAnchor="middle"
          fill="#d4d4d8"
          fontSize="5"
          fontWeight="900"
          fontFamily="sans-serif"
          letterSpacing="0.8"
        >
          CASIO
        </text>
        <text
          x="100"
          y="115"
          textAnchor="middle"
          fill="#a1a1aa"
          fontSize="4"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          WR 20BAR
        </text>

        {/* CENTER PIVOT & ROTATING HANDS */}
        <g transform="translate(100, 130)">
          {/* Base Center Pin */}
          <circle cx="0" cy="0" r="4.5" fill="#000000" stroke="#FFFFFF" strokeWidth="1.5" />

          {animateHands ? (
            <>
              {/* Hour Hand: Rotates around (0,0) */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              >
                <line
                  x1="0"
                  y1="3"
                  x2="0"
                  y2="-26"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.g>

              {/* Minute Hand: Rotates around (0,0) */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <line
                  x1="0"
                  y1="4"
                  x2="0"
                  y2="-38"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </motion.g>

              {/* Second Hand Accent: Rotates around (0,0) */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <line
                  x1="0"
                  y1="8"
                  x2="0"
                  y2="-42"
                  stroke={accentColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </motion.g>
            </>
          ) : (
            <>
              <line x1="0" y1="0" x2="16" y2="-14" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="0" x2="0" y2="-36" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="0" y1="6" x2="0" y2="-40" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}

          {/* Center Pin Cap */}
          <circle cx="0" cy="0" r="2.5" fill={accentColor} />
          <circle cx="0" cy="0" r="1.2" fill="#000000" />
        </g>
      </svg>
    </div>
  );
};
