import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Mail,
  Phone,
  Download,
  Eye,
  MessageSquare,
  Undo2,
} from "lucide-react";
import { db, collection, addDoc, updateDoc, doc, onSnapshot } from "../../firebase";

const INITIAL_ENQUIRIES = [
  { id: 1, name: "Rahul Sharma", email: "rahul.sharma@gmail.com", phone: "+91 98765 43210", course: "BCA", message: "Interested in BCA admission for 2026 session.", date: "Jun 27, 2026", status: "Pending" },
  { id: 2, name: "Priya Gupta", email: "priya.gupta@gmail.com", phone: "+91 87654 32109", course: "BBA", message: "Want to know about BBA fee structure and scholarship.", date: "Jun 26, 2026", status: "Responded" },
  { id: 3, name: "Amit Kumar", email: "amit.k@yahoo.com", phone: "+91 76543 21098", course: "BCA", message: "Is hostel facility available for BCA students?", date: "Jun 25, 2026", status: "Responded" },
  { id: 4, name: "Sneha Verma", email: "sneha.v@gmail.com", phone: "+91 65432 10987", course: "BBA", message: "Looking for information about placement record.", date: "Jun 24, 2026", status: "Pending" },
  { id: 5, name: "Vikash Singh", email: "vikash.singh@gmail.com", phone: "+91 54321 09876", course: "BCA", message: "What is the last date for admission?", date: "Jun 23, 2026", status: "Closed" },
  { id: 6, name: "Ananya Das", email: "ananya.d@gmail.com", phone: "+91 43210 98765", course: "BBA", message: "Can I get BSCC scholarship for BBA course?", date: "Jun 22, 2026", status: "Responded" },
  { id: 7, name: "Rohan Patel", email: "rohan.patel@gmail.com", phone: "+91 32109 87654", course: "BCA", message: "Details about live classes and online learning.", date: "Jun 21, 2026", status: "Pending" },
  { id: 8, name: "Kavita Jha", email: "kavita.jha@gmail.com", phone: "+91 21098 76543", course: "BBA", message: "Is there any entrance exam for BBA admission?", date: "Jun 20, 2026", status: "Closed" },
];

