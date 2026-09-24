import React, { useState } from 'react';
import {
  CalendarCheck2,
  UserX,
  CalendarDays,
  Percent,
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ATTENDANCE_RECORDS } from '../../data/mock/employees';
import { useToast } from '../../components/common/Toast';

export const AttendancePage: React.FC = () => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const presentToday = ATTENDANCE_RECORDS.filter(
    (a) => a.statusToday === 'Present' || a.statusToday === 'Late'
  ).length;
  const onLeaveToday = ATTENDANCE_RECORDS.filter((a) => a.statusToday === 'On Leave').length;
  const absentToday = ATTENDANCE_RECORDS.filter((a) => a.statusToday === 'Absent').length;

  const filtered = ATTENDANCE_RECORDS.filter((r) => {
    const matchesSearch =
      r.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      r.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      r.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'All' || r.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Attendance & Work Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Daily check-in verification, shift logging, and monthly timesheet reconciliation
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast('Exported monthly attendance timesheet to Excel/CSV', 'success')}
            icon={<Download className="w-4 h-4" />}
          >
            Export Timesheet
          </Button>
        </div>
      </div>

      {/* 4 Attendance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Present Today"
          value="31 Present"
          subtitle="91.2% in office / remote"
          trend="up"
          trendPositive={true}
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Absent Without Notice"
          value="1 Absent"
          subtitle="Manager alerted"
          trend="down"
          trendPositive={false}
          icon={<UserX className="w-5 h-5" />}
          iconBgColor="bg-rose-50 text-rose-600"
        />
        <StatCard
          title="On Planned Leave"
          value="2 on Leave"
          subtitle="Logged in leave portal"
          trend="neutral"
          icon={<CalendarDays className="w-5 h-5" />}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Overall Attendance Rate"
          value="94.1%"
          change={1.4}
          changePeriod="MoM improvement"
          trend="up"
          trendPositive={true}
          icon={<Percent className="w-5 h-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600"
        />
      </div>

      {/* Attendance Table */}
      <Card
        title="Employee Monthly Attendance Sheet"
        subtitle="September 2026 active cycle (22 total working days)"
        headerAction={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search staff..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-40 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance & Accounts">Finance</option>
              <option value="Product & Design">Product</option>
              <option value="Sales & Growth">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="People & HR">HR</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-center">Status Today</th>
                <th className="py-3 px-4 text-center">Present Days</th>
                <th className="py-3 px-4 text-center">Late Marks</th>
                <th className="py-3 px-4 text-center">Absents</th>
                <th className="py-3 px-4 text-center">Leave Days</th>
                <th className="py-3 px-4 text-right">Attendance %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((record) => {
                const percentage = Math.round((record.present / record.totalDays) * 100);
                return (
                  <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{record.employeeName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{record.employeeId}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{record.department}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={
                          record.statusToday === 'Present'
                            ? 'success'
                            : record.statusToday === 'Late'
                            ? 'warning'
                            : record.statusToday === 'On Leave'
                            ? 'info'
                            : 'danger'
                        }
                        size="sm"
                        dot
                      >
                        {record.statusToday}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-emerald-700 font-sans">
                      {record.present} / {record.totalDays}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600">
                      {record.late > 0 ? (
                        <span className="text-amber-600 font-semibold">{record.late}</span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600">
                      {record.absent > 0 ? (
                        <span className="text-rose-600 font-semibold">{record.absent}</span>
                      ) : (
                        '0'
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600">
                      {record.leave > 0 ? `${record.leave} d` : '-'}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900 font-sans">
                      {percentage}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
