import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoMarquee from "../LogoMarquee";
import HeroButtons from "./HeroButtons";
import { MergedBadgeOverlay } from "../RankingBadge";

// Floating image container animation
const imgFloat = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

const HERO_IMAGES = [
  { src: "/images/campus_exterior.png", alt: "University Campus" },
  { src: "/images/computer_lab.png", alt: "Advanced Computer Lab" },
  { src: "/images/campus_library.png", alt: "Central Digital Library" },
  { src: "/images/smart_classroom.png", alt: "Smart Classroom" },
  { src: "/images/student_graduation.png", alt: "Student Graduation" }
];

const HERO_HEADINGS = [
  "Empowering Youth Through Quality Education, Skills & Career Opportunities",
  "Unlock Global Careers with Advanced Computer & Software Training",
  "Fostering Academic Excellence, Practical Skills & Life-Long Learning",
  "Modern Digital Classrooms & Industry-Relevant BCA & BBA Curriculum",
  "Grooming Smart Professionals to Become Future Leaders & Entrepreneurs"
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    // Preload all slideshow images
    HERO_IMAGES.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });

    const timer = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative w-full overflow-hidden bg-slate-800 pt-16 pb-20 md:pb-28 lg:pb-36">

      {/* Background Image Slideshow with transparency to blend with the solid gradient background of the section */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={currentIdx}
            src={HERO_IMAGES[currentIdx].src}
            alt={HERO_IMAGES[currentIdx].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Light black gradient overlay to make text on the left extremely readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/30 to-black/5 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none z-10" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_100%)]" />

      {/* 1. Logos Marquee (Top of Hero, full width) */}
      <div className="relative z-20 w-full mt-4">
        <LogoMarquee />
      </div>

      {/* Main Grid Wrapper */}
      <div className="relative z-20 max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-12 lg:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-4 items-center">

          {/* ─── Left Side Content (55% width) ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col text-left"
          >
            {/* Tagline / Subtitle */}
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest inline-block mb-4 self-start">
              Admissions Open 2026-27
            </span>
            {/* Animated Heading with AnimatePresence */}
            <div className="min-h-[100px] sm:min-h-[110px] md:min-h-[130px] lg:min-h-[120px] xl:min-h-[130px] flex items-center mb-5 w-full">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentIdx}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[44px] tracking-tight font-sans text-left w-full"
                  style={{ lineHeight: 1.1 }}
                >
                  {HERO_HEADINGS[currentIdx]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Paragraph Text */}
            <p className="text-purple-100/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-semibold mb-2">
              <strong className="block text-amber-400 font-black tracking-wider text-sm sm:text-base mb-2 font-sans uppercase">
                BCA | BBA | Skill-Based Higher Education
              </strong>
              Affiliated to Aryabhatta Knowledge University, Patna. Providing affordable, progressive, and employment-oriented education with practical training, experienced faculty, and career guidance.
            </p>

            {/* Buttons component */}
            <HeroButtons />
          </motion.div>

          {/* ─── Right Side circular image & badges (45% width) ─── */}
          <div className="relative flex items-center justify-center lg:justify-end lg:pr-16 xl:pr-24 mt-12 lg:mt-0">
            {/* Float wrapper for the entire image assembly */}
            <motion.div
              variants={imgFloat}
              animate="animate"
              className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] xl:w-[460px] xl:h-[460px]"
            >
              {/* White Circular Frame */}
              <div className="relative w-full h-full rounded-full border-[6px] md:border-[8px] border-white shadow-2xl overflow-hidden bg-purple-100">
                <AnimatePresence>
                  <motion.img
                    key={currentIdx}
                    src={HERO_IMAGES[currentIdx].src}
                    alt={HERO_IMAGES[currentIdx].alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover select-none scale-105"
                  />
                </AnimatePresence>
                {/* Overlay gradient inside circle */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

                {/* Unified Premium Badge Overlay */}
                <MergedBadgeOverlay />

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                  {HERO_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIdx
                        ? "bg-white w-4"
                        : "bg-white/40 hover:bg-white/60"
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* SVG curve bottom transition */}
      <div className="absolute bottom-[-1px] left-0 w-full z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          {/* Smooth curved wave transition exactly matching reference visual */}
          <path
            d="M0,80 C360,180 720,40 1080,120 C1260,160 1380,110 1440,90 L1440,180 L0,180 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

    </section>
  );
}
