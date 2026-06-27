import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FadeIn } from "../components/Animations";
import SectionHeading from "../components/SectionHeading";
import {
  Calendar,
  MapPin,
  Sparkles,
  Trophy,
  Users,
  Music,
  Code,
  Lightbulb,
  Camera,
  ArrowRight
} from "lucide-react";

const DEFAULT_UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Vidya-Tech National Hackathon 2026",
    date: "July 15 – 16, 2026",
    time: "09:00 AM (36 Hours Run)",
    venue: "Advanced Computer Labs & Seminar Hall",
    category: "Technical",
    desc: "A national-level coding sprint bringing together student programmers to solve real-world industry and public-sector problems."
  },
  {
    id: 2,
    title: "Tarang 2026: Annual Cultural Carnival",
    date: "August 05 – 06, 2026",
    time: "10:00 AM onwards",
    venue: "Campus Main Ground & Auditorium",
    category: "Cultural",
    desc: "Two days of high-energy music fests, street theater, choreography competitions, fashion parades, and student food kiosks."
  },
  {
    id: 3,
    title: "National Seminar: Generative AI & Developer Productivity",
    date: "September 12, 2026",
    time: "10:30 AM – 04:00 PM",
    venue: "Central Auditorium",
    category: "Academic",
    desc: "Guest speaker panels featuring senior engineers and AI researchers discussing LLMs, agentic coders, and standard prompt engineering."
  },
  {
    id: 4,
    title: "Sarvadnya Vidyapeeth BBA Business Pitch Challenge",
    date: "October 03, 2026",
    time: "01:30 PM – 05:30 PM",
    venue: "Main Conference Room B",
    category: "Management",
    desc: "Incubator pitch round where student startups present business plans to venture capitalists and regional industry leaders."
  }
];

const getCategoryIcon = (category) => {
  switch (category) {
    case "Technical":
      return <Code className="w-5 h-5 text-purple-650" />;
    case "Cultural":
      return <Music className="w-5 h-5 text-pink-500" />;
    case "Academic":
      return <Lightbulb className="w-5 h-5 text-amber-500" />;
    case "Management":
      return <Trophy className="w-5 h-5 text-indigo-500" />;
    default:
      return <Calendar className="w-5 h-5 text-slate-500" />;
  }
};

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status === "Upcoming") {
            list.push({ id: doc.id, ...data });
          }
        });
        if (list.length > 0) {
          setUpcomingEvents(list);
        } else {
          setUpcomingEvents(DEFAULT_UPCOMING_EVENTS);
        }
      } catch (err) {
        console.error("Failed to load events:", err);
        setUpcomingEvents(DEFAULT_UPCOMING_EVENTS);
      }
    };
    fetchEvents();
  }, []);

  const pastEvents = [
    { title: "Graduation Day 2025", date: "Nov 2025", image: "/images/graduation_day.png", tag: "Convocation" },
    { title: "National Tech Seminar", date: "Oct 2025", image: "/images/seminar_hall.png", tag: "Academic" },
    { title: "Annual Sports Championship", date: "Dec 2025", image: "/images/sports_ground.png", tag: "Sports" },
    { title: "BCA Code-Sprint", date: "Jan 2026", image: "/images/computer_lab.png", tag: "Coding" }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ─── Hero Section with Background Image & Home-Page Style Overlay ─── */}
      <section className="relative pt-20 pb-24 bg-slate-900 overflow-hidden text-white border-b border-purple-900/20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src="/images/auditorium.png"
            alt="Campus Auditorium Events"
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
              tagline="Campus Activities"
              title="Events &"
              highlight="Festivals"
              subtitle="Explore upcoming coding challenges, cultural festivals, sports tournaments, and professional guest lectures at Sarvadnya Vidyapeeth."
              align="center"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* ─── Tabs & Main Display ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Title and Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="bg-purple-50 text-purple-700 border border-purple-100 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-3">
                Events Desk
              </span>
              <h2 className="font-heading text-2xl md:text-3.5xl font-black text-slate-800 tracking-tight">
                Sarvadnya Vidyapeeth Event Logs
              </h2>
            </div>

            {/* Toggle tabs */}
            <div className="flex gap-1.5 bg-purple-100/50 p-1.5 rounded-xl border border-purple-100/50 self-start md:self-auto">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs md:text-sm font-black transition-all ${activeTab === "upcoming"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-slate-650 hover:text-purple-650"
                  }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs md:text-sm font-black transition-all ${activeTab === "past"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-slate-650 hover:text-purple-650"
                  }`}
              >
                <Camera className="w-3.5 h-3.5" />
                Past Memories
              </button>
            </div>
          </div>

          {/* Conditional Rendering Panels */}
          {activeTab === "upcoming" ? (
            <FadeIn>
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Category and Date Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-purple-50 text-purple-755 border border-purple-100 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider">
                          {event.category}
                        </span>
                        <span className="text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-100/50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {event.date}
                        </span>
                      </div>

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                          {getCategoryIcon(event.category)}
                        </div>
                        <div>
                          <h3 className="font-heading font-black text-slate-800 text-base md:text-lg leading-snug group-hover:text-purple-650 transition-colors">
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      {/* Detail specs */}
                      <div className="space-y-2 text-xs font-bold text-slate-500 mb-6 pl-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span>Venue: {event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span>Timing: {event.time}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-500 text-xs md:text-[12.5px] leading-relaxed font-semibold mb-6 pl-1">
                        {event.desc}
                      </p>
                    </div>

                    {/* Action Button */}
                    <button className="flex items-center justify-center gap-1.5 w-full bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md">
                      Register For Event
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pastEvents.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-purple-950/85 backdrop-blur-sm text-white font-black text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm">
                        {item.tag}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <h4 className="font-heading font-extrabold text-slate-800 text-sm mb-1.5 leading-snug group-hover:text-purple-650 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

        </div>
      </section>

      {/* ─── Highlights / Stats ─── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "20+", tag: "Annual Tech Events" },
              { val: "1500+", tag: "Active Students" },
              { val: "5+", tag: "Active Clubs" },
              { val: "50+", tag: "Guest Lectures" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4">
                <p className="font-heading text-4xl md:text-5xl font-black text-purple-700 tracking-tight mb-1">{stat.val}</p>
                <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-wider">{stat.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA: Join Organizing Committee ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl" style={{
            background: "linear-gradient(135deg, #100936, #1E105A)"
          }}>
            {/* Design patterns overlay */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-tr-full pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full px-5 py-1.5 text-xs font-black uppercase tracking-widest inline-block">
                  Student Club Committee
                </span>
                <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Want to Pitch or Organize <br />
                  a Student Event?
                </h2>
                <p className="text-purple-100 text-xs md:text-sm leading-relaxed max-w-2xl font-semibold">
                  Sarvadnya Vidyapeeth values creativity and leadership. If you have an event proposal (coding fests, sports meet, management games, or music sessions), submit it to the Student Committee warden desk for budget allotment.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <button className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-purple-950 font-black text-xs md:text-sm uppercase tracking-wider px-6 py-4 rounded-xl transition-all shadow-md">
                  Submit Event Idea
                  <Sparkles className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}