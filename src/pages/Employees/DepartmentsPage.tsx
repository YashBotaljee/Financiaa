import React from 'react';
import { Building2, Users, DollarSign, Plus, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { DEPARTMENTS } from '../../data/mock/employees';
import { formatINR } from '../../utils/formatters';
import { useToast } from '../../components/common/Toast';

export const DepartmentsPage: React.FC = () => {
  const { showToast } = useToast();

  const totalHeadcount = DEPARTMENTS.reduce((acc, d) => acc + d.employeeCount, 0);
  const totalMonthlyPayroll = DEPARTMENTS.reduce((acc, d) => acc + d.monthlyCost, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Departments & Organizational Units
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Departmental headcount, executive leadership, and quarterly budget allocations
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => showToast('Create department modal ready for approval', 'info')}
            icon={<Plus className="w-4 h-4" />}
          >
            + New Department
          </Button>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Active Units</span>
          <span className="text-2xl font-bold text-slate-900 font-sans">{DEPARTMENTS.length} Divisions</span>
          <p className="text-xs text-slate-500 mt-1">Spans R&D to GTM teams</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Allocated Headcount</span>
          <span className="text-2xl font-bold text-indigo-600 font-sans">{totalHeadcount} Full-Time</span>
          <p className="text-xs text-slate-500 mt-1">Across 6 operating groups</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Monthly Cost</span>
          <span className="text-2xl font-bold text-emerald-600 font-sans">{formatINR(totalMonthlyPayroll)}</span>
          <p className="text-xs text-slate-500 mt-1">Within approved ₹25L cap</p>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DEPARTMENTS.map((dept) => {
          const utilization = Math.round((dept.monthlyCost / dept.budgetLimit) * 100);
          return (
            <Card key={dept.id} className="hover:border-indigo-300 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{dept.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Manager: {dept.manager}</p>
                </div>
                <Badge
                  variant={dept.status === 'Active' ? 'indigo' : 'success'}
                  size="sm"
                  dot
                >
                  {dept.status}
                </Badge>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Assigned Staff:</span>
                  <span className="font-bold text-slate-900">{dept.employeeCount} Members</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Monthly Spend:</span>
                  <span className="font-bold text-slate-900 font-sans">{formatINR(dept.monthlyCost)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Allocated Budget Cap:</span>
                  <span className="font-semibold text-slate-500 font-sans">{formatINR(dept.budgetLimit)}</span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Budget Consumed</span>
                    <span className="font-bold text-slate-700">{utilization}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        utilization > 90 ? 'bg-amber-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${utilization}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">ID: {dept.id}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => showToast(`Opening roster for ${dept.name}`, 'info')}
                  className="text-xs"
                >
                  View Team →
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
