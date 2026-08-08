import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Search,
  Plus,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  AlertCircle,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  FileText,
} from "lucide-react";
import { getEnrollments, addEnrollment, updateEnrollment } from "../../../../hooks/superAdminData";
import { addStudent, getStudents, initERP } from "../../../../hooks/erpData";

export default function EnrollmentPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [actionType, setActionType] = useState("");
  const [actionRemarks, setActionRemarks] = useState("");
  const [formData, setFormData] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    initERP();
    refresh();
  }, []);

  const refresh = () => setEnrollments(getEnrollments());

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((e) => {
      const matchSearch =
        !searchQuery ||
        e.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || e.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [enrollments, searchQuery, statusFilter]);

  const counts = useMemo(() => ({
    all: enrollments.length,
    pending: enrollments.filter((e) => e.status === "Pending").length,
    approved: enrollments.filter((e) => e.status === "Approved").length,
    rejected: enrollments.filter((e) => e.status === "Rejected").length,
  }), [enrollments]);

  const handleAddNew = () => {
    setFormData({
      applicantName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "Male",
      courseApplied: "BCA",
      guardianName: "",
      guardianPhone: "",
      address: "",
      twelfthPercentage: "",
      twelfthBoard: "BSEB",
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      remarks: "",
      session: "2025-2026",
    });
    setShowAddModal(true);
  };

  const handleSaveNew = () => {
    if (!formData.applicantName || !formData.email) return;
    addEnrollment(formData);
    refresh();
    setShowAddModal(false);
    showSuccess("Enrollment application added!");
  };

  const handleAction = (enrollment, type) => {
    setSelectedEnrollment(enrollment);
    setActionType(type);
    setActionRemarks("");
    setShowActionModal(true);
  };

  const confirmAction = () => {
    const newStatus = actionType === "approve" ? "Approved" : "Rejected";
    updateEnrollment(selectedEnrollment.id, {
      status: newStatus,
      remarks: actionRemarks || (actionType === "approve" ? "Application approved by admin." : "Application rejected by admin."),
    });

    // If approved, create a student record
    if (actionType === "approve") {
      const existingStudents = getStudents();
      const coursePrefix = selectedEnrollment.courseApplied === "BCA" ? "BCA" : "BBA";
      const courseStudents = existingStudents.filter((s) => s.course === coursePrefix);
      const newRoll = `SV2025${coursePrefix}${String(courseStudents.length + 1).padStart(3, "0")}`;

      addStudent({
        rollNumber: newRoll,
        name: selectedEnrollment.applicantName,
        email: selectedEnrollment.email,
        phone: selectedEnrollment.phone,
        dob: selectedEnrollment.dob,
        gender: selectedEnrollment.gender,
        course: selectedEnrollment.courseApplied,
        department: selectedEnrollment.courseApplied === "BCA" ? "Computer Applications" : "Business Administration",
        year: "1st Year",
        semester: "1st",
        address: selectedEnrollment.address,
        guardianName: selectedEnrollment.guardianName,
        guardianPhone: selectedEnrollment.guardianPhone,
        admissionDate: new Date().toISOString().split("T")[0],
        status: "Active",
        totalFees: selectedEnrollment.courseApplied === "BCA" ? 45000 : 40000,
        paidFees: 0,
        photo: "",
      });
    }

    refresh();
    setShowActionModal(false);
    showSuccess(`Application ${newStatus.toLowerCase()} successfully!${actionType === "approve" ? " Student record created." : ""}`);
  };

  const statusConfig = {
    Pending: { icon: Clock, color: "text-amber-600", bg: "bg-amber-100 border-amber-200" },
    Approved: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100 border-emerald-200" },
    Rejected: { icon: XCircle, color: "text-red-600", bg: "bg-red-100 border-red-200" },
  };

  const tabFilters = [
    { label: "All", value: "All", count: counts.all },
    { label: "Pending", value: "Pending", count: counts.pending },
    { label: "Approved", value: "Approved", count: counts.approved },
    { label: "Rejected", value: "Rejected", count: counts.rejected },
  ];

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
            <UserPlus className="w-5 h-5 text-red-600" />
            Enrollment Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Review and manage new admission applications</p>
        </div>
        <button onClick={handleAddNew} className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm transition-all">
          <Plus className="w-3.5 h-3.5" /> Add Application
        </button>
      </motion.div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5 w-fit flex-wrap">
        {tabFilters.map((tab) => (
          <button key={tab.value} onClick={() => setStatusFilter(tab.value)} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${statusFilter === tab.value ? "bg-white text-red-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${statusFilter === tab.value ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-500"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by applicant name or email..." className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
        </div>
      </motion.div>

      {/* Enrollment Cards */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-2">
        {filteredEnrollments.map((enrollment) => {
          const config = statusConfig[enrollment.status];
          const StatusIcon = config.icon;
          return (
            <div key={enrollment.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                    {enrollment.applicantName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-800">{enrollment.applicantName}</p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-0.5"><Mail className="w-3 h-3" /> {enrollment.email}</span>
                      <span className="flex items-center gap-0.5"><Phone className="w-3 h-3" /> {enrollment.phone}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${enrollment.courseApplied === "BCA" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                        {enrollment.courseApplied}
                      </span>
                      <span className="text-[10px] text-gray-400">12th: {enrollment.twelfthPercentage} ({enrollment.twelfthBoard})</span>
                      <span className="text-[10px] text-gray-400">Applied: {enrollment.appliedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${config.bg} ${config.color}`}>
                    <StatusIcon className="w-3 h-3" /> {enrollment.status}
                  </span>
                  <button onClick={() => { setSelectedEnrollment(enrollment); setShowViewModal(true); }} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                    <Eye className="w-4 h-4" />
                  </button>
                  {enrollment.status === "Pending" && (
                    <>
                      <button onClick={() => handleAction(enrollment, "approve")} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 transition-all">
                        <CheckCircle2 className="w-3 h-3" /> Approve
                      </button>
                      <button onClick={() => handleAction(enrollment, "reject")} className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1 transition-all">
                        <XCircle className="w-3 h-3" /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
              {enrollment.remarks && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-[10px] text-gray-500"><strong>Remarks:</strong> {enrollment.remarks}</p>
                </div>
              )}
            </div>
          );
        })}
        {filteredEnrollments.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 shadow-sm text-center">
            <p className="text-xs text-gray-400">No enrollment applications found.</p>
          </div>
        )}
      </motion.div>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedEnrollment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between z-10">
                <h3 className="text-sm font-bold text-gray-800">Applicant Details</h3>
                <button onClick={() => setShowViewModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-100">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-lg font-bold shadow-md">
                    {selectedEnrollment.applicantName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-gray-800">{selectedEnrollment.applicantName}</h4>
                    <p className="text-xs text-gray-500">Applied for {selectedEnrollment.courseApplied} • {selectedEnrollment.session}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { icon: Mail, label: "Email", value: selectedEnrollment.email },
                    { icon: Phone, label: "Phone", value: selectedEnrollment.phone },
                    { icon: Calendar, label: "DOB", value: selectedEnrollment.dob },
                    { icon: User, label: "Gender", value: selectedEnrollment.gender },
                    { icon: MapPin, label: "Address", value: selectedEnrollment.address },
                    { icon: User, label: "Guardian", value: selectedEnrollment.guardianName },
                    { icon: Phone, label: "Guardian Phone", value: selectedEnrollment.guardianPhone },
                    { icon: GraduationCap, label: "12th %", value: selectedEnrollment.twelfthPercentage },
                    { icon: FileText, label: "Board", value: selectedEnrollment.twelfthBoard },
                    { icon: Calendar, label: "Applied Date", value: selectedEnrollment.appliedDate },
                  ].map((item) => (
                    <div key={item.label} className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                      <p className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1">
                        <item.icon className="w-3 h-3" /> {item.label}
                      </p>
                      <p className="text-xs font-bold text-gray-800 mt-0.5">{item.value || "—"}</p>
                    </div>
                  ))}
                </div>
                {selectedEnrollment.remarks && (
                  <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">Admin Remarks</p>
                    <p className="text-xs text-amber-800">{selectedEnrollment.remarks}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Action Modal (Approve / Reject) */}
      <AnimatePresence>
        {showActionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-2xl p-5">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${actionType === "approve" ? "bg-emerald-100" : "bg-red-100"}`}>
                {actionType === "approve" ? <CheckCircle2 className="w-6 h-6 text-emerald-600" /> : <XCircle className="w-6 h-6 text-red-600" />}
              </div>
              <h3 className="text-sm font-bold text-gray-800 text-center mb-1">
                {actionType === "approve" ? "Approve Application?" : "Reject Application?"}
              </h3>
              <p className="text-xs text-gray-500 text-center mb-3">
                {actionType === "approve"
                  ? `This will approve ${selectedEnrollment?.applicantName}'s application and create a student record.`
                  : `This will reject ${selectedEnrollment?.applicantName}'s application.`}
              </p>
              <div className="mb-4">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Remarks (optional)</label>
                <textarea value={actionRemarks} onChange={(e) => setActionRemarks(e.target.value)} rows={2} placeholder="Add remarks..." className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-none" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setShowActionModal(false)} className="px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                <button onClick={confirmAction} className={`px-4 py-2 rounded-lg text-xs font-bold text-white ${actionType === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"}`}>
                  {actionType === "approve" ? "Approve" : "Reject"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Application Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between z-10">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-red-600" /> Add Enrollment Application
                </h3>
                <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Applicant Name", key: "applicantName", type: "text" },
                  { label: "Email", key: "email", type: "email" },
                  { label: "Phone", key: "phone", type: "text" },
                  { label: "Date of Birth", key: "dob", type: "date" },
                  { label: "Gender", key: "gender", options: ["Male", "Female", "Other"] },
                  { label: "Course Applied", key: "courseApplied", options: ["BCA", "BBA"] },
                  { label: "Guardian Name", key: "guardianName", type: "text" },
                  { label: "Guardian Phone", key: "guardianPhone", type: "text" },
                  { label: "Address", key: "address", type: "text" },
                  { label: "12th Percentage", key: "twelfthPercentage", type: "text" },
                  { label: "12th Board", key: "twelfthBoard", options: ["BSEB", "CBSE", "ICSE", "Others"] },
                  { label: "Session", key: "session", type: "text" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{field.label}</label>
                    {field.options ? (
                      <select value={formData[field.key] || ""} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20">
                        {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={field.type} value={formData[field.key] || ""} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                    )}
                  </div>
                ))}
              </div>
              <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-end gap-2">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                <button onClick={handleSaveNew} className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm">
                  <Save className="w-3.5 h-3.5" /> Submit Application
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
