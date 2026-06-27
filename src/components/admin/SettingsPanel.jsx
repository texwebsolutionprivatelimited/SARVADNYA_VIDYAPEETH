import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Globe,
  Phone,
  Mail,
  MapPin,
  User,
  Lock,
  Palette,
  ExternalLink,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function SettingsPanel() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({
    collegeName: "Sarvadnya Vidyapeeth",
    tagline: "Affiliated to Aryabhatta Knowledge University, Patna",
    phone: "+91 98765 43210",
    email: "info@svidyapeeth.edu",
    address: "Near Danapur, Patna, Bihar – 801503",
    website: "www.svidyapeeth.edu",
  });

  const [social, setSocial] = useState({
    facebook: "https://facebook.com/sarvadnyavidyapeeth",
    instagram: "https://instagram.com/sarvadnyavidyapeeth",
    twitter: "https://twitter.com/sv_patna",
    linkedin: "https://linkedin.com/company/sarvadnya-vidyapeeth",
    youtube: "https://youtube.com/@sarvadnyavidyapeeth",
  });

  const [profile, setProfile] = useState({
    name: "Administrator",
    email: "admin@svidyapeeth.edu",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const TABS = [
    { id: "general", label: "General", icon: Globe },
    { id: "social", label: "Social Links", icon: ExternalLink },
    { id: "profile", label: "Admin Profile", icon: User },
  ];

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">Settings</h2>
          <p className="text-[12px] text-slate-500 mt-0.5">Manage site settings and admin profile</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ${
            saved
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-green-500/25"
              : "bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-purple-500/25"
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={fadeUp} className="flex items-center gap-1 bg-white rounded-xl p-1 border border-purple-100/60 shadow-sm w-fit">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-purple-700 hover:bg-purple-50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* Tab Content */}
      {activeTab === "general" && (
        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-6">
          <h3 className="text-[14px] font-extrabold text-slate-900 mb-5 flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-600" />
            General Settings
          </h3>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">College Name</label>
                <input
                  type="text"
                  value={general.collegeName}
                  onChange={(e) => setGeneral({ ...general, collegeName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Tagline</label>
                <input
                  type="text"
                  value={general.tagline}
                  onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Phone
                </label>
                <input
                  type="text"
                  value={general.phone}
                  onChange={(e) => setGeneral({ ...general, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Email
                </label>
                <input
                  type="email"
                  value={general.email}
                  onChange={(e) => setGeneral({ ...general, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Address
                </label>
                <input
                  type="text"
                  value={general.address}
                  onChange={(e) => setGeneral({ ...general, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Website
                </label>
                <input
                  type="text"
                  value={general.website}
                  onChange={(e) => setGeneral({ ...general, website: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "social" && (
        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-6">
          <h3 className="text-[14px] font-extrabold text-slate-900 mb-5 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-purple-600" />
            Social Media Links
          </h3>
          <div className="space-y-4">
            {Object.entries(social).map(([key, value]) => (
              <div key={key}>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider capitalize">{key}</label>
                <input
                  type="url"
                  value={value}
                  onChange={(e) => setSocial({ ...social, [key]: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === "profile" && (
        <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100/60 shadow-sm p-6">
          <h3 className="text-[14px] font-extrabold text-slate-900 mb-5 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-600" />
            Admin Profile
          </h3>
          <div className="space-y-5">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-purple-300/30 border-3 border-white">
                A
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800">{profile.name}</p>
                <p className="text-[11px] text-slate-500">{profile.email}</p>
                <button className="text-[11px] font-bold text-purple-600 hover:text-purple-800 mt-1 transition-colors">Change Avatar</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                />
              </div>
            </div>

            <div className="border-t border-purple-100/60 pt-5">
              <h4 className="text-[13px] font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-purple-600" />
                Change Password
              </h4>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Current Password</label>
                  <input
                    type="password"
                    value={profile.currentPassword}
                    onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">New Password</label>
                  <input
                    type="password"
                    value={profile.newPassword}
                    onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Confirm New Password</label>
                  <input
                    type="password"
                    value={profile.confirmPassword}
                    onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-300 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
