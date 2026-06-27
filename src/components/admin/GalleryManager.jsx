import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Upload,
  Trash2,
  X,
  Image,
  FolderOpen,
  Grid3X3,
  Eye,
  MapPin,
} from "lucide-react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const ALBUMS = ["All", "Campus Tour", "Events", "Hackathon 2026", "Cultural Fest", "Hostel", "Classroom"];

const POST_AREAS = [
  { value: "home", label: "Home Page", color: "bg-purple-100 text-purple-700" },
  { value: "about", label: "About Page", color: "bg-blue-100 text-blue-700" },
  { value: "campus", label: "Campus Page", color: "bg-green-100 text-green-700" },
  { value: "hostel", label: "Hostel Page", color: "bg-amber-100 text-amber-700" },
  { value: "placements", label: "Placements Page", color: "bg-cyan-100 text-cyan-700" },
  { value: "events", label: "Events Page", color: "bg-pink-100 text-pink-700" },
  { value: "blog", label: "Blog Section", color: "bg-indigo-100 text-indigo-700" },
];

const INITIAL_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop", album: "Campus Tour", title: "Main Building Entrance", date: "Jun 25, 2026", postArea: "home" },
  { id: 2, src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop", album: "Campus Tour", title: "Campus Aerial View", date: "Jun 25, 2026", postArea: "campus" },
  { id: 3, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop", album: "Classroom", title: "Smart Classroom Session", date: "Jun 22, 2026", postArea: "about" },
  { id: 4, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", album: "Events", title: "Seminar Hall Event", date: "Jun 20, 2026", postArea: "events" },
  { id: 5, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop", album: "Hackathon 2026", title: "Coding Session", date: "Jun 18, 2026", postArea: "events" },
  { id: 6, src: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=400&h=300&fit=crop", album: "Cultural Fest", title: "Dance Performance", date: "Jun 15, 2026", postArea: "home" },
  { id: 7, src: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop", album: "Hostel", title: "Hostel Common Room", date: "Jun 12, 2026", postArea: "hostel" },
  { id: 8, src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=300&fit=crop", album: "Classroom", title: "Computer Lab", date: "Jun 10, 2026", postArea: "campus" },
  { id: 9, src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop", album: "Campus Tour", title: "Student Activity Zone", date: "Jun 08, 2026", postArea: "campus" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState("All");
  const [showUpload, setShowUpload] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [form, setForm] = useState({ title: "", album: "Campus Tour", postArea: "home" });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        if (list.length === 0) {
          const seeded = [];
          for (const item of INITIAL_IMAGES) {
            const docRef = await addDoc(collection(db, "gallery"), {
              src: item.src,
              album: item.album,
              title: item.title,
              date: item.date,
              postArea: item.postArea,
            });
            seeded.push({ id: docRef.id, ...item });
          }
          setImages(seeded);
        } else {
          setImages(list);
        }
      } catch (err) {
        console.error("Firestore error:", err);
      }
    };
    fetchImages();
  }, []);

  const filtered = activeAlbum === "All" ? images : images.filter((img) => img.album === activeAlbum);

  const handleUpload = async () => {
    if (!form.title.trim()) return;
    const newImage = {
      src: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      album: form.album,
      title: form.title,
      postArea: form.postArea,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    try {
      const docRef = await addDoc(collection(db, "gallery"), newImage);
      setImages((prev) => [{ id: docRef.id, ...newImage }, ...prev]);
      setShowUpload(false);
      setForm({ title: "", album: "Campus Tour", postArea: "home" });
    } catch (err) {
      console.error("Failed to upload image:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "gallery", id));
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">Gallery Manager</h2>
          <p className="text-[12px] text-slate-500 mt-0.5">{images.length} images across {ALBUMS.length - 1} albums</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <Upload className="w-4 h-4" />
          Upload Photos
        </button>
      </motion.div>

      {/* Album Filters */}
      <motion.div variants={fadeUp} className="flex items-center gap-2 flex-wrap">
        <FolderOpen className="w-4 h-4 text-purple-500" />
        {ALBUMS.map((album) => {
          const count = album === "All" ? images.length : images.filter((img) => img.album === album).length;
          return (
            <button
              key={album}
              onClick={() => setActiveAlbum(album)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 ${
                activeAlbum === album
                  ? "bg-purple-700 text-white border-purple-600 shadow-sm"
                  : "bg-white text-slate-600 border-purple-100 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {album} ({count})
            </button>
          );
        })}
      </motion.div>

      {/* Image Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((img) => (
          <div key={img.id} className="relative rounded-xl overflow-hidden bg-slate-100 group aspect-[4/3] shadow-sm hover:shadow-lg transition-all duration-300">
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <p className="text-[11px] font-bold text-white truncate">{img.title}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-[9px] text-white/70">{img.album}</p>
                {img.postArea && (() => {
                  const area = POST_AREAS.find(a => a.value === img.postArea);
                  return area ? (
                    <span className="flex items-center gap-0.5 text-[8px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded">
                      <MapPin className="w-2 h-2" />{area.label.replace(' Page', '')}
                    </span>
                  ) : null;
                })()}
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <button onClick={() => setPreviewImage(img)} className="p-1 rounded-md bg-white/20 hover:bg-white/40 text-white transition-colors">
                  <Eye className="w-3 h-3" />
                </button>
                <button onClick={() => handleDelete(img.id)} className="p-1 rounded-md bg-red-500/60 hover:bg-red-500/90 text-white transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-[12px] text-slate-400">
            <Image className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            No images in this album.
          </div>
        )}
      </motion.div>

      {/* ─── Upload Modal ─── */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowUpload(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-purple-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">Upload Photos</h3>
                <button onClick={() => setShowUpload(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 mb-4 ${
                  dragActive ? "border-purple-400 bg-purple-50" : "border-purple-200 bg-purple-50/30"
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
              >
                <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-[12px] font-bold text-slate-700">Drag & drop images here</p>
                <p className="text-[11px] text-slate-400 mt-1">or click to browse</p>
                <p className="text-[10px] text-slate-400 mt-2">Supports: JPG, PNG, WebP (Max 5MB each)</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Photo title..."
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Album</label>
                    <select
                      value={form.album}
                      onChange={(e) => setForm({ ...form, album: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all appearance-none"
                    >
                      {ALBUMS.filter((a) => a !== "All").map((album) => (
                        <option key={album} value={album}>{album}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Post Area
                    </label>
                    <select
                      value={form.postArea}
                      onChange={(e) => setForm({ ...form, postArea: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all appearance-none"
                    >
                      {POST_AREAS.map((area) => (
                        <option key={area.value} value={area.value}>{area.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Post Area Preview */}
                {form.postArea && (() => {
                  const area = POST_AREAS.find(a => a.value === form.postArea);
                  return area ? (
                    <div className={`flex items-center gap-2 p-2.5 rounded-xl border ${area.color.includes('purple') ? 'border-purple-200' : area.color.includes('blue') ? 'border-blue-200' : area.color.includes('green') ? 'border-green-200' : area.color.includes('amber') ? 'border-amber-200' : area.color.includes('cyan') ? 'border-cyan-200' : area.color.includes('pink') ? 'border-pink-200' : 'border-indigo-200'} ${area.color} bg-opacity-50`}>
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold">This image will appear on: {area.label}</span>
                    </div>
                  ) : null;
                })()}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowUpload(false)} className="px-4 py-2 rounded-xl border border-purple-200 text-[12px] font-bold text-slate-600 hover:bg-purple-50 transition-colors">Cancel</button>
                <button onClick={handleUpload} className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[12px] font-bold shadow-md shadow-purple-500/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">Upload</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Image Preview Modal ─── */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setPreviewImage(null)} className="absolute -top-10 right-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <img src={previewImage.src} alt={previewImage.title} className="w-full rounded-2xl shadow-2xl" />
              <div className="mt-3 text-center">
                <p className="text-[14px] font-bold text-white">{previewImage.title}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <p className="text-[11px] text-white/60">{previewImage.album} • {previewImage.date}</p>
                  {previewImage.postArea && (() => {
                    const area = POST_AREAS.find(a => a.value === previewImage.postArea);
                    return area ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold bg-white/15 text-white px-2 py-0.5 rounded-full">
                        <MapPin className="w-2.5 h-2.5" />{area.label}
                      </span>
                    ) : null;
                  })()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
