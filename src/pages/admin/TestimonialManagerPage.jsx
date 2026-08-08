import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  X,
  Star,
  Upload,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import { db, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "../../firebase";

const INITIAL_TESTIMONIALS = [
  {
    name: "Priya Kumari",
    designation: "BCA Graduate, Batch 2025",
    review: "Sarvadnya Vidyapeeth transformed my career trajectory entirely. The faculty didn't just teach — they mentored us through real-world projects. I got placed at an IT firm even before my final semester exams. The practical approach to education here is unmatched!",
    rating: 5,
    image: null,
    active: true,
    placed: "TCS Digital",
  },
  {
    name: "Rahul Verma",
    designation: "BBA Graduate, Batch 2024",
    review: "What sets SV apart is the holistic development — from personality workshops to industry visits. The placement cell worked tirelessly to connect us with top recruiters. I'm now working in a Fortune 500 company, all thanks to the foundation SV built for me.",
    rating: 5,
    image: null,
    active: true,
    placed: "Deloitte",
  },
  {
    name: "Anjali Singh",
    designation: "BCA Student, 3rd Year",
    review: "The computer labs here are world-class — always updated with the latest software. Our professors encourage us to participate in hackathons and coding contests. I've already won two state-level competitions and have an internship at a startup!",
    rating: 5,
    image: null,
    active: true,
    placed: "Google Internship",
  },
  {
    name: "Amit Kumar Sinha",
    designation: "BBA Graduate, Batch 2025",
    review: "The best decision I ever made was choosing SV for my BBA. The case-study based learning, mock interviews, and group discussions prepared me thoroughly. The campus culture is vibrant and the faculty are always accessible. Truly a premium experience.",
    rating: 5,
    image: null,
    active: true,
    placed: "HDFC Bank",
  },
  {
    name: "Sneha Bharti",
    designation: "BCA Graduate, Batch 2024",
    review: "SV gave me confidence I never knew I had. From a shy student to a confident software developer — this journey wouldn't have been possible without the support system here. The industry-relevant curriculum and coding bootcamps were game-changers.",
    rating: 5,
    image: null,
    active: true,
    placed: "Infosys",
  },
  {
    name: "Vikash Ranjan",
    designation: "BCA Student, 2nd Year",
    review: "I love how SV balances academics with extracurriculars. The smart classrooms make learning engaging, and the regular tech seminars keep us updated with industry trends. The hostel facilities are comfortable and the campus feels like a second home.",
    rating: 4,
    image: null,
    active: true,
    placed: "",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Star Rating Selector ── */
function StarRating({ value, onChange, readonly = false }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          className={`transition-colors duration-150 ${readonly ? "cursor-default" : "cursor-pointer"}`}
          disabled={readonly}
        >
          <Star
            className={`w-4 h-4 ${
              star <= (hover || value) ? "text-amber-400 fill-amber-400" : "text-slate-200"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [confirmDeleteItem, setConfirmDeleteItem] = useState(null);
  const [confirmEditItem, setConfirmEditItem] = useState(null);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    review: "",
    rating: 5,
    image: null,
    active: true,
    placed: "",
  });
  const fileInputRef = useRef(null);

  /* ── Firebase Listener with Auto-Seed ── */
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "testimonials"), async (snapshot) => {
      const list = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      if (snapshot.docs.length === 0) {
        try {
          const seeded = [];
          for (const item of INITIAL_TESTIMONIALS) {
            const docRef = await addDoc(collection(db, "testimonials"), {
              ...item,
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            });
            seeded.push({ id: docRef.id, ...item });
          }
          setTestimonials(seeded);
        } catch (err) {
          console.error("Seeding testimonials error:", err);
          setTestimonials(INITIAL_TESTIMONIALS.map((t, i) => ({ ...t, id: i + 1 })));
        }
      } else {
        setTestimonials(list);
      }
    });
    return unsubscribe;
  }, []);

  /* ── Filtering ── */
  const filtered = testimonials.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.designation.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "All" ||
      (filterStatus === "Active" && t.active) ||
      (filterStatus === "Inactive" && !t.active);
    return matchSearch && matchStatus;
  });

  /* ── Modal Handlers ── */
  const openAdd = () => {
    setEditingTestimonial(null);
    setForm({ name: "", designation: "", review: "", rating: 5, image: null, active: true, placed: "" });
    setShowModal(true);
  };

  const openEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setForm({
      name: testimonial.name || "",
      designation: testimonial.designation || "",
      review: testimonial.review || "",
      rating: testimonial.rating || 5,
      image: testimonial.image || null,
      active: testimonial.active !== false,
      placed: testimonial.placed || "",
    });
    setShowModal(true);
  };

  /* ── Image Upload ── */
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ── Save (Add/Update) ── */
  const handleSave = async () => {
    if (!form.name.trim() || !form.review.trim()) return;
    try {
      const dataToSave = {
        name: form.name,
        designation: form.designation,
        review: form.review,
        rating: form.rating,
        image: form.image || null,
        active: form.active,
        placed: form.placed || "",
      };

      if (editingTestimonial) {
        const docRef = doc(db, "testimonials", editingTestimonial.id);
        await updateDoc(docRef, dataToSave);
      } else {
        await addDoc(collection(db, "testimonials"), {
          ...dataToSave,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        });
      }
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save testimonial:", err);
    }
  };

  /* ── Delete ── */
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "testimonials", id));
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
    }
  };

  /* ── Toggle Active/Inactive ── */
  const toggleActive = async (testimonial) => {
    try {
      const docRef = doc(db, "testimonials", testimonial.id);
      await updateDoc(docRef, { active: !testimonial.active });
    } catch (err) {
      console.error("Failed to toggle testimonial status:", err);
    }
  };

  /* ── Confirmation Handlers ── */
  const handleConfirmEdit = (testimonial) => {
    setConfirmEditItem(testimonial);
  };

  const executeEdit = () => {
    if (!confirmEditItem) return;
    openEdit(confirmEditItem);
    setConfirmEditItem(null);
  };

  const handleConfirmDelete = (testimonial) => {
    setConfirmDeleteItem(testimonial);
  };

  const executeDelete = async () => {
    if (!confirmDeleteItem) return;
    await handleDelete(confirmDeleteItem.id);
    setConfirmDeleteItem(null);
  };

  const activeCount = testimonials.filter((t) => t.active).length;

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">Testimonials</h2>
          <p className="text-[12px] text-slate-500 mt-0.5">
            {testimonials.length} total • {activeCount} active on website
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </motion.div>

      {/* Search + Filters */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or designation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 bg-white text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {["All", "Active", "Inactive"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 ${
                filterStatus === status
                  ? "bg-purple-700 text-white border-purple-600 shadow-sm"
                  : "bg-white text-slate-600 border-purple-100 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Table */}
      <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                <th className="px-5 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800">Name</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden md:table-cell">Designation</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden sm:table-cell">Rating</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden lg:table-cell">Review</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800">Status</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((testimonial, i) => (
                <tr key={testimonial.id} className={`border-b border-slate-100 hover:bg-purple-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {testimonial.image ? (
                        <img src={testimonial.image} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-purple-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-[11px]">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}
                      <p className="text-[12px] font-bold text-slate-800 truncate max-w-[150px]">{testimonial.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="text-[11px] font-medium text-slate-600">{testimonial.designation}</span>
                  </td>
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <StarRating value={testimonial.rating} onChange={() => {}} readonly />
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <p className="text-[11px] text-slate-500 font-medium truncate max-w-[250px]">{testimonial.review}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        testimonial.active
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {testimonial.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleActive(testimonial)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          testimonial.active
                            ? "hover:bg-amber-100 text-amber-600"
                            : "hover:bg-green-100 text-green-600"
                        }`}
                        title={testimonial.active ? "Set Inactive" : "Set Active"}
                      >
                        {testimonial.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleConfirmEdit(testimonial)}
                        className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors"
                        title="Edit Testimonial"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleConfirmDelete(testimonial)}
                        className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                        title="Delete Testimonial"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-[12px] text-slate-400">
                    No testimonials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-purple-100 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                  {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Student Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter student name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    placeholder="e.g., BCA Graduate, Batch 2025"
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                  />
                </div>

                {/* Review */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Review *</label>
                  <textarea
                    rows={4}
                    value={form.review}
                    onChange={(e) => setForm({ ...form, review: e.target.value })}
                    placeholder="Write the student's testimonial review..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all resize-y min-h-[100px]"
                  />
                </div>

                {/* Rating + Active toggle */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Rating</label>
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-purple-100 bg-white">
                      <StarRating value={form.rating} onChange={(val) => setForm({ ...form, rating: val })} />
                      <span className="text-[11px] font-bold text-slate-500 ml-1">{form.rating}/5</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Status</label>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, active: !form.active })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-[13px] font-bold transition-all flex items-center justify-center gap-2 ${
                        form.active
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "bg-slate-50 border-slate-200 text-slate-500"
                      }`}
                    >
                      {form.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      {form.active ? "Active" : "Inactive"}
                    </button>
                  </div>
                </div>

                {/* Placed At */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Placed At (Optional)</label>
                  <input
                    type="text"
                    value={form.placed}
                    onChange={(e) => setForm({ ...form, placed: e.target.value })}
                    placeholder="e.g., TCS Digital, Infosys, Google..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                  />
                </div>

                {/* Student Image Upload */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Student Image</label>
                  {form.image ? (
                    <div className="relative rounded-xl overflow-hidden border border-purple-100 group">
                      <img src={form.image} alt="Student preview" className="w-full h-36 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 rounded-lg bg-white/90 text-[11px] font-bold text-slate-700 hover:bg-white transition-colors">Change</button>
                        <button type="button" onClick={removeImage} className="px-3 py-1.5 rounded-lg bg-red-500/90 text-[11px] font-bold text-white hover:bg-red-600 transition-colors">Remove</button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-purple-200 bg-purple-50/30 hover:bg-purple-50 hover:border-purple-300 rounded-xl p-5 text-center cursor-pointer transition-all duration-200"
                    >
                      <Upload className="w-6 h-6 text-purple-400 mx-auto mb-1.5" />
                      <p className="text-[11px] font-bold text-slate-600">Click to upload student photo</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WebP (Max 5MB)</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
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
                  onClick={handleSave}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-md shadow-purple-500/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  {editingTestimonial ? "Update Testimonial" : "Save Testimonial"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Delete Confirmation Modal ─── */}
      <AnimatePresence>
        {confirmDeleteItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
            onClick={() => setConfirmDeleteItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-red-100 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-200 shadow-inner">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 font-heading">Delete Testimonial</h3>
              <p className="text-[13px] text-slate-600 mt-2 font-medium leading-relaxed">
                Are you sure you want to delete the testimonial by <span className="font-bold text-slate-900">"{confirmDeleteItem.name}"</span>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setConfirmDeleteItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-[12px] font-bold shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Edit Confirmation Modal ─── */}
      <AnimatePresence>
        {confirmEditItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
            onClick={() => setConfirmEditItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-purple-100 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4 border border-purple-200 shadow-inner">
                <HelpCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 font-heading">Edit Testimonial</h3>
              <p className="text-[13px] text-slate-600 mt-2 font-medium leading-relaxed">
                Are you sure you want to edit the testimonial by <span className="font-bold text-slate-900">"{confirmEditItem.name}"</span>?
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setConfirmEditItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeEdit}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Confirm & Edit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
