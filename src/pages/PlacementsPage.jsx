import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FadeIn, Counter } from "../components/Animations";
import { Icons } from "../components/Icons";
import SectionHeading from "../components/SectionHeading";
import {
  Briefcase,
  Award,
  GraduationCap,
  Users,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  UserCheck,
  ChevronRight,
  Star,
  Building,
  ArrowRight,
  ShieldCheck,
  Send,
  MessageSquare,
  Globe2,
  BookOpen,
  Cpu,
  Laptop,
  Check
} from "lucide-react";

// --- High-Fidelity Recruiter SVG Logo Components ---
const TCSLogo = () => (
  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_12px_rgba(15,23,42,0.02)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-blue-50/70 flex items-center justify-center flex-shrink-0">
      <svg className="h-5 w-5 text-blue-600 font-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 6h16M4 12h12M4 18h8" />
      </svg>
    </div>
    <div className="flex flex-col text-left">
      <span className="text-slate-800 font-extrabold text-[12px] leading-none tracking-wider">TCS</span>
      <span className="text-slate-400 text-[7px] font-bold uppercase tracking-wider mt-0.5">Consultancy Services</span>
    </div>
  </div>
);

const InfosysLogo = () => (
  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_12px_rgba(15,23,42,0.02)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-cyan-50/70 flex items-center justify-center flex-shrink-0">
      <span className="text-cyan-600 font-black text-xs">Infy</span>
    </div>
    <div className="flex flex-col text-left">
      <span className="text-slate-800 font-extrabold text-[12px] leading-none tracking-wider">Infosys</span>
      <span className="text-slate-400 text-[7px] font-bold uppercase tracking-wider mt-0.5">Navigate Your Next</span>
    </div>
  </div>
);

const WiproLogo = () => (
  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_12px_rgba(15,23,42,0.02)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-purple-50/70 flex items-center justify-center flex-shrink-0 relative">
      <div className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-blue-500/80" />
      <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-green-500/80" />
      <div className="absolute top-2 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/80" />
      <div className="absolute bottom-2.5 left-1.5 w-2.5 h-2.5 rounded-full bg-purple-500/80" />
    </div>
    <div className="flex flex-col text-left">
      <span className="text-slate-800 font-extrabold text-[12px] leading-none tracking-wider">WIPRO</span>
      <span className="text-slate-400 text-[7px] font-bold uppercase tracking-wider mt-0.5">Applying Thought</span>
    </div>
  </div>
);

const CiscoLogo = () => (
  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_12px_rgba(15,23,42,0.02)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-teal-50/70 flex items-center justify-center flex-shrink-0">
      <svg className="h-4 w-6 text-teal-600" viewBox="0 0 100 60" fill="currentColor">
        <rect x="10" y="25" width="5" height="10" rx="2.5" />
        <rect x="25" y="20" width="5" height="20" rx="2.5" />
        <rect x="40" y="12" width="5" height="36" rx="2.5" />
        <rect x="55" y="12" width="5" height="36" rx="2.5" />
        <rect x="70" y="20" width="5" height="20" rx="2.5" />
        <rect x="85" y="25" width="5" height="10" rx="2.5" />
      </svg>
    </div>
    <div className="flex flex-col text-left">
      <span className="text-slate-800 font-extrabold text-[12px] leading-none tracking-wider">CISCO</span>
      <span className="text-slate-400 text-[7px] font-bold uppercase tracking-wider mt-0.5">Networking Leader</span>
    </div>
  </div>
);

const AmazonLogo = () => (
  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_12px_rgba(15,23,42,0.02)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-orange-50/70 flex items-center justify-center flex-shrink-0">
      <span className="text-slate-800 font-black text-xs">a</span>
    </div>
    <div className="flex flex-col text-left">
      <span className="text-slate-800 font-extrabold text-[12px] leading-none tracking-wider">AMAZON</span>
      <span className="text-slate-400 text-[7px] font-bold uppercase tracking-wider mt-0.5">Global Services</span>
    </div>
  </div>
);

