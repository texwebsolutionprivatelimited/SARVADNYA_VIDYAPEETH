import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { auth, signOut } from "../../firebase";
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
  Quote,
  HelpCircle,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/adminpanel" },
  { label: "Blogs", icon: FileText, path: "/adminpanel/blogs" },
  { label: "FAQs", icon: HelpCircle, path: "/adminpanel/faqs" },
  { label: "Events", icon: Calendar, path: "/adminpanel/events" },
  { label: "Enquiries", icon: MessageSquare, path: "/adminpanel/enquiries" },
  { label: "Gallery", icon: Image, path: "/adminpanel/gallery" },
  { label: "Placements", icon: Briefcase, path: "/adminpanel/placements" },
  { label: "Notices", icon: Bell, path: "/adminpanel/notices" },
  { label: "Testimonials", icon: Quote, path: "/adminpanel/testimonials" },
  { label: "Settings", icon: Settings, path: "/adminpanel/settings" },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobileRange, setIsMobileRange] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Responsive: collapse sidebar on small screens & detect 320-768px range
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileRange(width >= 320 && width <= 768);
      if (width < 1024) {
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
  const showFullSidebar = sidebarOpen || isMobileRange;

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
          ${showFullSidebar ? "w-64" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          bg-gradient-to-b from-[#280843] via-[#1f0535] to-[#140224] shadow-2xl shadow-purple-950/40`}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center ${showFullSidebar ? "justify-between" : "justify-center"} p-4 border-b border-purple-800/40 bg-purple-950/40`}>
          {showFullSidebar ? (
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/images/Logo/logo.webp"
                alt="Sarvadnya Vidyapeeth Logo"
                className="w-10 h-10 object-contain rounded-full bg-white p-0.5 shadow-md border border-amber-400/50 flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-white font-black text-[13.5px] tracking-wider leading-tight font-heading uppercase">
                  Sarvadnya
                </span>
                <span className="text-amber-400 text-[9px] font-extrabold tracking-widest uppercase">
                  Admin Control Panel
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/" title="Sarvadnya Vidyapeeth Admin" className="flex items-center justify-center">
              <img
                src="/images/Logo/logo.webp"
                alt="Sarvadnya Vidyapeeth Logo"
                className="w-10 h-10 object-contain rounded-full bg-white p-0.5 shadow-md border border-amber-400/50 flex-shrink-0"
              />
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-purple-800/50 text-purple-300 hover:text-amber-300 transition-colors"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto scrollbar-thin">
          {SIDEBAR_ITEMS.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200
                  ${active
                    ? "bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-lg shadow-purple-950/40 border border-amber-500/30"
                    : "text-purple-200/70 hover:text-amber-300 hover:bg-purple-900/40 border border-transparent"
                  }
                  ${!showFullSidebar ? "justify-center px-0" : ""}`}
                title={!showFullSidebar ? item.label : undefined}
              >
                <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${active ? "text-amber-400" : "text-purple-400 group-hover:text-amber-300"}`} />
                {showFullSidebar && <span className="truncate">{item.label}</span>}
                {active && showFullSidebar && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400/80 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-purple-800/40">
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_authenticated");
              signOut(auth);
            }}
            className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-[13px] font-bold text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 shadow-md shadow-red-950/40 border border-red-500/30 transition-all duration-200 active:scale-[0.98] ${!showFullSidebar ? "justify-center px-0" : ""}`}
            title="Sign Out"
          >
            <LogOut className="w-[18px] h-[18px] flex-shrink-0 text-white" />
            {showFullSidebar && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ─── Main Content Area ─── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between h-16 px-4 lg:px-6 bg-white border-b border-purple-100 shadow-xs flex-shrink-0">
          {/* Left: Mobile toggle + Page title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-purple-50 text-purple-900 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex flex-col">
              <h1 className="text-[15px] sm:text-lg font-black text-purple-950 tracking-tight leading-tight font-heading uppercase">
                {currentPage?.label || "Admin Panel"}
              </h1>
              <span className="text-[9.5px] text-amber-600 font-extrabold tracking-wider uppercase hidden sm:block">
                Sarvadnya Vidyapeeth • Affiliated to AKU, Patna
              </span>
            </div>
          </div>

          {/* Right: Admin avatar */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[12px] font-extrabold text-purple-950">Administrator</span>
              <span className="text-[10px] text-slate-500 font-medium">{auth.currentUser?.email || "admin@sarvadnya.com"}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-900 to-amber-500 flex items-center justify-center text-white font-black text-[13px] shadow-md shadow-purple-950/20 border-2 border-amber-300">
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
