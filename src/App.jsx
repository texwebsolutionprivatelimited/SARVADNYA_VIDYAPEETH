import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/common/Layout"
import Home from "./pages/Home"
import AboutPage from "./pages/about/AboutPage"
import CoursesPage from "./pages/CoursesPage"
import BbaPage from "./pages/departments/BbaPage"
import BcaPage from "./pages/departments/BcaPage"
import CampusPage from "./pages/CampusPage"
import PlacementsPage from "./pages/PlacementsPage"
import HostelPage from "./pages/HostelPage"
import LiveClassesPage from "./pages/LiveClassesPage"
import EventsPage from "./pages/EventsPage"
import AdmissionPage from "./pages/AdmissionPage"
import ContactPage from "./pages/ContactPage"
import MandatoryDisclosurePage from "./pages/MandatoryDisclosurePage"
import BlogDetailPage from "./pages/BlogDetailPage"
import AdminPanel from "./components/admin/AdminPanel"
import StudentLogin from "./components/ERP/studentLogin/StudentLogin"
import StaffLogin from "./components/ERP/staffLogin/StaffLogin"
import StudentERP from "./components/ERP/studentDashboard/StudentERP"
import SuperAdminLogin from "./components/ERP/superadmin/SuperAdminLogin"
import SuperAdminERP from "./components/ERP/superadmin/SuperAdminERP"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/bba" element={<BbaPage />} />
          <Route path="courses/bca" element={<BcaPage />} />
          <Route path="campus" element={<CampusPage />} />
          <Route path="placements" element={<PlacementsPage />} />
          <Route path="hostel" element={<HostelPage />} />
          <Route path="live-classes" element={<LiveClassesPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="admission" element={<AdmissionPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="mandatory-disclosure" element={<MandatoryDisclosurePage />} />
          <Route path="blog/:id" element={<BlogDetailPage />} />
          <Route path="blogs/:id" element={<BlogDetailPage />} />
        </Route>
        {/* Dedicated ERP Login Pages */}
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/staff" element={<StaffLogin />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/superadmin" element={<SuperAdminLogin />} />
        <Route path="/superadmin-login" element={<SuperAdminLogin />} />
        {/* Student ERP Dashboard — separate layout */}
        <Route path="/student-dashboard/*" element={<StudentERP />} />
        {/* Super Admin ERP Dashboard */}
        <Route path="/superadmin-dashboard/*" element={<SuperAdminERP />} />
        {/* Admin Panel — separate layout (no Navbar/Footer) */}
        <Route path="/adminpanel/*" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
