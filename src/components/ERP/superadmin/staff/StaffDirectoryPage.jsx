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
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  Save,
  GraduationCap,
  IndianRupee,
  BookOpen,
} from "lucide-react";
import { getStaff, addStaff, updateStaff, deleteStaff } from "../../../../hooks/superAdminData";

export default function StaffDirectoryPage() {
  const [staff, setStaffList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [formData, setFormData] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    refreshStaff();
  }, []);

  const refreshStaff = () => setStaffList(getStaff());

  const departments = useMemo(() => {
    const depts = [...new Set(staff.map((s) => s.department))];
    return ["All", ...depts];
  }, [staff]);

  const filteredStaff = useMemo(() => {
    return staff.filter((s) => {
      const matchSearch =
        !searchQuery ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = deptFilter === "All" || s.department === deptFilter;
      const matchType = typeFilter === "All" || s.type === typeFilter;
      return matchSearch && matchDept && matchType;
    });
  }, [staff, searchQuery, deptFilter, typeFilter]);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const emptyForm = {
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    department: "Computer Applications",
    designation: "Assistant Professor",
    qualification: "",
    specialization: "",
    joiningDate: new Date().toISOString().split("T")[0],
    salary: 0,
    status: "Active",
    type: "Teaching",
    photo: "",
  };

  const handleAdd = () => {
    setFormData({ ...emptyForm });
    setShowAddModal(true);
  };

  const handleSaveNew = () => {
    if (!formData.name || !formData.employeeId) return;
    addStaff(formData);
    refreshStaff();
    setShowAddModal(false);
    showSuccess("Staff member added successfully!");
  };

  const handleEdit = (s) => {
    setSelectedStaff(s);
    setFormData({ ...s });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!formData.name) return;
    updateStaff(selectedStaff.id, formData);
    refreshStaff();
    setShowEditModal(false);
    showSuccess("Staff record updated successfully!");
  };

  const handleDelete = () => {
    deleteStaff(selectedStaff.id);
    refreshStaff();
    setShowDeleteConfirm(false);
    setSelectedStaff(null);
    showSuccess("Staff member deleted successfully!");
  };

  const statusColor = {
    Active: "bg-emerald-100 text-emerald-700",
    "On Leave": "bg-amber-100 text-amber-700",
    Resigned: "bg-red-100 text-red-600",
  };

  const FormField = ({ label, value, onChange, type = "text", options }) => (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
      {options ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500">
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
      )}
    </div>
  );

  const StaffForm = ({ onSave, title }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between z-10">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-red-600" /> {title}
          </h3>
          <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Employee ID" value={formData.employeeId || ""} onChange={(v) => setFormData({ ...formData, employeeId: v })} />
          <FormField label="Full Name" value={formData.name || ""} onChange={(v) => setFormData({ ...formData, name: v })} />
          <FormField label="Email" value={formData.email || ""} onChange={(v) => setFormData({ ...formData, email: v })} type="email" />
          <FormField label="Phone" value={formData.phone || ""} onChange={(v) => setFormData({ ...formData, phone: v })} />
          <FormField label="Date of Birth" value={formData.dob || ""} onChange={(v) => setFormData({ ...formData, dob: v })} type="date" />
          <FormField label="Gender" value={formData.gender || "Male"} onChange={(v) => setFormData({ ...formData, gender: v })} options={["Male", "Female", "Other"]} />
          <FormField label="Department" value={formData.department || ""} onChange={(v) => setFormData({ ...formData, department: v })} options={["Computer Applications", "Business Administration", "Mathematics", "General", "Administration", "Library"]} />
          <FormField label="Designation" value={formData.designation || ""} onChange={(v) => setFormData({ ...formData, designation: v })} options={["Professor & HOD", "Associate Professor", "Assistant Professor", "Lecturer", "Office Manager", "Librarian", "Lab Assistant", "Clerk"]} />
          <FormField label="Qualification" value={formData.qualification || ""} onChange={(v) => setFormData({ ...formData, qualification: v })} />
          <FormField label="Specialization" value={formData.specialization || ""} onChange={(v) => setFormData({ ...formData, specialization: v })} />
          <FormField label="Type" value={formData.type || "Teaching"} onChange={(v) => setFormData({ ...formData, type: v })} options={["Teaching", "Non-Teaching"]} />
          <FormField label="Joining Date" value={formData.joiningDate || ""} onChange={(v) => setFormData({ ...formData, joiningDate: v })} type="date" />
          <FormField label="Salary (₹)" value={formData.salary || ""} onChange={(v) => setFormData({ ...formData, salary: parseInt(v) || 0 })} type="number" />
          <FormField label="Status" value={formData.status || "Active"} onChange={(v) => setFormData({ ...formData, status: v })} options={["Active", "On Leave", "Resigned"]} />
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
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-4 right-4 z-[100] px-4 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-extrabold text-gray-800 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-red-600" />
            Staff & Faculty Directory
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">{filteredStaff.length} of {staff.length} staff members shown</p>
        </div>
        <button onClick={handleAdd} className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm transition-all">
          <Plus className="w-3.5 h-3.5" /> Add Staff
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name or employee ID..." className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
        </div>
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20">
          {departments.map((d) => <option key={d} value={d}>{d === "All" ? "All Departments" : d}</option>)}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20">
          <option value="All">All Types</option>
          <option value="Teaching">Teaching</option>
          <option value="Non-Teaching">Non-Teaching</option>
        </select>
      </motion.div>

      {/* Staff Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Staff</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Employee ID</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Department</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Designation</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Type</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-3 py-2.5 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-red-50/30 transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-800 truncate">{s.name}</p>
                        <p className="text-[10px] text-gray-400 truncate sm:hidden">{s.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 hidden sm:table-cell text-xs font-semibold text-gray-600">{s.employeeId}</td>
                  <td className="px-3 py-2.5 hidden md:table-cell text-xs text-gray-600">{s.department}</td>
                  <td className="px-3 py-2.5 hidden lg:table-cell text-xs text-gray-600">{s.designation}</td>
                  <td className="px-3 py-2.5 hidden lg:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.type === "Teaching" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                      {s.type}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColor[s.status] || "bg-gray-100 text-gray-500"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => { setSelectedStaff(s); setShowViewModal(true); }} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleEdit(s)} className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors" title="Edit">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => { setSelectedStaff(s); setShowDeleteConfirm(true); }} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStaff.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-xs text-gray-400">No staff found matching your criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Modal */}
      <AnimatePresence>{showAddModal && <StaffForm title="Add New Staff" onSave={handleSaveNew} />}</AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>{showEditModal && <StaffForm title={`Edit — ${selectedStaff?.name}`} onSave={handleSaveEdit} />}</AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between z-10">
                <h3 className="text-sm font-bold text-gray-800">Staff Profile</h3>
                <button onClick={() => setShowViewModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-100">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                    {selectedStaff.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-gray-800">{selectedStaff.name}</h4>
                    <p className="text-xs text-gray-500">{selectedStaff.designation} • {selectedStaff.department}</p>
                    <p className="text-xs text-gray-400">{selectedStaff.employeeId} • {selectedStaff.type}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { icon: Mail, label: "Email", value: selectedStaff.email },
                    { icon: Phone, label: "Phone", value: selectedStaff.phone },
                    { icon: Calendar, label: "DOB", value: selectedStaff.dob },
                    { icon: User, label: "Gender", value: selectedStaff.gender },
                    { icon: GraduationCap, label: "Qualification", value: selectedStaff.qualification },
                    { icon: BookOpen, label: "Specialization", value: selectedStaff.specialization },
                    { icon: Calendar, label: "Joining Date", value: selectedStaff.joiningDate },
                    { icon: IndianRupee, label: "Salary", value: `₹${(selectedStaff.salary || 0).toLocaleString("en-IN")}` },
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
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-2xl p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Delete Staff Member?</h3>
              <p className="text-xs text-gray-500 mb-4">Are you sure you want to delete <strong>{selectedStaff?.name}</strong>?</p>
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
