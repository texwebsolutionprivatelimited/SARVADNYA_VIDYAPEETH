import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  X,
  FileText,
  Filter,
  ChevronDown,
  ImagePlus,
  Upload,
} from "lucide-react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";

const CATEGORIES = ["All", "Technology", "Campus", "Admissions", "Placements", "Events"];

const INITIAL_BLOGS = [
  { id: 1, title: "AI in Modern Education: Shaping Tomorrow's Learners", category: "Technology", status: "Published", date: "Jun 25, 2026", views: 428, author: "Dr. Priya Sharma", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop" },
  { id: 2, title: "BCA Career Roadmap 2026: From Campus to Corporate", category: "Placements", status: "Published", date: "Jun 22, 2026", views: 312, author: "Prof. Vikram Singh", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop" },
  { id: 3, title: "Campus Life at Sarvadnya Vidyapeeth", category: "Campus", status: "Published", date: "Jun 18, 2026", views: 287, author: "Admin", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop" },
  { id: 4, title: "Top 10 Reasons to Choose BBA at SV", category: "Admissions", status: "Draft", date: "Jun 15, 2026", views: 0, author: "Admin", image: null },
  { id: 5, title: "Tarang 2026 Highlights & Memories", category: "Events", status: "Published", date: "Jun 10, 2026", views: 543, author: "Cultural Committee", image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=400&h=250&fit=crop" },
  { id: 6, title: "Mastering Data Structures with Python", category: "Technology", status: "Draft", date: "Jun 08, 2026", views: 0, author: "Prof. Ankit Jha", image: null },
  { id: 7, title: "Scholarship Guide for BSCC Students", category: "Admissions", status: "Published", date: "Jun 05, 2026", views: 198, author: "Admin", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop" },
];

const STATUS_STYLES = {
  Published: "bg-green-50 text-green-700 border-green-200",
  Draft: "bg-amber-50 text-amber-700 border-amber-200",
};

const CATEGORY_COLORS = {
  Technology: "bg-purple-50 text-purple-700",
  Campus: "bg-blue-50 text-blue-700",
  Admissions: "bg-green-50 text-green-700",
  Placements: "bg-amber-50 text-amber-700",
  Events: "bg-pink-50 text-pink-700",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [form, setForm] = useState({ title: "", category: "Technology", status: "Draft", author: "", image: null });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        
        if (list.length === 0) {
          const seeded = [];
          for (const item of INITIAL_BLOGS) {
            const docRef = await addDoc(collection(db, "blogs"), {
              title: item.title,
              category: item.category,
              status: item.status,
              date: item.date,
              views: item.views,
              author: item.author,
              image: item.image || null,
            });
            seeded.push({ id: docRef.id, ...item });
          }
          setBlogs(seeded);
        } else {
          // Sort by timestamp or date if needed, for now just show list
          setBlogs(list);
        }
      } catch (err) {
        console.error("Firestore error:", err);
      }
    };
    fetchBlogs();
  }, []);

  const filtered = blogs.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditingBlog(null);
    setForm({ title: "", category: "Technology", status: "Draft", author: "", image: null });
    setShowModal(true);
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);
    setForm({ title: blog.title, category: blog.category, status: blog.status, author: blog.author, image: blog.image || null });
    setShowModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    try {
      if (editingBlog) {
        const docRef = doc(db, "blogs", editingBlog.id);
        await updateDoc(docRef, form);
        setBlogs((prev) => prev.map((b) => (b.id === editingBlog.id ? { ...b, ...form } : b)));
      } else {
        const newBlogData = {
          ...form,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          views: 0,
        };
        const docRef = await addDoc(collection(db, "blogs"), newBlogData);
        setBlogs((prev) => [{ id: docRef.id, ...newBlogData }, ...prev]);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save blog:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">Blog Manager</h2>
          <p className="text-[12px] text-slate-500 mt-0.5">{blogs.length} total posts • {blogs.filter(b => b.status === "Published").length} published</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          New Blog Post
        </button>
      </motion.div>

      {/* Search + Category Filters */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-100 bg-white text-[12px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-purple-700 text-white border-purple-600 shadow-sm"
                  : "bg-white text-slate-600 border-purple-100 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Blog Table */}
      <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                <th className="px-5 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800">Title</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 hidden lg:table-cell">Views</th>
                <th className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-purple-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((blog, i) => (
                <tr key={blog.id} className={`border-b border-slate-100 hover:bg-purple-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {blog.image ? (
                        <img src={blog.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-purple-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100">
                          <ImagePlus className="w-4 h-4 text-purple-300" />
                        </div>
                      )}
                      <div>
                        <p className="text-[12px] font-bold text-slate-800 truncate max-w-[220px]">{blog.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{blog.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[blog.category] || "bg-slate-100 text-slate-600"}`}>
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${STATUS_STYLES[blog.status]}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500 font-medium hidden lg:table-cell">{blog.date}</td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <Eye className="w-3 h-3" /> {blog.views}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(blog)}
                        className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-600 transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-[12px] text-slate-400">
                    No blog posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
                  {editingBlog ? "Edit Blog Post" : "New Blog Post"}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter blog title..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Author</label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="Author name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all appearance-none"
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all appearance-none"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>
                {/* Cover Image Upload */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Cover Image</label>
                  {form.image ? (
                    <div className="relative rounded-xl overflow-hidden border border-purple-100 group">
                      <img src={form.image} alt="Cover preview" className="w-full h-36 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 rounded-lg bg-white/90 text-[11px] font-bold text-slate-700 hover:bg-white transition-colors">Change</button>
                        <button type="button" onClick={removeImage} className="px-3 py-1.5 rounded-lg bg-red-500/90 text-[11px] font-bold text-white hover:bg-red-600 transition-colors">Remove</button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-purple-200 bg-purple-50/30 hover:bg-purple-50 hover:border-purple-300 rounded-xl p-5 text-center cursor-pointer transition-all duration-200"
                    >
                      <Upload className="w-6 h-6 text-purple-400 mx-auto mb-1.5" />
                      <p className="text-[11px] font-bold text-slate-600">Click to upload cover image</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, WebP (Max 5MB)</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Content</label>
                  <textarea
                    rows={4}
                    placeholder="Write your blog content here..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-purple-200 text-[12px] font-bold text-slate-600 hover:bg-purple-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-md shadow-purple-500/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  {editingBlog ? "Update Post" : "Publish Post"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
