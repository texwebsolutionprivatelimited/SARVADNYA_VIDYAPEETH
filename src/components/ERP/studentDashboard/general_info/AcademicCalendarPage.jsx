import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Tag,
  Award,
  BookOpen,
  Info,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { studentProfile, holidays } from "../../../../hooks/studentPortalData";

// Academic Calendar Milestones Data
const academicEvents = [
  {
    id: 1,
    title: "Commencement of Classes (Odd Semester)",
    date: "15 July 2025",
    monthKey: "2025-07",
    day: 15,
    category: "Academic",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    description: "Orientation program and start of regular lectures for BCA & BBA 2nd/4th/6th semesters.",
  },
  {
    id: 2,
    title: "Muharram (Gazetted Holiday)",
    date: "17 July 2025",
    monthKey: "2025-07",
    day: 17,
    category: "Holiday",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
    description: "College campus remains closed.",
  },
  {
    id: 3,
    title: "Annual Sports Week & Competitions",
    date: "01 Aug - 07 Aug 2025",
    monthKey: "2025-08",
    day: 1,
    category: "Event",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    description: "Inter-departmental cricket, badminton, athletics & chess tournaments.",
  },
  {
    id: 4,
    title: "Independence Day Celebration",
    date: "15 August 2025",
    monthKey: "2025-08",
    day: 15,
    category: "Holiday",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
    description: "Flag hoisting & cultural events at Sarvadnya Vidyapeeth Main Lawn.",
  },
  {
    id: 5,
    title: "Janmashtami (Holiday)",
    date: "16 August 2025",
    monthKey: "2025-08",
    day: 16,
    category: "Holiday",
    badgeColor: "bg-red-100 text-red-700 border-red-200",
    description: "Campus holiday.",
  },
  {
    id: 6,
    title: "Mid-Term Examinations (Sessional 1)",
    date: "10 Sept - 16 Sept 2025",
    monthKey: "2025-09",
    day: 10,
    category: "Examination",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    description: "Mid-semester internal evaluation exams for all degree programs.",
  },
  {
    id: 7,
    title: "Sarvadnya Tech-Fest & Workshop",
    date: "25 October 2025",
    monthKey: "2025-10",
    day: 25,
    category: "Event",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
    description: "National student seminar, hackathon, and guest lectures.",
  },
  {
    id: 8,
    title: "End-Term Theory & Practical Examinations",
    date: "01 Dec - 20 Dec 2025",
    monthKey: "2025-12",
    day: 1,
    category: "Examination",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    description: "Semester end examinations.", // AKU Patna affiliating university
  },
];

export default function AcademicCalendarPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // July 2025

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthHolidays = holidays[monthKey] || [];
  const holidayDates = monthHolidays.map((h) => h.date);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const filteredEvents = academicEvents.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* ── Header ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold mb-1">
            <CalendarDays className="w-3.5 h-3.5" />
            Sarvadnya Vidyapeeth • Academic Session 2024-2025
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic Calendar & Key Dates
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Semester milestones, examination schedules, gazetted holidays & campus activities.
          </p>
        </div>
      </div>

      {/* ── Grid: Interactive Calendar & Event Schedule ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Mini Calendar View */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-purple-600" />
              {monthName} {year}
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={prevMonth}
                className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-[10px] font-bold text-slate-400 uppercase py-1">
                {d}
              </div>
            ))}
            {days.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;

              const isHoliday = holidayDates.includes(day);
              const isSunday = new Date(year, month, day).getDay() === 0;

              return (
                <div
                  key={day}
                  className={`py-2 text-xs font-semibold rounded-lg transition-colors ${isHoliday
                      ? "bg-red-100 text-red-700 font-extrabold"
                      : isSunday
                        ? "bg-slate-100 text-slate-500"
                        : "text-slate-700 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-red-100 border border-red-200"></span>
              <span>Gazetted Holiday / Special Leave</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-purple-100 border border-purple-200"></span>
              <span>Academic Milestone / Event</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200"></span>
              <span>Regular Teaching Day</span>
            </div>
          </div>
        </motion.div>

        {/* Right 2 Cols: Milestone Events & Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Category Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["All", "Academic", "Examination", "Holiday", "Event"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
              >
                {cat} Events
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-3">
            {filteredEvents.map((evt) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${evt.badgeColor}`}
                    >
                      {evt.category}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {evt.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">{evt.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{evt.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
