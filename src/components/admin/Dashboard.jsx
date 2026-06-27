import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  FileText,
  Calendar,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Eye,
  Clock,
  Plus,
  Briefcase,
  Image,
  Bell,
} from "lucide-react";

const STATS = [
  {
    label: "Total Students",
    value: "1,247",
    change: "+12%",
    icon: Users,
    gradient: "from-purple-600 to-purple-800",
    shadowColor: "shadow-purple-500/25",
    iconBg: "bg-purple-500/20",
  },
  {
    label: "Enquiries",
    value: "89",
    change: "+24%",
    icon: MessageSquare,
    gradient: "from-amber-500 to-orange-600",
    shadowColor: "shadow-amber-500/25",
    iconBg: "bg-amber-500/20",
  },
  {
    label: "Active Blogs",
    value: "34",
    change: "+8%",
    icon: FileText,
    gradient: "from-indigo-600 to-blue-700",
    shadowColor: "shadow-indigo-500/25",
    iconBg: "bg-indigo-500/20",
  },
  {
    label: "Upcoming Events",
    value: "6",
    change: "+2",
    icon: Calendar,
    gradient: "from-pink-500 to-rose-600",
    shadowColor: "shadow-pink-500/25",
    iconBg: "bg-pink-500/20",
  },
];

const QUICK_ACTIONS = [
  { label: "New Blog", icon: FileText, path: "/adminpanel/blogs", color: "text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200" },
  { label: "Add Event", icon: Calendar, path: "/adminpanel/events", color: "text-pink-600 bg-pink-50 hover:bg-pink-100 border-pink-200" },
  { label: "Upload to Gallery", icon: Image, path: "/adminpanel/gallery", color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-200" },
  { label: "Post Notice", icon: Bell, path: "/adminpanel/notices", color: "text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-200" },
  { label: "View Enquiries", icon: MessageSquare, path: "/adminpanel/enquiries", color: "text-green-600 bg-green-50 hover:bg-green-100 border-green-200" },
  { label: "Add Placement", icon: Briefcase, path: "/adminpanel/placements", color: "text-cyan-600 bg-cyan-50 hover:bg-cyan-100 border-cyan-200" },
];

const RECENT_ACTIVITY = [
  { action: "New blog published", detail: "\"AI in Education: Future of Learning\"", time: "2 min ago", icon: FileText, color: "text-purple-600 bg-purple-100" },
  { action: "Enquiry received", detail: "Rahul Sharma — BCA Admission", time: "15 min ago", icon: MessageSquare, color: "text-amber-600 bg-amber-100" },
  { action: "Event created", detail: "Vidya-Tech Hackathon 2026", time: "1 hour ago", icon: Calendar, color: "text-pink-600 bg-pink-100" },
  { action: "Gallery updated", detail: "12 new photos added to Campus Tour", time: "3 hours ago", icon: Image, color: "text-indigo-600 bg-indigo-100" },
  { action: "Placement record", detail: "Ananya Verma placed at TCS — ₹6.5 LPA", time: "5 hours ago", icon: Briefcase, color: "text-green-600 bg-green-100" },
  { action: "Notice published", detail: "Exam schedule for July semester", time: "1 day ago", icon: Bell, color: "text-cyan-600 bg-cyan-100" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function Dashboard() {
  return (
    <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-6">
      {/* ─── Stat Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-5 text-white shadow-xl ${stat.shadowColor} group hover:scale-[1.02] transition-transform duration-300`}
            >
              {/* Decorative circle */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10 group-hover:bg-white/15 transition-colors duration-300" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/5" />

              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-black tracking-tight">{stat.value}</span>
                  <span className="flex items-center gap-0.5 text-[11px] font-bold text-white/90 bg-white/15 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Quick Actions + Recent Activity ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div variants={fadeUp} className="xl:col-span-1 bg-white rounded-2xl border border-purple-100/60 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Plus className="w-4 h-4 text-purple-700" />
            </div>
            <h3 className="text-[14px] font-extrabold text-slate-900 tracking-tight">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.path}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-bold border transition-all duration-200 hover:shadow-sm ${action.color}`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={fadeUp} className="xl:col-span-2 bg-white rounded-2xl border border-purple-100/60 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Clock className="w-4 h-4 text-indigo-700" />
              </div>
              <h3 className="text-[14px] font-extrabold text-slate-900 tracking-tight">Recent Activity</h3>
            </div>
            <button className="text-[11px] font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors">
              View All <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-slate-800">{activity.action}</p>
                    <p className="text-[11px] text-slate-500 truncate">{activity.detail}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap flex-shrink-0 mt-0.5">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ─── Overview Cards Row ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[13px] font-extrabold text-slate-900">Top Blog Posts</h4>
            <Eye className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-2.5">
            {["AI in Modern Education", "BCA Career Roadmap 2026", "Campus Life at SV"].map((title, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50/50 transition-colors">
                <span className="text-[11px] font-semibold text-slate-700 truncate">{title}</span>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">{[428, 312, 287][i]} views</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[13px] font-extrabold text-slate-900">Placement Highlights</h4>
            <Briefcase className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-600 font-medium">Avg. Package</span>
              <span className="text-[13px] font-extrabold text-green-600">₹5.2 LPA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-600 font-medium">Highest Package</span>
              <span className="text-[13px] font-extrabold text-purple-700">₹12 LPA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-600 font-medium">Students Placed</span>
              <span className="text-[13px] font-extrabold text-amber-600">92%</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[13px] font-extrabold text-slate-900">Upcoming Deadlines</h4>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-2.5">
            {[
              { title: "Admission Last Date", date: "Jul 15", urgent: true },
              { title: "Hackathon Registration", date: "Jul 10", urgent: false },
              { title: "Semester Results", date: "Jul 20", urgent: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-[11px] font-semibold text-slate-700">{item.title}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.urgent ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600"}`}>
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
