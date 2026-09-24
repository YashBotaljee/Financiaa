export type NavSection = 
  | 'dashboard'
  // Finance
  | 'finance-overview'
  | 'transactions'
  | 'income'
  | 'expenses'
  | 'invoices'
  | 'payments'
  // People
  | 'employees'
  | 'departments'
  | 'attendance'
  | 'leave'
  // Clients
  | 'clients'
  | 'client-activity'
  | 'client-payments'
  // Reports
  | 'financial-reports'
  | 'employee-reports'
  | 'client-reports'
  | 'business-analytics'
  // AI
  | 'ai-assistant'
  | 'business-insights'
  | 'business-watch'
  // Settings
  | 'settings';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'Income' | 'Expense';
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  paymentMethod: string;
  reference?: string;
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  hoursOrQty: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  client: string;
  clientCompany: string;
  clientEmail: string;
  clientAddress: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number; // 18% GST
  total: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft';
  notes?: string;
}

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  salary: {
    base: number;
    allowances: number;
    deductions: number;
    net: number;
    bankAccount: string;
    pan: string;
  };
  attendanceRate: number;
  presentDays: number;
  absentDays: number;
  leaveBalance: number;
  emergencyContact: string;
}

export interface Department {
  id: string;
  name: string;
  manager: string;
  employeeCount: number;
  monthlyCost: number;
  status: 'Active' | 'Under Budget' | 'Review Required';
  budgetLimit: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  present: number;
  absent: number;
  late: number;
  leave: number;
  totalDays: number;
  statusToday: 'Present' | 'Absent' | 'On Leave' | 'Late';
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  department: string;
  leaveType: 'Privilege Leave' | 'Casual Leave' | 'Sick Leave' | 'Maternity/Paternity';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  projectsCount: number;
  outstanding: number;
  totalBilled: number;
  status: 'Active' | 'Inactive' | 'Pending Onboarding';
  city: string;
  industry: string;
}

export interface ClientActivity {
  id: string;
  clientId: string;
  clientName: string;
  action: string;
  timestamp: string;
  type: 'invoice' | 'payment' | 'contract' | 'milestone' | 'support';
  amount?: number;
}

export interface AIInsight {
  id: string;
  title: string;
  category: 'Financial' | 'Client' | 'Revenue' | 'Expense' | 'Operations';
  severity: 'Info' | 'Attention' | 'Warning';
  date: string;
  explanation: string;
  details: string;
  recommendedAction: string;
  metricsImpacted?: string;
}

export interface BusinessWatchAlert {
  id: string;
  title: string;
  category: 'Cash Flow' | 'Expense Changes' | 'Overdue Payments' | 'Revenue Changes' | 'Budget Monitoring';
  status: 'Normal' | 'Watch' | 'Critical';
  currentValue: string;
  threshold: string;
  description: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: 'Finance' | 'Clients' | 'Employees' | 'Business' | 'AI Insights';
  time: string;
  read: boolean;
  actionRoute?: NavSection;
}

export interface Workspace {
  id: string;
  name: string;
  entityType: string;
  gstin: string;
  currency: string;
  financialYear: string;
}
