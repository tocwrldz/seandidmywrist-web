import React from 'react';
import { DEPOSIT_POLICY, WARRANTY_POLICY } from '../../data/policies';
import { checkDepositEligibility } from '../../lib/businessRules';
import { Clock, ShieldCheck, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const eligibility = checkDepositEligibility();

  return (
    <div className="space-y-8 select-none">
      {/* Page Title */}
      <div className="ink-panel bg-white p-6 border-4 border-black">
        <span className="bg-yellow-300 comic-font text-xs md:text-sm px-2.5 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
          OFFICIAL POLICIES & TERMS
        </span>
        <h2 className="comic-font text-4xl md:text-6xl text-black mt-2">
          DEPOSITS & WARRANTY
        </h2>
        <p className="text-xs md:text-sm font-bold text-gray-700 mt-1">
          Transparent guidelines protecting both our customers and our independent watchmaking workshop.
        </p>
      </div>

      {/* DEPOSIT POLICY SECTION */}
      <div className="ink-panel bg-white p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-3 border-black pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-400 border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
              <Clock size={26} className="text-black" />
            </div>
            <div>
              <h3 className="comic-font text-3xl md:text-4xl text-black">DEPOSIT & RESERVATION POLICY</h3>
              <p className="text-xs font-black uppercase text-gray-500">Hold your watch with confidence</p>
            </div>
          </div>

          {/* Current Sunday Cutoff Status Widget */}
          <div className={`p-3 border-2 border-black flex items-center gap-2 text-xs font-bold ${
            eligibility.allowed ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'
          }`}>
            {eligibility.allowed ? (
              <>
                <CheckCircle size={16} className="text-green-700 shrink-0" />
                <span>Deposits OPEN ({eligibility.centralTimeString})</span>
              </>
            ) : (
              <>
                <AlertTriangle size={16} className="text-red-700 shrink-0" />
                <span>Sunday Cutoff Active (Re-opens Mon 9:00 AM CT)</span>
              </>
            )}
          </div>
        </div>

        {/* 4 Deposit Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 border-3 border-black p-4">
            <span className="comic-font text-3xl text-black">${DEPOSIT_POLICY.minimumDeposit}.00</span>
            <p className="text-xs font-black uppercase text-gray-500 mt-1">Minimum Deposit</p>
            <p className="text-xs text-gray-700 mt-2 font-medium">
              A flat $20 non-fluctuating deposit guarantees reservation on any eligible GA2100 CasiOak.
            </p>
          </div>

          <div className="bg-gray-50 border-3 border-black p-4">
            <span className="comic-font text-3xl text-black">
              {DEPOSIT_POLICY.reservationDurationBusinessDays} BUSINESS DAYS
            </span>
            <p className="text-xs font-black uppercase text-gray-500 mt-1">Exclusive Hold Window</p>
            <p className="text-xs text-gray-700 mt-2 font-medium">
              The watch is locked exclusively in the inventory ledger. No other customer can purchase it during this window.
            </p>
          </div>

          <div className="bg-gray-50 border-3 border-black p-4">
            <span className="comic-font text-3xl text-black">
              {DEPOSIT_POLICY.cancellationRefundPercentage}% REFUND
            </span>
            <p className="text-xs font-black uppercase text-gray-500 mt-1">Cancellation / Expiration</p>
            <p className="text-xs text-gray-700 mt-2 font-medium">
              If canceled or expired, 50% of the deposit is refunded, and the piece returns to the public shop catalog.
            </p>
          </div>
        </div>

        {/* Bullet Notes */}
        <div className="bg-yellow-50 border-3 border-black p-4 space-y-2">
          <h4 className="comic-font text-xl text-black">KEY DEPOSIT RULES</h4>
          <ul className="space-y-1.5 text-xs font-bold text-gray-800 list-disc list-inside">
            {DEPOSIT_POLICY.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* WARRANTY SECTION */}
      <div className="ink-panel bg-white p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b-3 border-black pb-4">
          <div className="w-12 h-12 bg-green-400 border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
            <ShieldCheck size={26} className="text-black" />
          </div>
          <div>
            <h3 className="comic-font text-3xl md:text-4xl text-black">{WARRANTY_POLICY.title}</h3>
            <p className="text-xs font-black uppercase text-gray-500">{WARRANTY_POLICY.duration}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-3 border-black p-5 bg-green-50/50">
            <h4 className="comic-font text-2xl text-green-900 mb-3 flex items-center gap-2">
              <CheckCircle size={18} /> WHAT IS COVERED
            </h4>
            <ul className="space-y-2 text-xs font-bold text-gray-800">
              {WARRANTY_POLICY.coverage.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-3 border-black p-5 bg-red-50/50">
            <h4 className="comic-font text-2xl text-red-900 mb-3 flex items-center gap-2">
              <AlertTriangle size={18} /> WHAT IS EXCLUDED
            </h4>
            <ul className="space-y-2 text-xs font-bold text-gray-800">
              {WARRANTY_POLICY.exclusions.map((e, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-700 font-bold">•</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 border-2 border-black p-4 text-xs font-bold text-gray-800 flex items-center gap-3">
          <HelpCircle size={20} className="text-black shrink-0" />
          <span>{WARRANTY_POLICY.supportInstructions}</span>
        </div>
      </div>
    </div>
  );
};
