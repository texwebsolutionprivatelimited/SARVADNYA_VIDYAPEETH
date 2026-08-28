import React from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "../components/Animations";
import { RefreshCcw, DollarSign, Calendar, CheckCircle2, AlertTriangle, FileText, ArrowRight, HelpCircle, Mail, Phone } from "lucide-react";
import { useSettings } from "../hooks/useSettings";

export default function RefundPolicyPage() {
  const { settings } = useSettings();
  const { general } = settings;

  const lastUpdated = "April 15, 2026";

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      {/* ─── Hero Banner ─── */}
      <section className="relative pt-16 pb-20 bg-gradient-to-b from-purple-50 via-purple-50/20 to-white text-slate-800 border-b border-purple-100/80 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.06),transparent)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100/80 border border-purple-200/60 rounded-full px-4 py-1.5 text-xs font-bold text-purple-800 uppercase tracking-wider mb-4 shadow-sm">
            <RefreshCcw size={14} className="text-purple-700" />
            UGC &amp; AICTE Compliant Policy
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-black text-purple-950 tracking-tight">
            Fee Refund &amp; Cancellation Policy
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base mt-3 leading-relaxed">
            Clear, transparent guidelines regarding admission cancellation, tuition fee refund slabs, hostel fee adjustments, and security deposit returns.
          </p>
          <div className="mt-4 text-xs text-slate-500 font-medium">
            Effective &amp; Last Updated: <span className="text-purple-900 font-semibold">{lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* ─── Content Section ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-10">

          {/* Core Principle Banner */}
          <FadeIn>
            <div className="bg-white rounded-3xl border border-purple-200/80 p-6 md:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs uppercase font-extrabold tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full inline-block">
                  Regulatory Compliance
                </span>
                <h2 className="text-lg md:text-xl font-bold text-slate-900">
                  Adherence to Higher Education Regulatory Guidelines
                </h2>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  Sarvadnya Vidyapeeth implements a student-centric refund policy in strict alignment with guidelines issued by the All India Council for Technical Education (AICTE) and the University Grants Commission (UGC) for non-technical and professional undergraduate programs.
                </p>
              </div>
              <Link
                to="/admission#fees"
                className="inline-flex items-center gap-2 bg-purple-900 text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-purple-800 transition-colors flex-shrink-0 shadow-sm"
              >
                View Fee Structure <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>

          {/* Refund Slabs Table */}
          <FadeIn delay={0.08}>
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-100">
                <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl flex items-center gap-2.5">
                  <DollarSign className="text-purple-700 w-6 h-6" />
                  Tuition Fee Refund Matrix (Academic Year 2026-27)
                </h2>
                <p className="text-slate-500 text-xs md:text-sm mt-1">
                  Percentage refund applicable based on the formal written date of admission cancellation request:
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-purple-100/70 text-purple-950">
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Sr.</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Cancellation Request Timing</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Refundable Tuition Percentage</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Deduction / Processing Charges</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-purple-50/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-purple-900">01</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        15 days or more prior to the formally notified last date of admission
                      </td>
                      <td className="px-6 py-4 font-extrabold text-emerald-600">
                        100% of Tuition &amp; College Fees
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        Max ₹1,000 as processing charges
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-purple-900">02</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        Less than 15 days prior to the formally notified last date of admission
                      </td>
                      <td className="px-6 py-4 font-extrabold text-blue-600">
                        90% Refund
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        10% of aggregate fees retained
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-purple-900">03</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        Within 15 days after the formally notified last date of admission
                      </td>
                      <td className="px-6 py-4 font-extrabold text-amber-600">
                        80% Refund
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        20% of aggregate fees retained
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-purple-900">04</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        Between 16 and 30 days after the formally notified last date of admission
                      </td>
                      <td className="px-6 py-4 font-extrabold text-orange-600">
                        50% Refund
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        50% of aggregate fees retained
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-50/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-purple-900">05</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        More than 30 days after the formally notified last date of admission
                      </td>
                      <td className="px-6 py-4 font-bold text-rose-600">
                        0% (No Tuition Refund)
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        Only Caution / Security deposit refundable
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Other Categories & Terms */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Hostel & Mess Refund */}
            <FadeIn delay={0.12}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg md:text-xl mb-3 flex items-center gap-2">
                    <span className="w-2 h-5 bg-purple-600 rounded-full" />
                    Hostel &amp; Mess Fees Refund
                  </h3>
                  <div className="space-y-2.5 text-xs md:text-sm text-slate-600 leading-relaxed">
                    <p>
                      <strong>Before Room Occupancy:</strong> If a student cancels hostel booking before physical room allotment, the hostel accommodation and mess charges will be refunded in full after deducting a ₹500 administrative processing fee.
                    </p>
                    <p>
                      <strong>After Room Occupancy:</strong> Mess charges are calculated on a pro-rata monthly basis for unconsumed months. Room rent for the current semester is non-refundable once occupied.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-purple-700 font-semibold">
                  <CheckCircle2 size={15} /> Validated by Hostel Warden Office
                </div>
              </div>
            </FadeIn>

            {/* Security Deposit Return */}
            <FadeIn delay={0.16}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg md:text-xl mb-3 flex items-center gap-2">
                    <span className="w-2 h-5 bg-purple-600 rounded-full" />
                    Security &amp; Caution Deposit Refund
                  </h3>
                  <div className="space-y-2.5 text-xs md:text-sm text-slate-600 leading-relaxed">
                    <p>
                      <strong>100% Refundable:</strong> Caution deposits collected at the time of admission (library deposit, lab caution fee) are 100% refundable upon completion of the course or upon formal withdrawal.
                    </p>
                    <p>
                      <strong>No Dues Clearance:</strong> Refund of caution money requires clearance from the Central Library, Computer Labs, Accounts Section, and Hostel Warden.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-purple-700 font-semibold">
                  <CheckCircle2 size={15} /> 100% Refundable Caution Money
                </div>
              </div>
            </FadeIn>

          </div>

          {/* Refund Application Procedure */}
          <FadeIn delay={0.2}>
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm">
              <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl mb-6 flex items-center gap-3">
                <FileText className="text-purple-700 w-6 h-6" />
                Step-by-Step Refund Application Procedure
              </h2>

              <div className="grid sm:grid-cols-4 gap-4">
                <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 relative">
                  <span className="text-purple-800 font-black text-2xl mb-1 block">01</span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Submit Application</h4>
                  <p className="text-xs text-slate-500">Submit the official withdrawal form along with original fee receipts to the Admission Office.</p>
                </div>

                <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 relative">
                  <span className="text-purple-800 font-black text-2xl mb-1 block">02</span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Department NOC</h4>
                  <p className="text-xs text-slate-500">Obtain No-Objection Certificates (NOC) from library, lab in-charges, and hostel warden.</p>
                </div>

                <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 relative">
                  <span className="text-purple-800 font-black text-2xl mb-1 block">03</span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Audit &amp; Approval</h4>
                  <p className="text-xs text-slate-500">Accounts section verifies fee ledger and computes eligible refund slab.</p>
                </div>

                <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 relative">
                  <span className="text-purple-800 font-black text-2xl mb-1 block">04</span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Electronic Transfer</h4>
                  <p className="text-xs text-slate-500">Approved funds are directly credited via NEFT/RTGS to the student/parent bank account within 15 working days.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Non-Refundable Components & Notice */}
          <FadeIn delay={0.24}>
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 md:p-8 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs md:text-sm text-slate-700">
                <h4 className="font-bold text-amber-950 text-base">Non-Refundable Components</h4>
                <p>
                  Application registration fees (₹500 / ₹1,000), prospectus costs, fine penalties for disciplinary action, and entrance test fees are non-refundable under any circumstances.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Refund Helpdesk */}
          <FadeIn delay={0.28}>
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold">Need Help with Refund Status?</h3>
                <p className="text-slate-300 text-xs md:text-sm mt-1">Our Finance &amp; Accounts department handles queries between 10:00 AM and 4:30 PM (Mon-Sat).</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={`mailto:${general.email}`}
                  className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <Mail size={14} /> accounts@{general.website || "sarvadnyavidyapeeth.in"}
                </a>
                <a
                  href={`tel:${general.phone}`}
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors border border-slate-700"
                >
                  <Phone size={14} /> {general.phone}
                </a>
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
