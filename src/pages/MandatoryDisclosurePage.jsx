import React from "react";
import { FadeIn } from "../components/Animations";
import { Icons } from "../components/Icons";

export default function MandatoryDisclosurePage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      {/* ─── Hero Banner ─── */}
      <section className="relative pt-16 pb-20 bg-gradient-to-b from-purple-50 via-purple-50/20 to-white text-slate-800 border-b border-purple-100/80 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.08),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="bg-purple-100 text-purple-800 border border-purple-200/50 rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest inline-block mb-3">
            AICTE Regulatory Disclosure
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-black text-purple-950 tracking-tight uppercase">
            Mandatory Disclosures
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base mt-3 font-normal leading-relaxed">
            In compliance with AICTE Approval Process Handbook (APH) regulations, displaying official institutional credentials.
          </p>
        </div>
      </section>

      {/* ─── Main Details ─── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          
          {/* Institutional Credentials */}
          <FadeIn>
            <div className="bg-white rounded-3xl border border-slate-150 p-6 md:p-10 shadow-md">
              <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2.5xl mb-6 pb-3 border-b flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                1. Institutional Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">Name of the Institute</span>
                  <span className="text-slate-800 font-bold text-base">SARVADNYA VIDYAPEETH</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">AICTE Permanent / Application ID</span>
                  <span className="text-slate-800 font-bold text-base">1-47528220043</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">Campus Address</span>
                  <span className="text-slate-800 font-bold text-base">Plot No - 2258, Beur-Betauda Road, Anishabad, Patna (Bihar) - 800002</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">Institution Type</span>
                  <span className="text-slate-800 font-bold text-base">Private-Self Financing</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Society / Trust Details */}
          <FadeIn delay={0.08}>
            <div className="bg-white rounded-3xl border border-slate-150 p-6 md:p-10 shadow-md">
              <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2.5xl mb-6 pb-3 border-b flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                2. Society / Trust Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">Name of the Society / Trust</span>
                  <span className="text-slate-800 font-bold text-base">TINTERN CHARITABLE TRUST</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">Trust Address</span>
                  <span className="text-slate-800 font-semibold text-base leading-relaxed">
                    C/O Ishvarbhai Patel, H.N 102 UT of Dadra Nagar Haveli, Silvassa, Dadra and Nagar Haveli, 396230
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Affiliations & Approvals */}
          <FadeIn delay={0.16}>
            <div className="bg-white rounded-3xl border border-slate-150 p-6 md:p-10 shadow-md">
              <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2.5xl mb-6 pb-3 border-b flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                3. Affiliations &amp; Approvals (2026-27)
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">AICTE Letter of Approval (LoA)</span>
                  <span className="text-slate-800 font-bold text-base block">F.No. Northern /2026-27/1-47528220043</span>
                  <span className="text-orange-600 text-xs font-semibold mt-1 block">Approved on 25-Mar-2026</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">Affiliating University</span>
                  <span className="text-slate-800 font-bold text-base">Aryabhatta Knowledge University, Patna</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Approved Intake and Seat Matrix */}
          <FadeIn delay={0.24}>
            <div className="bg-white rounded-3xl border border-slate-150 p-6 md:p-10 shadow-md overflow-hidden">
              <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2.5xl mb-6 pb-3 border-b flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                4. Approved Courses &amp; Intake Matrix
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-purple-100 text-purple-950">
                      <th className="px-6 py-4.5 font-bold">Level</th>
                      <th className="px-6 py-4.5 font-bold">Program</th>
                      <th className="px-6 py-4.5 font-bold">Course / Degree</th>
                      <th className="px-6 py-4.5 font-bold">Approved Intake (2026-27)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-700">Under Graduate</td>
                      <td className="px-6 py-4 font-semibold text-slate-700">Computer Applications</td>
                      <td className="px-6 py-4 font-bold text-slate-900">BCA (Bachelor of Computer Applications)</td>
                      <td className="px-6 py-4 font-extrabold text-[#1E105A]">180 Seats</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-700">Under Graduate</td>
                      <td className="px-6 py-4 font-semibold text-slate-700">Management</td>
                      <td className="px-6 py-4 font-bold text-slate-900">BBA (Bachelor of Business Administration)</td>
                      <td className="px-6 py-4 font-extrabold text-[#1E105A]">120 Seats</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          {/* Infrastructure & Audits Disclosure */}
          <FadeIn delay={0.32}>
            <div className="bg-white rounded-3xl border border-slate-150 p-6 md:p-10 shadow-md">
              <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2.5xl mb-6 pb-3 border-b flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                5. Regulatory Disclosures &amp; Policies
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-600">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">i. Infrastructure Availability</h4>
                  <p className="leading-relaxed text-xs">
                    All labs, computing networks, and classrooms are set up in compliance with AICTE guidelines. Facilities are audited annually to ensure top instructional standards.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">ii. Anti-Ragging Policy</h4>
                  <p className="leading-relaxed text-xs">
                    The institution maintains a zero-tolerance policy against ragging in any form, following AICTE Regulation 2009 (F.No. 37-3/Legal/AICTE/2009).
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">iii. Financial Audit Statements</h4>
                  <p className="leading-relaxed text-xs">
                    Annual audits are executed by certified Chartered Accountants. Financial records and accounts are open for inspection by authorized regulators.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">iv. Reservation Policy (EWS)</h4>
                  <p className="leading-relaxed text-xs">
                    Admission processes adhere strictly to State and Central Government reservation mandates, including the 10% EWS quota operational from 2026-27.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </div>
  );
}
