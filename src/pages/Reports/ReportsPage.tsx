import React, { useState } from 'react';
import {
  BarChart3,
  FileSpreadsheet,
  Download,
  Printer,
  Calendar,
  Filter,
  CheckCircle2,
  TrendingUp,
  FileText,
  DollarSign,
  Users,
  Briefcase,
  PieChart as PieIcon,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatCard } from '../../components/common/StatCard';
import { PROFIT_LOSS_DATA, CASH_FLOW_DATA, QUARTERLY_PERFORMANCE } from '../../data/mock/reports';
import { formatINR } from '../../utils/formatters';
import { useToast } from '../../components/common/Toast';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';

export interface ReportsPageProps {
  initialTab?: 'financial' | 'employee' | 'client' | 'analytics';
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ initialTab = 'financial' }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'financial' | 'employee' | 'client' | 'analytics'>(initialTab);
  const [dateRange, setDateRange] = useState('FY 2025-26');
  const [frequency, setFrequency] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');

  const handleGenerate = () => {
    showToast(`Compiled updated executive ${activeTab} report for ${dateRange} (${frequency})`, 'success');
  };

  const handleDownloadPDF = () => {
    showToast(`Exporting formatted Board Pack PDF (${dateRange})...`, 'info');
  };

  const handleExportCSV = () => {
    showToast('Downloaded raw financial audit CSV successfully', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Reports & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Executive financial statements, statutory P&L, workforce metrics, and business intelligence
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCSV}
            icon={<FileSpreadsheet className="w-4 h-4" />}
          >
            Export CSV
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadPDF}
            icon={<Download className="w-4 h-4" />}
          >
            Download PDF
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleGenerate}
            icon={<BarChart3 className="w-4 h-4" />}
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        {/* Navigation sub-tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'financial'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Financial & P&L
          </button>
          <button
            onClick={() => setActiveTab('employee')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'employee'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Employee Reports
          </button>
          <button
            onClick={() => setActiveTab('client')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'client'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Client Reports
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Business Analytics
          </button>
        </div>

        {/* Date and Period Dropdowns */}
        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 font-medium"
          >
            <option value="This Month (Sep 2026)">This Month (Sep 2026)</option>
            <option value="Last Quarter (Q1 FY26)">Last Quarter (Q1 FY26)</option>
            <option value="FY 2025-26">Current Fiscal Year (2025-26)</option>
            <option value="Trailing 12 Months">Trailing 12 Months</option>
          </select>

          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
            {(['Monthly', 'Quarterly', 'Yearly'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFrequency(mode)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  frequency === mode
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab 1: Financial & P&L Statement */}
      {activeTab === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Gross Operating Revenue"
              value="₹18,42,500"
              change={12.4}
              changePeriod="MoM expansion"
              trend="up"
              trendPositive={true}
              icon={<TrendingUp className="w-5 h-5" />}
              iconBgColor="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              title="Gross Profit Margin"
              value="84.5%"
              change={1.2}
              changePeriod="after cloud hosting"
              trend="up"
              trendPositive={true}
              icon={<DollarSign className="w-5 h-5" />}
              iconBgColor="bg-sky-50 text-sky-600"
            />
            <StatCard
              title="Operating EBITDA"
              value="₹6,29,780"
              subtitle="34.2% EBITDA margin"
              trend="up"
              trendPositive={true}
              icon={<BarChart3 className="w-5 h-5" />}
              iconBgColor="bg-indigo-50 text-indigo-600"
            />
            <StatCard
              title="Net Profit Before Tax"
              value="₹7,14,100"
              change={18.2}
              changePeriod="vs last month"
              trend="up"
              trendPositive={true}
              icon={<CheckCircle2 className="w-5 h-5" />}
              iconBgColor="bg-purple-50 text-purple-600"
            />
          </div>

          <Card
            title="Statement of Profit & Loss (P&L)"
            subtitle="Prepared in compliance with Indian Accounting Standards (Ind AS) for Apex Nova Tech Pvt Ltd"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/70">
                    <th className="py-3 px-4">Line Item / Accounting Classification</th>
                    <th className="py-3 px-4 text-right">Amount (₹ INR)</th>
                    <th className="py-3 px-4 text-right">% of Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PROFIT_LOSS_DATA.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        row.isHighlight
                          ? 'bg-slate-50/90 font-bold text-slate-900'
                          : row.isSuccess
                          ? 'bg-emerald-50/40 font-bold text-emerald-900'
                          : 'hover:bg-slate-50/50'
                      }`}
                    >
                      <td className={`py-2.5 px-4 ${row.isBold ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                        {row.item}
                      </td>
                      <td className={`py-2.5 px-4 text-right font-sans ${row.isBold ? 'font-bold' : ''}`}>
                        {formatINR(row.amount)}
                      </td>
                      <td className={`py-2.5 px-4 text-right ${row.isBold ? 'font-bold' : 'text-slate-500'}`}>
                        {row.percentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Employee Reports */}
      {activeTab === 'employee' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              title="Total Monthly Payroll Payout"
              value="₹20,80,000"
              subtitle="All 6 departments"
              trend="neutral"
              icon={<Users className="w-5 h-5" />}
              iconBgColor="bg-indigo-50 text-indigo-600"
            />
            <StatCard
              title="Average Compensation"
              value="₹61,176"
              subtitle="Per staff member / month"
              trend="neutral"
              icon={<DollarSign className="w-5 h-5" />}
              iconBgColor="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              title="Workforce Retention Rate"
              value="97.4%"
              subtitle="Zero unplanned departures"
              trend="up"
              trendPositive={true}
              icon={<CheckCircle2 className="w-5 h-5" />}
              iconBgColor="bg-sky-50 text-sky-600"
            />
          </div>

          <Card title="Departmental Cost & Headcount Matrix" subtitle="Payroll burn rate across organizational units">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4 text-center">Headcount</th>
                    <th className="py-3 px-4 text-right">Monthly Payroll Cost</th>
                    <th className="py-3 px-4 text-right">Avg CTC / Person</th>
                    <th className="py-3 px-4 text-center">Attendance %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { dept: 'Engineering', count: 14, cost: 980000, avg: 70000, att: '96.2%' },
                    { dept: 'Finance & Accounts', count: 4, cost: 260000, avg: 65000, att: '98.0%' },
                    { dept: 'Product & Design', count: 5, cost: 350000, avg: 70000, att: '94.0%' },
                    { dept: 'Sales & Growth', count: 5, cost: 320000, avg: 64000, att: '95.5%' },
                    { dept: 'Marketing', count: 3, cost: 190000, avg: 63333, att: '93.5%' },
                    { dept: 'People & HR', count: 3, cost: 180000, avg: 60000, att: '97.2%' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">{row.dept}</td>
                      <td className="py-3 px-4 text-center font-bold text-indigo-600">{row.count}</td>
                      <td className="py-3 px-4 text-right font-sans font-bold text-slate-900">{formatINR(row.cost)}</td>
                      <td className="py-3 px-4 text-right font-sans text-slate-600">{formatINR(row.avg)}</td>
                      <td className="py-3 px-4 text-center font-semibold text-emerald-600">{row.att}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3: Client Reports */}
      {activeTab === 'client' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              title="Annual Client Lifetime Value (LTV)"
              value="₹89.8 Lakhs"
              subtitle="Top 10 enterprise accounts"
              trend="up"
              trendPositive={true}
              icon={<Briefcase className="w-5 h-5" />}
              iconBgColor="bg-indigo-50 text-indigo-600"
            />
            <StatCard
              title="Net Revenue Retention (NRR)"
              value="118.4%"
              subtitle="Expansion via upselling"
              trend="up"
              trendPositive={true}
              icon={<TrendingUp className="w-5 h-5" />}
              iconBgColor="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              title="Average Contract Value"
              value="₹1,84,250"
              subtitle="Monthly recurring bill"
              trend="up"
              trendPositive={true}
              icon={<DollarSign className="w-5 h-5" />}
              iconBgColor="bg-sky-50 text-sky-600"
            />
          </div>

          <Card title="Client Concentration & Exposure Analysis" subtitle="Revenue share of top corporate partners">
            <div className="space-y-3">
              {[
                { name: 'Reliance Retail Partner', share: 26, amount: 483800 },
                { name: 'Tata Digital Services', share: 22, amount: 485000 },
                { name: 'InfoEdge Tech', share: 18, amount: 330400 },
                { name: 'Swiggy Enterprise', share: 16, amount: 292500 },
                { name: 'Bharat Mobility Corp', share: 18, amount: 250800 },
              ].map((c, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-800">{c.name}</span>
                    <span className="font-bold text-slate-900 font-sans">{formatINR(c.amount)} ({c.share}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${c.share * 3}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 4: Business Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <Card title="Quarterly Financial Comparison" subtitle="Q1 vs Q2 Operating Performance Trajectory">
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={QUARTERLY_PERFORMANCE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={11} tickLine={false} />
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
                  <Bar dataKey="revenue" name="Total Revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Total Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-indigo-600" /> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500" /> Operating Expenses</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
