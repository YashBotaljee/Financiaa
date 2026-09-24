export interface FinancialSummaryRow {
  category: string;
  q1: number;
  q2: number;
  growth: number;
  notes: string;
}

export const PROFIT_LOSS_DATA = [
  { item: 'Operating Revenue (B2B SaaS & Services)', amount: 1842500, percentage: 100, isBold: true },
  { item: 'Direct Cost of Revenue (Cloud & Tools)', amount: 285000, percentage: 15.5, isBold: false },
  { item: 'Gross Profit', amount: 1557500, percentage: 84.5, isBold: true, isHighlight: true },
  { item: 'Staff Salaries & Benefits', amount: 654472, percentage: 35.5, isBold: false },
  { item: 'Sales & Marketing Expenses', amount: 135408, percentage: 7.3, isBold: false },
  { item: 'Facilities & Office Leases', amount: 67704, percentage: 3.7, isBold: false },
  { item: 'Administrative & Legal Expenses', amount: 45136, percentage: 2.4, isBold: false },
  { item: 'Depreciation & Amortization', amount: 25000, percentage: 1.4, isBold: false },
  { item: 'Total Operating Expenses (OPEX)', amount: 927720, percentage: 50.3, isBold: true },
  { item: 'Operating Income (EBITDA)', amount: 629780, percentage: 34.2, isBold: true, isHighlight: true },
  { item: 'Other Income (Interest & Forex Gain)', amount: 84320, percentage: 4.6, isBold: false },
  { item: 'Net Profit Before Tax', amount: 714100, percentage: 38.8, isBold: true, isSuccess: true },
];

export const CASH_FLOW_DATA = [
  { month: 'Apr', operating: 420000, investing: -80000, financing: 0, net: 340000 },
  { month: 'May', operating: 490000, investing: -120000, financing: 0, net: 370000 },
  { month: 'Jun', operating: 460000, investing: -50000, financing: 0, net: 410000 },
  { month: 'Jul', operating: 560000, investing: -75000, financing: 0, net: 485000 },
  { month: 'Aug', operating: 610000, investing: -90000, financing: 0, net: 520000 },
  { month: 'Sep', operating: 680000, investing: -110000, financing: 0, net: 570000 },
];

export const QUARTERLY_PERFORMANCE = [
  { quarter: 'Q1 FY26', revenue: 4470000, expenses: 3030000, netMargin: 32.2 },
  { quarter: 'Q2 FY26', revenue: 5252500, expenses: 3293400, netMargin: 37.3 },
];
