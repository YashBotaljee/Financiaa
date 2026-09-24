import { AIInsight, BusinessWatchAlert } from '../../types';

export const AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-1',
    title: 'Operating expenses increased compared with the previous period',
    category: 'Expense',
    severity: 'Attention',
    date: 'Sep 22, 2026',
    explanation: 'Total monthly expenditures increased by 4.8% (₹53,400) primarily driven by cloud compute scaling and recruitment ad spend.',
    details: 'Analysis shows AWS GPU instance usage jumped 22% due to background AI pipeline training in the Engineering department. Additionally, performance marketing expenses rose by ₹18,000 for the Q3 campaign kickoff.',
    recommendedAction: 'Audit unutilized cloud instances on AWS and enforce automatic shutdown schedules for staging environments.',
    metricsImpacted: 'Operating Margin (-1.8%), Cloud Spend (+22%)',
  },
  {
    id: 'ins-2',
    title: 'Several invoices are approaching their due date',
    category: 'Client',
    severity: 'Warning',
    date: 'Sep 21, 2026',
    explanation: '3 client accounts have receivables past grace period totaling ₹2,34,800, representing 12.7% of total monthly billed revenue.',
    details: 'Accounts flagged include Tata Digital Services (INV-1045, ₹2,12,400 overdue by 3 days) and Zomato Kitchens Hub (INV-1042, ₹1,22,484 overdue by 12 days). Cash collection velocity is down 6 days.',
    recommendedAction: 'Trigger automated WhatsApp/Email reconciliation statements to client accounts department with Razorpay instant payment links.',
    metricsImpacted: 'DSO (Days Sales Outstanding) increased to 38 days',
  },
  {
    id: 'ins-3',
    title: 'Revenue shows a positive trend over recent months',
    category: 'Revenue',
    severity: 'Info',
    date: 'Sep 20, 2026',
    explanation: 'Total monthly revenue reached ₹18,42,500, marking a 12.4% month-over-month expansion and +29.7% growth compared to Q1 baseline.',
    details: 'Growth was driven by recurring retainer expansions in Enterprise SaaS clients (+18%) and new consulting milestones from Reliance Retail and Bharat Mobility Corp.',
    recommendedAction: 'Lock in multi-quarter prepaid retention agreements by offering a 5% discount for upfront annual commitments.',
    metricsImpacted: 'Monthly Recurring Revenue (MRR) +14.2%',
  },
  {
    id: 'ins-4',
    title: 'Software expenses represent a significant portion of recurring costs',
    category: 'Expense',
    severity: 'Attention',
    date: 'Sep 19, 2026',
    explanation: 'Software subscriptions currently account for 9% (₹1,01,556) of total overheads with 4 duplicate or overlapping tool seats detected.',
    details: 'Identified 6 unused seats in design and project tracking software across inactive contractors. Consolidating collaboration licenses can save ~₹18,500/month.',
    recommendedAction: 'Execute a single-sign-on (SSO) seat audit to de-provision licenses for contractors who completed their engagements.',
    metricsImpacted: 'Annualized recurring savings potential: ₹2,22,000',
  },
  {
    id: 'ins-5',
    title: 'Cash flow remains within the configured business threshold',
    category: 'Financial',
    severity: 'Info',
    date: 'Sep 18, 2026',
    explanation: 'Net liquid reserves stand at ₹9,85,200 with an operating cash burn coverage buffer of 6.2 months.',
    details: 'Current liquidity ratio is 2.8x (safe threshold is 1.5x). Working capital cycle has remained steady despite client payment delays in two accounts.',
    recommendedAction: 'Maintain current working capital allocation while deploying surplus ₹3,00,000 in overnight liquid treasury sweeps.',
    metricsImpacted: 'Quick Ratio 2.4x, Runway 6.2 months',
  },
];

