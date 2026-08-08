import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  X,
  Filter,
  Download,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  User,
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  Calendar,
  Save,
} from "lucide-react";
import { getStudents, addStudent, updateStudent, deleteStudent, initERP } from "../../../../hooks/erpData";

export default function StudentDirectoryPage() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    initERP();
    refreshStudents();
  }, []);

  const refreshStudents = () => setStudents(getStudents());

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        !searchQuery ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCourse = courseFilter === "All" || s.course === courseFilter;
      const matchStatus = statusFilter === "All" || s.status === statusFilter;
      return matchSearch && matchCourse && matchStatus;
    });
  }, [students, searchQuery, courseFilter, statusFilter]);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleAdd = () => {
    setFormData({
      rollNumber: "",
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "Male",
      course: "BCA",
      department: "Computer Applications",
      year: "1st Year",
      semester: "1st",
      address: "",
      guardianName: "",
      guardianPhone: "",
      admissionDate: new Date().toISOString().split("T")[0],
      status: "Active",
      totalFees: 45000,
      paidFees: 0,
      photo: "",
    });
    setShowAddModal(true);
  };

  const handleSaveNew = () => {
    if (!formData.name || !formData.rollNumber) return;
    const dept = formData.course === "BCA" ? "Computer Applications" : "Business Administration";
    addStudent({ ...formData, department: dept });
    refreshStudents();
    setShowAddModal(false);
    showSuccess("Student added successfully!");
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({ ...student });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!formData.name) return;
    const dept = formData.course === "BCA" ? "Computer Applications" : "Business Administration";
    updateStudent(selectedStudent.id, { ...formData, department: dept });
    refreshStudents();
    setShowEditModal(false);
    showSuccess("Student updated successfully!");
  };

  const handleDelete = () => {
    deleteStudent(selectedStudent.id);
    refreshStudents();
    setShowDeleteConfirm(false);
    setSelectedStudent(null);
    showSuccess("Student deleted successfully!");
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const feeStatus = (s) => {
    if (s.paidFees >= s.totalFees) return { label: "Paid", color: "bg-emerald-100 text-emerald-700 border-emerald-200" };
    if (s.paidFees > 0) return { label: "Partial", color: "bg-amber-100 text-amber-700 border-amber-200" };
    return { label: "Unpaid", color: "bg-red-100 text-red-700 border-red-200" };
  };

  const FormField = ({ label, value, onChange, type = "text", options, disabled }) => (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
      {options ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500">
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
      )}
    </div>
  );

  const StudentForm = ({ onSave, title }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between z-10">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-red-600" />
            {title}
          </h3>
          <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Roll Number" value={formData.rollNumber || ""} onChange={(v) => setFormData({ ...formData, rollNumber: v })} />
          <FormField label="Full Name" value={formData.name || ""} onChange={(v) => setFormData({ ...formData, name: v })} />
          <FormField label="Email" value={formData.email || ""} onChange={(v) => setFormData({ ...formData, email: v })} type="email" />
          <FormField label="Phone" value={formData.phone || ""} onChange={(v) => setFormData({ ...formData, phone: v })} />
          <FormField label="Date of Birth" value={formData.dob || ""} onChange={(v) => setFormData({ ...formData, dob: v })} type="date" />
          <FormField label="Gender" value={formData.gender || "Male"} onChange={(v) => setFormData({ ...formData, gender: v })} options={["Male", "Female", "Other"]} />
          <FormField label="Course" value={formData.course || "BCA"} onChange={(v) => setFormData({ ...formData, course: v })} options={["BCA", "BBA"]} />
          <FormField label="Year" value={formData.year || "1st Year"} onChange={(v) => setFormData({ ...formData, year: v })} options={["1st Year", "2nd Year", "3rd Year"]} />
          <FormField label="Semester" value={formData.semester || "1st"} onChange={(v) => setFormData({ ...formData, semester: v })} options={["1st", "2nd", "3rd", "4th", "5th", "6th"]} />
          <FormField label="Address" value={formData.address || ""} onChange={(v) => setFormData({ ...formData, address: v })} />
          <FormField label="Guardian Name" value={formData.guardianName || ""} onChange={(v) => setFormData({ ...formData, guardianName: v })} />
          <FormField label="Guardian Phone" value={formData.guardianPhone || ""} onChange={(v) => setFormData({ ...formData, guardianPhone: v })} />
          <FormField label="Admission Date" value={formData.admissionDate || ""} onChange={(v) => setFormData({ ...formData, admissionDate: v })} type="date" />
          <FormField label="Status" value={formData.status || "Active"} onChange={(v) => setFormData({ ...formData, status: v })} options={["Active", "Inactive"]} />
          <FormField label="Total Fees (₹)" value={formData.totalFees || ""} onChange={(v) => setFormData({ ...formData, totalFees: parseInt(v) || 0 })} type="number" />
          <FormField label="Paid Fees (₹)" value={formData.paidFees || ""} onChange={(v) => setFormData({ ...formData, paidFees: parseInt(v) || 0 })} type="number" />
        </div>
        <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-end gap-2">
          <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
          <button onClick={onSave} className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Success Toast */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-[100] px-4 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-red-600" />
            Student Directory
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">{filteredStudents.length} of {students.length} students shown</p>
        </div>
        <button onClick={handleAdd} className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm transition-all">
          <Plus className="w-3.5 h-3.5" /> Add Student
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, roll number, email..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20">
            <option value="All">All Courses</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </motion.div>

      {/* Student Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Student</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Roll No</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Course</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Year</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Fee Status</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-3 py-2.5 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, i) => {
                const fee = feeStatus(student);
                return (
                  <tr key={student.id} className="border-b border-gray-50 hover:bg-red-50/30 transition-colors">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                          {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate">{student.name}</p>
                          <p className="text-[10px] text-gray-400 truncate sm:hidden">{student.rollNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 hidden sm:table-cell">
                      <span className="text-xs font-semibold text-gray-600">{student.rollNumber}</span>
                    </td>
                    <td className="px-3 py-2.5 hidden md:table-cell">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${student.course === "BCA" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                        {student.course}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 hidden lg:table-cell">
                      <span className="text-xs text-gray-600">{student.year}</span>
                    </td>
                    <td className="px-3 py-2.5 hidden md:table-cell">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${fee.color}`}>
                        {fee.label}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${student.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => handleView(student)} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleEdit(student)} className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors" title="Edit">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => { setSelectedStudent(student); setShowDeleteConfirm(true); }} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-xs text-gray-400">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Student Modal */}
      <AnimatePresence>
        {showAddModal && <StudentForm title="Add New Student" onSave={handleSaveNew} />}
      </AnimatePresence>

      {/* Edit Student Modal */}
      <AnimatePresence>
        {showEditModal && <StudentForm title={`Edit Student — ${selectedStudent?.name}`} onSave={handleSaveEdit} />}
      </AnimatePresence>

      {/* View Student Modal */}
      <AnimatePresence>
        {showViewModal && selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between z-10">
                <h3 className="text-sm font-bold text-gray-800">Student Profile</h3>
                <button onClick={() => setShowViewModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-100">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                    {selectedStudent.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-gray-800">{selectedStudent.name}</h4>
                    <p className="text-xs text-gray-500">{selectedStudent.rollNumber} • {selectedStudent.course} ({selectedStudent.department})</p>
                    <p className="text-xs text-gray-400">{selectedStudent.year} • Semester {selectedStudent.semester}</p>
                  </div>
                </div>
                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { icon: Mail, label: "Email", value: selectedStudent.email },
                    { icon: Phone, label: "Phone", value: selectedStudent.phone },
                    { icon: Calendar, label: "DOB", value: selectedStudent.dob },
                    { icon: User, label: "Gender", value: selectedStudent.gender },
                    { icon: MapPin, label: "Address", value: selectedStudent.address },
                    { icon: User, label: "Guardian", value: selectedStudent.guardianName },
                    { icon: Phone, label: "Guardian Phone", value: selectedStudent.guardianPhone },
                    { icon: Calendar, label: "Admission Date", value: selectedStudent.admissionDate },
                    { icon: IndianRupee, label: "Total Fees", value: `₹${(selectedStudent.totalFees || 0).toLocaleString("en-IN")}` },
                    { icon: IndianRupee, label: "Paid Fees", value: `₹${(selectedStudent.paidFees || 0).toLocaleString("en-IN")}` },
                  ].map((item) => (
                    <div key={item.label} className="p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                      <p className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1">
                        <item.icon className="w-3 h-3" /> {item.label}
                      </p>
                      <p className="text-xs font-bold text-gray-800 mt-0.5">{item.value || "—"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-2xl p-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Delete Student?</h3>
              <p className="text-xs text-gray-500 mb-4">
                Are you sure you want to delete <strong>{selectedStudent?.name}</strong>? This action cannot be undone.
              </p>
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
