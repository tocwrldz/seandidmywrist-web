import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, LogIn, Sparkles, Check, ShieldCheck, Zap } from 'lucide-react';
import { UserProfile } from '../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: (name: string, email: string, instagram?: string) => UserProfile;
  onSignIn: (email: string) => boolean;
  onLoginDemo: (userId: string) => void;
  users: UserProfile[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSignUp,
  onSignIn,
  onLoginDemo,
  users
}) => {
  const [tab, setTab] = useState<'login' | 'signup' | 'demo'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instagram, setInstagram] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (tab === 'signup') {
      if (!name.trim()) {
        setError('Please enter your name.');
        return;
      }
      onSignUp(name, email, instagram);
      onClose();
    } else {
      onSignIn(email);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-yellow-300 border-6 border-black shadow-[10px_10px_0px_#000] p-6 max-h-[92vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Halftone texture */}
          <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black text-white hover:bg-red-600 p-2 border-2 border-black transition-colors cursor-pointer z-20"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="text-center border-b-4 border-black pb-3 mb-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-black text-yellow-300 comic-font text-xs px-3 py-0.5 border border-black mb-1.5">
              <Sparkles size={13} className="text-yellow-300 animate-pulse" />
              <span>SEANDIDMYWRIST VIP CLUB</span>
            </div>
            <h2 className="comic-font text-3xl text-black leading-tight">
              {tab === 'login' && 'VIP LOGIN'}
              {tab === 'signup' && 'JOIN VIP CLUB'}
              {tab === 'demo' && 'QUICK TEST ACCOUNTS'}
            </h2>
            <p className="text-xs font-bold text-black mt-0.5">
              Keep track of loyalty points & auto-punch with every watch purchase!
            </p>
          </div>

          {/* Tab Selection */}
          <div className="grid grid-cols-3 gap-1 bg-black p-1 border-3 border-black mb-4 relative z-10 text-xs font-bold">
            <button
              onClick={() => {
                setTab('login');
                setError('');
              }}
              className={`py-1.5 transition-colors cursor-pointer ${
                tab === 'login' ? 'bg-yellow-300 text-black comic-font' : 'text-white hover:text-yellow-200'
              }`}
            >
              LOG IN
            </button>
            <button
              onClick={() => {
                setTab('signup');
                setError('');
              }}
              className={`py-1.5 transition-colors cursor-pointer ${
                tab === 'signup' ? 'bg-yellow-300 text-black comic-font' : 'text-white hover:text-yellow-200'
              }`}
            >
              CREATE
            </button>
            <button
              onClick={() => {
                setTab('demo');
                setError('');
              }}
              className={`py-1.5 transition-colors cursor-pointer ${
                tab === 'demo' ? 'bg-yellow-300 text-black comic-font' : 'text-white hover:text-yellow-200'
              }`}
            >
              DEMO ⚡
            </button>
          </div>

          {/* TAB 1 & 2: LOGIN / SIGNUP FORM */}
          {tab !== 'demo' ? (
            <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10">
              {error && (
                <div className="bg-red-600 text-white text-xs font-bold p-2 border-2 border-black">
                  {error}
                </div>
              )}

              {tab === 'signup' && (
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    Your Name / Nickname
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sean Collector"
                    className="w-full bg-white border-3 border-black p-2 text-sm font-bold focus:outline-none focus:bg-yellow-50"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white border-3 border-black p-2 text-sm font-bold focus:outline-none focus:bg-yellow-50"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-3 border-black p-2 text-sm font-bold focus:outline-none focus:bg-yellow-50"
                />
              </div>

              {tab === 'signup' && (
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1">
                    Instagram Handle (Optional)
                  </label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@yourhandle"
                    className="w-full bg-white border-3 border-black p-2 text-sm font-bold focus:outline-none focus:bg-yellow-50"
                  />
                </div>
              )}

              <button
                type="submit"
                className="ink-btn w-full bg-black hover:bg-white hover:text-black text-white text-base py-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors mt-2"
              >
                {tab === 'signup' ? <UserPlus size={18} /> : <LogIn size={18} />}
                <span>{tab === 'signup' ? 'CREATE VIP ACCOUNT & START' : 'LOG IN TO VIP ACCOUNT'}</span>
              </button>
            </form>
          ) : (
            /* TAB 3: QUICK 1-CLICK DEMO TEST ACCOUNTS */
            <div className="space-y-2.5 relative z-10">
              <p className="text-xs font-bold text-black mb-2">
                Click any profile to instantly test account tracking and hole punch progression:
              </p>
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    onLoginDemo(u.id);
                    onClose();
                  }}
                  className="w-full bg-white hover:bg-yellow-100 border-3 border-black p-2.5 text-left flex items-center justify-between cursor-pointer shadow-[3px_3px_0px_#000] transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <div>
                    <div className="font-black text-sm text-black flex items-center gap-1.5">
                      <Zap size={14} className="text-yellow-600 fill-yellow-600" />
                      <span>{u.name}</span>
                    </div>
                    <div className="text-[11px] font-bold text-gray-600">{u.email}</div>
                  </div>
                  <div className="text-right">
                    <span className="bg-black text-yellow-300 comic-font text-xs px-2 py-0.5 border border-black inline-block">
                      {u.loyaltyPunches}/10 PUNCHES
                    </span>
                    <div className="text-[10px] text-gray-500 font-bold mt-0.5">
                      {u.totalWatchesPurchased} watches bought
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Perks list */}
          <div className="mt-4 pt-3 border-t-2 border-black/40 text-[11px] font-bold text-black space-y-1 relative z-10">
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-black font-black" />
              <span>Automatic 1 hole punch for every custom watch bought</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-black font-black" />
              <span>Magic Ghost of SeanDidMyWrist poof & punching animation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-black font-black" />
              <span>10 punches = 1 FREE Custom GA2100 CasiOak</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
