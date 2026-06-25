import React, { useState } from "react";
import { FadeIn } from "../components/Animations";
import { Icons } from "../components/Icons";
import SectionHeading from "../components/SectionHeading";

export default function CoursesPage() {
  const [active, setActive] = useState("BCA");
  const courses = {
    BCA: {
      title: "Bachelor of Computer Applications",
      duration: "3 Years · 6 Semesters",
      color: "from-purple-500 to-purple-800",
      colorText: "text-purple-600",
      bgBadge: "bg-purple-50 text-purple-600 border border-purple-100",
      bg: "from-purple-50/60 to-white",
      icon: <Icons.BCA className="w-8 h-8 text-white" />,
      overview: "The BCA program is designed for students who aspire to build a successful career in Information Technology, Software Development, Data Analytics, Web Technologies, and Digital Solutions. Students gain both theoretical knowledge and practical exposure through computer labs, projects, and industry-oriented assignments.",
      subjects: ["Programming Languages (C, C++, Java, Python)", "Database Management System (DBMS)", "Web Development", "Software Engineering", "Computer Networks", "Operating Systems", "Data Structures", "Cloud Computing Fundamentals", "Cyber Security Basics"],
      careers: ["Software Developer", "Web Developer", "Data Analyst", "IT Support Executive", "Digital Marketing Executive", "System Administrator", "Freelancer", "Startup Entrepreneur"],
    },
    BBA: {
      title: "Bachelor of Business Administration",
      duration: "3 Years · 6 Semesters",
      color: "from-orange-500 to-amber-500",
      colorText: "text-orange-500",
      bgBadge: "bg-orange-50 text-orange-600 border-orange-100",
      bg: "from-orange-50/60 to-amber-50/30",
      icon: <Icons.BBA className="w-8 h-8 text-white" />,
      overview: "The BBA program develops students' managerial, organizational, and entrepreneurial skills. The course prepares students for careers in business, management, finance, marketing, human resources, and corporate sectors.",
      subjects: ["Principles of Management", "Marketing Management", "Financial Accounting", "Human Resource Management", "Business Communication", "Entrepreneurship Development", "Organizational Behaviour", "Business Economics", "Banking & Finance"],
      careers: ["Business Executive", "Marketing Executive", "HR Executive", "Sales Manager", "Banking Professional", "Financial Consultant", "Entrepreneur", "Corporate Executive"],
    }
  };
  const c = courses[active];

  return (
    <section className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tagline="Programs"
          title="Courses"
          highlight="Offered"
          subtitle="Choose your path to a successful career"
        />
        
        <div className="flex justify-center gap-4 mb-12">
          {Object.keys(courses).map(k => (
            <button 
              key={k} 
              onClick={() => setActive(k)} 
              className={`px-8 py-3.5 rounded-full font-heading font-extrabold text-lg transition-all duration-300 relative ${active === k ? `bg-gradient-to-r ${courses[k].color} text-white shadow-lg scale-105` : "bg-slate-50 hover:bg-slate-100 text-slate-600"}`}
            >
              {k}
            </button>
          ))}
        </div>
        
        <div className={`rounded-3xl bg-gradient-to-br ${c.bg} border border-slate-100/80 p-8 md:p-14 transition-all duration-500`} style={{ animation: "fadeIn 0.5s ease-out" }}>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-lg`}>
                {c.icon}
              </div>
              <div>
                <h3 className="font-heading text-2xl font-extrabold text-slate-900 leading-tight mb-2">{c.title}</h3>
                <span className={`inline-block border text-xs font-bold px-3 py-1 rounded-full ${c.bgBadge}`}>{c.duration}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">{c.overview}</p>
              <div className="bg-white/90 border border-slate-100 rounded-2xl p-5 shadow-sm">
                <span className="font-heading font-bold text-slate-900 text-sm block mb-1">Eligibility:</span>
                <span className="text-slate-600 text-xs font-semibold">10+2 Pass in any stream (Arts, Commerce, Science) from a recognized board.</span>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <h4 className="font-heading font-bold text-slate-900 mb-5 text-lg flex items-center gap-2">
                <span className="w-1.5 h-6 rounded bg-gradient-to-b from-orange-500 to-amber-500" />
                Key Subjects
              </h4>
              <ul className="space-y-2.5">
                {c.subjects.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700 bg-white/70 backdrop-blur-sm border border-slate-50 hover:border-slate-100 rounded-xl px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-colors">
                    <Icons.Check className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="font-semibold">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-4 space-y-8">
              <div>
                <h4 className="font-heading font-bold text-slate-900 mb-5 text-lg flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded bg-gradient-to-b from-orange-500 to-amber-500" />
                  Career Opportunities
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {c.careers.map((r, i) => (
                    <span key={i} className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-100 text-slate-700 shadow-sm transition-all duration-300 hover:border-orange-200/50 hover:text-orange-550">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:none; } }`}</style>
      </div>
    </section>
  );
}
