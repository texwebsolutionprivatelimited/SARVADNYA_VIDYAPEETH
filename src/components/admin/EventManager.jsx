import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Calendar,
  MapPin,
  Clock,
  Users,
  Filter,
} from "lucide-react";
import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "../../firebase";

const INITIAL_EVENTS = [
  { id: 1, title: "Vidya-Tech National Hackathon 2026", date: "Jul 15 – 16, 2026", time: "09:00 AM", venue: "Computer Labs & Seminar Hall", category: "Technical", status: "Upcoming", attendees: 120 },
  { id: 2, title: "Tarang 2026: Annual Cultural Carnival", date: "Aug 05 – 06, 2026", time: "10:00 AM", venue: "Campus Main Ground", category: "Cultural", status: "Upcoming", attendees: 500 },
  { id: 3, title: "National Seminar: Generative AI", date: "Sep 12, 2026", time: "10:30 AM", venue: "Central Auditorium", category: "Academic", status: "Upcoming", attendees: 200 },
  { id: 4, title: "BBA Business Pitch Challenge", date: "Oct 03, 2026", time: "01:30 PM", venue: "Conference Room B", category: "Management", status: "Upcoming", attendees: 60 },
  { id: 5, title: "Freshers Welcome Party 2025", date: "Aug 20, 2025", time: "04:00 PM", venue: "Auditorium", category: "Cultural", status: "Completed", attendees: 350 },
  { id: 6, title: "Annual Sports Meet 2025", date: "Nov 15, 2025", time: "07:00 AM", venue: "Sports Ground", category: "Sports", status: "Completed", attendees: 400 },
];

const STATUS_STYLES = {
  Upcoming: "bg-green-50 text-green-700 border-green-200",
  Completed: "bg-slate-100 text-slate-600 border-slate-200",
  Cancelled: "bg-red-50 text-red-600 border-red-200",
};

const CATEGORY_COLORS = {
  Technical: "from-purple-500 to-indigo-600",
  Cultural: "from-pink-500 to-rose-600",
  Academic: "from-blue-500 to-cyan-600",
  Management: "from-amber-500 to-orange-600",
  Sports: "from-green-500 to-emerald-600",
};

const CATEGORY_BG = {
  Technical: "bg-purple-50 text-purple-700",
  Cultural: "bg-pink-50 text-pink-700",
  Academic: "bg-blue-50 text-blue-700",
  Management: "bg-amber-50 text-amber-700",
  Sports: "bg-green-50 text-green-700",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function EventManager() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({ title: "", date: "", time: "", venue: "", category: "Technical", status: "Upcoming", attendees: "" });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        if (list.length === 0) {
          const seeded = [];
          for (const item of INITIAL_EVENTS) {
            const docRef = await addDoc(collection(db, "events"), {
              title: item.title,
              date: item.date,
              time: item.time,
              venue: item.venue,
              category: item.category,
              status: item.status,
              attendees: item.attendees,
            });
            seeded.push({ id: docRef.id, ...item });
          }
          setEvents(seeded);
        } else {
          setEvents(list);
        }
      } catch (err) {
        console.error("Firestore error:", err);
      }
    };
    fetchEvents();
  }, []);

  const FILTERS = ["All", "Upcoming", "Completed"];

  const filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || e.status === filter;
    return matchSearch && matchFilter;
  });

  const openAdd = () => {
    setEditingEvent(null);
    setForm({ title: "", date: "", time: "", venue: "", category: "Technical", status: "Upcoming", attendees: "" });
    setShowModal(true);
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    setForm({ title: event.title, date: event.date, time: event.time, venue: event.venue, category: event.category, status: event.status, attendees: String(event.attendees) });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    const dataToSave = { ...form, attendees: Number(form.attendees) || 0 };
    try {
      if (editingEvent) {
        const docRef = doc(db, "events", editingEvent.id);
        await updateDoc(docRef, dataToSave);
        setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? { ...e, ...dataToSave } : e)));
      } else {
        const docRef = await addDoc(collection(db, "events"), dataToSave);
        setEvents((prev) => [{ id: docRef.id, ...dataToSave }, ...prev]);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save event:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "events", id));
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">Event Manager</h2>
          <p className="text-[12px] text-slate-500 mt-0.5">{events.filter(e => e.status === "Upcoming").length} upcoming • {events.filter(e => e.status === "Completed").length} completed</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      </motion.div>

      {/* Search + Filters */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events..."
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
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 ${
                filter === f
                  ? "bg-purple-700 text-white border-purple-600 shadow-sm"
                  : "bg-white text-slate-600 border-purple-100 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Event Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl border border-purple-100/60 shadow-sm overflow-hidden hover:shadow-md hover:border-purple-200/80 transition-all duration-200 group"
          >
            {/* Color bar */}
            <div className={`h-1.5 bg-gradient-to-r ${CATEGORY_COLORS[event.category] || "from-slate-400 to-slate-500"}`} />

            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-bold text-slate-800 leading-tight truncate">{event.title}</h4>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_BG[event.category] || "bg-slate-100 text-slate-600"}`}>
                      {event.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLES[event.status]}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <button onClick={() => openEdit(event)} className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-500 transition-colors opacity-0 group-hover:opacity-100" title="Edit">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors opacity-0 group-hover:opacity-100" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 mt-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>{event.attendees} expected attendees</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-10 text-[12px] text-slate-400">No events found.</div>
        )}
      </motion.div>

      {/* ─── Add / Edit Modal ─── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-purple-100 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                  {editingEvent ? "Edit Event" : "Create Event"}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Event Title</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Enter event title..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Date</label>
                    <input type="text" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="e.g. Jul 15, 2026"
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Time</label>
                    <input type="text" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="e.g. 10:00 AM"
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Venue</label>
                  <input type="text" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="Enter venue..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all appearance-none">
                      {Object.keys(CATEGORY_COLORS).map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all appearance-none">
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Expected Attendees</label>
                  <input type="number" value={form.attendees} onChange={(e) => setForm({ ...form, attendees: e.target.value })} placeholder="e.g. 200"
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-purple-200 text-[12px] font-bold text-slate-600 hover:bg-purple-50 transition-colors">Cancel</button>
                <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-md shadow-purple-500/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                  {editingEvent ? "Update Event" : "Create Event"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
