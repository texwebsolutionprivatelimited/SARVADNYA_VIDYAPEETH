import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  {
    label: "ABOUT US",
    path: "/about",
  },
  {
    label: "DEPARTMENTS",
    children: [
      { label: "BBA", path: "/courses/bba" },
      { label: "BCA", path: "/courses/bca" },
    ],
  },
  {
    label: "ADMISSION",
    path: "/admission",
  },
  {
    label: "PLACEMENT",
    path: "/placements",
  },
  {
    label: "LIFE@CAMPUS",
    children: [
      { label: "Campus Tour", path: "/campus" },
      { label: "Hostel & Dining", path: "/hostel" },
      { label: "Live Classes", path: "/live-classes" },
      { label: "Events ", path: "/events" }
    ],
  },
];

const isPathActive = (itemPath, currentPath) => {
  if (!itemPath) return false;
  if (itemPath === "/") {
    return currentPath === "/";
  }
  return currentPath === itemPath || currentPath.startsWith(itemPath + "/");
};

const isDropdownActive = (children, currentPath) => {
  return children?.some(child => isPathActive(child.path, currentPath));
};

function NavDropdown({ item, isActive, onOpen, onClose, alignRight }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const { pathname } = useLocation();

  const active = isDropdownActive(item.children, pathname);

  useEffect(() => {
    const handleMouseLeave = () => {
      setIsHovered(false);
      onClose();
    };
    const node = containerRef.current;
    if (node) {
      node.addEventListener("mouseleave", handleMouseLeave);
      return () => node.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center h-full"
      onMouseEnter={() => {
        setIsHovered(true);
        onOpen();
      }}
    >
      <button
        className={`flex items-center gap-0.5 min-[1440px]:gap-1 px-2 py-1.5 xl:px-3.5 xl:py-1.5 min-[1440px]:px-4 min-[1440px]:py-2 text-[9px] xl:text-[11px] min-[1440px]:text-[12px] font-bold rounded-full transition-all duration-300 uppercase whitespace-nowrap tracking-wider ${active
          ? "bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-md shadow-purple-900/20 border border-purple-700/50"
          : "text-slate-800 hover:text-purple-900 hover:bg-purple-50 hover:border-purple-100 border border-transparent"
          }`}
      >
        {item.label}
        <ChevronDown
          size={10}
          className={`w-2.5 h-2.5 min-[1440px]:w-3.5 min-[1440px]:h-3.5 opacity-80 transition-transform duration-200 ${isHovered ? "rotate-180" : ""} ${active ? "text-white" : isHovered ? "text-purple-700" : "text-slate-400"}`}
        />
      </button>

      {isHovered && (
        <div className={`absolute top-[56px] min-[1440px]:top-[60px] ${alignRight ? "right-0" : "left-0"} bg-white rounded-xl shadow-xl border border-purple-100/50 py-1.5 min-w-[190px] z-[200] animate-[slideDown_0.15s_ease-out] overflow-hidden`}>
          {item.children.map((child) => {
            const childActive = isPathActive(child.path, pathname);
            return (
              <Link
                key={child.label}
                to={child.path}
                onClick={() => {
                  setIsHovered(false);
                  onClose();
                }}
                className={`block px-4 py-2 min-[1440px]:px-5 min-[1440px]:py-2.5 text-[11px] min-[1440px]:text-[12.5px] font-semibold transition-colors ${childActive
                  ? "bg-purple-50 text-purple-900 font-bold border-l-4 border-purple-700"
                  : "text-slate-700 hover:bg-purple-50 hover:text-[#320C50]"
                  }`}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setActiveIdx(-1);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/95 backdrop-blur-md shadow-md border-b border-purple-100">
        <div className="max-w-[1550px] mx-auto px-3 xl:px-5 min-[1440px]:px-6 flex items-center justify-between h-full">

          {/* Logo and Tagline area */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* SV Official Logo Image */}
                <img
                  src="/images/Logo/logo.webp"
                  alt="Sarvadnya Vidyapeeth Logo"
                  className="w-9 h-9 sm:w-11 sm:h-11 min-[1440px]:w-[42px] min-[1440px]:h-[42px] object-contain flex-shrink-0 rounded-full bg-white p-0.5 shadow-md border border-purple-200/50"
                />
                <div className="flex flex-col">
                  <span className="text-purple-950 font-black text-[12px] xs:text-[13.5px] sm:text-[15px] min-[1440px]:text-[16px] leading-tight tracking-wider uppercase font-heading">
                    Sarvadnya Vidyapeeth
                  </span>
                  <span className="text-amber-600 text-[7px] xs:text-[7.5px] font-black tracking-widest leading-none uppercase block max-[340px]:hidden sm:hidden lg:block xl:hidden">
                    Affiliated to AKU, Patna
                  </span>
                  <span className="text-amber-600 text-[8.5px] min-[1440px]:text-[9px] font-black tracking-widest leading-none uppercase hidden sm:block lg:hidden xl:block">
                    Patna • Affiliated to Aryabhatta Knowledge University, Patna
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav - Aligned Right */}
          <div className="hidden lg:flex items-center ml-auto gap-2 xl:gap-4 min-[1440px]:gap-4 h-full">
            <Link
              to="/"
              className={`flex items-center gap-1 px-2 py-1.5 xl:px-3.5 xl:py-1.5 min-[1440px]:px-4 min-[1440px]:py-2 text-[9px] xl:text-[11px] min-[1440px]:text-[12px] font-bold rounded-full transition-all duration-300 uppercase whitespace-nowrap tracking-wider ${pathname === "/"
                ? "bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-md shadow-purple-900/20 border border-purple-700/50"
                : "text-slate-800 hover:text-purple-900 hover:bg-purple-50 hover:border-purple-100 border border-transparent"
                }`}
            >
              HOME
            </Link>
            {NAV_ITEMS.map((item, i) =>
              item.children ? (
                <NavDropdown
                  key={item.label}
                  item={item}
                  isActive={activeIdx === i}
                  onOpen={() => setActiveIdx(i)}
                  onClose={() => setActiveIdx(-1)}
                  alignRight={i >= NAV_ITEMS.length - 2}
                />
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center px-2 py-1.5 xl:px-3.5 xl:py-1.5 min-[1440px]:px-4 min-[1440px]:py-2 text-[9px] xl:text-[11px] min-[1440px]:text-[12px] font-bold rounded-full transition-all duration-300 uppercase whitespace-nowrap tracking-wider ${isPathActive(item.path, pathname)
                    ? "bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-md shadow-purple-900/20 border border-purple-700/50"
                    : "text-slate-800 hover:text-purple-900 hover:bg-purple-50 hover:border-purple-100 border border-transparent"
                    }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right side: Enquiry Button & Mobile Toggle */}
          <div className="flex-shrink-0 ml-auto lg:ml-0 flex items-center gap-2 xl:gap-3 pl-3 xl:pl-6 min-[1440px]:pl-4">
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 xl:px-5 xl:py-2 min-[1440px]:px-5 min-[1440px]:py-2 text-[9.5px] xl:text-[11.5px] min-[1440px]:text-[12px] font-black uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-md shadow-orange-500/25 border border-amber-400 hover:from-amber-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 whitespace-nowrap"
            >
              ENQUIRY
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-slate-800 p-1 hover:bg-slate-100 rounded transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} className="text-purple-800" /> : <Menu size={18} className="text-purple-800" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-40 overflow-y-auto border-t border-purple-100 animate-[slideDown_0.2s_ease-out]">
          <div className="px-4 py-5 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center py-2.5 px-3.5 text-[12px] font-bold uppercase tracking-wider rounded-xl transition-all duration-200 ${pathname === "/"
                ? "bg-purple-900 text-white shadow-md shadow-purple-900/10"
                : "text-slate-800 hover:text-purple-850 hover:bg-purple-50"
                }`}
            >
              HOME
            </Link>
            {NAV_ITEMS.map((item) => {
              const dropdownActive = isDropdownActive(item.children, pathname);
              const itemActive = isPathActive(item.path, pathname);

              return item.children ? (
                <details key={item.label} className="group pb-1">
                  <summary
                    className={`flex items-center justify-between py-2.5 px-3.5 text-[12px] font-bold cursor-pointer list-none uppercase tracking-wider rounded-xl transition-all duration-200 ${dropdownActive
                      ? "bg-purple-50 text-purple-900 border-l-4 border-purple-700 shadow-sm"
                      : "text-slate-800 hover:text-purple-800 hover:bg-purple-50"
                      }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      className={`group-open:rotate-180 transition-transform ${dropdownActive ? "text-purple-700" : "text-slate-400"
                        }`}
                    />
                  </summary>
                  <div className="pl-3 pr-1 py-1.5 space-y-1 bg-purple-50/40 rounded-xl mt-1.5 border border-purple-100/30">
                    {item.children.map((child) => {
                      const childActive = isPathActive(child.path, pathname);
                      return (
                        <Link
                          key={child.label}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className={`block py-2 px-3.5 text-[11px] font-bold rounded-lg transition-colors ${childActive
                            ? "bg-purple-100 text-purple-950 font-black border-l-2 border-purple-800"
                            : "text-slate-600 hover:text-purple-800 hover:bg-purple-50/50"
                            }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between py-2.5 px-3.5 text-[12px] font-bold uppercase tracking-wider rounded-xl transition-all duration-200 ${itemActive
                    ? "bg-purple-900 text-white shadow-md shadow-purple-900/10"
                    : "text-slate-800 hover:text-purple-800 hover:bg-purple-50"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* ENQUIRY button at the bottom of the mobile menu */}
            <div className="pt-4 border-t border-purple-100/50 mt-4 px-1.5">
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-3 px-4 text-[12px] font-black uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-md shadow-orange-500/25 border border-amber-400 text-center hover:from-amber-600 hover:to-orange-700 active:scale-[0.98] transition-all duration-200"
              >
                ENQUIRY
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}