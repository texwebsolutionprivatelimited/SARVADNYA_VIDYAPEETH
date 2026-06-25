import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EnquiryModal from "./EnquiryModal";

const SEO_MAP = {
  "/": {
    title: "Sarvadnya Vidyapeeth | Top BBA & BCA College in Patna, Bihar",
    description: "Sarvadnya Vidyapeeth is a premier higher education college in Patna, Bihar. Affiliated to Aryabhatta Knowledge University (AKU), offering BBA and BCA with 100% placement assistance."
  },
  "/about": {
    title: "About Sarvadnya Vidyapeeth | Vision, Mission & Leadership",
    description: "Learn about Sarvadnya Vidyapeeth's vision, mission, leadership, and history. A premier institution for BBA & BCA in Patna, Bihar, affiliated to AKU."
  },
  "/courses": {
    title: "Courses at Sarvadnya Vidyapeeth | BBA & BCA Programs",
    description: "Explore professional BBA and BCA courses offered at Sarvadnya Vidyapeeth, Patna. Industry-oriented curriculum with top placements."
  },
  "/courses/bba": {
    title: "BBA Course | Sarvadnya Vidyapeeth Patna",
    description: "Bachelor of Business Administration (BBA) at Sarvadnya Vidyapeeth. 3-year program with industry exposure, expert faculty, and placement support in Patna, Bihar."
  },
  "/courses/bca": {
    title: "BCA Course | Sarvadnya Vidyapeeth Patna",
    description: "Bachelor of Computer Applications (BCA) at Sarvadnya Vidyapeeth. Hands-on tech training, modern labs, and 100% placement assistance in Patna, Bihar."
  },
  "/campus": {
    title: "Campus & Infrastructure | Sarvadnya Vidyapeeth Patna",
    description: "Take a virtual tour of Sarvadnya Vidyapeeth's modern campus. World-class infrastructure, smart classrooms, computer labs, and green campus in Patna."
  },
  "/placements": {
    title: "Placements & Recruiters | Sarvadnya Vidyapeeth Patna",
    description: "Discover the excellent placement record of Sarvadnya Vidyapeeth. Top recruiters, placement statistics, and career support for BBA & BCA students."
  },
  "/hostel": {
    title: "Hostel & Accommodation | Sarvadnya Vidyapeeth Patna",
    description: "Comfortable hostel facilities at Sarvadnya Vidyapeeth. Secure accommodation, hygienic dining, and a supportive environment for students in Patna."
  },
  "/live-classes": {
    title: "Live & Digital Classes | Sarvadnya Vidyapeeth Patna",
    description: "Access live online classes and digital learning resources at Sarvadnya Vidyapeeth. Hybrid education model for BBA & BCA students."
  },
  "/events": {
    title: "Events & Fests | Sarvadnya Vidyapeeth Patna",
    description: "Stay updated with the latest events, cultural fests, seminars, and workshops at Sarvadnya Vidyapeeth, Patna."
  },
  "/admission": {
    title: "Admissions 2026 | Sarvadnya Vidyapeeth Patna | Apply Now",
    description: "Apply for BBA & BCA admissions at Sarvadnya Vidyapeeth Patna. Check fee structure, scholarships, BSCC, and admission procedure. Limited seats."
  },
  "/contact": {
    title: "Contact Us | Sarvadnya Vidyapeeth Patna",
    description: "Get in touch with Sarvadnya Vidyapeeth. Address: Beur-Betaura Road, Anishabad, Patna 800002. Call: 9955330733 | Email: info@sarvadnyavidyapeeth.in"
  },
  "/mandatory-disclosure": {
    title: "Mandatory Disclosure | Sarvadnya Vidyapeeth Patna",
    description: "Access mandatory disclosure documents for Sarvadnya Vidyapeeth as per university and regulatory requirements."
  }
};

const DEFAULT_SEO = {
  title: "Sarvadnya Vidyapeeth | Top BBA & BCA College in Patna, Bihar",
  description: "Sarvadnya Vidyapeeth is a premier higher education college in Patna, Bihar, offering BBA and BCA courses with excellent placements."
};

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Update document title and meta description based on route
  useEffect(() => {
    const seo = SEO_MAP[pathname] || DEFAULT_SEO;
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", seo.description);
    }
  }, [pathname]);

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
