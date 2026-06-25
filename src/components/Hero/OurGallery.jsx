import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";

const MEMORIES = [
  { img: "/images/research_mentoring.png", title: "Faculty Mentoring", tag: "Guidance" },
  { img: "/images/graduation_day.png", title: "Graduation Day", tag: "Milestones" },
  { img: "/images/seminar_hall.png", title: "Tech Seminars", tag: "Seminars" },
  { img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop", title: "Collaborative Study", tag: "Academic" },
  
  { img: "/images/research_data.png", title: "BCA Coding Labs", tag: "Practical" },
  { img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400&auto=format&fit=crop", title: "Business Pitching", tag: "BBA Work" },
  { img: "/images/sports_ground.png", title: "Athletic Meets", tag: "Sports" },
  { img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400&auto=format&fit=crop", title: "Student Socials", tag: "Community" },
  
  { img: "/images/research_biotech.png", title: "Science Projects", tag: "Research" },
  { img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&auto=format&fit=crop", title: "Peer Discussions", tag: "Learning" },
  { img: "/images/auditorium.png", title: "Annual Day Festival", tag: "Cultural" },
  { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop", title: "Creative Bootcamps", tag: "Workshops" },
  
  { img: "/images/research_chemistry.png", title: "Science Experiments", tag: "Lab Practical" },
  { img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=400&auto=format&fit=crop", title: "Internship Drives", tag: "Placements" },
  { img: "/images/cafeteria.png", title: "Cafeteria Breaks", tag: "Student Life" },
  { img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=400&auto=format&fit=crop", title: "Digital Research", tag: "Library" }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function OurGallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative py-12 md:py-16 bg-slate-50 overflow-hidden border-t border-slate-200/60">
      {/* Background overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ef4444 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <SectionHeading
          tagline="Campus Memory"
          highlight="Our Gallery"
          subtitle="Take a look at some of the precious memories, events, and milestones that shape student life at Sarvadnya Vidyapeeth."
          align="center"
        />

        {/* ─── 4x4 Grid Showcase ─── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {MEMORIES.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer select-none bg-slate-100 shadow-sm border border-slate-100"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ aspectRatio: "1/1" }}
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Cover Gradient Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/50 via-purple-950/15 to-transparent transition-opacity duration-300" />
              
              {/* Action Hover Color Cover */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-purple-950/80 via-purple-900/40 to-transparent transition-opacity duration-500 ${
                  hoveredIndex === idx ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Title & Tag Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
                <span className={`inline-block self-start px-2 py-0.5 bg-red-600/90 text-white text-[9px] font-black uppercase tracking-widest rounded-md mb-2 transition-transform duration-500 ${
                  hoveredIndex === idx ? "translate-y-0" : "translate-y-2 opacity-80"
                }`}>
                  {item.tag}
                </span>
                
                <h4 className={`font-heading font-black text-white text-xs sm:text-sm md:text-base leading-tight uppercase transition-all duration-500 ${
                  hoveredIndex === idx ? "translate-y-0" : "translate-y-1"
                }`}>
                  {item.title}
                </h4>
              </div>

              {/* Expand Link Badge */}
              <div
                className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-550 ${
                  hoveredIndex === idx
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
                    d="M12 4.5v15m7.5-7.5h-15"
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
