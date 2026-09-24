import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  CalendarDays,
  Building2,
  Plus,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Employee } from '../../types';
import { formatDate } from '../../utils/formatters';
import { useToast } from '../../components/common/Toast';

export interface EmployeesPageProps {
  employees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
  onOpenAddEmployee?: () => void;
}

export const EmployeesPage: React.FC<EmployeesPageProps> = ({
  employees,
  onSelectEmployee,
  onOpenAddEmployee,
}) => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const activeCount = employees.filter((e) => e.status === 'Active').length;
  const onLeaveCount = employees.filter((e) => e.status === 'On Leave').length;
  const departments = ['All', ...new Set(employees.map((e) => e.department))];

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.designation.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'All' || e.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || e.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            People & Workforce
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Staff directory, organizational departments, and human resource profiles
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (onOpenAddEmployee) onOpenAddEmployee();
              else showToast('Add Employee form modal placeholder ready', 'info');
            }}
            icon={<Plus className="w-4 h-4" />}
          >
            + Add Employee
          </Button>
        </div>
      </div>

      {/* 4 Employee Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Workforce"
          value="34 Members"
          subtitle="Full-time staff"
          trend="up"
          trendPositive={true}
          icon={<Users className="w-5 h-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Active On Duty"
          value={`${activeCount} Active`}
          subtitle="91.2% capacity"
          trend="up"
          trendPositive={true}
          icon={<UserCheck className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="On Approved Leave"
          value={`${onLeaveCount} Members`}
          subtitle="Planned absences"
          trend="neutral"
          icon={<CalendarDays className="w-5 h-5" />}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Operating Departments"
          value="6 Units"
          subtitle="Engineering largest"
          trend="neutral"
          icon={<Building2 className="w-5 h-5" />}
          iconBgColor="bg-sky-50 text-sky-600"
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search employee name, role, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Departments' : d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee List Table */}
      <Card
        title="Employee Directory"
        subtitle={`Showing ${filtered.length} staff records`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Employee Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Joining Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{emp.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">{emp.name}</span>
                        <span className="text-[10px] text-slate-500">{emp.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium whitespace-nowrap">
                      {emp.department}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">{emp.designation}</td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{formatDate(emp.joiningDate)}</td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <Badge variant={emp.status === 'Active' ? 'success' : 'warning'} size="sm" dot>
                      {emp.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={<Eye className="w-3.5 h-3.5" />}
                      onClick={() => onSelectEmployee(emp)}
                    >
                      View Profile
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
