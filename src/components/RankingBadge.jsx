import React from "react";
import { Phone, Globe } from "lucide-react";

export function MergedBadgeOverlay() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[43%] bg-gradient-to-t from-purple-950/90 via-purple-950/75 to-transparent z-20 flex flex-col justify-end p-3 pb-5 sm:p-4 sm:pb-6 md:p-5 md:pb-7 lg:p-6 lg:pb-8 select-none">

      {/* Top Row: Rankings & NIRF */}
      <div className="flex items-center justify-between w-full px-2 sm:px-4 mb-2.5 sm:mb-4">
        {/* Left: No.1 Ranked in Bihar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex flex-col items-end leading-none">
            <span className="text-[7px] sm:text-[8px] font-black text-white/40 uppercase">Ranked</span>
            <span className="text-[9px] sm:text-[11px] font-black text-amber-400 uppercase tracking-wider">No. 1</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col text-[7px] sm:text-[8px] font-black text-white/90 leading-tight">
            <span className="text-purple-300">Outlook</span>
            <span className="text-red-400">INDIA TODAY</span>
            <span className="text-slate-300">THE WEEK</span>
          </div>
        </div>

        {/* Right: NIRF Ranked */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex flex-col text-[7px] sm:text-[8px] font-black text-white/90 leading-tight text-right">
            <span className="text-amber-400">NIRF</span>
            <span className="text-slate-300">RANKED</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-950/80 flex items-center justify-center border border-white/10">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 L85 35 L50 55 L15 35 Z" />
              <path d="M25 45 L25 70 C25 80, 75 80, 75 70 L75 45" stroke="currentColor" strokeWidth="6" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Row: Contact Info (Centered, offset to leave space for dots below) */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 w-full bg-white/5 border border-white/10 rounded-full py-1 px-3 mb-6 sm:mb-8">
        <a href="tel:9955330733" className="flex items-center gap-1 hover:text-amber-300 text-white/90 transition-colors">
          <Phone size={10} className="text-amber-400 fill-amber-400/20" />
          <span className="font-bold text-[7.5px] sm:text-[9px] tracking-wide">9955330733</span>
        </a>
        <div className="h-2.5 w-px bg-white/10" />
        <a href="https://sarvadnyavidyapeeth.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-amber-300 text-white/90 transition-colors">
          <Globe size={10} className="text-amber-400" />
          <span className="font-bold text-[7.5px] sm:text-[9px] tracking-wide">sarvadnyavidyapeeth.in</span>
        </a>
      </div>
    </div>
  );
}
