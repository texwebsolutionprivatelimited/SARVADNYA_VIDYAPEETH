import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import AdminLogin from "../components/admin/AdminLogin";
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../components/admin/Dashboard";
import BlogManager from "../components/admin/BlogManager";
import BrochureManager from "../components/admin/BrochureManager";
import EventManager from "../components/admin/EventManager";
import EnquiryManager from "../components/admin/EnquiryManager";
import GalleryManager from "../components/admin/GalleryManager";
import PlacementManager from "../components/admin/PlacementManager";
import NoticeManager from "../components/admin/NoticeManager";
import SettingsPanel from "../components/admin/SettingsPanel";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="blogs" element={<BlogManager />} />
        <Route path="brochures" element={<BrochureManager />} />
        <Route path="events" element={<EventManager />} />
        <Route path="enquiries" element={<EnquiryManager />} />
        <Route path="gallery" element={<GalleryManager />} />
        <Route path="placements" element={<PlacementManager />} />
        <Route path="notices" element={<NoticeManager />} />
        <Route path="settings" element={<SettingsPanel />} />
        <Route path="*" element={<Navigate to="/adminpanel" replace />} />
      </Route>
    </Routes>
  );
}
