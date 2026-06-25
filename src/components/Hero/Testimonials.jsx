import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../SectionHeading";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Kumari",
    role: "BCA Graduate, Batch 2025",
    rating: 5,
    text: "Sarvadnya Vidyapeeth transformed my career trajectory entirely. The faculty didn't just teach — they mentored us through real-world projects. I got placed at an IT firm even before my final semester exams. The practical approach to education here is unmatched!",
    initials: "PK",
    gradientFrom: "#6366F1",
    gradientTo: "#8B5CF6",
    placed: "TCS Digital",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "BBA Graduate, Batch 2024",
    rating: 5,
    text: "What sets SV apart is the holistic development — from personality workshops to industry visits. The placement cell worked tirelessly to connect us with top recruiters. I'm now working in a Fortune 500 company, all thanks to the foundation SV built for me.",
    initials: "RV",
    gradientFrom: "#EC4899",
    gradientTo: "#F43F5E",
    placed: "Deloitte",
  },
  {
    id: 3,
    name: "Anjali Singh",
    role: "BCA Student, 3rd Year",
    rating: 5,
    text: "The computer labs here are world-class — always updated with the latest software. Our professors encourage us to participate in hackathons and coding contests. I've already won two state-level competitions and have an internship at a startup!",
    initials: "AS",
    gradientFrom: "#14B8A6",
    gradientTo: "#06B6D4",
    placed: "Google Internship",
  },
  {
    id: 4,
    name: "Amit Kumar Sinha",
    role: "BBA Graduate, Batch 2025",
    rating: 5,
    text: "The best decision I ever made was choosing SV for my BBA. The case-study based learning, mock interviews, and group discussions prepared me thoroughly. The campus culture is vibrant and the faculty are always accessible. Truly a premium experience.",
    initials: "AK",
    gradientFrom: "#F59E0B",
    gradientTo: "#EF4444",
    placed: "HDFC Bank",
  },
  {
    id: 5,
    name: "Sneha Bharti",
    role: "BCA Graduate, Batch 2024",
    rating: 5,
    text: "SV gave me confidence I never knew I had. From a shy student to a confident software developer — this journey wouldn't have been possible without the support system here. The industry-relevant curriculum and coding bootcamps were game-changers.",
    initials: "SB",
    gradientFrom: "#8B5CF6",
    gradientTo: "#3B82F6",
    placed: "Infosys",
  },
  {
    id: 6,
    name: "Vikash Ranjan",
    role: "BCA Student, 2nd Year",
    rating: 4,
    text: "I love how SV balances academics with extracurriculars. The smart classrooms make learning engaging, and the regular tech seminars keep us updated with industry trends. The hostel facilities are comfortable and the campus feels like a second home.",
    initials: "VR",
    gradientFrom: "#10B981",
    gradientTo: "#059669",
    placed: null,
  },
];

const AUTO_ROTATE = 6000;

/* ── Star Rating Component ── */
function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-slate-200"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Quote Icon ── */
function QuoteIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" opacity="0.1">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
    </svg>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (idx) => setActive(idx),
    []
  );

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, AUTO_ROTATE);
    return () => clearInterval(timerRef.current);
  }, [goNext, isPaused]);

  const current = TESTIMONIALS[active];

  return (
    <section
      className="relative py-12 md:py-16 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FAF5FF 0%, #FFFDF5 50%, #FAF5FF 100%)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Ambient floating orbs ── */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* ── Subtle star-like dots ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-purple-300 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <SectionHeading
          tagline="Student Voices"
          title="What Our"
          highlight="Students Say"
          subtitle="Hear directly from our students and alumni about their transformative journey at Sarvadnya Vidyapeeth."
          align="center"
        />

        {/* ─── Main Testimonial Display ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── Left: Active Testimonial Card ── */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Glow behind card */}
                <div
                  className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${current.gradientFrom}, ${current.gradientTo})`,
                  }}
                />

                <div className="relative bg-white border border-purple-100/80 rounded-2xl p-6 md:p-8 lg:p-10 shadow-md">
                  {/* Quote icon */}
                  <QuoteIcon className="absolute top-5 right-6 w-16 h-16 text-purple-200" />

                  {/* Stars */}
                  <div className="mb-5">
                    <Stars count={current.rating} />
                  </div>

                  {/* Testimonial text */}
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed md:leading-loose mb-8 relative z-10">
                    "{current.text}"
                  </p>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-100/60 to-transparent mb-6" />

                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${current.gradientFrom}, ${current.gradientTo})`,
                      }}
                    >
                      {current.initials}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-slate-900 font-bold text-sm md:text-base leading-tight">
                        {current.name}
                      </h4>
                      <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                        {current.role}
                      </p>
                    </div>

                    {/* Placement badge */}
                    {current.placed && (
                      <div className="hidden sm:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                          Placed at {current.placed}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right: Avatar selector grid ── */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-[340px] mx-auto lg:mx-0 lg:ml-auto">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => goTo(idx)}
                  className={`group relative flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl border transition-all duration-500 cursor-pointer ${
                    idx === active
                      ? "bg-white border-purple-200 shadow-md scale-105"
                      : "bg-purple-50/50 border-purple-100/50 hover:bg-purple-50/80 hover:border-purple-200/40 shadow-sm"
                  }`}
                >
                  {/* Active indicator glow */}
                  {idx === active && (
                    <div
                      className="absolute -inset-1 rounded-xl blur-md opacity-20 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
                      }}
                    />
                  )}

                  {/* Avatar */}
                  <div
                    className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-md transition-all duration-500 ${
                      idx === active ? "ring-2 ring-purple-300 ring-offset-2 ring-offset-transparent" : "opacity-60 group-hover:opacity-90"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})`,
                    }}
                  >
                    {t.initials}
                  </div>

                  {/* Name (truncated) */}
                  <span
                    className={`text-[10px] md:text-[11px] font-semibold leading-tight text-center transition-colors duration-300 ${
                      idx === active ? "text-purple-950 font-bold" : "text-slate-500 group-hover:text-slate-700"
                    }`}
                  >
                    {t.name.split(" ")[0]}
                  </span>

                  {/* Active dot */}
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      idx === active
                        ? "bg-amber-500 shadow-sm"
                        : "bg-purple-100"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6 max-w-[340px] mx-auto lg:mx-0 lg:ml-auto">
              <div className="h-[2px] bg-purple-105 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-purple-600 rounded-full"
                  key={`progress-${active}-${isPaused}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? undefined : "100%" }}
                  transition={{
                    duration: AUTO_ROTATE / 1000,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom stats strip ── */}
        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { value: "500+", label: "Happy Alumni" },
            { value: "95%", label: "Placement Rate" },
            { value: "4.8★", label: "Student Rating" },
            { value: "50+", label: "Recruiters" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-purple-100 shadow-sm rounded-xl p-4 text-center hover:shadow-md transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-950 mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
