import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
const CERTIFICATES = [
  {
    id: 1,
    title: "NAAC Accreditation",
    grade: "A+",
    org: "National Assessment and Accreditation Council",
    year: "2024–2029",
    certNo: "NAAC/AC/2024/0847",
    primary: "#8B0000",
    secondary: "#C41E3A",
    bg: "#FFFDF7",
    gold: "#C5A028",
    sealType: "shield",
  },
  {
    id: 2,
    title: "ISO 9001:2015",
    grade: "Certified",
    org: "International Organization for Standardization",
    year: "2023–2026",
    certNo: "ISO/QMS/2023/IN-4521",
    primary: "#003366",
    secondary: "#1A5276",
    bg: "#F8FBFF",
    gold: "#2874A6",
    sealType: "globe",
  },
  {
    id: 3,
    title: "UGC Recognised",
    grade: "2(f) & 12(B)",
    org: "University Grants Commission, New Delhi",
    year: "Est. 2018",
    certNo: "UGC/NRC/2018/F2-1247",
    primary: "#4A0E4E",
    secondary: "#7B2D8E",
    bg: "#FDF8FF",
    gold: "#8E44AD",
    sealType: "emblem",
  },
  {
    id: 4,
    title: "AICTE Approved",
    grade: "Approved",
    org: "All India Council for Technical Education",
    year: "2024–2025",
    certNo: "AICTE/E/2024/BH-0392",
    primary: "#0B5345",
    secondary: "#148F77",
    bg: "#F0FFF8",
    gold: "#1ABC9C",
    sealType: "shield",
  },
  {
    id: 5,
    title: "Best College Award",
    grade: "Gold",
    org: "Bihar State Education Excellence Forum",
    year: "2025",
    certNo: "BSEEF/AWD/2025/GLD-019",
    primary: "#7D5A00",
    secondary: "#B8860B",
    bg: "#FFFDF2",
    gold: "#DAA520",
    sealType: "star",
  },
  {
    id: 6,
    title: "Industry Excellence",
    grade: "Platinum",
    org: "Confederation of Indian Industry (CII)",
    year: "2025–2026",
    certNo: "CII/IE/2025/PLT-0083",
    primary: "#0C4A6E",
    secondary: "#0284C7",
    bg: "#F0F9FF",
    gold: "#0EA5E9",
    sealType: "globe",
  },
  {
    id: 7,
    title: "Digital Campus",
    grade: "5-Star",
    org: "Smart India Digital Transformation Initiative",
    year: "2025",
    certNo: "SIDTI/DC/2025/5S-0041",
    primary: "#4C1D95",
    secondary: "#7C3AED",
    bg: "#F5F3FF",
    gold: "#8B5CF6",
    sealType: "star",
  },
  {
    id: 8,
    title: "Placement Excellence",
    grade: "AAA",
    org: "National Employability Accreditation Authority",
    year: "2026",
    certNo: "NEAA/PE/2026/AAA-0127",
    primary: "#831843",
    secondary: "#BE185D",
    bg: "#FDF2F8",
    gold: "#EC4899",
    sealType: "emblem",
  },
  {
    id: 9,
    title: "Green Campus",
    grade: "Platinum",
    org: "Indian Green Building Council (IGBC)",
    year: "2024–2027",
    certNo: "IGBC/GC/2024/PLT-0298",
    primary: "#14532D",
    secondary: "#16A34A",
    bg: "#F0FDF4",
    gold: "#22C55E",
    sealType: "shield",
  },
  {
    id: 10,
    title: "Research Recognition",
    grade: "Outstanding",
    org: "India Today — MDRA Survey 2026",
    year: "2026",
    certNo: "IT-MDRA/RR/2026/OUT-0056",
    primary: "#7C2D12",
    secondary: "#EA580C",
    bg: "#FFF7ED",
    gold: "#F97316",
    sealType: "star",
  },
];

const VISIBLE = 5;
const AUTO_SLIDE = 4000;

