import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Gift, Zap, LogOut, History, Award, CheckCircle2, ShoppingBag } from 'lucide-react';
import { UserProfile } from '../hooks/useAuth';

interface AccountProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSignOut: () => void;
  onRedeemReward: () => boolean;
  onSimulateWatchPurchase: (watchCount: number) => void;
  onOpenLoyaltyCard: () => void;
}

export const AccountProfileModal: React.FC<AccountProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSignOut,
  onRedeemReward,
  onSimulateWatchPurchase,
  onOpenLoyaltyCard
}) => {
  if (!isOpen) return null;

  const punches = currentUser.loyaltyPunches;
  const freeWatches = currentUser.freeWatchesEarned;
  const isRewardReady = punches >= 5 || freeWatches > 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs select-none overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-white border-6 border-black shadow-[12px_12px_0px_#000] p-5 sm:p-7 max-h-[92vh] overflow-y-auto my-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black text-white hover:bg-red-600 p-2 border-2 border-black transition-colors cursor-pointer z-20"
            aria-label="Close profile"
          >
            <X size={18} />
          </button>

          {/* User Header */}
          <div className="flex items-center gap-3.5 border-b-4 border-black pb-4 mb-5">
            <div className="w-14 h-14 bg-yellow-300 border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
              <User size={28} className="text-black" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="comic-font text-2xl sm:text-3xl text-black leading-none">
                  {currentUser.name}
                </h2>
                <span className="bg-black text-yellow-300 comic-font text-xs px-2 py-0.5 border border-black">
                  VIP MEMBER
                </span>
              </div>
              <p className="text-xs font-bold text-gray-600 mt-1">
                {currentUser.email} {currentUser.instagram && `• ${currentUser.instagram}`}
              </p>
            </div>
          </div>

          {/* Points & Stats Dashboard */}
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            <div className="bg-yellow-300 border-3 border-black p-2.5 text-center shadow-[2px_2px_0px_#000]">
              <div className="text-[10px] font-black uppercase text-black">ACTIVE PUNCHES</div>
              <div className="comic-font text-3xl text-black">{punches} / 5</div>
              <div className="text-[10px] font-bold text-black">{5 - punches} to free watch</div>
            </div>

            <div className="bg-red-600 text-white border-3 border-black p-2.5 text-center shadow-[2px_2px_0px_#000]">
              <div className="text-[10px] font-black uppercase text-yellow-200">FREE WATCHES</div>
              <div className="comic-font text-3xl text-yellow-300">{freeWatches}</div>
              <div className="text-[10px] font-bold text-white">
                {freeWatches > 0 ? 'Ready to claim!' : 'None claimed yet'}
              </div>
            </div>

            <div className="bg-black text-white border-3 border-black p-2.5 text-center shadow-[2px_2px_0px_#000]">
              <div className="text-[10px] font-black uppercase text-gray-300">TOTAL WATCHES</div>
              <div className="comic-font text-3xl text-yellow-300">{currentUser.totalWatchesPurchased}</div>
              <div className="text-[10px] font-bold text-gray-300">Purchased all-time</div>
            </div>
          </div>

          {/* Active 5-Hole Punch Card Display */}
          <div className="bg-yellow-100 border-4 border-black p-4 mb-5 shadow-[3px_3px_0px_#000]">
            <div className="flex items-center justify-between mb-3 border-b-2 border-black/40 pb-2">
              <span className="comic-font text-sm text-black">
                SEAN’S 5-HOLE VIP PUNCH CARD
              </span>
              <button
                onClick={onOpenLoyaltyCard}
                className="text-xs font-black text-red-600 hover:underline cursor-pointer"
              >
                OPEN FULL VIEW →
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-3">
              {[...Array(5)].map((_, i) => {
                const slot = i + 1;
                const isPunched = i < punches;
                return (
                  <div
                    key={slot}
                    className={`aspect-square border-2 border-black flex flex-col items-center justify-center ${
                      isPunched
                        ? 'bg-black text-yellow-300 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.7)]'
                        : slot === 5
                        ? 'bg-yellow-400 border-dashed border-red-600'
                        : 'bg-white border-dashed text-gray-400'
                    }`}
                  >
                    {isPunched ? (
                      <>
                        <Zap size={18} className="text-yellow-300 fill-yellow-300" />
                        <span className="text-[9px] font-black mt-0.5">#{slot}</span>
                      </>
                    ) : slot === 5 ? (
                      <span className="comic-font text-[9px] text-red-600 text-center leading-none">
                        FREE WATCH
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold">#{slot}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reward Claim Banner if Ready */}
            {isRewardReady && (
              <div className="bg-red-600 text-white border-3 border-black p-3 mb-2 flex items-center justify-between gap-2 shadow-[2px_2px_0px_#000]">
                <div>
                  <div className="comic-font text-lg text-yellow-300 leading-tight">
                    🎉 1 FREE CUSTOM WATCH REWARD READY!
                  </div>
                  <div className="text-[11px] font-bold">
                    You have unlocked your reward from SeanDidMyWrist!
                  </div>
                </div>
                <button
                  onClick={() => {
                    onRedeemReward();
                    alert('🎉 1 FREE CUSTOM CASIOAK WATCH CLAIMED! Sean will credit your free watch build on your next order!');
                  }}
                  className="bg-yellow-300 hover:bg-yellow-400 text-black comic-font text-xs px-3 py-1.5 border-2 border-black cursor-pointer shadow-[2px_2px_0px_#000]"
                >
                  REDEEM
                </button>
              </div>
            )}

            {/* Test Simulation Buttons */}
            <div className="border-t border-black/30 pt-2.5 mt-2 flex flex-wrap gap-2 text-xs">
              <span className="font-bold text-gray-600 text-[11px] w-full">
                Interactive Testing: Simulate purchase to trigger magic punch card animation:
              </span>
              <button
                onClick={() => onSimulateWatchPurchase(1)}
                className="bg-black hover:bg-yellow-400 hover:text-black text-white px-2.5 py-1 text-xs font-bold border-2 border-black flex items-center gap-1 cursor-pointer transition-colors"
                title="Test buying 1 watch: adds 1 hole punch with magic card animation"
              >
                <Zap size={13} />
                <span>+1 Watch Purchase</span>
              </button>
              <button
                onClick={() => onSimulateWatchPurchase(2)}
                className="bg-black hover:bg-yellow-400 hover:text-black text-white px-2.5 py-1 text-xs font-bold border-2 border-black flex items-center gap-1 cursor-pointer transition-colors"
                title="Test buying 2 watches at once: punches 2 holes sequentially"
              >
                <Zap size={13} />
                <span>+2 Watches</span>
              </button>
              <button
                onClick={() => onSimulateWatchPurchase(5)}
                className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 text-xs font-bold border-2 border-black flex items-center gap-1 cursor-pointer transition-colors"
                title="Test buying 5 watches at once: punches all 5 holes and unlocks free watch"
              >
                <Gift size={13} />
                <span>+5 Watches (Full 5-Punch Sequence & Free Watch)</span>
              </button>
            </div>
          </div>

          {/* Past Order History & Punch Ledger */}
          <div className="mb-5">
            <div className="flex items-center gap-1.5 border-b-2 border-black pb-1 mb-2.5">
              <History size={16} className="text-black" />
              <h3 className="comic-font text-base text-black">
                WATCH PURCHASE & LOYALTY HISTORY
              </h3>
            </div>

            {currentUser.orderHistory.length === 0 ? (
              <p className="text-xs text-gray-500 italic p-3 text-center bg-gray-50 border border-gray-300">
                No orders yet. Place an order for a custom watch to earn your first loyalty punch!
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {currentUser.orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border-2 border-black p-2.5 flex items-center justify-between text-xs shadow-[2px_2px_0px_#000]"
                  >
                    <div>
                      <div className="font-black text-black flex items-center gap-1.5">
                        <ShoppingBag size={13} className="text-black" />
                        <span>{order.id}</span>
                        <span className="text-[10px] text-gray-500 font-normal">• {order.date}</span>
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">
                        {order.itemsSummary}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-yellow-300 text-black comic-font text-xs px-2 py-0.5 border border-black inline-block">
                        +{order.punchesEarned} PUNCH{order.punchesEarned > 1 ? 'ES' : ''}
                      </span>
                      <div className="text-[11px] font-bold text-black mt-0.5">
                        ${order.totalAmount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sign Out & Switch Account */}
          <div className="flex items-center justify-between border-t-2 border-black pt-3">
            <button
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="text-xs font-bold text-red-600 hover:text-black flex items-center gap-1 cursor-pointer"
            >
              <LogOut size={14} />
              <span>Sign Out of Account</span>
            </button>
            <button
              onClick={onClose}
              className="ink-btn bg-black hover:bg-yellow-400 hover:text-black text-white px-4 py-1.5 text-xs cursor-pointer transition-colors"
            >
              DONE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
