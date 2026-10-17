import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';

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
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 pr-6">
          <Sparkles size={16} className="text-yellow-400 shrink-0 animate-pulse" />
          <p className="comic-font text-sm md:text-base tracking-wider text-white">
            WELCOME TO SEANDIDMYWRIST — TAKE <span className="text-yellow-400 underline decoration-2">5% OFF</span> YOUR FIRST ORDER.
          </p>
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
