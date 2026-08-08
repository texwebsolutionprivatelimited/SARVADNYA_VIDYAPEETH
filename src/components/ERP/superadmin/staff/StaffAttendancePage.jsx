import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Save,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { getStaff, getStaffAttendance, getStaffAttendanceByDate, markStaffAttendanceBulk } from "../../../../hooks/superAdminData";

export default function StaffAttendancePage() {
  const [staff, setStaffList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [savedDates, setSavedDates] = useState(new Set());
  const [successMsg, setSuccessMsg] = useState("");
  const [allAttendance, setAllAttendance] = useState([]);

  useEffect(() => {
    const s = getStaff();
    setStaffList(s);
    loadAllAttendance();
  }, []);

  useEffect(() => {
    loadDateAttendance();
  }, [selectedDate, staff]);

  const loadAllAttendance = () => {
    const all = getStaffAttendance();
    setAllAttendance(all);
    const dates = new Set(all.map((a) => a.date));
    setSavedDates(dates);
  };

  const loadDateAttendance = () => {
    const dateRecords = getStaffAttendanceByDate(selectedDate);
    const map = {};
    staff.forEach((s) => {
      const record = dateRecords.find((r) => r.staffId === s.id);
      map[s.id] = record ? record.status : "Present";
    });
    setAttendanceMap(map);
  };

  const handleStatusChange = (staffId, status) => {
    setAttendanceMap((prev) => ({ ...prev, [staffId]: status }));
  };

  const handleSave = () => {
    markStaffAttendanceBulk(selectedDate, attendanceMap);
    loadAllAttendance();
    setSuccessMsg("Attendance saved successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const changeDate = (delta) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + delta);
    setSelectedDate(d.toISOString().split("T")[0]);
  };

  const dateStats = useMemo(() => {
    const values = Object.values(attendanceMap);
    return {
      present: values.filter((v) => v === "Present").length,
      absent: values.filter((v) => v === "Absent").length,
      leave: values.filter((v) => v === "Leave").length,
      total: values.length,
    };
  }, [attendanceMap]);

  // Monthly summary
  const monthlySummary = useMemo(() => {
    const summary = {};
    staff.forEach((s) => {
      const records = allAttendance.filter((a) => a.staffId === s.id);
      summary[s.id] = {
        name: s.name,
        department: s.department,
        present: records.filter((r) => r.status === "Present").length,
        absent: records.filter((r) => r.status === "Absent").length,
        leave: records.filter((r) => r.status === "Leave").length,
        total: records.length,
      };
    });
    return summary;
  }, [staff, allAttendance]);

  const statusIcons = {
    Present: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100 border-emerald-200", activeBg: "bg-emerald-600 text-white" },
    Absent: { icon: XCircle, color: "text-red-600", bg: "bg-red-100 border-red-200", activeBg: "bg-red-600 text-white" },
    Leave: { icon: Clock, color: "text-amber-600", bg: "bg-amber-100 border-amber-200", activeBg: "bg-amber-600 text-white" },
  };

  const [activeTab, setActiveTab] = useState("mark");

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
            <CalendarCheck className="w-5 h-5 text-red-600" />
            Staff Attendance
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Mark and review staff/faculty attendance</p>
        </div>
      </motion.div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5 w-fit">
        <button onClick={() => setActiveTab("mark")} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === "mark" ? "bg-white text-red-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          Mark Attendance
        </button>
        <button onClick={() => setActiveTab("summary")} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === "summary" ? "bg-white text-red-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
          Monthly Summary
        </button>
      </div>

      {activeTab === "mark" && (
        <>
          {/* Date Selector + Stats */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Date Navigation */}
              <div className="flex items-center gap-2">
                <button onClick={() => changeDate(-1)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"><ChevronLeft className="w-4 h-4" /></button>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/20" />
                <button onClick={() => changeDate(1)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"><ChevronRight className="w-4 h-4" /></button>
                {savedDates.has(selectedDate) && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">Saved</span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-700">{dateStats.present} Present</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 border border-red-100">
                  <XCircle className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-[10px] font-bold text-red-700">{dateStats.absent} Absent</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-100">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-[10px] font-bold text-amber-700">{dateStats.leave} Leave</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Attendance Grid */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Staff Member</th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Department</th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Designation</th>
                    <th className="px-3 py-2.5 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((s) => {
                    const currentStatus = attendanceMap[s.id] || "Present";
                    return (
                      <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                              {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-800">{s.name}</p>
                              <p className="text-[10px] text-gray-400">{s.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 hidden sm:table-cell text-xs text-gray-600">{s.department}</td>
                        <td className="px-3 py-2.5 hidden md:table-cell text-xs text-gray-600">{s.designation}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center justify-center gap-1.5">
                            {["Present", "Absent", "Leave"].map((status) => {
                              const config = statusIcons[status];
                              const Icon = config.icon;
                              const isActive = currentStatus === status;
                              return (
                                <button
                                  key={status}
                                  onClick={() => handleStatusChange(s.id, status)}
                                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                                    isActive ? `${config.activeBg} border-transparent shadow-sm` : `${config.bg} ${config.color} hover:opacity-80`
                                  }`}
                                >
                                  <Icon className="w-3 h-3" />
                                  <span className="hidden sm:inline">{status}</span>
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Save Button */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button onClick={handleSave} className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 flex items-center gap-1.5 shadow-sm transition-all">
                <Save className="w-3.5 h-3.5" /> Save Attendance
              </button>
            </div>
          </motion.div>
        </>
      )}

      {activeTab === "summary" && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/80">
            <h3 className="text-xs font-bold text-gray-700 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              Overall Attendance Summary
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">Staff</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Department</th>
                  <th className="px-3 py-2.5 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Days</th>
                  <th className="px-3 py-2.5 text-center text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Present</th>
                  <th className="px-3 py-2.5 text-center text-[10px] font-bold text-red-500 uppercase tracking-wider">Absent</th>
                  <th className="px-3 py-2.5 text-center text-[10px] font-bold text-amber-500 uppercase tracking-wider">Leave</th>
                  <th className="px-3 py-2.5 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rate</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => {
                  const data = monthlySummary[s.id] || { present: 0, absent: 0, leave: 0, total: 0 };
                  const rate = data.total > 0 ? Math.round((data.present / data.total) * 100) : 0;
                  return (
                    <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-3 py-2.5">
                        <span className="text-xs font-bold text-gray-800">{s.name}</span>
                      </td>
                      <td className="px-3 py-2.5 hidden sm:table-cell text-xs text-gray-600">{s.department}</td>
                      <td className="px-3 py-2.5 text-center text-xs font-semibold text-gray-700">{data.total}</td>
                      <td className="px-3 py-2.5 text-center text-xs font-bold text-emerald-700">{data.present}</td>
                      <td className="px-3 py-2.5 text-center text-xs font-bold text-red-600">{data.absent}</td>
                      <td className="px-3 py-2.5 text-center text-xs font-bold text-amber-600">{data.leave}</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${rate >= 80 ? "bg-emerald-100 text-emerald-700" : rate >= 60 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"}`}>
                          {rate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
