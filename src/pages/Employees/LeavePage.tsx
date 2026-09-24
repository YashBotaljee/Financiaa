import React, { useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Filter,
  Search,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { LeaveRequest } from '../../types';
import { LEAVE_REQUESTS as INITIAL_LEAVES } from '../../data/mock/employees';
import { formatDate } from '../../utils/formatters';
import { useToast } from '../../components/common/Toast';

export const LeavePage: React.FC = () => {
  const { showToast } = useToast();
  const [leaves, setLeaves] = useState<LeaveRequest[]>(INITIAL_LEAVES);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const pendingCount = leaves.filter((l) => l.status === 'Pending').length;
  const approvedCount = leaves.filter((l) => l.status === 'Approved').length;

  const handleApprove = (id: string, name: string) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'Approved' as const } : l))
    );
    showToast(`Leave request for ${name} approved successfully`, 'success');
  };

  const handleReject = (id: string, name: string) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'Rejected' as const } : l))
    );
    showToast(`Leave request for ${name} has been rejected`, 'info');
  };

  const filtered = leaves.filter((l) => {
    const matchesSearch =
      l.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      l.department.toLowerCase().includes(search.toLowerCase()) ||
      l.reason.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || l.status === selectedStatus;
    const matchesType = selectedType === 'All' || l.leaveType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Leave Approvals & Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review time-off applications, annual paid leaves, and sick recuperation quotas
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => showToast('New leave request modal ready for testing', 'info')}
            icon={<Plus className="w-4 h-4" />}
          >
            + Apply for Leave
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pending Requests"
          value={`${pendingCount} Awaiting`}
          subtitle="Action required by manager"
          badge="Urgent"
          trend="neutral"
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Approved This Month"
          value={`${approvedCount} Granted`}
          subtitle="All rosters covered"
          trend="up"
          trendPositive={true}
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Currently On Leave"
          value="2 Staff Members"
          subtitle="Siddharth Sen, Rohan Mehra"
          trend="neutral"
          icon={<CalendarDays className="w-5 h-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Leave Balance Index"
          value="13.2 Days"
          subtitle="Company average balance"
          trend="neutral"
          icon={<CalendarDays className="w-5 h-5" />}
          iconBgColor="bg-slate-100 text-slate-600"
        />
      </div>

      {/* Leave Requests Table */}
      <Card
        title="Leave Requests"
        subtitle={`Showing ${filtered.length} applications`}
        headerAction={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search employee or reason..."
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
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Leave Type</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4 text-center">Days</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{item.employeeName}</span>
                    <span className="text-[10px] text-slate-400">{item.department}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium whitespace-nowrap">
                      {item.leaveType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-slate-800 font-sans whitespace-nowrap">
                    {item.days} {item.days === 1 ? 'day' : 'days'}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs">{item.reason}</td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <Badge
                      variant={
                        item.status === 'Approved'
                          ? 'success'
                          : item.status === 'Pending'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                      dot
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    {item.status === 'Pending' ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleApprove(item.id, item.employeeName)}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(item.id, item.employeeName)}
                          className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-md text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">Decided</span>
                    )}
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
