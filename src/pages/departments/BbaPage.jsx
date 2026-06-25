import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Calendar, 
  Users, 
  Award, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  TrendingUp, 
  Coins, 
  UserCheck, 
  Lightbulb, 
  Compass,
  FileText
} from "lucide-react";
import { FadeIn, Counter } from "../../components/Animations";
import SectionHeading from "../../components/SectionHeading";

export default function BbaPage() {
  const [openSem, setOpenSem] = useState(1);

  // Quick stats
  const stats = [
    { label: "Duration", value: 3, suffix: " Years", icon: Calendar, desc: "Full-Time UG Course" },
    { label: "Semesters", value: 6, suffix: " Semesters", icon: BookOpen, desc: "Choice Based Credit Sys" },
    { label: "Eligibility", value: "12th Pass", suffix: "", isText: true, icon: GraduationCap, desc: "Any Stream (Min 45%)" },
    { label: "Affiliation", value: "AKU Patna", suffix: "", isText: true, icon: Award, desc: "State Gov University" },
    { label: "Approved Intake", value: 120, suffix: " Seats", icon: Users, desc: "Annual Batch Size" },
  ];

  // Semester subjects details
  const curriculum = [
    {
      sem: 1,
      title: "Semester 1: Foundations of Management",
      subjects: [
        { name: "Principles of Management", desc: "Introduction to organizing, planning, leading, and control theories." },
        { name: "Business Economics (Micro)", desc: "Demand analysis, market structures, price determination, and supply curves." },
        { name: "Financial Accounting", desc: "Journaling, ledger structures, cash books, and preparing balance sheets." },
        { name: "Business Communication Skills", desc: "Verbal/non-verbal communication, letter writing, and professional resumes." },
        { name: "Workshop: Personality Development", desc: "Corporate etiquette, emotional intelligence, and body language." },
      ]
    },
    {
      sem: 2,
      title: "Semester 2: Business Environments",
      subjects: [
        { name: "Organizational Behaviour", desc: "Individual habits, team dynamics, workplace culture, and leadership models." },
        { name: "Business Statistics", desc: "Data collection, averages, dispersion, probability, and hypothesis testing." },
        { name: "Macroeconomics & Policy", desc: "National income accounting, monetary policies, fiscal deficit, and inflation." },
        { name: "Business Law", desc: "Indian Contract Act, Sale of Goods Act, and Consumer Protection laws." },
        { name: "Workshop: Corporate Presentation Skills", desc: "Building slide decks, speaking with confidence, and handling Q&A." },
      ]
    },
    {
      sem: 3,
      title: "Semester 3: Core Functional Areas",
      subjects: [
        { name: "Marketing Management", desc: "4 Ps of marketing, consumer segmenting, positioning, and branding." },
        { name: "Financial Management", desc: "Time value of money, capital budgeting, cost of capital, and leverage." },
        { name: "Human Resource Management", desc: "Recruitment, training, performance appraisals, and employee retention." },
        { name: "Production & Operations Management", desc: "Plant layouts, inventory control, quality checks, and supply chains." },
        { name: "Case Study Seminar: Business Models", desc: "Analyzing real-world management success and failure cases." },
      ]
    },
    {
      sem: 4,
      title: "Semester 4: Research & Systems",
      subjects: [
        { name: "Business Research Methodology", desc: "Research design, questionnaires, sampling distributions, and report writing." },
        { name: "Management Information Systems (MIS)", desc: "Database support for decision making, ERP software, and analytics dashboards." },
        { name: "Consumer Behaviour", desc: "Buyer decision processes, psychological and social influencers of purchasing." },
        { name: "Cost & Management Accounting", desc: "Cost sheets, marginal costing, variance analysis, and budget control." },
        { name: "Practical Lab: Business Analytics Tools", desc: "Introduction to Excel formulas, basic data modeling, and reporting." },
      ]
    },
    {
      sem: 5,
      title: "Semester 5: Strategy & Practical Internship",
      subjects: [
        { name: "Strategic Management", desc: "SWOT analysis, corporate strategies, competitive advantage, and execution." },
        { name: "Entrepreneurship Development", desc: "Generating business ideas, funding avenues, writing business proposals, and compliance." },
        { name: "Specialization Elective-I", desc: "Advanced subject in chosen stream (Marketing, Finance, or Human Resources)." },
        { name: "Specialization Elective-II", desc: "Second Advanced subject in the elected specialization area." },
        { name: "Industrial Summer Internship Project & Viva", desc: "Evaluation of 6-8 weeks summer internship report in a corporate firm." },
      ]
    },
    {
      sem: 6,
      title: "Semester 6: Policy & Capstone Project",
      subjects: [
        { name: "Business Ethics & Corporate Governance", desc: "CSR mandates, ethical codes, whistleblower policies, and board dynamics." },
        { name: "International Business", desc: "Exporting, globalisation, foreign exchange, tariffs, and WTO regulations." },
        { name: "Specialization Elective-III", desc: "Final theoretical course in the elected stream." },
        { name: "Specialization Elective-IV", desc: "Practical/applied elective in the elected stream." },
        { name: "Major Project & Comprehensive Viva", desc: "Full business plan or market research project defense before jury." },
      ]
    }
  ];

  // Specializations Details
  const specializations = [
    { 
      name: "Marketing Management", 
      desc: "Focuses on digital advertising, product management, sales force control, and international marketing research.",
      icon: TrendingUp,
      color: "from-amber-500 to-orange-600"
    },
    { 
      name: "Financial Management", 
      desc: "Focuses on security analysis, portfolio management, banking operations, tax structures, and corporate restructuring.",
      icon: Coins,
      color: "from-orange-500 to-red-600"
    },
    { 
      name: "Human Resource Management", 
      desc: "Focuses on strategic HR planning, industrial relations, labor laws, compensation structuring, and organizational design.",
      icon: UserCheck,
      color: "from-amber-600 to-yellow-600"
    },
    { 
      name: "Entrepreneurship & Innovation", 
      desc: "Focuses on startup creation, venture capital, family business management, and incubating tech prototypes.",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500"
    },
  ];

  // Career opportunities
  const careers = [
    { title: "Business Analyst", icon: Compass, color: "hover:border-amber-400 hover:bg-amber-50 text-amber-700" },
    { title: "Marketing Executive", icon: TrendingUp, color: "hover:border-orange-400 hover:bg-orange-50 text-orange-700" },
    { title: "HR Generalist", icon: UserCheck, color: "hover:border-yellow-500 hover:bg-yellow-50 text-yellow-700" },
    { title: "Financial Analyst", icon: Coins, color: "hover:border-orange-500 hover:bg-orange-50 text-orange-800" },
    { title: "Operations Manager", icon: Briefcase, color: "hover:border-amber-500 hover:bg-amber-50/50 text-amber-800" },
    { title: "Corporate Consultant", icon: Award, color: "hover:border-yellow-600 hover:bg-yellow-50 text-yellow-800" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      {/* ─── Hero Section with Related Background Image & Home-Page Style Overlay ─── */}
      <section className="relative pt-20 pb-28 bg-slate-900 overflow-hidden text-white border-b border-orange-500/20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src="/images/smart_classroom.png"
            alt="Smart Classroom"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
        </div>

        {/* Home page style overlays: left side is dark for text visibility, fading to transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-10" />
        
        {/* Glowing Soft Mesh Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-orange-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 text-left space-y-6">
              {/* Badge label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-950/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                Department of Management Studies
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white">
                Bachelor of <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 bg-clip-text text-transparent">
                  Business Administration
                </span>
              </h1>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
                Shape your career as a strategic business leader. The BBA program at Sarvadnya Vidyapeeth integrates theoretical rigour with experiential corporate case studies, nurturing leadership skills, financial acumen, and startup agility.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/admission"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] shadow-md"
                >
                  Apply Online
                </Link>
                <a
                  href="#curriculum"
                  className="px-8 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-slate-900 transition hover:border-slate-500"
                >
                  View Curriculum
                </a>
              </div>
            </div>

            {/* Right side floating elements */}
            <div className="lg:col-span-4 hidden lg:block relative">
              <div className="relative w-full max-w-[340px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-650 rounded-3xl blur-[30px] opacity-10" />
                <div className="relative border border-slate-800 bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="font-heading font-extrabold text-slate-200">Corporate Edge</span>
                    <Award className="text-orange-500 w-5 h-5" />
                  </div>
                  
                  {[
                    { title: "Case Study Pedagogy", desc: "Harvard Business style analyses" },
                    { title: "100% Industry Exposure", desc: "6-8 weeks summer internship" },
                    { title: "Skill Certifications", desc: "Digital Marketing & Analytics modules" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-slate-200">{item.title}</div>
                        <div className="text-xs text-slate-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Premium Glassmorphic Stats Section ─── */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {stats.map((s, i) => {
              const IconComp = s.icon;
              return (
                <div key={i} className="border-r last:border-0 border-slate-100 px-2 flex flex-col items-center justify-between py-2 group">
                  <div className="p-3 bg-amber-50 rounded-2xl text-orange-600 group-hover:scale-110 transition-transform duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="mt-4">
                    <div className="text-[#1E105A] text-xl md:text-2xl font-black font-heading tracking-tight">
                      {s.isText ? (
                        <span>{s.value}</span>
                      ) : (
                        <Counter end={s.value} suffix={s.suffix} />
                      )}
                    </div>
                    <div className="text-slate-450 text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                  <div className="text-[10px] text-slate-450 mt-1">{s.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ Overview & Objectives Section â”€â”€â”€ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left Content column - Overview */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <FadeIn>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-8 bg-gradient-to-b from-amber-400 to-orange-600 rounded-full" />
                    <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      Program Overview
                    </h2>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify first-letter:text-4xl first-letter:font-black first-letter:text-orange-600 first-letter:mr-2 first-letter:float-left">
                    The Bachelor of Business Administration (BBA) program at Sarvadnya Vidyapeeth is designed to build the next generation of business executives, market experts, and innovative entrepreneurs. Our curriculum combines fundamental academic principles with practical business exposure, ensuring students acquire a deep understanding of corporate systems, financial analytics, consumer insights, and international trade policy.
                  </p>
                  
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
                    By choosing our BBA program, you enter a dynamic learning environment that prioritizes live project analysis, business strategy formulation, and professional skill building. We focus heavily on digital proficiency, communication mastery, and personality transformation to match modern hiring standards.
                  </p>
                </div>
              </FadeIn>

              {/* Specializations Grid */}
              <FadeIn delay={0.15}>
                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-8 bg-gradient-to-b from-amber-400 to-orange-600 rounded-full" />
                    <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      Specializations Offered
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {specializations.map((spec, i) => {
                      const SpecIcon = spec.icon;
                      return (
                        <div 
                          key={i} 
                          className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 group"
                        >
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${spec.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <SpecIcon className="w-6 h-6" />
                          </div>
                          <h4 className="font-heading font-black text-slate-900 text-base md:text-lg mb-2">
                            {spec.name}
                          </h4>
                          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{spec.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Content column - Objectives & Quick Highlights */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <FadeIn>
                <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-md">
                  <h3 className="font-heading font-black text-slate-900 text-lg md:text-xl mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-orange-500" />
                    Programme Objectives
                  </h3>

                  <ul className="space-y-4">
                    {[
                      "Enhance analytical skills and decision-making logic under uncertain scenarios.",
                      "Build global perspective on market policies, international tariffs, and trade regulations.",
                      "Equip students with basic computing and advanced business analytics capabilities.",
                      "Develop interpersonal leadership, strategic presentation, and corporate team dynamics.",
                      "Nurture ethical responsibility, corporate governance standards, and CSR frameworks."
                    ].map((obj, i) => (
                      <li key={i} className="flex gap-3 items-start text-slate-600 text-xs sm:text-sm group">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 group-hover:scale-125 transition-transform flex-shrink-0" />
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Career prospects tag list */}
              <FadeIn delay={0.2}>
                <div className="bg-gradient-to-br from-orange-50/50 via-amber-50/20 to-white rounded-3xl p-6 md:p-8 text-slate-800 shadow-md border border-orange-100/40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-orange-500/5 rounded-bl-full pointer-events-none" />
                  <h3 className="font-heading font-black text-lg mb-6 flex items-center gap-2 text-slate-900">
                    <Briefcase className="w-5 h-5 text-orange-500" />
                    Career Prospects
                  </h3>
                  <div className="flex flex-col gap-2.5 w-full">
                    {careers.map((c, i) => {
                      const IconComp = c.icon;
                      return (
                        <div 
                          key={i} 
                          className="bg-white border border-slate-100 hover:border-orange-500/30 rounded-xl px-4 py-3 shadow-xs flex items-center gap-3 transition-all duration-300 cursor-default group w-full"
                        >
                          <IconComp className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                          <span className="text-xs font-extrabold text-slate-800">{c.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ Detailed Curriculum Accordion â”€â”€â”€ */}
      <section id="curriculum" className="py-24 bg-white border-t border-slate-200/60 scroll-mt-16 text-left">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            tagline="Semester-Wise Course Structure"
            title="Syllabus &amp;"
            highlight="Curriculum Plan"
            subtitle="Explore our comprehensive 6-semester program layout mapped carefully to modern university benchmarks."
            align="center"
          />

          <div className="mt-12 space-y-4">
            {curriculum.map((semData) => {
              const isOpen = openSem === semData.sem;
              return (
                <div 
                  key={semData.sem} 
                  className={`border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
                    isOpen ? "border-orange-200 shadow-md" : "border-slate-100"
                  }`}
                >
                  <button
                    onClick={() => setOpenSem(isOpen ? 0 : semData.sem)}
                    className={`w-full px-6 py-5 flex items-center justify-between text-left font-heading font-bold text-sm md:text-base transition-colors duration-200 ${
                      isOpen ? "bg-orange-50/60 text-orange-955" : "bg-slate-50 text-slate-700 hover:bg-slate-100/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap ${
                        isOpen ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-600"
                      }`}>
                        Sem {semData.sem}
                      </span>
                      <span>{semData.title}</span>
                    </div>
                    <div className={`p-1 rounded-full ${isOpen ? "bg-orange-100 text-orange-600" : "text-slate-400"}`}>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 py-6 bg-white border-t border-slate-100 grid gap-5 md:grid-cols-2">
                          {semData.subjects.map((sub, idx) => (
                            <div 
                              key={idx} 
                              className="p-4 bg-slate-50/70 border border-slate-100/50 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200"
                            >
                              <div className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                {sub.name}
                              </div>
                              <div className="text-slate-500 text-xs leading-relaxed mt-1.5 ml-3.5">
                                {sub.desc}
                              </div>
                            </div>
                          ))}
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

      {/* â”€â”€â”€ Infrastructure Section â”€â”€â”€ */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionHeading
              tagline="Learning Spaces"
              title="Our Campus"
              highlight="Infrastructure"
              subtitle="Explore the collaborative areas and state-of-the-art campus learning spaces supporting BBA academic and research excellence."
              align="center"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { img: "/images/research_mentoring.png", title: "Corporate Mentoring Cell", desc: "Collaborative zones where student start-ups receive mentorship, pitch ideas, and work on case-studies." },
                { img: "/images/seminar_hall.png", title: "Interactive Seminar Hall", desc: "A modern conference hall hosting business presentations, panel debates, and corporate lectures." },
                { img: "/images/auditorium.png", title: "Central Auditorium", desc: "Our massive seating venue for student business leadership summits, talent festivals, and convocations." },
                { img: "/images/cafeteria.png", title: "Student Dining & Cafe", desc: "A clean, modern cafeteria fostering peer discussions, networking, and relaxed study breaks." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-bold bg-orange-600/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-md">Campus Space</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="font-heading font-black text-slate-900 text-sm md:text-base">{item.title}</h4>
                    <p className="text-slate-550 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Admission Call-To-Action (CTA) Section ─── */}
      <section className="py-24 relative overflow-hidden bg-white border-t border-slate-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-orange-100/30 blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/50 border border-orange-100/80 rounded-[2.5rem] px-6 py-10 sm:p-12 md:p-16 shadow-lg space-y-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
            <span className="text-orange-700 text-xs font-black uppercase tracking-widest bg-orange-105 border border-orange-200/50 px-4 py-1.5 rounded-full inline-block">
              Admissions Open 2026-27
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              Ready to Transform Your <br />
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">Professional Future?</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Secure your seat today and prepare for a career filled with corporate achievements. Talk to our career counselors or apply online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 w-full sm:w-auto">
              <Link
                to="/admission"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:opacity-95 transition hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] shadow-md inline-flex items-center justify-center"
              >
                Apply Online Now
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-black text-xs uppercase tracking-wider hover:bg-slate-50 transition shadow-sm inline-flex items-center justify-center"
              >
                Get Free Counseling
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
