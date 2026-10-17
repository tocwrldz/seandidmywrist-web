import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, KeyRound, AlertCircle, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';
import { GhostMascot } from './GhostMascot';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAttemptUnlock = (code: string) => {
    if (code === '2330') {
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleKeyClick = (digit: string) => {
    if (success) return;
    setError(false);
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 4) {
        handleAttemptUnlock(nextPin);
      }
    }
  };

  const handleDelete = () => {
    if (success) return;
    setError(false);
    setPin((prev) => prev.slice(0, -1));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAttemptUnlock(pin);
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-yellow-300 flex flex-col items-center justify-center p-4 select-none overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Website Locked"
    >
      {/* Halftone dot pattern backdrop */}
      <div className="absolute inset-0 halftone opacity-15 pointer-events-none" />

      {/* Comic Book Outer Frame */}
      <div className="absolute inset-3 sm:inset-5 border-6 md:border-8 border-black pointer-events-none z-30" />

      <div className="relative z-40 max-w-md w-full flex flex-col items-center text-center my-auto py-6">
        {/* Brand Banner */}
        <div className="bg-black text-yellow-300 px-5 py-1 border-3 border-black shadow-[4px_4px_0px_#000] -rotate-1 mb-4">
          <span className="comic-font text-lg sm:text-xl tracking-widest uppercase">
            SEANDIDMYWRIST.COM
          </span>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 bg-red-600 text-white font-black text-xs px-3 py-1 border-2 border-black mb-3 shadow-[2px_2px_0px_#000] uppercase">
          <Lock size={13} className="text-white" />
          <span>VAULT STATUS: TEMPORARILY LOCKED</span>
        </div>

        {/* Ghost with Speech Bubble */}
        <div className="relative flex flex-col items-center mb-4">
          {/* Comic Speech Bubble */}
          <motion.div
            initial={{ scale: 0.9, y: 5 }}
            animate={{ scale: [0.98, 1.03, 0.98], y: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="relative bg-white border-4 border-black p-3.5 mb-2 shadow-[5px_5px_0px_#000] max-w-xs"
          >
            <p className="comic-font text-xl sm:text-2xl text-black leading-tight">
              “SORRY WE’RE CLOSED RIGHT NOW”
            </p>
            <p className="text-[11px] font-bold text-gray-700 mt-1">
              We're currently preparing the next drop & finalizing checkout. Check back shortly or follow @seandidmywrist on Instagram!
            </p>

            {/* Comic Speech Bubble Triangle Tail pointing down to Ghost */}
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '12px solid #000'
              }}
            />
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '10px solid #ffffff'
              }}
            />
          </motion.div>

          {/* Animated Ghost Mascot */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <GhostMascot size={110} interactive={false} showLabel={false} />
          </motion.div>
        </div>

        {/* Password / Pin Unlock Box */}
        <div className="w-full bg-white border-4 border-black p-4 sm:p-5 shadow-[8px_8px_0px_#000]">
          <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase text-black mb-2">
            <KeyRound size={15} />
            <span>ENTER PASSCODE TO UNLOCK</span>
          </div>

          {/* PIN Indicators */}
          <div className="flex items-center justify-center gap-3 mb-3">
            {[0, 1, 2, 3].map((idx) => {
              const isFilled = pin.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-10 h-11 border-3 border-black flex items-center justify-center font-mono font-black text-xl transition-all ${
                    isFilled
                      ? 'bg-black text-yellow-300 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]'
                      : 'bg-yellow-100 text-transparent'
                  }`}
                >
                  {isFilled ? '●' : ''}
                </div>
              );
            })}
          </div>

          {/* Direct Input Fallback (for mobile paste or keyboard typing) */}
          <form onSubmit={handleFormSubmit} className="mb-3">
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                setPin(val);
                if (val.length === 4) {
                  handleAttemptUnlock(val);
                }
              }}
              placeholder="Or type passcode"
              className="w-full text-center border-2 border-black p-1.5 text-xs font-mono font-bold tracking-widest bg-yellow-50 focus:outline-none"
            />
          </form>

          {/* Status Message */}
          {error && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-red-600 text-white text-xs font-black p-2 border-2 border-black mb-3 flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000]"
            >
              <AlertCircle size={14} />
              <span>INCORRECT PASSCODE. PLEASE TRY AGAIN.</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-green-600 text-white text-xs font-black p-2 border-2 border-black mb-3 flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000]"
            >
              <Sparkles size={14} className="animate-spin" />
              <span>PASSCODE ACCEPTED! UNLOCKING SITE...</span>
            </motion.div>
          )}

          {/* Mobile-Friendly Number Pad */}
          <div className="grid grid-cols-3 gap-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleKeyClick(digit)}
                className="bg-gray-50 hover:bg-yellow-300 border-2 border-black py-2.5 font-mono font-black text-lg text-black transition-colors cursor-pointer active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0px_#000]"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-100 hover:bg-red-200 border-2 border-black py-2.5 text-xs font-black text-black transition-colors cursor-pointer active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0px_#000]"
            >
              DEL
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('0')}
              className="bg-gray-50 hover:bg-yellow-300 border-2 border-black py-2.5 font-mono font-black text-lg text-black transition-colors cursor-pointer active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0px_#000]"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => handleAttemptUnlock(pin)}
              className="bg-black hover:bg-yellow-400 hover:text-black text-white border-2 border-black py-2.5 text-xs font-black transition-colors cursor-pointer active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0px_#000]"
            >
              ENTER
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-[11px] font-bold text-black mt-3">
          🔒 Private preview access reserved for Sean / Administrator.
        </p>
      </div>
    </div>
  );
};
