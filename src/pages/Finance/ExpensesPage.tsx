import React, { useState } from 'react';
import {
  Receipt,
  ArrowUpRight,
  TrendingDown,
  PieChart as PieIcon,
  Download,
  Plus,
  Search,
  Filter,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Transaction } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';
import { EXPENSE_BREAKDOWN } from '../../data/mock/businessData';
import { useToast } from '../../components/common/Toast';

export interface ExpensesPageProps {
  transactions: Transaction[];
  onOpenAddTransaction: () => void;
}

export const ExpensesPage: React.FC<ExpensesPageProps> = ({
  transactions,
  onOpenAddTransaction,
}) => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter only Expense transactions
  const expenseList = transactions.filter((t) => t.type === 'Expense');

  const filtered = expenseList.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExport = () => {
    showToast('Exported expense ledger CSV file.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Operating Expenses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Payroll, cloud infrastructure, facilities, and vendor expenditure analysis
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
            + Add Expense
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Expenses"
          value="₹11,28,400"
          change={4.8}
          changePeriod="vs last month"
          trend="up"
          trendPositive={false}
          icon={<Receipt className="w-5 h-5" />}
          iconBgColor="bg-rose-50 text-rose-600"
        />
        <StatCard
          title="Monthly Direct OPEX"
          value="₹2,85,000"
          subtitle="Non-payroll overheads"
          trend="neutral"
          icon={<ArrowUpRight className="w-5 h-5" />}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Highest Category"
          value="Salaries (58%)"
          subtitle="₹6,54,472 core staff"
          trend="neutral"
          icon={<PieIcon className="w-5 h-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Average Monthly Expense"
          value="₹2,82,100"
          subtitle="Trailing 6-month mean"
          trend="neutral"
          icon={<TrendingDown className="w-5 h-5" />}
          iconBgColor="bg-slate-100 text-slate-600"
        />
      </div>

      {/* Category Budget Allocation Visualization */}
      <Card
        title="Expense Category Allocations"
        subtitle="Distribution across operating departments & software assets"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPENSE_BREAKDOWN.map((cat) => (
            <div
              key={cat.name}
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span className="text-xs font-bold text-slate-900 font-sans">{formatINR(cat.value)}</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                <span>Monthly share</span>
                <span className="font-semibold text-slate-700">{cat.percentage}% of total</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Expense Ledger Table */}
      <Card
        title="Expense Ledger Records"
        subtitle={`Total ${filtered.length} recorded debits`}
        headerAction={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-44 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
            >
              <option value="All">All Categories</option>
              {EXPENSE_BREAKDOWN.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{formatDate(item.date)}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">{item.description}</span>
                    <p className="text-[10px] text-slate-400 font-mono">{item.id}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.paymentMethod}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 font-sans">
                    -{formatINR(item.amount)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge
                      variant={item.status === 'Completed' ? 'success' : 'danger'}
                      size="sm"
                      dot
                    >
                      {item.status}
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
