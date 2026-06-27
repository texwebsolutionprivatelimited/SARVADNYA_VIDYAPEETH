import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const ABOUT_LINKS = [
  { label: "About Sarvadnya", path: "/about#about-sarvadnya" },
  { label: "Vision & Mission", path: "/about#vision-mission" },
  { label: "Leadership", path: "/about#leadership" },
  { label: "Infrastructure", path: "/campus" },
  { label: "Admin Panel", path: "/adminpanel" },
];

const ADMISSION_LINKS = [
  { label: "Admission Procedure", path: "/admission#procedure" },
  { label: "Fee Structure", path: "/admission#fees" },
  { label: "Scholarships & BSCC", path: "/admission#scholarships" },
];

const QUICK_LINKS = [
  { label: "Virtual Tour", path: "/campus" },
  { label: "Contact Us", path: "/contact" },
  { label: "Latest Blogs", path: "/#blogs" },
];

const CAMPUS_LINKS = [
  { label: "Campus Tour", path: "/campus" },
  { label: "Hostel & Dining", path: "/hostel" },
  { label: "Live Classes", path: "/live-classes" },
  { label: "Events & Fests", path: "/events" },
  { label: "Placement Cell", path: "/placements" },
];

/* Inline SVG social icons (lucide-react doesn't include brand icons) */
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
);

const SOCIAL_LINKS = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: XIcon, href: "#", label: "X (Twitter)" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-800 text-sm border-t border-purple-100" id="site-footer">

      {/* ── Top Bar: 360° View + Social Icons ── */}
      <div className="border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* 360 View */}
          <Link to="/campus" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 rounded-full border-2 border-purple-600 flex items-center justify-center bg-transparent group-hover:border-purple-500 transition-colors">
              <span className="text-purple-600 font-black text-lg leading-none group-hover:text-purple-500 transition-colors">360°</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-purple-700 font-extrabold text-base group-hover:text-purple-600 transition-colors">View</span>
              </div>
              <span className="text-slate-500 text-xs">Visit Campus Virtual Tour</span>
            </div>
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 hover:bg-purple-600 hover:text-white transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">

          {/* Column 1: About Us */}
          <div>
            <h3 className="text-purple-800 font-bold text-sm mb-4 tracking-wide uppercase">About Us</h3>
            <ul className="space-y-2.5">
              {ABOUT_LINKS.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-slate-600 hover:text-purple-800 text-[13px] transition-colors duration-200 hover:pl-1">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Admissions */}
          <div>
            <h3 className="text-purple-800 font-bold text-sm mb-4 tracking-wide uppercase">Admissions</h3>
            <ul className="space-y-2.5">
              {ADMISSION_LINKS.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-slate-600 hover:text-purple-800 text-[13px] transition-colors duration-200 hover:pl-1">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-purple-800 font-bold text-sm mb-4 tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-slate-600 hover:text-purple-800 text-[13px] transition-colors duration-200 hover:pl-1">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Campus Life */}
          <div>
            <h3 className="text-purple-800 font-bold text-sm mb-4 tracking-wide uppercase">Campus Life</h3>
            <ul className="space-y-2.5">
              {CAMPUS_LINKS.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-slate-600 hover:text-purple-800 text-[13px] transition-colors duration-200 hover:pl-1">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Map + Contact */}
          <div>
            <h3 className="text-purple-800 font-bold text-sm mb-4 tracking-wide uppercase">Find Us</h3>
            {/* Google Maps Embed */}
            <div className="w-full h-36 rounded-lg overflow-hidden border border-purple-100/50 mb-4">
              <iframe
                title="Sarvadnya Vidyapeeth Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.5!2d85.1!3d25.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBeur-Betaura+Road%2C+Patna!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {/* Contact Info */}
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Beur-Betaura Road, Anishabad, Patna (Bihar) - 800002</span>
              </li>
              <li className="flex flex-col gap-1.5 pl-6 text-xs text-slate-600">
                <div className="flex items-center gap-2 -ml-6">
                  <Phone size={14} className="text-purple-600 flex-shrink-0" />
                  <span className="font-bold text-slate-700">Helplines:</span>
                </div>
                <a href="tel:9955330733" className="hover:text-purple-800 transition-colors">9955330733</a>
                <a href="tel:7282831934" className="hover:text-purple-800 transition-colors">7282831934</a>
                <a href="tel:6205431678" className="hover:text-purple-800 transition-colors">6205431678</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-purple-600 flex-shrink-0" />
                <a href="mailto:info@sarvadnyavidyapeeth.in" className="hover:text-purple-800 transition-colors">info@sarvadnyavidyapeeth.in</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom Copyright Bar ── */}
      <div className="border-t border-purple-100 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Copyright © 2026 <span className="text-purple-800 font-semibold">Sarvadnya Vidyapeeth, Patna</span>, Affiliated to Aryabhatta Knowledge University, Patna
          </p>
          <p className="text-[10px] text-slate-400">
            Designed &amp; Developed by{" "}
            <a
              href="https://texwebsolution.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 font-medium hover:text-purple-800 transition-colors hover:underline"
            >
              Texweb Solution Pvt. Ltd.
            </a>
          </p>
        </div>
      </div>

      {/* ── Floating WhatsApp Button ── */}
      <a
        href="https://wa.me/919955330733"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
      >
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.27l6.12-1.958A15.926 15.926 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0Zm9.31 22.614c-.39 1.1-2.282 2.104-3.142 2.168-.86.066-1.67.388-5.63-1.172-4.76-1.876-7.752-6.762-7.988-7.076-.234-.314-1.916-2.548-1.916-4.86 0-2.314 1.214-3.452 1.644-3.924.432-.47.94-.588 1.254-.588.314 0 .628.002.902.016.29.016.678-.11 1.06.808.39.94 1.332 3.252 1.448 3.488.118.234.196.51.04.822-.156.314-.234.51-.47.784-.234.274-.492.612-.704.822-.234.234-.478.488-.206.96.274.47 1.214 2.004 2.608 3.246 1.788 1.594 3.296 2.088 3.766 2.322.47.234.744.196 1.018-.118.274-.314 1.176-1.372 1.49-1.842.314-.47.628-.39 1.06-.234.432.156 2.744 1.294 3.214 1.53.47.234.784.352.902.548.118.196.118 1.138-.272 2.238v.046Z" />
        </svg>
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30 pointer-events-none" />
      </a>
    </footer>
  );
}
