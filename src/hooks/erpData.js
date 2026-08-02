// Student ERP — Data Layer (localStorage-based demo)
const STUDENTS_KEY = "erp_students";
const PAYMENTS_KEY = "erp_payments";

// Seed Data
const seedStudents = [
  {
    id: "STU001",
    rollNumber: "SV2024BCA001",
    name: "Aarav Sharma",
    email: "aarav.sharma@svp.edu.in",
    phone: "9876543210",
    dob: "2004-03-15",
    gender: "Male",
    course: "BCA",
    department: "Computer Applications",
    year: "1st Year",
    semester: "2nd",
    address: "Patna, Bihar",
    guardianName: "Rajesh Sharma",
    guardianPhone: "9876543211",
    admissionDate: "2024-07-01",
    status: "Active",
    totalFees: 45000,
    paidFees: 45000,
    photo: "",
  },
  {
    id: "STU002",
    rollNumber: "SV2024BCA002",
    name: "Priya Singh",
    email: "priya.singh@svp.edu.in",
    phone: "9876543220",
    dob: "2004-06-22",
    gender: "Female",
    course: "BCA",
    department: "Computer Applications",
    year: "1st Year",
    semester: "2nd",
    address: "Danapur, Patna",
    guardianName: "Anil Singh",
    guardianPhone: "9876543221",
    admissionDate: "2024-07-01",
    status: "Active",
    totalFees: 45000,
    paidFees: 25000,
    photo: "",
  },
  {
    id: "STU003",
    rollNumber: "SV2024BBA001",
    name: "Rohit Kumar",
    email: "rohit.kumar@svp.edu.in",
    phone: "9876543230",
    dob: "2004-01-10",
    gender: "Male",
    course: "BBA",
    department: "Business Administration",
    year: "1st Year",
    semester: "2nd",
    address: "Boring Road, Patna",
    guardianName: "Suresh Kumar",
    guardianPhone: "9876543231",
    admissionDate: "2024-07-01",
    status: "Active",
    totalFees: 40000,
    paidFees: 40000,
    photo: "",
  },
  {
    id: "STU004",
    rollNumber: "SV2024BCA003",
    name: "Sneha Gupta",
    email: "sneha.gupta@svp.edu.in",
    phone: "9876543240",
    dob: "2004-09-05",
    gender: "Female",
    course: "BCA",
    department: "Computer Applications",
    year: "1st Year",
    semester: "2nd",
    address: "Kankarbagh, Patna",
    guardianName: "Manoj Gupta",
    guardianPhone: "9876543241",
    admissionDate: "2024-07-01",
    status: "Active",
    totalFees: 45000,
    paidFees: 0,
    photo: "",
  },
  {
    id: "STU005",
    rollNumber: "SV2024BBA002",
    name: "Amit Verma",
    email: "amit.verma@svp.edu.in",
    phone: "9876543250",
    dob: "2003-12-18",
    gender: "Male",
    course: "BBA",
    department: "Business Administration",
    year: "2nd Year",
    semester: "4th",
    address: "Rajendra Nagar, Patna",
    guardianName: "Vikash Verma",
    guardianPhone: "9876543251",
    admissionDate: "2023-07-01",
    status: "Active",
    totalFees: 40000,
    paidFees: 30000,
    photo: "",
  },
  {
    id: "STU006",
    rollNumber: "SV2023BCA010",
    name: "Neha Kumari",
    email: "neha.kumari@svp.edu.in",
    phone: "9876543260",
    dob: "2003-04-25",
    gender: "Female",
    course: "BCA",
    department: "Computer Applications",
    year: "2nd Year",
    semester: "4th",
    address: "Ashok Rajpath, Patna",
    guardianName: "Ramesh Prasad",
    guardianPhone: "9876543261",
    admissionDate: "2023-07-01",
    status: "Active",
    totalFees: 45000,
    paidFees: 45000,
    photo: "",
  },
  {
    id: "STU007",
    rollNumber: "SV2023BBA005",
    name: "Vikram Yadav",
    email: "vikram.yadav@svp.edu.in",
    phone: "9876543270",
    dob: "2003-08-14",
    gender: "Male",
    course: "BBA",
    department: "Business Administration",
    year: "2nd Year",
    semester: "4th",
    address: "Gandhi Maidan, Patna",
    guardianName: "Dinesh Yadav",
    guardianPhone: "9876543271",
    admissionDate: "2023-07-01",
    status: "Inactive",
    totalFees: 40000,
    paidFees: 20000,
    photo: "",
  },
  {
    id: "STU008",
    rollNumber: "SV2024BCA004",
    name: "Anjali Mishra",
    email: "anjali.mishra@svp.edu.in",
    phone: "9876543280",
    dob: "2004-11-30",
    gender: "Female",
    course: "BCA",
    department: "Computer Applications",
    year: "1st Year",
    semester: "2nd",
    address: "Saguna More, Patna",
    guardianName: "Pramod Mishra",
    guardianPhone: "9876543281",
    admissionDate: "2024-07-01",
    status: "Active",
    totalFees: 45000,
    paidFees: 22500,
    photo: "",
  },
  {
    id: "STU009",
    rollNumber: "SV2024BBA003",
    name: "Ravi Ranjan",
    email: "ravi.ranjan@svp.edu.in",
    phone: "9876543290",
    dob: "2004-02-08",
    gender: "Male",
    course: "BBA",
    department: "Business Administration",
    year: "1st Year",
    semester: "2nd",
    address: "Mahendru, Patna",
    guardianName: "Sanjay Ranjan",
    guardianPhone: "9876543291",
    admissionDate: "2024-07-01",
    status: "Active",
    totalFees: 40000,
    paidFees: 40000,
    photo: "",
  },
  {
    id: "STU010",
    rollNumber: "SV2023BCA011",
    name: "Pooja Kumari",
    email: "pooja.kumari@svp.edu.in",
    phone: "9876543300",
    dob: "2003-07-12",
    gender: "Female",
    course: "BCA",
    department: "Computer Applications",
    year: "2nd Year",
    semester: "4th",
    address: "Phulwari Sharif, Patna",
    guardianName: "Ajay Kumar",
    guardianPhone: "9876543301",
    admissionDate: "2023-07-01",
    status: "Active",
    totalFees: 45000,
    paidFees: 35000,
    photo: "",
  },
  {
    id: "STU011",
    rollNumber: "SV2024BCA042",
    name: "Demo Student",
    email: "demo@svp.edu.in",
    phone: "9999999999",
    dob: "2004-01-01",
    gender: "Male",
    course: "BCA",
    department: "Computer Applications",
    year: "1st Year",
    semester: "2nd",
    address: "Patna, Bihar",
    guardianName: "Demo Guardian",
    guardianPhone: "9999999998",
    admissionDate: "2024-07-01",
    status: "Active",
    totalFees: 45000,
    paidFees: 25000,
    photo: "",
  },
];

