// Student Portal — Demo Data (self-service student view)
// ─── Logged-in Student Profile ───────────────────────────────
export const studentProfile = {
  id: "STU011",
  rollNumber: "SV2024BCA042",
  universityRollNo: "24BCA042",
  registrationNo: "REG/2024/BCA/042",
  name: "Meraj Hussain",
  email: "meraj.hussain@svp.edu.in",
  phone: "9876543210",
  alternatePhone: "9123456780",
  dob: "15-03-2004",
  gender: "Male",
  photo: "",
  bloodGroup: "B+",
  category: "General",
  religion: "Islam",
  nationality: "Indian",
  motherTongue: "Hindi",
  maritalStatus: "Single",
  aadhar: "XXXX-XXXX-4521",

  // Educational — Current
  course: "BCA",
  department: "Computer Applications",
  year: "1st Year",
  semester: "2nd Semester",
  section: "A",
  session: "2024-2025",
  academicSession: "JAN-JUN 25 (SVP)",
  admissionDate: "01-07-2024",
  admissionType: "Regular",
  status: "Active",
  collegeName: "Sarvadnya Vidyapeeth",
  universityName: "Aryabhatta Knowledge University, Patna",

  // Educational — 12th
  twelfthBoard: "BSEB (Bihar School Examination Board)",
  twelfthSchool: "S.S. High School, Patna",
  twelfthYear: "2023",
  twelfthStream: "Science",
  twelfthPercentage: "72.4%",
  twelfthDivision: "First",

  // Educational — 10th
  tenthBoard: "BSEB (Bihar School Examination Board)",
  tenthSchool: "R.D.S. Middle School, Patna",
  tenthYear: "2021",
  tenthPercentage: "68.8%",
  tenthDivision: "First",

  // Address — Permanent
  permanentAddress: "House No. 42, Ward 12, Rajendra Nagar",
  permanentCity: "Patna",
  permanentDistrict: "Patna",
  permanentState: "Bihar",
  permanentPincode: "800001",

  // Address — Correspondence
  correspondenceAddress: "Same as Permanent Address",
  correspondenceCity: "Patna",
  correspondenceDistrict: "Patna",
  correspondenceState: "Bihar",
  correspondencePincode: "800001",

  // Short address (used elsewhere)
  address: "Patna, Bihar - 800001",

  // Guardian / Family
  fatherName: "Mohammad Hussain",
  fatherOccupation: "Business",
  fatherPhone: "9876543211",
  motherName: "Shabnam Khatoon",
  motherOccupation: "Homemaker",
  guardianName: "Mohammad Hussain",
  guardianRelation: "Father",
  guardianPhone: "9876543211",
  annualFamilyIncome: "₹ 4,50,000",

  // Mentor
  mentorName: "Dr. Priya Kumari",
  mentorDesignation: "Assistant Professor, Dept. of Computer Applications",
};

// ─── Today's Timetable ──────────────────────────────────────
export const todayTimetable = [
  { period: 1, time: "09:00 - 09:50", subject: "Data Structures", faculty: "Dr. Priya Kumari", room: "Lab-3" },
  { period: 2, time: "09:50 - 10:40", subject: "Operating Systems", faculty: "Prof. Amit Verma", room: "Room 201" },
  { period: 3, time: "10:50 - 11:40", subject: "Database Management", faculty: "Dr. Sneha Gupta", room: "Room 105" },
  { period: 4, time: "11:40 - 12:30", subject: "Web Technology", faculty: "Prof. Ravi Shankar", room: "Lab-1" },
  { period: 5, time: "01:30 - 02:20", subject: "Mathematics - II", faculty: "Dr. A.K. Mishra", room: "Room 302" },
  { period: 6, time: "02:20 - 03:10", subject: "Soft Skills", faculty: "Ms. Anjali Das", room: "Room 201" },
];

