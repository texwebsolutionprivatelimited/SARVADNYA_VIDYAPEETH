import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Briefcase,
  TrendingUp,
  Users,
  IndianRupee,
  Building2,
  Upload,
  ImagePlus,
} from "lucide-react";
import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "../../firebase";

const INITIAL_PLACEMENTS = [
  { id: 1, student: "Ananya Verma", course: "BCA", company: "TCS", role: "Software Developer", package: "6.5 LPA", year: "2026", status: "Placed", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { id: 2, student: "Rohit Kumar", course: "BBA", company: "HDFC Bank", role: "Management Trainee", package: "5.2 LPA", year: "2026", status: "Placed", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 3, student: "Sneha Patel", course: "BCA", company: "Infosys", role: "Systems Engineer", package: "4.8 LPA", year: "2026", status: "Placed", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 4, student: "Arjun Singh", course: "BCA", company: "Wipro", role: "Project Engineer", package: "5.5 LPA", year: "2026", status: "Placed", photo: null },
  { id: 5, student: "Pooja Gupta", course: "BBA", company: "Deloitte", role: "Analyst", package: "7.2 LPA", year: "2026", status: "Placed", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: 6, student: "Aditya Jha", course: "BCA", company: "Cognizant", role: "Programmer Analyst", package: "4.5 LPA", year: "2025", status: "Placed", photo: null },
  { id: 7, student: "Meera Sharma", course: "BBA", company: "ICICI Bank", role: "Probationary Officer", package: "5.0 LPA", year: "2025", status: "Placed", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
  { id: 8, student: "Karan Mishra", course: "BCA", company: "HCL Tech", role: "Software Engineer", package: "12 LPA", year: "2026", status: "Placed", photo: null },
];

const COMPANIES = ["TCS", "Infosys", "Wipro", "HCL Tech", "Cognizant", "Deloitte", "HDFC Bank", "ICICI Bank", "Tech Mahindra", "Accenture"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function PlacementManager() {
  const [placements, setPlacements] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPlacement, setEditingPlacement] = useState(null);
  const [form, setForm] = useState({ student: "", course: "BCA", company: "", role: "", package: "", year: "2026", status: "Placed", photo: null });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "placements"));
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        if (list.length === 0) {
          const seeded = [];
          for (const item of INITIAL_PLACEMENTS) {
            const docRef = await addDoc(collection(db, "placements"), {
              student: item.student,
              course: item.course,
              company: item.company,
              role: item.role,
              package: item.package,
              year: item.year,
              status: item.status,
              photo: item.photo || null,
            });
            seeded.push({ id: docRef.id, ...item });
          }
          setPlacements(seeded);
        } else {
          setPlacements(list);
        }
      } catch (err) {
        console.error("Firestore error:", err);
      }
    };
    fetchPlacements();
  }, []);

  const filtered = placements.filter((p) =>
    p.student.toLowerCase().includes(search.toLowerCase()) ||
    p.company.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingPlacement(null);
    setForm({ student: "", course: "BCA", company: "", role: "", package: "", year: "2026", status: "Placed", photo: null });
    setShowModal(true);
  };

  const openEdit = (placement) => {
    setEditingPlacement(placement);
    setForm({ student: placement.student, course: placement.course, company: placement.company, role: placement.role, package: placement.package, year: placement.year, status: placement.status, photo: placement.photo || null });
    setShowModal(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((prev) => ({ ...prev, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setForm((prev) => ({ ...prev, photo: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!form.student.trim() || !form.company.trim()) return;
    try {
      if (editingPlacement) {
        const docRef = doc(db, "placements", editingPlacement.id);
        await updateDoc(docRef, form);
        setPlacements((prev) => prev.map((p) => (p.id === editingPlacement.id ? { ...p, ...form } : p)));
      } else {
        const docRef = await addDoc(collection(db, "placements"), form);
        setPlacements((prev) => [{ id: docRef.id, ...form }, ...prev]);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save placement:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "placements", id));
      setPlacements((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete placement:", err);
    }
  };

  // Stats
  const totalPlaced = placements.length;
  const uniqueCompanies = new Set(placements.map((p) => p.company)).size;
  const packages = placements.map((p) => parseFloat(p.package));
  const avgPackage = (packages.reduce((a, b) => a + b, 0) / packages.length).toFixed(1);
  const highestPackage = Math.max(...packages);

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">Placement Manager</h2>
          <p className="text-[12px] text-slate-500 mt-0.5">{totalPlaced} students placed at {uniqueCompanies} companies</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Placement
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Placed", value: totalPlaced, icon: Users, gradient: "from-purple-600 to-purple-800" },
          { label: "Avg. Package", value: `₹${avgPackage} LPA`, icon: IndianRupee, gradient: "from-green-500 to-emerald-600" },
          { label: "Highest Package", value: `₹${highestPackage} LPA`, icon: TrendingUp, gradient: "from-amber-500 to-orange-600" },
          { label: "Recruiting Companies", value: uniqueCompanies, icon: Building2, gradient: "from-blue-500 to-indigo-600" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`rounded-xl bg-gradient-to-br ${s.gradient} p-4 text-white relative overflow-hidden`}>
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-white/10" />
              <Icon className="w-5 h-5 text-white/60 mb-2" />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">{s.label}</p>
              <p className="text-xl font-black mt-0.5">{s.value}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Search */}
      <motion.div variants={fadeUp}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 bg-white text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
          />
        </div>
      </motion.div>

      {/* Placement Table */}
      <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                <th className="px-5 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800">Student</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden sm:table-cell">Course</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800">Company</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden md:table-cell">Role</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800">Package</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden lg:table-cell">Year</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className={`border-b border-slate-100 hover:bg-purple-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      {p.photo ? (
                        <img src={p.photo} alt={p.student} className="w-8 h-8 rounded-full object-cover border-2 border-purple-100 flex-shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                          {p.student.charAt(0)}
                        </div>
                      )}
                      <p className="text-[12px] font-bold text-slate-800">{p.student}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.course === "BCA" ? "bg-purple-50 text-purple-700" : "bg-amber-50 text-amber-700"}`}>
                      {p.course}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center">
                        <Building2 className="w-3 h-3 text-slate-500" />
                      </div>
                      <span className="text-[12px] font-semibold text-slate-700">{p.company}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500 font-medium hidden md:table-cell">{p.role}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-[12px] font-extrabold text-green-600">₹{p.package}</span>
                  </td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500 font-medium hidden lg:table-cell">{p.year}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-500 transition-colors" title="Edit">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-[12px] text-slate-400">No placement records found.</td></tr>
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
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">{editingPlacement ? "Edit Placement" : "Add Placement"}</h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                {/* Student Photo Upload */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Student Photo</label>
                  <div className="flex items-center gap-4">
                    {form.photo ? (
                      <div className="relative group">
                        <img src={form.photo} alt="Student" className="w-16 h-16 rounded-xl object-cover border-2 border-purple-200 shadow-sm" />
                        <button type="button" onClick={removePhoto} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-16 h-16 rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/30 hover:bg-purple-50 hover:border-purple-300 flex flex-col items-center justify-center cursor-pointer transition-all duration-200"
                      >
                        <ImagePlus className="w-5 h-5 text-purple-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[11px] font-bold text-purple-600 hover:text-purple-800 transition-colors">
                        {form.photo ? "Change Photo" : "Upload Photo"}
                      </button>
                      <p className="text-[10px] text-slate-400 mt-0.5">JPG, PNG (Max 2MB)</p>
                    </div>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Student Name</label>
                  <input type="text" value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} placeholder="Enter student name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Course</label>
                    <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all appearance-none">
                      <option value="BCA">BCA</option>
                      <option value="BBA">BBA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Year</label>
                    <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all appearance-none">
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Company</label>
                  <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Role</label>
                  <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Job role..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Package</label>
                  <input type="text" value={form.package} onChange={(e) => setForm({ ...form, package: e.target.value })} placeholder="e.g. 5.5 LPA"
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-purple-200 text-[12px] font-bold text-slate-600 hover:bg-purple-50 transition-colors">Cancel</button>
                <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-md shadow-purple-500/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                  {editingPlacement ? "Update" : "Add Placement"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
