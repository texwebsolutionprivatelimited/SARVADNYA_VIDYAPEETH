import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "../components/Animations";
import SectionHeading from "../components/SectionHeading";
import { 
  Bed, 
  Utensils, 
  ShieldCheck, 
  Wifi, 
  Sparkles, 
  BookOpen, 
  Activity, 
  Clock, 
  Phone, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  HeartHandshake 
} from "lucide-react";

export default function HostelPage() {
  const [activeMenuDay, setActiveMenuDay] = useState("Mon");
  const [openAccordion, setOpenAccordion] = useState(0);

  const features = [
    { text: "Separate Hostel for Boys & Girls", icon: <Users className="w-4 h-4 text-purple-650" /> },
    { text: "Safe & Secure Campus Environment", icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
    { text: "24×7 Security & CCTV Surveillance", icon: <ShieldCheck className="w-4 h-4 text-indigo-500" /> },
    { text: "Clean & Hygienic Fully-Furnished Rooms", icon: <Bed className="w-4 h-4 text-blue-500" /> },
    { text: "Nutritious Food & Large Dining Facility", icon: <Utensils className="w-4 h-4 text-amber-500" /> },
    { text: "High-Speed Wi-Fi Internet Access", icon: <Wifi className="w-4 h-4 text-teal-500" /> },
    { text: "Silent Study Rooms & Lively Common Areas", icon: <BookOpen className="w-4 h-4 text-purple-500" /> },
    { text: "Regular Housekeeping & Hygiene Maintenance", icon: <Sparkles className="w-4 h-4 text-emerald-600" /> },
    { text: "Medical Assistance & Emergency Support", icon: <Activity className="w-4 h-4 text-rose-500" /> },
    { text: "Recreation & Indoor Play Facilities", icon: <HeartHandshake className="w-4 h-4 text-amber-600" /> }
  ];

  const weeklyMenu = {
    Mon: { breakfast: "Aloo Paratha, Curd, Butter, Tea", lunch: "Jeera Rice, Dal Tadka, Seasonal Veg, Salad, Roti", snacks: "Samosa, Evening Tea", dinner: "Plain Rice, Paneer Butter Masala, Roti, Kheer" },
    Tue: { breakfast: "Idli Sambar, Coconut Chutney, Tea/Coffee", lunch: "Veg Pulao, Kadhi Pakora, Papad, Chapati", snacks: "Onion Pakoda, Evening Tea", dinner: "Plain Rice, Chicken Curry / Mixed Veg, Roti, Gulab Jamun" },
    Wed: { breakfast: "Poha, Sev, Jalebi, Tea/Coffee", lunch: "Plain Rice, Dal Fry, Aloo Bhujia, Roti, Curd", snacks: "Veg Cutlet, Evening Tea", dinner: "Veg Fried Rice, Manchurian, Salad, Ice Cream" },
    Thu: { breakfast: "Chole Bhature, Pickle, Tea", lunch: "Mix Dal, Seasonal Sabzi, Rice, Chapati, Salad", snacks: "Biscuits & Tea", dinner: "Plain Rice, Egg Curry / Shahi Paneer, Roti, Sweet Pan" },
    Fri: { breakfast: "Uttapam, Tomato Chutney, Tea", lunch: "Rajma Masala, Steamed Rice, Salad, Roti", snacks: "Aloo Tikki, Evening Tea", dinner: "Plain Rice, Kadhai Paneer, Butter Roti, Rasgulla" },
    Sat: { breakfast: "Bread Butter Toast, Omelette / Sprouts, Tea", lunch: "Chana Masala, Rice, Poori, Boondi Raita", snacks: "Dhokla, Evening Tea", dinner: "Veg Biryani, Raita, Roti, Custard" },
    Sun: { breakfast: "Puri Sabji, Halwa, Tea/Coffee", lunch: "Special Thali (Pulav, Dal Makhani, Paneer Pasanda, Naan)", snacks: "Sandwich, Evening Tea", dinner: "Plain Rice, Egg Bhurji / Seasonal Veg, Roti, Gulab Jamun" }
  };

  const rules = [
    {
      title: "Curfew & Timings",
      content: "Hostel gates are locked strictly at 9:30 PM. All resident students must mark their biometric attendance daily between 8:30 PM and 9:15 PM. Late entries are permitted only with prior written warden approval."
    },
    {
      title: "Guest & Visitor Policy",
      content: "No guests are allowed inside the student rooms. Parents and local guardians can meet students in the designated visitor lounge during visiting hours (4:00 PM – 7:00 PM) after logging details at the gate security desk."
    },
    {
      title: "Cleanliness & Room Care",
      content: "Students are responsible for maintaining cleanliness in their individual rooms. Common areas and corridors are cleaned daily by campus housekeeping. Cooking, boiling, or using heavy electrical appliances inside rooms is strictly prohibited."
    },
    {
      title: "Anti-Ragging & Code of Conduct",
      content: "Sarvadnya Vidyapeeth maintains a zero-tolerance policy towards ragging, physical assault, substance abuse, and vandalism. Any violation will lead to immediate expulsion from both the hostel and the academic program."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-hidden">
      {/* ─── Hero Section with Background Image & Home-Page Style Overlay ─── */}
      <section className="relative pt-20 pb-24 bg-slate-900 overflow-hidden text-white border-b border-purple-900/20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img
            src="/images/hostel.png"
            alt="Student Hostel Accommodation"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
        </div>

        {/* L-to-R overlay gradient for maximum image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-10" />

        {/* Glowing Soft Mesh Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center pb-8 pt-12">
            <SectionHeading
              tagline="Accommodation & Living"
              title="Student"
              highlight="Hostel Facility"
              subtitle="A secure, hygienic, and nurturing 'home away from home' for Sarvadnya Vidyapeeth scholars, designed to support educational success and holistic development in Patna."
              align="center"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* ─── Highlights & Overview ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Amenities List */}
            <div className="lg:col-span-7">
              <FadeIn direction="left">
                <span className="bg-purple-50 text-purple-750 border border-purple-100 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-3">
                  Overview & Amenities
                </span>
                <h2 className="font-heading text-3xl md:text-4.5xl font-black text-slate-800 tracking-tight leading-tight mb-4">
                  Homely Comforts & Campus Security
                </h2>
                <p className="text-slate-500 leading-relaxed mb-8 text-sm md:text-base font-semibold">
                  We understand that traveling from distant locations to pursue higher studies is a major transition. Our campus hostel provides separate, fully managed boys and girls wings designed to offer comfort, security, and the ideal studying atmosphere.
                </p>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 border border-slate-100 shadow-sm hover:border-purple-200 transition-all duration-300">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                        {f.icon}
                      </div>
                      <span className="text-xs md:text-sm text-slate-700 font-bold">{f.text}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Dynamic Info Card */}
            <div className="lg:col-span-5">
              <FadeIn direction="right">
                <div className="relative">
                  <div className="rounded-3xl p-8 text-white shadow-xl relative overflow-hidden" style={{
                    background: "linear-gradient(135deg, #100936, #1E105A)"
                  }}>
                    <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 rounded-full pointer-events-none" />
                    
                    <div className="w-14 h-14 rounded-2xl bg-amber-500 text-purple-950 flex items-center justify-center mb-6 shadow-lg">
                      <Bed className="w-8 h-8" />
                    </div>
                    
                    <h3 className="font-heading text-2xl font-black mb-3.5 text-white">Separate Resident Wings</h3>
                    <p className="text-purple-100/80 leading-relaxed text-xs md:text-sm mb-6 font-medium">
                      Both wings are completely isolated from one another with dedicated security desks, separate biometric entry gates, study halls, and dining facilities.
                    </p>
                    
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                      {["Boys Hostel", "Girls Hostel"].map(h => (
                        <div key={h} className="bg-white/10 backdrop-blur-md border border-white/10 hover:border-amber-400/50 transition-colors shadow-sm rounded-2xl p-4 text-center text-xs font-black text-amber-300 uppercase tracking-wider">
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Outer glow shadows */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
                  <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Gallery / Showcase (Rooms & Mess) ─── */}
      <section className="py-14 md:py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="bg-purple-50 text-purple-755 border border-purple-100 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-3">
              Living Spaces & Food
            </span>
            <h2 className="font-heading text-2xl md:text-3.5xl font-black text-slate-800 tracking-tight">
              Hostel Rooms & Dining Experience
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-xs md:text-sm mt-2 leading-relaxed font-semibold">
              Take a closer look at where our students live, rest, and nourish themselves throughout their academic tenure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Cozy Rooms Gallery Card */}
            <FadeIn delay={0.1}>
              <div className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src="/images/hostel_room.png" 
                    alt="Hostel Room Interior"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="bg-purple-600/90 backdrop-blur-sm text-white font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm inline-block mb-2">
                      Cozy Furnished Spaces
                    </span>
                    <h3 className="font-heading text-lg font-black tracking-tight leading-tight">Student Residential Rooms</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4 font-semibold">
                    Each room is fully furnished with standard-size comfortable wooden beds, private study tables, storage wardrobes, clean linens, and features excellent ventilation.
                  </p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-[11px] font-bold text-slate-700">
                    <div className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-purple-600" /> Daily Housekeeping</div>
                    <div className="flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5 text-purple-600" /> High-Speed Internet</div>
                    <div className="flex items-center gap-1.5"><Bed className="w-3.5 h-3.5 text-purple-600" /> Individual Study Desks</div>
                    <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Secure Storage Cabinets</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Cafeteria Dining Gallery Card */}
            <FadeIn delay={0.2}>
              <div className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src="/images/hostel_dining.png" 
                    alt="Hostel Dining Cafeteria"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="bg-amber-500/95 backdrop-blur-sm text-purple-950 font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm inline-block mb-2">
                      Hygienic & Healthy
                    </span>
                    <h3 className="font-heading text-lg font-black tracking-tight leading-tight">Mess & Cafeteria Facilities</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4 font-semibold">
                    The spacious, bright dining cafeteria offers balanced, chef-prepared meals daily. Strictly vegetarian and clean dining protocols ensure nutritious food for healthy minds.
                  </p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-[11px] font-bold text-slate-700">
                    <div className="flex items-center gap-1.5"><Utensils className="w-3.5 h-3.5 text-amber-500" /> 4 Healthy Meals / Day</div>
                    <div className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-500" /> ISO Certified Hygiene</div>
                    <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-amber-500" /> 200+ Seating Capacity</div>
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-500" /> Timely Dining Schedules</div>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ─── Mess Menu Section ─── */}
      <section className="py-14 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="bg-purple-50 text-purple-750 border border-purple-100 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-3">
              Weekly Meal Guide
            </span>
            <h2 className="font-heading text-2xl md:text-3.5xl font-black text-slate-800 tracking-tight">
              A Look at Our Weekly Food Menu
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-xs md:text-sm mt-2 leading-relaxed font-semibold">
              Toggle the tabs below to view the balanced nutrition meals provided to our hostellers every day of the week.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-8 bg-purple-100/40 p-2 rounded-2xl border border-purple-100/50">
              {Object.keys(weeklyMenu).map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveMenuDay(day)}
                  className={`px-3 sm:px-5 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all duration-300 ${
                    activeMenuDay === day
                      ? "bg-purple-600 text-white shadow-md scale-105"
                      : "text-slate-600 hover:bg-purple-50 hover:text-purple-700"
                  }`}
                >
                  <span className="hidden sm:inline">
                    {day === "Mon" ? "Monday" : 
                     day === "Tue" ? "Tuesday" : 
                     day === "Wed" ? "Wednesday" : 
                     day === "Thu" ? "Thursday" : 
                     day === "Fri" ? "Friday" : 
                     day === "Sat" ? "Saturday" : "Sunday"}
                  </span>
                  <span className="inline sm:hidden">{day}</span>
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <FadeIn key={activeMenuDay}>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { meal: "Breakfast", icon: "🍳", desc: weeklyMenu[activeMenuDay].breakfast, color: "border-t-purple-500" },
                  { meal: "Lunch", icon: "🥗", desc: weeklyMenu[activeMenuDay].lunch, color: "border-t-indigo-500" },
                  { meal: "Snacks", icon: "☕", desc: weeklyMenu[activeMenuDay].snacks, color: "border-t-amber-500" },
                  { meal: "Dinner", icon: "🍲", desc: weeklyMenu[activeMenuDay].dinner, color: "border-t-emerald-500" }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white p-5 rounded-2xl border border-slate-100 border-t-4 ${item.color} shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
                  >
                    <div>
                      <div className="text-2xl mb-3">{item.icon}</div>
                      <h4 className="font-heading font-black text-slate-800 text-sm mb-1.5">{item.meal}</h4>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Rules Accordion ─── */}
      <section className="py-14 md:py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="bg-purple-50 text-purple-750 border border-purple-100 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-3">
              Guidelines
            </span>
            <h2 className="font-heading text-2xl md:text-3.5xl font-black text-slate-800 tracking-tight">
              Hostel Rules & Regulations
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-xs md:text-sm mt-2 leading-relaxed font-semibold">
              To maintain academic environment, peace, and security, all residents are required to follow these guidelines.
            </p>
          </div>

          <div className="space-y-4">
            {rules.map((rule, idx) => {
              const isOpen = openAccordion === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-5 text-left font-heading font-black text-sm md:text-base text-slate-800 hover:bg-purple-50/20 transition-colors"
                  >
                    <span>{idx + 1}. {rule.title}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-purple-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-555 leading-relaxed font-semibold border-t border-slate-100">
                      {rule.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Warden Support & CTA ─── */}
      <section className="py-14 md:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-center text-white rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-xl" style={{
            background: "linear-gradient(135deg, #100936, #1E105A)"
          }}>
            {/* Background image with low opacity */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.04]">
              <img
                src="/images/hostel.png"
                alt=""
                className="w-full h-full object-cover filter blur-[2px]"
              />
            </div>

            <div className="lg:col-span-7 space-y-4 relative z-10">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full px-5 py-1.5 text-xs font-black uppercase tracking-widest inline-block">
                Resident Support
              </span>
              <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Hostel Administration <br />
                & Helpdesk Desk
              </h2>
              <p className="text-purple-100 text-xs md:text-sm leading-relaxed max-w-2xl font-semibold">
                Need details regarding rooms availability, allotment procedure, or fee payment schedules? Get in touch with our dedicated warden staff or visit the academic support cells on campus.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 text-xs md:text-sm font-bold text-purple-100">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3.5">
                  <Phone className="w-4 h-4 text-amber-300" />
                  <div>
                    <p className="text-[10px] text-purple-300 uppercase tracking-widest">Boys Warden Desk</p>
                    <p className="text-white font-extrabold">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3.5">
                  <Phone className="w-4 h-4 text-amber-300" />
                  <div>
                    <p className="text-[10px] text-purple-300 uppercase tracking-widest">Girls Warden Desk</p>
                    <p className="text-white font-extrabold">+91 98765 43211</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center items-center gap-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-center max-w-xs w-full shadow-lg">
                <h4 className="font-heading font-black text-amber-300 text-sm uppercase tracking-wide mb-2">Want to Join?</h4>
                <p className="text-xs text-purple-100 leading-relaxed font-semibold mb-4">
                  Hostel allotments are strictly allocated on a first-come, first-served basis at the start of the semester.
                </p>
                <a 
                  href="/admission" 
                  className="inline-block w-full bg-amber-500 hover:bg-amber-600 text-purple-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md hover:scale-102"
                >
                  Apply For Allotment
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
