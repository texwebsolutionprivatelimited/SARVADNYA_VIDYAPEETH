import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Compass, Trophy, Globe, Landmark, Users,
  CheckCircle2, MapPin, Phone, Mail, Award, Clock, Heart,
  Briefcase, Check, ArrowRight, ShieldCheck, Activity,
  FileText, CreditCard, Sparkles, Quote
} from "lucide-react";
import SectionHeading from "../../components/SectionHeading";

// Framer Motion Variants
const cardHover = {
  hover: {
    y: -6,
    boxShadow: "0 15px 30px -5px rgb(126 34 206 / 0.08), 0 8px 10px -6px rgb(126 34 206 / 0.08)",
    borderColor: "rgb(216 180 254 / 0.6)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};


export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-16 font-sans overflow-hidden">
      
      {/* 1. FOUNDER & CHAIRMAN'S MESSAGE (FIRST SECTION WITH STANDARD SECTION HEADING) */}
      <section className="pb-16 pt-16 bg-white relative">
        {/* Decorative background glow blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-100/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading
            tagline="Message from Founder"
            title="Founder &"
            highlight="Chairman"
            subtitle="A visionary word from Dr. Bhuleshwar Patel on our core educational mission."
            align="center"
          />

          <div className="bg-white/80 border border-purple-100/80 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-md text-left max-w-7xl mx-auto relative overflow-hidden mt-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/5 rounded-bl-full pointer-events-none" />
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* Leader Image & Title on left (4 cols) with unique gallery frame */}
              <div className="md:col-span-4 text-center space-y-5 pt-6 md:pt-8">
                <div className="relative mx-auto w-44 h-60">
                  {/* Offset Gold dashed border */}
                  <div className="absolute -inset-1.5 border-2 border-dashed border-amber-400 rounded-2xl translate-x-2.5 translate-y-2.5 opacity-60" />
                  
                  {/* Photo container */}
                  <div className="relative w-44 h-60 rounded-2xl overflow-hidden shadow-lg border-2 border-purple-100/50 bg-slate-100 z-10">
                    <img 
                      src="/images/dr_bhuleshwar.jpg" 
                      alt="Dr. Bhuleshwar Patel" 
                      className="w-full h-full object-cover object-[center_12%] hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="font-extrabold text-slate-900 text-lg leading-tight">Dr. Bhuleshwar Patel</h4>
                  <div className="mt-1.5 mb-1">
                    <span className="bg-amber-100 text-amber-950 border border-amber-200/55 px-3 py-0.5 rounded-full text-[9px] font-black tracking-wider inline-block uppercase">
                      Founder & Chairman
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block">
                    Sarvadnya Vidyapeeth
                  </span>
                </div>
              </div>

              {/* Message text on right (8 cols) */}
              <div className="md:col-span-8 space-y-5 relative">
                {/* Background watermarked quote icon */}
                <div className="absolute -top-12 -left-6 opacity-5 text-purple-300 text-9xl font-serif pointer-events-none select-none">
                  “
                </div>

                <div className="flex items-center gap-2 border-b border-purple-50 pb-3">
                  <Quote className="text-purple-400 w-5 h-5 flex-shrink-0" />
                  <h3 className="text-xl md:text-2xl font-black text-purple-950 uppercase tracking-tight font-heading">
                    Shaping the Future
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Styled callout for the quote */}
                  <div className="bg-gradient-to-r from-purple-50/70 via-purple-50/20 to-white border-l-4 border-purple-600 p-5 rounded-r-2xl shadow-xs">
                    <p className="italic font-bold text-purple-950 text-sm md:text-base leading-relaxed">
                      "We are living in the age of quantum jump of knowledge. The rapid pace of development of our country has provided tremendous opportunities for the young minds to achieve new heights. Sarvadnya Vidyapeeth is the ultimate place to flourish the multidimensional talents of students through academic and extra-academic activities."
                    </p>
                  </div>
                  
                  <div className="text-slate-655 text-xs sm:text-sm leading-relaxed space-y-3 font-normal">
                    <p>
                      Dr. Bhuleshwar Patel is a visionary, philanthropist, and social worker who has been working in the fields of rural livelihood, women empowerment, and the upliftment of backward classes and BPL families through quality and sustainable education.
                    </p>
                    <p>
                      Our mission is to create budding professionals who will compete globally and transform their dreams to become world-class leaders, catering quality education for all at an affordable cost.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-purple-100/60 mt-4 text-left">
                      {[
                        "We work for rural areas.",
                        "We work for tribal and Scheduled Caste students.",
                        "We work for women's empowerment.",
                        "We work for sustainability."
                      ].map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                            <Check size={12} className="text-purple-600" />
                          </div>
                          <span className="text-slate-655 text-xs sm:text-sm font-semibold leading-tight">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION & PARENT TRUST PROFILE */}
      <section className="py-14 md:py-16 bg-slate-50 border-t border-purple-100/50 scroll-mt-20" id="about-sarvadnya">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Box - Parent Trust Badge & Profile */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="bg-white border border-purple-100 rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-150/10 rounded-bl-full pointer-events-none" />
                
                {/* Tintern Trust Header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-purple-100/60">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-1 shadow-sm border border-purple-100 flex-shrink-0 overflow-hidden">
                    <img 
                      src="/images/tintern_logo.jpg" 
                      alt="Tintern Charitable Trust Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-purple-700 uppercase tracking-widest block">PARENT ORGANISATION</span>
                    <h4 className="font-extrabold text-purple-950 text-base leading-tight">Tintern Charitable Trust</h4>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Reg No: DNH-7790-2022</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-purple-900 font-black text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Sparkles size={12} className="text-purple-600" />
                      Trust Vision
                    </h5>
                    <p className="text-slate-600 text-xs leading-relaxed font-normal">
                      To foster human development through excellence in Quality Education, Inventive learning, medical facilities and Sustainable livelihood.
                    </p>
                  </div>
                  <div>
                    <h5 className="text-purple-900 font-black text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Globe size={12} className="text-purple-600" />
                      Empowerment Themes
                    </h5>
                    <p className="text-slate-600 text-xs leading-relaxed font-normal">
                      Providing financial assistance for tribal, rural, and needy youth/women for higher education & livelihood. Preserving heritage, culture, folk art, and promoting growth through MSME programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box - SV Introduction */}
            <div className="lg:col-span-7 text-left space-y-5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-sm" />
                <span className="text-purple-600 text-xs font-black uppercase tracking-widest font-heading">Who We Are</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">About Sarvadnya Vidyapeeth</h2>
              
              <div className="text-slate-650 space-y-4 text-sm md:text-base leading-relaxed font-normal">
                <p>
                  Sarvadnya Vidyapeeth was established under the aegis of <strong>Tintern Charitable Trust</strong> with the objective of creating a strong educational platform where students can gain not only academic knowledge but also practical skills required in today's competitive world.
                </p>
                <p>
                  The institution believes that education should lead to self-reliance, confidence, and career success. Therefore, equal emphasis is placed on classroom learning, industry exposure, personality development, digital literacy, and employability skills.
                </p>
                <p>
                  Located in the educational hub of Patna, Sarvadnya Vidyapeeth provides students with a modern learning environment, experienced faculty, practical training, and career guidance to help them achieve their professional goals.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="py-14 md:py-16 bg-white scroll-mt-20" id="vision-mission">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Vision Card */}
            <div className="bg-white border border-purple-100/85 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 shadow-sm border border-purple-100">
                  <Compass className="text-purple-700" size={28} />
                </div>
                <h3 className="text-2xl font-black text-purple-950 mb-4 uppercase tracking-tight">Our Vision</h3>
                <p className="text-slate-655 text-sm md:text-base leading-relaxed font-normal">
                  To become one of the leading centers of excellence in higher education by providing affordable, quality, and skill-oriented education that empowers students to become knowledgeable, innovative, self-reliant, and socially responsible individuals.
                </p>
              </div>
              <div className="mt-8 border-t border-slate-100 pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-black uppercase tracking-wider text-purple-700">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>Inclusive Learning</span>
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>Empowerment</span>
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                  <span>Self-Reliance</span>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white border border-purple-100/85 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-tr-full pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 shadow-sm border border-purple-100">
                  <Trophy className="text-purple-700" size={28} />
                </div>
                <h3 className="text-2xl font-black text-purple-950 mb-4 uppercase tracking-tight">Our Mission</h3>
                <ul className="space-y-3">
                  {[
                    "To provide quality higher education at affordable fees.",
                    "To promote skill-based and industry-oriented learning.",
                    "To bridge the gap between academics and employment.",
                    "To develop leadership, communication, and entrepreneurial skills.",
                    "To support students through career guidance and placement assistance.",
                    "To encourage innovation, creativity, and lifelong learning.",
                    "To contribute towards nation-building by creating educated and skilled youth."
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                        <Check size={12} className="text-purple-600" />
                      </div>
                      <span className="text-slate-655 text-xs sm:text-sm font-semibold leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE SARVADNYA VIDYAPEETH? */}
      <section className="py-14 md:py-16 bg-slate-50 border-t border-purple-100/50 scroll-mt-20" id="why-choose">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            tagline="Why Choose Us"
            title="Why Sarvadnya"
            highlight="Vidyapeeth?"
            subtitle="Providing a robust educational platform that blends university standards with hands-on skills."
            align="center"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { title: "Quality Education", desc: "Well-structured curriculum designed according to university and industry standards.", icon: <BookOpen className="text-purple-700" /> },
              { title: "Experienced Faculty", desc: "Dedicated and qualified faculty members with strong academic and professional experience.", icon: <Users className="text-purple-700" /> },
              { title: "Practical Learning", desc: "Project work, case studies, seminars, workshops, and hands-on training.", icon: <Trophy className="text-purple-700" /> },
              { title: "Digital Environment", desc: "Modern teaching methods supported by digital tools and technology.", icon: <Globe className="text-purple-700" /> },
              { title: "Placement Support", desc: "Special focus on preparing students for employment and entrepreneurship opportunities.", icon: <Briefcase className="text-purple-700" /> },
              { title: "Affordable Fee", desc: "Quality education accessible to students from all economic backgrounds.", icon: <Landmark className="text-purple-700" /> },
              { title: "Personality Development", desc: "Regular sessions on communication skills, leadership, and professional ethics.", icon: <Heart className="text-purple-700" /> },
              { title: "Scholarship & DRCC Support", desc: "Guidance and support for Bihar Government Student Credit Card financing options.", icon: <Award className="text-purple-700" /> }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={cardHover}
                whileHover="hover"
                className="bg-white border border-purple-100/50 rounded-2xl p-6 shadow-xs flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-100/80 flex items-center justify-center mb-4 border border-purple-200/30">
                    {card.icon}
                  </div>
                  <h4 className="font-extrabold text-purple-950 text-base mb-2">{card.title}</h4>
                  <p className="text-slate-550 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADER DIGNITARIES & APPROVALS (PRESERVED & STYLED) */}
      <section id="leadership" className="py-14 md:py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            tagline="Our Leaders"
            title="Institutional"
            highlight="Dignitaries"
            subtitle="Guidance from visionaries dedicated to academic excellence."
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8 text-left mb-12">
            {[
              {
                initials: "RP",
                name: "Shri. Ramesh Patil",
                role: "Patron, Sarvadnya Group",
                desc: "A visionary educationist dedicated to bringing world-class learning infrastructure and technology-driven pedagogy to Bihar.",
                gradient: "from-orange-500 to-purple-600"
              },
              {
                initials: "SP",
                name: "Dr. Sanjay Patil",
                role: "President & Chancellor",
                desc: "Academic leader focused on global partnerships, research excellence, and creating industry-ready professionals.",
                gradient: "from-purple-600 to-purple-800"
              },
              {
                initials: "SD",
                name: "Prof. Dr. Sunita Deshmukh",
                role: "Principal & Vice Chancellor",
                desc: "Leading the academic council with passion for multi-disciplinary curricula, value-based learning, and comprehensive research.",
                gradient: "from-amber-500 to-orange-500"
              }
            ].map((leader, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-xs hover:shadow-md transition-shadow text-center group border border-slate-200/50"
              >
                {/* Avatar */}
                <div className="relative mx-auto mb-6 w-20 h-20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${leader.gradient} rounded-full opacity-20 blur-md group-hover:opacity-30 transition-opacity duration-300`} />
                  <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${leader.gradient} flex items-center justify-center text-white text-lg font-black shadow-lg`}>
                    {leader.initials}
                  </div>
                </div>

                <h4 className="font-extrabold text-slate-900 text-lg mb-1">{leader.name}</h4>
                <span className="text-purple-700 text-xs font-bold uppercase tracking-wider block mb-3">
                  {leader.role}
                </span>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed">{leader.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ASSISTANCE & HELPLINE */}
      <section className="py-14 md:py-16 bg-slate-50 border-t border-purple-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-center text-left">
            {/* Assistance card */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-sm" />
                <span className="text-purple-750 text-xs font-black uppercase tracking-widest">Support</span>
              </div>
              <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Assistance Available</h3>
              <p className="text-slate-550 text-xs sm:text-sm leading-relaxed font-normal">
                Our support desk is dedicated to assisting students at every step. Feel free to contact our counsellors for guidance on course structures, credit schemes, or admissions.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { text: "Admission Counselling", icon: <Users size={16} /> },
                  { text: "Course Selection Guidance", icon: <Compass size={16} /> },
                  { text: "Documentation Support", icon: <FileText size={16} /> },
                  { text: "Student Credit Card Info (DRCC)", icon: <CreditCard size={16} /> },
                  { text: "Government Scheme Awareness", icon: <Award size={16} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white px-4 py-3.5 rounded-2xl border border-purple-100/50 shadow-xs font-semibold text-xs text-slate-700">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline Form / Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-purple-800 to-indigo-950 text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between border border-purple-900">
              <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-bl-full pointer-events-none" />
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">Admissions Helpline</h4>
                <p className="text-purple-100 text-sm leading-relaxed mb-6 font-medium">
                  Ready to secure your future? Get in touch with our help desk directly or visit our admission office.
                </p>

                <div className="space-y-4 text-xs sm:text-sm font-semibold text-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Phone size={14} className="text-amber-400" />
                    </div>
                    <span>+91 9955330733 / 7282831934</span>
                  </div>
                  <a href="mailto:info@sarvadnyavidyapeeth.in" className="flex items-center gap-3 hover:text-amber-400 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Mail size={14} className="text-amber-400" />
                    </div>
                    <span>info@sarvadnyavidyapeeth.in</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <MapPin size={14} className="text-amber-400" />
                    </div>
                    <span>Beur-Betaura Road, Patna (Bihar) - 800002</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-block text-center w-full bg-amber-500 hover:bg-amber-600 text-[#100936] font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-md transition-all duration-300"
                >
                  Ask a Question / Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
