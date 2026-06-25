import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";

const RESEARCH_IMAGES = [
  {
    src: "/images/research_chemistry.png",
    alt: "Chemistry Research Lab",
    label: "Advanced Chemistry Lab",
  },
  {
    src: "/images/research_microscope.png",
    alt: "Microscopy Research",
    label: "Microscopy & Life Sciences",
  },
  {
    src: "/images/research_mentoring.png",
    alt: "Research Mentoring",
    label: "Faculty-Led Research",
  },
  {
    src: "/images/research_biotech.png",
    alt: "Biotechnology Research",
    label: "Biotechnology Lab",
  },
  {
    src: "/images/research_electronics.png",
    alt: "Electronics Innovation",
    label: "Electronics & Robotics",
  },
  {
    src: "/images/research_data.png",
    alt: "Data Science & IT Research",
    label: "Data Science & IT Innovation",
  },
];

const GRID_POSITIONS = [
  // Row 1
  { gridColumn: "1 / 4", gridRow: "1 / 2" },
  { gridColumn: "4 / 6", gridRow: "1 / 2" },
  { gridColumn: "6 / 8", gridRow: "1 / 2" },
  // Row 2
  { gridColumn: "1 / 3", gridRow: "2 / 3" },
  { gridColumn: "3 / 5", gridRow: "2 / 3" },
  { gridColumn: "5 / 8", gridRow: "2 / 3" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ResearchInnovation() {
  return (
    <section className="relative py-12 md:py-16 bg-slate-50 overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <SectionHeading
          tagline="R&D Excellence"
          title="Research"
          highlight="& Innovation"
          subtitle="Sarvadnya Vidyapeeth fosters a culture of enquiry and innovation, providing robust platforms for student-led and faculty-guided research across domains."
          align="center"
        />

        {/* ─── Desktop: Masonry / Collage Image Grid (hidden on small screens) ─── */}
        <motion.div
          className="hidden md:grid gap-3 md:gap-4"
          style={{
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "280px 280px",
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {RESEARCH_IMAGES.map((img, index) => (
            <motion.div
              key={img.alt}
              className="group relative rounded-xl overflow-hidden cursor-pointer select-none"
              style={GRID_POSITIONS[index]}
              variants={imageVariants}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Default subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-purple-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Bottom purple/amber accent bar on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Label — visible on hover */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex flex-col justify-end">
                <h3 className="text-white font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide leading-snug translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  {img.label}
                </h3>
                <div className="h-0 group-hover:h-5 overflow-hidden transition-all duration-500 ease-out">
                  <p className="text-white/70 text-[10px] sm:text-[11px] mt-1 font-medium tracking-wide">
                    Explore our facilities →
                  </p>
                </div>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Mobile: Clean 2-column grid (visible below md) ─── */}
        <motion.div
          className="md:hidden grid grid-cols-2 gap-2.5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {RESEARCH_IMAGES.map((img) => (
            <motion.div
              key={img.alt}
              className="group relative rounded-xl overflow-hidden cursor-pointer select-none"
              style={{ aspectRatio: "3 / 4" }}
              variants={imageVariants}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-amber-500" />
              <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end">
                <h3 className="text-white font-bold text-[10px] leading-tight uppercase tracking-wide">
                  {img.label}
                </h3>
                <p className="text-white/60 text-[9px] mt-0.5 font-medium tracking-wide">
                  Explore →
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
