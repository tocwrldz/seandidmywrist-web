import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GShockWatch } from '../../components/GShockWatch';
import { Zap, FastForward } from 'lucide-react';

interface OpeningScreenProps {
  onEnterShop: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onEnterShop }) => {
  const [stage, setStage] = useState<'idle' | 'materializing' | 'transitioning'>('idle');

  // Trigger materialization
  const handleEnter = () => {
    if (stage !== 'idle') return;
    setStage('materializing');

    // After watch materialization completes (approx 3.2s), transition to comic shop
    const timer = setTimeout(() => {
      setStage('transitioning');
      setTimeout(onEnterShop, 600);
    }, 3200);

    return () => clearTimeout(timer);
  };

  // Keyboard navigation: Enter or Space starts intro, Escape skips
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (stage === 'idle') {
          e.preventDefault();
          handleEnter();
        }
      } else if (e.key === 'Escape') {
        onEnterShop();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage]);

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center overflow-hidden select-none"
      role="region"
      aria-label="SeanDidMyWrist Opening Scene"
    >
      {/* Comic Halftone Texture Backdrop */}
      <div className="absolute inset-0 halftone opacity-25 pointer-events-none" />

      {/* Comic Book Page Border Frame */}
      <div className="absolute inset-3 md:inset-6 border-6 md:border-8 border-black pointer-events-none z-30" />

      {/* Top Streetwear Brand Ribbon */}
      <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-40 bg-black text-white px-6 py-1.5 border-4 border-black shadow-[4px_4px_0px_#fde047] -rotate-1">
        <h1 className="comic-font text-xl md:text-3xl tracking-widest">
          SEANDIDMYWRIST
        </h1>
      </div>

      {/* Skip Intro Button */}
      <button
        onClick={onEnterShop}
        className="absolute bottom-8 right-8 z-40 bg-white hover:bg-yellow-300 border-3 border-black px-4 py-2 text-xs md:text-sm font-bold shadow-[4px_4px_0px_#000000] flex items-center gap-1.5 transition-colors cursor-pointer"
        aria-label="Skip Intro and go straight to shop"
      >
        <FastForward size={16} />
        <span>SKIP INTRO</span>
      </button>

      {/* Keyboard Hint */}
      <div className="absolute bottom-8 left-8 z-40 hidden md:flex items-center gap-2 text-xs font-bold text-gray-500 bg-white/90 border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
        <span>PRESS</span>
        <kbd className="bg-black text-white px-1.5 py-0.5 rounded text-[10px]">ENTER</kbd>
        <span>TO START OR</span>
        <kbd className="bg-gray-200 text-black px-1.5 py-0.5 rounded text-[10px]">ESC</kbd>
        <span>TO SKIP</span>
      </div>

      {/* MAIN STAGE CONTENT */}
      <AnimatePresence mode="wait">
        {stage === 'idle' ? (
          <motion.div
            key="enter-prompt"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-20 flex flex-col items-center justify-center p-4"
          >
            {/* Illustrated Comic Action Burst Background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -z-10 w-[340px] h-[340px] md:w-[500px] md:h-[500px] opacity-15 pointer-events-none"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {[...Array(16)].map((_, i) => (
                  <polygon
                    key={i}
                    points="100,100 95,0 105,0"
                    transform={`rotate(${i * 22.5} 100 100)`}
                    fill="#000000"
                  />
                ))}
              </svg>
            </motion.div>

            {/* Sub-label banner */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-yellow-300 text-black border-3 border-black px-4 py-1 comic-font text-lg md:text-xl shadow-[4px_4px_0px_#000000] rotate-2 mb-8"
            >
              CUSTOM G-SHOCK LAB & STREETWEAR
            </motion.div>

            {/* The ENTER Button: White comic-book letters with thick black outline & shadow */}
            <motion.button
              whileHover={{ scale: 1.08, rotate: -1.5 }}
              whileTap={{ scale: 0.94 }}
              animate={{
                y: [-3, 3, -3],
                boxShadow: [
                  '8px 8px 0px 0px #000000',
                  '12px 12px 0px 0px #000000',
                  '8px 8px 0px 0px #000000'
                ]
              }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
              onClick={handleEnter}
              className="group relative bg-white border-6 border-black px-12 md:px-16 py-6 md:py-8 cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-400"
              aria-label="Enter SeanDidMyWrist Shop"
            >
              {/* Comic Action Starburst Accent */}
              <div className="absolute -top-5 -right-5 bg-red-500 text-white p-2 border-3 border-black rotate-12 shadow-[3px_3px_0px_#000000]">
                <Zap size={20} className="fill-white" />
              </div>

              <span className="comic-font text-6xl md:text-8xl tracking-widest text-white drop-shadow-[0_4px_0_#000000] [-webkit-text-stroke:3px_#000000] md:[-webkit-text-stroke:4px_#000000]">
                ENTER
              </span>
            </motion.button>

            {/* Tagline */}
            <p className="comic-font text-sm md:text-lg tracking-wider text-black mt-8 text-center bg-white border-2 border-black px-4 py-1 shadow-[3px_3px_0px_#000]">
              YOUR WRIST. YOUR STYLE. SEAN DID IT.
            </p>
          </motion.div>
        ) : (
          /* MATERIALIZATION SCENE */
          <motion.div
            key="materialize-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-20 flex flex-col items-center justify-center"
          >
            {/* Dramatic Flash Effect */}
            <motion.div
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: [0, 4, 0], opacity: [0.9, 0.4, 0] }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute w-40 h-40 bg-yellow-300 rounded-full z-10 pointer-events-none"
            />

            {/* Comic Shockwave Lines */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleY: [0.2, 1.8, 0],
                  x: [0, Math.cos((i * 30 * Math.PI) / 180) * 160],
                  y: [0, Math.sin((i * 30 * Math.PI) / 180) * 160]
                }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08 }}
                className="absolute w-1.5 h-16 bg-black pointer-events-none origin-bottom"
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}

            {/* The Materializing Casio G-Shock GA2100 with 3D-style tilt & rotation */}
            <motion.div
              initial={{ scale: 0.2, y: 80, opacity: 0, rotateY: 90, rotateZ: -25 }}
              animate={{
                scale: 1,
                y: 0,
                opacity: 1,
                rotateY: [90, 0, -8, 8, 0],
                rotateZ: [-25, 0, -3, 3, 0]
              }}
              transition={{
                duration: 2.2,
                type: 'spring',
                damping: 14,
                stiffness: 70
              }}
              className="relative z-20 flex flex-col items-center"
            >
              <GShockWatch
                size={270}
                bezelColor="#121212"
                dialColor="#181818"
                indicesColor="rainbow"
                accentColor="#f59e0b"
                strapColor="#151515"
                animateHands={true}
              />
            </motion.div>

            {/* Materializing Comic Status Caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <div className="bg-black text-white px-5 py-1.5 border-3 border-black shadow-[4px_4px_0px_#eab308]">
                <h2 className="comic-font text-2xl md:text-3xl tracking-widest animate-pulse">
                  MATERIALIZING GA2100 CASIOAK...
                </h2>
              </div>
              <p className="text-xs font-black tracking-widest text-gray-700 uppercase bg-white border border-black px-2 py-0.5">
                HAND-ASSEMBLED • CHICAGO & NWI
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
