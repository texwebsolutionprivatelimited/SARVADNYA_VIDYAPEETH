import React, { useState } from "react";
import { Routes, Route, NavLink, useNavigate, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Calendar,
  Award,
  ClipboardList,
  FileText,
  IndianRupee,
  CreditCard,
  Receipt,
  BookMarked,
  User,
  CalendarDays,
  Bell,
  Phone,
  Briefcase,
  FileUp,
  Info,
  BookOpenCheck,
  BookCopy,
  Scale,
  MessageSquare,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Search,
  Settings,
  BarChart3,
} from "lucide-react";

import ERPDashboard from "./ERPDashboard";
import AttendancePage from "./academic/AttendancePage";
import TimetablePage from "./academic/TimetablePage";
import ExamResultPage from "./academic/ExamResultPage";
import FeeDetailsPage from "./fees/FeeDetailsPage";
import ProfilePage from "./general_info/ProfilePage";
import PlacementDrivesPage from "./placement/PlacementDrivesPage";
import ResumeUpdatePage from "./placement/ResumeUpdatePage";
import LibraryLedgerPage from "./library/LibraryLedgerPage";
import LibraryRulesPage from "./library/LibraryRulesPage";
import AcademicCalendarPage from "./general_info/AcademicCalendarPage";
import NoticesPage from "./communication/NoticesPage";
import QueryFacultyPage from "./communication/QueryFacultyPage";
import { studentProfile } from "../../../hooks/studentPortalData";

/* ── Sidebar menu structure ── */
const sidebarMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/student-dashboard",
  },
  {
    id: "academic",
    label: "Academic",
    icon: GraduationCap,
    children: [
      { label: "Attendance Status", path: "/student-dashboard/attendance", icon: BarChart3 },
      { label: "Time Table", path: "/student-dashboard/timetable", icon: Calendar },
      { label: "Exam Result", path: "/student-dashboard/results", icon: Award },
    ],
  },
  {
    id: "fees",
    label: "Fees",
    icon: IndianRupee,
    children: [
      { label: "Fee Receipts", path: "/student-dashboard/fees?tab=receipts", icon: Receipt },
      { label: "Pay Fee Online", path: "/student-dashboard/fees?tab=onlinePay", icon: CreditCard },
      { label: "Fee Installment Chart", path: "/student-dashboard/fees?tab=installments", icon: FileText },
      { label: "Student Ledger", path: "/student-dashboard/fees?tab=ledger", icon: BookMarked },
    ],
  },
  {
    id: "general",
    label: "General Info.",
    icon: Info,
    children: [
      { label: "Your Profile", path: "/student-dashboard/profile", icon: User },
      { label: "Academic Calendar", path: "/student-dashboard/academic-calendar", icon: CalendarDays },
    ],
  },
  {
    id: "placements",
    label: "Placements",
    icon: Briefcase,
    children: [
      { label: "Placement Drives", path: "/student-dashboard/placements", icon: Briefcase },
      { label: "Update Resume", path: "/student-dashboard/resume", icon: FileUp },
    ],
  },
  {
    id: "library",
    label: "Library",
    icon: BookOpen,
    children: [
      { label: "Circulation Ledger", path: "/student-dashboard/library-ledger", icon: BookCopy },
      { label: "Library Rules", path: "/student-dashboard/library-rules", icon: Scale },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    icon: MessageSquare,
    children: [
      { label: "Query to Faculty", path: "/student-dashboard/faculty-query", icon: HelpCircle },
      { label: "Notices", path: "/student-dashboard/notices", icon: Bell },
    ],
  },
];

