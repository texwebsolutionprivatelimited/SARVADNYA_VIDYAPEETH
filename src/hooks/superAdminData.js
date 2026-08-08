// SuperAdmin Portal — Data Layer (localStorage-based demo)
// Manages Staff, Scholarships, Enrollments alongside existing Student data from erpData.js

const STAFF_KEY = "superadmin_staff";
const SCHOLARSHIPS_KEY = "superadmin_scholarships";
const ENROLLMENTS_KEY = "superadmin_enrollments";

// ─── Admin Profile ──────────────────────────────────────────
export const adminProfile = {
  id: "ADMIN001",
  name: "Dr. Rajendra Prasad",
  email: "admin@svp.edu.in",
  phone: "9800000001",
  role: "Super Administrator",
  designation: "Director & Principal",
  department: "Administration",
  photo: "",
};

// ─── Seed Staff Data ────────────────────────────────────────
const seedStaff = [
  {
    id: "STF001",
    employeeId: "SV2024FAC001",
    name: "Dr. Priya Kumari",
    email: "priya.kumari@svp.edu.in",
    phone: "9876543301",
    dob: "1985-06-15",
    gender: "Female",
    department: "Computer Applications",
    designation: "Assistant Professor",
    qualification: "Ph.D. (Computer Science)",
    specialization: "Data Structures & Algorithms",
    joiningDate: "2020-07-01",
    salary: 55000,
    status: "Active",
    type: "Teaching",
    photo: "",
  },
  {
    id: "STF002",
    employeeId: "SV2024FAC002",
    name: "Prof. Amit Verma",
    email: "amit.verma@svp.edu.in",
    phone: "9876543302",
    dob: "1988-03-22",
    gender: "Male",
    department: "Computer Applications",
    designation: "Associate Professor",
    qualification: "M.Tech (IT)",
    specialization: "Operating Systems & Networks",
    joiningDate: "2019-01-15",
    salary: 62000,
    status: "Active",
    type: "Teaching",
    photo: "",
  },
  {
    id: "STF003",
    employeeId: "SV2024FAC003",
    name: "Dr. Sneha Gupta",
    email: "sneha.gupta@svp.edu.in",
    phone: "9876543303",
    dob: "1990-11-08",
    gender: "Female",
    department: "Computer Applications",
    designation: "Assistant Professor",
    qualification: "Ph.D. (Database Systems)",
    specialization: "DBMS & Data Analytics",
    joiningDate: "2021-08-01",
    salary: 50000,
    status: "Active",
    type: "Teaching",
    photo: "",
  },
  {
    id: "STF004",
    employeeId: "SV2024FAC004",
    name: "Prof. Ravi Shankar",
    email: "ravi.shankar@svp.edu.in",
    phone: "9876543304",
    dob: "1987-07-25",
    gender: "Male",
    department: "Computer Applications",
    designation: "Assistant Professor",
    qualification: "MCA",
    specialization: "Web Technology & Full-Stack",
    joiningDate: "2022-01-10",
    salary: 48000,
    status: "Active",
    type: "Teaching",
    photo: "",
  },
  {
    id: "STF005",
    employeeId: "SV2024FAC005",
    name: "Dr. A.K. Mishra",
    email: "ak.mishra@svp.edu.in",
    phone: "9876543305",
    dob: "1975-04-12",
    gender: "Male",
    department: "Mathematics",
    designation: "Professor & HOD",
    qualification: "Ph.D. (Applied Mathematics)",
    specialization: "Discrete Mathematics & Probability",
    joiningDate: "2015-07-01",
    salary: 78000,
    status: "Active",
    type: "Teaching",
    photo: "",
  },
  {
    id: "STF006",
    employeeId: "SV2024FAC006",
    name: "Ms. Anjali Das",
    email: "anjali.das@svp.edu.in",
    phone: "9876543306",
    dob: "1992-09-18",
    gender: "Female",
    department: "General",
    designation: "Lecturer",
    qualification: "M.A. (English), B.Ed.",
    specialization: "Communication & Soft Skills",
    joiningDate: "2023-07-01",
    salary: 35000,
    status: "Active",
    type: "Teaching",
    photo: "",
  },
  {
    id: "STF007",
    employeeId: "SV2024ADM001",
    name: "Sunil Kumar",
    email: "sunil.kumar@svp.edu.in",
    phone: "9876543307",
    dob: "1980-02-14",
    gender: "Male",
    department: "Administration",
    designation: "Office Manager",
    qualification: "B.Com, DCA",
    specialization: "Academic Administration",
    joiningDate: "2018-03-01",
    salary: 32000,
    status: "Active",
    type: "Non-Teaching",
    photo: "",
  },
  {
    id: "STF008",
    employeeId: "SV2024ADM002",
    name: "Rekha Devi",
    email: "rekha.devi@svp.edu.in",
    phone: "9876543308",
    dob: "1985-12-05",
    gender: "Female",
    department: "Library",
    designation: "Librarian",
    qualification: "M.Lib.Sc.",
    specialization: "Library Management",
    joiningDate: "2019-07-01",
    salary: 30000,
    status: "On Leave",
    type: "Non-Teaching",
    photo: "",
  },
];

