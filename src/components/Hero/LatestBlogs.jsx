import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import { X, Calendar, Tag } from "lucide-react";
import { db, collection, getDocs } from "../../firebase";

const BLOGS = [
  {
    id: 1,
    image: "/images/blogs/bca_career.png",
    title: "BCA Career Scope: Eligibility, Salary & Top Growth Opportunities in 2026",
    excerpt:
      "A BCA degree opens doors to diverse career paths in IT, software development, data science, and more. Discover the eligibility criteria, expected salary packages, and top career opportunities...",
    date: "June 15, 2026",
    category: "Career Guide",
    content: `
      <p class='text-slate-650 leading-relaxed mb-4'>A Bachelor of Computer Applications (BCA) is one of the most popular undergraduate options for students interested in computer science, programming, and software engineering. In 2026, as cloud computing, artificial intelligence, and mobile apps dominate corporate investments, BCA graduates are in higher demand than ever.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>Eligibility Requirements</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>To apply for a BCA program, students must have completed their 10+2 secondary education from a recognized board with a minimum of 45-50% marks. While math is preferred, students from arts and commerce streams can also join and excel through specialized foundation courses.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>Top Job Roles for Graduates</h4>
      <ul class='list-disc pl-5 text-slate-650 space-y-2 mb-4'>
        <li><strong>Full-Stack Web Developer:</strong> Design and build responsive web applications using JavaScript, React, Node.js, and SQL/NoSQL databases.</li>
        <li><strong>Mobile App Developer:</strong> Program native and cross-platform apps for iOS and Android devices.</li>
        <li><strong>Data Analyst:</strong> Leverage Python, SQL, and business intelligence tools to parse complex datasets for strategic insights.</li>
        <li><strong>Cloud Associate:</strong> Assist organizations in deploying and maintaining apps on AWS, Azure, or Google Cloud platforms.</li>
      </ul>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>Salary Outlook (2026 Trends)</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>Freshers usually start with salaries ranging from ₹3.5 Lakhs to ₹7 Lakhs per annum (LPA). Those with strong coding profiles, Github portfolios, and quality internship experience frequently secure packages starting at ₹8-12 LPA with Tier-1 recruiters.</p>
    `
  },
  {
    id: 2,
    image: "/images/blogs/bba_internship.png",
    title: "How Internships Give BBA & MBA Students a Placement Edge",
    excerpt:
      "Internships are the bridge between classroom learning and real-world business challenges. Learn how securing the right internship can dramatically boost your placement prospects and career readiness...",
    date: "June 10, 2026",
    category: "Placements",
    content: `
      <p class='text-slate-650 leading-relaxed mb-4'>Practical work experience is the single most valuable asset for business administration students. In a competitive job market, internships act as a bridge, transforming conceptual classroom knowledge into real-world business acumen.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>Why Employers Value Internships</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>Recruiters actively seek candidates who have already worked in a corporate setting. Internships demonstrate that a student understands workplace dynamics, office etiquette, team communication, and basic project management frameworks.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>Converting Internships into Pre-Placement Offers (PPOs)</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>A significant percentage of students at top institutions secure pre-placement offers during their summer internships. By delivering exceptional value, showing initiative, and aligning with the company's culture, interns can secure a full-time role before their final exams even begin.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>Key Benefits for Students</h4>
      <ul class='list-disc pl-5 text-slate-650 space-y-2 mb-4'>
        <li><strong>Professional Networking:</strong> Connect directly with industry executives, mentors, and peers who can guide your career path.</li>
        <li><strong>Skill Refinement:</strong> Apply marketing theories, financial models, or HR strategies to actual client projects.</li>
        <li><strong>Resume Enhancement:</strong> Stand out from the crowd with quantifiable project achievements listed under your work history.</li>
      </ul>
    `
  },
  {
    id: 3,
    image: "/images/blogs/digital_marketing.png",
    title: "Digital Marketing Skills Every BCA Student Must Learn in 2026",
    excerpt:
      "In today's digital-first economy, BCA graduates with marketing skills stand out. Explore the essential digital marketing competencies — from SEO to analytics — that complement your tech degree...",
    date: "June 5, 2026",
    category: "Skills",
    content: `
      <p class='text-slate-650 leading-relaxed mb-4'>The line between software development and digital marketing is blurring. In 2026, tech graduates who also understand user behavior, web analytics, and acquisition channels possess a unique competitive advantage in the employment marketplace.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>The Synergy of Code and Marketing</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>Traditional marketers understand what message to convey, but they often lack the technical capability to implement tracking scripts, optimize site speeds, or configure API integrations. As a BCA student, you possess the tech foundation to become a high-level Technical Marketer.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>Essential Skills to Master</h4>
      <ul class='list-disc pl-5 text-slate-650 space-y-2 mb-4'>
        <li><strong>Technical Search Engine Optimization (SEO):</strong> Optimizing site structure, speed, schema markup, and crawling parameters to improve organic rankings.</li>
        <li><strong>Web Analytics & Tracking:</strong> Setting up event trackers, conversion pixels, and analytics dashboards using tools like Google Tag Manager and GA4.</li>
        <li><strong>Conversion Rate Optimization (CRO):</strong> Implementing A/B testing frameworks, heatmaps, and landing page experiments using basic scripting.</li>
        <li><strong>Marketing Automation:</strong> Setting up webhook integrations and writing automated scripts for email campaigns and customer journeys.</li>
      </ul>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>Career Paths</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>Mastering this dual capability opens doors to lucrative modern roles such as Growth Engineer, Technical SEO Lead, Marketing Automation Specialist, and Product Manager.</p>
    `
  },
  {
    id: 4,
    image: "/images/blogs/ai_future.png",
    title: "AI & Future Tech: How Artificial Intelligence is Transforming Education",
    excerpt:
      "Artificial Intelligence is reshaping how we learn, teach, and prepare for careers. Discover how SV integrates AI-driven tools and future technologies into its curriculum for tomorrow's leaders...",
    date: "May 28, 2026",
    category: "Technology",
    content: `
      <p class='text-slate-650 leading-relaxed mb-4'>Artificial Intelligence is no longer just a subject in computer science; it is the infrastructure of modern education. In 2026, Sarvadnya Vidyapeeth is leading the charge by integrating generative AI, interactive simulations, and adaptive learning into our standard curriculum.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>Personalized Learning Paths</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>Every student learns at their own pace. AI-driven platforms analyze individual progress, highlight areas of friction, and suggest customized study resources or coding exercises, helping students master complex topics faster and with less frustration.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>AI-Assisted Development Environments</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>In our computer labs, students learn to use AI pair programming tools. Rather than simple copy-pasting, students are trained to write effective prompts, inspect generated code for logic errors, debug complex integrations, and understand software architecture concepts at a higher level.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>SV's Commitment to Future Tech</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>By familiarizing students with state-of-the-art AI workflows, we ensure that our graduates do not just know basic programming syntax, but are prepared to operate as high-performance developers in an AI-powered corporate environment.</p>
    `
  },
  {
    id: 5,
    image: "/images/blogs/campus_placement.png",
    title: "Campus Placement Preparation: Top Tips to Crack Your Dream Company",
    excerpt:
      "Preparing for campus placements can feel overwhelming. This comprehensive guide covers aptitude preparation, interview strategies, resume building, and group discussion tips to help you succeed...",
    date: "May 20, 2026",
    category: "Placements",
    content: `
      <p class='text-slate-650 leading-relaxed mb-4'>Securing a job straight out of college is a milestone achievement. Campus placement drives are fast-paced and highly competitive, making structured, disciplined preparation crucial to standing out to top recruiters.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>1. Master the Aptitude & Technical Tests</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>Most recruitment drives begin with an elimination round featuring quantitative aptitude, logical reasoning, and basic coding puzzles. Regular practice on platforms like LeetCode, HackerRank, and GeeksforGeeks is essential to build speed and accuracy.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>2. Build a Clean, Project-Focused Resume</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>Your resume is your first impression. Keep it to a single page, list your best 2-3 academic or personal projects, and clearly detail your contribution using active verbs. Include links to live deployments and your GitHub profile.</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>3. Excel in the Technical Interview</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>Be prepared to explain the technical decisions behind your projects. Practice explaining your logic out loud while writing code (whiteboarding). Master core concepts in Data Structures, Algorithms, Object-Oriented Programming (OOPs), and Database Management Systems (DBMS).</p>
      <h4 class='text-base font-extrabold text-purple-950 mt-5 mb-2'>4. Refine Your Soft Skills</h4>
      <p class='text-slate-650 leading-relaxed mb-4'>Communication is key. During group discussions and HR interviews, focus on listening actively, speaking clearly and concisely, and demonstrating positive body language. Participate in mock interviews arranged by the SV Placement Cell to build confidence.</p>
    `
  },
];

