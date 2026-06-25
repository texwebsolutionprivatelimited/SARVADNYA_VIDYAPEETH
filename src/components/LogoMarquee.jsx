import React from "react";
import { motion } from "framer-motion";

// High-fidelity inline SVG logo components styled as premium rounded-full capsules
const CiscoLogo = () => (
  <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-purple-100 shadow-[0_4px_12px_rgba(126,34,206,0.03)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-cyan-50/70 border border-cyan-100 flex items-center justify-center flex-shrink-0">
      <svg className="h-4.5 w-7 text-cyan-600" viewBox="0 0 100 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Cisco sound wave bars */}
        <rect x="10" y="25" width="4" height="10" rx="2" />
        <rect x="20" y="20" width="4" height="20" rx="2" />
        <rect x="30" y="15" width="4" height="30" rx="2" />
        <rect x="40" y="10" width="4" height="40" rx="2" />
        <rect x="50" y="10" width="4" height="40" rx="2" />
        <rect x="60" y="15" width="4" height="30" rx="2" />
        <rect x="70" y="20" width="4" height="20" rx="2" />
        <rect x="80" y="25" width="4" height="10" rx="2" />
      </svg>
    </div>
    <div className="flex flex-col text-left pr-1.5">
      <span className="text-slate-800 font-extrabold text-[11px] leading-none tracking-wider font-heading">CISCO</span>
      <span className="text-slate-500 text-[6.5px] font-bold uppercase tracking-widest leading-none mt-0.5">Networking Academy</span>
    </div>
  </div>
);

const AWSLogo = () => (
  <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-purple-100 shadow-[0_4px_12px_rgba(126,34,206,0.03)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-orange-50/70 border border-orange-100/50 flex items-center justify-center flex-shrink-0">
      <svg className="h-3.5 w-7 text-slate-800" viewBox="0 0 100 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* aws text and smile */}
        <path d="M12.5 10c-3.1 0-5.6 2.5-5.6 5.6 0 1.9 1 3.6 2.5 4.5l-2.4 2.8c-2.3-1.6-3.7-4.3-3.7-7.3 0-5.1 4.1-9.2 9.2-9.2 3.8 0 7.1 2.3 8.4 5.6l-3.5 1.5c-.8-2.1-2.9-3.5-5.2-3.5zM32.5 6.4l4.2 16.1h-3.8l-1.1-4.7H26l-1.1 4.7H21l4.2-16.1h7.3zm-7.6 8.3l1.8-8.3h.2l1.8 8.3h-3.8zM49.2 14.5c-1.3-1-2.9-1.5-4.7-1.5-3.3 0-6 2.7-6 6s2.7 6 6 6c1.8 0 3.4-.5 4.7-1.5v2c0 2-1.7 3.6-3.7 3.6-1.5 0-2.8-.9-3.3-2.3l-3.5 1c1.1 3.2 4.1 5.3 7.8 5.3 4.2 0 7.7-3.1 7.7-7.3V12.8h-5v1.7zm-4.7 6c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
        <path d="M5.5 30c25 10 55 10 80 0-4-3-8-4-12-4-22 8-48 8-68 4z" fill="#FF9900" />
      </svg>
    </div>
    <div className="flex flex-col text-left pr-1.5">
      <span className="text-slate-800 font-extrabold text-[11px] leading-none tracking-wide font-heading">aws</span>
      <span className="text-slate-500 text-[6.5px] font-bold uppercase tracking-wider leading-none mt-0.5">academy</span>
    </div>
  </div>
);

const NIRFLogo = () => (
  <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-purple-100 shadow-[0_4px_12px_rgba(126,34,206,0.03)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-purple-50/80 border border-purple-100 flex items-center justify-center flex-shrink-0">
      <svg className="h-5 w-6 text-purple-700" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Book and mortarboard cap */}
        <path d="M50 15 L85 35 L50 55 L15 35 Z" />
        <path d="M25 45 L25 70 C25 80, 75 80, 75 70 L75 45" stroke="currentColor" strokeWidth="6" fill="none" />
        <path d="M85 35 L85 75 M80 75 L90 75" stroke="currentColor" strokeWidth="6" fill="none" />
      </svg>
    </div>
    <div className="flex flex-col text-left pr-1.5">
      <span className="text-purple-800 font-black text-[13px] leading-none font-heading tracking-tighter">nirf</span>
      <span className="text-slate-500 text-[6px] font-bold uppercase tracking-wider leading-none mt-0.5">Ranked Institution</span>
    </div>
  </div>
);

const NBALogo = () => (
  <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-purple-100 shadow-[0_4px_12px_rgba(126,34,206,0.03)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-amber-50/70 border border-amber-100/70 flex items-center justify-center flex-shrink-0">
      <svg className="h-4.5 w-4.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 8v8M9 11l3-3 3 3" />
      </svg>
    </div>
    <div className="flex flex-col text-left pr-1.5">
      <span className="text-slate-800 font-extrabold text-[11px] leading-none tracking-wider font-heading">NBA</span>
      <span className="text-slate-500 text-[6.5px] font-bold uppercase tracking-wider leading-none mt-0.5">Accredited College</span>
    </div>
  </div>
);

const NAACLogo = () => (
  <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-purple-100 shadow-[0_4px_12px_rgba(126,34,206,0.03)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-emerald-50/80 border border-emerald-100 flex items-center justify-center flex-shrink-0">
      <svg className="h-4.5 w-4.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    </div>
    <div className="flex flex-col text-left pr-1.5">
      <span className="text-slate-800 font-extrabold text-[11px] leading-none tracking-wider font-heading">NAAC A++</span>
      <span className="text-slate-500 text-[6.5px] font-bold uppercase tracking-widest leading-none mt-0.5">Accredited Grade</span>
    </div>
  </div>
);

const ExcellenceLogo = () => (
  <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-purple-100 shadow-[0_4px_12px_rgba(126,34,206,0.03)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    {/* 33 years seal with laurel wreath */}
    <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0 bg-amber-50/70 border border-amber-100/50 rounded-full">
      <svg className="absolute inset-0 w-full h-full text-amber-500 animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />
      </svg>
      <svg className="w-4.5 h-4.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        {/* Laurel wreath outline */}
        <path d="M6 18c-2-1.5-3-3.5-3-6s1.5-5.5 3-7M18 18c2-1.5 3-3.5 3-6s-1.5-5.5-3-7" />
      </svg>
      <span className="absolute text-slate-800 font-black text-[9px] leading-none mt-0.5">33</span>
    </div>
    <div className="flex flex-col text-left pr-1.5">
      <span className="text-amber-600 font-extrabold text-[10px] leading-none font-heading tracking-wide">33 YEARS</span>
      <span className="text-slate-500 text-[6px] font-bold uppercase tracking-wider leading-none mt-0.5">Of Academic Excellence</span>
    </div>
  </div>
);

const PARTNERS = [
  CiscoLogo,
  AWSLogo,
  NIRFLogo,
  NBALogo,
  NAACLogo,
  ExcellenceLogo,
];

export default function LogoMarquee() {
  const tripledPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <div className="relative w-full overflow-hidden py-3 bg-purple-50 border-y border-purple-100/80 shadow-[0_8px_30px_rgba(126,34,206,0.03)] select-none">
      {/* Soft gradient fades on sides matching the solid purple-50 background */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-purple-50 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-purple-50 to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-5 w-max hover:[animation-play-state:paused] cursor-pointer"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 28,
            ease: "linear",
          },
        }}
      >
        {tripledPartners.map((LogoComponent, i) => (
          <div key={i} className="flex-shrink-0">
            <LogoComponent />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