// ─── Full Week Timetable ─────────────────────────────────────
export const weekTimetable = {
  Monday: [
    { period: 1, time: "09:00 - 09:50", subject: "Data Structures", faculty: "Dr. Priya Kumari", room: "Lab-3" },
    { period: 2, time: "09:50 - 10:40", subject: "Operating Systems", faculty: "Prof. Amit Verma", room: "Room 201" },
    { period: 3, time: "10:50 - 11:40", subject: "Database Management", faculty: "Dr. Sneha Gupta", room: "Room 105" },
    { period: 4, time: "11:40 - 12:30", subject: "Web Technology", faculty: "Prof. Ravi Shankar", room: "Lab-1" },
    { period: 5, time: "01:30 - 02:20", subject: "Mathematics - II", faculty: "Dr. A.K. Mishra", room: "Room 302" },
    { period: 6, time: "02:20 - 03:10", subject: "Soft Skills", faculty: "Ms. Anjali Das", room: "Room 201" },
  ],
  Tuesday: [
    { period: 1, time: "09:00 - 09:50", subject: "Mathematics - II", faculty: "Dr. A.K. Mishra", room: "Room 302" },
    { period: 2, time: "09:50 - 10:40", subject: "Data Structures", faculty: "Dr. Priya Kumari", room: "Lab-3" },
    { period: 3, time: "10:50 - 11:40", subject: "Web Technology", faculty: "Prof. Ravi Shankar", room: "Lab-1" },
    { period: 4, time: "11:40 - 12:30", subject: "Operating Systems", faculty: "Prof. Amit Verma", room: "Room 201" },
    { period: 5, time: "01:30 - 02:20", subject: "Database Management", faculty: "Dr. Sneha Gupta", room: "Room 105" },
    { period: 6, time: "02:20 - 03:10", subject: "Library", faculty: "—", room: "Library" },
  ],
  Wednesday: [
    { period: 1, time: "09:00 - 09:50", subject: "Operating Systems", faculty: "Prof. Amit Verma", room: "Room 201" },
    { period: 2, time: "09:50 - 10:40", subject: "Database Management", faculty: "Dr. Sneha Gupta", room: "Room 105" },
    { period: 3, time: "10:50 - 11:40", subject: "Data Structures Lab", faculty: "Dr. Priya Kumari", room: "Lab-3" },
    { period: 4, time: "11:40 - 12:30", subject: "Data Structures Lab", faculty: "Dr. Priya Kumari", room: "Lab-3" },
    { period: 5, time: "01:30 - 02:20", subject: "Mathematics - II", faculty: "Dr. A.K. Mishra", room: "Room 302" },
    { period: 6, time: "02:20 - 03:10", subject: "Soft Skills", faculty: "Ms. Anjali Das", room: "Room 201" },
  ],
  Thursday: [
    { period: 1, time: "09:00 - 09:50", subject: "Web Technology", faculty: "Prof. Ravi Shankar", room: "Lab-1" },
    { period: 2, time: "09:50 - 10:40", subject: "Mathematics - II", faculty: "Dr. A.K. Mishra", room: "Room 302" },
    { period: 3, time: "10:50 - 11:40", subject: "Operating Systems", faculty: "Prof. Amit Verma", room: "Room 201" },
    { period: 4, time: "11:40 - 12:30", subject: "Data Structures", faculty: "Dr. Priya Kumari", room: "Lab-3" },
    { period: 5, time: "01:30 - 02:20", subject: "DBMS Lab", faculty: "Dr. Sneha Gupta", room: "Lab-2" },
    { period: 6, time: "02:20 - 03:10", subject: "DBMS Lab", faculty: "Dr. Sneha Gupta", room: "Lab-2" },
  ],
  Friday: [
    { period: 1, time: "09:00 - 09:50", subject: "Database Management", faculty: "Dr. Sneha Gupta", room: "Room 105" },
    { period: 2, time: "09:50 - 10:40", subject: "Data Structures", faculty: "Dr. Priya Kumari", room: "Lab-3" },
    { period: 3, time: "10:50 - 11:40", subject: "Web Technology Lab", faculty: "Prof. Ravi Shankar", room: "Lab-1" },
    { period: 4, time: "11:40 - 12:30", subject: "Web Technology Lab", faculty: "Prof. Ravi Shankar", room: "Lab-1" },
    { period: 5, time: "01:30 - 02:20", subject: "Operating Systems", faculty: "Prof. Amit Verma", room: "Room 201" },
    { period: 6, time: "02:20 - 03:10", subject: "Sports / Co-curricular", faculty: "—", room: "Ground" },
  ],
  Saturday: [
    { period: 1, time: "09:00 - 09:50", subject: "Soft Skills", faculty: "Ms. Anjali Das", room: "Room 201" },
    { period: 2, time: "09:50 - 10:40", subject: "Mathematics - II", faculty: "Dr. A.K. Mishra", room: "Room 302" },
    { period: 3, time: "10:50 - 11:40", subject: "Mentoring Session", faculty: "Dr. Priya Kumari", room: "Room 105" },
  ],
};