// ─── Seed Scholarship Data ──────────────────────────────────
const seedScholarships = [
  {
    id: "SCH001",
    studentId: "STU001",
    studentName: "Aarav Sharma",
    rollNumber: "SV2024BCA001",
    course: "BCA",
    scholarshipName: "Merit-Based Excellence Scholarship",
    type: "Merit",
    amount: 15000,
    session: "2024-2025",
    status: "Active",
    approvedBy: "Dr. Rajendra Prasad",
    approvedDate: "2024-08-15",
    remarks: "Scored highest in entrance exam",
  },
  {
    id: "SCH002",
    studentId: "STU002",
    studentName: "Priya Singh",
    rollNumber: "SV2024BCA002",
    course: "BCA",
    scholarshipName: "Bihar State Government Scholarship",
    type: "Government",
    amount: 20000,
    session: "2024-2025",
    status: "Active",
    approvedBy: "State Govt.",
    approvedDate: "2024-09-01",
    remarks: "SC/ST Category — Government scheme beneficiary",
  },
  {
    id: "SCH003",
    studentId: "STU004",
    studentName: "Sneha Gupta",
    rollNumber: "SV2024BCA003",
    course: "BCA",
    scholarshipName: "Need-Based Financial Aid",
    type: "Need-Based",
    amount: 10000,
    session: "2024-2025",
    status: "Pending",
    approvedBy: "—",
    approvedDate: null,
    remarks: "Application under review — family income below threshold",
  },
  {
    id: "SCH004",
    studentId: "STU003",
    studentName: "Rohit Kumar",
    rollNumber: "SV2024BBA001",
    course: "BBA",
    scholarshipName: "Sports Achievement Scholarship",
    type: "Sports",
    amount: 12000,
    session: "2024-2025",
    status: "Active",
    approvedBy: "Dr. Rajendra Prasad",
    approvedDate: "2024-08-20",
    remarks: "State-level cricket player",
  },
  {
    id: "SCH005",
    studentId: "STU006",
    studentName: "Neha Kumari",
    rollNumber: "SV2023BCA010",
    course: "BCA",
    scholarshipName: "Merit-Based Excellence Scholarship",
    type: "Merit",
    amount: 18000,
    session: "2023-2024",
    status: "Expired",
    approvedBy: "Dr. Rajendra Prasad",
    approvedDate: "2023-08-10",
    remarks: "2nd Year — maintained CGPA above 8.0",
  },
  {
    id: "SCH006",
    studentId: "STU009",
    studentName: "Ravi Ranjan",
    rollNumber: "SV2024BBA003",
    course: "BBA",
    scholarshipName: "Minority Welfare Scholarship",
    type: "Government",
    amount: 25000,
    session: "2024-2025",
    status: "Active",
    approvedBy: "Minority Welfare Dept.",
    approvedDate: "2024-10-05",
    remarks: "Minority community — Government welfare scheme",
  },
];

