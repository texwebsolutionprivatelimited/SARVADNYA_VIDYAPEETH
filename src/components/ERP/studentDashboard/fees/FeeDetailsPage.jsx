import React from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IndianRupee,
  CheckCircle2,
  Clock,
  CreditCard,
  Receipt,
  FileText,
  BookMarked,
} from "lucide-react";
import { feeDetails, studentProfile } from "../../../../hooks/studentPortalData";
import OnlineFeesPayment from "./OnlineFeesPayment";
import FeeReceiptsSection from "./FeeReceiptsSection";

export default function FeeDetailsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "receipts";

  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Tab Selector Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-2.5 shadow-sm flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => setActiveTab("receipts")}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "receipts"
              ? "bg-purple-600 text-white shadow-md shadow-purple-200"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          Fee Receipts
        </button>

        <button
          onClick={() => setActiveTab("onlinePay")}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "onlinePay"
              ? "bg-purple-600 text-white shadow-md shadow-purple-200"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          Pay Fee Online
        </button>

        <button
          onClick={() => setActiveTab("installments")}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "installments"
              ? "bg-purple-600 text-white shadow-md shadow-purple-200"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Fee Installment Chart
        </button>

        <button
          onClick={() => setActiveTab("ledger")}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "ledger"
              ? "bg-purple-600 text-white shadow-md shadow-purple-200"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <BookMarked className="w-3.5 h-3.5" />
          Student Ledger
        </button>
      </div>

      {/* Render target page component based on activeTab */}
      {activeTab === "receipts" ? (
        <FeeReceiptsSection />
      ) : activeTab === "onlinePay" ? (
        <OnlineFeesPayment onBack={() => setActiveTab("receipts")} />
      ) : activeTab === "installments" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Total Academic Fee
              </p>
              <p className="text-2xl font-extrabold text-gray-800">
                ₹{feeDetails.totalFees.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Fee Paid
              </p>
              <p className="text-2xl font-extrabold text-emerald-600">
                ₹{feeDetails.paidFees.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Balance Due
              </p>
              <p className="text-2xl font-extrabold text-amber-600">
                ₹{feeDetails.pendingFees.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                Fee Installment Chart
              </h2>
              <button
                onClick={() => setActiveTab("onlinePay")}
                className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <CreditCard className="w-3.5 h-3.5" />
                Pay Online Now
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase">
                      Installment
                    </th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase">
                      Due Date
                    </th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold text-gray-400 uppercase">
                      Amount
                    </th>
                    <th className="px-4 py-2.5 text-center text-[10px] font-bold text-gray-400 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase hidden sm:table-cell">
                      Receipt No.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feeDetails.installments.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-50 hover:bg-purple-50/20"
                    >
                      <td className="px-4 py-3 text-xs font-bold text-gray-700">
                        {item.label}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {item.dueDate}
                      </td>
                      <td className="px-4 py-3 text-right text-xs font-bold text-gray-800">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            item.status === "Paid"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                              : "bg-amber-50 text-amber-600 border-amber-200"
                          }`}
                        >
                          {item.status === "Paid" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-500 hidden sm:table-cell">
                        {item.receiptNo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Total Academic Fee
              </p>
              <p className="text-2xl font-extrabold text-gray-800">
                ₹{feeDetails.totalFees.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Fee Paid
              </p>
              <p className="text-2xl font-extrabold text-emerald-600">
                ₹{feeDetails.paidFees.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Balance Due
              </p>
              <p className="text-2xl font-extrabold text-amber-600">
                ₹{feeDetails.pendingFees.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/60">
              <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-purple-600" />
                Account Ledger History
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase">
                      Description
                    </th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold text-gray-400 uppercase">
                      Debit (₹)
                    </th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold text-gray-400 uppercase">
                      Credit (₹)
                    </th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-bold text-gray-400 uppercase">
                      Balance (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feeDetails.ledger.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-50 hover:bg-gray-50/50"
                    >
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {row.date}
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-700">
                        {row.description}
                      </td>
                      <td className="px-4 py-3 text-right text-xs font-medium text-gray-600">
                        {row.debit ? `₹${row.debit.toLocaleString("en-IN")}` : "—"}
                      </td>
                      <td className="px-4 py-3 text-right text-xs font-bold text-emerald-600">
                        {row.credit ? `₹${row.credit.toLocaleString("en-IN")}` : "—"}
                      </td>
                      <td className="px-4 py-3 text-right text-xs font-bold text-gray-800">
                        ₹{row.balance.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
