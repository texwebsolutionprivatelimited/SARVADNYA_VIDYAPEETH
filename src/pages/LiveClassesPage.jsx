import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "../components/Animations";
import SectionHeading from "../components/SectionHeading";
import { 
  Play, 
  Video, 
  Users, 
  Wifi, 
  BookOpen, 
  Clock, 
  Laptop, 
  Radio, 
  CheckCircle, 
  MessageSquare, 
  HelpCircle, 
  ExternalLink 
} from "lucide-react";

export default function LiveClassesPage() {
  const [activeTab, setActiveTab] = useState("schedule");

  const liveClasses = [
    {
      id: 1,
      title: "React JS: Hooks & Advanced State Management",
      subject: "BCA Semester IV",
      faculty: "Prof. Anand Dev",
      time: "09:00 AM – 11:00 AM",
      status: "streaming",
      desc: "An in-depth session covering useContext, useReducer, and custom hooks design with interactive programming lab tasks."
    },
    {
      id: 2,
      title: "Digital Marketing & Consumer Analytics",
      subject: "BBA Semester VI",
      faculty: "Dr. S. K. Sinha",
      time: "11:30 AM – 01:00 PM",
      status: "upcoming",
      desc: "Exploring modern search engine optimization (SEO) techniques, search advertisements, and cohort-based analytics models."
    },
    {
      id: 3,
      title: "Computer Networks: TCP/IP Subnetting & Routing Protocols",
      subject: "BCA Semester IV",
      faculty: "Ms. Renu Kumari",
      time: "02:00 PM – 03:30 PM",
      status: "upcoming",
      desc: "Understanding classless routing, VLSM subnetting calculation steps, and dynamic routing protocols (RIP, OSPF)."
    },
    {
      id: 4,
      title: "Placement Preparation: Quantitative Aptitude & Reasoning",
      subject: "Common (All Batches)",
      faculty: "Trainer Amit Sharma",
      time: "04:00 PM – 05:30 PM",
      status: "upcoming",
      desc: "Shortcut tricks for solving profit & loss problems, time-distance ratios, and syllabus review for upcoming recruitment drives."
    }
  ];

  const archivedLectures = [
    { title: "Introduction to Java Programming & OOP Concepts", date: "June 24, 2026", duration: "1h 45m", faculty: "Prof. Anand Dev", subject: "BCA Sem II" },
    { title: "Financial Accounting & Ledger Posting Methods", date: "June 24, 2026", duration: "1h 20m", faculty: "Mrs. Sneha Gupta", subject: "BBA Sem II" },
    { title: "Operating Systems: Process Synchronization & Semaphores", date: "June 23, 2026", duration: "1h 50m", faculty: "Ms. Renu Kumari", subject: "BCA Sem IV" },
    { title: "Principles of Business Management & Leadership Styles", date: "June 22, 2026", duration: "1h 15m", faculty: "Dr. S. K. Sinha", subject: "BBA Sem IV" }
  ];

  const faqs = [
    {
      q: "How do I log in to attend these live classes?",
      a: "Students must use their official Sarvadnya Vidyapeeth digital portal login credentials. Once logged in, the live streaming feed will automatically link your session to track academic attendance."
    },
    {
      q: "What if I experience buffering or poor connection?",
      a: "Our virtual class streaming server automatically adjusts resolution based on your network bandwidth (360p, 480p, 720p, 1080p). We recommend a minimum symmetric connection speed of 2 Mbps for buffer-free delivery."
    },
    {
      q: "Where can I find class notes and assignments after a lecture?",
      a: "Notes, PDF slides, and coding lab assignments are automatically uploaded to the student LMS panel under the corresponding subject code within 1 hour of class completion."
    },
    {
      q: "Can I watch a lecture if I miss the live schedule?",
      a: "Yes! All live classes are fully recorded and published in the recorded video archives panel within 2-3 hours. Recorded sessions are searchable by faculty, date, or subject name."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      {/* ─── Hero Section with Background Image & Home-Page Style Overlay ─── */}
      <section className="relative pt-20 pb-24 bg-slate-900 overflow-hidden text-white border-b border-purple-900/20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src="/images/smart_classroom.png"
            alt="Live Classes Smart Classroom"
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
          <div className="text-center pb-8 pt-12">
            <SectionHeading
              tagline="Virtual Learning"
              title="Live Classes &"
              highlight="E-Portal"
              subtitle="Access real-time lectures, interact directly with Sarvadnya Vidyapeeth faculty, and review recorded archives from our high-performance LMS platform."
              align="center"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "HD Live Streaming", desc: "Experience lag-free high-definition video broadcasting of everyday campus lectures.", icon: <Video className="w-5 h-5 text-purple-650" /> },
              { title: "Interactive Chat Rooms", desc: "Ask questions, raise virtual hands, and discuss class assignments with peers in real-time.", icon: <MessageSquare className="w-5 h-5 text-indigo-500" /> },
              { title: "Recorded Video Vault", desc: "Never miss a concept with auto-saved lecture recordings accessible on any device.", icon: <Laptop className="w-5 h-5 text-amber-500" /> },
              { title: "Unified LMS Sync", desc: "Track course schedules, complete quizzes, and submit lab codes directly from one dashboard.", icon: <BookOpen className="w-5 h-5 text-emerald-500" /> }
            ].map((feat, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100/50 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="font-heading font-black text-slate-800 text-sm mb-1.5">{feat.title}</h3>
                <p className="text-slate-500 text-xs font-semibold leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Classroom Scheduler / Video Vault ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="bg-purple-50 text-purple-700 border border-purple-100 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-3">
                LMS Dashboard
              </span>
              <h2 className="font-heading text-2xl md:text-3.5xl font-black text-slate-800 tracking-tight">
                Academic Broadcasts & Videos
              </h2>
            </div>

            {/* Tab Toggles */}
            <div className="flex bg-purple-100/50 p-1.5 rounded-xl border border-purple-100/50 self-start md:self-auto">
              <button
                onClick={() => setActiveTab("schedule")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-black transition-all ${
                  activeTab === "schedule"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-650 hover:text-purple-650"
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                Live Schedule
              </button>
              <button
                onClick={() => setActiveTab("archives")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-black transition-all ${
                  activeTab === "archives"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-650 hover:text-purple-650"
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                Recorded Classes
              </button>
            </div>
          </div>

          {/* Conditional Rendering Panels */}
          {activeTab === "schedule" ? (
            <FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                {liveClasses.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
                  >
                    {item.status === "streaming" && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500 animate-pulse" />
                    )}

                    <div>
                      {/* Top bar info */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-purple-50 text-purple-750 border border-purple-100/60 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider">
                          {item.subject}
                        </span>
                        
                        {item.status === "streaming" ? (
                          <span className="flex items-center gap-1.5 text-[9px] font-black text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full uppercase tracking-widest animate-pulse">
                            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full inline-block animate-ping" />
                            Streaming Now
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[9px] font-black text-indigo-650 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full uppercase tracking-widest">
                            <Clock className="w-3 h-3 text-indigo-500" />
                            Scheduled
                          </span>
                        )}
                      </div>

                      {/* Heading */}
                      <h3 className="font-heading font-extrabold text-slate-800 text-base md:text-lg mb-2 leading-snug">
                        {item.title}
                      </h3>
                      
                      {/* Info lines */}
                      <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-purple-600" />
                          {item.faculty}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-purple-600" />
                          {item.time}
                        </div>
                      </div>

                      <p className="text-slate-550 text-xs md:text-[12.5px] leading-relaxed font-semibold mb-6">
                        {item.desc}
                      </p>
                    </div>

                    {/* Join Class Button */}
                    <div>
                      {item.status === "streaming" ? (
                        <button className="flex items-center justify-center gap-1.5 w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md">
                          <Wifi className="w-4 h-4" />
                          Enter Live Classroom
                        </button>
                      ) : (
                        <button className="flex items-center justify-center gap-1.5 w-full bg-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest py-3.5 rounded-xl cursor-not-allowed">
                          Class Not Started
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {archivedLectures.map((lec, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                        <Play className="w-5 h-5 text-purple-650 fill-purple-650" />
                      </div>
                      <span className="text-[10px] font-black text-purple-650 bg-purple-50 px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                        {lec.subject}
                      </span>
                      <h4 className="font-heading font-extrabold text-slate-800 text-sm mb-2 group-hover:text-purple-650 transition-colors line-clamp-2">
                        {lec.title}
                      </h4>
                      <p className="text-slate-450 text-[11px] font-semibold mb-1">Faculty: {lec.faculty}</p>
                    </div>
                    
                    <div className="mt-4 pt-3.5 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-400">
                      <span>{lec.date}</span>
                      <span>{lec.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

        </div>
      </section>

      {/* ─── FAQs Accordion ─── */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="bg-purple-50 text-purple-700 border border-purple-100 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-3">
              FAQ Helpdesk
            </span>
            <h2 className="font-heading text-2xl md:text-3.5xl font-black text-slate-800 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-xs md:text-sm mt-2 leading-relaxed font-semibold">
              Find solutions to queries regarding e-learning, portals, streaming issues, and attendance tracking.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-55/40 p-5 rounded-2xl border border-slate-100/80">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4 text-purple-650" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-sm md:text-base text-slate-800 mb-1.5">{faq.q}</h4>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Portal CTA Banner ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl" style={{
            background: "linear-gradient(135deg, #100936, #1E105A)"
          }}>
            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full px-5 py-1.5 text-xs font-black uppercase tracking-widest inline-block">
                Unified Student Portal
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Log In to the Full LMS Dashboard
              </h2>
              <p className="text-purple-100 text-xs md:text-sm leading-relaxed font-semibold">
                Access your complete profile, course syllabus, grade reports, virtual labs, online tests, and announcements published by Sarvadnya Vidyapeeth academic boards.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <button className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-purple-950 font-black text-xs md:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md">
                  Student Login Portal
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-black text-xs md:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all">
                  Faculty LMS Portal
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
