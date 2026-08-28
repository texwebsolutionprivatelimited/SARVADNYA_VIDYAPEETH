import React from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "../components/Animations";
import { FileCheck, BookOpen, ShieldAlert, CreditCard, Scale, Award, Info, Mail, Phone } from "lucide-react";
import { useSettings } from "../hooks/useSettings";

export default function TermsConditionsPage() {
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
            <FileCheck size={14} className="text-purple-700" />
            Institutional Regulations &amp; Usage Rules
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-black text-purple-950 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base mt-3 leading-relaxed">
            Please read these terms and conditions carefully before utilizing the Sarvadnya Vidyapeeth website, admission application system, or campus ERP gateway.
          </p>
          <div className="mt-4 text-xs text-slate-500 font-medium">
            Effective &amp; Last Updated: <span className="text-purple-900 font-semibold">{lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* ─── Content Section ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-10">

          {/* Quick Notice Card */}
          <FadeIn>
            <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-2 max-w-3xl">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2.5">
                  <Scale className="text-purple-300 w-6 h-6 flex-shrink-0" />
                  Binding Agreement
                </h2>
                <p className="text-purple-100/90 text-sm leading-relaxed">
                  By accessing, browsing, registering, or submitting information to Sarvadnya Vidyapeeth (operated by Tintern Charitable Trust), you agree to comply with and be bound by the following Terms &amp; Conditions, our Privacy Policy, and institutional bye-laws.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Terms Clauses */}
          <div className="space-y-8">
            
            {/* Clause 1 */}
            <FadeIn delay={0.05}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl mb-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  Admission Eligibility &amp; Enrollment Terms
                </h2>
                <div className="space-y-3 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  <p>
                    All admissions to degree programs including <strong>BCA (Bachelor of Computer Applications)</strong> and <strong>BBA (Bachelor of Business Administration)</strong> are provisional until original academic credentials, certificates, and eligibility proofs are verified by the admissions committee.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                    <li>Applicants must furnish genuine, attested certificates and mark sheets of their 10th and 10+2 examinations.</li>
                    <li>Submission of fraudulent, forged, or altered documents will lead to immediate cancellation of admission and disciplinary action without refund.</li>
                    <li>The institution reserves the right to deny or revoke admission if criteria specified by regulatory bodies (AICTE / State Government) are not met.</li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Clause 2 */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl mb-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  Tuition Fees, Payment Schedules &amp; Financial Dues
                </h2>
                <div className="space-y-3 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  <p>
                    Fee structures are defined per academic year / semester as approved by institutional committees:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <CreditCard size={16} className="text-purple-600 mb-1" />
                      <h4 className="font-bold text-xs uppercase text-slate-800">Due Dates &amp; Installments</h4>
                      <p className="text-xs text-slate-500 mt-1">Semester fees must be remitted on or before the published due date. Late fees will apply after prescribed grace periods.</p>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <BookOpen size={16} className="text-purple-600 mb-1" />
                      <h4 className="font-bold text-xs uppercase text-slate-800">Govt. Scholarship Schemes</h4>
                      <p className="text-xs text-slate-500 mt-1">Students availing Bihar Student Credit Card (BSCC) or state scholarships must adhere to scholarship compliance &amp; verification deadlines.</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 pt-1">
                    * For complete refund policies upon voluntary withdrawal, please review our separate <Link to="/refund-policy" className="text-purple-700 font-bold hover:underline">Fee Refund Policy</Link>.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Clause 3 */}
            <FadeIn delay={0.15}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl mb-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  Student Code of Conduct &amp; Campus Discipline
                </h2>
                <div className="space-y-3 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  <p>
                    Every enrolled student at Sarvadnya Vidyapeeth is required to maintain the highest standards of integrity, civility, and academic honesty:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                    <li><strong>Attendance Requirement:</strong> A minimum of 75% attendance in theory lectures and practical laboratory sessions is mandatory to be eligible for semester examinations.</li>
                    <li><strong>Zero Tolerance for Ragging:</strong> Ragging in any form (physical, verbal, or mental) is strictly prohibited as per Supreme Court directives and AICTE regulations. Violators face immediate suspension, rustication, and police FIR.</li>
                    <li><strong>Campus Property Care:</strong> Willful damage to computer labs, smart classrooms, library books, or hostel property will incur financial recovery penalties along with disciplinary sanctions.</li>
                    <li><strong>Campus Decorum:</strong> Consumption or possession of alcohol, tobacco, narcotics, or contraband substances is strictly forbidden on campus premises and hostel blocks.</li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Clause 4 */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl mb-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                    04
                  </div>
                  Intellectual Property &amp; Website Content Rights
                </h2>
                <div className="space-y-3 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  <p>
                    All materials on this website—including logos, trademarks, text descriptions, promotional imagery, course curricula, graphic designs, software scripts, and institutional branding—are the exclusive intellectual property of Sarvadnya Vidyapeeth and Tintern Charitable Trust.
                  </p>
                  <p>
                    You may not modify, reproduce, distribute, republish, broadcast, or commercialize any asset without prior written authorization from the Registrar.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Clause 5 */}
            <FadeIn delay={0.25}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl mb-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                    05
                  </div>
                  ERP Portal, Online Credentials &amp; System Access
                </h2>
                <div className="space-y-3 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  <p>
                    Students, faculty, and authorized guardians are provided secure credentials to access the ERP portals:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                    <li>Users are solely responsible for safeguarding their login passwords, OTPs, and authentication keys.</li>
                    <li>Any unauthorized attempt to bypass ERP security barriers, access peer accounts, or tamper with grades and attendance logs will result in immediate termination of portal access and criminal prosecution under the IT Act.</li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Clause 6 */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl mb-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                    06
                  </div>
                  Limitation of Liability &amp; Disclaimers
                </h2>
                <div className="space-y-3 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  <p>
                    While Sarvadnya Vidyapeeth takes all reasonable care to ensure accuracy of course fees, notices, dates, and syllabus updates on the website, the physical notifications on college notice boards and official circulars signed by the Principal/Registrar shall remain final.
                  </p>
                  <p>
                    The institution is not liable for technical server downtimes, payment gateway interruptions, or external third-party internet network failures.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Clause 7 */}
            <FadeIn delay={0.35}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl mb-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                    07
                  </div>
                  Governing Law &amp; Legal Jurisdiction
                </h2>
                <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any legal dispute, arbitration, or litigation arising between the institution and any user or student shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>Patna, Bihar, India</strong>.
                </p>
              </div>
            </FadeIn>

            {/* Contact Box */}
            <FadeIn delay={0.4}>
              <div className="bg-purple-50/70 border border-purple-200/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-purple-950 font-bold text-lg">Have questions about our Terms?</h3>
                  <p className="text-slate-600 text-xs md:text-sm mt-1">Our administrative and academic advisory team is available to assist you.</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href={`mailto:${general.email}`}
                    className="inline-flex items-center gap-2 bg-white text-purple-900 border border-purple-200 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors shadow-sm"
                  >
                    <Mail size={14} /> Email Administration
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-purple-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-purple-900 transition-colors shadow-sm"
                  >
                    <Phone size={14} /> Contact Campus
                  </Link>
                </div>
              </div>
            </FadeIn>

          </div>

          {/* Back links */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 text-xs">
            <div className="flex items-center gap-4 text-slate-500 font-medium">
              <Link to="/privacy-policy" className="hover:text-purple-800 hover:underline">Privacy Policy</Link>
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