export const BUSINESS_WATCH_ALERTS: BusinessWatchAlert[] = [
  {
    id: 'bw-1',
    title: '3 invoices are overdue',
    category: 'Overdue Payments',
    status: 'Critical',
    currentValue: '₹2,34,800 overdue',
    threshold: '< ₹50,000 / 0 Overdue',
    description: 'Invoices INV-1045, INV-1042, and INV-1033 require immediate attention to prevent liquidity strain.',
    updatedAt: '12 mins ago',
  },
  {
    id: 'bw-2',
    title: 'Monthly software expenses changed significantly',
    category: 'Expense Changes',
    status: 'Watch',
    currentValue: '₹1,01,556 (+18.4%)',
    threshold: '±5% monthly variance',
    description: 'AWS GPU usage and SaaS seat expansions generated higher than anticipated monthly debit.',
    updatedAt: '2 hours ago',
  },
  {
    id: 'bw-3',
    title: 'Revenue is above the previous month’s value',
    category: 'Revenue Changes',
    status: 'Normal',
    currentValue: '₹18,42,500 (+12.4%)',
    threshold: 'Target: ₹16,50,000',
    description: 'B2B enterprise pipeline conversion beat quarterly forecasts with high retainer retention.',
    updatedAt: '1 day ago',
  },
  {
    id: 'bw-4',
    title: 'Cash Flow runway buffer',
    category: 'Cash Flow',
    status: 'Normal',
    currentValue: '6.2 Months Runway',
    threshold: 'Minimum 4 Months',
    description: 'Total liquid reserves of ₹9,85,200 safely cover all upcoming payroll and vendor cycles.',
    updatedAt: '1 day ago',
  },
  {
    id: 'bw-5',
    title: 'Engineering Q2 budget consumption rate',
    category: 'Budget Monitoring',
    status: 'Watch',
    currentValue: '89.1% Utilized',
    threshold: 'Max 85% at day 24',
    description: 'Department has used ₹9.8L of ₹11L allocated budget with 6 working days remaining in the month.',
    updatedAt: '3 hours ago',
  },
];

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  metrics?: { label: string; value: string; trend?: 'up' | 'down' | 'neutral' }[];
  breakdown?: { item: string; amount: string; share?: string }[];
  actionRecommendation?: string;
}

export const AI_SUGGESTED_QUESTIONS = [
  'Why did expenses increase this month?',
  'What are my highest expenses?',
  'Which clients have pending payments?',
  'How is revenue performing?',
  'What changed compared with last month?',
];