const DeloitteLogo = () => (
  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_12px_rgba(15,23,42,0.02)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-emerald-50/70 flex items-center justify-center flex-shrink-0">
      <span className="text-emerald-600 font-black text-[10px] tracking-tight">D.</span>
    </div>
    <div className="flex flex-col text-left">
      <span className="text-slate-800 font-extrabold text-[12px] leading-none tracking-wider">DELOITTE</span>
      <span className="text-slate-400 text-[7px] font-bold uppercase tracking-wider mt-0.5">Audit & Advisory</span>
    </div>
  </div>
);

const CapgeminiLogo = () => (
  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_12px_rgba(15,23,42,0.02)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-indigo-50/70 flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </div>
    <div className="flex flex-col text-left">
      <span className="text-slate-800 font-extrabold text-[12px] leading-none tracking-wider">CAPGEMINI</span>
      <span className="text-slate-400 text-[7px] font-bold uppercase tracking-wider mt-0.5">Consulting & IT</span>
    </div>
  </div>
);

const TechMahindraLogo = () => (
  <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_12px_rgba(15,23,42,0.02)] hover:border-purple-200 hover:shadow-md transition-all duration-300 select-none group">
    <div className="w-8 h-8 rounded-full bg-red-50/70 flex items-center justify-center flex-shrink-0">
      <span className="text-red-600 font-black text-xs">M</span>
    </div>
    <div className="flex flex-col text-left">
      <span className="text-slate-800 font-extrabold text-[12px] leading-none tracking-wider">MAHINDRA</span>
      <span className="text-slate-400 text-[7px] font-bold uppercase tracking-wider mt-0.5">Tech Solutions</span>
    </div>
  </div>
);

