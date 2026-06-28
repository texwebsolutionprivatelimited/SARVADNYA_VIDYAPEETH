import React, { useState, useEffect, useRef, useCallback } from "react";
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

const HERO_VIDEOS = [
  { src: "/video/video-1.mp4", title: "Campus Life" },
  { src: "/video/video-2.mp4", title: "Academic Excellence" },
  { src: "/video/video-3.mp4", title: "Student Activities" },
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [videoIdx, setVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef([]);
  const sectionRef = useRef(null);

  // Background image slideshow timer
  useEffect(() => {
    HERO_IMAGES.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
    const timer = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Handle video advancement — when the current video ends, go to next
  const handleVideoEnd = useCallback(() => {
    setVideoIdx((prev) => (prev + 1) % HERO_VIDEOS.length);
  }, []);

  // Play the active video when index changes
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === videoIdx) {
        vid.currentTime = 0;
        if (isPlaying) {
          vid.play().catch(() => { });
        }
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [videoIdx, isPlaying]);

  const togglePlayPause = () => {
    const vid = videoRefs.current[videoIdx];
    if (!vid) return;
    if (isPlaying) {
      vid.pause();
    } else {
      vid.play().catch(() => { });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = newMuted;
    });
  };

  // Auto-mute when user scrolls down on the homepage
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If user scrolls down past 50px, auto-mute
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsMuted(true);
        videoRefs.current.forEach((vid) => {
          if (vid) vid.muted = true;
        });
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToVideo = (idx) => {
    setVideoIdx(idx);
    setIsPlaying(true);
  };

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-slate-800 pt-16 pb-20 md:pb-28 lg:pb-36">

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

          {/* ─── Right Side: Circular VIDEO Slider ─── */}
          <div className="relative flex items-center justify-center lg:justify-end lg:pr-16 xl:pr-24 mt-12 lg:mt-0">
            {/* Float wrapper for the entire video assembly */}
            <motion.div
              variants={imgFloat}
              animate="animate"
              className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] xl:w-[460px] xl:h-[460px]"
            >
              {/* Animated glowing ring behind the circle */}
              <div
                className="absolute -inset-2.5 rounded-full pointer-events-none z-0"
                style={{
                  background: "conic-gradient(from 0deg, #7E22CE, #D4AF37, #A78BFA, #7E22CE)",
                  opacity: 0.5,
                  filter: "blur(8px)",
                  animation: "spin 8s linear infinite",
                }}
              />

              {/* White Circular Frame */}
              <div className="relative w-full h-full rounded-full border-[6px] md:border-[8px] border-white shadow-2xl overflow-hidden bg-purple-100 z-10">
                {/* Video layers — all stacked, only active one visible */}
                {HERO_VIDEOS.map((video, i) => (
                  <video
                    key={i}
                    ref={(el) => (videoRefs.current[i] = el)}
                    src={video.src}
                    muted
                    playsInline
                    preload="metadata"
                    onEnded={handleVideoEnd}
                    className="absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-700 ease-in-out"
                    style={{ opacity: i === videoIdx ? 1 : 0 }}
                  />
                ))}

                {/* Overlay gradient inside circle */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

                {/* Unified Premium Badge Overlay */}
                <MergedBadgeOverlay />

                {/* ─── Video Controls (Inside circle bottom) ─── */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30">
                  {/* Play / Pause Button (Left) */}
                  <button
                    onClick={togglePlayPause}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center hover:bg-white/30 transition-all duration-300 group/play"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white group-hover/play:text-amber-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white group-hover/play:text-amber-300 transition-colors ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
                      </svg>
                    )}
                  </button>

                  {/* Navigation Dots (Center) */}
                  <div className="flex gap-1.5">
                    {HERO_VIDEOS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToVideo(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === videoIdx
                          ? "bg-white w-5"
                          : "bg-white/40 hover:bg-white/60 w-1.5"
                          }`}
                        aria-label={`Go to video ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Sound Toggle Button (Right) */}
                  <button
                    onClick={toggleMute}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center hover:bg-white/30 transition-all duration-300 group/sound"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white group-hover/sound:text-amber-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 group-hover/sound:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
                        <path d="M15.54 8.46a5 5 0 010 7.07" />
                        <path d="M19.07 4.93a10 10 0 010 14.14" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Video title label */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={videoIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 z-30"
                  >
                    <span className="bg-purple-950/60 backdrop-blur-md border border-white/10 text-white font-bold text-[8px] sm:text-[9px] uppercase tracking-[0.15em] px-3 py-1 rounded-full whitespace-nowrap">
                      {HERO_VIDEOS[videoIdx].title}
                    </span>
                  </motion.div>
                </AnimatePresence>
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
