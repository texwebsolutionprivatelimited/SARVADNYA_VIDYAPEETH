import React from "react";
import { motion } from "framer-motion";

/**
 * SectionHeading — Reusable branded section heading component
 * Props: tagline, title, highlight, subtitle, align ("center"|"left"), className, theme ("light"|"dark")
 */
export default function SectionHeading({
  tagline,
  title,
  highlight,
  subtitle,
  align = "center",
  className = "",
  theme = "light",
}) {
  const isCenter = align === "center";
  const isDark = theme === "dark";
  return (
    <motion.div
      className={`mb-8 md:mb-10 ${isCenter ? "text-center" : "text-left"} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {tagline && (
        <div className={`flex items-center gap-3 mb-3 ${isCenter ? "justify-center" : "justify-start"}`}>
          <span className={`h-[2px] w-8 bg-gradient-to-r from-transparent ${isDark ? "to-purple-400" : "to-purple-500"} rounded-full`} />
          <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] ${isDark ? "text-purple-300" : "text-purple-600"}`}>
            {tagline}
          </span>
          <span className={`h-[2px] w-8 bg-gradient-to-l from-transparent ${isDark ? "to-purple-400" : "to-purple-500"} rounded-full`} />
        </div>
      )}
      <h2 className={`text-2xl xs:text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
        {title && <>{title}{" "}</>}
        {highlight && (
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {highlight}
            </span>
            <svg className={`absolute -bottom-2 left-0 w-full h-3 ${isDark ? "text-purple-300/30" : "text-purple-400/40"}`} viewBox="0 0 200 12" preserveAspectRatio="none">
              <path d="M0 8 Q50 0 100 8 T200 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        )}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-sm md:text-base leading-relaxed ${isDark ? "text-purple-100/80" : "text-slate-500"} ${isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
