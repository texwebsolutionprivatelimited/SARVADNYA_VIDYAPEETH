import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Award,
  CreditCard,
  BarChart3,
  Calendar,
  Bell,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  ExternalLink,
  BookOpen,
  Star,
} from "lucide-react";
import {
  studentProfile,
  todayTimetable,
  notices,
  holidays,
  quickLinks,
  overallAttendance,
} from "../../../hooks/studentPortalData";

const iconMap = {
  FileText, Award, CreditCard, BarChart3, Calendar, Bell,
};

const quickLinkRoutes = {
  "Exam Form / Apply / Supply": "/student-dashboard/results",
  "Result": "/student-dashboard/results",
  "Pay Fee Online": "/student-dashboard/fees",
  "Attendance": "/student-dashboard/attendance",
  "Time Table": "/student-dashboard/timetable",
  "Notices": "/student-dashboard/notices",
};

/* ── Mini Calendar Component ── */
function MiniCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthHolidays = holidays[monthKey] || [];
  const holidayDates = monthHolidays.map((h) => h.date);
  const gazettedDates = monthHolidays.filter((h) => h.type === "gazetted").map((h) => h.date);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-100 text-gray-400">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold text-gray-700">
          {monthName} {year}
        </h3>
        <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-100 text-gray-400">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-[10px] font-bold text-gray-400 uppercase py-1">
            {d}
          </div>
        ))}
        {days.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const isToday =
            day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isHoliday = holidayDates.includes(day);
          const isGazetted = gazettedDates.includes(day);
          const isSunday = new Date(year, month, day).getDay() === 0;

          return (
            <div
              key={day}
              className={`py-1.5 text-[11px] font-semibold rounded-md transition-colors ${
                isToday
                  ? "bg-purple-600 text-white shadow-md"
                  : isGazetted
                  ? "bg-red-100 text-red-600"
                  : isSunday
                  ? "bg-green-50 text-green-600"
                  : isHoliday
                  ? "bg-green-50 text-green-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
          <span className="text-[9px] text-gray-400 font-medium">Today</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-green-200"></span>
          <span className="text-[9px] text-gray-400 font-medium">Holiday</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-200"></span>
          <span className="text-[9px] text-gray-400 font-medium">Gazetted</span>
        </div>
      </div>
    </div>
  );
}

export default function ERPDashboard() {
  return (
    <div className="space-y-5">
      {/* ── Quick Links ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
      >
        <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" />
          Quick Links
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {quickLinks.map((link) => {
            const Icon = iconMap[link.icon] || FileText;
            const route = quickLinkRoutes[link.label] || "/student-dashboard";
            return (
              <Link
                key={link.label}
                to={route}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 hover:bg-purple-50 border border-gray-100 hover:border-purple-200 transition-all group text-center"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 group-hover:border-purple-300 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                  <Icon className="w-4 h-4 text-gray-500 group-hover:text-purple-600 transition-colors" />
                </div>
                <span className="text-[10px] font-semibold text-gray-500 group-hover:text-purple-700 leading-tight transition-colors">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* ── Your Profile Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-extrabold shadow-md shadow-purple-200 ring-2 ring-purple-100">
              {studentProfile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">{studentProfile.name}</h3>
              <p className="text-[11px] text-gray-500">
                {studentProfile.rollNumber} • {studentProfile.course} ({studentProfile.department}) • {studentProfile.semester}
              </p>
            </div>
          </div>
          <Link
            to="/student-dashboard/profile"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[11px] font-bold text-purple-700 hover:text-purple-800 transition-all group"
          >
            <User className="w-3.5 h-3.5" />
            View Full Profile
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </motion.div>

      {/* ── Main Grid: Timetable + Right Column ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Timetable (2 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Today's Time Table
            </h2>
            <Link
              to="/student-dashboard/timetable"
              className="text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              Full Timetable <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Session Selectors */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                Session
              </label>
              <select className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer">
                <option>2024-2025</option>
                <option>2023-2024</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                Academic Session
              </label>
              <select className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer">
                <option>JAN-JUN 25 (SVP)</option>
                <option>JUL-DEC 24 (SVP)</option>
              </select>
            </div>
          </div>

          {/* Timetable Table */}
          {todayTimetable.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400 bg-gray-50 rounded-lg border border-gray-100">
              Time Table not found for today.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider w-12">
                      #
                    </th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                      Faculty
                    </th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                      Room
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todayTimetable.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 hover:bg-purple-50/30 transition-colors"
                    >
                      <td className="px-3 py-2.5">
                        <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center">
                          {row.period}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {row.time}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-xs font-bold text-gray-700">{row.subject}</span>
                      </td>
                      <td className="px-3 py-2.5 hidden sm:table-cell">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {row.faculty}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 hidden md:table-cell">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {row.room}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* News / Notices */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Bell className="w-4 h-4 text-red-500" />
                News / Notices
              </h2>
              <Link
                to="/student-dashboard/notices"
                className="text-[10px] font-bold text-purple-600 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
              {notices.slice(0, 5).map((notice) => (
                <Link
                  key={notice.id}
                  to="/student-dashboard/notices"
                  className="block p-2.5 rounded-lg bg-gray-50 hover:bg-purple-50 border border-gray-100 hover:border-purple-200 transition-all group"
                >
                  <div className="flex items-start gap-2">
                    {notice.important && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    )}
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-gray-700 group-hover:text-purple-700 leading-snug truncate transition-colors">
                        {notice.title}
                      </p>
                      <p className="text-[9px] text-gray-400 mt-0.5">
                        {notice.date} • {notice.category}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Holiday Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-600" />
                Holiday Chart
              </h2>
              <Link
                to="/student-dashboard/academic-calendar"
                className="text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                Full Calendar <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <MiniCalendar />
          </motion.div>
        </div>
      </div>

      {/* ── Attendance Overview ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Attendance Overview
          </h2>
          <Link
            to="/student-dashboard/attendance"
            className="text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            View Details <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Circle */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="7" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={overallAttendance.percentage >= 75 ? "#10b981" : "#ef4444"}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${overallAttendance.percentage * 2.64} ${264 - overallAttendance.percentage * 2.64}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold text-gray-800">
                {overallAttendance.percentage}%
              </span>
              <span className="text-[8px] font-bold text-gray-400 uppercase">Attendance</span>
            </div>
          </div>
          {/* Stats */}
          <div className="flex-1 grid grid-cols-3 gap-3 w-full">
            <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-lg font-extrabold text-gray-800">
                {overallAttendance.totalClasses}
              </p>
              <p className="text-[9px] font-bold text-gray-400 uppercase">Total Classes</p>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-lg font-extrabold text-emerald-600">
                {overallAttendance.attended}
              </p>
              <p className="text-[9px] font-bold text-emerald-500 uppercase">Present</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-xl border border-red-100">
              <p className="text-lg font-extrabold text-red-500">
                {overallAttendance.totalClasses - overallAttendance.attended}
              </p>
              <p className="text-[9px] font-bold text-red-400 uppercase">Absent</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
