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
import { Suspense, lazy } from "react"
import ContactPage from "./pages/ContactPage"
import MandatoryDisclosurePage from "./pages/MandatoryDisclosurePage"
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"
import TermsConditionsPage from "./pages/TermsConditionsPage"
import RefundPolicyPage from "./pages/RefundPolicyPage"
import GrievanceRedressalPage from "./pages/GrievanceRedressalPage"
import BlogDetailPage from "./pages/BlogDetailPage"
import AdminPanelPage from "./pages/admin/AdminPanelPage"
import ERPExternalRedirect from "./pages/ERPExternalRedirect"

// Dynamic optional imports for ERP (Allows removing or separating the erp folder without breaking website)
const erpModules = import.meta.glob(['../erp/frontend/**/*.{jsx,js}', './erp/frontend/**/*.{jsx,js}']);

function getErpComponent(paths, role) {
  for (const p of paths) {
    if (erpModules[p]) {
      return lazy(erpModules[p]);
    }
  }
  return () => <ERPExternalRedirect role={role} />;
}

const StudentLoginPage = getErpComponent(['../erp/frontend/auth/StudentLoginPage.jsx', './erp/frontend/auth/StudentLoginPage.jsx'], "Student ERP Portal");
const TeacherLoginPage = getErpComponent(['../erp/frontend/auth/TeacherLoginPage.jsx', './erp/frontend/auth/TeacherLoginPage.jsx'], "Teacher & Faculty ERP");
const SuperAdminLoginPage = getErpComponent(['../erp/frontend/auth/SuperAdminLoginPage.jsx', './erp/frontend/auth/SuperAdminLoginPage.jsx'], "Super Admin Control");
const StudentERPPage = getErpComponent(['../erp/frontend/student/StudentERPPage.jsx', './erp/frontend/student/StudentERPPage.jsx'], "Student ERP Dashboard");
const TeacherERPPage = getErpComponent(['../erp/frontend/teacher/TeacherERPPage.jsx', './erp/frontend/teacher/TeacherERPPage.jsx'], "Teacher ERP Dashboard");
const SuperAdminERPPage = getErpComponent(['../erp/frontend/superadmin/SuperAdminERPPage.jsx', './erp/frontend/superadmin/SuperAdminERPPage.jsx'], "Super Admin Dashboard");
const ERPPortalPage = getErpComponent(['../erp/frontend/ERPPortalPage.jsx', './erp/frontend/ERPPortalPage.jsx'], "Campus ERP Gateway");

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-xs font-bold">Loading ERP System...</div>}>
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
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-conditions" element={<TermsConditionsPage />} />
            <Route path="terms-and-conditions" element={<TermsConditionsPage />} />
            <Route path="refund-policy" element={<RefundPolicyPage />} />
            <Route path="cancellation-refund-policy" element={<RefundPolicyPage />} />
            <Route path="grievance-redressal" element={<GrievanceRedressalPage />} />
            <Route path="anti-ragging-policy" element={<GrievanceRedressalPage />} />
            <Route path="blog/:id" element={<BlogDetailPage />} />
            <Route path="blogs/:id" element={<BlogDetailPage />} />
          </Route>

          {/* Standalone ERP Gateway Entrance */}
          <Route path="/erp" element={<ERPPortalPage />} />

          {/* Dedicated ERP Login Pages */}
          <Route path="/student" element={<StudentLoginPage />} />
          <Route path="/student-login" element={<StudentLoginPage />} />
          <Route path="/teacher" element={<TeacherLoginPage />} />
          <Route path="/teacher-login" element={<TeacherLoginPage />} />
          <Route path="/staff" element={<TeacherLoginPage />} />
          <Route path="/staff-login" element={<TeacherLoginPage />} />
          <Route path="/superadmin" element={<SuperAdminLoginPage />} />
          <Route path="/superadmin-login" element={<SuperAdminLoginPage />} />

          {/* Student ERP Dashboard */}
          <Route path="/student-dashboard/*" element={<StudentERPPage />} />
          {/* Teacher ERP Dashboard */}
          <Route path="/teacher-dashboard/*" element={<TeacherERPPage />} />
          {/* Super Admin ERP Dashboard */}
          <Route path="/superadmin-dashboard/*" element={<SuperAdminERPPage />} />

          {/* Admin Panel */}
          <Route path="/adminpanel/*" element={<AdminPanelPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
