import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Plus,
  Filter,
  Search,
  DollarSign,
  Building,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Transaction, NavSection } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';
import { REVENUE_EXPENSE_CHART } from '../../data/mock/businessData';
import { CASH_FLOW_DATA } from '../../data/mock/reports';
import { useToast } from '../../components/common/Toast';

export interface FinancialOverviewPageProps {
  transactions: Transaction[];
  onNavigate: (section: NavSection) => void;
  onOpenAddTransaction: () => void;
}

export const FinancialOverviewPage: React.FC<FinancialOverviewPageProps> = ({
  transactions,
  onNavigate,
  onOpenAddTransaction,
}) => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || t.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleExport = () => {
    showToast('Exporting complete ledger CSV to downloads folder...', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Financial Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time balance sheet, cash positions, and operating liquidity
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExport}
            icon={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenAddTransaction}
            icon={<Plus className="w-4 h-4" />}
          >
            + Add Transaction
          </Button>
        </div>
      </div>

      {/* 6 Finance KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <StatCard
          title="Revenue"
          value="₹18,42,500"
          change={12.4}
          trend="up"
          trendPositive={true}
          icon={<TrendingUp className="w-4 h-4" />}
          iconBgColor="bg-emerald-50 text-emerald-600"
          onClick={() => onNavigate('income')}
        />
        <StatCard
          title="Expenses"
          value="₹11,28,400"
          change={4.8}
          trend="up"
          trendPositive={false}
          icon={<ArrowUpRight className="w-4 h-4" />}
          iconBgColor="bg-rose-50 text-rose-600"
          onClick={() => onNavigate('expenses')}
        />
        <StatCard
          title="Net Profit"
          value="₹7,14,100"
          change={18.2}
          trend="up"
          trendPositive={true}
          icon={<Wallet className="w-4 h-4" />}
          iconBgColor="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Cash Balance"
          value="₹9,85,200"
          subtitle="In HDFC & ICICI"
          trend="neutral"
          icon={<Building className="w-4 h-4" />}
          iconBgColor="bg-sky-50 text-sky-600"
        />
        <StatCard
          title="Receivables"
          value="₹2,34,800"
          subtitle="5 Invoices"
          trend="neutral"
          icon={<ArrowDownLeft className="w-4 h-4" />}
          iconBgColor="bg-amber-50 text-amber-600"
          onClick={() => onNavigate('invoices')}
        />
        <StatCard
          title="Payables"
          value="₹1,12,000"
          subtitle="Vendor Dues"
          trend="neutral"
          icon={<Receipt className="w-4 h-4" />}
          iconBgColor="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Profit Trend */}
        <Card
          title="Revenue & Net Profit Trajectory"
          subtitle="Half-yearly progression across all business units"
        >
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_EXPENSE_CHART} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 100000}L`}
                />
                <Tooltip
                  formatter={(val: any) => [formatINR(val), '']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="profit" name="Net Profit" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-3 border-t border-slate-100 mt-2">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Net Profit</span>
          </div>
        </Card>

        {/* Cash Flow Chart */}
        <Card
          title="Operating Cash Flow Activity"
          subtitle="Monthly net operating inflow vs capital investments"
        >
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CASH_FLOW_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 100000}L`}
                />
                <Tooltip
                  formatter={(val: any) => [formatINR(val), '']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="operating" name="Operating Inflow" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="net" name="Net Surplus" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-3 border-t border-slate-100 mt-2">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Operating Cash</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Net Reserve Expansion</span>
          </div>
        </Card>
      </div>

      {/* Transaction Table with Filters */}
      <Card
        title="Ledger Transactions"
        subtitle={`Showing ${filteredTransactions.length} of ${transactions.length} records`}
        headerAction={
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search ledger..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-40 sm:w-48 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-2.5 px-3">TXN ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-700">{t.id}</td>
                  <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">{formatDate(t.date)}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-900">{t.description}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-medium">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{t.paymentMethod}</td>
                  <td
                    className={`py-2.5 px-3 text-right font-bold font-sans ${
                      t.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'
                    }`}
                  >
                    {t.type === 'Income' ? '+' : '-'} {formatINR(t.amount)}
                  </td>
                  <td className="py-2.5 px-3 text-center">
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
