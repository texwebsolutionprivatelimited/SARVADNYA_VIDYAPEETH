import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  FileText,
  AlertCircle,
  Send,
  Check,
  ChevronRight,
  Calendar,
  Lock,
  Award,
  MapPin,
  CheckSquare,
  HelpCircle
} from "lucide-react";
import { FadeIn } from "../components/Animations";
import SectionHeading from "../components/SectionHeading";

export default function AdmissionPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "BCA",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Hash anchor scrolling hook
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small timeout to ensure DOM renders first
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  // 6 Admission Steps (Updated to User-provided list)
  const steps = [
    { n: "01", title: "Submit Online/Offline Admission Form", desc: "Fill out our digital admissions enquiry form online or obtain a physical registration brochure at our Patna campus." },
    { n: "02", title: "Document Verification", desc: "Present your original academic certificates (Class 10th & 12th marksheets, certificates) to the counseling panel." },
    { n: "03", title: "Eligibility Confirmation", desc: "The academic evaluation desk validates candidate records against university qualification criteria." },
    { n: "04", title: "Fee Submission / DRCC Process", desc: "Deposit initial college fees to confirm registration or receive bonafide letters to apply for Bihar Student Credit Card." },
    { n: "05", title: "Admission Confirmation", desc: "Receive the formal stamped Admission Offer Letter, university enrollment kit, and official roll code." },
    { n: "06", title: "Orientation & Class Commencement", desc: "Join our student induction program, register for computer laboratory access, and attend regular classes." },
  ];

  // Document checklist for interactive state
  const [docsChecklist, setDocsChecklist] = useState([
    { id: 1, name: "Class 10th Marksheet & School Passing Certificate", checked: false },
    { id: 2, name: "Class 12th / Intermediate Marksheet & Passing Certificate", checked: false },
    { id: 3, name: "Original Migration & Transfer Certificate", checked: false },
    { id: 4, name: "Character Certificate from last school/college", checked: false },
    { id: 5, name: "Aadhaar Card copy of the Student & Parents", checked: false },
    { id: 6, name: "6 recent colored passport-size photographs", checked: false },
    { id: 7, name: "Caste / Income / EWS Certificate (if seeking welfare scholarships)", checked: false },
  ]);

  const toggleDoc = (id) => {
    setDocsChecklist(
      docsChecklist.map((doc) =>
        doc.id === id ? { ...doc, checked: !doc.checked } : doc
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      errors.phone = "Phone must be a valid 10-digit number";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "BCA",
      message: ""
    });
    setIsSubmitted(false);
    setFormErrors({});
  };



  // Fee lists
  const nonResidentialFees = [
    { programme: "BBA (Bachelor of Business Administration)", semester: "Rs. 40,000", admission: "Rs. 10,000", security: "Rs. 5,000", admissionTime: "Rs. 40,000" },
    { programme: "BCA (Bachelor of Computer Applications)", semester: "Rs. 40,000", admission: "Rs. 10,000", security: "Rs. 5,000", admissionTime: "Rs. 40,000" }
  ];

  const residentialFees = [
    { programme: "BBA (Bachelor of Business Administration)", annual: "Rs. 1,20,000", admission: "Rs. 10,000", security: "Rs. 5,000", admissionTime: "Rs. 40,000" },
    { programme: "BCA (Bachelor of Computer Applications)", annual: "Rs. 1,20,000", admission: "Rs. 10,000", security: "Rs. 5,000", admissionTime: "Rs. 40,000" }
  ];

  // Scholarships
  const meritScholarships = [
    { cat: "A", range: ">= 95% Marks in 12th", waiver: "100% Scholarship on Tuition Fees" },
    { cat: "B", range: "90% - 95% Marks in 12th", waiver: "75% Scholarship on Tuition Fees" },
    { cat: "C", range: "80% - 90% Marks in 12th", waiver: "45% Scholarship on Tuition Fees" },
    { cat: "D", range: "70% - 80% Marks in 12th", waiver: "35% Scholarship on Tuition Fees" },
    { cat: "E", range: "60% - 70% Marks in 12th", waiver: "25% Scholarship on Tuition Fees" }
  ];

  const nspSteps = [
    { step: "1", title: "Registration", desc: "Register on the National Scholarship Portal (NSP) or State Scholarship Portal using academic details." },
    { step: "2", title: "Select Category", desc: "Select Post-Matric Scholarship or State Welfare schemes corresponding to your eligibility." },
    { step: "3", title: "Upload Credentials", desc: "Submit your Bonafide Student Certificate and Fee Estimate Sheet provided by our registrar office." },
    { step: "4", title: "Verification", desc: "Our nodal academic officer will verify your application on the institutional portal for disbursement." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-14 sm:pt-16">
      {/* ─── Hero Section ─── */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 lg:pt-28 lg:pb-32 bg-slate-900 overflow-hidden text-white border-b border-slate-800">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src="/images/student_graduation.png"
            alt="Student Graduation"
            className="absolute inset-0 w-full h-full object-cover opacity-40 sm:opacity-45"
          />
        </div>

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />

        {/* Soft Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-purple-500/10 blur-[80px] sm:blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] rounded-full bg-orange-500/10 blur-[80px] sm:blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-20 text-left">
          {/* Top badges */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            <span className="bg-purple-600/90 text-white font-extrabold text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full border border-purple-500 shadow-lg inline-flex items-center gap-1 sm:gap-1.5">
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
              <span className="hidden xs:inline">Affiliated to </span>Aryabhatta University
            </span>
            <span className="bg-white/10 backdrop-blur-md text-white font-extrabold text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full border border-white/20 inline-flex items-center gap-1 sm:gap-1.5">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
              <span className="hidden xs:inline">Beur-Betaura Road, </span>Patna
            </span>
            <span className="bg-amber-500 text-slate-950 font-black text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full shadow-lg inline-flex items-center gap-1 sm:gap-1.5">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
              Admissions Open 2026-27
            </span>
          </div>

          <h1 className="font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight md:leading-none text-white mb-2 uppercase">
            Admission Open 2026 - 2027
          </h1>
          <div className="font-heading text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-purple-200 tracking-wide mb-3 sm:mb-4">
            सर्वज्ञ विद्यापीठ — प्रवेश प्रक्रिया 2026-27
          </div>

          <div className="text-base sm:text-xl md:text-2xl font-extrabold text-amber-300 tracking-wide mb-4 sm:mb-6">
            BCA & BBA Admission Portal
          </div>

          <blockquote className="border-l-4 border-purple-500 pl-3 sm:pl-4 py-1 text-xs sm:text-base md:text-lg font-semibold text-slate-300 italic max-w-3xl mb-6 sm:mb-8">
            "Secure Your Seat in Bihar's Premier IT & Management Institute — Affiliated with Aryabhatta Knowledge University (AKU), Patna"
          </blockquote>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-4xl font-normal">
            Step into a world of endless career opportunities. Sarvadnya Vidyapeeth offers industry-oriented BCA (Bachelor of Computer Applications) and BBA (Bachelor of Business Administration) degree courses. Our campus features cutting-edge laboratory facilities, dynamic curriculum, expert faculty guidance, and 100% placement support with complete Bihar Student Credit Card (BSCC) facilitation.
          </p>
        </div>
      </section>

      {/* ─── Admissions Roadmap & Required Documents Checklist ─── */}
      <section id="procedure" className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <SectionHeading
            tagline="Enrollment Process"
            title="Step-by-Step"
            highlight="Admission Roadmap"
            subtitle="Understand our direct, merit-based entry timeline and check off the required verification files."
            align="center"
          />

          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 mt-8 md:mt-12 items-start text-left">

            {/* Left: 6-Step Timeline */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 lg:space-y-10 min-w-0">
              <div className="space-y-1 md:space-y-2">
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl lg:text-2.5xl font-black text-slate-900">
                  Stepwise Admission Flow
                </h3>
                <p className="text-slate-500 text-xs md:text-sm font-semibold">
                  Follow these six milestones to register your BBA or BCA course seat at the Patna campus:
                </p>
              </div>

              <div className="relative border-l-2 border-purple-200 ml-1 sm:ml-2 md:ml-4 pl-5 sm:pl-6 md:pl-8 space-y-6 md:space-y-7 lg:space-y-8">
                {steps.map((s, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Bullet Node */}
                    <div className="absolute -left-[34px] sm:-left-[40px] md:-left-[48px] top-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-600 text-white font-heading font-black text-[10px] sm:text-xs md:text-sm flex items-center justify-center border-4 border-white shadow-sm">
                      {s.n}
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm md:text-base leading-tight">
                        {s.title}
                      </h4>
                      <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm leading-relaxed font-semibold max-w-xl">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Document checklist card */}
            <div className="lg:col-span-5 bg-slate-50/50 border border-slate-200 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-5 md:space-y-6 sticky top-20 md:top-24 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg sm:rounded-xl">
                  <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="font-heading text-base sm:text-lg md:text-xl font-black text-slate-800">
                  Required Documents Checklist
                </h3>
              </div>

              <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed font-semibold">
                Tap on each certificate below to check it off as you gather files for physical verification at our campus admission desk:
              </p>

              <div className="space-y-2 sm:space-y-2.5">
                {docsChecklist.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => toggleDoc(doc.id)}
                    className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl border text-left transition-all duration-200 ${doc.checked
                        ? "bg-purple-50/40 border-purple-300 shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-400"
                      }`}
                  >
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${doc.checked ? "bg-purple-600 text-white" : "border-2 border-slate-300 bg-white"
                      }`}>
                      {doc.checked && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3.5]" />}
                    </div>
                    <span className={`text-[10px] xs:text-[11px] sm:text-[12px] font-semibold transition-colors leading-snug ${doc.checked ? "text-purple-900 font-extrabold" : "text-slate-600"
                      }`}>
                      {doc.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Fee Structure & Policies Section ─── */}
      <section id="fees" className="py-10 sm:py-12 md:py-16 lg:py-20 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <SectionHeading
            tagline="Academic Investment"
            title="Fee Structure"
            highlight="& Payment Policies"
            subtitle="Sarvadnya Vidyapeeth maintains professional higher education fees affordable to all families."
            align="center"
          />

          {/* Grid for Non-Residential & Residential tables */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-10 lg:mt-12 text-left">

            {/* Non-Residential */}
            <div className="space-y-3 sm:space-y-4 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 sm:w-1.5 sm:h-6 bg-orange-500 rounded-full" />
                <h3 className="font-heading text-base sm:text-lg md:text-xl font-black text-slate-800">
                  Fee Structure (Non-Residential)
                </h3>
              </div>
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[400px] sm:min-w-[450px]">
                    <thead>
                      <tr className="bg-purple-100 text-purple-950">
                        <th className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-heading font-black text-[10px] sm:text-xs">Course</th>
                        <th className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-heading font-black text-[10px] sm:text-xs">Semester Fee</th>
                        <th className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-heading font-black text-[10px] sm:text-xs">Admission Fee</th>
                        <th className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-heading font-black text-[10px] sm:text-xs">At Admission</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[10px] sm:text-xs font-semibold">
                      {nonResidentialFees.map((f, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-bold text-slate-900">{f.programme.split(" ")[0]}</td>
                          <td className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-slate-600">{f.semester}</td>
                          <td className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-slate-600">{f.admission}</td>
                          <td className="px-3 sm:px-4 md:px-5 py-3 sm:py-4">
                            <span className="bg-orange-50 text-orange-700 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-orange-100 text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap">
                              {f.admissionTime}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 italic">
                * Security Deposit of Rs. 5,000/- applicable at entry (refundable upon completion).
              </p>
            </div>

            {/* Residential */}
            <div className="space-y-3 sm:space-y-4 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 sm:w-1.5 sm:h-6 bg-orange-500 rounded-full" />
                <h3 className="font-heading text-base sm:text-lg md:text-xl font-black text-slate-800">
                  Fee Structure (Residential)
                </h3>
              </div>
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[400px] sm:min-w-[450px]">
                    <thead>
                      <tr className="bg-purple-100 text-purple-950">
                        <th className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-heading font-black text-[10px] sm:text-xs">Course</th>
                        <th className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-heading font-black text-[10px] sm:text-xs">Annual Fee</th>
                        <th className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-heading font-black text-[10px] sm:text-xs">Admission Fee</th>
                        <th className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-heading font-black text-[10px] sm:text-xs">At Admission</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[10px] sm:text-xs font-semibold">
                      {residentialFees.map((f, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-bold text-slate-900">{f.programme.split(" ")[0]}</td>
                          <td className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-slate-600">{f.annual}</td>
                          <td className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-slate-600">{f.admission}</td>
                          <td className="px-3 sm:px-4 md:px-5 py-3 sm:py-4">
                            <span className="bg-orange-50 text-orange-700 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-orange-100 text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap">
                              {f.admissionTime}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 italic">
                * Security Deposit of Rs. 5,000/- applicable at entry (refundable upon completion).
              </p>
            </div>

          </div>

          {/* Admission FAQs Section */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-10 text-left">

            {/* General & Eligibility FAQs */}
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6">
              <h4 className="font-heading font-black text-slate-900 text-sm sm:text-base md:text-lg flex items-center gap-2 sm:gap-2.5">
                <div className="p-1.5 sm:p-2 bg-indigo-50 text-indigo-600 rounded-lg sm:rounded-xl flex-shrink-0">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                General & Course Eligibility FAQs
              </h4>

              <div className="space-y-3 sm:space-y-4">
                <div className="border-b border-slate-100 pb-3 sm:pb-4">
                  <h5 className="font-extrabold text-[11px] sm:text-xs md:text-sm text-slate-800 mb-1 sm:mb-1.5">
                    Q: What is the eligibility criteria for BCA & BBA?
                  </h5>
                  <p className="text-slate-500 text-[10px] sm:text-[11px] md:text-xs leading-relaxed font-semibold">
                    For <strong className="text-slate-700">BCA</strong>, candidates must pass Class 12th with Mathematics or Computer Science. For <strong className="text-slate-700">BBA</strong>, candidates from any stream (Science, Commerce, or Arts) are eligible. A minimum of 45% aggregate marks is required.
                  </p>
                </div>

                <div>
                  <h5 className="font-extrabold text-[11px] sm:text-xs md:text-sm text-slate-800 mb-1 sm:mb-1.5">
                    Q: What documents are required during direct admission?
                  </h5>
                  <p className="text-slate-500 text-[10px] sm:text-[11px] md:text-xs leading-relaxed font-semibold">
                    You will need Class 10th and 12th marksheets, school passing certificates, migration certificate, transfer certificate (TC), character certificate, Aadhaar card, and 6 passport-size photographs.
                  </p>
                </div>
              </div>
            </div>

            {/* Financial & Process FAQs */}
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6">
              <h4 className="font-heading font-black text-slate-900 text-sm sm:text-base md:text-lg flex items-center gap-2 sm:gap-2.5">
                <div className="p-1.5 sm:p-2 bg-purple-50 text-purple-600 rounded-lg sm:rounded-xl flex-shrink-0">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                Process & BSCC Support FAQs
              </h4>

              <div className="space-y-3 sm:space-y-4">
                <div className="border-b border-slate-100 pb-3 sm:pb-4">
                  <h5 className="font-extrabold text-[11px] sm:text-xs md:text-sm text-slate-800 mb-1 sm:mb-1.5">
                    Q: Does the college accept Bihar Student Credit Card (BSCC)?
                  </h5>
                  <p className="text-slate-500 text-[10px] sm:text-[11px] md:text-xs leading-relaxed font-semibold">
                    Yes, we provide 100% assistance. Once your admission is registered, our desk issues the official Bonafide Admission Letter and Fee Estimate Sheet required for your DRCC office application.
                  </p>
                </div>

                <div>
                  <h5 className="font-extrabold text-[11px] sm:text-xs md:text-sm text-slate-800 mb-1 sm:mb-1.5">
                    Q: Can I apply online or do I need to visit the campus?
                  </h5>
                  <p className="text-slate-500 text-[10px] sm:text-[11px] md:text-xs leading-relaxed font-semibold">
                    Both options are available. You can fill out the online admission enquiry form on this portal, or visit our counseling desk at the Beur-Betaura Road campus, Patna, for face-to-face guidance.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Scholarships & BSCC Section ─── */}
      <section id="scholarships" className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-left">
          <SectionHeading
            tagline="Financial Aid"
            title="Scholarships &"
            highlight="BSCC Loan Facility"
            subtitle="Ensuring economic inclusivity with government student loans and merit-based institutional waivers."
            align="center"
          />

          {/* BSCC supporting card */}
          <div className="bg-gradient-to-br from-purple-900 to-indigo-950 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-10 text-white shadow-xl relative overflow-hidden border border-purple-800 mt-8 md:mt-10 lg:mt-12">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="grid md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center relative z-10">
              <div className="md:col-span-8 space-y-3 sm:space-y-4">
                <span className="bg-amber-500/20 text-amber-300 font-extrabold text-[8px] sm:text-[9px] md:text-[9.5px] uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full border border-amber-500/30 inline-block">
                  Bihar Student Credit Card (BSCC) Scheme
                </span>
                <h3 className="font-heading font-black text-base sm:text-lg md:text-xl lg:text-2xl text-white">
                  Cooperative DRCC Documentation Desk
                </h3>
                <p className="text-purple-100 text-[10px] sm:text-xs md:text-sm leading-relaxed">
                  Sarvadnya Vidyapeeth Patna provides complete guidance for students securing educational credit under the Bihar State Government credit scheme (up to ₹4 Lakhs at low interest rates). Our Registrar desk issues the official Bonafide Admission Certificate and stamped estimate sheets for rapid DRCC review.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs text-purple-200 font-semibold pt-1">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <CheckSquare className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                    <span>Estimate Letter support</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <CheckSquare className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                    <span>DRCC office guidelines</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-start md:justify-end w-full md:w-auto mt-3 sm:mt-4 md:mt-0">
                <a
                  href="#enquiry"
                  className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 bg-amber-500 hover:bg-amber-600 text-purple-950 font-black text-[10px] sm:text-xs uppercase tracking-wider rounded-lg sm:rounded-xl transition shadow-md w-full md:w-auto text-center"
                >
                  Enquire about BSCC Setup
                </a>
              </div>
            </div>
          </div>

          {/* Detailed BSCC Guidelines */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 text-left">

            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4">
              <h4 className="font-heading font-black text-slate-900 text-sm sm:text-base md:text-lg flex items-center gap-2">
                <span className="w-1 h-5 sm:w-1.5 sm:h-6 bg-purple-700 rounded-full flex-shrink-0" />
                BSCC Scheme Eligibility & Covered Expenses
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 text-[10px] sm:text-xs text-slate-650 font-semibold">
                <li className="flex gap-2">
                  <span className="w-1 h-1 rounded-full bg-purple-700 mt-1.5 flex-shrink-0" />
                  <span><strong>Eligibility:</strong> Student must be a permanent resident of Bihar, under 28 years of age, and must have passed Class 12th from Bihar state boards/schools.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1 h-1 rounded-full bg-purple-700 mt-1.5 flex-shrink-0" />
                  <span><strong>Maximum Funding:</strong> Provides financial support up to ₹4 Lakhs for academic expenses at low-interest rates (1% for girls/differently-abled, 4% for boys).</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1 h-1 rounded-full bg-purple-700 mt-1.5 flex-shrink-0" />
                  <span><strong>Expenses Covered:</strong> Includes full tuition fees, college exam fees, hostel charges/rental accommodation support, and study material/laptop costs.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-3 sm:space-y-4">
              <h4 className="font-heading font-black text-slate-900 text-sm sm:text-base md:text-lg flex items-center gap-2">
                <span className="w-1 h-5 sm:w-1.5 sm:h-6 bg-purple-700 rounded-full flex-shrink-0" />
                Required Documents & Stepwise DRCC Process
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 text-[10px] sm:text-xs text-slate-650 font-semibold">
                <li className="flex gap-2">
                  <span className="w-1 h-1 rounded-full bg-purple-700 mt-1.5 flex-shrink-0" />
                  <span><strong>Step 1:</strong> Secure BCA/BBA admission and collect the official <strong>Bonafide Certificate</strong> and <strong>Fee Estimate Letter</strong> from our desk.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1 h-1 rounded-full bg-purple-700 mt-1.5 flex-shrink-0" />
                  <span><strong>Step 2:</strong> Register online at MNSSBY Portal, select scheme, and visit local DRCC office with physical documents for verification.</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-1 h-1 rounded-full bg-purple-700 mt-1.5 flex-shrink-0" />
                  <span><strong>Documents Needed:</strong> Bonafide Letter, 10th & 12th certificates, residence/domicile proof, income/caste details, Aadhaar card, and photos.</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 mt-8 md:mt-10 lg:mt-12 items-start">

            {/* Merit Scholarship table */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 sm:w-1.5 sm:h-6 bg-purple-700 rounded-full" />
                <h3 className="font-heading text-base sm:text-lg md:text-xl font-black text-slate-800">
                  Sarvadnya Merit Scholarship Table
                </h3>
              </div>
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[400px] sm:min-w-[450px]">
                    <thead>
                      <tr className="bg-purple-100 text-purple-950">
                        <th className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-heading font-black text-[10px] sm:text-xs">Category</th>
                        <th className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-heading font-black text-[10px] sm:text-xs">Class 12th Marks</th>
                        <th className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 font-heading font-black text-[10px] sm:text-xs">Tuition Fee Scholarship</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[10px] sm:text-xs font-semibold">
                      {meritScholarships.map((s, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 font-bold text-slate-800">Cat. {s.cat}</td>
                          <td className="px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 text-[#1E105A]">{s.range}</td>
                          <td className="px-3 sm:px-4 md:px-5 py-3 sm:py-3.5">
                            <span className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 bg-orange-50 text-orange-600 font-extrabold rounded-lg border border-orange-100/50 text-[9px] sm:text-[10px] md:text-xs">
                              {s.waiver}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed font-semibold italic">
                * Scholarship applies strictly on tuition fees. Examination, hostel lodging, and college bus fees must be paid regularly.
              </p>
            </div>

            {/* NSP guide */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 sm:w-1.5 sm:h-6 bg-purple-700 rounded-full" />
                <h3 className="font-heading text-base sm:text-lg md:text-xl font-black text-slate-800">
                  National Scholarship Portal (NSP) Guide
                </h3>
              </div>
              <div className="space-y-2.5 sm:space-y-3 md:space-y-3.5">
                {nspSteps.map((step, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 items-start shadow-sm">
                    <span className="font-black text-[10px] sm:text-xs text-white bg-purple-600 px-2 py-0.5 rounded-lg flex-shrink-0">
                      {step.step}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-slate-900 text-[10px] sm:text-xs md:text-sm leading-tight">{step.title}</h4>
                      <p className="text-slate-500 text-[9px] sm:text-[10px] md:text-[10.5px] leading-relaxed font-semibold">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Timeline / Process Section & Enquiry Form ─── */}
      <section id="enquiry" className="py-10 sm:py-12 md:py-16 lg:py-24 bg-slate-50 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">

            {/* Admissions assistance summary */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 md:space-y-8 min-w-0">
              <div className="space-y-2 sm:space-y-3">
                <span className="text-purple-600 font-bold text-[10px] sm:text-xs uppercase tracking-wider">Admission Cell</span>
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-slate-500 text-[10px] sm:text-xs md:text-sm font-semibold max-w-xl leading-relaxed">
                  We look forward to meeting you and showing you how Sarvadnya Vidyapeeth can help you build a successful global career. Use the helper form on the right to submit your admissions enquiry or schedule a physical campus tour.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5">
                <h4 className="font-heading font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  Assistance Services Available
                </h4>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { title: "Admission Counselling", desc: "Dedicated counselor support to map BCA/BBA program fields." },
                    { title: "Course Selection Guidance", desc: "Evaluating student strengths against industry roles." },
                    { title: "Documentation Support", desc: "Registrar cell assistance for bonafide letters and estimates." },
                    { title: "Bihar Student Credit Card", desc: "Step-by-step guidance on DRCC low-interest financing." },
                    { title: "Government Scheme Awareness", desc: "Awareness sessions regarding NSP and state welfare schemes." }
                  ].map((serv, idx) => (
                    <div key={idx} className="flex gap-2 sm:gap-3 items-start">
                      <div className="p-1 bg-purple-50 text-purple-600 rounded-lg flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <div>
                        <h5 className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">{serv.title}</h5>
                        <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold mt-0.5 leading-snug">{serv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Admission Form */}
            <div className="lg:col-span-5 sticky top-20 md:top-24 min-w-0">
              <FadeIn>
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-lg p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-orange-500" />

                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-4 sm:space-y-5 text-left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="space-y-1">
                          <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900">
                            Admissions Enquiry
                          </h3>
                          <p className="text-slate-400 text-[10px] sm:text-xs font-semibold">
                            Enquire online. Our admission coordinators will contact you within 24 hours.
                          </p>
                        </div>

                        {/* Full Name input */}
                        <div className="space-y-1 sm:space-y-1.5">
                          <label className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1 sm:gap-1.5">
                            <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border bg-slate-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${formErrors.name ? "border-red-400 focus:ring-red-400/20" : "border-slate-200"
                              }`}
                          />
                          {formErrors.name && (
                            <p className="text-[10px] sm:text-[11px] text-red-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        {/* Email input */}
                        <div className="space-y-1 sm:space-y-1.5">
                          <label className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1 sm:gap-1.5">
                            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. name@example.com"
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border bg-slate-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${formErrors.email ? "border-red-400 focus:ring-red-400/20" : "border-slate-200"
                              }`}
                          />
                          {formErrors.email && (
                            <p className="text-[10px] sm:text-[11px] text-red-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              {formErrors.email}
                            </p>
                          )}
                        </div>

                        {/* Phone input */}
                        <div className="space-y-1 sm:space-y-1.5">
                          <label className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1 sm:gap-1.5">
                            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter 10-digit mobile number"
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border bg-slate-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${formErrors.phone ? "border-red-400 focus:ring-red-400/20" : "border-slate-200"
                              }`}
                          />
                          {formErrors.phone && (
                            <p className="text-[10px] sm:text-[11px] text-red-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              {formErrors.phone}
                            </p>
                          )}
                        </div>

                        {/* Course dropdown */}
                        <div className="space-y-1 sm:space-y-1.5">
                          <label className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1 sm:gap-1.5">
                            <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                            Selected Program
                          </label>
                          <div className="relative">
                            <select
                              name="course"
                              value={formData.course}
                              onChange={handleInputChange}
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer"
                            >
                              <option value="BCA">Bachelor of Computer Applications (BCA)</option>
                              <option value="BBA">Bachelor of Business Administration (BBA)</option>
                            </select>
                            <div className="absolute inset-y-0 right-3 sm:right-4 flex items-center pointer-events-none text-slate-500">
                              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-90" />
                            </div>
                          </div>
                        </div>

                        {/* Message input */}
                        <div className="space-y-1 sm:space-y-1.5">
                          <label className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1 sm:gap-1.5">
                            <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                            Any Message / Queries (Optional)
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Write your questions here..."
                            rows={3}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none font-semibold text-slate-700"
                          />
                        </div>

                        {/* Submit button */}
                        <button
                          type="submit"
                          className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider hover:opacity-95 transition shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
                        >
                          <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          Submit Inquiry
                        </button>

                        <div className="flex justify-center items-center gap-1 text-[9px] sm:text-[10px] text-slate-500 mt-1 sm:mt-2 font-medium">
                          <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Your data is secure and confidential.</span>
                        </div>
                      </motion.form>
                    ) : (
                      /* Form Success State Screen */
                      <motion.div
                        key="success"
                        className="py-6 sm:py-8 text-center space-y-4 sm:space-y-5 md:space-y-6 flex flex-col items-center justify-center"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 15 }}
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center border-4 border-green-100 shadow-inner">
                          <Check className="w-8 h-8 sm:w-10 sm:h-10 stroke-[3]" />
                        </div>

                        <div className="space-y-1 sm:space-y-2">
                          <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-black text-slate-900">
                            Thank You!
                          </h3>
                          <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm leading-relaxed max-w-xs mx-auto font-semibold">
                            Your admission inquiry for **{formData.course}** has been successfully submitted.
                          </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 w-full text-left text-[10px] sm:text-xs text-slate-650 space-y-1.5 sm:space-y-2">
                          <div className="flex justify-between">
                            <span className="font-bold text-slate-400">Applicant:</span>
                            <span className="font-semibold text-slate-800">{formData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold text-slate-400">Mobile No:</span>
                            <span className="font-semibold text-slate-800">{formData.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold text-slate-400">Email:</span>
                            <span className="font-semibold text-slate-800">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-bold text-slate-400">Status:</span>
                            <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-200 text-[9px] sm:text-[10px]">Received</span>
                          </div>
                        </div>

                        <p className="text-slate-500 text-[10px] sm:text-[11px] leading-relaxed max-w-xs font-semibold">
                          Our coordinate officers will contact you at **{formData.phone}** or **{formData.email}** shortly.
                        </p>

                        <button
                          onClick={resetForm}
                          className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider rounded-lg sm:rounded-xl transition shadow-sm"
                        >
                          Submit Another Enquiry
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Campus Helpline Block ─── */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white text-center border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 space-y-6 sm:space-y-8">
          <SectionHeading
            tagline="Helpline Desk"
            title="Need Help with"
            highlight="Admissions?"
            subtitle="Connect with our academic counselors directly for assistance regarding admissions, fee details, syllabus, hostels, and DRCC documents."
            align="center"
          />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <a
              href="tel:+919955330733"
              className="bg-white border border-slate-200 hover:border-purple-500 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-sm flex items-center gap-3 sm:gap-4 transition-all duration-300 group hover:shadow-md text-left"
            >
              <div className="p-2 sm:p-3 bg-purple-50 text-purple-600 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Admissions Call</div>
                <div className="text-[10px] sm:text-xs md:text-sm font-extrabold text-slate-800 mt-0.5">+91 99553 30733</div>
              </div>
            </a>

            <a
              href="mailto:admission@sarvadnyavidyapeeth.in"
              className="bg-white border border-slate-200 hover:border-indigo-500 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-sm flex items-center gap-3 sm:gap-4 transition-all duration-300 group hover:shadow-md text-left"
            >
              <div className="p-2 sm:p-3 bg-indigo-50 text-indigo-600 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Admissions Email</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-extrabold text-slate-800 mt-0.5 break-all">admission@sarvadnyavidyapeeth.in</div>
              </div>
            </a>

            <Link
              to="/contact"
              className="bg-white border border-slate-200 hover:border-orange-500 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-sm flex items-center gap-3 sm:gap-4 transition-all duration-300 group hover:shadow-md text-left sm:col-span-2 md:col-span-1"
            >
              <div className="p-2 sm:p-3 bg-orange-50 text-orange-600 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Visit Campus</div>
                <div className="text-[10px] sm:text-xs md:text-sm font-extrabold text-slate-800 mt-0.5">Schedule Campus Tour</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
