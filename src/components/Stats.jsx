import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, TrendingUp, IndianRupee } from "lucide-react";

const STATS = [
  {
    value: "50,000+",
    label: "Students Worldwide",
    icon: Users,
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-indigo-600",
    border: "border-indigo-100",
  },
  {
    value: "500+",
    label: "Expert Faculty",
    icon: BookOpen,
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-600",
    border: "border-violet-100",
  },
  {
    value: "95%",
    label: "Placement Rate",
    icon: TrendingUp,
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    value: "₹1.5 Cr",
    label: "Highest Package",
    icon: IndianRupee,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-600",
    border: "border-amber-100",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Stats() {
  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {STATS.map((s) => (
        <motion.div
          key={s.label}
          variants={item}
          className={`group relative overflow-hidden rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/[0.08] hover:bg-white/[0.12] hover:border-white/[0.15] p-5 cursor-default transition-all duration-300`}
        >
          {/* subtle glow */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${s.gradient} rounded-2xl`} />

          <div className="relative z-10 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
              <s.icon size={18} className="text-indigo-300" />
            </div>
            <div>
              <div className="text-xl font-heading font-extrabold text-white leading-tight">{s.value}</div>
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
