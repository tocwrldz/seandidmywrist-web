import React from 'react';
import { ShieldCheck, Award, Wrench, MapPin, CheckCircle2 } from 'lucide-react';

export const WhyShop: React.FC = () => {
  return (
    <div className="space-y-6 select-none">
      {/* Hero Banner */}
      <div className="ink-panel-lg bg-black text-white p-6 md:p-10 relative overflow-hidden -rotate-1">
        <div className="absolute right-0 top-0 bottom-0 w-48 halftone opacity-15 pointer-events-none" />
        <div className="inline-block bg-yellow-300 text-black comic-font text-sm px-3 py-1 border-2 border-black mb-3 shadow-[3px_3px_0px_#000]">
          THE SEANDIDMYWRIST STANDARD
        </div>
        <h2 className="comic-font text-4xl md:text-7xl text-white tracking-wide leading-none mb-4">
          YOUR WRIST. YOUR STYLE. SEAN DID IT.
        </h2>
        <p className="text-sm md:text-base font-bold text-gray-300 max-w-2xl leading-relaxed">
          I don’t just sell watches; I build art for your wrist. Every GA2100 is hand-assembled using premium parts, authentic Casio G-Shock movements, and precision craftsmanship right here in the Midwest.
        </p>
      </div>

      {/* 2 Main Story Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="ink-panel p-6 bg-white -rotate-1">
          <div className="w-12 h-12 bg-yellow-300 border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000]">
            <Award size={24} className="text-black" />
          </div>
          <h3 className="comic-font text-3xl md:text-4xl text-black mb-3">THE QUALITY</h3>
          <p className="font-bold text-sm text-gray-800 leading-relaxed mb-4">
            Every build begins with an authentic Casio G-Shock movement. Hand-finished details, custom-aligned hands, and durable materials designed to last.
          </p>
          <div className="p-3 border-2 border-dashed border-black bg-gray-50 font-black text-xs space-y-1">
            <p>✅ Authenticity Guaranteed</p>
            <p>✅ Hand-Finished Details</p>
            <p>✅ 1-Year Movement Warranty</p>
          </div>
        </div>

        <div className="ink-panel p-6 bg-yellow-300 rotate-1">
          <div className="w-12 h-12 bg-black text-white border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#fff]">
            <MapPin size={24} className="text-yellow-300" />
          </div>
          <h3 className="comic-font text-3xl md:text-4xl text-black mb-3 underline">MEET SEAN</h3>
          <p className="font-bold text-sm text-black leading-relaxed mb-3">
            Based out of Chicago and Northwest Indiana (NWI), I focus on local public meet-ups so you can inspect the fit, finish, and feel on your wrist before walking away.
          </p>
          <p className="font-black italic text-sm text-black bg-white/70 p-2.5 border-2 border-black">
            "If your wrist doesn’t stand out, I haven’t done my job."
          </p>
        </div>
      </div>

      {/* 2 Detail Cards: Warranty & Handover */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="ink-panel bg-white p-6 relative">
          <div className="w-12 h-12 bg-green-400 border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000]">
            <ShieldCheck size={24} className="text-black" />
          </div>
          <h3 className="comic-font text-3xl text-black mb-2">ALL WATCHES COME WITH A WARRANTY</h3>
          <p className="text-xs md:text-sm font-medium text-gray-700 leading-relaxed">
            Every watch includes our 1-Year Limited Movement Warranty. We stand by the accuracy and hand stability of every build we create.
          </p>
        </div>

        <div className="ink-panel bg-white p-6 relative">
          <div className="w-12 h-12 bg-blue-400 border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000]">
            <Wrench size={24} className="text-black" />
          </div>
          <h3 className="comic-font text-3xl text-black mb-2">LOCAL MEET-UP OR TRACKED SHIPPING</h3>
          <p className="text-xs md:text-sm font-medium text-gray-700 leading-relaxed">
            Choose between free scheduled in-person public handovers across Chicago/NWI or insured, double-boxed USPS Priority shipping with tracking.
          </p>
        </div>
      </div>

      {/* Assurance Checklist */}
      <div className="ink-panel bg-yellow-50 p-6 border-4 border-black">
        <h4 className="comic-font text-2xl text-black underline mb-3">THE LAB STANDARD</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-gray-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <span>Secure $20 deposit locks your piece for 7 business days</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <span>Double-boxed protective comic-themed shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <span>Authentic G-Shock movements with Carbon Core Guard</span>
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
