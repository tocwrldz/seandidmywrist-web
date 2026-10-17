import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MascotProps {
  interactive?: boolean;
  size?: number;
  className?: string;
  speechText?: string;
}

export const GhostMascot: React.FC<MascotProps> = ({
  interactive = false,
  size = 140,
  className = '',
  speechText = 'SEAN DID IT! CUSTOMIZED 4U!'
}) => {
  const [isWinking, setIsWinking] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);

  // STATIC VERSION: 100% Motionless, exact visual match, no hover or click events
  if (!interactive) {
    return (
      <div className={`flex flex-col items-center select-none ${className}`} aria-label="SeanDidMyWrist Ghost Mascot (Static)">
        <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[4px_4px_0px_#000000]">
            {/* Ghost Sheet Body */}
            <path
              d="M 30 110 
                 C 30 50, 50 20, 80 20 
                 C 110 20, 130 50, 130 110 
                 C 130 135, 120 145, 110 135 
                 C 100 125, 90 145, 80 135 
                 C 70 125, 60 145, 50 135 
                 C 40 125, 30 135, 30 110 Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Left Eye */}
            <ellipse cx="64" cy="65" rx="7" ry="11" fill="#000000" />
            <circle cx="62" cy="61" r="2.5" fill="#FFFFFF" />
            
            {/* Right Eye */}
            <ellipse cx="96" cy="65" rx="7" ry="11" fill="#000000" />
            <circle cx="94" cy="61" r="2.5" fill="#FFFFFF" />
            
            {/* Streetwear Smile */}
            <path
              d="M 68 85 Q 80 96 92 85"
              fill="none"
              stroke="#000000"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Left Arm wearing the CasiOak G-Shock */}
            <path
              d="M 32 90 C 18 95, 16 112, 28 118 C 36 122, 42 110, 36 102"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* G-Shock Watch on wrist */}
            <rect
              x="18"
              y="98"
              width="14"
              height="18"
              rx="4"
              fill="#18181b"
              stroke="#000000"
              strokeWidth="2.5"
              transform="rotate(-15 25 107)"
            />
            {/* Watch Octagonal Bezel Accent */}
            <circle cx="25" cy="107" r="4.5" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
            {/* Watch Hands */}
            <line x1="25" y1="107" x2="25" y2="104" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="25" y1="107" x2="28" y2="107" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="comic-font text-xs tracking-wider bg-black text-white px-2 py-0.5 mt-[-6px] border border-black shadow-[2px_2px_0px_#000]">
          SEAN DID IT.
        </div>
      </div>
    );
  }

  // INTERACTIVE VERSION: floats, responds to hover/tap, winks, watch flashes, pops speech bubble
  return (
    <div
      className={`relative flex flex-col items-center cursor-pointer select-none group ${className}`}
      onMouseEnter={() => {
        setIsWinking(true);
        setShowSpeech(true);
      }}
      onMouseLeave={() => {
        setIsWinking(false);
      }}
      onClick={() => setShowSpeech(!showSpeech)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setShowSpeech(!showSpeech);
        }
      }}
      aria-label="Interactive SeanDidMyWrist Ghost Mascot — Click to speak"
    >
      {/* Comic Speech Bubble */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: -10 }}
            exit={{ opacity: 0, scale: 0.7, y: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute -top-14 z-30 pointer-events-none whitespace-nowrap bg-yellow-300 border-3 border-black px-3 py-1 shadow-[4px_4px_0px_#000000]"
          >
            <p className="comic-font text-xs md:text-sm text-black tracking-wide">
              {speechText}
            </p>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Ghost Animation */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
          rotate: [-1.5, 1.5, -1.5]
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center"
      >
        <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[5px_5px_0px_#000000]">
          {/* Action Burst Rays when hovered */}
          {isWinking && (
            <g className="animate-pulse">
              <line x1="80" y1="5" x2="80" y2="12" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
              <line x1="140" y1="35" x2="133" y2="40" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
              <line x1="20" y1="35" x2="27" y2="40" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {/* Ghost Sheet Body */}
          <path
            d="M 30 110 
               C 30 50, 50 20, 80 20 
               C 110 20, 130 50, 130 110 
               C 130 135, 120 145, 110 135 
               C 100 125, 90 145, 80 135 
               C 70 125, 60 145, 50 135 
               C 40 125, 30 135, 30 110 Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="round"
          />

          {/* Left Eye (normal or wink) */}
          <ellipse cx="64" cy="65" rx="7" ry="11" fill="#000000" />
          <circle cx="62" cy="61" r="2.5" fill="#FFFFFF" />

          {/* Right Eye: Winks if hovered/active */}
          {isWinking ? (
            <path
              d="M 90 65 Q 97 58 104 65"
              fill="none"
              stroke="#000000"
              strokeWidth="5"
              strokeLinecap="round"
            />
          ) : (
            <>
              <ellipse cx="96" cy="65" rx="7" ry="11" fill="#000000" />
              <circle cx="94" cy="61" r="2.5" fill="#FFFFFF" />
            </>
          )}

          {/* Streetwear Smile */}
          <path
            d="M 68 85 Q 80 97 92 85"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Left Arm with CasiOak G-Shock */}
          <path
            d="M 32 90 C 18 95, 16 112, 28 118 C 36 122, 42 110, 36 102"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* G-Shock Watch with subtle shimmer */}
          <rect
            x="18"
            y="98"
            width="14"
            height="18"
            rx="4"
            fill="#18181b"
            stroke="#000000"
            strokeWidth="2.5"
            transform="rotate(-15 25 107)"
          />
          {/* Watch Octagonal Bezel Accent */}
          <circle
            cx="25"
            cy="107"
            r="4.5"
            fill={isWinking ? '#fde047' : '#FFFFFF'}
            stroke="#000000"
            strokeWidth="1.5"
          />
          {/* Watch Hands */}
          <line x1="25" y1="107" x2="25" y2="104" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="25" y1="107" x2="28" y2="107" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Comic brand label badge */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="comic-font text-xs tracking-wider bg-black text-white px-2 py-0.5 mt-[-6px] border-2 border-black shadow-[3px_3px_0px_#000000]"
      >
        SEAN DID IT.
      </motion.div>
    </div>
  );
};