// ─── Seed Enrollment Data ───────────────────────────────────
const seedEnrollments = [
  {
    id: "ENR001",
    applicantName: "Saurabh Tiwari",
    email: "saurabh.tiwari@gmail.com",
    phone: "9988776601",
    dob: "2005-05-12",
    gender: "Male",
    courseApplied: "BCA",
    guardianName: "Rakesh Tiwari",
    guardianPhone: "9988776602",
    address: "Boring Road, Patna",
    twelfthPercentage: "74.2%",
    twelfthBoard: "BSEB",
    appliedDate: "2025-06-15",
    status: "Pending",
    remarks: "",
    session: "2025-2026",
  },
  {
    id: "ENR002",
    applicantName: "Nisha Kumari",
    email: "nisha.kumari@gmail.com",
    phone: "9988776603",
    dob: "2005-08-22",
    gender: "Female",
    courseApplied: "BBA",
    guardianName: "Anil Kumar",
    guardianPhone: "9988776604",
    address: "Kankarbagh, Patna",
    twelfthPercentage: "68.5%",
    twelfthBoard: "CBSE",
    appliedDate: "2025-06-18",
    status: "Approved",
    remarks: "Documents verified. Admission confirmed.",
    session: "2025-2026",
  },
  {
    id: "ENR003",
    applicantName: "Rahul Verma",
    email: "rahul.verma@gmail.com",
    phone: "9988776605",
    dob: "2004-11-03",
    gender: "Male",
    courseApplied: "BCA",
    guardianName: "Manoj Verma",
    guardianPhone: "9988776606",
    address: "Ashok Rajpath, Patna",
    twelfthPercentage: "82.1%",
    twelfthBoard: "BSEB",
    appliedDate: "2025-06-20",
    status: "Approved",
    remarks: "Merit applicant — confirmed.",
    session: "2025-2026",
  },
  {
    id: "ENR004",
    applicantName: "Pooja Sharma",
    email: "pooja.sharma@gmail.com",
    phone: "9988776607",
    dob: "2005-01-18",
    gender: "Female",
    courseApplied: "BBA",
    guardianName: "Suresh Sharma",
    guardianPhone: "9988776608",
    address: "Rajendra Nagar, Patna",
    twelfthPercentage: "55.3%",
    twelfthBoard: "BSEB",
    appliedDate: "2025-06-22",
    status: "Rejected",
    remarks: "Below minimum percentage cutoff (60% for BBA).",
    session: "2025-2026",
  },
  {
    id: "ENR005",
    applicantName: "Abhishek Kumar",
    email: "abhishek.kumar@gmail.com",
    phone: "9988776609",
    dob: "2005-03-30",
    gender: "Male",
    courseApplied: "BCA",
    guardianName: "Dinesh Kumar",
    guardianPhone: "9988776610",
    address: "Danapur, Patna",
    twelfthPercentage: "71.8%",
    twelfthBoard: "ICSE",
    appliedDate: "2025-07-01",
    status: "Pending",
    remarks: "",
    session: "2025-2026",
  },
  {
    id: "ENR006",
    applicantName: "Swati Rani",
    email: "swati.rani@gmail.com",
    phone: "9988776611",
    dob: "2005-07-14",
    gender: "Female",
    courseApplied: "BCA",
    guardianName: "Ram Narayan",
    guardianPhone: "9988776612",
    address: "Phulwari Sharif, Patna",
    twelfthPercentage: "78.9%",
    twelfthBoard: "BSEB",
    appliedDate: "2025-07-05",
    status: "Pending",
    remarks: "",
    session: "2025-2026",
  },
  {
    id: "ENR007",
    applicantName: "Vikash Singh",
    email: "vikash.singh@gmail.com",
    phone: "9988776613",
    dob: "2004-10-09",
    gender: "Male",
    courseApplied: "BBA",
    guardianName: "Ashok Singh",
    guardianPhone: "9988776614",
    address: "Gandhi Maidan, Patna",
    twelfthPercentage: "65.0%",
    twelfthBoard: "CBSE",
    appliedDate: "2025-07-08",
    status: "Pending",
    remarks: "",
    session: "2025-2026",
  },
  {
    id: "ENR008",
    applicantName: "Ananya Gupta",
    email: "ananya.gupta@gmail.com",
    phone: "9988776615",
    dob: "2005-02-25",
    gender: "Female",
    courseApplied: "BCA",
    guardianName: "Sandeep Gupta",
    guardianPhone: "9988776616",
    address: "Saguna More, Patna",
    twelfthPercentage: "88.4%",
    twelfthBoard: "CBSE",
    appliedDate: "2025-07-10",
    status: "Pending",
    remarks: "",
    session: "2025-2026",
  },
];

// ─── Staff Attendance Seed ──────────────────────────────────
const STAFF_ATTENDANCE_KEY = "superadmin_staff_attendance";

