import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Upload,
  Download,
  Trash2,
  FileText,
  Eye,
  X,
  File,
  BookOpen,
} from "lucide-react";

const INITIAL_BROCHURES = [
  { id: 1, title: "BCA Course Brochure 2026-27", type: "PDF", size: "2.4 MB", downloads: 234, date: "Jun 20, 2026", category: "Courses" },
  { id: 2, title: "BBA Programme Guide", type: "PDF", size: "3.1 MB", downloads: 189, date: "Jun 15, 2026", category: "Courses" },
  { id: 3, title: "Campus Infrastructure Brochure", type: "PDF", size: "5.6 MB", downloads: 156, date: "Jun 10, 2026", category: "Campus" },
  { id: 4, title: "Admission Prospectus 2026", type: "PDF", size: "4.2 MB", downloads: 412, date: "Jun 01, 2026", category: "Admissions" },
  { id: 5, title: "Hostel & Dining Facilities Guide", type: "PDF", size: "1.8 MB", downloads: 98, date: "May 25, 2026", category: "Campus" },
  { id: 6, title: "Placement Report 2025-26", type: "PDF", size: "3.5 MB", downloads: 321, date: "May 15, 2026", category: "Placements" },
];

const CATEGORY_COLORS = {
  Courses: "from-purple-500 to-indigo-600",
  Campus: "from-blue-500 to-cyan-600",
  Admissions: "from-green-500 to-emerald-600",
  Placements: "from-amber-500 to-orange-600",
};

const CATEGORY_BG = {
  Courses: "bg-purple-50 text-purple-700",
  Campus: "bg-blue-50 text-blue-700",
  Admissions: "bg-green-50 text-green-700",
  Placements: "bg-amber-50 text-amber-700",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function BrochureManager() {
  const [brochures, setBrochures] = useState(INITIAL_BROCHURES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Courses" });
  const [dragActive, setDragActive] = useState(false);

  const handleAdd = () => {
    if (!form.title.trim()) return;
    const newBrochure = {
      id: Date.now(),
      title: form.title,
      type: "PDF",
      size: "1.2 MB",
      downloads: 0,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: form.category,
    };
    setBrochures((prev) => [newBrochure, ...prev]);
    setShowModal(false);
    setForm({ title: "", category: "Courses" });
  };

  const handleDelete = (id) => {
    setBrochures((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">Brochure Manager</h2>
          <p className="text-[12px] text-slate-500 mt-0.5">{brochures.length} brochures uploaded</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <Upload className="w-4 h-4" />
          Upload Brochure
        </button>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(CATEGORY_COLORS).map(([cat, gradient]) => {
          const count = brochures.filter((b) => b.category === cat).length;
          const totalDownloads = brochures.filter((b) => b.category === cat).reduce((sum, b) => sum + b.downloads, 0);
          return (
            <div key={cat} className={`rounded-xl bg-gradient-to-br ${gradient} p-4 text-white relative overflow-hidden`}>
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-white/10" />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">{cat}</p>
              <p className="text-2xl font-black mt-1">{count}</p>
              <p className="text-[10px] text-white/70 mt-0.5">{totalDownloads} downloads</p>
            </div>
          );
        })}
      </motion.div>

      {/* Brochure Cards Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brochures.map((brochure) => (
          <div
            key={brochure.id}
            className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-5 hover:shadow-md hover:border-purple-200/80 transition-all duration-200 group"
          >
            {/* File icon header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${CATEGORY_COLORS[brochure.category]} flex items-center justify-center shadow-md`}>
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_BG[brochure.category]}`}>
                {brochure.category}
              </span>
            </div>

            {/* Content */}
            <h4 className="text-[13px] font-bold text-slate-800 leading-tight mb-2 truncate">{brochure.title}</h4>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium mb-4">
              <span className="flex items-center gap-1"><File className="w-3 h-3" /> {brochure.type} • {brochure.size}</span>
              <span>{brochure.date}</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                <Download className="w-3 h-3" /> {brochure.downloads} downloads
              </span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-500 transition-colors opacity-0 group-hover:opacity-100" title="Preview">
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(brochure.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors opacity-0 group-hover:opacity-100" title="Delete">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ─── Upload Modal ─── */}
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
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">Upload Brochure</h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drag & Drop Area */}
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 mb-4 ${
                  dragActive ? "border-purple-400 bg-purple-50" : "border-purple-200 bg-purple-50/30"
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
              >
                <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-[12px] font-bold text-slate-700">Drag & drop your PDF here</p>
                <p className="text-[11px] text-slate-400 mt-1">or click to browse files</p>
                <p className="text-[10px] text-slate-400 mt-2">Supports: PDF, DOC, DOCX (Max 10MB)</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter brochure title..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all appearance-none"
                  >
                    {Object.keys(CATEGORY_COLORS).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-purple-200 text-[12px] font-bold text-slate-600 hover:bg-purple-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-md shadow-purple-500/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Upload
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
