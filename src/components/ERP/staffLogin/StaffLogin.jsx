import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  Sparkles,
  ChevronRight,
  GraduationCap,
  ArrowLeft,
  Building2,
  Lock,
  ShieldAlert,
  CheckCircle2
} from "lucide-react";

export default function StaffLogin() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Dynamic Ambient Glow Effects (Light Mode) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/images/Logo/logo.webp"
            alt="Sarvadnya Vidyapeeth Logo"
            className="w-10 h-10 object-contain rounded-full bg-white p-0.5 shadow-md shadow-indigo-500/10 border border-indigo-100 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-slate-900 font-extrabold text-sm sm:text-base tracking-wider uppercase font-heading">
              Sarvadnya Vidyapeeth
            </span>
            <span className="text-indigo-700 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase">
              Staff & Faculty ERP Portal • AKU Patna
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/student"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200/80 hover:border-indigo-300 transition-all"
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            Switch to Student Login
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all"
          >
            Main Website <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl border border-indigo-100 p-6 sm:p-10 shadow-xl shadow-indigo-900/5 relative overflow-hidden text-center"
        >
          {/* Top Coming Soon Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Clock className="w-4 h-4 text-amber-600 animate-spin-slow" />
            <span>Coming Soon</span>
          </div>

          {/* Logo Badge */}
          <div className="mx-auto inline-block p-2 rounded-full bg-white shadow-md shadow-indigo-950/5 border-2 border-indigo-200 mb-4">
            <img
              src="/images/Logo/logo.webp"
              alt="Sarvadnya Vidyapeeth Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full bg-white p-1"
            />
          </div>

          {/* Main Titles */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight mb-2">
            Staff & Faculty Portal
          </h1>
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            Under Active Development
          </p>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
            Our dedicated Staff & Faculty ERP portal is currently undergoing upgrade and maintenance. Soon, faculty members will be able to manage attendance, student gradebooks, leave applications, and digital course materials seamlessly.
          </p>

          {/* Planned Features List */}
          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 text-left space-y-2.5 mb-6 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span>Faculty Dashboard & Gradebook Management</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span>Smart Attendance & Leave Tracking System</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span>Digital Academic Content & Study Notes Upload</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 hover:from-indigo-800 hover:to-purple-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.99]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Main Website</span>
            </Link>

            <Link
              to="/student"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-indigo-50 text-indigo-700 border border-slate-200 font-bold text-xs sm:text-sm transition-all"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Student Portal</span>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white/90 backdrop-blur-md py-3.5 px-6 sm:px-12 w-full">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11.5px] text-slate-600">
          <p className="text-center sm:text-left font-medium">
            Copyright © {new Date().getFullYear()} <span className="text-slate-900 font-semibold">Sarvadnya Vidyapeeth , Affiliated to Aryabhatta Knowledge University, Patna</span>. All rights reserved.
          </p>
          <p className="text-center sm:text-right text-[11px] text-slate-500">
            Designed &amp; Developed by{" "}
            <a
              href="https://texwebsolution.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 hover:text-indigo-800 font-black tracking-wide transition-colors hover:underline"
            >
              Texweb Solution Pvt. Ltd.
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