/* ───── Realistic SVG certificate ───── */
function CertificateCard({ cert }) {
  const { primary, secondary, bg, gold, title, grade, org, year, certNo, sealType } = cert;

  return (
    <div className="group flex-shrink-0 w-full px-1.5 select-none">
      <div
        className="relative bg-white rounded-xl overflow-hidden shadow-md border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
        style={{ aspectRatio: "3/4" }}
      >
        <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            {/* Paper texture noise */}
            <filter id={`paper-${cert.id}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#FFFFFF" surfaceScale="1.2" result="light">
                <feDistantLight azimuth="45" elevation="55" />
              </feDiffuseLighting>
              <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="0.8" k2="0.2" k3="0" k4="0" />
            </filter>

            {/* Ornate border pattern */}
            <pattern id={`border-pat-${cert.id}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="1.5" fill={primary} opacity="0.15" />
              <rect x="5" y="0" width="2" height="2" fill={primary} opacity="0.08" rx="1" />
              <rect x="5" y="10" width="2" height="2" fill={primary} opacity="0.08" rx="1" />
              <rect x="0" y="5" width="2" height="2" fill={primary} opacity="0.08" rx="1" />
              <rect x="10" y="5" width="2" height="2" fill={primary} opacity="0.08" rx="1" />
            </pattern>

            {/* Gold gradient for seal */}
            <linearGradient id={`gold-grad-${cert.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={gold} stopOpacity="0.9" />
              <stop offset="50%" stopColor={secondary} stopOpacity="1" />
              <stop offset="100%" stopColor={gold} stopOpacity="0.9" />
            </linearGradient>

            {/* Radial for watermark */}
            <radialGradient id={`wm-grad-${cert.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={primary} stopOpacity="0.04" />
              <stop offset="100%" stopColor={primary} stopOpacity="0.01" />
            </radialGradient>
          </defs>

          {/* ── Background with aged paper feel ── */}
          <rect width="300" height="400" fill={bg} />
          <rect width="300" height="400" fill={`url(#border-pat-${cert.id})`} opacity="0.3" />

          {/* ── Ornate outer border (double rule) ── */}
          <rect x="8" y="8" width="284" height="384" rx="3" fill="none" stroke={primary} strokeWidth="2.5" opacity="0.5" />
          <rect x="13" y="13" width="274" height="374" rx="2" fill="none" stroke={primary} strokeWidth="0.8" opacity="0.3" />
          <rect x="17" y="17" width="266" height="366" rx="2" fill="none" stroke={gold} strokeWidth="0.4" opacity="0.25" />

          {/* ── Corner ornaments (floral/filigree) ── */}
          {/* Top-left */}
          <g opacity="0.5">
            <path d="M20 40 Q20 20 40 20" fill="none" stroke={primary} strokeWidth="2" />
            <path d="M22 45 Q22 22 45 22" fill="none" stroke={primary} strokeWidth="1" />
            <circle cx="27" cy="27" r="3" fill={gold} opacity="0.6" />
            <path d="M25 20 Q30 25 25 30" fill="none" stroke={primary} strokeWidth="0.8" />
            <path d="M20 25 Q25 30 30 25" fill="none" stroke={primary} strokeWidth="0.8" />
          </g>
          {/* Top-right */}
          <g opacity="0.5">
            <path d="M280 40 Q280 20 260 20" fill="none" stroke={primary} strokeWidth="2" />
            <path d="M278 45 Q278 22 255 22" fill="none" stroke={primary} strokeWidth="1" />
            <circle cx="273" cy="27" r="3" fill={gold} opacity="0.6" />
            <path d="M275 20 Q270 25 275 30" fill="none" stroke={primary} strokeWidth="0.8" />
            <path d="M280 25 Q275 30 270 25" fill="none" stroke={primary} strokeWidth="0.8" />
          </g>
          {/* Bottom-left */}
          <g opacity="0.5">
            <path d="M20 360 Q20 380 40 380" fill="none" stroke={primary} strokeWidth="2" />
            <path d="M22 355 Q22 378 45 378" fill="none" stroke={primary} strokeWidth="1" />
            <circle cx="27" cy="373" r="3" fill={gold} opacity="0.6" />
          </g>
          {/* Bottom-right */}
          <g opacity="0.5">
            <path d="M280 360 Q280 380 260 380" fill="none" stroke={primary} strokeWidth="2" />
            <path d="M278 355 Q278 378 255 378" fill="none" stroke={primary} strokeWidth="1" />
            <circle cx="273" cy="373" r="3" fill={gold} opacity="0.6" />
          </g>

          {/* ── Top decorative band ── */}
          <rect x="50" y="30" width="200" height="1" fill={primary} opacity="0.2" />
          <rect x="70" y="33" width="160" height="0.5" fill={gold} opacity="0.3" />

          {/* ── Organization header ── */}
          <text x="150" y="52" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="8" fill={primary} opacity="0.6" letterSpacing="3">
            {org.length > 40 ? org.slice(0, 40) : org}
          </text>
          {org.length > 40 && (
            <text x="150" y="62" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="8" fill={primary} opacity="0.6" letterSpacing="2">
              {org.slice(40)}
            </text>
          )}

          {/* ── Decorative divider under org ── */}
          <line x1="80" y1="70" x2="220" y2="70" stroke={primary} strokeWidth="0.5" opacity="0.2" />
          <circle cx="150" cy="70" r="2" fill={gold} opacity="0.5" />
          <circle cx="80" cy="70" r="1" fill={primary} opacity="0.3" />
          <circle cx="220" cy="70" r="1" fill={primary} opacity="0.3" />

          {/* ── Large watermark circle (background emblem) ── */}
          <circle cx="150" cy="200" r="95" fill={`url(#wm-grad-${cert.id})`} />
          <circle cx="150" cy="200" r="80" fill="none" stroke={primary} strokeWidth="0.3" opacity="0.06" />
          <circle cx="150" cy="200" r="70" fill="none" stroke={primary} strokeWidth="0.3" opacity="0.04" />

          {/* ── CERTIFICATE OF text ── */}
          <text x="150" y="95" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="10" fill={primary} opacity="0.5" letterSpacing="6" fontWeight="normal">
            CERTIFICATE OF
          </text>

          {/* ── Main title ── */}
          <text x="150" y="120" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="20" fontWeight="bold" fill={primary} letterSpacing="1">
            {title.toUpperCase()}
          </text>

          {/* ── Decorative line under title ── */}
          <line x1="60" y1="130" x2="240" y2="130" stroke={gold} strokeWidth="0.8" opacity="0.4" />
          <path d="M120 133 Q150 140 180 133" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.4" />

          {/* ── Central Seal/Badge ── */}
          <g>
            {/* Outer rosette ring */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 15 * Math.PI) / 180;
              const x1 = 150 + 42 * Math.cos(angle);
              const y1 = 195 + 42 * Math.sin(angle);
              const x2 = 150 + 48 * Math.cos(angle);
              const y2 = 195 + 48 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gold} strokeWidth="2" opacity="0.35" />;
            })}

            {/* Seal circles */}
            <circle cx="150" cy="195" r="40" fill="none" stroke={primary} strokeWidth="1.5" opacity="0.45" />
            <circle cx="150" cy="195" r="35" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.35" />
            <circle cx="150" cy="195" r="28" fill={primary} opacity="0.08" />

            {/* Seal inner content based on type */}
            {sealType === "shield" && (
              <g opacity="0.65">
                <path d="M150 172 L168 182 L168 200 Q168 212 150 218 Q132 212 132 200 L132 182 Z" fill="none" stroke={primary} strokeWidth="1.5" />
                <path d="M150 178 L162 185 L162 198 Q162 207 150 212 Q138 207 138 198 L138 185 Z" fill={primary} opacity="0.1" />
                <text x="150" y="200" textAnchor="middle" fontFamily="serif" fontSize="14" fontWeight="bold" fill={primary}>{grade}</text>
              </g>
            )}
            {sealType === "globe" && (
              <g opacity="0.65">
                <circle cx="150" cy="195" r="18" fill="none" stroke={primary} strokeWidth="1" />
                <ellipse cx="150" cy="195" rx="8" ry="18" fill="none" stroke={primary} strokeWidth="0.6" />
                <line x1="132" y1="195" x2="168" y2="195" stroke={primary} strokeWidth="0.6" />
                <line x1="135" y1="185" x2="165" y2="185" stroke={primary} strokeWidth="0.4" />
                <line x1="135" y1="205" x2="165" y2="205" stroke={primary} strokeWidth="0.4" />
                <text x="150" y="199" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill={primary}>{grade}</text>
              </g>
            )}
            {sealType === "emblem" && (
              <g opacity="0.65">
                <circle cx="150" cy="190" r="12" fill="none" stroke={primary} strokeWidth="1" />
                <circle cx="150" cy="190" r="7" fill={primary} opacity="0.15" />
                <text x="150" y="194" textAnchor="middle" fontFamily="serif" fontSize="8" fontWeight="bold" fill={primary}>✦</text>
                <text x="150" y="210" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill={primary}>{grade}</text>
              </g>
            )}
            {sealType === "star" && (
              <g opacity="0.65">
                <polygon
                  points="150,175 154,188 168,188 157,196 161,209 150,201 139,209 143,196 132,188 146,188"
                  fill={primary}
                  opacity="0.2"
                  stroke={primary}
                  strokeWidth="0.8"
                />
                <text x="150" y="198" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill={primary}>{grade}</text>
              </g>
            )}

            {/* Circular text around seal */}
            <path id={`seal-text-${cert.id}`} d="M 108,195 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="none" />
            <text fontSize="5.5" fill={primary} opacity="0.4" fontFamily="sans-serif" letterSpacing="2">
              <textPath href={`#seal-text-${cert.id}`} startOffset="10%">
                ★ CERTIFIED ★ ACCREDITED ★ VERIFIED ★
              </textPath>
            </text>
          </g>

          {/* ── "This is to certify" body text ── */}
          <text x="150" y="248" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="8" fill="#555" fontStyle="italic" opacity="0.7">
            This is to certify that
          </text>
          <text x="150" y="264" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="11" fontWeight="bold" fill="#1a1a1a">
            Sarvadnya Vidyapeeth, Patna
          </text>
          <text x="150" y="280" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="8" fill="#555" fontStyle="italic" opacity="0.7">
            has been duly assessed and awarded
          </text>
          <text x="150" y="296" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill={primary}>
            {title} — {grade}
          </text>

          {/* ── Validity period ── */}
          <text x="150" y="312" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="#888" letterSpacing="1">
            Valid: {year}
          </text>

          {/* ── Bottom divider ── */}
          <line x1="40" y1="325" x2="260" y2="325" stroke={primary} strokeWidth="0.5" opacity="0.15" />

          {/* ── Signature area ── */}
          {/* Left signature */}
          <g>
            <path d="M55 348 Q65 340 75 348 Q82 342 90 350" fill="none" stroke="#333" strokeWidth="0.8" opacity="0.4" />
            <line x1="45" y1="355" x2="100" y2="355" stroke="#999" strokeWidth="0.5" />
            <text x="72" y="365" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fill="#888">
              Authorized Signatory
            </text>
          </g>

          {/* Right signature */}
          <g>
            <path d="M210 346 Q220 342 230 350 Q238 344 248 348" fill="none" stroke="#333" strokeWidth="0.8" opacity="0.4" />
            <line x1="200" y1="355" x2="258" y2="355" stroke="#999" strokeWidth="0.5" />
            <text x="228" y="365" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fill="#888">
              Director / Principal
            </text>
          </g>

          {/* ── Official stamp (center-bottom) ── */}
          <g opacity="0.3">
            <circle cx="150" cy="350" r="16" fill="none" stroke={secondary} strokeWidth="1.5" />
            <circle cx="150" cy="350" r="12" fill="none" stroke={secondary} strokeWidth="0.5" />
            <text x="150" y="348" textAnchor="middle" fontFamily="sans-serif" fontSize="5" fontWeight="bold" fill={secondary} letterSpacing="1">
              OFFICIAL
            </text>
            <text x="150" y="356" textAnchor="middle" fontFamily="sans-serif" fontSize="4" fill={secondary}>
              SEAL
            </text>
          </g>

          {/* ── Certificate number (bottom edge) ── */}
          <text x="150" y="388" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#AAA" letterSpacing="0.5">
            Ref: {certNo}
          </text>
        </svg>

        {/* Hover shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </div>
  );
}


export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const maxIndex = CERTIFICATES.length - VISIBLE;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, AUTO_SLIDE);
    return () => clearInterval(timerRef.current);
  }, [goNext, isPaused]);

  const visibleCerts = CERTIFICATES.slice(currentIndex, currentIndex + VISIBLE);
  /* Handle wrap-around if near end */
  const displayCerts =
    visibleCerts.length < VISIBLE
      ? [...visibleCerts, ...CERTIFICATES.slice(0, VISIBLE - visibleCerts.length)]
      : visibleCerts;

  return (
    <section
      className="relative py-20 md:py-28 bg-slate-50 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-gradient-to-r from-transparent to-red-500 rounded-full" />
            <span className="text-[10px] sm:text-[11px] font-bold text-red-600 uppercase tracking-[0.25em]">
              Recognition & Trust
            </span>
            <span className="h-[2px] w-8 bg-gradient-to-l from-transparent to-red-500 rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-tight">
            Quality Certificate /{" "}
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
              Accreditations Ranking
            </span>
          </h2>

          <p className="mt-4 text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Our institution is recognized by leading national accreditation bodies,
            underscoring our commitment to quality education and academic excellence.
          </p>
        </motion.div>

        {/* ─── Slider Container ─── */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-red-600 hover:border-red-200 hover:shadow-xl transition-all duration-300 active:scale-95"
            aria-label="Previous certificates"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={goNext}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-red-600 hover:border-red-200 hover:shadow-xl transition-all duration-300 active:scale-95"
            aria-label="Next certificates"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Cards Row — 5 visible */}
          <div className="overflow-hidden px-1">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5"
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {displayCerts.map((cert) => (
                <CertificateCard key={`${cert.id}-${currentIndex}`} cert={cert} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ─── Pagination Dots ─── */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${i === currentIndex
                  ? "w-8 h-2.5 bg-red-600 shadow-md shadow-red-600/30"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
