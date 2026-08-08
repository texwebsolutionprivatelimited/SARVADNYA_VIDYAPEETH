import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IndianRupee,
  Search,
  Plus,
  X,
  Filter,
  CheckCircle2,
  CreditCard,
  Receipt,
  Calendar,
  User,
  Save,
  TrendingUp,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import { getStudents, getPayments, addPayment, initERP } from "../../../../hooks/erpData";

export default function StudentFeeManagement() {
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState("payments");
  const [paymentForm, setPaymentForm] = useState({
    studentId: "",
    rollNumber: "",
    studentName: "",
    amount: "",
    method: "UPI",
    remarks: "",
  });

  useEffect(() => {
    initERP();
    refresh();
  }, []);

  const refresh = () => {
    setStudents(getStudents());
    setPayments(getPayments());
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        !searchQuery ||
        p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchMethod = methodFilter === "All" || p.method === methodFilter;
      return matchSearch && matchMethod;
    });
  }, [payments, searchQuery, methodFilter]);

  const defaulters = useMemo(() => {
    return students.filter((s) => s.paidFees < s.totalFees && s.status === "Active");
  }, [students]);

  const totalCollected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalPending = students.reduce((sum, s) => sum + Math.max(0, (s.totalFees || 0) - (s.paidFees || 0)), 0);

  const handleRecordPayment = () => {
    if (!paymentForm.studentId || !paymentForm.amount) return;
    addPayment({
      studentId: paymentForm.studentId,
      rollNumber: paymentForm.rollNumber,
      studentName: paymentForm.studentName,
      amount: parseInt(paymentForm.amount),
      date: new Date().toISOString().split("T")[0],
      method: paymentForm.method,
      status: "Paid",
      receiptNo: `RCP-${Date.now()}`,
      remarks: paymentForm.remarks || "Payment recorded by admin",
    });
    refresh();
    setShowPaymentModal(false);
    showSuccess("Payment recorded successfully!");
  };

  const handleStudentSelect = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      setPaymentForm({
        ...paymentForm,
        studentId: student.id,
        rollNumber: student.rollNumber,
        studentName: student.name,
      });
    }
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
            <IndianRupee className="w-5 h-5 text-red-600" />
            Fee Management
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Track payments, record fees, and identify defaulters</p>
        </div>
        <button onClick={() => { setPaymentForm({ studentId: "", rollNumber: "", studentName: "", amount: "", method: "UPI", remarks: "" }); setShowPaymentModal(true); }} className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm transition-all">
          <Plus className="w-3.5 h-3.5" /> Record Payment
        </button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <IndianRupee className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-lg font-extrabold text-green-700">₹{totalCollected.toLocaleString("en-IN")}</p>
          <p className="text-[9px] font-bold text-gray-400 uppercase">Total Collected</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <p className="text-lg font-extrabold text-red-700">₹{totalPending.toLocaleString("en-IN")}</p>
          <p className="text-[9px] font-bold text-gray-400 uppercase">Total Pending</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Receipt className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-lg font-extrabold text-blue-700">{payments.length}</p>
          <p className="text-[9px] font-bold text-gray-400 uppercase">Transactions</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <User className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-lg font-extrabold text-amber-700">{defaulters.length}</p>
          <p className="text-[9px] font-bold text-gray-400 uppercase">Fee Defaulters</p>
        </motion.div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5 w-fit">
        <button onClick={() => setActiveTab("payments")} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === "payments" ? "bg-white text-red-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          All Payments
        </button>
        <button onClick={() => setActiveTab("defaulters")} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === "defaulters" ? "bg-white text-red-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          Fee Defaulters ({defaulters.length})
        </button>
      </div>

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <>
          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name or roll number..." className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
            </div>
            <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20">
              <option value="All">All Methods</option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </motion.div>

          {/* Payments Table */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Student</th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Roll No</th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Method</th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Receipt</th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2.5">
                        <span className="text-xs font-bold text-gray-800">{p.studentName}</span>
                      </td>
                      <td className="px-3 py-2.5 hidden sm:table-cell">
                        <span className="text-xs text-gray-600">{p.rollNumber}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-xs font-extrabold text-green-700">₹{p.amount.toLocaleString("en-IN")}</span>
                      </td>
                      <td className="px-3 py-2.5 hidden md:table-cell">
                        <span className="text-xs text-gray-500">{p.date}</span>
                      </td>
                      <td className="px-3 py-2.5 hidden md:table-cell">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">{p.method}</span>
                      </td>
                      <td className="px-3 py-2.5 hidden lg:table-cell">
                        <span className="text-[10px] text-gray-500 font-mono">{p.receiptNo}</span>
                      </td>
                      <td className="px-3 py-2.5 hidden lg:table-cell">
                        <span className="text-[10px] text-gray-400">{p.remarks}</span>
                      </td>
                    </tr>
                  ))}
                  {filteredPayments.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-12 text-center text-xs text-gray-400">No payments found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}

      {/* Defaulters Tab */}
      {activeTab === "defaulters" && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Student</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Roll No</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Fee</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Paid</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</th>
                </tr>
              </thead>
              <tbody>
                {defaulters.map((s) => (
                  <tr key={s.id} className="border-b border-gray-50 hover:bg-red-50/30 transition-colors">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-white text-[9px] font-bold">
                          {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="text-xs font-bold text-gray-800">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 hidden sm:table-cell text-xs text-gray-600">{s.rollNumber}</td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.course === "BCA" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{s.course}</span>
                    </td>
                    <td className="px-3 py-2.5 text-xs font-semibold text-gray-700">₹{(s.totalFees || 0).toLocaleString("en-IN")}</td>
                    <td className="px-3 py-2.5 text-xs font-bold text-green-700">₹{(s.paidFees || 0).toLocaleString("en-IN")}</td>
                    <td className="px-3 py-2.5 text-xs font-extrabold text-red-600">₹{((s.totalFees || 0) - (s.paidFees || 0)).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
                {defaulters.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-xs text-gray-400">No fee defaulters — all students are up to date!</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Record Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-2xl">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-red-600" /> Record New Payment
                </h3>
                <button onClick={() => setShowPaymentModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Select Student</label>
                  <select value={paymentForm.studentId} onChange={(e) => handleStudentSelect(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20">
                    <option value="">— Select a Student —</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({s.rollNumber})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Amount (₹)</label>
                  <input type="number" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} placeholder="Enter amount" className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Payment Method</label>
                  <select value={paymentForm.method} onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20">
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Remarks</label>
                  <input type="text" value={paymentForm.remarks} onChange={(e) => setPaymentForm({ ...paymentForm, remarks: e.target.value })} placeholder="e.g. 2nd Installment" className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                </div>
              </div>
              <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-end gap-2">
                <button onClick={() => setShowPaymentModal(false)} className="px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                <button onClick={handleRecordPayment} className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm">
                  <Save className="w-3.5 h-3.5" /> Record Payment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
