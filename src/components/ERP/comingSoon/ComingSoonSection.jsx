import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  GraduationCap,
  Briefcase,
  BookOpen,
  Clock,
  CheckCircle2,
  ShieldCheck,
  RotateCw,
} from "lucide-react";

export default function ComingSoonSection({
  title = "Module Under Development",
  section = "Academic",
  subtitle = "Sarvadnya Vidyapeeth ERP Portal",
}) {
  // Feature highlights based on section
  const sectionFeatures = {
    Academic: [
      { title: "Real-Time Attendance Status", desc: "Detailed subject-wise breakdown & monthly percentage reports." },
      { title: "Smart Class Timetable", desc: "Interactive weekly lecture schedules & classroom locations." },
      { title: "Exam Results & Marksheets", desc: "Instant SGPA/CGPA result updates & downloadable gradecards." },
      { title: "Exam Schedule & Admit Cards", desc: "Comprehensive exam timetable & hall ticket portal." },
    ],
    Placements: [
      { title: "Live Campus Drives", desc: "Direct applications to visiting recruiters & IT tech giants." },
      { title: "Smart Resume Builder", desc: "TPO-verified resume templates & profile score optimizers." },
      { title: "Mock Interview Slots", desc: "Automated booking for technical & HR practice sessions." },
      { title: "Placement Track Record", desc: "Package insights, offer letters, & selection statistics." },
    ],
    Library: [
      { title: "Digital Circulation Ledger", desc: "Track currently issued books, due dates & return history." },
      { title: "Sarvadnya E-Library", desc: "Access 10,000+ online e-books, research journals & lecture notes." },
      { title: "Online Book Reservation", desc: "Reserve upcoming titles & receive automated SMS alerts." },
      { title: "Rules & Fine Calculator", desc: "Transparent library rules & automated zero-due clearance." },
    ],
  };

  const features = sectionFeatures[section] || sectionFeatures.Academic;

  const sectionIcon =
    section === "Placements"
      ? Briefcase
      : section === "Library"
      ? BookOpen
      : GraduationCap;

  const SectionIconComponent = sectionIcon;

  return (
    <div className="min-h-[82vh] flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-slate-50 via-purple-50/20 to-white rounded-2xl border border-purple-100 shadow-sm relative overflow-hidden text-slate-800">
      {/* Background Decorative Glow Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full text-center space-y-6 relative z-10"
      >
        {/* ── Sarvadnya Logo with Circular Rotating Ring ── */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative flex items-center justify-center my-2">
            {/* Outer Circular Rotating Dash Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute -inset-4 rounded-full border-2 border-dashed border-purple-500/60 pointer-events-none"
            />
            {/* Inner Circular Rotating Glowing Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute -inset-2 rounded-full border-2 border-purple-300/40 border-t-purple-600 pointer-events-none"
            />
            {/* Sarvadnya Logo */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white p-2 border-2 border-purple-200 shadow-xl flex items-center justify-center z-10">
              <img
                src="/images/Logo/logo.webp"
                alt="Sarvadnya Vidyapeeth Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            {/* Spinning Floating Section Icon Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-lg border-2 border-white z-20"
            >
              <SectionIconComponent className="w-5 h-5" />
            </motion.div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/90 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider mt-2">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            {subtitle}
          </div>
        </div>

        {/* ── Big Coming Soon Headline ── */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-xs">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-600" />
            </motion.div>
            <span>Under Active Development</span>
          </div>

          {/* Big COMING SOON text */}
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-widest bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-900 bg-clip-text text-transparent py-1">
            COMING SOON
          </h1>

          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-medium pt-1">
            We are configuring high-speed real-time data sync for <strong className="text-purple-700 font-bold">Sarvadnya Vidyapeeth</strong> students. This module will be live shortly.
          </p>
        </div>

        {/* ── Module Roadmap Highlights ── */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-md text-left space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shrink-0"
              >
                <SectionIconComponent className="w-5 h-5" />
              </motion.div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                  {section} Module Roadmap
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  Features currently being deployed for Sarvadnya Vidyapeeth
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1.5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              >
                <Clock className="w-3.5 h-3.5 text-purple-600" />
              </motion.div>
              Coming Soon
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-purple-50/50 border border-slate-100 hover:border-purple-200 transition-colors group"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-purple-900">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Return to Dashboard Action ── */}
        <div className="pt-2">
          <Link
            to="/student-dashboard"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Student Dashboard
          </Link>
        </div>

        <p className="text-[11px] text-slate-400 pt-2 font-medium">
          © {new Date().getFullYear()} Sarvadnya Vidyapeeth ERP • All Rights Reserved
        </p>
      </motion.div>
    </div>
  );
}
