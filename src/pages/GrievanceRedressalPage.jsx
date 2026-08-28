import React from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "../components/Animations";
import { ShieldCheck, AlertOctagon, Users, Clock, CheckCircle, Mail, Phone, MapPin, Send } from "lucide-react";
import { useSettings } from "../hooks/useSettings";

export default function GrievanceRedressalPage() {
  const { settings } = useSettings();
  const { general } = settings;

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      {/* ─── Hero Banner ─── */}
      <section className="relative pt-16 pb-20 bg-gradient-to-b from-purple-50 via-purple-50/20 to-white text-slate-800 border-b border-purple-100/80 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.06),transparent)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100/80 border border-purple-200/60 rounded-full px-4 py-1.5 text-xs font-bold text-purple-800 uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck size={14} className="text-purple-700" />
            AICTE &amp; UGC Statutory Committees
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-black text-purple-950 tracking-tight">
            Grievance Redressal &amp; Anti-Ragging
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base mt-3 leading-relaxed">
            Sarvadnya Vidyapeeth maintains zero tolerance for ragging, harassment, and unfair treatment. Explore our statutory redressal committees and reporting helplines.
          </p>
        </div>
      </section>

      {/* ─── Content Section ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-10">

          {/* Anti-Ragging Strict Policy Warning */}
          <FadeIn>
            <div className="bg-rose-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden border border-rose-800">
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 bg-rose-900 border border-rose-700 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider text-rose-200">
                  <AlertOctagon size={14} className="text-rose-400" /> Zero Tolerance Policy
                </div>
                <h2 className="text-xl md:text-2xl font-black">
                  Strict Prohibition of Ragging
                </h2>
                <p className="text-rose-100 text-xs md:text-sm leading-relaxed max-w-3xl">
                  In accordance with the Supreme Court of India directives and AICTE Regulations 2009 (F.No. 37-3/Legal/AICTE/2009), ragging in any form inside or outside the college campus or hostels is strictly banned. Any student found guilty of ragging faces immediate suspension, expulsion, cancellation of admission, and registration of a police FIR.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
                  <div className="bg-rose-900/80 px-3.5 py-1.5 rounded-lg border border-rose-700/60">
                    National Anti-Ragging Toll-Free Helpline: <span className="text-amber-300 font-bold">1800-180-5522</span>
                  </div>
                  <div className="bg-rose-900/80 px-3.5 py-1.5 rounded-lg border border-rose-700/60">
                    National Anti-Ragging Email: <span className="text-amber-300 font-bold">helpline@antiragging.in</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Statutory Committees Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* SGRC */}
            <FadeIn delay={0.06}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold mb-4">
                    <Users size={20} />
                  </div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg mb-2">
                    Student Grievance Redressal Committee (SGRC)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Formed under AICTE Regulations 2019 to address student academic issues, fee disputes, attendance discrepancies, and evaluation concerns impartially.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-purple-700 font-bold">
                  Convener: Senior Academic Dean
                </div>
              </div>
            </FadeIn>

            {/* Anti-Ragging Squad */}
            <FadeIn delay={0.12}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold mb-4">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg mb-2">
                    Anti-Ragging Committee &amp; Squad
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Maintains 24/7 vigil across campus corridors, canteens, sports grounds, and hostel wings to ensure a secure, respectful atmosphere.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-purple-700 font-bold">
                  Chief Proctor &amp; Hostel Wardens
                </div>
              </div>
            </FadeIn>

            {/* ICC / POSH */}
            <FadeIn delay={0.18}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold mb-4">
                    <Users size={20} />
                  </div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg mb-2">
                    Internal Complaints Committee (ICC / POSH)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Committed to fostering a gender-sensitive, safe working and learning campus free from gender-based discrimination or harassment.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-purple-700 font-bold">
                  Presiding Officer: Senior Faculty
                </div>
              </div>
            </FadeIn>

          </div>

          {/* Grievance Escalation Mechanism */}
          <FadeIn delay={0.24}>
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm">
              <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl mb-6 flex items-center gap-3">
                <Clock className="text-purple-700 w-6 h-6" />
                Grievance Resolution &amp; Escalation Timeline
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-150">
                  <div className="w-8 h-8 rounded-full bg-purple-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    L1
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">Level 1: Department Mentor / Class Advisor</h4>
                    <p className="text-xs text-slate-500">
                      Informal resolution of academic and classroom issues within <strong>48 hours</strong> of notification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-150">
                  <div className="w-8 h-8 rounded-full bg-purple-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    L2
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">Level 2: Head of Department (HOD) / Student Welfare Officer</h4>
                    <p className="text-xs text-slate-500">
                      Formal review and settlement within <strong>5 working days</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-150">
                  <div className="w-8 h-8 rounded-full bg-purple-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    L3
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">Level 3: Central Grievance Redressal Committee (SGRC) / Principal</h4>
                    <p className="text-xs text-slate-500">
                      Formal hearing, inquiry report, and decisive action within <strong>10 to 15 working days</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Submission Contact Card */}
          <FadeIn delay={0.3}>
            <div className="bg-purple-900 text-white rounded-3xl p-6 md:p-10 shadow-lg">
              <h2 className="font-heading font-extrabold text-xl md:text-2xl mb-2 flex items-center gap-2.5">
                <Send className="text-purple-300 w-6 h-6" />
                How to Submit a Formal Grievance
              </h2>
              <p className="text-slate-200 text-xs md:text-sm leading-relaxed mb-6">
                Students and parents can submit written grievances through any of the following official channels:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-purple-950/70 p-4 rounded-2xl border border-purple-800">
                  <Mail className="text-purple-400 mb-2" size={18} />
                  <span className="font-bold block text-white text-sm mb-1">Official Email</span>
                  <p className="text-slate-300">grievance@{general.website || "sarvadnyavidyapeeth.in"}</p>
                </div>
                <div className="bg-purple-950/70 p-4 rounded-2xl border border-purple-800">
                  <Phone className="text-purple-400 mb-2" size={18} />
                  <span className="font-bold block text-white text-sm mb-1">Campus Helpline</span>
                  <p className="text-slate-300">{general.phone}</p>
                </div>
                <div className="bg-purple-950/70 p-4 rounded-2xl border border-purple-800">
                  <MapPin className="text-purple-400 mb-2" size={18} />
                  <span className="font-bold block text-white text-sm mb-1">Physical Drop Box</span>
                  <p className="text-slate-300">Grievance Drop Box outside Administrative Block</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Back links */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 text-xs">
            <div className="flex items-center gap-4 text-slate-500 font-medium">
              <Link to="/privacy-policy" className="hover:text-purple-800 hover:underline">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms-conditions" className="hover:text-purple-800 hover:underline">Terms &amp; Conditions</Link>
              <span>•</span>
              <Link to="/refund-policy" className="hover:text-purple-800 hover:underline">Refund Policy</Link>
              <span>•</span>
              <Link to="/mandatory-disclosure" className="hover:text-purple-800 hover:underline">Mandatory Disclosure</Link>
            </div>
            <Link to="/" className="text-purple-700 font-bold hover:underline">
              ← Return to Home
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
