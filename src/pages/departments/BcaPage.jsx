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
  Code2, 
  Database, 
  Globe, 
  Cpu, 
  Wifi, 
  Cloud,
  Terminal,
  FileText
} from "lucide-react";
import { FadeIn, Counter } from "../../components/Animations";
import SectionHeading from "../../components/SectionHeading";

export default function BcaPage() {
  const [openSem, setOpenSem] = useState(1);

  // Quick stats
  const stats = [
    { label: "Duration", value: 3, suffix: " Years", icon: Calendar, desc: "Full-Time UG Course" },
    { label: "Semesters", value: 6, suffix: " Semesters", icon: BookOpen, desc: "Choice Based Credit Sys" },
    { label: "Eligibility", value: "12th Pass", suffix: "", isText: true, icon: GraduationCap, desc: "Any Stream (Min 45%)" },
    { label: "Affiliation", value: "AKU Patna", suffix: "", isText: true, icon: Award, desc: "State Gov University" },
    { label: "Approved Intake", value: 180, suffix: " Seats", icon: Users, desc: "Annual Batch Size" },
  ];

  // Semester subjects details
  const curriculum = [
    {
      sem: 1,
      title: "Semester 1: Foundations of Computing",
      subjects: [
        { name: "Computer Fundamentals & Office Automation", desc: "Understanding hardware, OS basics, and standard office suites." },
        { name: "Programming in C", desc: "Foundational syntax, loops, functions, and control flow in C." },
        { name: "Mathematical Foundations", desc: "Discrete mathematics, set theory, and basic algebra." },
        { name: "Business Communication", desc: "Writing reports, professional correspondence, and presentation skills." },
        { name: "Practical Lab: C Programming & Office Tools", desc: "Hands-on implementation of C programs and documentation tools." },
      ]
    },
    {
      sem: 2,
      title: "Semester 2: Data Structures & OOPs",
      subjects: [
        { name: "Data Structures using C", desc: "Linked lists, stacks, queues, trees, and searching/sorting algorithms." },
        { name: "Object Oriented Programming using C++", desc: "Classes, objects, inheritance, polymorphism, and encapsulation." },
        { name: "Operating System Concepts", desc: "Process scheduling, memory management, file systems, and security." },
        { name: "Environmental Studies", desc: "Ecological balances, conservation, and sustainable development." },
        { name: "Practical Lab: OOPs & Data Structures Lab", desc: "Developing object-oriented applications and structure manipulation." },
      ]
    },
    {
      sem: 3,
      title: "Semester 3: Core Database & Enterprise Programming",
      subjects: [
        { name: "Database Management Systems (DBMS)", desc: "Relational database models, SQL, normalization, and transactions." },
        { name: "Core Java Programming", desc: "JVM architecture, multi-threading, exceptions, and event handling." },
        { name: "Computer Organization & Architecture", desc: "CPU design, instruction sets, memory hierarchy, and I/O." },
        { name: "Financial Accounting & Management", desc: "Double-entry bookkeeping, balance sheets, and budgeting." },
        { name: "Practical Lab: SQL & Core Java Lab", desc: "Writing complex queries, triggers, and building Java applications." },
      ]
    },
    {
      sem: 4,
      title: "Semester 4: Networks & Web Technologies",
      subjects: [
        { name: "Computer Networks", desc: "OSI and TCP/IP models, routing protocols, and wireless networking." },
        { name: "Web Technologies (HTML/CSS/JavaScript)", desc: "Static and dynamic page construction, DOM manipulation, and responsive styling." },
        { name: "Software Engineering", desc: "SDLC methodologies, Agile processes, testing types, and design patterns." },
        { name: "Numerical & Statistical Methods", desc: "Probability, regression analysis, and computational math." },
        { name: "Practical Lab: Web Development & Networking Lab", desc: "Creating fully responsive web designs and network configuration labs." },
      ]
    },
    {
      sem: 5,
      title: "Semester 5: Advanced Python & Cloud Architectures",
      subjects: [
        { name: "Python Programming", desc: "Data structures in Python, packages, file operations, and data science libraries." },
        { name: "Cloud Computing Fundamentals", desc: "SaaS, PaaS, IaaS concepts, AWS/Azure service overviews, and virtualization." },
        { name: "Mobile Application Development", desc: "Creating Android/iOS apps, user interface layouts, and API integrations." },
        { name: "Elective-I: Artificial Intelligence / Big Data", desc: "Introduction to machine learning, neural networks, or massive datasets." },
        { name: "Practical Lab: Python & Mobile App Lab", desc: "Coding Python scripting automation and deploying mobile apps." },
      ]
    },
    {
      sem: 6,
      title: "Semester 6: Security & Industry Capstone",
      subjects: [
        { name: "Information & Cyber Security", desc: "Cryptography, network defense, firewalls, and security policies." },
        { name: "E-Commerce & Digital Marketing", desc: "Online transaction models, SEO, Google analytics, and payment gateways." },
        { name: "Elective-II: Software Testing / IoT", desc: "Automated test suites or programming connected smart devices." },
        { name: "Major Project & Comprehensive Viva", desc: "Industry-standard full stack project development and oral examination." },
      ]
    }
  ];

  // Labs details
  const labs = [
    { 
      name: "Programming & Logic Lab", 
      desc: "Equipped with high-performance compilers for C, C++, Java, and Python languages.",
      icon: Code2,
      color: "from-purple-500 to-indigo-600"
    },
    { 
      name: "Database & SQL Server Room", 
      desc: "Configured with MySQL, PostgreSQL, and Oracle Server for data storage labs.",
      icon: Database,
      color: "from-indigo-500 to-blue-600"
    },
    { 
      name: "Advanced Web & Networking Lab", 
      desc: "Configured routers and switches with high speed connections for testing distributed servers.",
      icon: Wifi,
      color: "from-purple-600 to-blue-600"
    },
    { 
      name: "Project & Incubation Lab", 
      desc: "Dedicated work spaces for final year capstone projects, startup prototypes, and AI models.",
      icon: Terminal,
      color: "from-indigo-600 to-purple-800"
    },
  ];

  // Career opportunities
  const careers = [
    { title: "Software Engineer", icon: Code2, color: "hover:border-purple-400 hover:bg-purple-50 text-purple-700" },
    { title: "Web Developer", icon: Globe, color: "hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700" },
    { title: "Database Administrator", icon: Database, color: "hover:border-blue-500 hover:bg-blue-50 text-blue-700" },
    { title: "System Analyst", icon: Cpu, color: "hover:border-indigo-500 hover:bg-indigo-50 text-indigo-800" },
    { title: "Network Architect", icon: Wifi, color: "hover:border-purple-500 hover:bg-purple-50/50 text-purple-800" },
    { title: "Cloud Specialist", icon: Cloud, color: "hover:border-blue-600 hover:bg-blue-50 text-blue-800" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      {/* ─── Hero Section with Related Background Image & Home-Page Style Overlay ─── */}
      <section className="relative pt-20 pb-28 bg-slate-900 overflow-hidden text-white border-b border-purple-500/20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src="/images/computer_lab.png"
            alt="Computer Lab"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
        </div>

        {/* Home page style overlays: left side is dark for text visibility, fading to transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-10" />
        
        {/* Glowing Soft Mesh Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 text-left space-y-6">
              {/* Badge label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                Department of Computer Applications
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white">
                Bachelor of <br />
                <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-300 bg-clip-text text-transparent">
                  Computer Applications
                </span>
              </h1>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
                Build professional logic. Code modern solutions. The BCA program at Sarvadnya Vidyapeeth equips students to navigate software development, relational database systems, network architectures, and cloud computing infrastructures.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/admission"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-extrabold text-xs uppercase tracking-wider hover:opacity-95 transition hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] shadow-md"
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
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-650 rounded-3xl blur-[30px] opacity-10" />
                <div className="relative border border-slate-800 bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="font-heading font-extrabold text-slate-200">IT Edge</span>
                    <Terminal className="text-purple-500 w-5 h-5" />
                  </div>
                  
                  {[
                    { title: "Structured Coding Labs", desc: "Extensive logical programming hours" },
                    { title: "Advanced Tech Stack", desc: "Python, Core Java & Web Technologies" },
                    { title: "Capstone Prototypes", desc: "Live industry application development" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
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
                  <div className="p-3 bg-purple-50 rounded-2xl text-purple-650 group-hover:scale-110 transition-transform duration-300">
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
                    <div className="w-2.5 h-8 bg-gradient-to-b from-purple-500 to-indigo-700 rounded-full" />
                    <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      Program Overview
                    </h2>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify first-letter:text-4xl first-letter:font-black first-letter:text-purple-600 first-letter:mr-2 first-letter:float-left">
                    The Bachelor of Computer Applications (BCA) program at Sarvadnya Vidyapeeth is carefully aligned to meet the dynamic needs of the modern IT sector. Our course provides students with structural foundations in programming languages, system analysis, relational database designing, web engineering, cloud configurations, and information security management.
                  </p>
                  
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
                    We emphasize hands-on practical hours inside our advanced computer laboratories. Students work with compilers, configure virtual databases, and build fully responsive web architectures. Under the guidance of experienced IT mentors, students execute industry-level capstone projects, preparing them for premium technical positions in software houses and global IT corporations.
                  </p>
                </div>
              </FadeIn>

              {/* Labs Grid */}
              <FadeIn delay={0.15}>
                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-8 bg-gradient-to-b from-purple-500 to-indigo-700 rounded-full" />
                    <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      Laboratory & Computing Facilities
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {labs.map((lab, i) => {
                      const LabIcon = lab.icon;
                      return (
                        <div 
                          key={i} 
                          className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300 group"
                        >
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${lab.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <LabIcon className="w-6 h-6" />
                          </div>
                          <h4 className="font-heading font-black text-slate-900 text-base md:text-lg mb-2">
                            {lab.name}
                          </h4>
                          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{lab.desc}</p>
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
                    <CheckCircle2 className="w-6 h-6 text-purple-650" />
                    Programme Objectives
                  </h3>

                  <ul className="space-y-4">
                    {[
                      "Develop abstract computational thinking and complex algorithmic problem solving.",
                      "Build absolute command over structural coding principles in C, C++, Java, and Python.",
                      "Enable seamless adaptation to modern networking architectures and database environments.",
                      "Provide deep practical exposure to distributed systems and cloud platforms.",
                      "Foster professional teamwork communication, cyber law awareness, and research capabilities."
                    ].map((obj, i) => (
                      <li key={i} className="flex gap-3 items-start text-slate-600 text-xs sm:text-sm group">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 group-hover:scale-125 transition-transform flex-shrink-0" />
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Career prospects tag list */}
              <FadeIn delay={0.2}>
                <div className="bg-gradient-to-br from-purple-50/50 via-indigo-50/20 to-white rounded-3xl p-6 md:p-8 text-slate-800 shadow-md border border-purple-100/40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/5 rounded-bl-full pointer-events-none" />
                  <h3 className="font-heading font-black text-lg mb-6 flex items-center gap-2 text-slate-900">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    Career Prospects
                  </h3>
                  <div className="flex flex-col gap-2.5 w-full">
                    {careers.map((c, i) => {
                      const IconComp = c.icon;
                      return (
                        <div 
                          key={i} 
                          className="bg-white border border-slate-100 hover:border-purple-500/30 rounded-xl px-4 py-3 shadow-xs flex items-center gap-3 transition-all duration-300 cursor-default group w-full"
                        >
                          <IconComp className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform flex-shrink-0" />
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
                    isOpen ? "border-purple-200 shadow-md" : "border-slate-100"
                  }`}
                >
                  <button
                    onClick={() => setOpenSem(isOpen ? 0 : semData.sem)}
                    className={`w-full px-6 py-5 flex items-center justify-between text-left font-heading font-bold text-sm md:text-base transition-colors duration-200 ${
                      isOpen ? "bg-purple-50/60 text-purple-955" : "bg-slate-50 text-slate-700 hover:bg-slate-100/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap ${
                        isOpen ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-600"
                      }`}>
                        Sem {semData.sem}
                      </span>
                      <span>{semData.title}</span>
                    </div>
                    <div className={`p-1 rounded-full ${isOpen ? "bg-purple-100 text-purple-650" : "text-slate-400"}`}>
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
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
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
              tagline="Learning Environment"
              title="Our Advanced IT"
              highlight="Infrastructure"
              subtitle="Explore the collaborative computing labs and state-of-the-art campus learning spaces supporting BCA technical excellence."
              align="center"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { img: "/images/research_data.png", title: "Data Analytics & Coding Lab", desc: "Equipped with high-performance workstations for programming, machine learning, and data analytics." },
                { img: "/images/research_electronics.png", title: "Microprocessor & IoT Lab", desc: "For embedded systems engineering, IoT sensor configurations, and hardware logic programming." },
                { img: "/images/seminar_hall.png", title: "Hi-Tech Seminar Hall", desc: "A modern conference hall hosting guest lectures, coding bootcamps, and industrial seminars." },
                { img: "/images/auditorium.png", title: "Central Auditorium", desc: "Our massive seating venue for tech symposiums, code hackathons, and global academic summits." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-bold bg-purple-600/90 px-3 py-1 rounded-full backdrop-blur-sm shadow-md">Campus Space</span>
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-100/30 blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/50 border border-purple-100/80 rounded-[2.5rem] px-6 py-10 sm:p-12 md:p-16 shadow-lg space-y-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
            <span className="text-purple-700 text-xs font-black uppercase tracking-widest bg-purple-100 border border-purple-200/50 px-4 py-1.5 rounded-full inline-block">
              Admissions Open 2026-27
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              Ready to Transform Your <br />
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Professional Future?</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Secure your seat today and prepare for a career filled with corporate achievements. Talk to our career counselors or apply online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 w-full sm:w-auto">
              <Link
                to="/admission"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-black text-xs uppercase tracking-wider hover:opacity-95 transition hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] shadow-md inline-flex items-center justify-center"
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