export default function StudentERP() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState(["academic"]);

  const toggleMenu = (id) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleLogout = () => navigate("/student");

  const currentFullUrl =
    location.pathname +
    (location.search ||
      (location.pathname === "/student-dashboard/fees" ? "?tab=receipts" : ""));

  const isActiveChild = (childPath) => {
    if (childPath.includes("?")) {
      return currentFullUrl === childPath;
    }
    return location.pathname === childPath;
  };

  return (
    <div className="h-screen bg-gray-100 flex font-sans overflow-hidden">
      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Fixed Dark Sidebar ── */}
      <aside
        className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-[260px] h-screen bg-slate-800 flex flex-col shrink-0 transition-transform duration-300 ease-in-out overflow-y-auto sidebar-scroll ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 px-4 py-4 bg-slate-900/60 border-b border-slate-700/50 shrink-0">
          <img
            src="/images/Logo/logo.webp"
            alt="Logo"
            className="w-9 h-9 rounded-full bg-white p-0.5 object-contain"
          />
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold leading-tight truncate">
              Sarvadnya Vidyapeeth
            </p>
            <p className="text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">
              Student ERP
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 overflow-y-auto py-2 sidebar-scroll">
          {sidebarMenu.map((item) => {
            // Single link (no children)
            if (!item.children) {
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 mx-2 my-0.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${isActive
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30"
                      : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
                    }`
                  }
                >
                  <item.icon className="w-[17px] h-[17px] flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            }

            // Accordion parent
            const isExpanded = expandedMenus.includes(item.id);
            const hasActiveChild = item.children.some((c) => isActiveChild(c.path));

            return (
              <div key={item.id} className="mx-2 my-0.5">
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${hasActiveChild
                    ? "bg-slate-700/80 text-white"
                    : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
                    }`}
                >
                  <item.icon className="w-[17px] h-[17px] flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-1 space-y-0.5">
                        {item.children.map((child) => {
                          const active = isActiveChild(child.path);
                          return (
                            <NavLink
                              key={child.label}
                              to={child.path}
                              onClick={() => setSidebarOpen(false)}
                              className={
                                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-150 ${active
                                  ? "bg-purple-600/90 text-white font-bold shadow-md shadow-purple-950/40"
                                  : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                                }`
                              }
                            >
                              <child.icon className="w-[14px] h-[14px] flex-shrink-0" />
                              <span>{child.label}</span>
                            </NavLink>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Mentor & Logout Footer Section - Anchored at bottom of dark sidebar */}
        <div className="mt-auto px-3 py-3 border-t border-slate-700/60 bg-slate-900/90 flex flex-col gap-2 shrink-0">
          {/* Mentor Info */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700/50 shadow-inner">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow">
              {studentProfile.mentorName ? studentProfile.mentorName.split(" ").map((n) => n[0]).join("").slice(0, 2) : "PK"}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-wider block leading-none">
                Your Mentor
              </span>
              <p className="text-white text-xs font-bold truncate leading-tight mt-1">
                {studentProfile.mentorName}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 transition-all shadow-sm active:scale-[0.98]"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Scrollable White Content Area ── */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <img
                src="/images/Logo/logo.webp"
                alt="Logo"
                className="w-8 h-8 rounded-full bg-white border border-gray-200 p-0.5 object-contain"
              />
              <span className="text-base font-bold text-gray-800">
                Sarvadnya Vidyapeeth
              </span>
            </div>
          </div>

          {/* Student Info + Profile */}
          <div className="flex items-center gap-3">
            {/* Course Info */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 text-xs">
              <span className="font-bold text-gray-700">
                {studentProfile.course} ({studentProfile.department})
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{studentProfile.semester}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Section - {studentProfile.section}</span>
            </div>

            {/* Search */}
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-400">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-[11px] font-bold shadow-md">
                {studentProfile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-gray-800 leading-tight">
                  {studentProfile.name}
                </p>
                <p className="text-[10px] text-gray-400 leading-tight">
                  {studentProfile.rollNumber}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-5">
          <Routes>
            <Route index element={<ERPDashboard />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="timetable" element={<TimetablePage />} />
            <Route path="results" element={<ExamResultPage />} />
            <Route path="fees" element={<FeeDetailsPage />} />
            <Route path="placements" element={<PlacementDrivesPage />} />
            <Route path="resume" element={<ResumeUpdatePage />} />
            <Route path="library-ledger" element={<LibraryLedgerPage />} />
            <Route path="library-rules" element={<LibraryRulesPage />} />
            <Route path="academic-calendar" element={<AcademicCalendarPage />} />
            <Route path="notices" element={<NoticesPage />} />
            <Route path="faculty-query" element={<QueryFacultyPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/student-dashboard" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-6 py-2.5 text-center mt-auto">
          <p className="text-[10px] text-gray-400">
            © {new Date().getFullYear()} Sarvadnya Vidyapeeth, Affiliated to Aryabhatta Knowledge University, Patna | Powered by{" "}
            <a href="https://texwebsolution.in" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-bold hover:underline">
              Texweb Solution Pvt. Ltd.
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
