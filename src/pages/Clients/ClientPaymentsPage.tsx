import React from 'react';
import {
  DollarSign,
  AlertTriangle,
  Clock,
  Send,
  Download,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatINR } from '../../utils/formatters';
import { useToast } from '../../components/common/Toast';

export const ClientPaymentsPage: React.FC = () => {
  const { showToast } = useToast();

  const agingBuckets = [
    { title: 'Current (0 - 30 Days)', amount: 187700, count: 4, status: 'Within Terms', color: 'bg-emerald-500' },
    { title: '31 - 60 Days', amount: 112316, count: 2, status: 'Overdue Attention', color: 'bg-amber-500' },
    { title: '61 - 90 Days', amount: 122484, count: 1, status: 'Critical Followup', color: 'bg-rose-500' },
    { title: '90+ Days (Bad Debt Risk)', amount: 0, count: 0, status: 'Clean Record', color: 'bg-slate-400' },
  ];

  const overdueAccounts = [
    { client: 'Tata Digital Services', invoiceId: 'INV-1045', amount: 212400, daysPast: 3, contact: 'Suresh Narayanan', email: 'procure@tatadigital.in' },
    { client: 'Zomato Kitchens Hub', invoiceId: 'INV-1042', amount: 122484, daysPast: 12, contact: 'Deepinder Goyal', email: 'vendor.pay@zomatohub.com' },
  ];

  const handleSendReminder = (client: string, email: string) => {
    showToast(`Payment reminder and automated Razorpay link sent to ${email}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Client Receivables & Payment Aging
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Accounts receivable aging buckets, collection velocity, and overdue recovery actions
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast('Exporting Aging Schedule PDF for auditors', 'info')}
            icon={<Download className="w-4 h-4" />}
          >
            Export Aging Report
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => showToast('Dispatched batch reminder notices to all 3 overdue clients', 'success')}
            icon={<Send className="w-4 h-4" />}
          >
            Batch Remind All
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Receivables"
          value="₹4,22,500"
          subtitle="9 Outstanding invoices"
          trend="neutral"
          icon={<DollarSign className="w-5 h-5" />}
          iconBgColor="bg-slate-100 text-slate-600"
        />
        <StatCard
          title="Days Sales Outstanding (DSO)"
          value="34 Days"
          change={4}
          changePeriod="faster recovery than Q1"
          trend="up"
          trendPositive={true}
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Overdue Receivables"
          value="₹2,34,800"
          subtitle="3 Accounts past grace"
          badge="Action required"
          trend="down"
          trendPositive={false}
          icon={<AlertTriangle className="w-5 h-5" />}
          iconBgColor="bg-rose-50 text-rose-600"
        />
        <StatCard
          title="Collection Success Rate"
          value="98.1%"
          change={0.8}
          changePeriod="MoM collection index"
          trend="up"
          trendPositive={true}
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Aging Schedule Breakdown */}
      <Card title="Accounts Receivable Aging Schedule" subtitle="Categorized overdue exposure by days elapsed past invoice due date">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agingBuckets.map((bucket, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${bucket.color}`} />
                <span className="text-xs font-bold text-slate-800">{bucket.title}</span>
              </div>
              <div className="text-xl font-bold text-slate-900 font-sans mt-2">
                {formatINR(bucket.amount)}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{bucket.count} Invoices</span>
                <span className="font-semibold text-slate-700">{bucket.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Overdue Accounts Table */}
      <Card title="Flagged Overdue Client Invoices" subtitle="Targeted collection queue with automated reminder dispatch">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Invoice ID</th>
                <th className="py-3 px-4">Days Overdue</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4 text-right">Amount Due</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {overdueAccounts.map((acc, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{acc.client}</td>
                  <td className="py-3 px-4 font-mono font-bold text-indigo-600">{acc.invoiceId}</td>
                  <td className="py-3 px-4 text-rose-600 font-bold">
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200">
                      +{acc.daysPast} days overdue
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <div>{acc.contact}</div>
                    <div className="text-[10px] text-slate-400">{acc.email}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 font-sans">
                    {formatINR(acc.amount)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<Send className="w-3.5 h-3.5" />}
                      onClick={() => handleSendReminder(acc.client, acc.email)}
                    >
                      Send Reminder
                    </Button>
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
