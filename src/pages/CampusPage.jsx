import React from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "../components/Animations";
import { Icons } from "../components/Icons";
import { Trophy, Coffee, Bus, ArrowRight, Clock, BookOpen, Laptop } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

export default function CampusPage() {
  const facilities = [
    {
      title: "Smart Classrooms",
      image: "/images/smart_classroom.png",
      desc: "Technology-enabled smart classrooms with interactive digital boards, projectors, and comfortable tiered seating designed for active engagement.",
      icon: <Icons.SmartClass className="w-5 h-5 text-white" />,
      link: null
    },
    {
      title: "Advanced Computer Labs",
      image: "/images/computer_lab.png",
      desc: "State-of-the-art laboratories equipped with latest computers, development software, high-speed Wi-Fi, and server systems for BCA courses.",
      icon: <Icons.ComputerLab className="w-5 h-5 text-white" />,
      link: null
    },
    {
      title: "Central Library",
      image: "/images/campus_library.png",
      desc: "An extensive repository of thousands of text-books, academic journals, reference manuals, digital resource catalogs, and quiet research zones.",
      icon: <Icons.Library className="w-5 h-5 text-white" />,
      link: null
    },
    {
      title: "Seminar Hall & Auditorium",
      image: "/images/seminar_hall.png",
      desc: "A fully air-conditioned, high-fidelity acoustics auditorium for hosting tech seminars, business guest lectures, and cultural events.",
      icon: <Icons.Seminar className="w-5 h-5 text-white" />,
      link: null
    },
    {
      title: "Student Hostel Facility",
      image: "/images/hostel.png",
      desc: "Comfortable and secure residential hostels for boys and girls with 24/7 security, nutritious meals, study lounges, and housekeeping.",
      icon: <Icons.Bed className="w-5 h-5 text-white" />,
      link: "/hostel"
    },
    {
      title: "Sports Ground & Recreation",
      image: "/images/sports_ground.png",
      desc: "Expansive outdoor playgrounds and indoor recreation centers supporting physical training, cricket, volleyball, football, and table tennis.",
      icon: <Trophy className="w-5 h-5 text-white" />,
      link: null
    },
    {
      title: "Hygienic Cafeteria",
      image: "/images/cafeteria.png",
      desc: "A spacious, vibrant dining cafeteria serving fresh, nutritious, and hygienic meals, beverages, and snacks curated for student wellness.",
      icon: <Coffee className="w-5 h-5 text-white" />,
      link: null
    },
    {
      title: "Dedicated Commute Bus Fleet",
      image: "/images/transportation.png",
      desc: "A reliable and safe transportation bus network connecting the campus to all major geographic sectors of Patna and surrounding regions.",
      icon: <Bus className="w-5 h-5 text-white" />,
      link: null
    },
    {
      title: "Career Development Cell",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
      desc: "An active counseling and T&P hub where industry experts prepare students for global interview panels, resume building, and placement runs.",
      icon: <Icons.CareerCell className="w-5 h-5 text-white" />,
      link: "/placements"
    },
    {
      title: "Student Support & Mentorship",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop",
      desc: "Personalized mentorship and academic counseling services mapping individual progress, providing mental wellness support and career tips.",
      icon: <Icons.Support className="w-5 h-5 text-white" />,
      link: null
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ─── Hero Section with Background Image & Home-Page Style Overlay ─── */}
      <section className="relative pt-20 pb-24 bg-slate-900 overflow-hidden text-white border-b border-purple-900/20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src="/images/campus_exterior.png"
            alt="Sarvadnya Vidyapeeth Campus"
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
              tagline="Infrastructure & Tour"
              title="Campus"
              highlight="Facilities"
              subtitle="A modern, technology-enabled learning environment designed to inspire academic excellence, practical skill development, and personal growth in Patna."
              align="center"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* ─── Facilities Grid Section ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8">
            {facilities.map((f, i) => (
              <FadeIn key={i} delay={i * 0.05} className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] flex flex-col">
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between flex-1 group">
                  
                  {/* Image container */}
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Soft gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating Icon Badge */}
                    <div className="absolute -bottom-5 right-5 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg border-2 border-white z-10 group-hover:scale-110 transition-transform duration-300">
                      {f.icon}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 pt-7 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-heading text-base font-extrabold text-slate-800 group-hover:text-purple-700 transition-colors duration-300 mb-2.5">
                        {f.title}
                      </h3>
                      <p className="text-slate-500 text-xs md:text-[12.5px] leading-relaxed font-semibold">
                        {f.desc}
                      </p>
                    </div>

                    {f.link && (
                      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center">
                        <Link
                          to={f.link}
                          className="text-xs font-black text-purple-700 hover:text-purple-900 inline-flex items-center gap-1.5 group/link"
                        >
                          Explore Facility Details
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    )}
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>

          {/* ─── Campus Highlights & Key Features ─── */}
          <div className="mt-28">
            <div className="text-center mb-12">
              <span className="bg-purple-50 text-purple-700 border border-purple-100 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-3">
                Key Parameters
              </span>
              <h2 className="font-heading text-2xl md:text-3.5xl font-black text-slate-800 tracking-tight">
                Campus Specifications & Infrastructure Highlights
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-xs md:text-sm mt-2 leading-relaxed font-semibold">
                An overview of the technical and environmental features supporting daily academic operations at Patna.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Strategic Connectivity", desc: "Located in Patna's educational belt with easy public transport options and shuttle services.", accent: "border-l-purple-500" },
                { title: "24/7 Security & CCTV", desc: "Fully monitored entry/exit points, professional security guards, and campus-wide CCTV coverage.", accent: "border-l-indigo-500" },
                { title: "Uninterrupted Power Backup", desc: "Equipped with high-capacity silent generators ensuring continuous power to labs and classrooms.", accent: "border-l-blue-500" },
                { title: "Optical-Fiber Wi-Fi", desc: "Campus-wide access to high-speed symmetric internet connection for research and coding.", accent: "border-l-teal-500" },
                { title: "Eco-Friendly Green Zones", desc: "Lush landscaped gardens and open-air sitting zones promoting wellness and self-study.", accent: "border-l-emerald-500" },
                { title: "Modern First-Aid Station", desc: "Dedicated medical room with on-call nurse, basic diagnostics, and emergency tie-ups.", accent: "border-l-amber-500" }
              ].map((spec, idx) => (
                <div key={idx} className={`bg-white p-5 rounded-2xl border-l-4 ${spec.accent} border border-slate-100 shadow-sm hover:shadow-md transition-shadow`}>
                  <h4 className="font-heading font-extrabold text-slate-800 text-sm mb-1.5 uppercase tracking-wide">{spec.title}</h4>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed">{spec.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── A Day in the Life Section ─── */}
          <div className="mt-28">
            <div className="text-center mb-12">
              <span className="bg-purple-50 text-purple-700 border border-purple-100 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-3">
                Daily Routine
              </span>
              <h2 className="font-heading text-2xl md:text-3.5xl font-black text-slate-800 tracking-tight">
                A Day in the Life at Sarvadnya Vidyapeeth
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-xs md:text-sm mt-2 leading-relaxed font-semibold">
                Explore the structured daily flow that keeps our students motivated, engaged, and industry-focused.
              </p>
            </div>

            <div className="relative">
              {/* Horizontal connecting line for large screens */}
              <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100 pointer-events-none" />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                  {
                    time: "09:00 AM – 12:00 PM",
                    stage: "Morning Briefings & Lab Work",
                    desc: "Interactive lectures in smart classrooms followed by intensive hands-on programming or business research.",
                    icon: <BookOpen className="w-5 h-5" />,
                    phase: "Phase 01",
                    color: "from-purple-500 to-indigo-600"
                  },
                  {
                    time: "12:00 PM – 01:30 PM",
                    stage: "Mentoring & Project Syncs",
                    desc: "Faculty members review student code, run business plan feedback loops, and guide capstone project workflows.",
                    icon: <Laptop className="w-5 h-5" />,
                    phase: "Phase 02",
                    color: "from-indigo-500 to-blue-600"
                  },
                  {
                    time: "01:30 PM – 02:30 PM",
                    stage: "Lunch & Social Recess",
                    desc: "Refueling with fresh meals at the SV Cafeteria, catching up with peers, or reading in the quiet library zone.",
                    icon: <Coffee className="w-5 h-5" />,
                    phase: "Phase 03",
                    color: "from-blue-500 to-teal-500"
                  },
                  {
                    time: "02:30 PM – 04:30 PM",
                    stage: "Skills & Placement Mock Drills",
                    desc: "Practicing group discussions, attending guest industry expert talks, or attempting diagnostic mock interviews.",
                    icon: <Trophy className="w-5 h-5" />,
                    phase: "Phase 04",
                    color: "from-teal-500 to-emerald-500"
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Top gradient accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.color}`} />
                    
                    <div>
                      {/* Top icon and Phase indicator row */}
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          {item.icon}
                        </div>
                        <span className="text-[10px] font-black text-purple-600 bg-purple-50 border border-purple-100/50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {item.phase}
                        </span>
                      </div>

                      {/* Time Slot Badge with Clock Icon */}
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700 bg-slate-50 border border-slate-100/80 px-2.5 py-1.5 rounded-xl w-fit mb-3.5">
                        <Clock className="w-3.5 h-3.5 text-purple-600" />
                        {item.time}
                      </div>

                      {/* Card Heading */}
                      <h4 className="font-heading font-black text-slate-800 text-xs md:text-sm uppercase tracking-wide mb-2 group-hover:text-purple-700 transition-colors leading-snug">
                        {item.stage}
                      </h4>

                      {/* Card Description */}
                      <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                        {item.desc}
                      </p>
                    </div>

                    {/* Subtle bottom design pattern overlay on hover */}
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-50 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Virtual Tour CTA Banner ─── */}
          <FadeIn delay={0.1}>
            <div className="mt-20 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl" style={{
              background: "linear-gradient(135deg, #100936, #1E105A)"
            }}>
              {/* Background image with low opacity blur */}
              <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.08]">
                <img
                  src="/images/campus_exterior.png"
                  alt=""
                  className="w-full h-full object-cover filter blur-[1px]"
                />
              </div>
              {/* Ambient gradients */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/15 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-tr-full pointer-events-none" />

              <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest inline-block">
                    Virtual Campus Experience
                  </span>
                  <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Take a Virtual 360° Tour <br />
                    of Our Campus Environment
                  </h2>
                  <p className="text-purple-100 text-xs md:text-sm leading-relaxed max-w-2xl font-medium">
                    Can't visit Patna in person? Explore our classrooms, advanced laboratories, libraries, recreation spaces, and green campus pathways from anywhere in the world. Experience the professional environment awaiting you.
                  </p>
                </div>

                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <div className="relative group/btn cursor-pointer">
                    {/* Glowing Pulse Rings */}
                    <div className="absolute inset-0 rounded-full bg-amber-500/30 scale-110 animate-ping opacity-75" />
                    <div className="absolute inset-0 rounded-full bg-amber-500/20 scale-125 animate-[ping_1.5s_ease-in-out_infinite] opacity-50" />
                    
                    {/* Play Button */}
                    <div className="w-20 h-20 bg-amber-500 hover:bg-amber-600 text-purple-950 rounded-full flex items-center justify-center shadow-2xl relative z-10 transition-all duration-300 group-hover/btn:scale-105">
                      <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </div>
  );
}
