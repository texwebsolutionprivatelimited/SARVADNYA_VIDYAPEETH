import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IndianRupee,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Building2,
  Lock,
  Download,
  Printer,
  ShieldCheck,
  QrCode,
  Smartphone,
  Landmark,
} from "lucide-react";
import { studentProfile, feeDetails } from "../../../../hooks/studentPortalData";

export default function OnlineFeesPayment({ onBack }) {
  const [selectedInstallment, setSelectedInstallment] = useState("I");
  const [selectedHead, setSelectedHead] = useState("All Fee");
  const [isNextYear, setIsNextYear] = useState(false);
  const [remarks, setRemarks] = useState("Online Payment");
  const [showGateway, setShowGateway] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  // Sample Fee Heads matching the ERP layout screenshot
  const [feeHeads, setFeeHeads] = useState([
    { id: 1, headName: "MIGRATION FEE", dueAmount: 350, recAmount: 350, selected: true, term: "1st Term" },
    { id: 2, headName: "PROVISIONAL DEGREE FEE", dueAmount: 350, recAmount: 350, selected: true, term: "1st Term" },
    { id: 3, headName: "TRAINING FEES", dueAmount: 8000, recAmount: 8000, selected: true, term: "1st Term" },
    { id: 4, headName: "BUS FEES", dueAmount: 12000, recAmount: 12000, selected: true, term: "1st Term" },
    { id: 5, headName: "SYMPOSIUM FEES", dueAmount: 500, recAmount: 500, selected: true, term: "1st Term" },
    { id: 6, headName: "DEVELOPMENT FEES", dueAmount: 600, recAmount: 600, selected: true, term: "1st Term" },
    { id: 7, headName: "TUITION FEE", dueAmount: 35000, recAmount: 35000, selected: true, term: "1st Term" },
  ]);

  // Toggle selection of fee items
  const handleHeadToggle = (id) => {
    setFeeHeads((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Calculate totals for selected items
  const totalDue = feeHeads
    .filter((h) => h.selected)
    .reduce((acc, curr) => acc + curr.dueAmount, 0);

  const totalRec = feeHeads
    .filter((h) => h.selected)
    .reduce((acc, curr) => acc + curr.recAmount, 0);

  const filteredHeads = feeHeads.filter((head) => {
    if (selectedHead === "All Fee") return true;
    return head.headName.toLowerCase().includes(selectedHead.toLowerCase());
  });

  const handlePaySubmit = () => {
    if (totalRec <= 0) return;
    setShowGateway(true);
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* ── Page Header / Title ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <IndianRupee className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-800 flex items-center gap-1.5">
              Online Fees Payment
            </h1>
            <p className="text-[11px] text-gray-500">
              Sarvadnya Vidyapeeth ERP Student Fee Portal
            </p>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
        )}
      </div>

      {/* ── Top Filters Control Bar ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              Date
            </label>
            <input
              type="text"
              readOnly
              value={new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              Rcpt/Chln No.
            </label>
            <input
              type="text"
              readOnly
              value="22542"
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              Select Installment ==&gt;
            </label>
            <select
              value={selectedInstallment}
              onChange={(e) => setSelectedInstallment(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="I">I Installment</option>
              <option value="II">II Installment</option>
              <option value="III">III Installment</option>
              <option value="All">All Installments</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              Select Head Name
            </label>
            <select
              value={selectedHead}
              onChange={(e) => setSelectedHead(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="All Fee">All Fee</option>
              <option value="Tuition Fee">Tuition Fee</option>
              <option value="Bus Fees">Bus Fees</option>
              <option value="Training Fees">Training Fees</option>
              <option value="Development Fees">Development Fees</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Student Details Banner Bar ── */}
      <div className="bg-sky-50/80 rounded-xl border border-sky-200 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-y-2 text-xs">
          <div className="space-y-1">
            <p className="font-bold text-gray-800">
              Name : <span className="text-purple-700">{studentProfile.name.toUpperCase()}</span>{" "}
              <span className="text-gray-400 font-normal">::</span> Father's Name :{" "}
              <span className="font-semibold text-gray-700">{studentProfile.fatherName.toUpperCase()}</span>{" "}
              <span className="text-gray-400 font-normal">::</span> Class-Section :{" "}
              <span className="font-semibold text-gray-700">
                {studentProfile.course} ({studentProfile.department}) {studentProfile.semester} - {studentProfile.section}
              </span>{" "}
              <span className="text-gray-400 font-normal">::</span> Adm. Dt. :{" "}
              <span className="font-semibold text-gray-700">{studentProfile.admissionDate}</span>
            </p>
            <p className="text-[11px] text-gray-600">
              Serial No. : <span className="font-semibold text-gray-800">230218</span>{" "}
              <span className="text-gray-400">::</span> Scholar No. :{" "}
              <span className="font-semibold text-gray-800">—</span>{" "}
              <span className="text-gray-400">::</span> Enrollment No. :{" "}
              <span className="font-semibold text-purple-700">{studentProfile.rollNumber}</span>{" "}
              <span className="ml-3 px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">
                {studentProfile.category}
              </span>
            </p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none bg-white px-3 py-1.5 rounded-lg border border-sky-200 shadow-xs">
            <input
              type="checkbox"
              checked={isNextYear}
              onChange={(e) => setIsNextYear(e.target.checked)}
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
            />
            <span className="text-xs font-semibold text-gray-700">Fees Type: Next Year</span>
          </label>
        </div>
      </div>

      {/* ── Fee Breakup Table ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-sky-100/70 border-b border-sky-200 text-gray-700 font-bold">
                <th className="py-2.5 px-3 w-10 text-center">Select</th>
                <th className="py-2.5 px-3 w-10 text-center">Sr</th>
                <th className="py-2.5 px-4">Head Name</th>
                <th className="py-2.5 px-4 text-right">Due Amount (₹)</th>
                <th className="py-2.5 px-4 text-right">Rec Amount (₹)</th>
                <th className="py-2.5 px-4">Class</th>
                <th className="py-2.5 px-4">Session</th>
                <th className="py-2.5 px-4 text-center">Remark/Term</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHeads.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`hover:bg-purple-50/30 transition-colors ${item.selected ? "bg-white" : "bg-gray-50/50 opacity-60"
                    }`}
                >
                  <td className="py-2.5 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleHeadToggle(item.id)}
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-gray-500">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-4 font-bold text-gray-800">
                    {item.headName}
                  </td>
                  <td className="py-2.5 px-4 text-right font-semibold text-gray-700">
                    {item.dueAmount.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold text-purple-700">
                    {item.recAmount.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-4 text-gray-600">
                    {studentProfile.course} ({studentProfile.department})
                  </td>
                  <td className="py-2.5 px-4 text-gray-600">
                    {studentProfile.session}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <select
                      value={item.term}
                      onChange={() => { }}
                      className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-[11px] font-medium outline-none"
                    >
                      <option>1st Term</option>
                      <option>2nd Term</option>
                      <option>Annual</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bottom Summary & Payment Action Bar ── */}
      <div className="bg-sky-50/90 rounded-xl border border-sky-200 p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
          {/* Remarks input */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-gray-700 mb-1">
              Received Amount Details :- Remarks :-
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium outline-none focus:border-purple-500"
            />
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">
              By Bank (Amount) :
            </label>
            <input
              type="text"
              readOnly
              value={totalRec}
              className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-purple-700 outline-none"
            />
          </div>

          {/* Totals Box */}
          <div className="bg-white p-2.5 rounded-lg border border-sky-200">
            <div className="flex justify-between text-[11px]">
              <span className="font-semibold text-gray-500">Late Fee Rate:</span>
              <span className="font-bold text-gray-700">₹0.00</span>
            </div>
            <div className="flex justify-between text-[11px] mt-0.5">
              <span className="font-semibold text-gray-500">Due Amt:</span>
              <span className="font-bold text-gray-800">₹{totalDue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs mt-1 pt-1 border-t border-gray-100">
              <span className="font-bold text-purple-800">Received Amt:</span>
              <span className="font-extrabold text-purple-700">₹{totalRec.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-sky-200/60">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-bold transition-colors"
          >
            Exit
          </button>
          <button
            type="button"
            onClick={handlePaySubmit}
            disabled={totalRec <= 0}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-200 transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            Proceed To Payment (₹{totalRec.toLocaleString("en-IN")})
          </button>
        </div>
      </div>

      {/* ── Payment Gateway Modal ── */}
      <AnimatePresence>
        {showGateway && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 max-w-lg w-full shadow-2xl overflow-hidden"
            >
              {paymentSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-800">
                      Payment Successful!
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Transaction ID: <span className="font-mono font-bold text-gray-700">TXN98452108</span>
                    </p>
                    <p className="text-xs font-bold text-emerald-600 mt-2">
                      Amount Paid: ₹{totalRec.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl text-left text-xs space-y-1 text-gray-600 border border-gray-200">
                    <p><strong>Student:</strong> {studentProfile.name}</p>
                    <p><strong>Roll No:</strong> {studentProfile.rollNumber}</p>
                    <p><strong>Receipt No:</strong> RCP-2026-22542</p>
                    <p><strong>Date & Time:</strong> {new Date().toLocaleString()}</p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Receipt
                    </button>
                    <button
                      onClick={() => {
                        setShowGateway(false);
                        setPaymentSuccess(false);
                      }}
                      className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md"
                    >
                      Close & Return
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleProcessPayment} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-800">
                        Sarvadnya Vidyapeeth Payment Gateway
                      </h3>
                      <p className="text-xs text-gray-500">
                        Secure 256-Bit SSL Encrypted Payment
                      </p>
                    </div>
                    <Lock className="w-5 h-5 text-emerald-600" />
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-purple-600 font-bold uppercase">Total Payable Amount</p>
                      <p className="text-xl font-extrabold text-purple-900">₹{totalRec.toLocaleString("en-IN")}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-white text-purple-700 rounded-lg text-xs font-bold border border-purple-200">
                      Challan #22542
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-2">
                      Select Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold flex flex-col items-center gap-1 transition-all ${paymentMethod === "upi"
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        <QrCode className="w-5 h-5" />
                        UPI / QR
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold flex flex-col items-center gap-1 transition-all ${paymentMethod === "card"
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        Debit / Credit
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("netbanking")}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold flex flex-col items-center gap-1 transition-all ${paymentMethod === "netbanking"
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        <Landmark className="w-5 h-5" />
                        Net Banking
                      </button>
                    </div>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center space-y-2">
                      <p className="text-xs font-semibold text-gray-700">Scan QR Code using PhonePe / Google Pay / Paytm</p>
                      <div className="w-32 h-32 bg-white p-2 border border-gray-300 rounded-xl mx-auto flex items-center justify-center shadow-xs">
                        <QrCode className="w-24 h-24 text-gray-800" />
                      </div>
                      <p className="text-[10px] text-gray-400">UPI ID: sarvadnyavidyapeeth@upi</p>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 block mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="4532 •••• •••• 8912"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 block mb-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 block mb-1">CVV</label>
                          <input
                            type="password"
                            placeholder="•••"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 block mb-1">Select Bank</label>
                      <select className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none font-semibold">
                        <option>State Bank of India (SBI)</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Punjab National Bank</option>
                        <option>Axis Bank</option>
                      </select>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setShowGateway(false)}
                      className="px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-200 flex items-center gap-1.5"
                    >
                      {processing ? "Processing Payment..." : `Pay ₹${totalRec.toLocaleString("en-IN")}`}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