export const CANNED_AI_RESPONSES: Record<string, Omit<ChatMessage, 'id' | 'sender' | 'timestamp'>> = {
  'Why did expenses increase this month?': {
    text: 'Expenses increased by **4.8% (₹53,400)** this month. The rise is concentrated in two areas: **Engineering Cloud Infrastructure** (+22% due to dedicated ML model evaluation clusters on AWS) and **Digital Acquisition Ads** (+₹18,000 for the Q3 pipeline acceleration). Payroll remained consistent.',
    metrics: [
      { label: 'Total Expenses', value: '₹11,28,400', trend: 'up' },
      { label: 'Cloud Infrastructure', value: '₹68,400 (+22%)', trend: 'up' },
      { label: 'Marketing Campaigns', value: '₹85,400 (+12%)', trend: 'up' },
    ],
    breakdown: [
      { item: 'AWS Compute Scaling', amount: '₹68,400', share: '6.1%' },
      { item: 'Paid B2B Advertising', amount: '₹85,400', share: '7.6%' },
      { item: 'Office Facility Upgrades', amount: '₹14,200', share: '1.3%' },
    ],
    actionRecommendation: 'Implement auto-scaling shutoffs for idle testing servers after 7 PM to recover ~₹16,000 next billing cycle.',
  },
  'What are my highest expenses?': {
    text: 'Your single largest expenditure remains **Salaries & Employee Payouts**, making up **58%** of your total monthly expense book. Here is the ranked operational breakdown:',
    metrics: [
      { label: 'Salaries & Benefits', value: '₹6,54,472 (58%)', trend: 'neutral' },
      { label: 'Marketing & Ads', value: '₹1,35,408 (12%)', trend: 'neutral' },
      { label: 'Operations & Facilities', value: '₹1,24,124 (11%)', trend: 'neutral' },
    ],
    breakdown: [
      { item: 'Salaries & Staff Compensation', amount: '₹6,54,472', share: '58%' },
      { item: 'Marketing & Demand Gen', amount: '₹1,35,408', share: '12%' },
      { item: 'Operations & Maintenance', amount: '₹1,24,124', share: '11%' },
      { item: 'Software & Cloud Licenses', amount: '₹1,01,556', share: '9%' },
      { item: 'Office Leases & Utilities', amount: '₹67,704', share: '6%' },
      { item: 'Legal & Ancillary', amount: '₹45,136', share: '4%' },
    ],
    actionRecommendation: 'Your salary-to-revenue ratio sits at an optimal 35.5%, well within healthy SaaS operational benchmarks (30-45%).',
  },
  'Which clients have pending payments?': {
    text: 'You currently have **₹4,22,500** in total accounts receivable across 9 invoices. Of this, **₹2,34,800 is overdue** across 3 client accounts and requires immediate follow-up.',
    metrics: [
      { label: 'Total Unpaid', value: '₹4,22,500', trend: 'down' },
      { label: 'Overdue Amount', value: '₹2,34,800 (3 clients)', trend: 'down' },
      { label: 'Within Terms', value: '₹1,87,700 (4 clients)', trend: 'neutral' },
    ],
    breakdown: [
      { item: 'Tata Digital Services (INV-1045)', amount: '₹2,12,400', share: 'Overdue 3 days' },
      { item: 'Zomato Kitchens Hub (INV-1042)', amount: '₹1,22,484', share: 'Overdue 12 days' },
      { item: 'Bharat Mobility Corp (INV-1044)', amount: '₹2,36,000', share: 'Due in 3 days' },
      { item: 'Zerodha Capital Partner (INV-1041)', amount: '₹1,47,500', share: 'Due in 8 days' },
    ],
    actionRecommendation: 'Dispatch the automated one-click UPI/NEFT payment reminder link to Tata Digital and Zomato accounts coordinators.',
  },
  'How is revenue performing?': {
    text: 'Revenue performance is **exceptionally strong**. Month-to-date revenue is **₹18,42,500**, reflecting **+12.4% MoM growth** and outperforming your quarterly plan by 11.2%. Gross margin stands robust at **38.8%**.',
    metrics: [
      { label: 'Monthly Revenue', value: '₹18,42,500', trend: 'up' },
      { label: 'Net Profit Margin', value: '38.8%', trend: 'up' },
      { label: 'MoM Growth', value: '+12.4%', trend: 'up' },
    ],
    breakdown: [
      { item: 'Enterprise Retainers', amount: '₹9,87,500', share: '53.6%' },
      { item: 'Software Sales & Licenses', amount: '₹4,45,000', share: '24.2%' },
      { item: 'Technical Consulting & Implementation', amount: '₹4,10,000', share: '22.2%' },
    ],
    actionRecommendation: 'Capitalize on Q3 momentum by pitching multi-year commitments to your top 3 tier-1 enterprise accounts.',
  },
  'What changed compared with last month?': {
    text: 'Key operational delta summary for **September vs August**:\n- **Revenue** expanded by **₹1,12,500 (+12.4%)** thanks to new enterprise onboarding.\n- **Expenses** grew modestly by **₹53,400 (+4.8%)** from cloud GPU compute.\n- **Net Profit** expanded significantly to **₹7,14,100 (+18.2%)**.\n- **Outstanding Invoices** dropped from ₹3,10,000 to ₹2,34,800 as collections improved.',
    metrics: [
      { label: 'Delta Revenue', value: '+₹1,12,500', trend: 'up' },
      { label: 'Delta Expenses', value: '+₹53,400', trend: 'down' },
      { label: 'Delta Profit', value: '+₹59,100', trend: 'up' },
    ],
    breakdown: [
      { item: 'Net Profit Growth', amount: '+18.2%', share: 'Positive' },
      { item: 'Cash Balance Increase', amount: '+₹1,45,000', share: 'Positive' },
      { item: 'Average Collection Days', amount: '38 to 34 days', share: 'Improved' },
    ],
    actionRecommendation: 'Your operating leverage ratio expanded by 1.4x, indicating that top-line revenue is outpacing fixed overhead expansion.',
  },
};
