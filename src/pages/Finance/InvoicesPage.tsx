import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Eye,
  Download,
  Filter,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Invoice } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';
import { useToast } from '../../components/common/Toast';

export interface InvoicesPageProps {
  invoices: Invoice[];
  onOpenCreateInvoice: () => void;
  onViewInvoice: (invoice: Invoice) => void;
}

export const InvoicesPage: React.FC<InvoicesPageProps> = ({
  invoices,
  onOpenCreateInvoice,
  onViewInvoice,
}) => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const paidCount = invoices.filter((i) => i.status === 'Paid').length;
  const pendingCount = invoices.filter((i) => i.status === 'Pending').length;
  const overdueCount = invoices.filter((i) => i.status === 'Overdue').length;

  const filtered = invoices.filter((i) => {
    const matchesSearch =
      i.id.toLowerCase().includes(search.toLowerCase()) ||
      i.client.toLowerCase().includes(search.toLowerCase()) ||
      i.clientCompany.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || i.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'Paid':
        return <Badge variant="success" dot>Paid</Badge>;
      case 'Pending':
        return <Badge variant="warning" dot>Pending</Badge>;
      case 'Overdue':
        return <Badge variant="danger" dot>Overdue</Badge>;
      case 'Draft':
        return <Badge variant="neutral" dot>Draft</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Invoice Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            B2B client invoices, GST taxation calculations, and automated payment tracking
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast('Exporting invoices archive CSV', 'success')}
            icon={<Download className="w-4 h-4" />}
          >
            Export Invoices
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateInvoice}
            icon={<Plus className="w-4 h-4" />}
          >
            + Create Invoice
          </Button>
        </div>
      </div>

      {/* 4 Invoice Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Invoices"
          value={`${invoices.length} Bills`}
          subtitle="FY 2025-26 active ledger"
          trend="neutral"
          icon={<FileText className="w-5 h-5" />}
          iconBgColor="bg-slate-100 text-slate-600"
        />
        <StatCard
          title="Paid Invoices"
          value={`${paidCount} Settled`}
          subtitle="₹14,20,000 received"
          trend="up"
          trendPositive={true}
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Pending Invoices"
          value={`${pendingCount} Awaiting`}
          subtitle="Within agreed credit terms"
          trend="neutral"
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Overdue Invoices"
          value={`${overdueCount} Flagged`}
          subtitle="Action required"
          badge="Follow-up needed"
          trend="down"
          trendPositive={false}
          icon={<AlertCircle className="w-5 h-5" />}
          iconBgColor="bg-rose-50 text-rose-600"
        />
      </div>

      {/* Invoice Table Card */}
      <Card
        title="All Tax Invoices"
        subtitle={`Showing ${filtered.length} invoice records`}
        headerAction={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search invoice or client..."
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
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Invoice ID</th>
                <th className="py-3 px-4">Client / Company</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Tax (18% GST)</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-600">{inv.id}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{inv.client}</span>
                    <span className="text-[10px] text-slate-500">{inv.clientCompany}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{formatDate(inv.issueDate)}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={inv.status === 'Overdue' ? 'font-bold text-rose-600' : 'text-slate-600'}>
                      {formatDate(inv.dueDate)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-500">{formatINR(inv.tax)}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 font-sans">
                    {formatINR(inv.total)}
                  </td>
                  <td className="py-3 px-4 text-center">{getStatusBadge(inv.status)}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => onViewInvoice(inv)}
                      >
                        View
                      </Button>
                      <button
                        onClick={() => showToast(`Downloaded PDF for ${inv.id}`, 'info')}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
