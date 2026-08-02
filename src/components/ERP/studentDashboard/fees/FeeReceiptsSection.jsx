import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Printer, Download, Receipt, Search, Filter, Eye, CheckCircle2, XCircle } from "lucide-react";
import { feeReceipts, studentProfile } from "../../../../hooks/studentPortalData";

export default function FeeReceiptsSection() {
  const [selectedSession, setSelectedSession] = useState("All Sessions");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Filter receipts by session
  const filteredReceipts = feeReceipts.filter((item) => {
    if (selectedSession === "All Sessions") return true;
    return item.session === selectedSession;
  });

  const handlePrintReceipt = (receipt) => {
    setSelectedReceipt(receipt);
  };

  const triggerBrowserPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-800">Fee Receipts</h2>
            <p className="text-[11px] text-gray-500">
              Select session to view and print official student fee receipts
            </p>
          </div>
        </div>

        {/* Session Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-purple-600" />
            Session:
          </label>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="All Sessions">All Sessions</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
          </select>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-sky-100/70 border-b border-sky-200 text-gray-700 font-bold">
                <th className="py-3 px-4 w-12 text-center">Sr</th>
                <th className="py-3 px-4">Receipt Date</th>
                <th className="py-3 px-4">Receipt No.</th>
                <th className="py-3 px-4 text-right">Total Rec. Amount</th>
                <th className="py-3 px-4 text-center">Is Cancelled</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReceipts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400 font-medium">
                    No fee receipts found for the selected session.
                  </td>
                </tr>
              ) : (
                filteredReceipts.map((item, idx) => (
                  <tr key={item.receiptNo} className="hover:bg-purple-50/20 transition-colors">
                    <td className="py-3 px-4 text-center font-bold text-gray-600">{idx + 1}</td>
                    <td className="py-3 px-4 font-semibold text-gray-700">{item.receiptDate}</td>
                    <td className="py-3 px-4 font-mono font-bold text-purple-700">{item.receiptNo}</td>
                    <td className="py-3 px-4 text-right font-extrabold text-gray-900">
                      ₹{item.totalRecAmount.toLocaleString("en-IN")}.00
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.isCancelled === "Yes"
                            ? "bg-red-50 text-red-600 border-red-200"
                            : "bg-emerald-50 text-emerald-600 border-emerald-200"
                          }`}
                      >
                        {item.isCancelled === "Yes" ? (
                          <>
                            <XCircle className="w-3 h-3" /> Yes
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> No
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handlePrintReceipt(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 rounded-lg text-xs font-bold transition-all group"
                      >
                        <Printer className="w-3.5 h-3.5 text-purple-600 group-hover:scale-110 transition-transform" />
                        Print Receipt
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 max-w-2xl w-full shadow-2xl my-8 overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedReceipt(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 print:hidden text-xs font-bold bg-gray-100 hover:bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>

              {/* Official Receipt View (Print Target) */}
              <div className="p-4 border-2 border-purple-800 rounded-xl space-y-4 bg-white font-sans text-gray-800">
                {/* Header */}
                <div className="text-center border-b pb-3 border-gray-200">
                  <h2 className="text-lg font-extrabold text-purple-900 tracking-wide">
                    SARVADNYA VIDYAPEETH
                  </h2>
                  <p className="text-[11px] font-medium text-gray-600">
                    Affiliated to Aryabhatta Knowledge University, Patna
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Campus Address: Main Road, Patna, Bihar - 800001 | Phone: +91 9876543210
                  </p>
                  <div className="mt-2 inline-block px-4 py-0.5 bg-purple-700 text-white rounded-full text-xs font-bold tracking-wider">
                    OFFICIAL FEE RECEIPT
                  </div>
                </div>

                {/* Receipt Info Grid */}
                <div className="grid grid-cols-2 text-xs gap-y-1.5 bg-purple-50/50 p-3 rounded-lg border border-purple-100">
                  <p>
                    <strong className="text-gray-600">Receipt No:</strong>{" "}
                    <span className="font-mono font-bold text-purple-800">{selectedReceipt.receiptNo}</span>
                  </p>
                  <p className="text-right">
                    <strong className="text-gray-600">Date:</strong>{" "}
                    <span className="font-bold">{selectedReceipt.receiptDate}</span>
                  </p>
                  <p>
                    <strong className="text-gray-600">Session:</strong>{" "}
                    <span className="font-bold">{selectedReceipt.session}</span>
                  </p>
                  <p className="text-right">
                    <strong className="text-gray-600">Payment Mode:</strong>{" "}
                    <span className="font-bold">{selectedReceipt.paymentMode}</span>
                  </p>
                </div>

                {/* Student Details */}
                <div className="grid grid-cols-2 text-xs gap-y-1 border-b pb-3 border-gray-200">
                  <p><strong>Student Name:</strong> {studentProfile.name}</p>
                  <p><strong>Father's Name:</strong> {studentProfile.fatherName}</p>
                  <p><strong>Enrollment No:</strong> {studentProfile.rollNumber}</p>
                  <p><strong>Course / Class:</strong> {studentProfile.course} ({studentProfile.department})</p>
                  <p><strong>Semester:</strong> {studentProfile.semester}</p>
                  <p><strong>Category:</strong> {studentProfile.category}</p>
                </div>

                {/* Fee Heads Breakdown Table */}
                <table className="w-full text-xs border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300 font-bold">
                      <th className="p-2 border-r border-gray-300 w-10 text-center">Sr</th>
                      <th className="p-2 border-r border-gray-300 text-left">Particulars / Head Name</th>
                      <th className="p-2 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReceipt.heads.map((head, hIdx) => (
                      <tr key={hIdx} className="border-b border-gray-200">
                        <td className="p-2 border-r border-gray-200 text-center">{hIdx + 1}</td>
                        <td className="p-2 border-r border-gray-200 font-semibold text-gray-700">{head.name}</td>
                        <td className="p-2 text-right font-bold">₹{head.amount.toLocaleString("en-IN")}.00</td>
                      </tr>
                    ))}
                    <tr className="bg-purple-50 font-bold border-t border-purple-200 text-purple-900">
                      <td colSpan={2} className="p-2 text-right border-r border-purple-200 uppercase text-[11px]">
                        Total Received Amount:
                      </td>
                      <td className="p-2 text-right text-sm">
                        ₹{selectedReceipt.totalRecAmount.toLocaleString("en-IN")}.00
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Footer Signatures */}
                <div className="flex items-end justify-between pt-6 text-[11px]">
                  <div>
                    <p className="text-gray-400">Printed Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-[10px] text-gray-400">Computer Generated Receipt — No Signature Required</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 border-b border-gray-400 mb-1"></div>
                    <p className="font-bold text-gray-700">Accounts Officer</p>
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 mt-4 print:hidden">
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"
                >
                  Close
                </button>
                <button
                  onClick={triggerBrowserPrint}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-200 flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  Print Receipt Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