export default function PlacementsPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const [activeTab, setActiveTab] = useState("all");
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", role: "student", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [testiPage, setTestiPage] = useState(1);

  const stats = [
    { label: "Placement Rate", value: 92, suffix: "%", desc: "For eligible candidates", icon: <TrendingUp className="w-5 h-5 text-emerald-500" /> },
    { label: "Highest Package", value: 24, suffix: " LPA", desc: "Global Placements", icon: <Award className="w-5 h-5 text-amber-500" /> },
    { label: "Average Package", value: 5.8, suffix: " LPA", desc: "BCA & BBA Cohort", icon: <Briefcase className="w-5 h-5 text-purple-600" /> },
    { label: "Recruiter Partners", value: 150, suffix: "+", desc: "Active Organizations", icon: <Building className="w-5 h-5 text-blue-500" /> },
    { label: "Job Offers", value: 450, suffix: "+", desc: "Batch of 2024 & 2025", icon: <Users className="w-5 h-5 text-pink-500" /> },
  ];

  const countries = [
    { name: "UAE", code: "UAE", desc: "Dubai, Abu Dhabi" },
    { name: "Qatar", code: "QAT", desc: "Doha" },
    { name: "Oman", code: "OMN", desc: "Muscat" },
    { name: "Bahrain", code: "BAH", desc: "Manama" },
    { name: "Kuwait", code: "KWT", desc: "Kuwait City" },
    { name: "Saudi Arabia", code: "KSA", desc: "Riyadh" },
    { name: "Singapore", code: "SGP", desc: "Global Hub" },
    { name: "Malaysia", code: "MYS", desc: "Kuala Lumpur" },
    { name: "Europe", code: "EU", desc: "Schengen Area" },
  ];

  const services = [
    "One-on-One Career Counselling",
    "Resume Writing & Profile Building",
    "Mock Interview & Aptitude Bootcamps",
    "Group Discussion Practice Panels",
    "Continuous Corporate Mentorship"
  ];

  const themeColors = [
    {
      badge: "bg-purple-50 text-purple-700 border-purple-100",
      iconBg: "from-purple-500 to-indigo-600 shadow-purple-500/20",
      dot: "text-purple-600",
      hoverBorder: "hover:border-purple-300",
      hoverShadow: "hover:shadow-purple-500/10",
      num: "group-hover:text-purple-100/40 text-slate-200/60"
    },
    {
      badge: "bg-indigo-50 text-indigo-700 border-indigo-100",
      iconBg: "from-indigo-500 to-blue-600 shadow-blue-500/20",
      dot: "text-indigo-600",
      hoverBorder: "hover:border-indigo-300",
      hoverShadow: "hover:shadow-indigo-500/10",
      num: "group-hover:text-indigo-100/40 text-slate-200/60"
    },
    {
      badge: "bg-blue-50 text-blue-700 border-blue-100",
      iconBg: "from-blue-500 to-teal-500 shadow-blue-500/20",
      dot: "text-blue-600",
      hoverBorder: "hover:border-blue-300",
      hoverShadow: "hover:shadow-blue-500/10",
      num: "group-hover:text-blue-100/40 text-slate-200/60"
    },
    {
      badge: "bg-teal-50 text-teal-700 border-teal-100",
      iconBg: "from-teal-500 to-emerald-600 shadow-teal-500/20",
      dot: "text-teal-600",
      hoverBorder: "hover:border-teal-300",
      hoverShadow: "hover:shadow-teal-500/10",
      num: "group-hover:text-teal-100/40 text-slate-200/60"
    }
  ];

  const trainingSteps = [
    {
      year: "First Year",
      title: "Foundation & Personality Grooming",
      desc: "Focus on communication skills, logical thinking, public speaking, and building a professional mindset.",
      items: ["English Communication Bootcamps", "Personality Development Classes", "Introduction to Logical Reasoning", "Resume Writing Basics"],
      icon: <BookOpen className="w-5 h-5" />,
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      year: "Second Year",
      title: "Technical Acceleration & Coding drills",
      desc: "Deep dive into core domain skills, technology bootcamps, quantitative aptitude, and project planning.",
      items: ["Domain-specific Skill Bootcamps", "Data Structures & Coding Bootcamps (BCA)", "Business Case-Study Analysis (BBA)", "Quantitative & Analytical Reasoning"],
      icon: <Cpu className="w-5 h-5" />,
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      year: "Third Year",
      title: "Placement Readiness & Mock Drills",
      desc: "Advanced training mimicking exact corporate hiring panels, including assessments and continuous mentorship.",
      items: ["Mock HR & Technical Interviews", "Group Discussion Training Panels", "AMCAT / CoCubes Diagnostics", "Corporate Guest Lectures & Mentoring"],
      icon: <Laptop className="w-5 h-5" />,
      gradient: "from-blue-500 to-teal-500"
    },
    {
      year: "Drive Phase",
      title: "Campus Recruitment & Offers",
      desc: "Facilitating final corporate interviews, scheduling campus/virtual pools, and securing multiple offer letters.",
      items: ["Pre-Placement Talks (PPT)", "On-Campus / Pool Placement Drives", "Technical & Managerial Assessments", "Offer Negotiation & Onboarding Support"],
      icon: <Award className="w-5 h-5" />,
      gradient: "from-teal-500 to-emerald-600"
    }
  ];

  const testimonials = [
    {
      name: "Amit Kumar",
      course: "BCA (Batch 2025)",
      company: "Cisco Systems",
      package: "₹18.0 LPA",
      quote: "The rigorous training program by the Placement Cell was a game-changer. From mock coding test prep to HR mock sessions, everything was tailored to prepare us for tech giants. I am incredibly proud to start my career with Cisco.",
      initials: "AK"
    },
    {
      name: "Priya Kumari",
      course: "BBA (Batch 2025)",
      company: "Deloitte India",
      package: "₹10.5 LPA",
      quote: "Sarvadnya Vidyapeeth provided us with intense industry exposure. The case study workshops and soft skills grooming sessions helped me excel in my GD rounds. The placement cell staff stood by us in every phase.",
      initials: "PK"
    },
    {
      name: "Rohan Raj",
      course: "BCA (Batch 2025)",
      company: "Wipro Technologies",
      package: "₹7.5 LPA",
      quote: "Sarvadnya Vidyapeeth Placement Cell didn't just help me get a job; they shaped my career direction. The weekly aptitude modules and personality training ensured that I qualified in my very first attempt.",
      initials: "RR"
    },
    {
      name: "Neha Sharma",
      course: "BBA (Batch 2025)",
      company: "ICICI Bank",
      package: "₹8.2 LPA",
      quote: "The corporate interface sessions and internships arranged by SVCDC helped me understand banking operations. Getting placed at ICICI Bank as a Management Trainee is a dream start to my professional journey.",
      initials: "NS"
    },
    {
      name: "Vikram Singh",
      course: "BCA (Batch 2024)",
      company: "TCS Digital",
      package: "₹9.0 LPA",
      quote: "Special coding camps and mentorship from expert faculty helped me crack the TCS Digital national level test. The emphasis on hands-on full stack development project work was the key to my success.",
      initials: "VS"
    },
    {
      name: "Sneha Patel",
      course: "BCA (Batch 2024)",
      company: "Capgemini",
      package: "₹6.5 LPA",
      quote: "The placement team conducted a series of mock interviews that boosted my self-confidence. Their feedback after each round helped me identify my weak spots and improve my technical presentation skills.",
      initials: "SP"
    },
    {
      name: "Anjali Verma",
      course: "BBA (Batch 2024)",
      company: "HDFC Bank",
      package: "₹7.8 LPA",
      quote: "From campus selection training to final interview rounds, the support was continuous. The industry visits helped bridge the gap between business theories and actual corporate banking practices.",
      initials: "AV"
    },
    {
      name: "Manish Kumar",
      course: "BCA (Batch 2025)",
      company: "Infosys",
      package: "₹9.5 LPA",
      quote: "The advanced programming labs and algorithm training at Sarvadnya Vidyapeeth equipped me with strong problem-solving skills, allowing me to qualify for the high-end Power Programmer role at Infosys.",
      initials: "MK"
    }
  ];

  const team = [
    { name: "Prof. Ritesh Kumar", role: "Head - Training & Placements (TPO)", email: "tpo@sarvadnyavidyapeeth.in", phone: "+91 94709 88355", icon: "RK" },
    { name: "Prof. Shalini Verma", role: "Assistant Placement Officer & BCA Lead", email: "shalini.verma@sarvadnyavidyapeeth.in", phone: "+91 82103 44922", icon: "SV" },
    { name: "Prof. Abhishek Singh", role: "Placement Coordinator - BBA", email: "abhishek.singh@sarvadnyavidyapeeth.in", phone: "+91 76541 23988", icon: "AS" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.phone) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormState({ name: "", email: "", phone: "", role: "student", message: "" });
      }, 5000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      {/* ─── Hero Section with Background Image & Home-Page Style Overlay ─── */}
      <section className="relative py-24 bg-slate-900 overflow-hidden text-white border-b border-purple-900/20 z-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src="/images/seminar_hall.png"
            alt="Placement Seminar Hall"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
        </div>

        {/* L-to-R overlay gradient for maximum image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-10" />

        {/* Glowing Soft Mesh Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <SectionHeading
            tagline="Career Development Center"
            title="Placements &"
            highlight="Beyond"
            subtitle="Bridging academic talent and global industry requirements. Empowering graduates with top-tier packages and global career support."
            align="center"
            theme="dark"
          />

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 md:mt-10 max-w-2xl mx-auto mb-8 relative z-20">
            {[
              { label: "Overview", href: "#overview" },
              { label: "Training Pathway", href: "#pathway" },
              { label: "Recruiter Partners", href: "#recruiters" },
              { label: "Student Success", href: "#testimonials" },
              { label: "Placement Cell Team", href: "#team" },
              { label: "Request Drive", href: "#contact" }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="px-4 py-2 text-xs font-bold text-slate-200 bg-white/10 hover:bg-white hover:text-purple-950 rounded-full border border-white/10 hover:border-white transition-all shadow-sm"
              >
                {link.label}
              </a>
            ))}
          </div>


        </div>
      </section>

      {/* ─── Placement Highlights & Stats Dashboard ─── */}
      <section id="overview" className="pt-16 pb-8 md:pt-24 md:pb-12 relative z-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-150 shadow-md">
            <h3 className="font-heading text-center font-black text-slate-800 text-lg uppercase tracking-wider mb-8 flex items-center justify-center gap-2">
              <span className="w-1.5 h-5 rounded bg-purple-600" />
              Sarvadnya Vidyapeeth Placement Track Record
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center text-center p-3 pt-6 md:pt-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
                    {stat.icon}
                  </div>
                  <div className="font-heading font-black text-2xl md:text-3.5xl text-purple-950">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] md:text-xs font-bold text-slate-800 uppercase mt-1.5">{stat.label}</div>
                  <div className="text-[10px] text-slate-450 mt-0.5">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sarvadnya Career Development Center (SVCDC) Overview ─── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <FadeIn direction="left">
                <SectionHeading
                  tagline="About SVCDC"
                  title="Sarvadnya Career"
                  highlight="Development Center"
                  align="left"
                  className="!mb-4"
                />
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mt-4 font-semibold">
                  At Sarvadnya Vidyapeeth, Patna, the **Training and Placement (T&P) Cell** operates as the primary liaison between academic departments and corporate organizations. Under the guidance of the **Sarvadnya Career Development Center (SVCDC)**, our vision is to establish Sarvadnya Vidyapeeth as a center of excellence that shapes industry-ready professionals.
                </p>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mt-3 font-semibold">
                  We follow a rigorous, customized 360-degree training model starting from year one. This ensures our BBA and BCA students develop strong technical abilities alongside core values of integrity, leadership, and analytical thinking.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-purple-200 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <h4 className="text-xs md:text-sm font-black text-slate-800 uppercase">Dedicated Mentorship</h4>
                    </div>
                    <p className="text-[11.5px] text-slate-500 font-semibold mt-2.5 ml-8 leading-relaxed">
                      Direct feedback and evaluation loops from industry mentors.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-purple-200 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <h4 className="text-xs md:text-sm font-black text-slate-800 uppercase">365-Day Corporate Interface</h4>
                    </div>
                    <p className="text-[11.5px] text-slate-500 font-semibold mt-2.5 ml-8 leading-relaxed">
                      Continuous campus recruitment cycles and pool drives.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5">
              <FadeIn direction="right">
                <div className="bg-gradient-to-br from-purple-950 to-indigo-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl border border-purple-800">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/15 to-transparent rounded-bl-full" />
                  <h3 className="font-heading font-black text-lg md:text-xl text-amber-400 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Core T&P Deliverables
                  </h3>
                  <div className="space-y-4 text-xs md:text-sm">
                    {[
                      "Technical & Programming Bootcamps (Java, Python, JS, SQL)",
                      "Global Placement Assistance (GCC and Singapore pathways)",
                      "Quantitative, Logical, and Verbal Reasoning modules",
                      "Industry internships & live capstone collaborations",
                      "Specialized sessions for Group Discussions & Mock HR interviews"
                    ].map((deliv, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                        <span className="text-purple-100 font-semibold">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Placement Journey Timeline ─── */}
      <section id="pathway" className="py-16 bg-slate-100/50 border-y border-slate-200/60 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            tagline="Preparation Pathway"
            title="The Student"
            highlight="Placement Journey"
            subtitle="How we train our students from the day they step onto campus to the day they secure their dream corporate offer letter."
            align="center"
          />

          <div className="relative mt-12">
            {/* Horizontal timeline connector line for large screens */}
            <div className="hidden lg:block absolute top-[2.2rem] left-12 right-12 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-500 opacity-25 pointer-events-none" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {trainingSteps.map((step, idx) => {
                const colors = themeColors[idx] || themeColors[0];
                return (
                  <FadeIn key={idx} delay={idx * 0.1} className="flex flex-col h-full">
                    <div className={`relative overflow-hidden bg-white rounded-3xl p-6 md:p-7 border border-slate-150 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between flex-1 group ${colors.hoverBorder} ${colors.hoverShadow}`}>
                      {/* Top gradient line decoration */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient}`} />
                      
                      <div className="relative z-10 flex flex-col flex-1">
                        {/* Card Header: Icon & Big Step Number */}
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center shadow-lg shadow-purple-500/10`}>
                            {step.icon}
                          </div>
                          <div className={`text-slate-100 font-heading font-black text-5xl transition-colors select-none ${colors.num}`}>
                            0{idx + 1}
                          </div>
                        </div>

                        {/* Card Body: Year, Title, Desc */}
                        <div>
                          <span className={`inline-block border text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${colors.badge}`}>
                            {step.year}
                          </span>
                          <h3 className="font-heading font-black text-slate-800 text-sm md:text-[15px] uppercase tracking-wide mb-2">
                            {step.title}
                          </h3>
                          <p className="text-[11.5px] md:text-xs text-slate-500 leading-relaxed font-semibold mb-6">
                            {step.desc}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer: Items Checklist */}
                      <div className="border-t border-slate-100 pt-4 mt-auto relative z-10">
                        <div className="space-y-2.5">
                          {step.items.map((item, idy) => (
                            <div key={idy} className="flex items-start gap-2">
                              <CheckCircle2 className={`w-4 h-4 ${colors.dot} mt-0.5 flex-shrink-0 opacity-90`} />
                              <span className="text-[11px] font-bold text-slate-700 leading-tight">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Recruiter Partners Section ─── */}
      <section id="recruiters" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            tagline="Corporate Network"
            title="Our Placement &"
            highlight="Hiring Partners"
            subtitle="Graduates of Sarvadnya Vidyapeeth are recruited by top multi-national companies, research startups, and prominent financial organizations."
            align="center"
          />

          <FadeIn>
            <div className="relative w-full overflow-hidden py-4 select-none">
              <div className="flex gap-6 w-max animate-marquee whitespace-nowrap">
                {[...Array(2)].map((_, rIdx) => (
                  <div key={rIdx} className="flex gap-6 items-center">
                    <TCSLogo />
                    <InfosysLogo />
                    <WiproLogo />
                    <CiscoLogo />
                    <AmazonLogo />
                    <DeloitteLogo />
                    <CapgeminiLogo />
                    <TechMahindraLogo />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── International Careers Section ─── */}
      <section className="py-16 bg-gradient-to-br from-purple-50/50 to-orange-50/30 border-t border-purple-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-stretch">

            {/* Left: Global Placements */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-purple-100/60 rounded-3xl p-8 md:p-10 shadow-md hover:shadow-xl hover:border-purple-200/80 transition-all duration-500 relative overflow-hidden group/card">
              {/* Background decorative glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-purple-600/10 to-indigo-600/5 rounded-full blur-3xl pointer-events-none group-hover/card:scale-110 transition-transform duration-700" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center border border-purple-100 shadow-sm relative group-hover/card:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-purple-200/20 rounded-2xl blur-md" />
                    <Globe2 className="w-6 h-6 text-purple-600 animate-pulse relative z-10" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 border border-purple-100 px-3.5 py-1.5 rounded-full">
                    International Pathways
                  </span>
                </div>

                <h3 className="font-heading text-2xl md:text-3.5xl font-extrabold mb-3 text-purple-950">Global Careers</h3>
                <p className="text-slate-500 text-xs md:text-sm mb-8 max-w-lg leading-relaxed font-semibold">
                  We provide specialized pathways enabling graduates to secure job placements in major global hubs. The cell facilitates mock verification and documentation for recruiters across the Middle East, Southeast Asia, and Europe.
                </p>

                <div className="grid grid-cols-3 gap-3.5">
                  {countries.map((c, i) => (
                    <div key={i} className="bg-slate-50/50 border border-slate-100/80 rounded-2xl p-3.5 text-center hover:border-purple-300 hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-600 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group">
                      <div className="w-10 h-10 rounded-full bg-purple-50 border border-purple-100/60 text-purple-700 flex items-center justify-center text-[10px] font-black mx-auto mb-2.5 group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white transition-all duration-300">
                        {c.code}
                      </div>
                      <span className="text-xs font-black text-slate-800 group-hover:text-white block tracking-wide">{c.name}</span>
                      <span className="text-[9px] text-slate-450 group-hover:text-purple-100/90 font-medium block mt-1">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[10px] text-slate-400 mt-8 font-medium border-t border-slate-100 pt-4">*Subject to eligibility, language requirements, employer selection, and visa regulations.</p>
            </div>

            {/* Right: Industry Sectors */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-orange-100/60 rounded-3xl p-8 md:p-10 shadow-md hover:shadow-xl hover:border-orange-200/80 transition-all duration-500 relative overflow-hidden group/card">
              {/* Background decorative glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover/card:scale-110 transition-transform duration-700" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-orange-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 shadow-sm relative group-hover/card:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-orange-200/20 rounded-2xl blur-md" />
                    <Briefcase className="w-6 h-6 text-orange-600 relative z-10" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">
                    Industry Verticals
                  </span>
                </div>

                <h3 className="font-heading text-2xl md:text-3.5xl font-extrabold mb-3 text-slate-900">Sector Opportunities</h3>
                <p className="text-slate-500 text-xs md:text-sm mb-6 max-w-lg leading-relaxed font-semibold">
                  Our customized curriculums prepare students for specialized pathways across diverse commercial domains:
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Information Technology (IT)",
                    "Banking & Finance Services",
                    "Business & Administration",
                    "Customer Support Logistics",
                    "Hospitality & Tourism Ops",
                    "Retail & FMCG Operations",
                    "Digital Marketing & Ads",
                    "Corporate Advisory Services"
                  ].map((sector, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-slate-50/50 border border-slate-100/80 rounded-xl px-4 py-3 shadow-sm hover:border-orange-300 hover:bg-gradient-to-br hover:from-orange-500 hover:to-amber-500 hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-default group animate-none">
                      <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:bg-white group-hover:scale-125 transition-all duration-300 flex-shrink-0" />
                      <span className="text-xs font-bold text-slate-700 group-hover:text-white tracking-wide">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Student Testimonials ─── */}
      <section id="testimonials" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            tagline="Success Stories"
            title="Testimonials From"
            highlight="Placed Students"
            subtitle="Read what our graduates say about their training and campus interview journeys at Sarvadnya Vidyapeeth."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.slice((testiPage - 1) * 4, testiPage * 4).map((test, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="h-full">
                <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(109,40,217,0.06)] hover:border-purple-250 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group h-full flex flex-col justify-between">
                  <span className="absolute bottom-6 right-6 text-slate-100 font-serif text-8xl font-black select-none pointer-events-none group-hover:text-purple-50/70 group-hover:scale-110 transition-all duration-500">
                    “
                  </span>

                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 30}ms` }} />
                      ))}
                    </div>

                    <p className="text-[11px] md:text-[11.5px] text-slate-550 leading-relaxed font-semibold mb-6 italic relative z-10">
                      "{test.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5 border-t border-slate-100 pt-5 relative z-10">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-heading font-black text-xs flex items-center justify-center border-2 border-white shadow-md shadow-purple-500/10 group-hover:rotate-3 transition-transform duration-300">
                        {test.initials}
                      </div>
                      {/* Placed dot */}
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
                    </div>

                    <div>
                      <h4 className="font-heading font-black text-slate-900 text-xs tracking-tight group-hover:text-purple-950 transition-colors">{test.name}</h4>
                      <p className="text-[9px] text-slate-450 font-bold uppercase tracking-wider mt-0.5">{test.course}</p>

                      <div className="flex items-center gap-1.5 mt-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-100/50 text-purple-700 px-2.5 py-0.5 rounded-full w-max shadow-sm group-hover:from-purple-600 group-hover:to-indigo-650 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                        <span className="text-[9.5px] font-black">{test.company}</span>
                        <span className="text-[8.5px] font-extrabold group-hover:text-purple-100">({test.package})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-3 mt-12 relative z-20">
            <button
              onClick={() => setTestiPage(1)}
              className={`h-3 rounded-full transition-all duration-500 ${
                testiPage === 1
                  ? "bg-purple-600 w-9 shadow-md shadow-purple-500/20 cursor-default"
                  : "bg-slate-200 w-3 hover:bg-purple-350"
              }`}
              aria-label="Page 1"
            />
            <button
              onClick={() => setTestiPage(2)}
              className={`h-3 rounded-full transition-all duration-500 ${
                testiPage === 2
                  ? "bg-purple-600 w-9 shadow-md shadow-purple-500/20 cursor-default"
                  : "bg-slate-200 w-3 hover:bg-purple-350"
              }`}
              aria-label="Page 2"
            />
          </div>
        </div>
      </section>

      {/* ─── Placement Cell Committee & Team ─── */}
      <section id="team" className="py-16 bg-slate-100/50 border-t border-slate-200/60 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            tagline="Core Committee"
            title="Placement Cell"
            highlight="Officers & Coordinators"
            subtitle="Reach out directly to our designated campus coordinators for recruitment tie-ups or training assistance."
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="h-full">
                <div className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.07)] hover:border-purple-250 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden group">
                  {/* Decorative background glow */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[radial-gradient(circle,rgba(249,115,22,0.03),transparent)] rounded-full pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Squircle Avatar with rotating shadow border */}
                    <div className="relative mb-5 group-hover:scale-105 transition-transform duration-300">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white font-heading font-black text-lg flex items-center justify-center border-2 border-white shadow-md relative z-10 group-hover:rotate-3 transition-transform">
                        {member.icon}
                      </div>
                    </div>

                    <h3 className="font-heading font-black text-slate-800 text-base mb-2.5 tracking-tight group-hover:text-purple-950 transition-colors">
                      {member.name}
                    </h3>
                    
                    <div className="min-h-[46px] flex items-center justify-center mb-6">
                      <span className="inline-block bg-gradient-to-r from-purple-500/5 to-indigo-500/5 border border-purple-100/50 text-purple-700 text-[9.5px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest leading-tight group-hover:bg-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons with animated gradient hover */}
                  <div className="flex items-center justify-center gap-3 border-t border-slate-100/80 pt-5 mt-auto relative z-10">
                    <a
                      href={`mailto:${member.email}`}
                      title={member.email}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 bg-purple-50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-650 hover:text-white text-purple-700 font-black rounded-xl transition-all text-[11px] w-full border border-purple-100/40 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Email</span>
                    </a>
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, '')}`}
                      title={member.phone}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 bg-orange-50 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white text-orange-700 font-black rounded-xl transition-all text-[11px] w-full border border-orange-100/40 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact & Placement Request Form ─── */}
      <section id="contact" className="py-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/10">
              {/* Mesh Gradient Glowing Orbs */}
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />
              {/* Tech dot-grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

              <div className="grid md:grid-cols-12 gap-10 items-center relative z-10">

                {/* Left Side: Pitch */}
                <div className="md:col-span-5 space-y-5">
                  <span className="bg-orange-500/10 text-orange-450 border border-orange-500/25 rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                    For Recruiters
                  </span>
                  <h3 className="font-heading font-black text-2.5xl text-white tracking-tight leading-tight">
                    Host a Campus Placement Drive
                  </h3>
                  <p className="text-purple-100/80 text-xs md:text-sm leading-relaxed font-semibold">
                    We welcome leading corporate groups and engineering companies to invite our final-year BCA and BBA cohorts for placements and internships. Fill in the registry form and our office team will follow up within 24 hours.
                  </p>

                  <div className="flex items-center gap-2.5 pt-4 text-xs text-purple-200">
                    <ShieldCheck className="w-5 h-5 text-orange-400" />
                    <span className="font-bold">Rapid scheduling & logistics support</span>
                  </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:col-span-7">
                  {formSubmitted ? (
                    <div className="bg-white/[0.02] backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-xl rounded-full" />
                      <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-heading font-black text-lg text-white">Enquiry Received!</h4>
                      <p className="text-purple-100 text-xs leading-relaxed max-w-sm mx-auto font-medium">
                        Thank you for reaching out. Sarvadnya Vidyapeeth Placement Officer will contact you on your registered email/phone shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] uppercase font-black text-purple-200 tracking-widest mb-1.5 ml-1">Contact Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Dr. Rajesh Kumar"
                            className="w-full text-xs font-semibold px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all backdrop-blur-md"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-black text-purple-200 tracking-widest mb-1.5 ml-1">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleInputChange}
                            placeholder="e.g. hr@company.com"
                            className="w-full text-xs font-semibold px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all backdrop-blur-md"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] uppercase font-black text-purple-200 tracking-widest mb-1.5 ml-1">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formState.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full text-xs font-semibold px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all backdrop-blur-md"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase font-black text-purple-200 tracking-widest mb-1.5 ml-1">I am representing</label>
                          <select
                            name="role"
                            value={formState.role}
                            onChange={handleInputChange}
                            className="w-full text-xs font-semibold px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
                          >
                            <option value="recruiter">Recruiting Partner / HR</option>
                            <option value="student">Student / Alumni</option>
                            <option value="parent">Parent / Sponsor</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase font-black text-purple-200 tracking-widest mb-1.5 ml-1">Brief Message</label>
                        <textarea
                          name="message"
                          value={formState.message}
                          onChange={handleInputChange}
                          rows="3"
                          placeholder="Please specify recruitment requirements, timelines or queries..."
                          className="w-full text-xs font-semibold px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all resize-none backdrop-blur-md"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-650 text-purple-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-[1.01] active:scale-100 flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Submit Drive Request
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
