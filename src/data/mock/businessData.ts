import { Workspace } from '../../types';

export const WORKSPACES: Workspace[] = [
  {
    id: 'ws-1',
    name: 'Apex Nova Tech Pvt Ltd',
    entityType: 'Private Limited Company',
    gstin: '29ABCDE1234F1Z5',
    currency: 'INR (₹)',
    financialYear: '2025-2026',
  },
  {
    id: 'ws-2',
    name: 'Zenith Logistics India',
    entityType: 'LLP',
    gstin: '27AABCT8823Q1ZX',
    currency: 'INR (₹)',
    financialYear: '2025-2026',
  },
  {
    id: 'ws-3',
    name: 'CloudScale Ventures',
    entityType: 'Proprietorship',
    gstin: '07BBBPK9910D1Z2',
    currency: 'INR (₹)',
    financialYear: '2025-2026',
  },
];

export const DASHBOARD_KPIS = {
  totalRevenue: {
    value: 1842500,
    change: 12.4,
    trend: 'up' as const,
    period: 'vs previous month',
  },
  totalExpenses: {
    value: 1128400,
    change: 4.8,
    trend: 'up' as const,
    period: 'vs previous month',
  },
  netProfit: {
    value: 714100,
    change: 18.2,
    trend: 'up' as const,
    period: 'vs previous month',
  },
  outstandingPayments: {
    value: 234800,
    count: 5,
    note: '5 invoices',
    period: 'Action needed',
  },
};

export const REVENUE_EXPENSE_CHART = [
  { month: 'Apr', revenue: 1420000, expenses: 980000, profit: 440000 },
  { month: 'May', revenue: 1560000, expenses: 1040000, profit: 520000 },
  { month: 'Jun', revenue: 1490000, expenses: 1010000, profit: 480000 },
  { month: 'Jul', revenue: 1680000, expenses: 1090000, profit: 590000 },
  { month: 'Aug', revenue: 1730000, expenses: 1075000, profit: 655000 },
  { month: 'Sep', revenue: 1842500, expenses: 1128400, profit: 714100 },
];

export const EXPENSE_BREAKDOWN = [
  { name: 'Salaries', value: 654472, percentage: 58, color: '#3b82f6' },
  { name: 'Marketing', value: 135408, percentage: 12, color: '#8b5cf6' },
  { name: 'Operations', value: 124124, percentage: 11, color: '#10b981' },
  { name: 'Software', value: 101556, percentage: 9, color: '#f59e0b' },
  { name: 'Office', value: 67704, percentage: 6, color: '#ec4899' },
  { name: 'Other', value: 45136, percentage: 4, color: '#64748b' },
];

export const CLIENT_PAYMENT_STATUS = {
  paid: { amount: 1420000, count: 19, percentage: 77 },
  pending: { amount: 187700, count: 4, percentage: 10 },
  overdue: { amount: 234800, count: 5, percentage: 13 },
};
