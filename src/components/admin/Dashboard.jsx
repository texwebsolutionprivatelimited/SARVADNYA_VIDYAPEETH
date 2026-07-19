import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  FileText,
  Calendar,
  Briefcase,
  Image,
  Bell,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { db, collection, onSnapshot } from "../../firebase";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

// Time filter options
const TIME_FILTERS = ["Last 7 days", "Last 30 days", "Last 90 days", "All Time"];

export default function Dashboard() {
  const [counts, setCounts] = useState({
    enquiries: 0,
    blogs: 0,
    blogsDraft: 0,
    events: 0,
    eventsCompleted: 0,
    placements: 0,
    gallery: 0,
    notices: 0,
  });
  const [enquiries, setEnquiries] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Time");

  // Enquiry status counts
  const [enquiryStatusCounts, setEnquiryStatusCounts] = useState({
    Pending: 0,
    Responded: 0,
    Closed: 0,
  });

  // Event status counts
  const [eventStatusCounts, setEventStatusCounts] = useState({
    Upcoming: 0,
    Completed: 0,
    Cancelled: 0,
  });

  useEffect(() => {
    const unsubs = [];

    // Enquiries
    unsubs.push(
      onSnapshot(collection(db, "enquiries"), (snap) => {
        const list = [];
        let pending = 0, responded = 0, closed = 0;
        snap.forEach((d) => {
          const data = d.data();
          list.push({ id: d.id, ...data });
          if (data.status === "Pending") pending++;
          else if (data.status === "Responded") responded++;
          else if (data.status === "Closed") closed++;
        });
        setCounts((prev) => ({ ...prev, enquiries: snap.size }));
        setEnquiries(list.slice(0, 5));
        setEnquiryStatusCounts({ Pending: pending, Responded: responded, Closed: closed });
      })
    );

    // Blogs
    unsubs.push(
      onSnapshot(collection(db, "blogs"), (snap) => {
        let pub = 0, draft = 0;
        snap.forEach((d) => {
          const data = d.data();
          if (data.status === "Published") pub++;
          else draft++;
        });
        setCounts((prev) => ({ ...prev, blogs: snap.size, blogsDraft: draft }));
      })
    );

    // Events
    unsubs.push(
      onSnapshot(collection(db, "events"), (snap) => {
        let upcoming = 0, completed = 0, cancelled = 0;
        snap.forEach((d) => {
          const data = d.data();
          if (data.status === "Upcoming") upcoming++;
          else if (data.status === "Completed") completed++;
          else if (data.status === "Cancelled") cancelled++;
        });
        setCounts((prev) => ({ ...prev, events: snap.size, eventsCompleted: completed }));
        setEventStatusCounts({ Upcoming: upcoming, Completed: completed, Cancelled: cancelled });
      })
    );

    // Placements
    unsubs.push(
      onSnapshot(collection(db, "placements"), (snap) => {
        setCounts((prev) => ({ ...prev, placements: snap.size }));
      })
    );

    // Gallery
    unsubs.push(
      onSnapshot(collection(db, "gallery"), (snap) => {
        setCounts((prev) => ({ ...prev, gallery: snap.size }));
      })
    );

    // Notices
    unsubs.push(
      onSnapshot(collection(db, "notices"), (snap) => {
        setCounts((prev) => ({ ...prev, notices: snap.size }));
      })
    );

    return () => unsubs.forEach((u) => u && u());
  }, []);

  // Stat cards data
  const STATS = [
    {
      label: "Enquiries",
      value: counts.enquiries,
      icon: MessageSquare,
      color: "text-amber-600",
      bg: "bg-amber-50",
      borderColor: "border-amber-100",
    },
    {
      label: "Blogs",
      value: counts.blogs,
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50",
      borderColor: "border-purple-100",
    },
    {
      label: "Events",
      value: counts.events,
      icon: Calendar,
      color: "text-pink-600",
      bg: "bg-pink-50",
      borderColor: "border-pink-100",
    },
    {
      label: "Placements",
      value: counts.placements,
      icon: Briefcase,
      color: "text-green-600",
      bg: "bg-green-50",
      borderColor: "border-green-100",
    },
    {
      label: "Gallery Images",
      value: counts.gallery,
      icon: Image,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      borderColor: "border-indigo-100",
    },
    {
      label: "Notices",
      value: counts.notices,
      icon: Bell,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      borderColor: "border-cyan-100",
    },
  ];

  // Chart group data
  const enquiryChartData = useMemo(() => [
    { label: "Pending", value: enquiryStatusCounts.Pending, color: "#f59e0b", bg: "bg-amber-500" },
    { label: "Responded", value: enquiryStatusCounts.Responded, color: "#10b981", bg: "bg-emerald-500" },
    { label: "Closed", value: enquiryStatusCounts.Closed, color: "#6366f1", bg: "bg-indigo-500" },
  ], [enquiryStatusCounts]);

  const eventChartData = useMemo(() => [
    { label: "Upcoming", value: eventStatusCounts.Upcoming, color: "#06b6d4", bg: "bg-cyan-500" },
    { label: "Completed", value: eventStatusCounts.Completed, color: "#8b5cf6", bg: "bg-violet-500" },
    { label: "Cancelled", value: eventStatusCounts.Cancelled, color: "#ef4444", bg: "bg-red-500" },
  ], [eventStatusCounts]);

  const maxEnquiryVal = Math.max(...enquiryChartData.map((d) => d.value), 1);
  const maxEventVal = Math.max(...eventChartData.map((d) => d.value), 1);

  // Reusable bar group renderer
  const renderBarGroup = (data, maxVal, delayOffset = 0) => (
    <div className="flex items-end justify-center gap-6 sm:gap-10" style={{ height: "180px" }}>
      {data.map((item, i) => {
        const heightPercent = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
        return (
          <div key={i} className="flex flex-col items-center gap-1.5 w-16 sm:w-20">
            <span className="text-sm font-bold text-slate-700">{item.value}</span>
            <div className="w-full flex items-end justify-center" style={{ height: "140px" }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(heightPercent, 3)}%` }}
                transition={{ duration: 0.8, delay: (delayOffset + i) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="w-10 sm:w-12 rounded-t-lg min-h-[4px] relative group cursor-pointer"
                style={{ backgroundColor: item.color }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {item.label}: {item.value}
                </div>
              </motion.div>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 text-center leading-tight">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-6">
      {/* ─── Dashboard Header ─── */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            Admin Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage enquiries, content, and institute activities
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {TIME_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200"
                  : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ─── Stat Cards Row ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className={`relative bg-white rounded-2xl border ${stat.borderColor} p-4 shadow-sm hover:shadow-md transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                {stat.label}
              </p>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Analytics Charts — Two Separate Groups ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Enquiry Status Chart */}
        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-amber-700" />
              </div>
              <h3 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
                Enquiry Status
              </h3>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-3 flex-wrap">
              {enquiryChartData.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.bg}`} />
                  <span className="text-[10px] font-semibold text-slate-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          {renderBarGroup(enquiryChartData, maxEnquiryVal, 0)}
        </motion.div>

        {/* Event Status Chart */}
        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-pink-700" />
              </div>
              <h3 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
                Event Status
              </h3>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-3 flex-wrap">
              {eventChartData.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.bg}`} />
                  <span className="text-[10px] font-semibold text-slate-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          {renderBarGroup(eventChartData, maxEventVal, 3)}
        </motion.div>
      </div>

      {/* ─── Recent Enquiries Table ─── */}
      <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-amber-700" />
            </div>
            <h3 className="text-[15px] font-extrabold text-slate-900 tracking-tight">
              Recent Enquiries
            </h3>
          </div>
          <Link
            to="/adminpanel/enquiries"
            className="text-[11px] font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors"
          >
            View All <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider hidden sm:table-cell">
                  Phone
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider hidden lg:table-cell">
                  Course
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length > 0 ? (
                enquiries.map((enq, i) => (
                  <tr
                    key={enq.id || i}
                    className={`border-b border-slate-50 hover:bg-purple-50/30 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }`}
                  >
                    <td className="px-5 py-3 text-[12px] font-semibold text-slate-800">
                      {enq.name || "—"}
                    </td>
                    <td className="px-5 py-3 text-[12px] text-slate-600 hidden sm:table-cell">
                      {enq.phone || "—"}
                    </td>
                    <td className="px-5 py-3 text-[12px] text-slate-600 hidden md:table-cell">
                      {enq.email || "—"}
                    </td>
                    <td className="px-5 py-3 text-[12px] text-slate-600 hidden lg:table-cell">
                      {enq.course || "—"}
                    </td>
                    <td className="px-5 py-3 text-[12px] text-slate-500">
                      {enq.date || "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          enq.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : enq.status === "Responded"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {enq.status === "Pending" && <Clock className="w-3 h-3" />}
                        {enq.status === "Responded" && <CheckCircle className="w-3 h-3" />}
                        {enq.status === "Closed" && <XCircle className="w-3 h-3" />}
                        {enq.status || "—"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-[13px] text-slate-400 italic">
                    No enquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ─── Bottom Summary Stats ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          variants={fadeUp}
          className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-5 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Published Blogs
          </p>
          <span className="text-3xl font-black text-purple-600 tracking-tight">
            {counts.blogs - counts.blogsDraft}
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-5 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Placed Students
          </p>
          <span className="text-3xl font-black text-green-600 tracking-tight">
            {counts.placements}
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-5 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Total Notices
          </p>
          <span className="text-3xl font-black text-cyan-600 tracking-tight">
            {counts.notices}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