const VISIBLE_CARDS = 3;
const AUTO_SLIDE_INTERVAL = 5000;

/* ─── Blog Card (shared between desktop & mobile) ─── */
function BlogCard({ blog, onReadMore, className = "" }) {
  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col ${className}`}
    >
      {/* Blog Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-white/90 backdrop-blur-sm text-purple-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
            {blog.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Blog Content */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          {blog.date}
        </span>
        <h3 className="text-sm md:text-[15px] font-bold text-slate-900 leading-snug mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">
          {blog.title}
        </h3>
        <p className="text-slate-500 text-xs md:text-[13px] leading-relaxed mb-5 line-clamp-3 flex-1">
          {blog.excerpt}
        </p>
        <button
          onClick={() => onReadMore(blog)}
          className="inline-flex items-center justify-center gap-2 w-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs md:text-sm px-5 py-3 rounded-lg shadow-md shadow-purple-700/20 hover:shadow-purple-700/40 transition-all duration-300 uppercase tracking-wider group/btn cursor-pointer"
        >
          Read More
          <svg
            className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Mobile Horizontal Slider (visible below md / 768px) ─── */
function MobileSlider({ blogs, onReadMore }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return;
    const cardWidth = el.firstElementChild.offsetWidth;
    const gap = 12;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(index, 0), blogs.length - 1));
  }, [blogs.length]);

  const scrollToIndex = useCallback((index) => {
    const el = scrollRef.current;
    if (!el || !el.children[index]) return;
    const child = el.children[index];
    el.scrollTo({
      left: child.offsetLeft - 16,
      behavior: "smooth",
    });
    setActiveIndex(index);
  }, []);

  return (
    <div className="md:hidden">
      {/* Hide scrollbar */}
      <style>{`
        .mobile-blog-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="mobile-blog-scroll flex gap-3 overflow-x-auto pb-4 px-1 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex-shrink-0 snap-start"
            style={{ width: "calc(100vw - 56px)" }}
          >
            <BlogCard blog={blog} onReadMore={onReadMore} />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {blogs.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-8 h-2.5 bg-purple-700 shadow-md shadow-purple-700/30"
                : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to blog ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Desktop Slider (visible on md+ / 768px and above) ─── */
function DesktopSlider({ blogs, onReadMore }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const maxIndex = Math.max(0, blogs.length - VISIBLE_CARDS);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [goNext, isPaused]);

  const visibleBlogs = blogs.slice(currentIndex, currentIndex + VISIBLE_CARDS);

  return (
    <div
      className="hidden md:block relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-purple-700 hover:border-purple-200 hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer"
        aria-label="Previous blogs"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={goNext}
        className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-purple-700 hover:border-purple-200 hover:shadow-xl transition-all duration-300 active:scale-95 cursor-pointer"
        aria-label="Next blogs"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Cards Grid */}
      <div className="overflow-hidden px-1">
        <motion.div
          className="grid grid-cols-3 gap-6"
          key={currentIndex}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onReadMore={onReadMore} />
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === currentIndex
                ? "w-8 h-2.5 bg-purple-700 shadow-md shadow-purple-700/30"
                : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export default function LatestBlogs() {
  const [blogsList, setBlogsList] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const list = [];
        querySnapshot.forEach((doc) => {
          // If status is published (or we can just load all)
          const data = doc.data();
          if (data.status === "Published") {
            list.push({ id: doc.id, ...data });
          }
        });
        if (list.length > 0) {
          setBlogsList(list);
        } else {
          setBlogsList(BLOGS);
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);
        setBlogsList(BLOGS);
      }
    };
    loadBlogs();
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedBlog]);

  return (
    <section id="blogs" className="relative py-20 md:py-28 bg-white overflow-hidden scroll-mt-20">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <SectionHeading
          tagline="Insights & Updates"
          title="Latest"
          highlight="Blogs"
          subtitle="Stay informed with expert articles, career guides, and the latest trends in education and technology from Sarvadnya Vidyapeeth."
          align="center"
        />

        {/* ─── Mobile: Horizontal scroll slider ─── */}
        {blogsList.length > 0 && <MobileSlider blogs={blogsList} onReadMore={setSelectedBlog} />}

        {/* ─── Desktop: 3-col animated slider ─── */}
        {blogsList.length > 0 && <DesktopSlider blogs={blogsList} onReadMore={setSelectedBlog} />}
      </div>

      {/* ─── Blog Modal ─── */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden relative flex flex-col border border-purple-100/50 z-10 animate-fade-in"
            >
              {/* Header Image section */}
              <div className="relative h-48 sm:h-64 w-full flex-shrink-0 overflow-hidden">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute bottom-4 left-6 flex flex-wrap items-center gap-2">
                  <span className="bg-purple-600 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md border border-purple-500/30">
                    {selectedBlog.category}
                  </span>
                  <span className="text-white/80 text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-300" />
                    {selectedBlog.date}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-800 hover:text-purple-750 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 z-20 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Content Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug tracking-tight mb-4">
                  {selectedBlog.title}
                </h3>
                
                <div className="border-b border-slate-100 my-4" />

                {/* Rich text HTML rendering */}
                <div
                  className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                />

                <div className="border-t border-slate-100 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-700">
                    <Tag className="w-4 h-4 animate-pulse" />
                    <span>Sarvadnya Vidyapeeth Blog Desk</span>
                  </div>
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 to-indigo-900 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md shadow-purple-900/20 hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
