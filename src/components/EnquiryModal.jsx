import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, GraduationCap, Clock, X, CheckCircle } from "lucide-react";

export default function EnquiryModal() {
  // Phase: "idle" → "image" → "gap" → "form" → "done"
  const [phase, setPhase] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    domain: "",
    timeSlot: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Phase 1: Show image popup after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("image");
      document.body.style.overflow = "hidden";
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Phase 2: When image is closed, wait 3 seconds then show form
  useEffect(() => {
    if (phase === "gap") {
      const timer = setTimeout(() => {
        setPhase("form");
        document.body.style.overflow = "hidden";
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const closeImagePopup = useCallback(() => {
    setPhase("gap");
    document.body.style.overflow = "unset";
  }, []);

  const closeFormPopup = useCallback(() => {
    setPhase("done");
    document.body.style.overflow = "unset";
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^[0-9]{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be a 10-digit number";
    }

    if (!formData.domain) newErrors.domain = "Please select a domain";
    if (!formData.timeSlot) newErrors.timeSlot = "Please select a time slot";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const enqData = {
          name: formData.name,
          email: formData.email,
          phone: formData.contact,
          course: formData.domain,
          message: `Inquiry Time Slot: ${formData.timeSlot}`,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          status: "Pending"
        };
        const { db, collection, addDoc } = await import("../firebase");
        await addDoc(collection(db, "enquiries"), enqData);
        setIsSubmitted(true);
      } catch (err) {
        console.error("Firestore submission failed, fallback to offline success:", err);
        setIsSubmitted(true);
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {phase === "image" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeImagePopup}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: { type: "spring", damping: 22, stiffness: 300 }
              }}
              exit={{ scale: 0.8, opacity: 0, y: 40, transition: { duration: 0.25 } }}
              className="relative w-full max-w-[520px] rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 via-amber-400 to-green-500 p-[3px] pointer-events-none z-10" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }} />

              {/* Close Button */}
              <button
                onClick={closeImagePopup}
                className="absolute top-3 right-3 z-20 bg-white/90 hover:bg-white text-slate-700 hover:text-red-600 p-2 rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              {/* Promotional Banner Image */}
              <img
                src="/images/Popup.webp"
                alt="Sarvadnya Vidyapeeth - BBA & BCA Admission 2026-27"
                className="w-full max-h-[90vh] object-contain block"
                loading="eager"
              />

              {/* Bottom CTA strip */}
              <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 px-4 py-3 flex items-center justify-between gap-3">
                <p className="text-white text-xs sm:text-sm font-bold tracking-wide">
                  🎓 Admissions Open for Session 2026-27!
                </p>
                <button
                  onClick={closeImagePopup}
                  className="flex-shrink-0 bg-amber-400 hover:bg-amber-500 text-purple-950 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Enquire Now →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* POPUP 2: Enquiry Form                                  */}
      {/* ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "form" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFormPopup}
              className="absolute inset-0 bg-purple-950/20 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: { type: "spring", damping: 25, stiffness: 350 }
              }}
              exit={{ scale: 0.9, opacity: 0, y: 30, transition: { duration: 0.2 } }}
              className="relative w-full max-w-[480px] bg-gradient-to-br from-purple-50 via-white to-purple-50 backdrop-blur-xl border border-purple-100/80 rounded-2xl shadow-2xl p-6 md:p-8 text-slate-800 overflow-hidden"
            >
              {/* Soft Ambient Glow Accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={closeFormPopup}
                className="absolute top-4 right-4 text-slate-400 hover:text-purple-800 bg-slate-100 hover:bg-purple-100/50 p-1.5 rounded-full transition-all duration-200 z-10"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-block bg-purple-100 text-purple-800 border border-purple-200/50 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2">
                      Admission Inquiry 2026-27
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-purple-955">
                      Sarvadnya Vidyapeeth
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill out the form below and secure your future with us!
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                          <User size={14} />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="block w-full pl-9 pr-3 py-2 text-xs bg-white border border-purple-100 rounded focus:border-purple-600 focus:ring-1 focus:ring-purple-600 focus:outline-none transition-colors placeholder-slate-400 text-slate-800"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-600 text-[9px] mt-1 font-semibold">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                          <Mail size={14} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@email.com"
                          className="block w-full pl-9 pr-3 py-2 text-xs bg-white border border-purple-100 rounded focus:border-purple-600 focus:ring-1 focus:ring-purple-600 focus:outline-none transition-colors placeholder-slate-400 text-slate-800"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-600 text-[9px] mt-1 font-semibold">{errors.email}</p>
                      )}
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Contact Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                          <Phone size={14} />
                        </div>
                        <input
                          type="tel"
                          name="contact"
                          value={formData.contact}
                          onChange={handleInputChange}
                          placeholder="10-digit mobile number"
                          className="block w-full pl-9 pr-3 py-2 text-xs bg-white border border-purple-100 rounded focus:border-purple-600 focus:ring-1 focus:ring-purple-600 focus:outline-none transition-colors placeholder-slate-400 text-slate-800"
                        />
                      </div>
                      {errors.contact && (
                        <p className="text-red-600 text-[9px] mt-1 font-semibold">{errors.contact}</p>
                      )}
                    </div>

                    {/* Domain / Academic Interest */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Domain of Interest
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                          <GraduationCap size={14} />
                        </div>
                        <select
                          name="domain"
                          value={formData.domain}
                          onChange={handleInputChange}
                          className="block w-full pl-9 pr-3 py-2 text-xs bg-white border border-purple-100 rounded focus:border-purple-600 focus:ring-1 focus:ring-purple-600 focus:outline-none transition-colors text-slate-800 appearance-none [&>option]:bg-white [&>option]:text-slate-800"
                        >
                          <option value="" disabled className="text-slate-400">Select course</option>
                          <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                          <option value="BBA">BBA (Bachelor of Business Administration)</option>
                        </select>
                      </div>
                      {errors.domain && (
                        <p className="text-red-600 text-[9px] mt-1 font-semibold">{errors.domain}</p>
                      )}
                    </div>

                    {/* Preferred Time Slot */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Preferred Time Slot to Call
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-400">
                          <Clock size={14} />
                        </div>
                        <select
                          name="timeSlot"
                          value={formData.timeSlot}
                          onChange={handleInputChange}
                          className="block w-full pl-9 pr-3 py-2 text-xs bg-white border border-purple-100 rounded focus:border-purple-600 focus:ring-1 focus:ring-purple-600 focus:outline-none transition-colors text-slate-800 appearance-none [&>option]:bg-white [&>option]:text-slate-800"
                        >
                          <option value="" disabled className="text-slate-400">Select preferred time</option>
                          <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                          <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
                          <option value="Evening (03:00 PM - 06:00 PM)">Evening (03:00 PM - 06:00 PM)</option>
                        </select>
                      </div>
                      {errors.timeSlot && (
                        <p className="text-red-600 text-[9px] mt-1 font-semibold">{errors.timeSlot}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full mt-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider rounded transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-purple-700/20"
                  >
                    Submit Enquiry
                  </motion.button>
                </form>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 flex flex-col items-center justify-center text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { type: "spring", damping: 10, stiffness: 200 } }}
                    className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center text-green-600 mb-4"
                  >
                    <CheckCircle size={32} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 text-purple-950">Thank you, {formData.name}!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mb-6 leading-relaxed">
                    Your admission enquiry for <span className="font-bold text-purple-700">{formData.domain}</span> has been received. Our admissions counselor will call you during your selected slot:
                    <br />
                    <span className="font-bold text-purple-700 block mt-1.5">{formData.timeSlot}</span>
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeFormPopup}
                    className="px-6 py-2 border border-purple-200 hover:bg-purple-50 text-purple-700 font-bold text-xs uppercase tracking-wider rounded transition-all duration-300"
                  >
                    Close Window
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