const seedStaffAttendance = [
  { id: "SA001", staffId: "STF001", date: "2025-08-01", status: "Present" },
  { id: "SA002", staffId: "STF002", date: "2025-08-01", status: "Present" },
  { id: "SA003", staffId: "STF003", date: "2025-08-01", status: "Absent" },
  { id: "SA004", staffId: "STF004", date: "2025-08-01", status: "Present" },
  { id: "SA005", staffId: "STF005", date: "2025-08-01", status: "Present" },
  { id: "SA006", staffId: "STF006", date: "2025-08-01", status: "Leave" },
  { id: "SA007", staffId: "STF007", date: "2025-08-01", status: "Present" },
  { id: "SA008", staffId: "STF008", date: "2025-08-01", status: "Leave" },
  { id: "SA009", staffId: "STF001", date: "2025-08-02", status: "Present" },
  { id: "SA010", staffId: "STF002", date: "2025-08-02", status: "Present" },
  { id: "SA011", staffId: "STF003", date: "2025-08-02", status: "Present" },
  { id: "SA012", staffId: "STF004", date: "2025-08-02", status: "Present" },
  { id: "SA013", staffId: "STF005", date: "2025-08-02", status: "Absent" },
  { id: "SA014", staffId: "STF006", date: "2025-08-02", status: "Present" },
  { id: "SA015", staffId: "STF007", date: "2025-08-02", status: "Present" },
  { id: "SA016", staffId: "STF008", date: "2025-08-02", status: "Leave" },
  { id: "SA017", staffId: "STF001", date: "2025-08-03", status: "Present" },
  { id: "SA018", staffId: "STF002", date: "2025-08-03", status: "Present" },
  { id: "SA019", staffId: "STF003", date: "2025-08-03", status: "Present" },
  { id: "SA020", staffId: "STF004", date: "2025-08-03", status: "Absent" },
  { id: "SA021", staffId: "STF005", date: "2025-08-03", status: "Present" },
  { id: "SA022", staffId: "STF006", date: "2025-08-03", status: "Present" },
  { id: "SA023", staffId: "STF007", date: "2025-08-03", status: "Present" },
  { id: "SA024", staffId: "STF008", date: "2025-08-03", status: "Leave" },
];

// ─── Initialise ─────────────────────────────────────────────

export function initSuperAdmin() {
  if (!localStorage.getItem(STAFF_KEY)) {
    localStorage.setItem(STAFF_KEY, JSON.stringify(seedStaff));
  }
  if (!localStorage.getItem(SCHOLARSHIPS_KEY)) {
    localStorage.setItem(SCHOLARSHIPS_KEY, JSON.stringify(seedScholarships));
  }
  if (!localStorage.getItem(ENROLLMENTS_KEY)) {
    localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(seedEnrollments));
  }
  if (!localStorage.getItem(STAFF_ATTENDANCE_KEY)) {
    localStorage.setItem(STAFF_ATTENDANCE_KEY, JSON.stringify(seedStaffAttendance));
  }
}

// ─── Staff CRUD ─────────────────────────────────────────────

export function getStaff() {
  initSuperAdmin();
  return JSON.parse(localStorage.getItem(STAFF_KEY) || "[]");
}

export function getStaffById(id) {
  return getStaff().find((s) => s.id === id);
}

export function addStaff(staff) {
  const list = getStaff();
  const newId = "STF" + String(list.length + 1).padStart(3, "0");
  const entry = { ...staff, id: newId };
  list.push(entry);
  localStorage.setItem(STAFF_KEY, JSON.stringify(list));
  return entry;
}

export function updateStaff(id, updates) {
  const list = getStaff();
  const idx = list.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  localStorage.setItem(STAFF_KEY, JSON.stringify(list));
  return list[idx];
}

export function deleteStaff(id) {
  const list = getStaff().filter((s) => s.id !== id);
  localStorage.setItem(STAFF_KEY, JSON.stringify(list));
}

// ─── Scholarship CRUD ───────────────────────────────────────

export function getScholarships() {
  initSuperAdmin();
  return JSON.parse(localStorage.getItem(SCHOLARSHIPS_KEY) || "[]");
}

export function getScholarshipById(id) {
  return getScholarships().find((s) => s.id === id);
}

export function addScholarship(scholarship) {
  const list = getScholarships();
  const newId = "SCH" + String(list.length + 1).padStart(3, "0");
  const entry = { ...scholarship, id: newId };
  list.push(entry);
  localStorage.setItem(SCHOLARSHIPS_KEY, JSON.stringify(list));
  return entry;
}

export function updateScholarship(id, updates) {
  const list = getScholarships();
  const idx = list.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  localStorage.setItem(SCHOLARSHIPS_KEY, JSON.stringify(list));
  return list[idx];
}

export function deleteScholarship(id) {
  const list = getScholarships().filter((s) => s.id !== id);
  localStorage.setItem(SCHOLARSHIPS_KEY, JSON.stringify(list));
}

// ─── Enrollment CRUD ────────────────────────────────────────

export function getEnrollments() {
  initSuperAdmin();
  return JSON.parse(localStorage.getItem(ENROLLMENTS_KEY) || "[]");
}

export function getEnrollmentById(id) {
  return getEnrollments().find((e) => e.id === id);
}

