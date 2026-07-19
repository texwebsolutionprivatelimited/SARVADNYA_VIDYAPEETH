import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Search,
  Send,
  CheckCircle2,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { db, collection, onSnapshot, addDoc } from "../../firebase";

const FALLBACK_FAQS = [
  {
    id: "f1",
    question: "How many sessions will I need?",
    answer: "The total number of sessions depends on your selected course modules, syllabus requirements, and individual learning progress. Regular classes run Monday through Saturday.",
    active: true,
  },
  {
    id: "f2",
    question: "What is the eligibility criteria for BCA & BBA admissions?",
    answer: "For BCA, candidates must pass Class 12th with Mathematics or Computer Science. For BBA, candidates from any stream (Science, Commerce, Arts) with minimum 45% aggregate marks are eligible.",
    active: true,
  },
  {
    id: "f3",
    question: "How does the Bihar Student Credit Card (BSCC / DRCC) scheme work?",
    answer: "Sarvadnya Vidyapeeth is fully approved for the BSCC scheme. Our dedicated DRCC helpdesk assists students with document verification, sanction letter processing, and hassle-free disbursement.",
    active: true,
  },
  {
    id: "f4",
    question: "What documents are required during direct physical admission?",
    answer: "You will need Class 10th and 12th marksheets, passing certificates, TC/Migration certificate, Character certificate, Aadhaar card, and 6 recent passport-size photographs.",
    active: true,
  },
];

export default function FaqSection({ className = "" }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Ask Question Form state
  const [askForm, setAskForm] = useState({ name: "", email: "", question: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "faqs"), (snapshot) => {
      const list = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.active !== false) {
          list.push({ id: docSnap.id, ...data });
        }
      });
      if (list.length === 0) {
        setFaqs(FALLBACK_FAQS);
      } else {
        setFaqs(list);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleAskSubmit = async (e) => {
    e.preventDefault();
    if (!askForm.question.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "submitted_questions"), {
        name: askForm.name.trim() || "Anonymous",
        email: askForm.email.trim() || "N/A",
        question: askForm.question.trim(),
        submittedAt: new Date().toISOString(),
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setAskForm({ name: "", email: "", question: "" });
      setTimeout(() => setSubmittedSuccess(false), 5000);
    } catch (err) {
      console.error("Failed to submit question:", err);
      setIsSubmitting(false);
    }
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      (f.question && f.question.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (f.answer && f.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className={`py-16 md:py-20 bg-slate-50/80 border-t border-purple-100 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100/70 text-purple-900 rounded-full text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-purple-700" />
            Got Questions? We Have Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
            Find quick answers to common queries about courses, admission procedures, credit card schemes, and campus life at Sarvadnya Vidyapeeth.
          </p>
        </div>

        {/* Search & Accordion Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main FAQ Accordion (Left 7/8 columns) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Search Box */}
            <div className="relative mb-6">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search any question or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-purple-100 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 shadow-sm transition-all"
              />
            </div>

            {/* Accordions */}
            {loading ? (
              <div className="py-12 text-center text-slate-400 text-sm font-medium">
                Loading FAQs...
              </div>
            ) : filteredFaqs.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm font-medium bg-white rounded-2xl border border-slate-200/60 p-6">
                No matching questions found. Feel free to submit your question using the form!
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredFaqs.map((faq, i) => {
                  const isOpen = activeFaq === i;
                  return (
                    <div
                      key={faq.id || i}
                      className={`bg-white border rounded-2xl overflow-hidden shadow-xs transition-all duration-200 ${
                        isOpen
                          ? "border-purple-300 ring-2 ring-purple-500/10 shadow-md"
                          : "border-slate-200/70 hover:border-purple-200"
                      }`}
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-850 hover:text-purple-900 transition-colors gap-4"
                      >
                        <span className="text-xs sm:text-sm md:text-base leading-snug">
                          {faq.question}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            isOpen
                              ? "bg-purple-700 text-white"
                              : "bg-slate-100 text-slate-500 hover:bg-purple-100 hover:text-purple-800"
                          }`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 sm:p-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 mt-1">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Submit Question Card (Right 5 columns) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {/* Background Accent Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[11px] font-bold tracking-wider text-amber-300 uppercase">
                <Sparkles className="w-3 h-3" />
                Still Have Questions?
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                Submit Your Question
              </h3>
              <p className="text-purple-200 text-xs sm:text-sm leading-relaxed">
                Can't find what you're looking for? Ask our counselors directly and get answers delivered fast.
              </p>

              {submittedSuccess ? (
                <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-4 flex items-start gap-3 text-emerald-200 text-xs sm:text-sm animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-white block mb-0.5">
                      Question Submitted!
                    </strong>
                    Thank you. Your question has been submitted to our admissions team and will be reviewed shortly.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAskSubmit} className="space-y-3 pt-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name (Optional)"
                      value={askForm.name}
                      onChange={(e) => setAskForm({ ...askForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/15 transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your Email or Phone (Optional)"
                      value={askForm.email}
                      onChange={(e) => setAskForm({ ...askForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/15 transition-all"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      required
                      placeholder="Type your question here..."
                      value={askForm.question}
                      onChange={(e) => setAskForm({ ...askForm, question: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/15 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !askForm.question.trim()}
                    className="w-full py-3 px-5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Question
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
