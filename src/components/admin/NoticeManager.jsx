import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Bell,
  Pin,
  AlertTriangle,
  Info,
  AlertCircle,
  Clock,
} from "lucide-react";
import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "../../firebase";

const PRIORITY_CONFIG = {
  Urgent: { icon: AlertTriangle, color: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500", gradient: "from-red-500 to-rose-600" },
  Important: { icon: AlertCircle, color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", gradient: "from-amber-500 to-orange-600" },
  General: { icon: Info, color: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500", gradient: "from-blue-500 to-indigo-600" },
};

const INITIAL_NOTICES = [
  { id: 1, title: "Semester Exam Schedule - July 2026", content: "Final semester examinations will begin from July 20, 2026. Detailed timetable available at the exam cell.", priority: "Urgent", pinned: true, date: "Jun 27, 2026", expiresAt: "Jul 30, 2026" },
  { id: 2, title: "Admission Last Date Extended", content: "The last date for admission to BCA and BBA programmes has been extended to July 15, 2026.", priority: "Important", pinned: true, date: "Jun 25, 2026", expiresAt: "Jul 15, 2026" },
  { id: 3, title: "Library Timing Change", content: "Library will remain open from 8 AM to 9 PM starting from July 1, 2026 for exam preparation.", priority: "General", pinned: false, date: "Jun 24, 2026", expiresAt: "Aug 01, 2026" },
  { id: 4, title: "Hackathon Registration Open", content: "Register for Vidya-Tech National Hackathon 2026 before July 10. Limited seats available.", priority: "Important", pinned: false, date: "Jun 22, 2026", expiresAt: "Jul 10, 2026" },
  { id: 5, title: "Campus Wi-Fi Maintenance", content: "Campus Wi-Fi will be under maintenance on June 30, 2026 from 10 PM to 6 AM.", priority: "General", pinned: false, date: "Jun 20, 2026", expiresAt: "Jul 01, 2026" },
  { id: 6, title: "Scholarship Application Deadline", content: "Last date for BSCC scholarship application is July 5, 2026. Apply through the admission office.", priority: "Urgent", pinned: false, date: "Jun 18, 2026", expiresAt: "Jul 05, 2026" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function NoticeManager() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", priority: "General", expiresAt: "" });

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notices"));
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        if (list.length === 0) {
          const seeded = [];
          for (const item of INITIAL_NOTICES) {
            const docRef = await addDoc(collection(db, "notices"), {
              title: item.title,
              content: item.content,
              priority: item.priority,
              pinned: item.pinned,
              date: item.date,
              expiresAt: item.expiresAt,
            });
            seeded.push({ id: docRef.id, ...item });
          }
          setNotices(seeded);
        } else {
          setNotices(list);
        }
      } catch (err) {
        console.error("Firestore error:", err);
      }
    };
    fetchNotices();
  }, []);

  const FILTERS = ["All", "Urgent", "Important", "General"];

  const filtered = notices.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterPriority === "All" || n.priority === filterPriority;
    return matchSearch && matchFilter;
  });

  // Sort: pinned first, then by date
  const sorted = [...filtered].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const openAdd = () => {
    setEditingNotice(null);
    setForm({ title: "", content: "", priority: "General", expiresAt: "" });
    setShowModal(true);
  };

  const openEdit = (notice) => {
    setEditingNotice(notice);
    setForm({ title: notice.title, content: notice.content, priority: notice.priority, expiresAt: notice.expiresAt });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    try {
      if (editingNotice) {
        const docRef = doc(db, "notices", editingNotice.id);
        await updateDoc(docRef, form);
        setNotices((prev) => prev.map((n) => (n.id === editingNotice.id ? { ...n, ...form } : n)));
      } else {
        const newNoticeData = {
          ...form,
          pinned: false,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        };
        const docRef = await addDoc(collection(db, "notices"), newNoticeData);
        setNotices((prev) => [{ id: docRef.id, ...newNoticeData }, ...prev]);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save notice:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notices", id));
      setNotices((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Failed to delete notice:", err);
    }
  };

  const togglePin = async (id) => {
    const noticeToToggle = notices.find((n) => n.id === id);
    if (!noticeToToggle) return;
    try {
      const docRef = doc(db, "notices", id);
      await updateDoc(docRef, { pinned: !noticeToToggle.pinned });
      setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
    } catch (err) {
      console.error("Failed to pin/unpin notice:", err);
    }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">Notice Manager</h2>
          <p className="text-[12px] text-slate-500 mt-0.5">{notices.length} notices • {notices.filter(n => n.pinned).length} pinned</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Post Notice
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
        {Object.entries(PRIORITY_CONFIG).map(([priority, config]) => {
          const count = notices.filter((n) => n.priority === priority).length;
          return (
            <div key={priority} className={`rounded-xl bg-gradient-to-br ${config.gradient} p-4 text-white relative overflow-hidden`}>
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-white/10" />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">{priority}</p>
              <p className="text-2xl font-black mt-1">{count}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Search + Filters */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 bg-white text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilterPriority(f)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 ${
                filterPriority === f ? "bg-purple-700 text-white border-purple-600 shadow-sm" : "bg-white text-slate-600 border-purple-100 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Notice Cards */}
      <motion.div variants={fadeUp} className="space-y-3">
        {sorted.map((notice) => {
          const PriorityIcon = PRIORITY_CONFIG[notice.priority].icon;
          return (
            <div
              key={notice.id}
              className={`bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition-all duration-200 group ${
                notice.pinned ? "border-purple-300 ring-1 ring-purple-100" : "border-purple-100/60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {notice.pinned && (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                        <Pin className="w-2.5 h-2.5" /> Pinned
                      </span>
                    )}
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${PRIORITY_CONFIG[notice.priority].color}`}>
                      <PriorityIcon className="w-3 h-3" />
                      {notice.priority}
                    </span>
                  </div>
                  <h4 className="text-[14px] font-bold text-slate-800 leading-tight">{notice.title}</h4>
                  <p className="text-[12px] text-slate-500 mt-1.5 leading-relaxed">{notice.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Posted: {notice.date}</span>
                    {notice.expiresAt && <span className="flex items-center gap-1">Expires: {notice.expiresAt}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => togglePin(notice.id)} className={`p-1.5 rounded-lg transition-colors ${notice.pinned ? "bg-purple-100 text-purple-600" : "hover:bg-purple-100 text-slate-400"}`} title={notice.pinned ? "Unpin" : "Pin"}>
                    <Pin className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => openEdit(notice)} className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-500 transition-colors opacity-0 group-hover:opacity-100" title="Edit">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(notice.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors opacity-0 group-hover:opacity-100" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {sorted.length === 0 && (
          <div className="text-center py-10 text-[12px] text-slate-400">No notices found.</div>
        )}
      </motion.div>

      {/* ─── Add / Edit Modal ─── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-purple-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">{editingNotice ? "Edit Notice" : "Post Notice"}</h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Notice title..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Content</label>
                  <textarea rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Notice content..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Priority</label>
                    <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all appearance-none">
                      <option value="General">General</option>
                      <option value="Important">Important</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Expires</label>
                    <input type="text" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} placeholder="e.g. Jul 30, 2026"
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-purple-200 text-[12px] font-bold text-slate-600 hover:bg-purple-50 transition-colors">Cancel</button>
                <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-md shadow-purple-500/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                  {editingNotice ? "Update Notice" : "Post Notice"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