const STATUS_CONFIG = {
  Pending: { icon: Clock, color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-400" },
  Responded: { icon: CheckCircle, color: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-400" },
  Closed: { icon: XCircle, color: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function EnquiryManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "enquiries"), async (snapshot) => {
      const list = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      if (snapshot.docs.length === 0) {
        try {
          const seeded = [];
          for (const item of INITIAL_ENQUIRIES) {
            const docRef = await addDoc(collection(db, "enquiries"), {
              name: item.name,
              email: item.email,
              phone: item.phone,
              course: item.course,
              message: item.message,
              date: item.date,
              status: item.status,
            });
            seeded.push({ id: docRef.id, ...item });
          }
          setEnquiries(seeded);
        } catch (err) {
          console.error("Seeding error:", err);
          setEnquiries(INITIAL_ENQUIRIES);
        }
      } else {
        setEnquiries(list);
      }
    });
    return unsubscribe;
  }, []);

  const FILTERS = ["All", "Pending", "Responded", "Closed"];

  const filtered = enquiries.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || e.status === filter;
    return matchSearch && matchFilter;
  });

  // Build WhatsApp message link
  const openWhatsApp = (enquiry) => {
    const phone = (enquiry.phone || "").replace(/[^\d]/g, "");
    if (!phone) return;
    const msg = `Hello ${enquiry.name || "there"},\n\nThank you for your enquiry about *${enquiry.course || "our courses"}* at *Sarvadnya Vidyapeeth*.\n\nRegarding your query:\n_"${enquiry.message || ""}"_\n\nWe're happy to inform you that your enquiry has been reviewed and responded to by our team. If you need any further assistance or have more questions, feel free to reach out to us.\n\nWarm regards,\nSarvadnya Vidyapeeth — Admissions Team\n📞 Contact: +91 XXXXXXXXXX\n🌐 Visit: sarvadnyavidyapeeth.com`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const updateStatus = async (id, status, enquiry = null) => {
    try {
      const docRef = doc(db, "enquiries", id);
      await updateDoc(docRef, { status });
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status }));
      }
      // When marking as Responded, open WhatsApp with pre-filled message
      if (status === "Responded" && enquiry) {
        openWhatsApp(enquiry);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const stats = {
    total: enquiries.length,
    pending: enquiries.filter((e) => e.status === "Pending").length,
    responded: enquiries.filter((e) => e.status === "Responded").length,
    closed: enquiries.filter((e) => e.status === "Closed").length,
  };

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">Enquiry Manager</h2>
          <p className="text-[12px] text-slate-500 mt-0.5">{stats.pending} pending • {stats.responded} responded • {stats.closed} closed</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 text-white text-[12px] font-bold shadow-lg shadow-green-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: stats.total, color: "from-purple-600 to-purple-800" },
          { label: "Pending", value: stats.pending, color: "from-amber-500 to-orange-600" },
          { label: "Responded", value: stats.responded, color: "from-green-500 to-emerald-600" },
          { label: "Closed", value: stats.closed, color: "from-slate-500 to-slate-700" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl bg-gradient-to-br ${s.color} p-4 text-white relative overflow-hidden`}>
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-white/10" />
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">{s.label}</p>
            <p className="text-2xl font-black mt-1">{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Search + Filters */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 bg-white text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 ${filter === f ? "bg-purple-700 text-white border-purple-600 shadow-sm" : "bg-white text-slate-600 border-purple-100 hover:bg-purple-50 hover:text-purple-700"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Enquiry Table */}
      <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                <th className="px-5 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800">Name</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden md:table-cell">Contact</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden sm:table-cell">Course</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800">Status</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((enq, i) => {
                const StatusIcon = STATUS_CONFIG[enq.status].icon;
                return (
                  <tr key={enq.id} className={`border-b border-slate-100 hover:bg-purple-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="px-5 py-3.5">
                      <p className="text-[12px] font-bold text-slate-800">{enq.name}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <div className="space-y-0.5">
                        <p className="text-[10px] text-slate-500 flex items-center gap-1"><Mail className="w-3 h-3" /> {enq.email}</p>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" /> {enq.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">{enq.course}</span>
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-slate-500 font-medium hidden lg:table-cell">{enq.date}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${STATUS_CONFIG[enq.status].color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[enq.status].dot}`} />
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setSelectedEnquiry(selectedEnquiry?.id === enq.id ? null : enq)} className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-500 transition-colors" title="View">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {enq.status === "Pending" && (
                          <button onClick={() => updateStatus(enq.id, "Responded", enq)} className="p-1.5 rounded-lg hover:bg-green-100 text-green-600 transition-colors" title="Mark Responded & Send WhatsApp">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {enq.status !== "Closed" && (
                          <button onClick={() => updateStatus(enq.id, "Closed")} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors" title="Close">
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {enq.status !== "Pending" && (
                          <button onClick={() => updateStatus(enq.id, "Pending")} className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-600 transition-colors" title="Undo — Revert to Pending">
                            <Undo2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-[12px] text-slate-400">No enquiries found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ─── Enquiry Detail Panel ─── */}
      {selectedEnquiry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-purple-700" />
            </div>
            <h3 className="text-[14px] font-extrabold text-slate-900">Enquiry Details</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Name</p>
              <p className="text-[13px] font-semibold text-slate-800">{selectedEnquiry.name}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Course</p>
              <p className="text-[13px] font-semibold text-slate-800">{selectedEnquiry.course}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
              <p className="text-[13px] font-semibold text-slate-800">{selectedEnquiry.email}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
              <p className="text-[13px] font-semibold text-slate-800">{selectedEnquiry.phone}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Message</p>
              <p className="text-[13px] font-medium text-slate-700 bg-purple-50/50 p-3 rounded-xl border border-purple-100/50">{selectedEnquiry.message}</p>
            </div>
          </div>
          {/* WhatsApp action buttons */}
          <div className="mt-4 pt-4 border-t border-purple-100/50 flex flex-wrap gap-2">
            {selectedEnquiry.status === "Pending" && (
              <button
                onClick={() => updateStatus(selectedEnquiry.id, "Responded", selectedEnquiry)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[12px] font-bold shadow-lg shadow-green-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <CheckCircle className="w-4 h-4" />
                Mark Responded & Send WhatsApp
              </button>
            )}
            {selectedEnquiry.phone && (
              <button
                onClick={() => openWhatsApp(selectedEnquiry)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white text-[12px] font-bold shadow-lg shadow-green-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Send WhatsApp Message
              </button>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
