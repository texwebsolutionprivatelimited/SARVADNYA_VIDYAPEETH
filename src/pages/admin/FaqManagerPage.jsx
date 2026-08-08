import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Eye,
  EyeOff,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Search,
  MessageSquarePlus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { db, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "../../firebase";

const INITIAL_FAQS = [
  {
    question: "How many sessions will I need?",
    answer: "The total number of sessions depends on your selected course modules, syllabus requirements, and individual learning progress. Regular classes run Monday through Saturday.",
    active: true,
  },
  {
    question: "What is the eligibility criteria for BCA & BBA admissions?",
    answer: "For BCA, candidates must pass Class 12th with Mathematics or Computer Science. For BBA, candidates from any stream (Science, Commerce, Arts) with minimum 45% aggregate marks are eligible.",
    active: true,
  },
  {
    question: "How does the Bihar Student Credit Card (BSCC / DRCC) scheme work?",
    answer: "Sarvadnya Vidyapeeth is fully approved for the BSCC scheme. Our dedicated DRCC helpdesk assists students with document verification, sanction letter processing, and hassle-free disbursement.",
    active: true,
  },
  {
    question: "What documents are required during direct physical admission?",
    answer: "You will need Class 10th and 12th marksheets, passing certificates, TC/Migration certificate, Character certificate, Aadhaar card, and 6 recent passport-size photographs.",
    active: true,
  },
  {
    question: "Is hostel and mess facility available for outstation students?",
    answer: "Yes, we offer separate secure hostels for boys and girls with 24/7 security, high-speed Wi-Fi, hygienic mess meals, and power backup near campus.",
    active: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export default function FaqManager() {
  const [faqs, setFaqs] = useState([]);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Confirmations
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [confirmDeleteItem, setConfirmDeleteItem] = useState(null);
  const [confirmEditItem, setConfirmEditItem] = useState(null);
  const [confirmDeleteSubmitted, setConfirmDeleteSubmitted] = useState(null);
  const [expandedFaqId, setExpandedFaqId] = useState(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [form, setForm] = useState({
    question: "",
    answer: "",
    active: true,
  });

  // Listen to Firestore FAQs collection
  useEffect(() => {
    const unsubFaqs = onSnapshot(collection(db, "faqs"), async (snapshot) => {
      const list = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });

      if (snapshot.docs.length === 0) {
        try {
          const seeded = [];
          for (const item of INITIAL_FAQS) {
            const docRef = await addDoc(collection(db, "faqs"), {
              question: item.question,
              answer: item.answer,
              active: item.active,
              createdAt: new Date().toISOString(),
            });
            seeded.push({ id: docRef.id, ...item });
          }
          setFaqs(seeded);
        } catch (err) {
          console.error("Failed to seed initial FAQs:", err);
          setFaqs(INITIAL_FAQS.map((item, index) => ({ id: `init-${index}`, ...item })));
        }
      } else {
        setFaqs(list);
      }
      setLoading(false);
    });

    // Listen to Submitted Questions collection
    const unsubSubmitted = onSnapshot(collection(db, "submitted_questions"), (snapshot) => {
      const list = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      setSubmittedQuestions(list);
    });

    return () => {
      unsubFaqs();
      unsubSubmitted();
    };
  }, []);

  // Open modal for adding new FAQ
  const openAdd = (prefillQuestion = "") => {
    setEditingFaq(null);
    setForm({
      question: prefillQuestion,
      answer: "",
      active: true,
    });
    setShowModal(true);
  };

  // Open modal for editing FAQ
  const openEdit = (faq) => {
    setEditingFaq(faq);
    setForm({
      question: faq.question || "",
      answer: faq.answer || "",
      active: faq.active !== undefined ? faq.active : true,
    });
    setShowModal(true);
  };

  // Save FAQ (Create or Update)
  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) return;

    try {
      if (editingFaq) {
        const docRef = doc(db, "faqs", editingFaq.id);
        await updateDoc(docRef, {
          question: form.question.trim(),
          answer: form.answer.trim(),
          active: form.active,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await addDoc(collection(db, "faqs"), {
          question: form.question.trim(),
          answer: form.answer.trim(),
          active: form.active,
          createdAt: new Date().toISOString(),
        });
      }
      setShowModal(false);
      setEditingFaq(null);
      setForm({ question: "", answer: "", active: true });
    } catch (err) {
      console.error("Failed to save FAQ:", err);
    }
  };

  // Toggle active status directly
  const toggleActiveStatus = async (faq) => {
    try {
      const docRef = doc(db, "faqs", faq.id);
      await updateDoc(docRef, { active: !faq.active });
    } catch (err) {
      console.error("Failed to toggle active status:", err);
    }
  };

  // Delete FAQ
  const handleDeleteFaq = async (id) => {
    try {
      await deleteDoc(doc(db, "faqs", id));
    } catch (err) {
      console.error("Failed to delete FAQ:", err);
    }
  };

  // Delete Submitted Question
  const handleDeleteSubmittedQuestion = async (id) => {
    try {
      await deleteDoc(doc(db, "submitted_questions", id));
    } catch (err) {
      console.error("Failed to delete submitted question:", err);
    }
  };

  // Convert submitted question to FAQ
  const handleConvertSubmittedToFaq = (submittedItem) => {
    openAdd(submittedItem.question);
  };

  // Execute confirmed actions
  const executeEdit = () => {
    if (!confirmEditItem) return;
    openEdit(confirmEditItem);
    setConfirmEditItem(null);
  };

  const executeDelete = async () => {
    if (!confirmDeleteItem) return;
    await handleDeleteFaq(confirmDeleteItem.id);
    setConfirmDeleteItem(null);
  };

  const executeDeleteSubmitted = async () => {
    if (!confirmDeleteSubmitted) return;
    await handleDeleteSubmittedQuestion(confirmDeleteSubmitted.id);
    setConfirmDeleteSubmitted(null);
  };

  // Filtered FAQs
  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="p-4 sm:p-6 lg:p-8 space-y-8 bg-slate-50/50 min-h-screen"
    >
      {/* ─── Header Bar matching admin panel theme ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
            FAQ Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Create, update and delete FAQs.
          </p>
        </div>

        <button
          onClick={() => openAdd()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-purple-900/20 hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-200 active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          + Add FAQ
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search questions or answers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all shadow-sm"
        />
      </div>

      {/* ─── Table 1: FAQ Management List ─── */}
      <div className="bg-white rounded-2xl border border-purple-100/80 shadow-sm overflow-hidden">
        {/* Purple/Indigo Header Bar matching Admin Panel Theme */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-950 to-indigo-900 text-white px-6 py-3.5 grid grid-cols-12 items-center font-bold text-xs sm:text-sm tracking-wide border-b border-purple-800/40">
          <div className="col-span-7 sm:col-span-8">Question</div>
          <div className="col-span-3 sm:col-span-2 text-center sm:text-left">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Rows */}
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-sm font-medium">
            Loading FAQs...
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm font-medium">
            No FAQs found matching your search.
          </div>
        ) : (
          <div className="divide-y divide-purple-50">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div key={faq.id} className="transition-colors hover:bg-purple-50/30">
                  <div className="px-6 py-4 grid grid-cols-12 items-center gap-2">
                    {/* Question column */}
                    <div className="col-span-7 sm:col-span-8 pr-2">
                      <button
                        onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                        className="text-left font-semibold text-slate-800 hover:text-purple-900 text-xs sm:text-sm flex items-center gap-2 group w-full"
                      >
                        <span className="line-clamp-2">{faq.question}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 group-hover:text-purple-700" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 group-hover:text-purple-700" />
                        )}
                      </button>
                    </div>

                    {/* Status column */}
                    <div className="col-span-3 sm:col-span-2 text-center sm:text-left">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          faq.active
                            ? "bg-purple-50 text-purple-800 border border-purple-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {faq.active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {/* Actions column */}
                    <div className="col-span-2 flex items-center justify-end gap-1.5 sm:gap-2">
                      {/* Toggle status icon */}
                      <button
                        onClick={() => toggleActiveStatus(faq)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          faq.active
                            ? "text-purple-700 hover:bg-purple-100/70"
                            : "text-slate-400 hover:bg-slate-100"
                        }`}
                        title={faq.active ? "Deactivate FAQ" : "Activate FAQ"}
                      >
                        {faq.active ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>

                      {/* Edit icon */}
                      <button
                        onClick={() => setConfirmEditItem(faq)}
                        className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors"
                        title="Edit FAQ"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete icon */}
                      <button
                        onClick={() => setConfirmDeleteItem(faq)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Answer view */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-4 pt-1 bg-purple-50/40 border-t border-purple-100/60"
                      >
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-3 border-l-2 border-purple-600 italic">
                          <strong className="text-purple-950 not-italic font-bold block mb-1">
                            Answer:
                          </strong>
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Table 2: Submitted Questions ─── */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
          Submitted Questions
        </h2>

        <div className="bg-white rounded-2xl border border-purple-100/80 shadow-sm overflow-hidden">
          {/* Purple/Indigo Header Bar matching Admin Panel Theme */}
          <div className="bg-gradient-to-r from-purple-900 via-purple-950 to-indigo-900 text-white px-6 py-3.5 grid grid-cols-12 items-center font-bold text-xs sm:text-sm tracking-wide border-b border-purple-800/40">
            <div className="col-span-3 sm:col-span-3">Name</div>
            <div className="col-span-4 sm:col-span-3">Email</div>
            <div className="col-span-3 sm:col-span-4">Question</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
          {submittedQuestions.length === 0 ? (
            <div className="py-14 text-center text-slate-400 text-xs sm:text-sm font-medium bg-slate-50/40">
              No Submitted Questions
            </div>
          ) : (
            <div className="divide-y divide-purple-50">
              {submittedQuestions.map((sq) => (
                <div
                  key={sq.id}
                  className="px-6 py-4 grid grid-cols-12 items-center gap-2 hover:bg-purple-50/30 transition-colors"
                >
                  <div className="col-span-3 sm:col-span-3 font-semibold text-slate-800 text-xs sm:text-sm truncate">
                    {sq.name || "Anonymous"}
                  </div>
                  <div className="col-span-4 sm:col-span-3 text-slate-500 text-xs truncate font-mono">
                    {sq.email || "N/A"}
                  </div>
                  <div className="col-span-3 sm:col-span-4 text-slate-700 text-xs sm:text-sm font-medium line-clamp-2">
                    {sq.question}
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-1.5 sm:gap-2">
                    {/* Convert to FAQ icon */}
                    <button
                      onClick={() => handleConvertSubmittedToFaq(sq)}
                      className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-700 transition-colors"
                      title="Add to FAQs"
                    >
                      <MessageSquarePlus className="w-4 h-4" />
                    </button>

                    {/* Delete Icon */}
                    <button
                      onClick={() => setConfirmDeleteSubmitted(sq)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                      title="Delete Submitted Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Modal: Add FAQ / Edit FAQ ─── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 pt-6 pb-2 flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                  {editingFaq ? "Edit FAQ" : "Add FAQ"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form Content */}
              <div className="p-6 space-y-4">
                {/* Question Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Question"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 transition-all font-medium"
                  />
                </div>

                {/* Answer Textarea */}
                <div>
                  <textarea
                    rows={5}
                    placeholder="Answer"
                    value={form.answer}
                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-purple-100 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 transition-all font-medium resize-none"
                  />
                </div>

                {/* Active Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="faq-active-check"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="w-4 h-4 text-purple-700 accent-purple-800 rounded border-purple-200 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="faq-active-check"
                    className="text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer select-none"
                  >
                    Active
                  </label>
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="px-6 py-4 bg-slate-50/80 border-t border-purple-100/60 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!form.question.trim() || !form.answer.trim()}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Confirmation Modal: Edit FAQ ─── */}
      <AnimatePresence>
        {confirmEditItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-purple-100 space-y-4"
            >
              <div className="flex items-center gap-3 text-amber-600">
                <div className="p-2 bg-amber-50 rounded-xl">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Confirm Edit</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Are you sure you want to edit the FAQ:{" "}
                <span className="font-bold text-slate-800">"{confirmEditItem.question}"</span>?
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setConfirmEditItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeEdit}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
                >
                  Proceed to Edit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Confirmation Modal: Delete FAQ ─── */}
      <AnimatePresence>
        {confirmDeleteItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-purple-100 space-y-4"
            >
              <div className="flex items-center gap-3 text-red-600">
                <div className="p-2 bg-red-50 rounded-xl">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Delete FAQ</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Are you sure you want to delete this FAQ? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setConfirmDeleteItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
                >
                  Delete FAQ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Confirmation Modal: Delete Submitted Question ─── */}
      <AnimatePresence>
        {confirmDeleteSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-purple-100 space-y-4"
            >
              <div className="flex items-center gap-3 text-red-600">
                <div className="p-2 bg-red-50 rounded-xl">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Delete Submitted Question</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Are you sure you want to delete this submitted question from{" "}
                <span className="font-bold text-slate-800">
                  {confirmDeleteSubmitted.name || "Anonymous"}
                </span>
                ?
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setConfirmDeleteSubmitted(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDeleteSubmitted}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
