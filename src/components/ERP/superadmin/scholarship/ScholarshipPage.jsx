import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Search,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Calendar,
  User,
  GraduationCap,
  Save,
  Trash2,
  Edit3,
  Filter,
} from "lucide-react";
import {
  getScholarships,
  addScholarship,
  updateScholarship,
  deleteScholarship,
} from "../../../../hooks/superAdminData";
import { getStudents, initERP } from "../../../../hooks/erpData";

export default function ScholarshipPage() {
  const [scholarships, setScholarships] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showGrantModal, setShowGrantModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    rollNumber: "",
    course: "",
    scholarshipName: "",
    type: "Merit",
    amount: "",
    session: "2024-2025",
    status: "Active",
    approvedBy: "Dr. Rajendra Prasad",
    remarks: "",
  });

  useEffect(() => {
    initERP();
    refreshData();
  }, []);

  const refreshData = () => {
    setScholarships(getScholarships());
    setStudents(getStudents());
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((s) => {
      const matchSearch =
        !searchQuery ||
        s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.scholarshipName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = typeFilter === "All" || s.type === typeFilter;
      const matchStatus = statusFilter === "All" || s.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [scholarships, searchQuery, typeFilter, statusFilter]);

  const stats = useMemo(() => {
    const active = scholarships.filter((s) => s.status === "Active");
    const totalAmount = active.reduce((sum, s) => sum + (s.amount || 0), 0);
    return {
      total: scholarships.length,
      active: active.length,
      pending: scholarships.filter((s) => s.status === "Pending").length,
      totalAmount,
    };
  }, [scholarships]);

  const handleStudentSelect = (studentId) => {
    const st = students.find((s) => s.id === studentId);
    if (st) {
      setFormData((prev) => ({
        ...prev,
        studentId: st.id,
        studentName: st.name,
        rollNumber: st.rollNumber,
        course: st.course,
      }));
    }
  };

  const handleGrantSave = () => {
    if (!formData.studentId || !formData.scholarshipName || !formData.amount) return;
    addScholarship({
      ...formData,
      amount: parseInt(formData.amount) || 0,
      approvedDate: new Date().toISOString().split("T")[0],
    });
    refreshData();
    setShowGrantModal(false);
    showSuccess("Scholarship granted successfully!");
  };

  const handleEdit = (sch) => {
    setSelectedScholarship(sch);
    setFormData({ ...sch });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!formData.scholarshipName || !formData.amount) return;
    updateScholarship(selectedScholarship.id, {
      ...formData,
      amount: parseInt(formData.amount) || 0,
    });
    refreshData();
    setShowEditModal(false);
    showSuccess("Scholarship record updated!");
  };

  const handleDelete = () => {
    deleteScholarship(selectedScholarship.id);
    refreshData();
    setShowDeleteConfirm(false);
    setSelectedScholarship(null);
    showSuccess("Scholarship deleted successfully!");
  };

  const statusColor = {
    Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Expired: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <div className="space-y-4">
      {/* Success Toast */}
      <AnimatePresence>
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-4 right-4 z-[100] px-4 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-gray-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-red-600" />
            Scholarship Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Grant, approve, and track student financial assistance</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              studentId: "",
              studentName: "",
              rollNumber: "",
              course: "",
              scholarshipName: "",
              type: "Merit",
              amount: "",
              session: "2024-2025",
              status: "Active",
              approvedBy: "Dr. Rajendra Prasad",
              remarks: "",
            });
            setShowGrantModal(true);
          }}
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Grant Scholarship
        </button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-lg font-extrabold text-gray-800">{stats.total}</p>
          <p className="text-[9px] font-bold text-gray-400 uppercase">Total Grants</p>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-lg font-extrabold text-emerald-700">{stats.active}</p>
          <p className="text-[9px] font-bold text-emerald-500 uppercase">Active Grants</p>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-lg font-extrabold text-amber-600">{stats.pending}</p>
          <p className="text-[9px] font-bold text-amber-500 uppercase">Pending Review</p>
        </div>
        <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-lg font-extrabold text-purple-700">₹{stats.totalAmount.toLocaleString("en-IN")}</p>
          <p className="text-[9px] font-bold text-purple-500 uppercase">Total Disbursed</p>
        </div>
      </div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by student, roll number, or scheme..." className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20">
          <option value="All">All Types</option>
          <option value="Merit">Merit-Based</option>
          <option value="Need-Based">Need-Based</option>
          <option value="Government">Government Scheme</option>
          <option value="Sports">Sports</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20">
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Expired">Expired</option>
        </select>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Student</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Scholarship Name</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Type</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Approved By</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-3 py-2.5 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredScholarships.map((sch) => (
                <tr key={sch.id} className="border-b border-gray-50 hover:bg-red-50/30 transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {sch.studentName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{sch.studentName}</p>
                        <p className="text-[10px] text-gray-400">{sch.rollNumber} • {sch.course}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <p className="text-xs font-semibold text-gray-700">{sch.scholarshipName}</p>
                    <p className="text-[9px] text-gray-400">Session: {sch.session}</p>
                  </td>
                  <td className="px-3 py-2.5 hidden sm:table-cell">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">{sch.type}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="text-xs font-extrabold text-emerald-700">₹{(sch.amount || 0).toLocaleString("en-IN")}</span>
                  </td>
                  <td className="px-3 py-2.5 hidden md:table-cell text-xs text-gray-600">{sch.approvedBy || "—"}</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColor[sch.status] || "bg-gray-100 text-gray-600"}`}>
                      {sch.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => handleEdit(sch)} className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors" title="Edit">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => { setSelectedScholarship(sch); setShowDeleteConfirm(true); }} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredScholarships.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-xs text-gray-400">No scholarships found matching your criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Grant Scholarship Modal */}
      <AnimatePresence>
        {showGrantModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-2xl">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <Award className="w-4 h-4 text-red-600" /> Grant New Scholarship
                </h3>
                <button onClick={() => setShowGrantModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Select Student</label>
                  <select value={formData.studentId} onChange={(e) => handleStudentSelect(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20">
                    <option value="">— Select Student —</option>
                    {students.map((st) => (
                      <option key={st.id} value={st.id}>{st.name} ({st.rollNumber} - {st.course})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Scholarship / Scheme Name</label>
                  <input type="text" value={formData.scholarshipName} onChange={(e) => setFormData({ ...formData, scholarshipName: e.target.value })} placeholder="e.g. Merit-Based Excellence Scholarship" className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Type</label>
                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20">
                      <option value="Merit">Merit</option>
                      <option value="Need-Based">Need-Based</option>
                      <option value="Government">Government</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Amount (₹)</label>
                    <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="15000" className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Session</label>
                    <input type="text" value={formData.session} onChange={(e) => setFormData({ ...formData, session: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20">
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Approved By</label>
                  <input type="text" value={formData.approvedBy} onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Remarks</label>
                  <input type="text" value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} placeholder="Reason for scholarship..." className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                </div>
              </div>
              <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-end gap-2">
                <button onClick={() => setShowGrantModal(false)} className="px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                <button onClick={handleGrantSave} className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm">
                  <Save className="w-3.5 h-3.5" /> Grant Scholarship
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Scholarship Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-2xl">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-red-600" /> Edit Scholarship Grant
                </h3>
                <button onClick={() => setShowEditModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Scholarship Name</label>
                  <input type="text" value={formData.scholarshipName} onChange={(e) => setFormData({ ...formData, scholarshipName: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Type</label>
                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20">
                      <option value="Merit">Merit</option>
                      <option value="Need-Based">Need-Based</option>
                      <option value="Government">Government</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Amount (₹)</label>
                    <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Session</label>
                    <input type="text" value={formData.session} onChange={(e) => setFormData({ ...formData, session: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20">
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Approved By</label>
                  <input type="text" value={formData.approvedBy} onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Remarks</label>
                  <input type="text" value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                </div>
              </div>
              <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-end gap-2">
                <button onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                <button onClick={handleSaveEdit} className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm">
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-2xl p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Delete Scholarship?</h3>
              <p className="text-xs text-gray-500 mb-4">Are you sure you want to revoke/delete this scholarship for <strong>{selectedScholarship?.studentName}</strong>?</p>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                <button onClick={handleDelete} className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
