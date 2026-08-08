import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, onAuthStateChanged, signOut } from "../../firebase";
import AdminLoginPage from "./AdminLoginPage";
import AdminLayout from "../../components/admin/AdminLayout";
import DashboardPage from "./DashboardPage";
import BlogManagerPage from "./BlogManagerPage";
import FaqManagerPage from "./FaqManagerPage";
import EventManagerPage from "./EventManagerPage";
import EnquiryManagerPage from "./EnquiryManagerPage";
import GalleryManagerPage from "./GalleryManagerPage";
import PlacementManagerPage from "./PlacementManagerPage";
import NoticeManagerPage from "./NoticeManagerPage";
import SettingsPanelPage from "./SettingsPanelPage";
import TestimonialManagerPage from "./TestimonialManagerPage";

export default function AdminPanelPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isSessionActive = sessionStorage.getItem("admin_authenticated") === "true";
    if (!isSessionActive && auth && auth.currentUser) {
      signOut(auth).catch(() => {});
    }

    let unsubscribe = () => {};

    if (auth) {
      try {
        unsubscribe = onAuthStateChanged(
          auth,
          (currentUser) => {
            const active = sessionStorage.getItem("admin_authenticated") === "true";
            if ((currentUser || active) && active) {
              setUser(currentUser || { email: "admin@sarvadnya.com", displayName: "Admin" });
            } else {
              setUser(null);
            }
            setLoading(false);
          },
          (err) => {
            console.warn("Firebase Auth listener caught error:", err);
            const active = sessionStorage.getItem("admin_authenticated") === "true";
            setUser(active ? { email: "admin@sarvadnya.com", displayName: "Admin" } : null);
            setLoading(false);
          }
        );
      } catch (e) {
        console.warn("onAuthStateChanged subscribe error:", e);
        const active = sessionStorage.getItem("admin_authenticated") === "true";
        setUser(active ? { email: "admin@sarvadnya.com", displayName: "Admin" } : null);
        setLoading(false);
      }
    } else {
      const active = sessionStorage.getItem("admin_authenticated") === "true";
      setUser(active ? { email: "admin@sarvadnya.com", displayName: "Admin" } : null);
      setLoading(false);
    }

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (!user) {
    return <AdminLoginPage />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="blogs" element={<BlogManagerPage />} />
        <Route path="faqs" element={<FaqManagerPage />} />
        <Route path="brochures" element={<Navigate to="/adminpanel/faqs" replace />} />
        <Route path="events" element={<EventManagerPage />} />
        <Route path="enquiries" element={<EnquiryManagerPage />} />
        <Route path="gallery" element={<GalleryManagerPage />} />
        <Route path="placements" element={<PlacementManagerPage />} />
        <Route path="notices" element={<NoticeManagerPage />} />
        <Route path="testimonials" element={<TestimonialManagerPage />} />
        <Route path="settings" element={<SettingsPanelPage />} />
        <Route path="*" element={<Navigate to="/adminpanel" replace />} />
      </Route>
    </Routes>
  );
}