const seedPayments = [
  { id: "PAY001", studentId: "STU001", rollNumber: "SV2024BCA001", studentName: "Aarav Sharma", amount: 25000, date: "2024-07-15", method: "UPI", status: "Paid", receiptNo: "RCP-2024-001", remarks: "1st Installment" },
  { id: "PAY002", studentId: "STU001", rollNumber: "SV2024BCA001", studentName: "Aarav Sharma", amount: 20000, date: "2024-12-10", method: "Bank Transfer", status: "Paid", receiptNo: "RCP-2024-002", remarks: "2nd Installment" },
  { id: "PAY003", studentId: "STU002", rollNumber: "SV2024BCA002", studentName: "Priya Singh", amount: 25000, date: "2024-07-20", method: "Cash", status: "Paid", receiptNo: "RCP-2024-003", remarks: "1st Installment" },
  { id: "PAY004", studentId: "STU003", rollNumber: "SV2024BBA001", studentName: "Rohit Kumar", amount: 40000, date: "2024-07-10", method: "UPI", status: "Paid", receiptNo: "RCP-2024-004", remarks: "Full Payment" },
  { id: "PAY005", studentId: "STU005", rollNumber: "SV2024BBA002", studentName: "Amit Verma", amount: 20000, date: "2023-07-18", method: "Bank Transfer", status: "Paid", receiptNo: "RCP-2023-001", remarks: "1st Installment" },
  { id: "PAY006", studentId: "STU005", rollNumber: "SV2024BBA002", studentName: "Amit Verma", amount: 10000, date: "2024-01-05", method: "UPI", status: "Paid", receiptNo: "RCP-2024-005", remarks: "2nd Installment" },
  { id: "PAY007", studentId: "STU006", rollNumber: "SV2023BCA010", studentName: "Neha Kumari", amount: 25000, date: "2023-07-12", method: "Cash", status: "Paid", receiptNo: "RCP-2023-002", remarks: "1st Installment" },
  { id: "PAY008", studentId: "STU006", rollNumber: "SV2023BCA010", studentName: "Neha Kumari", amount: 20000, date: "2024-01-15", method: "UPI", status: "Paid", receiptNo: "RCP-2023-003", remarks: "2nd Installment" },
  { id: "PAY009", studentId: "STU007", rollNumber: "SV2023BBA005", studentName: "Vikram Yadav", amount: 20000, date: "2023-07-22", method: "Cash", status: "Paid", receiptNo: "RCP-2023-004", remarks: "Partial Payment" },
  { id: "PAY010", studentId: "STU008", rollNumber: "SV2024BCA004", studentName: "Anjali Mishra", amount: 22500, date: "2024-08-01", method: "UPI", status: "Paid", receiptNo: "RCP-2024-006", remarks: "1st Installment" },
  { id: "PAY011", studentId: "STU009", rollNumber: "SV2024BBA003", studentName: "Ravi Ranjan", amount: 40000, date: "2024-07-08", method: "Bank Transfer", status: "Paid", receiptNo: "RCP-2024-007", remarks: "Full Payment" },
  { id: "PAY012", studentId: "STU010", rollNumber: "SV2023BCA011", studentName: "Pooja Kumari", amount: 25000, date: "2023-07-25", method: "UPI", status: "Paid", receiptNo: "RCP-2023-005", remarks: "1st Installment" },
  { id: "PAY013", studentId: "STU010", rollNumber: "SV2023BCA011", studentName: "Pooja Kumari", amount: 10000, date: "2024-02-10", method: "Cash", status: "Paid", receiptNo: "RCP-2024-008", remarks: "2nd Installment" },
  { id: "PAY014", studentId: "STU011", rollNumber: "SV2024BCA042", studentName: "Demo Student", amount: 25000, date: "2024-07-15", method: "UPI", status: "Paid", receiptNo: "RCP-2024-009", remarks: "1st Installment" },
];

