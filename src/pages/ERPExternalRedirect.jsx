import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, GraduationCap } from "lucide-react";

export default function ERPExternalRedirect({ role = "Student ERP Portal" }) {
  const isStudent = role?.toLowerCase().includes("student");
  const targetUrl = isStudent
    ? "https://erp.sarvadnyavidyapeeth.in/student-login"
    : "https://sarvadnyavidyapeeth.in";

  useEffect(() => {
    window.location.replace(targetUrl);
  }, [targetUrl]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 font-sans text-center">
      <div className="max-w-md w-full bg-slate-800/80 rounded-3xl border border-slate-700/60 p-8 shadow-2xl space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
          <GraduationCap className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest block">
            ERP Portal Gateway
          </span>
          <h1 className="text-xl font-bold text-white mt-1">{role}</h1>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Redirecting to {isStudent ? "Student Login Portal" : "Sarvadnya Vidyapeeth"}...
          </p>
        </div>

        <a
          href={targetUrl}
          target={isStudent ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>Continue to Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        <div className="pt-3 border-t border-slate-700/60">
          <Link to="/" className="text-xs font-semibold text-slate-400 hover:text-white flex items-center justify-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to College Website
          </Link>
        </div>
      </div>
    </div>
  );
}

