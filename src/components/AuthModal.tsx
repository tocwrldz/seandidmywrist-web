import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, LogIn, Sparkles, Check, Zap, Phone, Mail, ShieldAlert, Award } from 'lucide-react';
import { UserProfile } from '../hooks/useAuth';
import { GhostMascot } from './GhostMascot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: (name: string, email: string, phone: string, instagram?: string) => UserProfile;
  onSignIn: (identifier: string) => boolean;
  onLoginDemo: (userId: string) => void;
  users: UserProfile[];
  initialTab?: 'signup' | 'login' | 'demo';
  onAccountCreated?: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSignUp,
  onSignIn,
  onLoginDemo,
  users,
  initialTab = 'signup',
  onAccountCreated
}) => {
  const [tab, setTab] = useState<'signup' | 'login' | 'demo'>(initialTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [instagram, setInstagram] = useState('');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Format phone number nicely as user types (e.g. (312) 555-0192)
  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    let formatted = digits;
    if (digits.length > 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length > 3) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else if (digits.length > 0) {
      formatted = `(${digits}`;
    }
    setPhone(formatted);
  };

  const handleQuickGmail = (gmailAddress: string) => {
    setEmail(gmailAddress);
    if (!name) {
      setName(gmailAddress.split('@')[0]);
    }
    setError('');
  };

  const handleSubmitSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name.trim()) {
      setError('Please enter your full name or nickname.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please enter a valid Gmail address.');
      return;
    }

    // Gmail requirement check as requested
    const isGmail = cleanEmail.endsWith('@gmail.com') || cleanEmail.endsWith('@googlemail.com');
    if (!isGmail) {
      setError('Please use a valid GMAIL address (@gmail.com) to register your VIP Loyalty Card.');
      return;
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Please enter a 10-digit mobile phone number (e.g. (312) 555-0192) for SMS punch alerts.');
      return;
    }

    const newUser = onSignUp(name, cleanEmail, phone, instagram);
    setSuccessMsg('🎉 VIP Account Created! 5% Sign-Up Bonus credited to your loyalty card!');

    if (onAccountCreated) {
      onAccountCreated(newUser);
    }

    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!loginIdentifier.trim()) {
      setError('Please enter your registered Gmail or Phone number.');
      return;
    }

    const ok = onSignIn(loginIdentifier);
    if (ok) {
      setSuccessMsg('Welcome back! VIP Loyalty Card loaded.');
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setError('No account found for this Gmail or Phone. Please check or click "SIGN UP".');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xs select-none overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-yellow-300 border-6 border-black shadow-[10px_10px_0px_#000] p-5 sm:p-6 max-h-[94vh] overflow-y-auto my-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Halftone comic background */}
          <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black text-white hover:bg-red-600 p-2 border-2 border-black transition-colors cursor-pointer z-20"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Header with Ghost Logo */}
          <div className="text-center border-b-4 border-black pb-3 mb-4 relative z-10 flex flex-col items-center">
            <div className="mb-1">
              <GhostMascot size={64} interactive={false} showLabel={false} />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-black text-yellow-300 comic-font text-xs px-3 py-1 border-2 border-black -rotate-1 mb-1 shadow-[2px_2px_0px_#000]">
              <Sparkles size={13} className="text-yellow-300 animate-pulse" />
              <span>SEANDIDMYWRIST VIP LOYALTY CARD</span>
            </div>

            <h2 className="comic-font text-3xl sm:text-4xl text-black leading-tight">
              {tab === 'signup' && 'VIP CARD SIGN UP'}
              {tab === 'login' && 'VIP CARD LOGIN'}
              {tab === 'demo' && 'DEMO TEST ACCOUNTS'}
            </h2>

            {/* Instant 5% Welcome Bonus Banner */}
            <div className="mt-2 bg-black text-yellow-300 border-2 border-black px-3 py-1.5 shadow-[3px_3px_0px_#000] flex items-center gap-2 text-xs font-black">
              <Award size={18} className="text-yellow-400 shrink-0 animate-bounce" />
              <span>
                GRANT 5% OFF UPON SIGN-UP • 5 HOLE PUNCHES = 1 FREE WATCH!
              </span>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="grid grid-cols-3 gap-1 bg-black p-1 border-3 border-black mb-4 relative z-10 text-xs font-bold">
            <button
              onClick={() => {
                setTab('signup');
                setError('');
                setSuccessMsg('');
              }}
              className={`py-2 transition-colors cursor-pointer text-center ${
                tab === 'signup'
                  ? 'bg-yellow-300 text-black comic-font tracking-wider shadow-[inset_0_0_0_2px_#000]'
                  : 'text-white hover:text-yellow-200'
              }`}
            >
              ★ SIGN UP (5% OFF)
            </button>
            <button
              onClick={() => {
                setTab('login');
                setError('');
                setSuccessMsg('');
              }}
              className={`py-2 transition-colors cursor-pointer text-center ${
                tab === 'login'
                  ? 'bg-yellow-300 text-black comic-font tracking-wider shadow-[inset_0_0_0_2px_#000]'
                  : 'text-white hover:text-yellow-200'
              }`}
            >
              LOG IN
            </button>
            <button
              onClick={() => {
                setTab('demo');
                setError('');
                setSuccessMsg('');
              }}
              className={`py-2 transition-colors cursor-pointer text-center ${
                tab === 'demo'
                  ? 'bg-yellow-300 text-black comic-font tracking-wider shadow-[inset_0_0_0_2px_#000]'
                  : 'text-white hover:text-yellow-200'
              }`}
            >
              DEMO ⚡
            </button>
          </div>

          {/* Alerts / Feedback */}
          {error && (
            <div className="bg-red-600 text-white text-xs font-black p-2.5 border-3 border-black mb-3 shadow-[2px_2px_0px_#000] flex items-center gap-2">
              <ShieldAlert size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-green-600 text-white text-xs font-black p-2.5 border-3 border-black mb-3 shadow-[2px_2px_0px_#000] flex items-center gap-2">
              <Check size={16} className="shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: SIGN UP WITH PHONE & GMAIL */}
          {tab === 'signup' && (
            <form onSubmit={handleSubmitSignUp} className="space-y-3 relative z-10">
              {/* Quick Gmail One-Tap Helper */}
              <div className="bg-white border-2 border-black p-2 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600 text-xs">
                    G
                  </div>
                  <span className="text-[11px] font-bold text-gray-800">
                    Signing up with Gmail enables 1-tap Google sync & instant 5% off
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickGmail('jrstarkey428@gmail.com')}
                  className="shrink-0 bg-black text-yellow-300 hover:bg-yellow-400 hover:text-black border border-black text-[10px] font-black px-2 py-1 transition-colors cursor-pointer"
                >
                  USE GOOGLE ACCOUNT
                </button>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-0.5">
                  Full Name / Nickname <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. JR Starkey / WristCollector"
                  className="w-full bg-white border-3 border-black p-2 text-sm font-bold focus:outline-none focus:bg-yellow-50"
                />
              </div>

              {/* Gmail Address */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-0.5 flex items-center justify-between">
                  <span>GMAIL ADDRESS <span className="text-red-600">*</span></span>
                  <span className="text-[10px] text-gray-700 font-bold lowercase">must end in @gmail.com</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full bg-white border-3 border-black pl-8 pr-2 py-2 text-sm font-bold focus:outline-none focus:bg-yellow-50"
                  />
                </div>
              </div>

              {/* Mobile Phone Number */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-0.5 flex items-center justify-between">
                  <span>MOBILE PHONE NUMBER <span className="text-red-600">*</span></span>
                  <span className="text-[10px] text-gray-700 font-bold">For SMS punch alerts</span>
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="(312) 555-0192"
                    className="w-full bg-white border-3 border-black pl-8 pr-2 py-2 text-sm font-bold font-mono focus:outline-none focus:bg-yellow-50"
                  />
                </div>
              </div>

              {/* Password / VIP PIN */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-0.5">
                  Card PIN / Password <span className="text-red-600">*</span>
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

              {/* Instagram (Optional) */}
              <div>
                <label className="block text-xs font-black uppercase text-black mb-0.5">
                  Instagram Handle <span className="text-gray-600 text-[10px] font-normal">(Optional for Chicago meetups)</span>
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full bg-white border-3 border-black p-2 text-sm font-bold focus:outline-none focus:bg-yellow-50"
                />
              </div>

              {/* ANTI-STACKING POLICY CALLOUT BOX */}
              <div className="bg-white border-3 border-black p-3 shadow-[3px_3px_0px_#000] text-[11px] font-bold text-black space-y-1">
                <div className="flex items-center gap-1.5 text-red-600 font-black uppercase tracking-wider text-xs">
                  <ShieldAlert size={15} />
                  <span>STRICT NO-STACKING POLICY</span>
                </div>
                <p className="leading-tight text-gray-800">
                  Signing up grants <strong>5% OFF</strong> your order. Deals and coupon codes do <em>not stack</em> (e.g. 5% signup discount cannot combine with ONESTOPSHOP 10% code or double-up on 5% volume deals). The single highest discount will always apply automatically!
                </p>
              </div>

              <button
                type="submit"
                className="ink-btn w-full bg-black hover:bg-white hover:text-black text-white text-base py-3 flex items-center justify-center gap-2 cursor-pointer transition-colors mt-3"
              >
                <UserPlus size={18} />
                <span className="comic-font text-lg tracking-wider">CREATE VIP CARD & CLAIM 5% OFF</span>
              </button>
            </form>
          )}

          {/* TAB 2: LOG IN WITH GMAIL OR PHONE */}
          {tab === 'login' && (
            <form onSubmit={handleSubmitLogin} className="space-y-3.5 relative z-10">
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Gmail Address or Mobile Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="yourname@gmail.com or (312) 555-0192"
                  className="w-full bg-white border-3 border-black p-2.5 text-sm font-bold focus:outline-none focus:bg-yellow-50"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Password / VIP PIN
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-3 border-black p-2.5 text-sm font-bold focus:outline-none focus:bg-yellow-50"
                />
              </div>

              <button
                type="submit"
                className="ink-btn w-full bg-black hover:bg-white hover:text-black text-white text-base py-3 flex items-center justify-center gap-2 cursor-pointer transition-colors mt-2"
              >
                <LogIn size={18} />
                <span className="comic-font text-lg tracking-wider">LOG IN TO VIP LOYALTY CARD</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setTab('signup')}
                  className="text-xs font-black text-black underline hover:text-red-600 cursor-pointer"
                >
                  Need a loyalty card? Click here to Sign Up and get 5% OFF!
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: 1-CLICK DEMO TEST ACCOUNTS */}
          {tab === 'demo' && (
            <div className="space-y-2.5 relative z-10">
              <p className="text-xs font-bold text-black mb-2">
                Click any preloaded account to instantly test loyalty tracking, punches, and the 5% discount:
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
                    <div className="text-[11px] font-bold text-gray-700">
                      Gmail: {u.email}
                    </div>
                    <div className="text-[10px] font-mono text-gray-500">
                      Phone: {u.phone}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-black text-yellow-300 comic-font text-xs px-2 py-0.5 border border-black inline-block">
                      {u.loyaltyPunches}/5 PUNCHES
                    </span>
                    <div className="text-[10px] text-green-700 font-black mt-0.5">
                      5% BONUS ACTIVE
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* VIP Loyalty Card Perks */}
          <div className="mt-4 pt-3 border-t-2 border-black/40 text-[11px] font-bold text-black space-y-1 relative z-10">
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-black font-black" />
              <span>Instant 5% discount credited upon signing up</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-black font-black" />
              <span>Automatic 1 hole punch for every custom watch bought</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={14} className="text-black font-black" />
              <span>5 punches = 1 FREE Custom GA2100 CasiOak watch</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