// ─── Initialise ──────────────────────────────────────────────

export function initERP() {
  if (!localStorage.getItem(STUDENTS_KEY)) {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(seedStudents));
  }
  if (!localStorage.getItem(PAYMENTS_KEY)) {
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(seedPayments));
  }
}

// ─── Student CRUD ────────────────────────────────────────────

export function getStudents() {
  initERP();
  return JSON.parse(localStorage.getItem(STUDENTS_KEY) || "[]");
}

export function getStudentById(id) {
  return getStudents().find((s) => s.id === id);
}

export function getStudentByRoll(roll) {
  return getStudents().find((s) => s.rollNumber === roll);
}

export function addStudent(student) {
  const students = getStudents();
  const newId = "STU" + String(students.length + 1).padStart(3, "0");
  const entry = { ...student, id: newId };
  students.push(entry);
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  return entry;
}

export function updateStudent(id, updates) {
  const students = getStudents();
  const idx = students.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  students[idx] = { ...students[idx], ...updates };
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  return students[idx];
}

export function deleteStudent(id) {
  const students = getStudents().filter((s) => s.id !== id);
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

// ─── Payment CRUD ────────────────────────────────────────────

export function getPayments() {
  initERP();
  return JSON.parse(localStorage.getItem(PAYMENTS_KEY) || "[]");
}

export function getPaymentsByStudent(studentId) {
  return getPayments().filter((p) => p.studentId === studentId);
}

export function addPayment(payment) {
  const payments = getPayments();
  const newId = "PAY" + String(payments.length + 1).padStart(3, "0");
  const entry = { ...payment, id: newId };
  payments.push(entry);
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));

  // Update student paidFees
  const student = getStudentById(payment.studentId);
  if (student) {
    updateStudent(student.id, {
      paidFees: (student.paidFees || 0) + payment.amount,
    });
  }

  return entry;
}

// ─── Statistics ──────────────────────────────────────────────

export function getStats() {
  const students = getStudents();
  const payments = getPayments();

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "Active").length;
  const totalFees = students.reduce((sum, s) => sum + (s.totalFees || 0), 0);
  const collectedFees = students.reduce((sum, s) => sum + (s.paidFees || 0), 0);
  const pendingFees = totalFees - collectedFees;

  const paidStudents = students.filter((s) => s.paidFees >= s.totalFees).length;
  const pendingStudents = students.filter((s) => s.paidFees < s.totalFees && s.paidFees > 0).length;
  const unpaidStudents = students.filter((s) => s.paidFees === 0).length;

  const bcaStudents = students.filter((s) => s.course === "BCA").length;
  const bbaStudents = students.filter((s) => s.course === "BBA").length;

  const totalTransactions = payments.length;

  return {
    totalStudents,
    activeStudents,
    totalFees,
    collectedFees,
    pendingFees,
    paidStudents,
    pendingStudents,
    unpaidStudents,
    bcaStudents,
    bbaStudents,
    totalTransactions,
  };
}
