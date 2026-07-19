import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Share2,
  Clock,
  BookOpen,
  CheckCircle2,
  Eye,
  MessageSquare,
  Sparkles,
  Bookmark,
  ThumbsUp
} from "lucide-react";
import { db, doc, onSnapshot, collection } from "../firebase";
import SectionHeading from "../components/SectionHeading";

const DEFAULT_BLOGS = [
  {
    id: "1",
    image: "/images/blogs/bca_career.png",
    title: "BCA Career Scope: Eligibility, Salary & Top Growth Opportunities in 2026",
    excerpt:
      "A BCA degree opens doors to diverse career paths in IT, software development, data science, and more. Discover the eligibility criteria, expected salary packages, and top career opportunities...",
    date: "June 15, 2026",
    category: "Career Guide",
    author: "Dr. Priya Sharma",
    content: `
      <p class='text-slate-800 leading-relaxed mb-6 text-lg'>A Bachelor of Computer Applications (BCA) is one of the most popular undergraduate options for students interested in computer science, programming, and software engineering. In 2026, as cloud computing, artificial intelligence, and mobile apps dominate corporate investments, BCA graduates are in higher demand than ever.</p>
      
      <h3 class='text-2xl font-black text-slate-900 mt-10 mb-4 font-heading'>1. Eligibility Requirements for Admission</h3>
      <p class='text-slate-800 leading-relaxed mb-6 text-lg'>To apply for a BCA program at Sarvadnya Vidyapeeth, students must have completed their 10+2 secondary education from a recognized board with a minimum of 45-50% marks. While mathematics background is preferred, students from arts and commerce streams can also join and excel through specialized foundation programming modules.</p>
      
      <h3 class='text-2xl font-black text-slate-900 mt-10 mb-4 font-heading'>2. Top High-Demand Job Roles</h3>
      <ul class='list-disc pl-6 text-slate-800 space-y-3 mb-8 text-lg'>
        <li><strong>Full-Stack Web Developer:</strong> Design and build responsive web applications using React, Node.js, Next.js, and SQL/NoSQL databases.</li>
        <li><strong>Mobile Application Developer:</strong> Program native and cross-platform apps for iOS and Android devices using Flutter or React Native.</li>
        <li><strong>Data & Business Analyst:</strong> Leverage Python, SQL, and business intelligence tools to parse complex datasets for strategic corporate insights.</li>
        <li><strong>Cloud & DevOps Associate:</strong> Assist tech organizations in deploying, monitoring, and scaling automated cloud microservices on AWS or Azure.</li>
      </ul>
      
      <h3 class='text-2xl font-black text-slate-900 mt-10 mb-4 font-heading'>3. Salary Outlook & Package Trends (2026)</h3>
      <p class='text-slate-800 leading-relaxed mb-6 text-lg'>Freshers usually start with salaries ranging from ₹3.5 Lakhs to ₹7 Lakhs per annum (LPA). Students with strong hands-on coding profiles, active GitHub portfolios, and quality internship experience frequently secure campus placement packages starting at ₹8-12 LPA with Tier-1 IT hiring partners.</p>
    `
  },
  {
    id: "2",
    image: "/images/blogs/bba_internship.png",
    title: "How Internships Give BBA & MBA Students a Placement Edge",
    excerpt:
      "Internships are the bridge between classroom learning and real-world business challenges. Learn how securing the right internship can dramatically boost your placement prospects...",
    date: "June 10, 2026",
    category: "Placements",
    author: "Prof. Vikram Singh",
    content: `
      <p class='text-slate-800 leading-relaxed mb-6 text-lg'>Practical work experience is the single most valuable asset for business administration students. In a competitive corporate job market, summer internships act as a vital bridge, transforming conceptual classroom knowledge into real-world business acumen.</p>
      
      <h3 class='text-2xl font-black text-slate-900 mt-10 mb-4 font-heading'>Why Corporate Employers Value Internships</h3>
      <p class='text-slate-800 leading-relaxed mb-6 text-lg'>Recruiters actively seek candidates who have already worked in a corporate setting. Internships demonstrate that a student understands workplace dynamics, cross-team communication, client reporting, and basic project management frameworks.</p>
      
      <h3 class='text-2xl font-black text-slate-900 mt-10 mb-4 font-heading'>Converting Summer Internships into Pre-Placement Offers (PPOs)</h3>
      <p class='text-slate-800 leading-relaxed mb-6 text-lg'>A significant percentage of students at Sarvadnya Vidyapeeth secure pre-placement offers during their summer internships. By delivering exceptional value on client deliverables, showing initiative, and aligning with company culture, interns frequently secure full-time job offers before their final semester exams begin.</p>
    `
  },
  {
    id: "3",
    image: "/images/blogs/digital_marketing.png",
    title: "Digital Marketing Skills Every BCA Student Must Learn in 2026",
    excerpt:
      "In today's digital-first economy, BCA graduates with marketing skills stand out. Explore the essential digital marketing competencies that complement your tech degree...",
    date: "June 05, 2026",
    category: "Skills",
    author: "Admin Desk",
    content: `
      <p class='text-slate-800 leading-relaxed mb-6 text-lg'>The line between software development and digital marketing is blurring rapidly. In 2026, tech graduates who also understand user analytics, SEO architecture, and conversion channels possess a powerful competitive advantage in corporate hiring.</p>
      
      <h3 class='text-2xl font-black text-slate-900 mt-10 mb-4 font-heading'>Essential Technical Marketing Competencies</h3>
      <ul class='list-disc pl-6 text-slate-800 space-y-3 mb-8 text-lg'>
        <li><strong>Technical SEO & Performance Optimization:</strong> Optimizing DOM structure, page load speeds, schema microdata, and server caching.</li>
        <li><strong>Web Analytics & Tracking Architecture:</strong> Configuring Google Tag Manager, custom event tracking, and conversion funnels.</li>
        <li><strong>Growth Engineering & Automation:</strong> Building custom webhooks, email triggers, and algorithmic lead scoring systems.</li>
      </ul>
    `
  },
  {
    id: "4",
    image: "/images/blogs/ai_future.png",
    title: "AI & Future Tech: How Artificial Intelligence is Transforming Education",
    excerpt:
      "Artificial Intelligence is reshaping how we learn, teach, and prepare for careers. Discover how SV integrates AI-driven tools into its curriculum for tomorrow's leaders...",
    date: "May 28, 2026",
    category: "Technology",
    author: "Dr. Priya Sharma",
    content: `
      <p class='text-slate-800 leading-relaxed mb-6 text-lg'>Artificial Intelligence is no longer just a specialized subject in computer science; it is the infrastructure of modern education. In 2026, Sarvadnya Vidyapeeth is leading the region by integrating generative AI tools, interactive coding assistants, and adaptive learning into our standard curriculum.</p>
      
      <h3 class='text-2xl font-black text-slate-900 mt-10 mb-4 font-heading'>AI-Assisted Development Labs</h3>
      <p class='text-slate-800 leading-relaxed mb-6 text-lg'>In our high-tech computer labs, students learn to work alongside AI pair-programming tools. Rather than simple copy-pasting, students are trained to write effective prompts, inspect generated code for logic errors, debug edge cases, and design scalable software architectures.</p>
    `
  },
  {
    id: "5",
    image: "/images/blogs/campus_placement.png",
    title: "Campus Placement Preparation: Top Tips to Crack Your Dream Company",
    excerpt:
      "Preparing for campus placements can feel overwhelming. This comprehensive guide covers aptitude preparation, interview strategies, resume building, and group discussion tips...",
    date: "May 20, 2026",
    category: "Placements",
    author: "T&P Cell",
    content: `
      <p class='text-slate-800 leading-relaxed mb-6 text-lg'>Securing a top job offer straight out of college is a landmark achievement. Campus recruitment drives are fast-paced and competitive, making structured, disciplined preparation essential to landing high-paying corporate roles.</p>
      
      <h3 class='text-2xl font-black text-slate-900 mt-10 mb-4 font-heading'>Key Steps for Campus Drive Success</h3>
      <ul class='list-disc pl-6 text-slate-800 space-y-3 mb-8 text-lg'>
        <li><strong>Aptitude & Technical Coding Drills:</strong> Practice daily quantitative reasoning and Data Structures & Algorithms (DSA) problem sets.</li>
        <li><strong>Project-Focused Single-Page Resume:</strong> Highlight 2-3 capstone projects with live deployment URLs and GitHub source code.</li>
        <li><strong>Mock Interviews & HR Drills:</strong> Participate in mock technical rounds and group discussions organized by SV Training & Placement Cell.</li>
      </ul>
    `
  }
];

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    if (!id) {
      setLoading(false);
      return;
    }

    const unsubDoc = onSnapshot(doc(db, "blogs", id), (docSnap) => {
      if (docSnap.exists()) {
        setBlog({ id: docSnap.id, ...docSnap.data() });
      } else {
        const fallback = DEFAULT_BLOGS.find((b) => String(b.id) === String(id));
        setBlog(fallback || null);
      }
      setLoading(false);
    }, (err) => {
      const fallback = DEFAULT_BLOGS.find((b) => String(b.id) === String(id));
      setBlog(fallback || null);
      setLoading(false);
    });

    const unsubList = onSnapshot(collection(db, "blogs"), (snapshot) => {
      const list = [];
      snapshot.forEach((d) => {
        const data = d.data();
        if (data.status === "Published" && d.id !== id) {
          list.push({ id: d.id, ...data });
        }
      });
      if (list.length > 0) {
        setRecentBlogs(list.slice(0, 3));
      } else {
        setRecentBlogs(DEFAULT_BLOGS.filter((b) => String(b.id) !== String(id)).slice(0, 3));
      }
    }, () => {
      setRecentBlogs(DEFAULT_BLOGS.filter((b) => String(b.id) !== String(id)).slice(0, 3));
    });

    return () => {
      unsubDoc();
      unsubList();
    };
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-purple-900 uppercase tracking-widest">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-6 py-12">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-4 font-black text-xl">
            404
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">Article Not Found</h2>
          <p className="text-slate-500 text-xs leading-relaxed mb-6">
            The article you are looking for does not exist or may have been updated.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 text-white text-xs font-bold shadow-md hover:bg-purple-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Calculate reading time based on word count
  const textContent = (blog.content || blog.excerpt || "").replace(/<[^>]+>/g, "");
  const wordCount = textContent.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(2, Math.ceil(wordCount / 160));

  return (
    <div className="bg-white min-h-screen pt-20 pb-20">
      {/* ── Top Header Section (Matching 2nd Reference Image) ── */}
      <div className="text-center pt-8 sm:pt-12 pb-8 sm:pb-10 px-4 max-w-4xl mx-auto">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-2">
          {blog.category ? `${blog.category.toUpperCase()} ARTICLES` : "HEALTH ARTICLES"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 font-heading">
          Sarvadnya Vidyapeeth Blog
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          Explore expert educational advice, career guidance, IT insights, placement strategies, and wellness articles written by Sarvadnya Vidyapeeth specialists.
        </p>
      </div>

      {/* ── Standalone Open Article Page (Unboxed, Pure Open Page like 2nd Image) ── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* 1. UPLOADED FEATURED IMAGE */}
        {blog.image && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 overflow-hidden rounded-2xl"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto max-h-[460px] object-cover rounded-2xl"
            />
          </motion.div>
        )}

        {/* 2. DATE */}
        <p className="text-xs sm:text-sm text-slate-400 font-normal mb-2">
          {blog.date || "July 15, 2026"}
        </p>

        {/* 3. ARTICLE TITLE */}
        <h2 className="text-2xl sm:text-3.5xl font-bold text-slate-900 tracking-tight leading-snug mb-2 font-heading">
          {blog.title}
        </h2>

        {/* 4. SUBTITLE / EXCERPT */}
        {blog.excerpt && (
          <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed mb-8">
            {blog.excerpt}
          </p>
        )}

        {/* 5. CONTENT (The full article text/body flowing naturally) */}
        <div className="text-slate-700 text-sm sm:text-base leading-relaxed mb-12 font-sans space-y-5">
          {blog.content ? (
            /<[a-z][\s\S]*>/i.test(blog.content) ? (
              <div
                className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            ) : (
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                {blog.content.split("\n\n").map((para, idx) => (
                  <p key={idx} className="mb-4 leading-relaxed">
                    {para.split("\n").map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {line}
                        {lIdx < para.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                ))}
              </div>
            )
          ) : (
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{blog.excerpt || blog.title}</p>
          )}
        </div>

        {/* 6. AT THE END: AUTHOR NAME SHOW */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-700 to-indigo-800 text-white font-bold flex items-center justify-center text-lg shadow-sm shrink-0">
              {(blog.author || "Dr. Priya Sharma").charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-[10px] font-bold text-purple-700 uppercase tracking-widest mb-0.5">Author</p>
              <h4 className="text-base sm:text-lg font-extrabold text-slate-900">{blog.author || "Dr. Priya Sharma"}</h4>
              <p className="text-xs text-slate-500 font-medium">Faculty & Academic Specialist, Sarvadnya Vidyapeeth</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-all cursor-pointer"
            >
              {copied ? "Link Copied!" : "Share Article"}
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-purple-700 transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 text-purple-600" /> Back to Home
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {recentBlogs.length > 0 && (
          <section className="pt-8 border-t border-slate-200">
            <h3 className="text-xl font-black text-slate-900 mb-6 font-heading">More Articles to Read</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recentBlogs.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.id}`}
                  className="group flex flex-col space-y-2"
                >
                  {item.image && (
                    <div className="h-32 overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">{item.category || "General"}</span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
