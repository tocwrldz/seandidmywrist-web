import React from 'react';
import { MEETUP_LOCATIONS } from '../../data/policies';
import { MapPin, ShieldCheck, Calendar, Clock, Navigation } from 'lucide-react';

export const Meetups: React.FC = () => {
  return (
    <div className="space-y-8 select-none">
      {/* Title */}
      <div className="ink-panel bg-yellow-300 p-6 md:p-8 border-4 border-black">
        <span className="bg-black text-white comic-font text-xs md:text-sm px-2.5 py-0.5 border border-black shadow-[2px_2px_0px_#fff]">
          COMMUNITY HANDOVER
        </span>
        <h2 className="comic-font text-4xl md:text-6xl text-black mt-2">
          CHICAGO & NWI MEET-UPS
        </h2>
        <p className="text-xs md:text-sm font-bold text-black mt-1 max-w-xl">
          We prioritize local community connections. Meet Sean in person at high-visibility, verified public locations across Chicagoland and Northwest Indiana.
        </p>
      </div>

      {/* Safety & Protocol Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="ink-panel-sm bg-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center shrink-0 border-2 border-black">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="comic-font text-lg text-black">PUBLIC SPACES ONLY</h4>
            <p className="text-[11px] font-medium text-gray-600">Safe, monitored daytime plazas and hubs.</p>
          </div>
        </div>

        <div className="ink-panel-sm bg-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 text-black flex items-center justify-center shrink-0 border-2 border-black">
            <Calendar size={20} />
          </div>
          <div>
            <h4 className="comic-font text-lg text-black">APPOINTMENT REQUIRED</h4>
            <p className="text-[11px] font-medium text-gray-600">Scheduled via order checkout or Instagram DM.</p>
          </div>
        </div>

        <div className="ink-panel-sm bg-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-400 text-black flex items-center justify-center shrink-0 border-2 border-black">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="comic-font text-lg text-black">TRY BEFORE YOU LEAVE</h4>
            <p className="text-[11px] font-medium text-gray-600">Inspect custom fit, strap length & finish.</p>
          </div>
        </div>
      </div>

      {/* CHICAGO MEET-UP REGIONS */}
      <div className="ink-panel bg-white p-6 space-y-4">
        <div className="flex items-center gap-2 border-b-3 border-black pb-3">
          <Navigation size={22} className="text-red-600" />
          <h3 className="comic-font text-3xl text-black">CHICAGO PUBLIC MEET-UP AREAS</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MEETUP_LOCATIONS.chicago.map((loc, idx) => (
            <div key={idx} className="bg-gray-50 border-3 border-black p-4 space-y-1">
              <div className="flex items-baseline justify-between">
                <h4 className="comic-font text-xl text-black">{loc.name}</h4>
                <span className="text-[10px] font-black bg-yellow-300 px-2 py-0.5 border border-black">
                  CHICAGO
                </span>
              </div>
              <p className="text-xs font-bold text-gray-500 flex items-center gap-1">
                <MapPin size={12} /> {loc.area}
              </p>
              <p className="text-xs font-medium text-gray-700 pt-1">{loc.notes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NORTHWEST INDIANA (NWI) MEET-UP REGIONS */}
      <div className="ink-panel bg-white p-6 space-y-4">
        <div className="flex items-center gap-2 border-b-3 border-black pb-3">
          <Navigation size={22} className="text-blue-600" />
          <h3 className="comic-font text-3xl text-black">NORTHWEST INDIANA (NWI) AREAS</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MEETUP_LOCATIONS.nwi.map((loc, idx) => (
            <div key={idx} className="bg-gray-50 border-3 border-black p-4 space-y-1">
              <div className="flex items-baseline justify-between">
                <h4 className="comic-font text-xl text-black">{loc.name}</h4>
                <span className="text-[10px] font-black bg-blue-200 px-2 py-0.5 border border-black">
                  NWI REGION
                </span>
              </div>
              <p className="text-xs font-bold text-gray-500 flex items-center gap-1">
                <MapPin size={12} /> {loc.area}
              </p>
              <p className="text-xs font-medium text-gray-700 pt-1">{loc.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
