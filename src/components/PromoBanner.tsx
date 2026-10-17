import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Gift } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-black text-white py-2 px-4 border-b-3 border-black text-center relative z-40 select-none"
      >
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 pr-6 text-xs md:text-sm">
          <Sparkles size={16} className="text-yellow-400 shrink-0 animate-pulse" />
          <span className="comic-font tracking-wider text-yellow-300">
            SIGN UP WITH GMAIL & PHONE = 5% OFF
          </span>
          <span className="text-yellow-400 font-bold">•</span>
          <span className="comic-font tracking-wider text-white">
            10% OFF ORDERS $125+ WITH CODE: <span className="bg-yellow-300 text-black px-1 py-0.5 border border-black font-mono font-bold">ONESTOPSHOP</span>
          </span>
          <span className="text-yellow-400 font-bold hidden sm:inline">•</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-red-400 font-bold">
            <Gift size={13} className="text-red-400" />
            5 PUNCHES = 1 FREE WATCH! (NO DEAL STACKING)
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
