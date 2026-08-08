import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  UserPlus,
  Award,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  Building2,
  Briefcase,
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  Star,
} from "lucide-react";
import { getSuperAdminStats, getEnrollments, getScholarships, getStaff } from "../../../hooks/superAdminData";
import { getStudents, getPayments, initERP } from "../../../hooks/erpData";

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    initERP();
    const s = getSuperAdminStats();
    setStats(s);
    setRecentEnrollments(getEnrollments().slice(-5).reverse());
    setRecentPayments(getPayments().slice(-5).reverse());
  }, []);

  if (!stats) return null;

  const statCards = [
    { label: "Total Students", value: stats.totalStudents, icon: GraduationCap, color: "from-purple-500 to-indigo-600", bg: "bg-purple-50", textColor: "text-purple-700", link: "/superadmin-dashboard/students" },
    { label: "Active Staff", value: `${stats.activeStaff}/${stats.totalStaff}`, icon: Building2, color: "from-blue-500 to-cyan-600", bg: "bg-blue-50", textColor: "text-blue-700", link: "/superadmin-dashboard/staff" },
    { label: "Pending Enrollments", value: stats.pendingEnrollments, icon: UserPlus, color: "from-amber-500 to-orange-600", bg: "bg-amber-50", textColor: "text-amber-700", link: "/superadmin-dashboard/enrollment" },
    { label: "Active Scholarships", value: stats.activeScholarships, icon: Award, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50", textColor: "text-emerald-700", link: "/superadmin-dashboard/scholarships" },
    { label: "Fee Collected", value: `₹${(stats.collectedFees / 1000).toFixed(0)}K`, icon: IndianRupee, color: "from-green-500 to-emerald-600", bg: "bg-green-50", textColor: "text-green-700", link: "/superadmin-dashboard/student-fees" },
    { label: "Collection Rate", value: `${stats.feeCollectionRate}%`, icon: TrendingUp, color: "from-red-500 to-rose-600", bg: "bg-red-50", textColor: "text-red-700", link: "/superadmin-dashboard/student-fees" },
  ];

  const enrollmentStatusColor = {
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="space-y-5">
      {/* ── Welcome Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">
              Super Admin Dashboard
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
            Welcome back, Administrator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Here's your institution overview for today, {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </motion.div>

      {/* ── Stat Cards Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={card.link}
              className="block p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center shadow-md`}>
                  <card.icon className="w-4.5 h-4.5 text-white" />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <p className="text-xl font-extrabold text-gray-800 leading-tight">{card.value}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{card.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
      >
        <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-red-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Link to="/superadmin-dashboard/students" className="flex items-center gap-2.5 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-100 hover:border-purple-200 transition-all group">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center shadow-sm">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-purple-800">Manage Students</p>
              <p className="text-[9px] text-purple-500">Add / Edit / View</p>
            </div>
          </Link>
          <Link to="/superadmin-dashboard/staff" className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-100 hover:border-blue-200 transition-all group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-blue-800">Manage Staff</p>
              <p className="text-[9px] text-blue-500">Directory & Attendance</p>
            </div>
          </Link>
          <Link to="/superadmin-dashboard/enrollment" className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-100 hover:border-amber-200 transition-all group">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center shadow-sm">
              <UserPlus className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-amber-800">Review Enrollments</p>
              <p className="text-[9px] text-amber-500">{stats.pendingEnrollments} pending</p>
            </div>
          </Link>
          <Link to="/superadmin-dashboard/scholarships" className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 hover:border-emerald-200 transition-all group">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm">
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-emerald-800">Scholarships</p>
              <p className="text-[9px] text-emerald-500">₹{(stats.totalScholarshipAmount / 1000).toFixed(0)}K disbursed</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* ── Main Grid: Course Distribution + Fee Overview ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Course Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
        >
          <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-purple-600" />
            Student Distribution by Course
          </h2>
          <div className="space-y-3">
            {[
              { label: "BCA", count: stats.bcaStudents, color: "bg-purple-600", percent: stats.totalStudents > 0 ? Math.round((stats.bcaStudents / stats.totalStudents) * 100) : 0 },
              { label: "BBA", count: stats.bbaStudents, color: "bg-blue-600", percent: stats.totalStudents > 0 ? Math.round((stats.bbaStudents / stats.totalStudents) * 100) : 0 },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                    <span className="text-xs font-bold text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-xs font-extrabold text-gray-800">{item.count} Students ({item.percent}%)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Staff Type Breakdown */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Staff Breakdown</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 text-center">
                <p className="text-lg font-extrabold text-blue-700">{stats.teachingStaff}</p>
                <p className="text-[9px] font-bold text-blue-500 uppercase">Teaching</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <p className="text-lg font-extrabold text-slate-700">{stats.nonTeachingStaff}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase">Non-Teaching</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fee Collection Overview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
        >
          <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-green-600" />
            Fee Collection Overview
          </h2>

          {/* Circle Progress */}
          <div className="flex items-center gap-6 mb-4">
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="7" />
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke={stats.feeCollectionRate >= 70 ? "#10b981" : stats.feeCollectionRate >= 40 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={`${stats.feeCollectionRate * 2.64} ${264 - stats.feeCollectionRate * 2.64}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-gray-800">{stats.feeCollectionRate}%</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase">Collected</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="p-2.5 rounded-lg bg-green-50 border border-green-100">
                <p className="text-[9px] font-bold text-green-500 uppercase">Collected</p>
                <p className="text-base font-extrabold text-green-700">₹{stats.collectedFees.toLocaleString("en-IN")}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-100">
                <p className="text-[9px] font-bold text-red-500 uppercase">Pending</p>
                <p className="text-base font-extrabold text-red-700">₹{stats.pendingFees.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Total Fees</span>
              <span className="text-sm font-extrabold text-gray-800">₹{stats.totalFees.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-bold text-gray-500">Total Transactions</span>
              <span className="text-sm font-extrabold text-gray-800">{stats.totalTransactions}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Recent Activity Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Enrollments */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-amber-500" />
              Recent Enrollment Applications
            </h2>
            <Link to="/superadmin-dashboard/enrollment" className="text-[10px] font-bold text-red-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-2">
            {recentEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {enrollment.applicantName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-gray-800 truncate">{enrollment.applicantName}</p>
                    <p className="text-[9px] text-gray-400">{enrollment.courseApplied} • {enrollment.appliedDate}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${enrollmentStatusColor[enrollment.status]}`}>
                  {enrollment.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Fee Payments */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-green-500" />
              Recent Fee Payments
            </h2>
            <Link to="/superadmin-dashboard/student-fees" className="text-[10px] font-bold text-red-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-2">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    <IndianRupee className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-gray-800 truncate">{payment.studentName}</p>
                    <p className="text-[9px] text-gray-400">{payment.rollNumber} • {payment.date}</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-green-700">₹{payment.amount.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Enrollment Summary Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
      >
        <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-indigo-600" />
          Enrollment Summary (Session 2025-2026)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center">
            <p className="text-2xl font-extrabold text-gray-800">{stats.totalEnrollments}</p>
            <p className="text-[9px] font-bold text-gray-500 uppercase">Total Applications</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <p className="text-2xl font-extrabold text-amber-700">{stats.pendingEnrollments}</p>
            <p className="text-[9px] font-bold text-amber-500 uppercase">Pending Review</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-700">{stats.approvedEnrollments}</p>
            <p className="text-[9px] font-bold text-emerald-500 uppercase">Approved</p>
          </div>
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <XCircle className="w-3.5 h-3.5 text-red-500" />
            </div>
            <p className="text-2xl font-extrabold text-red-600">{stats.rejectedEnrollments}</p>
            <p className="text-[9px] font-bold text-red-500 uppercase">Rejected</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
