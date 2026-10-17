import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Sparkles, Check, Gift, RefreshCw, Zap, User } from 'lucide-react';
import { UserProfile } from '../hooks/useAuth';

interface LoyaltyPunchCardProps {
  isOpen: boolean;
  onClose: () => void;
  punches: number; // 0 to 5
  freeWatchesEarned: number;
  currentUser?: UserProfile | null;
  onAddPunch: (count?: number) => void;
  onRedeemReward: () => boolean;
  onResetCard: () => void;
  onOpenAuth?: () => void;
}

export const LoyaltyPunchCard: React.FC<LoyaltyPunchCardProps> = ({
  isOpen,
  onClose,
  punches,
  freeWatchesEarned,
  currentUser,
  onAddPunch,
  onRedeemReward,
  onResetCard,
  onOpenAuth
}) => {
  if (!isOpen) return null;

  const isComplete = punches >= 5 || freeWatchesEarned > 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs select-none overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotate: 1 }}
          className="relative w-full max-w-lg bg-yellow-300 border-6 md:border-8 border-black shadow-[12px_12px_0px_#000] p-5 sm:p-7 max-h-[92vh] overflow-y-auto my-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Loyalty Punch Card"
        >
          {/* Halftone dot pattern overlay on paper card */}
          <div className="absolute inset-0 halftone opacity-15 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-black text-white hover:bg-red-600 p-2 border-3 border-black shadow-[3px_3px_0px_#000] transition-colors cursor-pointer z-20"
            aria-label="Close punch card"
          >
            <X size={20} />
          </button>

          {/* Vintage Ticket Punch Cutouts (Left and Right punch notches) */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#f3f4f6] rounded-full border-4 border-black" />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#f3f4f6] rounded-full border-4 border-black" />

          {/* Account status header strip */}
          <div className="relative z-10 flex items-center justify-between bg-black text-yellow-300 px-3 py-1.5 border-2 border-black mb-3 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-yellow-300" />
              <span>
                {currentUser ? (
                  <>VIP ACCOUNT: <strong className="text-white underline">{currentUser.name}</strong></>
                ) : (
                  <>GUEST MODE (POINTS NOT SAVED)</>
                )}
              </span>
            </div>
            {currentUser ? (
              <span className="text-[10px] text-gray-300 font-mono">
                {currentUser.totalWatchesPurchased} WATCHES LOGGED
              </span>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-yellow-300 text-black px-2 py-0.5 text-[10px] font-black hover:bg-white cursor-pointer"
              >
                LOG IN TO SAVE POINTS
              </button>
            )}
          </div>

          {/* Header */}
          <div className="text-center border-b-4 border-black pb-3 mb-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-black text-yellow-300 comic-font text-xs md:text-sm px-3 py-1 border-2 border-black -rotate-1 mb-1.5">
              <Sparkles size={14} className="animate-pulse" />
              <span>OFFICIAL VIP REWARDS CLUB</span>
            </div>
            <h2 className="comic-font text-3xl md:text-5xl text-black tracking-wide leading-none">
              SEAN’S PUNCH CARD
            </h2>
            <p className="text-xs md:text-sm font-black text-black mt-1">
              EVERY WATCH PURCHASE = 1 HOLE PUNCH • 5 PUNCHES = 1 FREE WATCH!
            </p>
            <div className="inline-block bg-white text-black text-[10px] font-bold px-2 py-0.5 border border-black mt-1">
              ✨ Featuring The Ghost of SeanDidMyWrist Magic Poof & Punch Animation!
            </div>
          </div>

          {/* Reward Status Banner */}
          {isComplete ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: [0.95, 1.02, 0.95] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-red-600 text-white border-4 border-black p-3 mb-4 text-center shadow-[4px_4px_0px_#000] relative z-10"
            >
              <div className="flex items-center justify-center gap-2">
                <Gift size={24} className="animate-bounce" />
                <span className="comic-font text-2xl md:text-3xl tracking-wider">
                  🎉 5 PUNCHES COMPLETE! FREE WATCH UNLOCKED!
                </span>
              </div>
              <p className="text-xs font-bold text-yellow-200 mt-1">
                You've earned 1 Free Custom GA2100 CasiOak build on your order!
              </p>
            </motion.div>
          ) : (
            <div className="bg-white border-3 border-black p-2.5 mb-4 text-center shadow-[3px_3px_0px_#000] relative z-10">
              <span className="comic-font text-lg md:text-xl text-black">
                PROGRESS: <span className="text-red-600 underline font-black">{punches} OF 5 PUNCHES</span> COLLECTED
              </span>
              <p className="text-[11px] font-bold text-gray-600">
                {5 - punches} more custom watch {5 - punches === 1 ? 'purchase' : 'purchases'} until your FREE custom watch!
              </p>
            </div>
          )}

          {/* THE 5 HOLE PUNCH SLOTS (1 row of 5 slots) */}
          <div className="grid grid-cols-5 gap-2.5 md:gap-3.5 mb-4 relative z-10">
            {[...Array(5)].map((_, i) => {
              const slotNumber = i + 1;
              const isPunched = i < punches;
              const isFinalSlot = slotNumber === 5;

              return (
                <div
                  key={slotNumber}
                  className={`relative aspect-square flex flex-col items-center justify-center border-3 border-black transition-all ${
                    isPunched
                      ? 'bg-black text-white shadow-[inset_3px_3px_6px_rgba(0,0,0,0.6)]'
                      : isFinalSlot
                      ? 'bg-yellow-400 text-black border-dashed border-red-600 shadow-[2px_2px_0px_#000]'
                      : 'bg-white text-black border-dashed shadow-[2px_2px_0px_#000]'
                  }`}
                >
                  {isPunched ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex flex-col items-center justify-center"
                    >
                      <Zap size={24} className="text-yellow-300 fill-yellow-300" />
                      <span className="text-[10px] font-black tracking-tighter text-yellow-200 mt-0.5">
                        PUNCH #{slotNumber}
                      </span>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-1">
                      {isFinalSlot ? (
                        <>
                          <Award size={22} className="text-red-600 animate-pulse" />
                          <span className="comic-font text-[10px] md:text-xs text-red-600 font-black leading-tight">
                            FREE WATCH!
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-6 rounded-full border-2 border-gray-400 border-dotted flex items-center justify-center mb-0.5">
                            <span className="text-[11px] font-bold text-gray-500">#{slotNumber}</span>
                          </div>
                          <span className="text-[9px] font-bold text-gray-500">OPEN</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Corner Rivet / hole punch indicator */}
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-black/20" />
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="bg-white border-3 border-black p-3.5 space-y-3 relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-gray-800">
              <span className="flex items-center gap-1">
                <Check size={14} className="text-green-600" />
                Hole punches automatically add upon paying for a watch (Watches only)
              </span>
              <span className="text-[11px] text-gray-500">
                Card ID: SDMW-VIP-{currentUser ? currentUser.id.slice(-6) : punches}X
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1 border-t-2 border-gray-200">
              {isComplete ? (
                <button
                  onClick={() => {
                    onRedeemReward();
                    alert('🎉 1 FREE CUSTOM CASIOAK WATCH CLAIMED! Sean will credit your free watch build on your next order/delivery!');
                  }}
                  className="ink-btn flex-grow bg-red-600 hover:bg-black text-white text-lg py-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Gift size={20} />
                  <span>REDEEM FREE WATCH NOW</span>
                </button>
              ) : (
                <button
                  onClick={() => onAddPunch(1)}
                  className="ink-btn flex-grow bg-black hover:bg-yellow-400 hover:text-black text-white text-sm py-2 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  title="Simulate placing a watch purchase to trigger Ghost of Sean punch animation"
                >
                  <Zap size={16} />
                  <span>SIMULATE WATCH ORDER (+1 PUNCH)</span>
                </button>
              )}

              <button
                onClick={onResetCard}
                className="bg-gray-100 hover:bg-gray-200 border-2 border-black px-3 py-2 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Reset card to 0 punches"
              >
                <RefreshCw size={13} />
                <span>RESET</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
