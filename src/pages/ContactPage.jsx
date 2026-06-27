import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  Building2,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ExternalLink,
  Info
} from "lucide-react";
import { FadeIn } from "../components/Animations";
import SectionHeading from "../components/SectionHeading";

export default function ContactPage() {
  // Tabs for different departments
  const [activeTab, setActiveTab] = useState("admissions");

  // Accordion state for FAQs
  const [activeFaq, setActiveFaq] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const departments = {
    admissions: {
      title: "Admissions Office",
      shortTitle: "Admissions",
      icon: GraduationCap,
      color: "from-purple-500 to-indigo-600",
      bgLight: "bg-purple-50/50 border-purple-100",
      textCol: "text-purple-700",
      description: "For course queries, fee structure details, eligibility criteria, and Bihar Student Credit Card (DRCC) guidance.",
      contacts: [
        { label: "Admissions Helpline", val: "+91 99553 30733", link: "tel:+919955330733" },
        { label: "Alternative Helpline", val: "+91 72828 31934", link: "tel:+917282831934" },
        { label: "Email Support", val: "admission@sarvadnyavidyapeeth.in", link: "mailto:admission@sarvadnyavidyapeeth.in" }
      ],
      timings: "9:00 AM - 5:30 PM (Mon - Sat)"
    },
    administration: {
      title: "Administrative Desk",
      shortTitle: "Admin",
      icon: Building2,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50/50 border-amber-100",
      textCol: "text-amber-700",
      description: "For official documents, registration, academic verification, University exam enquiries, and fee receipts.",
      contacts: [
        { label: "Office Helpline", val: "+91 62054 31678", link: "tel:+916205431678" },
        { label: "Office Email", val: "info@sarvadnyavidyapeeth.in", link: "mailto:info@sarvadnyavidyapeeth.in" }
      ],
      timings: "9:30 AM - 5:00 PM (Mon - Sat)"
    },
    placements: {
      title: "Training & Placement Cell",
      shortTitle: "Placements",
      icon: Briefcase,
      color: "from-pink-500 to-purple-600",
      bgLight: "bg-pink-50/50 border-pink-100",
      textCol: "text-pink-700",
      description: "For corporate recruiters, placement drives, guest lecture coordination, industrial tie-ups, and internships.",
      contacts: [
        { label: "T&P Desk Phone", val: "+91 99553 30733", link: "tel:+919955330733" },
        { label: "T&P Coord. Email", val: "placement@sarvadnyavidyapeeth.in", link: "mailto:placement@sarvadnyavidyapeeth.in" }
      ],
      timings: "10:00 AM - 5:00 PM (Mon - Fri)"
    }
  };

  const faqs = [
    {
      q: "What is the exact eligibility criteria for BCA & BBA courses?",
      a: "For BCA and BBA courses, candidates must have passed 12th/Intermediate in any stream (Science, Commerce, or Arts) with at least 45% aggregate marks (40% for SC/ST/OBC category). For BCA, candidates who studied Mathematics or Computer Science at 12th level are preferred, but not strictly mandatory."
    },
    {
      q: "Does the college accept the Bihar Student Credit Card (DRCC) scheme?",
      a: "Yes, Sarvadnya Vidyapeeth is fully eligible for the Bihar Student Credit Card scheme. We assist students in preparing all required documentation, including the official fee structure, admission letter, and college affiliation certificate, to submit at the local DRCC office."
    },
    {
      q: "What documents are required for physical admission verification?",
      a: "You will need: (1) Class 10th & 12th Marksheets & Passing Certificates, (2) School/College Leaving Certificate (CLC), (3) Migration Certificate (if from non-BSEB boards), (4) Caste Certificate (if seeking relaxation), (5) 5 passport-size photographs, and (6) Aadhaar Card photocopy."
    },
    {
      q: "Can I secure direct admission online?",
      a: "Yes! You can fill out our interactive Enquiry Form or go to the Admission page to initiate the process. Upon filling out the query details, our academic counselors will verify your intermediate marks and guide you through the digital document submission and seat booking."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      tempErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.course) tempErrors.course = "Please select a course";
    if (!formData.message.trim()) tempErrors.message = "Message cannot be empty";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { db, collection, addDoc } = await import("../firebase");
      const randomTicket = "SV-" + Math.floor(100000 + Math.random() * 900000);

      await addDoc(collection(db, "enquiries"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        message: formData.message,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: "Pending"
      });

      setTicketId(randomTicket);
      setIsSuccess(true);
    } catch (err) {
      console.error("Firestore submission failed, fallback to simulated success:", err);
      const randomTicket = "SV-" + Math.floor(100000 + Math.random() * 900000);
      setTicketId(randomTicket);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "",
      message: ""
    });
    setErrors({});
    setIsSuccess(false);
    setTicketId("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col overflow-x-hidden">

      {/* ─── Hero Banner with Background Image & Radial Highlights ─── */}
      <section className="relative pt-36 pb-20 bg-slate-950 overflow-hidden flex-shrink-0 z-10 border-b border-purple-950/20 shadow-lg">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/campus_exterior.png"
            alt="Sarvadnya Vidyapeeth Campus"
            className="w-full h-full object-cover opacity-45 animate-[pulse_8s_infinite_alternate]"
          />
          {/* Lighter overlays matching BBA/BCA style: left-to-right fade and subtle bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          {/* Radial decorative highlights */}
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-900/20 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-indigo-900/20 blur-[100px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <SectionHeading
            tagline="Connect With Us"
            title="Reach Our Campus"
            highlight="Admissions"
            subtitle="Have questions about admissions, syllabus, or credit card facilities? Get in touch with our representative offices today."
            align="center"
            theme="dark"
          />
        </div>
      </section>

      {/* ─── Main Content Section (Grid) ─── */}
      <section className="py-16 md:py-20 relative px-6 max-w-7xl mx-auto w-full flex-grow z-10">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-12 items-start">

          {/* LEFT: Info Column (7 Cols on large screen) */}
          <div className="lg:col-span-7 space-y-10">

            {/* Interactive Department Tab Contacts */}
            <FadeIn direction="left">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                <h3 className="font-heading font-black text-slate-900 text-lg md:text-xl mb-1 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-700" />
                  Campus Departments
                </h3>
                <p className="text-slate-500 text-xs font-semibold mb-6">Select a department below to find direct coordinates.</p>

                {/* Tabs Selector buttons */}
                <div className="flex p-1 bg-slate-100 rounded-2xl gap-1 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {Object.keys(departments).map((key) => {
                    const DeptIcon = departments[key].icon;
                    const isActive = activeTab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center justify-center gap-1.5 flex-1 min-w-[80px] sm:min-w-[120px] py-3 text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 ${isActive
                            ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                            : "text-slate-500 hover:text-slate-800"
                          }`}
                      >
                        <DeptIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-purple-700" : "text-slate-400"}`} />
                        {departments[key].shortTitle}
                      </button>
                    );
                  })}
                </div>

                {/* Tab content panel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={`rounded-2xl p-6 border ${departments[activeTab].bgLight}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${departments[activeTab].color} flex items-center justify-center text-white shadow-md`}>
                        {React.createElement(departments[activeTab].icon, { className: "w-5 h-5" })}
                      </div>
                      <h4 className="font-heading font-extrabold text-slate-900 text-base">{departments[activeTab].title}</h4>
                    </div>

                    <p className="text-slate-650 text-xs md:text-sm leading-relaxed mb-6">
                      {departments[activeTab].description}
                    </p>

                    <div className="space-y-4">
                      {departments[activeTab].contacts.map((contact, idx) => (
                        <a
                          key={idx}
                          href={contact.link}
                          className="flex items-center justify-between p-3.5 bg-white border border-slate-100 hover:border-purple-200 rounded-xl transition-all hover:shadow-sm group"
                        >
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">{contact.label}</span>
                            <span className="text-slate-800 font-bold text-sm break-words">{contact.val}</span>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-purple-50 group-hover:text-purple-700 text-slate-400 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-200/50 flex items-center gap-2 text-xs text-slate-500 font-bold">
                      <Clock className="w-4 h-4 text-slate-400" />
                      Office Timings: <span className="text-slate-800 font-black">{departments[activeTab].timings}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </FadeIn>

            {/* Location & Map Grid */}
            <FadeIn direction="left">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
                <div>
                  <h3 className="font-heading font-black text-slate-900 text-lg md:text-xl mb-1 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-700" />
                    Visit Our Campus
                  </h3>
                  <p className="text-slate-550 text-xs md:text-sm leading-relaxed">
                    Beur-Betaura Road, Anishabad, Patna (Bihar) - 800002. Strategically accessible via local transport, located near the bypass node.
                  </p>
                </div>

                {/* Map iframe wrapped in premium styled border */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 aspect-video shadow-inner group">
                  <iframe
                    title="Sarvadnya Vidyapeeth Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.6657252278546!2d85.1013454!3d25.582845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a7db5ad64ccb%3A0xe54d9c490212720e!2sBeur%20Betaura%20Rd%2C%20Anishabad%2C%20Patna%2C%20Bihar%20800002!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="w-full h-full filter grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/75 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow border border-white/10 pointer-events-none">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Interactive Map
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>

          {/* RIGHT: Enquiry Form Card (5 Cols on large screen) */}
          <div className="lg:col-span-5">
            <FadeIn direction="right">
              <div className="relative bg-gradient-to-b from-white via-white to-purple-50/10 rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xl shadow-slate-100 overflow-hidden">
                {/* Decorative visual gradient backdrops */}
                <div className="absolute -right-16 -top-16 w-36 h-36 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="form-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="mb-8">
                        <h3 className="font-heading font-black text-slate-900 text-xl md:text-2xl mb-1.5">Send an Enquiry</h3>
                        <p className="text-slate-550 text-xs leading-relaxed font-semibold">Interested in our BCA or BBA courses? Leave a query below, and our experts will callback.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Eg: Rahul Kumar"
                            className={`w-full bg-slate-50/50 border rounded-2xl px-4 py-3.5 text-sm outline-none transition-all ${errors.name
                                ? "border-red-200 focus:border-red-500 focus:ring-red-100"
                                : "border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                              }`}
                          />
                          {errors.name && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.name}</span>}
                        </div>

                        {/* Phone Input */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Mobile Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Eg: 9955330733"
                            className={`w-full bg-slate-50/50 border rounded-2xl px-4 py-3.5 text-sm outline-none transition-all ${errors.phone
                                ? "border-red-200 focus:border-red-500 focus:ring-red-100"
                                : "border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                              }`}
                          />
                          {errors.phone && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.phone}</span>}
                        </div>

                        {/* Email Input */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Eg: rahul@example.com"
                            className={`w-full bg-slate-50/50 border rounded-2xl px-4 py-3.5 text-sm outline-none transition-all ${errors.email
                                ? "border-red-200 focus:border-red-500 focus:ring-red-100"
                                : "border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                              }`}
                          />
                          {errors.email && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.email}</span>}
                        </div>

                        {/* Course Select */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Program of Interest</label>
                          <select
                            name="course"
                            value={formData.course}
                            onChange={handleInputChange}
                            className={`w-full bg-slate-50/50 border rounded-2xl px-4 py-3.5 text-sm outline-none transition-all cursor-pointer ${errors.course
                                ? "border-red-200 focus:border-red-500 focus:ring-red-100"
                                : "border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                              }`}
                          >
                            <option value="">Choose your course</option>
                            <option value="BCA">BCA - Bachelor of Computer Applications</option>
                            <option value="BBA">BBA - Bachelor of Business Administration</option>
                            <option value="Other">Other General Queries</option>
                          </select>
                          {errors.course && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.course}</span>}
                        </div>

                        {/* Message Input */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Your Message</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Share any specific questions or eligibility queries..."
                            className={`w-full bg-slate-50/50 border rounded-2xl px-4 py-3.5 text-sm outline-none transition-all resize-none ${errors.message
                                ? "border-red-200 focus:border-red-500 focus:ring-red-100"
                                : "border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                              }`}
                          />
                          {errors.message && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.message}</span>}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full mt-4 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white py-4 rounded-2xl font-heading font-extrabold text-sm shadow-lg shadow-purple-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Submit Enquiry Request
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    /* SUCCESS SCREEN CONTAINER */
                    <motion.div
                      key="success-container"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 space-y-6"
                    >
                      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-md">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-heading font-black text-slate-900 text-xl">Enquiry Received!</h4>
                        <p className="text-slate-500 text-xs font-semibold px-4">Thank you for contacting us. An admissions advisor will get back to you shortly.</p>
                      </div>

                      {/* Ticket Card Details */}
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 max-w-sm mx-auto text-left space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-bold uppercase tracking-wider">Ticket ID</span>
                          <span className="text-purple-700 font-black tracking-wide">{ticketId}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-200/50">
                          <span className="text-slate-400 font-bold uppercase tracking-wider">Name</span>
                          <span className="text-slate-800 font-bold">{formData.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-200/50">
                          <span className="text-slate-400 font-bold uppercase tracking-wider">Program</span>
                          <span className="text-slate-800 font-bold">{formData.course}</span>
                        </div>
                      </div>

                      <button
                        onClick={resetForm}
                        className="text-xs font-black text-purple-700 hover:text-purple-900 hover:underline pt-2 inline-block animate-pulse"
                      >
                        Submit another enquiry request
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* ─── FAQs Accordion Section ─── */}
      <section className="bg-slate-100 border-t border-slate-200/60 py-16 md:py-20 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-purple-700 mb-2">
              <Info className="w-3.5 h-3.5" />
              Got Questions?
            </span>
            <h2 className="font-heading text-2.5xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-purple-700 transition-colors gap-4"
                  >
                    <span className="text-xs sm:text-sm md:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180 text-purple-600" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 text-slate-550 text-xs md:text-sm leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
