import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  GraduationCap,
  Users,
  ShieldCheck,
  Printer,
  Download,
  ChevronDown,
  ChevronUp,
  Home,
  Award,
  Camera,
  Save,
  Check,
  AlertCircle,
} from "lucide-react";
import { studentProfile } from "../../../../hooks/studentPortalData";

function FormField({
  labelEn,
  labelHi,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  options = [],
  colSpan = 1,
}) {
  const id = `field-${name}`;
  const spanClass =
    colSpan === 2
      ? "sm:col-span-2"
      : colSpan === 3
        ? "sm:col-span-3"
        : colSpan === 4
          ? "sm:col-span-4"
          : "";

  return (
    <div className={spanClass}>
      <label htmlFor={id} className="block mb-1.5">
        <span className="text-[12px] font-semibold text-gray-700">
          {labelEn}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </span>
        <span className="text-[11px] text-gray-400 font-medium ml-1.5">
          / {labelHi}
        </span>
      </label>

      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-3 py-2.5 rounded-lg border text-[13px] font-medium outline-none transition-all duration-200 ${disabled
              ? "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white border-gray-300 text-gray-800 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            }`}
        >
          <option value="">— Select / चुनें —</option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={2}
          className={`w-full px-3 py-2.5 rounded-lg border text-[13px] font-medium outline-none transition-all duration-200 resize-none ${disabled
              ? "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white border-gray-300 text-gray-800 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            }`}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2.5 rounded-lg border text-[13px] font-medium outline-none transition-all duration-200 ${disabled
              ? "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white border-gray-300 text-gray-800 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            }`}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Collapsible Section Wrapper
   ───────────────────────────────────────────────────────── */
function ProfileSection({
  icon: Icon,
  titleEn,
  titleHi,
  iconColor = "text-purple-600",
  iconBg = "bg-purple-50",
  children,
  defaultOpen = true,
  id,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50/80 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        id={id}
        type="button"
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-lg ${iconBg} border border-gray-200 flex items-center justify-center shadow-sm`}
          >
            <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-gray-700">{titleEn}</h3>
            <p className="text-[10px] text-gray-400 font-medium">{titleHi}</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="p-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN — ProfilePage Component (Editable Bilingual Form)
   ───────────────────────────────────────────────────────── */
export default function ProfilePage() {
  const fileRef = useRef(null);

  // Initialize form state from studentProfile
  const [form, setForm] = useState({
    name: studentProfile.name || "",
    nameHindi: "मेराज हुसैन",
    dob: studentProfile.dob || "",
    gender: studentProfile.gender || "",
    bloodGroup: studentProfile.bloodGroup || "",
    category: studentProfile.category || "",
    religion: studentProfile.religion || "",
    nationality: studentProfile.nationality || "",
    motherTongue: studentProfile.motherTongue || "",
    maritalStatus: studentProfile.maritalStatus || "",
    aadhar: studentProfile.aadhar || "",
    email: studentProfile.email || "",
    phone: studentProfile.phone || "",
    alternatePhone: studentProfile.alternatePhone || "",
    collegeName: studentProfile.collegeName || "",
    universityName: studentProfile.universityName || "",
    course: studentProfile.course || "",
    department: studentProfile.department || "",
    year: studentProfile.year || "",
    semester: studentProfile.semester || "",
    section: studentProfile.section || "",
    session: studentProfile.session || "",
    rollNumber: studentProfile.rollNumber || "",
    universityRollNo: studentProfile.universityRollNo || "",
    registrationNo: studentProfile.registrationNo || "",
    admissionDate: studentProfile.admissionDate || "",
    admissionType: studentProfile.admissionType || "",
    status: studentProfile.status || "",
    twelfthBoard: studentProfile.twelfthBoard || "",
    twelfthSchool: studentProfile.twelfthSchool || "",
    twelfthYear: studentProfile.twelfthYear || "",
    twelfthStream: studentProfile.twelfthStream || "",
    twelfthPercentage: studentProfile.twelfthPercentage || "",
    twelfthDivision: studentProfile.twelfthDivision || "",
    tenthBoard: studentProfile.tenthBoard || "",
    tenthSchool: studentProfile.tenthSchool || "",
    tenthYear: studentProfile.tenthYear || "",
    tenthPercentage: studentProfile.tenthPercentage || "",
    tenthDivision: studentProfile.tenthDivision || "",
    permanentAddress: studentProfile.permanentAddress || "",
    permanentCity: studentProfile.permanentCity || "",
    permanentDistrict: studentProfile.permanentDistrict || "",
    permanentState: studentProfile.permanentState || "",
    permanentPincode: studentProfile.permanentPincode || "",
    sameAsPermanent: true,
    correspondenceAddress: studentProfile.correspondenceAddress || "",
    correspondenceCity: studentProfile.correspondenceCity || "",
    correspondenceDistrict: studentProfile.correspondenceDistrict || "",
    correspondenceState: studentProfile.correspondenceState || "",
    correspondencePincode: studentProfile.correspondencePincode || "",
    fatherName: studentProfile.fatherName || "",
    fatherNameHindi: "मोहम्मद हुसैन",
    fatherOccupation: studentProfile.fatherOccupation || "",
    fatherPhone: studentProfile.fatherPhone || "",
    motherName: studentProfile.motherName || "",
    motherNameHindi: "शबनम खातून",
    motherOccupation: studentProfile.motherOccupation || "",
    guardianName: studentProfile.guardianName || "",
    guardianRelation: studentProfile.guardianRelation || "",
    guardianPhone: studentProfile.guardianPhone || "",
    annualFamilyIncome: studentProfile.annualFamilyIncome || "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSaved(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const initials = form.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const stateOptions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
  ];

  return (
    <form onSubmit={handleSave} className="space-y-5 max-w-5xl mx-auto pb-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Student Profile /{" "}
            <span className="text-gray-500 text-base font-semibold">
              छात्र प्रोफ़ाइल
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Fill your details in Hindi &amp; English / अपनी जानकारी हिंदी और
            अंग्रेजी में भरें
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / प्रिंट
          </button>
          <button
            type="submit"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${saved
                ? "bg-emerald-600 text-white shadow-emerald-200"
                : "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200"
              }`}
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Saved! / सहेजा गया!
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Save Profile / प्रोफ़ाइल सहेजें
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Profile Photo & Header Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="h-1.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500" />
        <div className="p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div
              className="relative w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-purple-100 shadow-lg shadow-purple-200 cursor-pointer group"
              onClick={() => fileRef.current?.click()}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-extrabold">
                  {initials}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="text-[10px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors"
            >
              <Camera className="w-3 h-3" />
              Upload Photo / फोटो अपलोड
            </button>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold ${form.status === "Active"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : "bg-red-50 text-red-600 border border-red-200"
                }`}
            >
              ● {form.status}
            </span>
          </div>

          {/* Quick Info */}
          <div className="flex-1 min-w-0 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                labelEn="Full Name (English)"
                labelHi="पूरा नाम (अंग्रेजी)"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
              <FormField
                labelEn="Full Name (Hindi)"
                labelHi="पूरा नाम (हिंदी)"
                name="nameHindi"
                value={form.nameHindi}
                onChange={handleChange}
                placeholder="पूरा नाम दर्ज करें"
                required
              />
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium uppercase">
                  Enrollment / नामांकन
                </p>
                <p className="text-xs font-bold text-purple-700">
                  {form.rollNumber}
                </p>
              </div>
              <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium uppercase">
                  Course / पाठ्यक्रम
                </p>
                <p className="text-xs font-bold text-gray-700">
                  {form.course} ({form.department})
                </p>
              </div>
              <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium uppercase">
                  Year-Sem / वर्ष-सेम
                </p>
                <p className="text-xs font-bold text-gray-700">
                  {form.year} / {form.semester}
                </p>
              </div>
              <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium uppercase">
                  Session / सत्र
                </p>
                <p className="text-xs font-bold text-gray-700">
                  {form.session}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Mandatory Note ── */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 rounded-lg border border-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <p className="text-[11px] text-amber-700 font-medium">
          Fields marked with{" "}
          <span className="text-red-500 font-bold">*</span> are mandatory. /{" "}
          <span className="text-amber-600">
            * चिन्ह वाले फ़ील्ड अनिवार्य हैं।
          </span>
        </p>
      </div>

      {/* ═══════ SECTION 1 — Personal Details ═══════ */}
      <ProfileSection
        icon={User}
        titleEn="Personal Details"
        titleHi="व्यक्तिगत विवरण"
        iconColor="text-purple-600"
        iconBg="bg-purple-50"
        id="section-personal"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-5 gap-y-4">
          <FormField labelEn="Full Name (English)" labelHi="पूरा नाम (अंग्रेजी)" name="name" value={form.name} onChange={handleChange} required />
          <FormField labelEn="Full Name (Hindi)" labelHi="पूरा नाम (हिंदी)" name="nameHindi" value={form.nameHindi} onChange={handleChange} required />
          <FormField labelEn="Date of Birth" labelHi="जन्म तिथि" name="dob" value={form.dob} onChange={handleChange} placeholder="DD-MM-YYYY" required />
          <FormField labelEn="Gender" labelHi="लिंग" name="gender" value={form.gender} onChange={handleChange} type="select" options={["Male", "Female", "Other"]} required />
          <FormField labelEn="Blood Group" labelHi="रक्त समूह" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} type="select" options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />
          <FormField labelEn="Category" labelHi="श्रेणी" name="category" value={form.category} onChange={handleChange} type="select" options={["General", "OBC", "SC", "ST", "EWS"]} required />
          <FormField labelEn="Religion" labelHi="धर्म" name="religion" value={form.religion} onChange={handleChange} type="select" options={["Hindu", "Islam", "Christian", "Sikh", "Buddhist", "Jain", "Other"]} />
          <FormField labelEn="Nationality" labelHi="राष्ट्रीयता" name="nationality" value={form.nationality} onChange={handleChange} placeholder="e.g. Indian" />
          <FormField labelEn="Mother Tongue" labelHi="मातृभाषा" name="motherTongue" value={form.motherTongue} onChange={handleChange} placeholder="e.g. Hindi" />
          <FormField labelEn="Marital Status" labelHi="वैवाहिक स्थिति" name="maritalStatus" value={form.maritalStatus} onChange={handleChange} type="select" options={["Single", "Married"]} />
          <FormField labelEn="Aadhar Number" labelHi="आधार नंबर" name="aadhar" value={form.aadhar} onChange={handleChange} placeholder="XXXX-XXXX-XXXX" />
          <FormField labelEn="Email Address" labelHi="ईमेल पता" name="email" value={form.email} onChange={handleChange} type="email" required />
        </div>
      </ProfileSection>

      {/* ═══════ SECTION 2 — Contact Details ═══════ */}
      <ProfileSection
        icon={Phone}
        titleEn="Contact Details"
        titleHi="संपर्क विवरण"
        iconColor="text-green-600"
        iconBg="bg-green-50"
        id="section-contact"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-5 gap-y-4">
          <FormField labelEn="Mobile Number" labelHi="मोबाइल नंबर" name="phone" value={form.phone} onChange={handleChange} type="tel" required />
          <FormField labelEn="Alternate Mobile" labelHi="वैकल्पिक मोबाइल" name="alternatePhone" value={form.alternatePhone} onChange={handleChange} type="tel" />
          <FormField labelEn="Email Address" labelHi="ईमेल पता" name="email" value={form.email} onChange={handleChange} type="email" colSpan={2} required />
        </div>
      </ProfileSection>

      {/* ═══════ SECTION 3 — Current Course ═══════ */}
      <ProfileSection
        icon={GraduationCap}
        titleEn="Educational Details — Current Course"
        titleHi="शैक्षिक विवरण — वर्तमान पाठ्यक्रम"
        iconColor="text-indigo-600"
        iconBg="bg-indigo-50"
        id="section-education-current"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-5 gap-y-4">
          <FormField labelEn="College Name" labelHi="कॉलेज का नाम" name="collegeName" value={form.collegeName} onChange={handleChange} colSpan={2} disabled />
          <FormField labelEn="University" labelHi="विश्वविद्यालय" name="universityName" value={form.universityName} onChange={handleChange} colSpan={2} disabled />
          <FormField labelEn="Course" labelHi="पाठ्यक्रम" name="course" value={form.course} onChange={handleChange} disabled />
          <FormField labelEn="Department" labelHi="विभाग" name="department" value={form.department} onChange={handleChange} disabled />
          <FormField labelEn="Year" labelHi="वर्ष" name="year" value={form.year} onChange={handleChange} disabled />
          <FormField labelEn="Semester" labelHi="सेमेस्टर" name="semester" value={form.semester} onChange={handleChange} disabled />
          <FormField labelEn="Section" labelHi="अनुभाग" name="section" value={form.section} onChange={handleChange} disabled />
          <FormField labelEn="Session" labelHi="सत्र" name="session" value={form.session} onChange={handleChange} disabled />
          <FormField labelEn="Enrollment No." labelHi="नामांकन संख्या" name="rollNumber" value={form.rollNumber} onChange={handleChange} disabled />
          <FormField labelEn="Univ. Roll No." labelHi="विवि. रोल नं." name="universityRollNo" value={form.universityRollNo} onChange={handleChange} disabled />
          <FormField labelEn="Registration No." labelHi="पंजीकरण संख्या" name="registrationNo" value={form.registrationNo} onChange={handleChange} disabled />
          <FormField labelEn="Admission Date" labelHi="प्रवेश तिथि" name="admissionDate" value={form.admissionDate} onChange={handleChange} disabled />
          <FormField labelEn="Admission Type" labelHi="प्रवेश प्रकार" name="admissionType" value={form.admissionType} onChange={handleChange} disabled />
          <FormField labelEn="Student Status" labelHi="छात्र स्थिति" name="status" value={form.status} onChange={handleChange} disabled />
        </div>
      </ProfileSection>

      {/* ═══════ SECTION 4 — 12th Details ═══════ */}
      <ProfileSection
        icon={Award}
        titleEn="Educational Details — 12th (Intermediate)"
        titleHi="शैक्षिक विवरण — 12वीं (इंटरमीडिएट)"
        iconColor="text-blue-600"
        iconBg="bg-blue-50"
        id="section-education-12th"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-5 gap-y-4">
          <FormField labelEn="Board" labelHi="बोर्ड" name="twelfthBoard" value={form.twelfthBoard} onChange={handleChange} colSpan={2} required />
          <FormField labelEn="School / College" labelHi="स्कूल / कॉलेज" name="twelfthSchool" value={form.twelfthSchool} onChange={handleChange} colSpan={2} required />
          <FormField labelEn="Stream" labelHi="विषय धारा" name="twelfthStream" value={form.twelfthStream} onChange={handleChange} type="select" options={["Science", "Commerce", "Arts"]} required />
          <FormField labelEn="Year of Passing" labelHi="उत्तीर्ण वर्ष" name="twelfthYear" value={form.twelfthYear} onChange={handleChange} required />
          <FormField labelEn="Percentage / CGPA" labelHi="प्रतिशत / सीजीपीए" name="twelfthPercentage" value={form.twelfthPercentage} onChange={handleChange} required />
          <FormField labelEn="Division" labelHi="श्रेणी" name="twelfthDivision" value={form.twelfthDivision} onChange={handleChange} type="select" options={["First", "Second", "Third"]} />
        </div>
      </ProfileSection>

      {/* ═══════ SECTION 5 — 10th Details ═══════ */}
      <ProfileSection
        icon={BookOpen}
        titleEn="Educational Details — 10th (Matriculation)"
        titleHi="शैक्षिक विवरण — 10वीं (मैट्रिक)"
        iconColor="text-teal-600"
        iconBg="bg-teal-50"
        id="section-education-10th"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-5 gap-y-4">
          <FormField labelEn="Board" labelHi="बोर्ड" name="tenthBoard" value={form.tenthBoard} onChange={handleChange} colSpan={2} required />
          <FormField labelEn="School Name" labelHi="स्कूल का नाम" name="tenthSchool" value={form.tenthSchool} onChange={handleChange} colSpan={2} required />
          <FormField labelEn="Year of Passing" labelHi="उत्तीर्ण वर्ष" name="tenthYear" value={form.tenthYear} onChange={handleChange} required />
          <FormField labelEn="Percentage / CGPA" labelHi="प्रतिशत / सीजीपीए" name="tenthPercentage" value={form.tenthPercentage} onChange={handleChange} required />
          <FormField labelEn="Division" labelHi="श्रेणी" name="tenthDivision" value={form.tenthDivision} onChange={handleChange} type="select" options={["First", "Second", "Third"]} />
        </div>
      </ProfileSection>

      {/* ═══════ SECTION 6 — Permanent Address ═══════ */}
      <ProfileSection
        icon={Home}
        titleEn="Permanent Address"
        titleHi="स्थायी पता"
        iconColor="text-orange-600"
        iconBg="bg-orange-50"
        id="section-address-permanent"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-5 gap-y-4">
          <FormField labelEn="Address" labelHi="पता" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} type="textarea" colSpan={4} required />
          <FormField labelEn="City / Town" labelHi="शहर / नगर" name="permanentCity" value={form.permanentCity} onChange={handleChange} required />
          <FormField labelEn="District" labelHi="जिला" name="permanentDistrict" value={form.permanentDistrict} onChange={handleChange} required />
          <FormField labelEn="State" labelHi="राज्य" name="permanentState" value={form.permanentState} onChange={handleChange} type="select" options={stateOptions} required />
          <FormField labelEn="Pin Code" labelHi="पिन कोड" name="permanentPincode" value={form.permanentPincode} onChange={handleChange} required />
        </div>
      </ProfileSection>

      {/* ═══════ SECTION 7 — Correspondence Address ═══════ */}
      <ProfileSection
        icon={MapPin}
        titleEn="Correspondence Address"
        titleHi="पत्राचार पता"
        iconColor="text-rose-600"
        iconBg="bg-rose-50"
        id="section-address-correspondence"
      >
        <label className="flex items-center gap-2.5 mb-4 cursor-pointer select-none">
          <input
            type="checkbox"
            name="sameAsPermanent"
            checked={form.sameAsPermanent}
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
          <span className="text-[12px] font-semibold text-gray-700">
            Same as Permanent Address /{" "}
            <span className="text-gray-400 font-medium">
              स्थायी पते के समान
            </span>
          </span>
        </label>

        {!form.sameAsPermanent && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-5 gap-y-4">
            <FormField labelEn="Address" labelHi="पता" name="correspondenceAddress" value={form.correspondenceAddress} onChange={handleChange} type="textarea" colSpan={4} />
            <FormField labelEn="City / Town" labelHi="शहर / नगर" name="correspondenceCity" value={form.correspondenceCity} onChange={handleChange} />
            <FormField labelEn="District" labelHi="जिला" name="correspondenceDistrict" value={form.correspondenceDistrict} onChange={handleChange} />
            <FormField labelEn="State" labelHi="राज्य" name="correspondenceState" value={form.correspondenceState} onChange={handleChange} type="select" options={stateOptions} />
            <FormField labelEn="Pin Code" labelHi="पिन कोड" name="correspondencePincode" value={form.correspondencePincode} onChange={handleChange} />
          </div>
        )}
      </ProfileSection>

      {/* ═══════ SECTION 8 — Guardian & Family ═══════ */}
      <ProfileSection
        icon={Users}
        titleEn="Guardian & Family Details"
        titleHi="अभिभावक एवं पारिवारिक विवरण"
        iconColor="text-violet-600"
        iconBg="bg-violet-50"
        id="section-guardian"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-5 gap-y-4">
          <FormField labelEn="Father's Name (English)" labelHi="पिता का नाम (अंग्रेजी)" name="fatherName" value={form.fatherName} onChange={handleChange} required />
          <FormField labelEn="Father's Name (Hindi)" labelHi="पिता का नाम (हिंदी)" name="fatherNameHindi" value={form.fatherNameHindi} onChange={handleChange} required />
          <FormField labelEn="Father's Occupation" labelHi="पिता का व्यवसाय" name="fatherOccupation" value={form.fatherOccupation} onChange={handleChange} />
          <FormField labelEn="Father's Mobile" labelHi="पिता का मोबाइल" name="fatherPhone" value={form.fatherPhone} onChange={handleChange} type="tel" />
          <FormField labelEn="Mother's Name (English)" labelHi="माता का नाम (अंग्रेजी)" name="motherName" value={form.motherName} onChange={handleChange} required />
          <FormField labelEn="Mother's Name (Hindi)" labelHi="माता का नाम (हिंदी)" name="motherNameHindi" value={form.motherNameHindi} onChange={handleChange} required />
          <FormField labelEn="Mother's Occupation" labelHi="माता का व्यवसाय" name="motherOccupation" value={form.motherOccupation} onChange={handleChange} />
          <FormField labelEn="Annual Family Income" labelHi="वार्षिक पारिवारिक आय" name="annualFamilyIncome" value={form.annualFamilyIncome} onChange={handleChange} />
          <FormField labelEn="Guardian Name" labelHi="अभिभावक का नाम" name="guardianName" value={form.guardianName} onChange={handleChange} />
          <FormField labelEn="Guardian Relation" labelHi="अभिभावक का संबंध" name="guardianRelation" value={form.guardianRelation} onChange={handleChange} type="select" options={["Father", "Mother", "Uncle", "Aunt", "Brother", "Sister", "Other"]} />
          <FormField labelEn="Guardian Mobile" labelHi="अभिभावक का मोबाइल" name="guardianPhone" value={form.guardianPhone} onChange={handleChange} type="tel" />
        </div>
      </ProfileSection>

      {/* ═══════ SECTION 9 — Faculty Mentor ═══════ */}
      <ProfileSection
        icon={ShieldCheck}
        titleEn="Assigned Faculty Mentor"
        titleHi="नियुक्त संकाय मेंटर"
        iconColor="text-emerald-600"
        iconBg="bg-emerald-50"
        id="section-mentor"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
            {studentProfile.mentorName
              .split(" ")
              .filter(
                (n) =>
                  n !== "Dr." && n !== "Prof." && n !== "Mr." && n !== "Ms."
              )
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">
              {studentProfile.mentorName}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {studentProfile.mentorDesignation}
            </p>
          </div>
        </div>
      </ProfileSection>

      {/* ── Bottom Save Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
      >
        <p className="text-xs text-gray-400">
          Last updated:{" "}
          <span className="font-semibold text-gray-600">25-07-2026</span> /
          अंतिम अपडेट:{" "}
          <span className="font-semibold text-gray-600">25-07-2026</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all"
          >
            ↑ Back to Top / ऊपर जाएं
          </button>
          <button
            type="submit"
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm ${saved
                ? "bg-emerald-600 text-white shadow-emerald-200"
                : "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200"
              }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved Successfully! / सफलतापूर्वक सहेजा गया!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Profile / प्रोफ़ाइल सहेजें
              </>
            )}
          </button>
        </div>
      </motion.div>
    </form>
  );
}
