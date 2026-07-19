import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EnquiryModal from "./EnquiryModal";

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Scroll to top instantly on route change, or scroll to hash if present
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        const timer = setTimeout(() => {
          const el = document.getElementById(hash.replace("#", ""));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return (
    <div className="font-sans antialiased text-slate-700 bg-slate-50 min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <EnquiryModal />
    </div>
  );
}
