import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, onAuthStateChanged, signOut } from "../../firebase";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import BlogManager from "./BlogManager";
import FaqManager from "./FaqManager";
import EventManager from "./EventManager";
import EnquiryManager from "./EnquiryManager";
import GalleryManager from "./GalleryManager";
import PlacementManager from "./PlacementManager";
import NoticeManager from "./NoticeManager";
import SettingsPanel from "./SettingsPanel";
import TestimonialManager from "./TestimonialManager";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isSessionActive = sessionStorage.getItem("admin_authenticated") === "true";
    if (!isSessionActive && auth.currentUser) {
      signOut(auth);
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const active = sessionStorage.getItem("admin_authenticated") === "true";
      if (currentUser && active) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
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
        <Route path="faqs" element={<FaqManager />} />
        <Route path="brochures" element={<Navigate to="/adminpanel/faqs" replace />} />
        <Route path="events" element={<EventManager />} />
        <Route path="enquiries" element={<EnquiryManager />} />
        <Route path="gallery" element={<GalleryManager />} />
        <Route path="placements" element={<PlacementManager />} />
        <Route path="notices" element={<NoticeManager />} />
        <Route path="testimonials" element={<TestimonialManager />} />
        <Route path="settings" element={<SettingsPanel />} />
        <Route path="*" element={<Navigate to="/adminpanel" replace />} />
      </Route>
    </Routes>
  );
}
