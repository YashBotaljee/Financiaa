import React from 'react';
import {
  CreditCard,
  Building,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Download,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatINR } from '../../utils/formatters';
import { useToast } from '../../components/common/Toast';

export const PaymentsPage: React.FC = () => {
  const { showToast } = useToast();

  const paymentGateways = [
    { name: 'HDFC Corporate Current A/c', type: 'Primary Bank (NEFT / RTGS / IMPS)', balance: '₹6,42,800', status: 'Connected', uptime: '99.98%' },
    { name: 'ICICI Commercial Treasury', type: 'Payroll & Operating Float', balance: '₹3,42,400', status: 'Connected', uptime: '100%' },
    { name: 'Razorpay B2B Corporate Gateway', type: 'Payment Gateway & Virtual UPI', balance: '₹1,85,200 Pending Settlement', status: 'Active', uptime: '99.95%' },
    { name: 'Corporate Amex & Visa Fleet', type: 'Credit Cards Line (₹10L Limit)', balance: '₹68,400 Utilized', status: 'Good Standing', uptime: 'N/A' },
  ];

  const recentSettlements = [
    { id: 'SET-8812', source: 'Tata Digital Services', channel: 'NEFT', amount: 485000, date: 'Sep 22, 2026', utr: 'HDFC0001298492' },
    { id: 'SET-8811', source: 'Staff Payroll Batch 1', channel: 'ICICI Bulk API', amount: 520000, date: 'Sep 15, 2026', utr: 'ICIC9982431088' },
    { id: 'SET-8810', source: 'InfoEdge India Ltd', channel: 'Razorpay Route', amount: 320000, date: 'Sep 18, 2026', utr: 'pay_N83a74b9981' },
    { id: 'SET-8809', source: 'Office Lease & Facility', channel: 'Net Banking', amount: 65000, date: 'Sep 14, 2026', utr: 'HDFC9821443109' },
    { id: 'SET-8808', source: 'AWS Compute Services', channel: 'Corporate Card', amount: 68400, date: 'Sep 20, 2026', utr: 'AMEX-882109' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Payment Infrastructure & Payouts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Bank accounts, corporate credit lines, and multi-channel payment reconciliation
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast('Reconciled all bank feeds with latest ledger entries', 'success')}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Reconcile Feeds
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => showToast('Dispatched automated bank statement export', 'success')}
            icon={<Download className="w-4 h-4" />}
          >
            Statement Download
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Liquid Float"
          value="₹9,85,200"
          subtitle="Across 2 bank accounts"
          trend="neutral"
          icon={<Building className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="T+1 Inflow in Transit"
          value="₹1,85,200"
          subtitle="Razorpay PG settlement"
          trend="up"
          trendPositive={true}
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-sky-50 text-sky-600"
        />
        <StatCard
          title="Corporate Credit Buffer"
          value="₹9,31,600"
          subtitle="Available of ₹10,00,000"
          trend="neutral"
          icon={<CreditCard className="w-5 h-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Auto-Reconciliation Rate"
          value="99.4%"
          subtitle="UTR automated matching"
          trend="up"
          trendPositive={true}
          icon={<ShieldCheck className="w-5 h-5" />}
          iconBgColor="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Linked Accounts */}
      <Card title="Connected Banking & Merchant Channels" subtitle="Live banking feeds for real-time synchronization">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentGateways.map((gw, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{gw.name}</span>
                <Badge variant="success" size="sm" dot>{gw.status}</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">{gw.type}</p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Position</span>
                  <span className="text-sm font-bold text-slate-900 font-sans">{gw.balance}</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                  Uptime: {gw.uptime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Settlements */}
      <Card title="Recent Bank Settlements & Dispatches" subtitle="Verified UTR transaction references from RBI RTGS/NEFT network">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Settlement ID</th>
                <th className="py-3 px-4">Counterparty / Purpose</th>
                <th className="py-3 px-4">Payment Channel</th>
                <th className="py-3 px-4">UTR / Bank Reference</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentSettlements.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{s.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{s.source}</td>
                  <td className="py-3 px-4 text-slate-600">{s.channel}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{s.utr}</td>
                  <td className="py-3 px-4 text-slate-500">{s.date}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 font-sans">
                    {formatINR(s.amount)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant="success" size="sm" dot>Settled</Badge>
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