// ─── Attendance Data ─────────────────────────────────────────
export const attendanceData = [
  { subject: "Data Structures", code: "BCA-201", totalClasses: 42, attended: 38, percentage: 90 },
  { subject: "Operating Systems", code: "BCA-202", totalClasses: 40, attended: 35, percentage: 88 },
  { subject: "Database Management", code: "BCA-203", totalClasses: 38, attended: 34, percentage: 89 },
  { subject: "Web Technology", code: "BCA-204", totalClasses: 36, attended: 30, percentage: 83 },
  { subject: "Mathematics - II", code: "BCA-205", totalClasses: 40, attended: 36, percentage: 90 },
  { subject: "Soft Skills", code: "BCA-206", totalClasses: 20, attended: 18, percentage: 90 },
  { subject: "Data Structures Lab", code: "BCA-207", totalClasses: 18, attended: 17, percentage: 94 },
  { subject: "DBMS Lab", code: "BCA-208", totalClasses: 16, attended: 15, percentage: 94 },
  { subject: "Web Technology Lab", code: "BCA-209", totalClasses: 16, attended: 14, percentage: 88 },
];

export const overallAttendance = {
  totalClasses: 266,
  attended: 237,
  percentage: 89,
};

// ─── Exam Results ────────────────────────────────────────────
export const examResults = [
  {
    semester: "1st Semester",
    session: "JUL-DEC 2024",
    sgpa: 8.2,
    cgpa: 8.2,
    status: "Pass",
    subjects: [
      { name: "Programming in C", code: "BCA-101", internal: 28, external: 52, total: 80, maxMarks: 100, grade: "A" },
      { name: "Mathematics - I", code: "BCA-102", internal: 25, external: 45, total: 70, maxMarks: 100, grade: "B+" },
      { name: "Computer Fundamentals", code: "BCA-103", internal: 30, external: 55, total: 85, maxMarks: 100, grade: "A+" },
      { name: "English Communication", code: "BCA-104", internal: 22, external: 48, total: 70, maxMarks: 100, grade: "B+" },
      { name: "Digital Electronics", code: "BCA-105", internal: 26, external: 49, total: 75, maxMarks: 100, grade: "A" },
      { name: "C Programming Lab", code: "BCA-106", internal: 24, external: 60, total: 84, maxMarks: 100, grade: "A+" },
    ],
  },
];