export function addEnrollment(enrollment) {
  const list = getEnrollments();
  const newId = "ENR" + String(list.length + 1).padStart(3, "0");
  const entry = { ...enrollment, id: newId };
  list.push(entry);
  localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(list));
  return entry;
}

export function updateEnrollment(id, updates) {
  const list = getEnrollments();
  const idx = list.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(list));
  return list[idx];
}

export function deleteEnrollment(id) {
  const list = getEnrollments().filter((e) => e.id !== id);
  localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(list));
}

// ─── Staff Attendance CRUD ──────────────────────────────────

export function getStaffAttendance() {
  initSuperAdmin();
  return JSON.parse(localStorage.getItem(STAFF_ATTENDANCE_KEY) || "[]");
}

export function getStaffAttendanceByDate(date) {
  return getStaffAttendance().filter((a) => a.date === date);
}

export function getStaffAttendanceByStaff(staffId) {
  return getStaffAttendance().filter((a) => a.staffId === staffId);
}

export function addStaffAttendanceRecord(record) {
  const list = getStaffAttendance();
  const newId = "SA" + String(list.length + 1).padStart(3, "0");
  const entry = { ...record, id: newId };
  list.push(entry);
  localStorage.setItem(STAFF_ATTENDANCE_KEY, JSON.stringify(list));
  return entry;
}

export function markStaffAttendanceBulk(date, attendanceMap) {
  // attendanceMap: { staffId: "Present"|"Absent"|"Leave" }
  const list = getStaffAttendance();
  Object.entries(attendanceMap).forEach(([staffId, status]) => {
    const existing = list.findIndex((a) => a.staffId === staffId && a.date === date);
    if (existing !== -1) {
      list[existing].status = status;
    } else {
      const newId = "SA" + String(list.length + 1).padStart(3, "0");
      list.push({ id: newId, staffId, date, status });
    }
  });
  localStorage.setItem(STAFF_ATTENDANCE_KEY, JSON.stringify(list));
}

// ─── Super Admin Stats ──────────────────────────────────────

export function getSuperAdminStats() {
  // Import student data dynamically
  const studentsRaw = JSON.parse(localStorage.getItem("erp_students") || "[]");
  const paymentsRaw = JSON.parse(localStorage.getItem("erp_payments") || "[]");
  const staff = getStaff();
  const scholarships = getScholarships();
  const enrollments = getEnrollments();

  const totalStudents = studentsRaw.length;
  const activeStudents = studentsRaw.filter((s) => s.status === "Active").length;
  const totalStaff = staff.length;
  const activeStaff = staff.filter((s) => s.status === "Active").length;
  const teachingStaff = staff.filter((s) => s.type === "Teaching").length;
  const nonTeachingStaff = staff.filter((s) => s.type === "Non-Teaching").length;

  const totalFees = studentsRaw.reduce((sum, s) => sum + (s.totalFees || 0), 0);
  const collectedFees = studentsRaw.reduce((sum, s) => sum + (s.paidFees || 0), 0);
  const pendingFees = totalFees - collectedFees;
  const feeCollectionRate = totalFees > 0 ? Math.round((collectedFees / totalFees) * 100) : 0;

  const activeScholarships = scholarships.filter((s) => s.status === "Active").length;
  const pendingScholarships = scholarships.filter((s) => s.status === "Pending").length;
  const totalScholarshipAmount = scholarships
    .filter((s) => s.status === "Active")
    .reduce((sum, s) => sum + (s.amount || 0), 0);

  const pendingEnrollments = enrollments.filter((e) => e.status === "Pending").length;
  const approvedEnrollments = enrollments.filter((e) => e.status === "Approved").length;
  const rejectedEnrollments = enrollments.filter((e) => e.status === "Rejected").length;
  const totalEnrollments = enrollments.length;

  const bcaStudents = studentsRaw.filter((s) => s.course === "BCA").length;
  const bbaStudents = studentsRaw.filter((s) => s.course === "BBA").length;

  const totalTransactions = paymentsRaw.length;

  return {
    totalStudents,
    activeStudents,
    totalStaff,
    activeStaff,
    teachingStaff,
    nonTeachingStaff,
    totalFees,
    collectedFees,
    pendingFees,
    feeCollectionRate,
    activeScholarships,
    pendingScholarships,
    totalScholarshipAmount,
    pendingEnrollments,
    approvedEnrollments,
    rejectedEnrollments,
    totalEnrollments,
    bcaStudents,
    bbaStudents,
    totalTransactions,
  };
}
