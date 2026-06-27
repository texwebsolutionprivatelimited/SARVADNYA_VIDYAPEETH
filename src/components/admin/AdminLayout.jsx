import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Calendar,
  MessageSquare,
  Image,
  Briefcase,
  Bell,
  Settings,
  Menu,
  X,
  ChevronLeft,
  LogOut,
  Shield,
  Home,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/adminpanel" },
  { label: "Blogs", icon: FileText, path: "/adminpanel/blogs" },
  { label: "Brochures", icon: BookOpen, path: "/adminpanel/brochures" },
  { label: "Events", icon: Calendar, path: "/adminpanel/events" },
  { label: "Enquiries", icon: MessageSquare, path: "/adminpanel/enquiries" },
  { label: "Gallery", icon: Image, path: "/adminpanel/gallery" },
  { label: "Placements", icon: Briefcase, path: "/adminpanel/placements" },
  { label: "Notices", icon: Bell, path: "/adminpanel/notices" },
  { label: "Settings", icon: Settings, path: "/adminpanel/settings" },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Responsive: collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => {
    if (path === "/adminpanel") return pathname === "/adminpanel";
    return pathname.startsWith(path);
  };

  const currentPage = SIDEBAR_ITEMS.find((item) => isActive(item.path));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* ─── Mobile Overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ─── Sidebar ─── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-64" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          bg-gradient-to-b from-purple-950 via-[#1a0a30] to-indigo-950 shadow-2xl shadow-purple-900/30`}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center ${sidebarOpen ? "justify-between" : "justify-center"} p-4 border-b border-purple-800/40`}>
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-[13px] tracking-wide leading-tight font-heading">
                  SV Admin
                </span>
                <span className="text-purple-300/70 text-[9px] font-bold tracking-widest uppercase">
                  Control Panel
                </span>
              </div>
            </Link>
          )}
          {!sidebarOpen && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-purple-800/50 text-purple-300 hover:text-white transition-colors"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin">
          {SIDEBAR_ITEMS.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200
                  ${active
                    ? "bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-white shadow-lg shadow-purple-600/25 border border-purple-500/30"
                    : "text-purple-200/70 hover:text-white hover:bg-purple-800/40 border border-transparent"
                  }
                  ${!sidebarOpen ? "justify-center px-0" : ""}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${active ? "text-white" : "text-purple-400 group-hover:text-purple-200"}`} />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
                {active && sidebarOpen && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-3 border-t border-purple-800/40 space-y-1 ${!sidebarOpen ? "flex flex-col items-center" : ""}`}>
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[12px] font-semibold text-purple-300/70 hover:text-white hover:bg-purple-800/40 transition-all duration-200 ${!sidebarOpen ? "justify-center px-0" : ""}`}
            title="Back to Website"
          >
            <Home className="w-[16px] h-[16px] flex-shrink-0" />
            {sidebarOpen && <span>Back to Website</span>}
          </Link>
          <button
            onClick={() => signOut(auth)}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[12px] font-semibold text-purple-300/70 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 ${!sidebarOpen ? "justify-center px-0" : ""}`}
            title="Sign Out"
          >
            <LogOut className="w-[16px] h-[16px] flex-shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ─── Main Content Area ─── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between h-16 px-4 lg:px-6 bg-white border-b border-purple-100/60 shadow-sm flex-shrink-0">
          {/* Left: Mobile toggle + Page title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-purple-50 text-purple-800 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex flex-col">
              <h1 className="text-[15px] sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
                {currentPage?.label || "Admin Panel"}
              </h1>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                Sarvadnya Vidyapeeth — Administration
              </span>
            </div>
          </div>

          {/* Right: Admin avatar */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[12px] font-bold text-slate-800">Administrator</span>
              <span className="text-[10px] text-slate-400">admin@svidyapeeth.edu</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-bold text-[13px] shadow-md shadow-purple-300/30 border-2 border-white">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-slate-50/80">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
