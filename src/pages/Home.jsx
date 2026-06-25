import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, Code, Building, ArrowRight, Award
} from "lucide-react";
import Hero from "../components/Hero/Hero";
import LifeAtSV from "../components/Hero/LifeAtSV";
import OurGallery from "../components/Hero/OurGallery";
import ResearchInnovation from "../components/Hero/ResearchInnovation";
import LatestBlogs from "../components/Hero/LatestBlogs";
import Testimonials from "../components/Hero/Testimonials";
import SectionHeading from "../components/SectionHeading";


export default function Home() {
  return (
    <div className="relative bg-white w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Introduction Section (Directly under the wave curve) */}
      <section className="py-16 bg-white relative overflow-hidden text-slate-800">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* ─── Left Side: NO. 1 Ranked Column (40% / 5 cols) ─── */}
            <div className="lg:col-span-5 flex justify-center select-none">
              <div className="relative w-full max-w-[340px] bg-gradient-to-b from-purple-50/70 via-white to-purple-50 rounded-3xl p-6 md:p-8 shadow-md border border-purple-100/80 transition-all duration-500 group">
                {/* 3D-like Glowing Aura */}
                <div className="absolute inset-0 rounded-3xl bg-purple-500/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                {/* Giant Stylized "1" Layout */}
                <div className="flex items-center gap-6">
                  {/* Giant 3D "1" shape with NO. above */}
                  <div className="relative flex-shrink-0 flex flex-col items-center">
                    {/* NO. label above the 1 */}
                    <span className="font-black text-2xl md:text-3xl text-purple-700 tracking-tighter drop-shadow-sm leading-none mb-1">NO.</span>
                    <svg className="w-16 h-44 md:w-20 md:h-52 text-purple-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.08)]" viewBox="0 0 100 250" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      {/* 3D Depth bevel (Gold) */}
                      <path d="M40 50 L55 35 L75 35 L75 220 L85 220 L85 235 L35 235 L35 220 L45 220 L45 70 L40 70 Z" fill="#D4AF37" />
                      {/* Main front face of 1 */}
                      <path d="M35 55 L50 40 L70 40 L70 215 L80 215 L80 230 L30 230 L30 215 L40 215 L40 75 L35 75 Z" fill="url(#oneGrad)" />
                      <defs>
                        <linearGradient id="oneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#C4B5FD" />
                          <stop offset="50%" stopColor="#7E22CE" />
                          <stop offset="100%" stopColor="#3B0764" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Ranking details inside the card */}
                  <div className="flex flex-col text-left items-start">
                    <span className="text-slate-500 font-black text-[10px] md:text-[11px] tracking-widest uppercase leading-none">Ranked</span>
                    <h3 className="text-purple-950 font-black text-lg md:text-xl xl:text-2xl leading-tight uppercase tracking-wide mt-2">
                      Private <br />
                      BCA &amp; BBA <br />
                      College <br />
                      In Bihar
                    </h3>

                    {/* Publication Logos */}
                    <div className="mt-5 space-y-3 flex flex-col items-start">
                      {/* India Today */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-purple-700 font-extrabold text-[11px] tracking-tight uppercase">India</span>
                        <span className="text-white font-black text-[10px] tracking-tight bg-slate-800 px-2 py-0.5 rounded-sm">Today</span>
                      </div>

                      {/* The Week */}
                      <div className="inline-flex items-center bg-purple-700 px-3 py-0.5 rounded-sm shadow-sm">
                        <span className="text-white font-black text-[10px] uppercase tracking-wider">The Week</span>
                      </div>

                      {/* Outlook */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-700 font-black text-[11px] tracking-wide italic">Outlook</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Right Side: University Paragraphs & Virtual Tour (60% / 7 cols) ─── */}
            <div className="lg:col-span-7 flex flex-col text-left">
              {/* Paragraph 1 */}
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                <strong>Sarvadnya Vidyapeeth, Patna</strong> is a progressive institution dedicated to providing quality, affordable, and employment-oriented higher education. Established with the vision of empowering students from rural, semi-urban, and economically weaker backgrounds, the institution focuses on academic excellence, skill development, innovation, and personality enhancement.
              </p>

              {/* Paragraph 2 */}
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                Located in the educational hub of Patna, Sarvadnya Vidyapeeth provides students with a modern learning environment, experienced faculty, practical training, and career guidance to help them achieve their professional goals.
              </p>

              {/* Paragraph 3 */}
              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                Our campus features smart classrooms, advanced computer laboratories, an extensive library, a seminar hall, and secure residential hostels for boys and girls. Every facility is designed to support the academic and personal growth of our students, helping them achieve their career aspirations.
              </p>

              {/* 360° Virtual Tour Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-6 bg-slate-50 border border-slate-100 rounded-2xl select-none group/tour hover:bg-slate-100/50 transition-colors duration-300">
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-[#100936] font-extrabold text-sm md:text-base leading-snug">
                    Step into Your Future: Explore Sarvadnya Vidyapeeth Campus with Our Virtual Tour!
                  </h4>
                </div>

                {/* 360 tour button graphic */}
                <Link
                  to="/campus"
                  className="flex flex-col items-center justify-center flex-shrink-0 cursor-pointer"
                >
                  <div className="relative w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg group-hover/tour:bg-red-700 transition-colors">
                    {/* Orbit arrow animation */}
                    <svg className="absolute w-full h-full text-white/40 animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                      <path d="M15,50 A35,35 0 1,1 85,50 A35,35 0 1,1 15,50" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6" />
                      <polygon points="50,12 55,18 45,18" fill="currentColor" />
                    </svg>
                    <span className="font-black text-xs md:text-sm tracking-tight">360°</span>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-black text-red-600 uppercase tracking-widest leading-none mt-1.5 group-hover/tour:text-red-700 transition-colors">
                    Virtual Tour
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── WHY S.V. SECTION (SAGE University inspired layout) ─── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ minHeight: '500px' }}
      >
        {/* Full-bleed campus background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/campus_exterior.png')` }}
        />

        {/* Brand purple overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/95 via-purple-900/80 to-purple-950/60 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-transparent to-transparent pointer-events-none z-[1]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">

            {/* ──────── LEFT PANEL: WHY S.V.? Text + Ranking + CTA (5 cols) ──────── */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <SectionHeading
                tagline="Choose Excellence"
                highlight="Why S.V.?"
                subtitle="Grooming young minds to become future leaders, entrepreneurs with ethical values and professional discipline."
                align="left"
                theme="dark"
                className="mb-6 md:mb-8"
              />

              {/* No.1 Ranking Highlight */}
              <motion.div
                className="mb-8 select-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-purple-200/90 text-xs sm:text-sm font-extrabold tracking-wide mb-1">
                  This is why we are consistently ranked
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-6xl sm:text-7xl md:text-8xl font-black bg-gradient-to-b from-purple-300 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-none tracking-tighter">
                    No.1
                  </span>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm px-7 py-3.5 rounded-lg shadow-lg shadow-purple-700/20 hover:shadow-purple-700/30 transition-all duration-300 uppercase tracking-wider group"
                >
                  Read More About SV
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
            </div>

            {/* ──────── CENTER: Stats Grid (4 cols) ──────── */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <motion.div
                className="grid grid-cols-2 gap-4 w-full max-w-[380px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Stat 1 */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 group">
                  <div className="text-4xl sm:text-5xl font-heading font-black text-white mb-1 leading-none group-hover:scale-105 transition-transform duration-300">
                    50<span className="text-amber-400">+</span>
                  </div>
                  <div className="text-[10px] sm:text-xs font-extrabold text-white/70 uppercase tracking-wider">
                    State of Art Laboratories
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 group">
                  <div className="text-4xl sm:text-5xl font-heading font-black text-white mb-1 leading-none group-hover:scale-105 transition-transform duration-300">
                    50<span className="text-amber-400">+</span>
                  </div>
                  <div className="text-[10px] sm:text-xs font-extrabold text-white/70 uppercase tracking-wider">
                    Smart Classrooms
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 group">
                  <div className="text-4xl sm:text-5xl font-heading font-black text-white mb-1 leading-none group-hover:scale-105 transition-transform duration-300">
                    75<span className="text-amber-400">+</span>
                  </div>
                  <div className="text-[10px] sm:text-xs font-extrabold text-white/70 uppercase tracking-wider">
                    Programs
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 group">
                  <div className="text-4xl sm:text-5xl font-heading font-black text-white mb-1 leading-none group-hover:scale-105 transition-transform duration-300">
                    1:20
                  </div>
                  <div className="text-[10px] sm:text-xs font-extrabold text-white/70 uppercase tracking-wider">
                    Faculty Student Ratio
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ──────── RIGHT: Floating Achievement Badges (3 cols) ──────── */}
            <div className="lg:col-span-3 relative flex flex-col items-center lg:items-end gap-5 lg:gap-6 lg:pt-4">

              {/* Badge 1 - Unique Academic Model */}
              <motion.div
                className="flex items-center gap-3 bg-white/85 border border-purple-100 shadow-md rounded-2xl px-5 py-4 hover:bg-white transition-all duration-300 cursor-default w-full max-w-[260px] animate-float-slow"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md flex-shrink-0">
                  <Award size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-heading font-extrabold text-slate-800 leading-tight uppercase">Unique Academic</div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Model</div>
                </div>
              </motion.div>

              {/* Badge 2 - Certified Computer Lab */}
              <motion.div
                className="flex items-center gap-3 bg-white/85 border border-purple-100 shadow-md rounded-2xl px-5 py-4 hover:bg-white transition-all duration-300 cursor-default w-full max-w-[260px] animate-float-medium"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md flex-shrink-0">
                  <Code size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-heading font-extrabold text-slate-800 leading-tight uppercase">Certified</div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Computer Lab</div>
                </div>
              </motion.div>

              {/* Badge 3 - Mentor University Concept */}
              <motion.div
                className="flex items-center gap-3 bg-white/85 border border-purple-100 shadow-md rounded-2xl px-5 py-4 hover:bg-white transition-all duration-300 cursor-default w-full max-w-[260px] animate-float-fast"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md flex-shrink-0">
                  <GraduationCap size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-heading font-extrabold text-slate-800 leading-tight uppercase">Mentor</div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">University Concept</div>
                </div>
              </motion.div>

              {/* Badge 4 - State of Art Infrastructure */}
              <motion.div
                className="flex items-center gap-3 bg-white/85 border border-purple-100 shadow-md rounded-2xl px-5 py-4 hover:bg-white transition-all duration-300 cursor-default w-full max-w-[260px] animate-float-slow"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
                  <Building size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-heading font-extrabold text-slate-800 leading-tight uppercase">State of Art</div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Infrastructure</div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── LIFE AT S.V. SECTION ─── */}
      <LifeAtSV />

      {/* ─── OUR GALLERY SECTION ─── */}
      <OurGallery />

      {/* ─── RESEARCH & INNOVATION SECTION ─── */}
      <ResearchInnovation />

      {/* ─── LATEST BLOGS SLIDER SECTION ─── */}
      <LatestBlogs />

      {/* ─── TESTIMONIALS SECTION ─── */}
      <Testimonials />


      {/* ─── FIXED UTILITIES ─── */}


      {/* B. Sticky Admission Open Vertical Ribbon (Right Edge) */}
      <Link
        to="/admission"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[9px] md:text-[10px] px-2 py-4 uppercase tracking-[0.2em] rounded-l shadow-2xl flex items-center justify-center select-none active:scale-95 duration-200"
        style={{
          writingMode: "vertical-lr",
          transform: "translateY(-50%) rotate(180deg)",
        }}
      >
        Admission Open
      </Link>
    </div>
  );
}