// ─── Exam Schedule ───────────────────────────────────────────
export const examSchedule = [
  { date: "2025-06-15", day: "Sunday", subject: "Data Structures (BCA-201)", time: "10:00 AM - 01:00 PM" },
  { date: "2025-06-18", day: "Wednesday", subject: "Operating Systems (BCA-202)", time: "10:00 AM - 01:00 PM" },
  { date: "2025-06-21", day: "Saturday", subject: "Database Management (BCA-203)", time: "10:00 AM - 01:00 PM" },
  { date: "2025-06-24", day: "Tuesday", subject: "Web Technology (BCA-204)", time: "10:00 AM - 01:00 PM" },
  { date: "2025-06-27", day: "Friday", subject: "Mathematics - II (BCA-205)", time: "10:00 AM - 01:00 PM" },
  { date: "2025-06-30", day: "Monday", subject: "Soft Skills (BCA-206)", time: "10:00 AM - 12:00 PM" },
];

// ─── Fee Details ─────────────────────────────────────────────
export const feeDetails = {
  totalFees: 45000,
  paidFees: 25000,
  pendingFees: 20000,
  installments: [
    { id: 1, label: "1st Installment", amount: 25000, dueDate: "2024-07-15", paidDate: "2024-07-10", status: "Paid", method: "UPI", receiptNo: "RCP-2024-042-01" },
    { id: 2, label: "2nd Installment", amount: 20000, dueDate: "2025-01-15", paidDate: null, status: "Pending", method: "—", receiptNo: "—" },
  ],
  ledger: [
    { date: "2024-07-01", description: "Admission Fee", debit: 45000, credit: 0, balance: 45000 },
    { date: "2024-07-10", description: "1st Installment Payment (UPI)", debit: 0, credit: 25000, balance: 20000 },
  ],
};

// ─── Fee Receipts Data ───────────────────────────────────────
export const feeReceipts = [
  {
    sr: 1,
    receiptDate: "10-Jul-2024",
    receiptNo: "RCP-2024-042-01",
    session: "2024-2025",
    totalRecAmount: 25000,
    isCancelled: "No",
    paymentMode: "UPI / Online",
    installment: "1st Installment",
    heads: [
      { name: "Tuition Fee", amount: 20000 },
      { name: "Development Fees", amount: 3000 },
      { name: "Library & Lab Fee", amount: 2000 },
    ],
  },
  {
    sr: 2,
    receiptDate: "15-Jan-2025",
    receiptNo: "RCP-2025-042-02",
    session: "2024-2025",
    totalRecAmount: 20000,
    isCancelled: "No",
    paymentMode: "Net Banking",
    installment: "2nd Installment",
    heads: [
      { name: "Tuition Fee", amount: 15000 },
      { name: "Examination Fees", amount: 3000 },
      { name: "Bus Fees", amount: 2000 },
    ],
  },
  {
    sr: 3,
    receiptDate: "02-Jul-2025",
    receiptNo: "RCP-2025-042-03",
    session: "2025-2026",
    totalRecAmount: 30000,
    isCancelled: "No",
    paymentMode: "Bank Transfer",
    installment: "3rd Installment",
    heads: [
      { name: "Tuition Fee", amount: 22000 },
      { name: "Development Fees", amount: 4000 },
      { name: "Training & Placement Fee", amount: 4000 },
    ],
  },
  {
    sr: 4,
    receiptDate: "12-Nov-2025",
    receiptNo: "RCP-2025-CAN-01",
    session: "2025-2026",
    totalRecAmount: 5000,
    isCancelled: "Yes",
    paymentMode: "Cheque",
    installment: "Other Fee",
    heads: [
      { name: "Symposium Fee", amount: 5000 },
    ],
  },
  {
    sr: 5,
    receiptDate: "18-Jun-2026",
    receiptNo: "RCP-2026-042-05",
    session: "2026-2027",
    totalRecAmount: 56800,
    isCancelled: "No",
    paymentMode: "Online Payment",
    installment: "1st Installment",
    heads: [
      { name: "Tuition Fee", amount: 35000 },
      { name: "Bus Fees", amount: 12000 },
      { name: "Training Fees", amount: 8000 },
      { name: "Development Fees", amount: 600 },
      { name: "Symposium Fees", amount: 500 },
      { name: "Migration Fee", amount: 350 },
      { name: "Provisional Degree Fee", amount: 350 },
    ],
  },
];

