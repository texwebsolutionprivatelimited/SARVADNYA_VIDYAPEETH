import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
