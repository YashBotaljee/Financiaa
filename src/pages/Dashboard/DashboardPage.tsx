import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  ArrowUpRight,
  AlertCircle,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  DASHBOARD_KPIS,
  REVENUE_EXPENSE_CHART,
  EXPENSE_BREAKDOWN,
  CLIENT_PAYMENT_STATUS,
} from '../../data/mock/businessData';
import { Transaction, NavSection, Invoice } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';

export interface DashboardPageProps {
  transactions: Transaction[];
  onNavigate: (section: NavSection) => void;
  onOpenAddTransaction: () => void;
  onViewInvoice: (invoiceId: string) => void;
  invoices: Invoice[];
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  transactions,
  onNavigate,
  onOpenAddTransaction,
  onViewInvoice,
  invoices,
}) => {
  const recentTransactions = transactions.slice(0, 5);

  const formatTooltipValue = (value: any) => {
    if (typeof value === 'number') {
      return [formatINR(value), ''];
    }
    return [value, ''];
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Good morning, Business Owner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here's what's happening with your business today.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate('financial-reports')}
            icon={<FileText className="w-4 h-4" />}
          >
            Financial Reports
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenAddTransaction}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={formatINR(DASHBOARD_KPIS.totalRevenue.value)}
          change={DASHBOARD_KPIS.totalRevenue.change}
          changePeriod={DASHBOARD_KPIS.totalRevenue.period}
          trend={DASHBOARD_KPIS.totalRevenue.trend}
          trendPositive={true}
          icon={<TrendingUp className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600"
          onClick={() => onNavigate('income')}
        />
        <StatCard
          title="Total Expenses"
          value={formatINR(DASHBOARD_KPIS.totalExpenses.value)}
          change={DASHBOARD_KPIS.totalExpenses.change}
          changePeriod={DASHBOARD_KPIS.totalExpenses.period}
          trend={DASHBOARD_KPIS.totalExpenses.trend}
          trendPositive={false}
          icon={<Receipt className="w-5 h-5" />}
          iconBgColor="bg-rose-50 text-rose-600"
          onClick={() => onNavigate('expenses')}
        />
        <StatCard
          title="Net Profit"
          value={formatINR(DASHBOARD_KPIS.netProfit.value)}
          change={DASHBOARD_KPIS.netProfit.change}
          changePeriod={DASHBOARD_KPIS.netProfit.period}
          trend={DASHBOARD_KPIS.netProfit.trend}
          trendPositive={true}
          icon={<Wallet className="w-5 h-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600"
          onClick={() => onNavigate('finance-overview')}
        />
        <StatCard
          title="Outstanding Payments"
          value={formatINR(DASHBOARD_KPIS.outstandingPayments.value)}
          subtitle={DASHBOARD_KPIS.outstandingPayments.note}
          badge={DASHBOARD_KPIS.outstandingPayments.period}
          icon={<AlertCircle className="w-5 h-5" />}
          iconBgColor="bg-amber-50 text-amber-600"
          onClick={() => onNavigate('invoices')}
        />
      </div>

      {/* Charts Grid: Revenue vs Expenses & Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Expenses Chart (2 cols) */}
        <Card
          title="Revenue vs Expenses Trend"
          subtitle="Monthly cash flow and operating performance comparison"
          className="lg:col-span-2"
          headerAction={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('finance-overview')}
              className="text-xs"
            >
              Full Analysis →
            </Button>
          }
        >
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_EXPENSE_CHART} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 100000}L`}
                />
                <Tooltip
                  formatter={formatTooltipValue}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#f43f5e"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#expenseGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600" />
              <span>Revenue (₹18,42,500 Sep)</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>Expenses (₹11,28,400 Sep)</span>
            </span>
          </div>
        </Card>

        {/* Expense Breakdown Donut Chart (1 col) */}
        <Card
          title="Expense Breakdown"
          subtitle="Distribution of current month expenditures"
          headerAction={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('expenses')}
              className="text-xs"
            >
              Details →
            </Button>
          }
        >
          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={EXPENSE_BREAKDOWN}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {EXPENSE_BREAKDOWN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [formatINR(val), 'Amount']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total</span>
              <span className="text-sm font-black text-slate-800 font-sans">₹11.28L</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            {EXPENSE_BREAKDOWN.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="font-semibold text-slate-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Middle Grid: Client Payment Status & AI Business Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Payment Status */}
        <Card
          title="Client Payment Status"
          subtitle="Receivables health & outstanding aging overview"
          className="lg:col-span-1"
          headerAction={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('invoices')}
              className="text-xs"
            >
              Invoices →
            </Button>
          }
        >
          <div className="space-y-4">
            {/* Visual Bar */}
            <div className="h-3 w-full bg-slate-100 rounded-full flex overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all"
                style={{ width: `${CLIENT_PAYMENT_STATUS.paid.percentage}%` }}
                title={`Paid: ${CLIENT_PAYMENT_STATUS.paid.percentage}%`}
              />
              <div
                className="bg-amber-500 h-full transition-all"
                style={{ width: `${CLIENT_PAYMENT_STATUS.pending.percentage}%` }}
                title={`Pending: ${CLIENT_PAYMENT_STATUS.pending.percentage}%`}
              />
              <div
                className="bg-rose-500 h-full transition-all"
                style={{ width: `${CLIENT_PAYMENT_STATUS.overdue.percentage}%` }}
                title={`Overdue: ${CLIENT_PAYMENT_STATUS.overdue.percentage}%`}
              />
            </div>

            {/* Status breakdown items */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-800">Paid Invoices</span>
                    <p className="text-[10px] text-slate-500">{CLIENT_PAYMENT_STATUS.paid.count} invoices settled</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 font-sans">
                    {formatINR(CLIENT_PAYMENT_STATUS.paid.amount)}
                  </span>
                  <p className="text-[10px] text-emerald-600">{CLIENT_PAYMENT_STATUS.paid.percentage}%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50/50 border border-amber-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-800">Pending Invoices</span>
                    <p className="text-[10px] text-slate-500">{CLIENT_PAYMENT_STATUS.pending.count} awaiting term due</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-700 font-sans">
                    {formatINR(CLIENT_PAYMENT_STATUS.pending.amount)}
                  </span>
                  <p className="text-[10px] text-amber-600">{CLIENT_PAYMENT_STATUS.pending.percentage}%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-rose-50/50 border border-rose-100">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-800">Overdue Invoices</span>
                    <p className="text-[10px] text-slate-500">{CLIENT_PAYMENT_STATUS.overdue.count} requiring reminders</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-rose-700 font-sans">
                    {formatINR(CLIENT_PAYMENT_STATUS.overdue.amount)}
                  </span>
                  <p className="text-[10px] text-rose-600 font-semibold">{CLIENT_PAYMENT_STATUS.overdue.percentage}%</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Business Insights (2 cols) */}
        <Card
          title={
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Business Insights</span>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                Auto-Auditor
              </span>
            </div>
          }
          subtitle="Proactive recommendations derived from operational ledger patterns"
          className="lg:col-span-2"
          headerAction={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('business-insights')}
              className="text-xs"
            >
              All Insights →
            </Button>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="info" size="sm">Revenue Growth</Badge>
                <span className="text-[10px] text-slate-400">Sep 20</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                Revenue increased compared with the previous month.
              </h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Total monthly billings expanded by 12.4% MoM driven by new enterprise retained agreements.
              </p>
              <button
                onClick={() => onNavigate('ai-assistant')}
                className="mt-3 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Ask AI to explain</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-amber-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="warning" size="sm">Receivables</Badge>
                <span className="text-[10px] text-slate-400">Sep 21</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                3 client invoices are overdue.
              </h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                ₹2,34,800 is past due. Follow-ups recommended for Tata Digital and Zomato Hub accounts.
              </p>
              <button
                onClick={() => onNavigate('invoices')}
                className="mt-3 text-[11px] font-semibold text-amber-600 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Review overdue invoices</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="info" size="sm">Expenditure</Badge>
                <span className="text-[10px] text-slate-400">Sep 22</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                Marketing expenses increased compared with the previous period.
              </h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Ad spend is up ₹18,000 for Q3 lead gen campaign with improved customer acquisition rate.
              </p>
              <button
                onClick={() => onNavigate('expenses')}
                className="mt-3 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect campaign ledger</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="success" size="sm">Treasury Safety</Badge>
                <span className="text-[10px] text-slate-400">Sep 18</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                Cash flow remains within the configured business threshold.
              </h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Liquid cash reserves of ₹9,85,200 safely cover 6.2 months of fixed operational runway.
              </p>
              <button
                onClick={() => onNavigate('business-watch')}
                className="mt-3 text-[11px] font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Open Business Watch</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <Card
        title="Recent Transactions"
        subtitle="Latest ledger activities recorded across all operating bank accounts"
        headerAction={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('transactions')}
            className="text-xs"
          >
            View All Transactions ({transactions.length}) →
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{formatDate(t.date)}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">{t.description}</span>
                    <p className="text-[10px] text-slate-400 font-mono">{t.id} • {t.paymentMethod}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={t.type === 'Income' ? 'success' : 'neutral'} size="sm">
                      {t.type}
                    </Badge>
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-bold font-sans ${
                      t.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'
                    }`}
                  >
                    {t.type === 'Income' ? '+' : '-'} {formatINR(t.amount)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge
                      variant={
                        t.status === 'Completed'
                          ? 'success'
                          : t.status === 'Pending'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                      dot
                    >
                      {t.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
