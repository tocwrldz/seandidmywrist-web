import React from 'react';
import { GhostMascot } from './GhostMascot';
import { Instagram, ShieldCheck, MapPin, Lock, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigateToPage: (pageIndex: number) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToPage, onOpenAdmin }) => {
  return (
    <footer className="bg-white border-t-8 border-black p-8 md:p-12 mt-16 relative overflow-hidden select-none">
      {/* Background Halftone Depth */}
      <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {/* Brand & Static Ghost Mascot */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          {/* STATIC VERSION: Visual match, completely motionless as requested in Phase 3 */}
          <GhostMascot size={110} interactive={false} />
          <h3 className="comic-font text-3xl text-black mt-2">SEANDIDMYWRIST</h3>
          <p className="comic-font text-base text-gray-700 italic">
            "YOUR WRIST. YOUR STYLE. SEAN DID IT."
          </p>
          <p className="text-[11px] font-bold text-gray-500 mt-2">
            Independent custom G-Shock laboratory based in Chicago & Northwest Indiana.
          </p>
        </div>

        {/* Comic Index Navigation Links */}
        <div>
          <h4 className="comic-font text-2xl text-black mb-4 bg-yellow-300 inline-block px-2 border-2 border-black shadow-[2px_2px_0px_#000]">
            TABLE OF CONTENTS
          </h4>
          <ul className="space-y-2 text-xs font-bold text-gray-800">
            <li>
              <button
                onClick={() => onNavigateToPage(0)}
                className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left"
              >
                CH 1: GA2100 Showcase ($85)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateToPage(1)}
                className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left"
              >
                CH 1: Custom Collection ($100)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateToPage(2)}
                className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left"
              >
                CH 1: AP Band Collection ($110)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateToPage(3)}
                className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left"
              >
                CH 1: The Sold Archives Vault
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateToPage(4)}
                className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left"
              >
                CH 2: Sweatsuits & Cloths
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateToPage(5)}
                className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left"
              >
                CH 2: Socks & Beanies
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care & Policies (Chapter 3: Info) */}
        <div>
          <h4 className="comic-font text-2xl text-black mb-4 bg-yellow-300 inline-block px-2 border-2 border-black shadow-[2px_2px_0px_#000]">
            CHAPTER 3: INFO
          </h4>
          <ul className="space-y-2 text-xs font-bold text-gray-800">
            <li>
              <button
                onClick={() => onNavigateToPage(6)}
                className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left"
              >
                • Why Shop With Sean
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateToPage(7)}
                className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left"
              >
                • $20 Deposit & Sunday Cutoff
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateToPage(8)}
                className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left"
              >
                • Chicago Meet-Ups
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateToPage(9)}
                className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left"
              >
                • Northwest Indiana Meet-Ups
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateToPage(10)}
                className="hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer text-left"
              >
                • Contact & Workshop Support
              </button>
            </li>
          </ul>

          <div className="mt-4 p-2 bg-yellow-50 border-2 border-black text-[11px] font-bold text-gray-800 flex items-center gap-2">
            <ShieldCheck size={16} className="text-black shrink-0" />
            <span>All watches come with a warranty.</span>
          </div>
        </div>

        {/* Instagram Verification Card */}
        <div className="flex flex-col items-center justify-center">
          <a
            href="https://www.instagram.com/seandidmywrist/"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-panel p-6 flex flex-col items-center gap-3 bg-white hover:bg-yellow-300 transition-colors group cursor-pointer text-center w-full"
          >
            <div className="w-14 h-14 bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-xl flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#000] group-hover:scale-105 transition-transform">
              <Instagram size={30} />
            </div>
            <div>
              <span className="comic-font text-2xl text-black block">@SEANDIDMYWRIST</span>
              <span className="text-[10px] font-black uppercase text-gray-600 tracking-wider flex items-center justify-center gap-1">
                Official Verified Page <ExternalLink size={10} />
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-4 border-black mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-700">
        <p>© 2026 SEANDIDMYWRIST. Hand-finished in Chicago & Northwest Indiana. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[11px] font-black uppercase">
            <MapPin size={14} /> Chicago • NWI Local
          </span>

          {/* Discreet Admin Lock Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 text-[11px] font-black text-gray-500 hover:text-black transition-colors cursor-pointer"
            title="Lab Control Center"
            aria-label="Admin Access"
          >
            <Lock size={12} />
            <span>LAB ADMIN</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
