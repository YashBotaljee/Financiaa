import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowDownLeft,
  Clock,
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Transaction } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';
import { useToast } from '../../components/common/Toast';

export interface IncomePageProps {
  transactions: Transaction[];
  onOpenAddTransaction: () => void;
}

export const IncomePage: React.FC<IncomePageProps> = ({
  transactions,
  onOpenAddTransaction,
}) => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Filter only Income transactions
  const incomeList = transactions.filter((t) => t.type === 'Income');

  const filtered = incomeList.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    showToast('Exported income statement CSV successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Income Streams
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enterprise retainers, license billing, and client milestone receipts
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
            + Add Income
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Income"
          value="₹18,42,500"
          change={14.2}
          changePeriod="vs last month"
          trend="up"
          trendPositive={true}
          icon={<TrendingUp className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="This Month (Current Batch)"
          value="₹4,15,000"
          subtitle="9 Receipts booked"
          trend="neutral"
          icon={<ArrowDownLeft className="w-5 h-5" />}
          iconBgColor="bg-sky-50 text-sky-600"
        />
        <StatCard
          title="Pending Receivables"
          value="₹2,34,800"
          subtitle="Awaiting client settlement"
          trend="neutral"
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="MoM Income Growth"
          value="+14.2%"
          change={3.1}
          changePeriod="faster than Q1"
          trend="up"
          trendPositive={true}
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600"
        />
      </div>

      {/* Income Table Card */}
      <Card
        title="Income Breakdown & Receipts"
        subtitle={`Total ${filtered.length} client income records`}
        headerAction={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search source or client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-44 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Settled</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Source / Client Description</th>
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
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium border border-emerald-200/60">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.paymentMethod}</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-600 font-sans">
                    +{formatINR(item.amount)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge
                      variant={item.status === 'Completed' ? 'success' : 'warning'}
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