// ─── Notices ─────────────────────────────────────────────────
export const notices = [
  { id: 1, title: "2nd Semester End-Term Examination Schedule Released", date: "2025-07-18", category: "Examination", important: true, content: "The end-term examination for 2nd Semester BCA/BBA will commence from June 15, 2025. Students must collect their admit cards from the examination cell." },
  { id: 2, title: "Fee Payment Deadline Extended", date: "2025-07-15", category: "Fees", important: true, content: "The last date for paying the 2nd installment has been extended to February 28, 2025. Late fee of ₹500 will apply after the due date." },
  { id: 3, title: "Campus Placement Drive by TCS", date: "2025-07-12", category: "Placement", important: false, content: "TCS is conducting a campus recruitment drive on August 10, 2025. Eligible students (BCA/BBA final year) must register through the placement cell." },
  { id: 4, title: "Independence Day Celebration", date: "2025-07-10", category: "Event", important: false, content: "Independence Day celebrations will be held on August 15, 2025 at the main campus ground. All students are requested to attend in formal dress." },
  { id: 5, title: "Library Book Return Notice", date: "2025-07-08", category: "Library", important: false, content: "All students are required to return borrowed library books before the end of the semester. Fine of ₹5/day will apply for overdue books." },
  { id: 6, title: "Online Guest Lecture: AI in Education", date: "2025-07-05", category: "Academic", important: false, content: "A guest lecture on 'AI in Education' will be conducted online via Google Meet on July 25, 2025 at 3:00 PM. Link will be shared via email." },
  { id: 7, title: "Sports Week Registration Open", date: "2025-07-01", category: "Event", important: false, content: "Annual sports week is from August 1-7, 2025. Register for events at the sports department by July 25." },
];

// ─── Holidays (July 2025) ────────────────────────────────────
export const holidays = {
  "2025-07": [
    { date: 6, name: "Sunday", type: "weekly" },
    { date: 13, name: "Sunday", type: "weekly" },
    { date: 17, name: "Muharram", type: "gazetted" },
    { date: 20, name: "Sunday", type: "weekly" },
    { date: 27, name: "Sunday", type: "weekly" },
  ],
  "2025-08": [
    { date: 3, name: "Sunday", type: "weekly" },
    { date: 10, name: "Sunday", type: "weekly" },
    { date: 15, name: "Independence Day", type: "gazetted" },
    { date: 16, name: "Janmashtami", type: "gazetted" },
    { date: 17, name: "Sunday", type: "weekly" },
    { date: 24, name: "Sunday", type: "weekly" },
    { date: 31, name: "Sunday", type: "weekly" },
  ],
};

// ─── Quick Links ─────────────────────────────────────────────
export const quickLinks = [
  { label: "Exam Form / Apply / Supply", icon: "FileText" },
  { label: "Result", icon: "Award" },
  { label: "Pay Fee Online", icon: "CreditCard" },
  { label: "Attendance", icon: "BarChart3" },
  { label: "Time Table", icon: "Calendar" },
  { label: "Notices", icon: "Bell" },
];

// ─── Placement Drives ────────────────────────────────────────
export const placementDrives = [
  { id: 1, company: "TCS", role: "Graduate Trainee", date: "2025-08-10", package: "3.6 LPA", eligibility: "BCA/BBA Final Year", status: "Upcoming" },
  { id: 2, company: "Wipro", role: "Project Engineer", date: "2025-08-20", package: "3.5 LPA", eligibility: "BCA Final Year", status: "Upcoming" },
  { id: 3, company: "Infosys", role: "System Engineer", date: "2025-09-05", package: "3.6 LPA", eligibility: "BCA/BBA Final Year", status: "Upcoming" },
];
