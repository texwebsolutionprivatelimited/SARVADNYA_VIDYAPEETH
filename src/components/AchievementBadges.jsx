import React from "react";
import { motion } from "framer-motion";
import { Award, Star, TrendingUp, Globe, Shield, Trophy } from "lucide-react";

const BADGES = [
  {
    label: "#1 Ranked",
    sub: "Institution",
    icon: Trophy,
    color: "from-amber-400 to-orange-500",
    pos: "top-0 -right-4 md:right-0",
    delay: 0.3,
  },
  {
    label: "NAAC A++",
    sub: "Accredited",
    icon: Shield,
    color: "from-emerald-400 to-teal-500",
    pos: "-bottom-2 -right-2 md:right-4",
    delay: 0.5,
  },
  {
    label: "NBA",
    sub: "Accredited",
    icon: Award,
    color: "from-purple-500 to-purple-700",
    pos: "top-1/4 -left-6 md:-left-8",
    delay: 0.7,
  },
  {
    label: "95%",
    sub: "Placements",
    icon: TrendingUp,
    color: "from-violet-400 to-purple-500",
    pos: "-bottom-4 -left-4 md:-left-6",
    delay: 0.9,
  },
  {
    label: "Global",
    sub: "Partnerships",
    icon: Globe,
    color: "from-orange-500 to-purple-600",
    pos: "top-2 left-1/4",
    delay: 1.1,
  },
  {
    label: "₹1.5Cr+",
    sub: "Highest Package",
    icon: Star,
    color: "from-rose-400 to-pink-500",
    pos: "bottom-1/4 -right-6 md:-right-8",
    delay: 0.4,
  },
];

const floatVariants = [
  { y: [0, -10, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } },
  { y: [0, -8, 0], transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 } },
  { y: [0, -12, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 } },
  { y: [0, -9, 0], transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 } },
  { y: [0, -7, 0], transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 } },
  { y: [0, -11, 0], transition: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 } },
];

export default function AchievementBadges() {
  return (
    <>
      {BADGES.map((b, i) => (
        <motion.div
          key={b.label}
          className={`absolute z-20 ${b.pos}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, ...floatVariants[i] }}
          transition={{ duration: 0.5, delay: b.delay, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-900/8 border border-slate-100 px-4 py-3 flex items-center gap-3 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center shadow-md flex-shrink-0`}>
              <b.icon size={16} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-heading font-extrabold text-slate-900 leading-tight">{b.label}</div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{b.sub}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
