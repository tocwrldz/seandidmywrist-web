import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Award, Gift, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../hooks/useAuth';

interface GhostPunchCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  watchesBought: number; // Number of watches in this purchase (1 to 5+)
  previousPunches: number; // Punches before this transaction (0 to 4)
  newPunches: number; // Punches after this transaction (0 to 4, or 5 if completed)
  completedCycles?: number;
  onRedeemReward?: () => boolean;
}

export const GhostPunchCardModal: React.FC<GhostPunchCardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  watchesBought,
  previousPunches,
  newPunches,
  completedCycles = 0,
  onRedeemReward
}) => {
  // Staged animation state: 'poof' -> 'stamping' -> 'finished'
  const [stage, setStage] = useState<'poof' | 'stamping' | 'finished'>('poof');
  const [currentAnimatedCount, setCurrentAnimatedCount] = useState<number>(previousPunches);
  const [activePunchSlot, setActivePunchSlot] = useState<number | null>(null);

  // Restart sequence whenever modal opens
  useEffect(() => {
    if (!isOpen) return;

    setStage('poof');
    setCurrentAnimatedCount(previousPunches);
    setActivePunchSlot(null);

    // 1. Initial dramatic POOF animation lasts 1000ms
    const poofTimer = setTimeout(() => {
      setStage('stamping');

      // 2. Sequentially punch holes one by one
      // If user bought e.g. 2 watches, punch 2 times sequentially
      const totalPunchesToAnimate = watchesBought;
      let punchStep = 0;

      const punchInterval = setInterval(() => {
        if (punchStep < totalPunchesToAnimate) {
          punchStep++;
          const slotToPunch = ((previousPunches + punchStep - 1) % 5) + 1;
          setActivePunchSlot(slotToPunch);
          setCurrentAnimatedCount((prev) => {
            const next = prev + 1;
            return next > 5 ? (next % 5 === 0 ? 5 : next % 5) : next;
          });
        } else {
          clearInterval(punchInterval);
          setActivePunchSlot(null);
          setStage('finished');
        }
      }, 550); // 550ms between each punch for maximum comic punch impact

      return () => clearInterval(punchInterval);
    }, 1100);

    return () => clearTimeout(poofTimer);
  }, [isOpen, previousPunches, watchesBought]);

  const handleReplay = () => {
    setStage('poof');
    setCurrentAnimatedCount(previousPunches);
    setActivePunchSlot(null);

    setTimeout(() => {
      setStage('stamping');
      let punchStep = 0;
      const interval = setInterval(() => {
        if (punchStep < watchesBought) {
          punchStep++;
          const slotToPunch = ((previousPunches + punchStep - 1) % 5) + 1;
          setActivePunchSlot(slotToPunch);
          setCurrentAnimatedCount((prev) => {
            const next = prev + 1;
            return next > 5 ? (next % 5 === 0 ? 5 : next % 5) : next;
          });
        } else {
          clearInterval(interval);
          setActivePunchSlot(null);
          setStage('finished');
        }
      }, 550);
    }, 1000);
  };

  if (!isOpen) return null;

  const totalCalculated = previousPunches + watchesBought;
  const isRewardEarned = totalCalculated >= 5 || (currentUser && currentUser.freeWatchesEarned > 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto">
        <div className="relative w-full max-w-xl my-auto">
          {/* ========================================================= */}
          {/* 1. MAGIC "POOF!" CLOUD & COMIC IMPACT BURST OVERLAY */}
          {/* ========================================================= */}
          {stage === 'poof' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0.2, 1.3, 1], opacity: [0, 1, 0.95] }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
            >
              {/* Smoke puff circles */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-400/30 blur-2xl border-4 border-cyan-300"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute w-60 h-60 rounded-full bg-yellow-300/40 blur-xl"
                />

                {/* Comic POOF Burst Badge */}
                <div className="relative bg-yellow-300 text-black border-6 border-black px-8 py-5 shadow-[10px_10px_0px_#000] -rotate-3 flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <Sparkles size={32} className="text-black animate-spin" />
                    <span className="comic-font text-5xl sm:text-7xl tracking-wider text-black">
                      *POOF!*
                    </span>
                    <Sparkles size={32} className="text-black animate-spin" />
                  </div>
                  <span className="bg-black text-yellow-300 comic-font text-sm sm:text-base px-3 py-1 mt-1 border-2 border-black rotate-2">
                    ✨ VIP LOYALTY CARD PUNCHED! ✨
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 2. THE MAIN LOYALTY CARD MODAL CONTAINER */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            className="relative bg-yellow-300 border-6 sm:border-8 border-black shadow-[14px_14px_0px_#000] p-5 sm:p-7 overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Halftone dot texture */}
            <div className="absolute inset-0 halftone opacity-15 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black text-white hover:bg-red-600 p-2 border-3 border-black shadow-[3px_3px_0px_#000] transition-colors cursor-pointer z-30"
              aria-label="Close loyalty card"
            >
              <X size={20} />
            </button>

            {/* Vintage Ticket Punch Cutouts */}
            <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-black rounded-full border-4 border-yellow-300" />
            <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-black rounded-full border-4 border-yellow-300" />

            {/* ======================================================= */}
            {/* 3. THE GHOST OF SEANDIDMYWRIST HERO HEADER */}
            {/* ======================================================= */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 bg-white border-4 border-black p-3.5 sm:p-4 mb-4 shadow-[4px_4px_0px_#000]">
              {/* Animated Floating Ghost Apparition */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative flex-shrink-0"
              >
                {/* Spectral cyan aura glow */}
                <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-70 animate-pulse" />

                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-cyan-50 border-3 border-black rounded-full flex items-center justify-center overflow-hidden shadow-[2px_2px_0px_#000]">
                  <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[2px_2px_0px_#000]">
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
                      strokeWidth="5"
                    />
                    <ellipse cx="64" cy="65" rx="7" ry="11" fill="#00f5d4" stroke="#000" strokeWidth="2" />
                    <circle cx="63" cy="62" r="2.5" fill="#FFFFFF" />
                    <ellipse cx="96" cy="65" rx="7" ry="11" fill="#00f5d4" stroke="#000" strokeWidth="2" />
                    <circle cx="95" cy="62" r="2.5" fill="#FFFFFF" />
                    <path d="M 68 85 Q 80 96 92 85" fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 32 90 C 18 95, 16 112, 28 118 C 36 122, 42 110, 36 102" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
                    <rect x="18" y="98" width="14" height="18" rx="4" fill="#000000" stroke="#00f5d4" strokeWidth="2" transform="rotate(-15 25 107)" />
                    <circle cx="25" cy="107" r="4" fill="#fbbf24" stroke="#000" strokeWidth="1" />
                  </svg>
                </div>
              </motion.div>

              {/* Speech Bubble from The Ghost */}
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 bg-black text-yellow-300 comic-font text-xs px-2.5 py-1 border border-black mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                  <span>VIP PUNCH CARD</span>
                </div>
                <h3 className="comic-font text-xl sm:text-2xl text-black leading-tight">
                  {stage === 'poof' && '“BOO! I HEARD A WATCH WAS BOUGHT!”'}
                  {stage === 'stamping' && `“PUNCHING HOLE #${activePunchSlot || '...'} ON YOUR 5-HOLE CARD!”`}
                  {stage === 'finished' && (isRewardEarned ? '“BOOM! 5 PUNCHES = 1 FREE WATCH UNLOCKED!”' : '“PUNCHED & STORED IN YOUR VIP ACCOUNT!”')}
                </h3>
                <p className="text-xs font-bold text-gray-700 mt-1">
                  {currentUser ? (
                    <span>
                      Tied to VIP Account: <strong className="text-black underline">{currentUser.name}</strong> ({currentUser.email})
                    </span>
                  ) : (
                    <span>Logged-in VIP Member Card</span>
                  )}
                </p>
              </div>
            </div>

            {/* ======================================================= */}
            {/* 4. PURCHASE SUMMARY CALLOUT */}
            {/* ======================================================= */}
            <div className="relative z-10 bg-black text-white border-3 border-black p-3 mb-4 shadow-[3px_3px_0px_#000] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-yellow-300 text-black comic-font text-xs sm:text-sm px-2 py-0.5 border border-black font-black">
                  WATCH ONLY QUALIFIED
                </span>
                <span className="text-xs sm:text-sm font-bold text-yellow-200">
                  +{watchesBought} Watch{watchesBought > 1 ? 'es' : ''} Purchased = +{watchesBought} Hole Punch{watchesBought > 1 ? 'es' : ''}!
                </span>
              </div>
              <span className="text-xs text-gray-300 font-mono">
                Total Watches: {currentUser ? currentUser.totalWatchesPurchased : watchesBought}
              </span>
            </div>

            {/* ======================================================= */}
            {/* 5. THE 5 HOLE PUNCH SLOTS (1 row of 5) */}
            {/* ======================================================= */}
            <div className="relative z-10 bg-white/95 border-4 border-black p-4 mb-4 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                <span className="comic-font text-sm sm:text-base text-black">
                  OFFICIAL 5-HOLE VIP CARD
                </span>
                <span className="comic-font text-xs bg-red-600 text-white px-2 py-0.5 border border-black">
                  5 PUNCHES = 1 FREE WATCH
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {[...Array(5)].map((_, i) => {
                  const slotNumber = i + 1;
                  const isPunched = i < currentAnimatedCount;
                  const isCurrentlyPunching = activePunchSlot === slotNumber;
                  const isFinalSlot = slotNumber === 5;

                  return (
                    <div
                      key={slotNumber}
                      className={`relative aspect-square flex flex-col items-center justify-center border-3 border-black transition-all ${
                        isCurrentlyPunching
                          ? 'bg-yellow-400 scale-110 shadow-[0_0_15px_#f59e0b] z-20'
                          : isPunched
                          ? 'bg-black text-white shadow-[inset_3px_3px_6px_rgba(0,0,0,0.6)]'
                          : isFinalSlot
                          ? 'bg-red-50 text-red-600 border-dashed border-red-600'
                          : 'bg-gray-50 text-gray-500 border-dashed'
                      }`}
                    >
                      {/* Live Punch Comic Reaction Stamp */}
                      {isCurrentlyPunching && (
                        <motion.div
                          initial={{ scale: 2.2, rotate: -25, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          transition={{ type: 'spring', damping: 10, stiffness: 300 }}
                          className="absolute -top-3 bg-red-600 text-white comic-font text-[10px] px-1.5 py-0.5 border-2 border-black z-30 shadow-[2px_2px_0px_#000]"
                        >
                          *PUNCH!*
                        </motion.div>
                      )}

                      {isPunched ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 12 }}
                          className="flex flex-col items-center justify-center"
                        >
                          <Zap size={24} className="text-yellow-300 fill-yellow-300 drop-shadow-[1px_1px_0px_#000]" />
                          <span className="text-[10px] font-black tracking-tighter text-yellow-200 mt-0.5">
                            #{slotNumber}
                          </span>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-1">
                          {isFinalSlot ? (
                            <>
                              <Award size={22} className="text-red-600 animate-pulse" />
                              <span className="comic-font text-[10px] text-red-600 leading-tight">
                                FREE!
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="w-6 h-6 rounded-full border border-gray-400 border-dotted flex items-center justify-center mb-0.5">
                                <span className="text-[11px] font-bold text-gray-500">#{slotNumber}</span>
                              </div>
                              <span className="text-[9px] font-bold text-gray-400">OPEN</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar & Status */}
              <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-between text-xs font-bold">
                <span className="text-black">
                  Current Card: <span className="text-red-600 font-black">{currentAnimatedCount % 5 === 0 && currentAnimatedCount > 0 ? 5 : currentAnimatedCount % 5} / 5 Punches</span>
                </span>
                <span className="text-gray-500">
                  {Math.max(0, 5 - (currentAnimatedCount % 5 === 0 && currentAnimatedCount > 0 ? 5 : currentAnimatedCount % 5))} more until next free watch!
                </span>
              </div>
            </div>

            {/* ======================================================= */}
            {/* 6. REWARD EARNED CELEBRATION BANNER */}
            {/* ======================================================= */}
            {isRewardEarned && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: [0.98, 1.02, 0.98], opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10 bg-red-600 text-white border-4 border-black p-3.5 mb-4 text-center shadow-[4px_4px_0px_#000]"
              >
                <div className="flex items-center justify-center gap-2">
                  <Gift size={24} className="animate-bounce text-yellow-300" />
                  <span className="comic-font text-2xl sm:text-3xl tracking-wide text-yellow-200">
                    🎉 FREE CUSTOM WATCH REWARD UNLOCKED!
                  </span>
                </div>
                <p className="text-xs font-bold text-white mt-1">
                  The Ghost of SeanDidMyWrist will deliver your free custom GA2100 CasiOak!
                </p>
                {onRedeemReward && (
                  <button
                    onClick={() => {
                      onRedeemReward();
                      alert('🎉 FREE WATCH REWARD CLAIMED! Sean will credit your free watch build on your next order/delivery!');
                    }}
                    className="mt-2.5 bg-yellow-300 hover:bg-yellow-400 text-black comic-font text-sm px-4 py-1.5 border-2 border-black cursor-pointer shadow-[2px_2px_0px_#000]"
                  >
                    REDEEM FREE WATCH NOW
                  </button>
                )}
              </motion.div>
            )}

            {/* ======================================================= */}
            {/* 7. ACTION BUTTONS */}
            {/* ======================================================= */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={onClose}
                className="ink-btn flex-1 bg-black hover:bg-yellow-400 hover:text-black text-white text-base py-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <CheckCircle2 size={18} />
                <span>SAVE & CONTINUE BROWSING</span>
              </button>

              <button
                onClick={handleReplay}
                className="bg-white hover:bg-gray-100 border-3 border-black text-black px-4 py-2 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#000]"
                title="Replay the Ghost poof and punch sequence"
              >
                <RefreshCw size={14} />
                <span>REPLAY POOF & PUNCH</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
