import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";

const FACILITIES = [
  {
    title: "SV Hostel",
    image: "/images/hostel.png",
    description: "Safe, secure and comfortable residential facilities with modern amenities for outstation students.",
  },
  {
    title: "Transportation",
    image: "/images/transportation.png",
    description: "Reliable fleet of buses covering all major routes ensuring hassle-free daily commute for students.",
  },
  {
    title: "Smart Classrooms",
    image: "/images/smart_classroom.png",
    description: "Technology-enabled smart classrooms with projectors, digital boards and interactive learning tools.",
  },
  {
    title: "Library",
    image: "/images/campus_library.png",
    description: "Extensive central library with thousands of books, journals, e-resources and dedicated reading zones.",
  },
  {
    title: "Cafeteria",
    image: "/images/cafeteria.png",
    description: "Hygienic and spacious cafeteria serving nutritious meals and snacks throughout the day.",
  },
  {
    title: "Computer Labs",
    image: "/images/computer_lab.png",
    description: "State-of-the-art computer laboratories equipped with latest hardware, software and high-speed internet.",
  },
  {
    title: "Seminar Hall",
    image: "/images/seminar_hall.png",
    description: "Fully equipped seminar halls for guest lectures, workshops, conferences and cultural events.",
  },
  {
    title: "Sports Ground",
    image: "/images/sports_ground.png",
    description: "Expansive sports grounds and indoor facilities for cricket, football, basketball and more.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function LifeAtSV() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative py-12 md:py-16 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <SectionHeading
          tagline="Campus Life"
          title="Life at"
          highlight="Sarvadnya Vidyapeeth"
          subtitle="Beyond academics, our campus offers a vibrant ecosystem of world-class facilities designed to nurture every aspect of student development."
          align="center"
        />

        {/* ─── Facility Cards Grid ─── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {FACILITIES.map((facility, index) => (
            <motion.div
              key={facility.title}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer select-none"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ aspectRatio: "4/3" }}
            >
              {/* Image */}
              <img
                src={facility.image}
                alt={facility.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Default gradient overlay (always visible) */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-purple-900/10 to-transparent transition-opacity duration-500" />

              {/* Hover overlay (darker on hover for description) */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-purple-950/85 via-purple-900/50 to-transparent transition-opacity duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
              />

              {/* Bottom red accent bar */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 to-amber-500 transition-all duration-500 ${hoveredIndex === index
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0"
                  }`}
                style={{ transformOrigin: "left" }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                {/* Title — always visible */}
                <h3
                  className={`font-extrabold text-white text-sm md:text-base uppercase tracking-wide leading-snug transition-transform duration-500 ease-out ${hoveredIndex === index
                      ? "-translate-y-2"
                      : "translate-y-0"
                    }`}
                >
                  {facility.title}
                </h3>

                {/* Description — slides up on hover */}
                <p
                  className={`text-white/80 text-[11px] md:text-xs leading-relaxed mt-1.5 transition-all duration-500 ease-out ${hoveredIndex === index
                      ? "opacity-100 translate-y-0 max-h-20"
                      : "opacity-0 translate-y-4 max-h-0"
                    }`}
                >
                  {facility.description}
                </p>
              </div>

              {/* Subtle corner badge */}
              <div
                className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500 ${hoveredIndex === index
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-50 rotate-90"
                  }`}
              >
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
