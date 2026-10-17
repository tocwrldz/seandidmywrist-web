import React from 'react';
import { ShieldCheck, Award, Wrench, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const WhyShop: React.FC = () => {
  return (
    <div className="space-y-6 select-none">
      {/* Hero Banner */}
      <div className="ink-panel-lg bg-black text-white p-6 md:p-10 relative overflow-hidden -rotate-1">
        <div className="absolute right-0 top-0 bottom-0 w-48 halftone opacity-15 pointer-events-none" />
        <div className="inline-block bg-yellow-300 text-black comic-font text-sm px-3 py-1 border-2 border-black mb-3 shadow-[3px_3px_0px_#000]">
          THE SEANDIDMYWRIST ETHOS
        </div>
        <h2 className="comic-font text-4xl md:text-7xl text-white tracking-wide leading-none mb-4">
          YOUR WRIST. YOUR STYLE. SEAN DID IT.
        </h2>
        <p className="text-sm md:text-base font-bold text-gray-300 max-w-2xl leading-relaxed">
          Mass-market factory watches look identical on everyone’s wrist. Sean builds one-of-a-kind custom CasiOak timepieces that combine Japanese G-Shock durability with bold Midwest streetwear culture.
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="ink-panel bg-white p-6 relative">
          <div className="w-12 h-12 bg-yellow-300 border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000]">
            <Award size={24} className="text-black" />
          </div>
          <h3 className="comic-font text-3xl text-black mb-2">100% GENUINE CASIO MOVEMENTS</h3>
          <p className="text-xs md:text-sm font-medium text-gray-700 leading-relaxed">
            Every build begins with an authentic Casio G-Shock GA2100 foundation featuring genuine Carbon Core Guard architecture, dual LED illumination, and 200M factory water resistance. No counterfeit movements. Ever.
          </p>
        </div>

        <div className="ink-panel bg-white p-6 relative">
          <div className="w-12 h-12 bg-red-500 border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000]">
            <Wrench size={24} className="text-white" />
          </div>
          <h3 className="comic-font text-3xl text-black mb-2">HAND-ASSEMBLED IN THE LAB</h3>
          <p className="text-xs md:text-sm font-medium text-gray-700 leading-relaxed">
            From precision dial index painting to AP stainless steel case conversions, each piece is painstakingly disassembled, customized, hand-aligned, and re-sealed under dust-free conditions in Chicago.
          </p>
        </div>

        <div className="ink-panel bg-white p-6 relative">
          <div className="w-12 h-12 bg-green-400 border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000]">
            <ShieldCheck size={24} className="text-black" />
          </div>
          <h3 className="comic-font text-3xl text-black mb-2">ALL WATCHES COME WITH A WARRANTY</h3>
          <p className="text-xs md:text-sm font-medium text-gray-700 leading-relaxed">
            We stand behind every build. Each watch is protected by our 1-Year Limited Movement Warranty. If the hands or quartz movement ever fail under normal wear, Sean personally repairs or tunes it.
          </p>
        </div>

        <div className="ink-panel bg-white p-6 relative">
          <div className="w-12 h-12 bg-blue-400 border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000]">
            <MapPin size={24} className="text-black" />
          </div>
          <h3 className="comic-font text-3xl text-black mb-2">IN-PERSON LOCAL MEET-UPS</h3>
          <p className="text-xs md:text-sm font-medium text-gray-700 leading-relaxed">
            Rather than waiting on shipping, local customers across Chicago and Northwest Indiana (NWI) can choose a public meet-up. Inspect the fit, finish, and wrist presence before finalizing.
          </p>
        </div>
      </div>

      {/* Assurance Checklist */}
      <div className="ink-panel bg-yellow-50 p-6 border-4 border-black">
        <h4 className="comic-font text-2xl text-black underline mb-3">THE LAB STANDARD</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-gray-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <span>Secure $20 deposit locks item for 7 business days</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <span>Insured & double-boxed USPS Priority shipping with tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <span>Custom AP link adjustment tool included with AP mods</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <span>Direct Instagram DM support with Sean (@seandidmywrist)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
