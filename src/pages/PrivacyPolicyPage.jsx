import React from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "../components/Animations";
import { ShieldCheck, Lock, Eye, FileText, Database, UserCheck, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import { useSettings } from "../hooks/useSettings";

export default function PrivacyPolicyPage() {
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
            <ShieldCheck size={14} className="text-purple-700" />
            Institutional Governance &amp; Data Security
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-black text-purple-950 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base mt-3 leading-relaxed">
            How Sarvadnya Vidyapeeth collects, uses, protects, and handles your personal information across our website, admission portal, and student ERP systems.
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
            <div className="bg-purple-900 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-purple-700/30 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2.5">
                    <Lock className="text-purple-300 w-6 h-6 flex-shrink-0" />
                    Commitment to Data Privacy
                  </h2>
                  <p className="text-purple-100/90 text-sm leading-relaxed">
                    Sarvadnya Vidyapeeth (managed under Tintern Charitable Trust) strictly adheres to the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000. We ensure transparency and robust security for all students, parents, alumni, and faculty.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="bg-white text-purple-950 font-bold text-xs uppercase px-5 py-3 rounded-xl hover:bg-purple-50 transition-colors flex-shrink-0 shadow-sm"
                >
                  Contact DPO
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Policy Clauses */}
          <div className="space-y-8">
            
            {/* Clause 1 */}
            <FadeIn delay={0.05}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl mb-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  Information We Collect
                </h2>
                <div className="space-y-4 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  <p>
                    When you visit our website, submit admission applications, make fee payments, or access the Campus ERP gateway, we may collect the following categories of information:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 pt-2">
                    <li className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <UserCheck size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-slate-800 block text-xs uppercase tracking-wide">Personal Details</strong>
                        Full name, date of birth, gender, category, parent/guardian names, and photograph.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <Mail size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-slate-800 block text-xs uppercase tracking-wide">Contact Information</strong>
                        Email address, mobile numbers, permanent and correspondence postal addresses.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <FileText size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-slate-800 block text-xs uppercase tracking-wide">Academic Records</strong>
                        10th/12th marks, roll numbers, transfer certificates, migration proofs, and entrance exam scores.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <Database size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-slate-800 block text-xs uppercase tracking-wide">Technical Logs</strong>
                        IP address, device specifications, browser type, referral URLs, and session cookies.
                      </div>
                    </li>
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
                  Purpose &amp; Use of Collected Information
                </h2>
                <div className="space-y-3 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  <p>
                    The collected information is utilized strictly for institutional, educational, and statutory obligations, including:
                  </p>
                  <div className="space-y-2.5 pl-2">
                    <div className="flex items-baseline gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                      <span>Processing enrollment and admission verification for academic courses (BCA, BBA).</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                      <span>Transmitting mandatory academic and intake records to regulatory authorities including AICTE and Bihar State regulatory bodies.</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                      <span>Providing student login access to the internal ERP portal for attendance, timetables, internal assessments, and study materials.</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                      <span>Sending critical academic updates, exam notifications, emergency alerts, and placement opportunities via SMS, Email, and WhatsApp.</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                      <span>Processing online admission application fees, tuition installments, and semester dues via certified payment gateways.</span>
                    </div>
                  </div>
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
                  Data Sharing &amp; Third-Party Disclosures
                </h2>
                <div className="space-y-3 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  <p className="font-semibold text-slate-800">
                    We do not sell, trade, or commercialize your personal information to any third-party marketing companies.
                  </p>
                  <p>
                    Information is shared only under specific authorized circumstances:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                    <li><strong className="text-slate-700">Government &amp; Regulatory Bodies:</strong> AICTE, State Higher Education Councils, university affiliations, and government scholarship verification portals (such as Bihar Student Credit Card / BSCC).</li>
                    <li><strong className="text-slate-700">Financial Gateways:</strong> PCI-DSS certified payment service providers for secure payment transaction verification.</li>
                    <li><strong className="text-slate-700">Recruitment &amp; Placement Partners:</strong> Student resumes and academic profiles are shared with verified recruitment partners only upon explicit consent for placement drives.</li>
                    <li><strong className="text-slate-700">Legal Mandates:</strong> Where disclosure is required by lawful court orders, law enforcement requests, or statutory obligations.</li>
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
                  Data Security &amp; Storage Protections
                </h2>
                <div className="space-y-3 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  <p>
                    Sarvadnya Vidyapeeth implements strict industry-standard technical, organizational, and physical security measures:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 pt-2">
                    <div className="border border-purple-100 rounded-2xl p-4 bg-purple-50/40">
                      <Lock size={18} className="text-purple-700 mb-2" />
                      <h3 className="font-bold text-xs uppercase text-slate-800 mb-1">SSL 256-Bit Encryption</h3>
                      <p className="text-xs text-slate-500">All data transit across our web endpoints is protected with modern HTTPS/TLS cryptography.</p>
                    </div>
                    <div className="border border-purple-100 rounded-2xl p-4 bg-purple-50/40">
                      <ShieldCheck size={18} className="text-purple-700 mb-2" />
                      <h3 className="font-bold text-xs uppercase text-slate-800 mb-1">Role-Based Access</h3>
                      <p className="text-xs text-slate-500">Strict least-privilege access rules ensure only designated administrative personnel view sensitive records.</p>
                    </div>
                    <div className="border border-purple-100 rounded-2xl p-4 bg-purple-50/40">
                      <Database size={18} className="text-purple-700 mb-2" />
                      <h3 className="font-bold text-xs uppercase text-slate-800 mb-1">Encrypted Backups</h3>
                      <p className="text-xs text-slate-500">Regular audited backups prevent data corruption and ensure institutional continuity.</p>
                    </div>
                  </div>
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
                  Cookies &amp; Analytics
                </h2>
                <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">
                  We use necessary session cookies and analytics beacons to improve user experience, remember login states in the ERP, and evaluate traffic patterns. You may configure your browser to disable cookies; however, certain portal modules (such as live student dashboards) may require cookies for authentication.
                </p>
              </div>
            </FadeIn>

            {/* Clause 6 */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="font-heading font-extrabold text-slate-900 text-xl md:text-2xl mb-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                    06
                  </div>
                  Your Rights &amp; Data Rectification
                </h2>
                <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed mb-3">
                  Enrolled students, alumni, and applicants hold the right to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm md:text-[15px]">
                  <li>Request a copy of their recorded personal profile and academic logs.</li>
                  <li>Request correction or rectification of outdated contact details or erroneous personal entries through the Registrar office.</li>
                  <li>Withdraw consent for optional communications, marketing broadcasts, or newsletter distributions.</li>
                </ul>
              </div>
            </FadeIn>

            {/* Clause 7: Grievance Officer */}
            <FadeIn delay={0.35}>
              <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-lg">
                <h2 className="font-heading font-extrabold text-xl md:text-2xl mb-2 flex items-center gap-2.5">
                  <AlertCircle className="text-purple-400 w-6 h-6" />
                  Grievance Redressal &amp; Privacy Officer
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  In compliance with Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, you may address any data privacy concerns, grievances, or correction queries to:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                    <span className="text-purple-400 font-bold block text-[11px] uppercase tracking-wider mb-1">Designated Officer</span>
                    <p className="font-bold text-white text-base">Registrar / Privacy Grievance Cell</p>
                    <p className="text-slate-300 mt-1">{general.collegeName}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{general.address}</p>
                  </div>
                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
                    <span className="text-purple-400 font-bold block text-[11px] uppercase tracking-wider mb-1">Direct Contact</span>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail size={14} className="text-purple-400" />
                      <a href={`mailto:${general.email}`} className="hover:text-purple-300 transition-colors">{general.email}</a>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone size={14} className="text-purple-400" />
                      <a href={`tel:${general.phone}`} className="hover:text-purple-300 transition-colors">{general.phone}</a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>

          {/* Back links */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 text-xs">
            <div className="flex items-center gap-4 text-slate-500 font-medium">
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
