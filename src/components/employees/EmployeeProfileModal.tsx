import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Employee } from '../../types';
import { formatINR, formatDate } from '../../utils/formatters';
import {
  User,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  CreditCard,
  FileCheck,
  Mail,
  Phone,
  ShieldAlert,
  Building,
} from 'lucide-react';
import { useToast } from '../common/Toast';

export interface EmployeeProfileModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EmployeeProfileModal: React.FC<EmployeeProfileModalProps> = ({
  employee,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'attendance' | 'salary' | 'docs'>('profile');
  const { showToast } = useToast();

  if (!employee) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${employee.name} — Dossier`}
      subtitle={`${employee.designation} • ${employee.department} • ${employee.id}`}
      maxWidth="3xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-slate-400">
            Joined on {formatDate(employee.joiningDate)}
          </span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-18 h-18 rounded-full object-cover ring-2 ring-indigo-500/20 shadow-xs"
          />
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-slate-900">{employee.name}</h4>
                <p className="text-xs text-slate-500 font-medium">{employee.designation}</p>
              </div>
              <Badge
                variant={employee.status === 'Active' ? 'success' : 'warning'}
                dot
              >
                {employee.status}
              </Badge>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {employee.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {employee.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {employee.department}
              </span>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Personal & Role Info
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'attendance'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Attendance & Leave
          </button>
          <button
            onClick={() => setActiveTab('salary')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'salary'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Salary & Payroll
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'docs'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Compliance & KYC
          </button>
        </div>

        {/* Tab 1: Personal & Role */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-indigo-600">
                Personal Information
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Legal Name</span>
                  <span className="font-semibold text-slate-800">{employee.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Official Email</span>
                  <span className="font-semibold text-slate-800">{employee.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Primary Phone</span>
                  <span className="font-semibold text-slate-800">{employee.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Emergency Contact</span>
                  <span className="font-semibold text-slate-800 text-right">{employee.emergencyContact}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-indigo-600">
                Professional Details
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Employee ID</span>
                  <span className="font-mono font-semibold text-slate-800">{employee.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Department</span>
                  <span className="font-semibold text-slate-800">{employee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Designation</span>
                  <span className="font-semibold text-slate-800">{employee.designation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Employment Type</span>
                  <span className="font-semibold text-slate-800">Full-time Regular</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Work Location</span>
                  <span className="font-semibold text-slate-800">Bengaluru HQ (Hybrid)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Attendance & Leave */}
        {activeTab === 'attendance' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Attendance Rate</span>
                <span className="text-lg font-bold text-emerald-600 font-sans">{employee.attendanceRate}%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Days Present</span>
                <span className="text-lg font-bold text-slate-800 font-sans">{employee.presentDays} / 22</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Days Absent</span>
                <span className="text-lg font-bold text-slate-800 font-sans">{employee.absentDays}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Leave Balance</span>
                <span className="text-lg font-bold text-indigo-600 font-sans">{employee.leaveBalance} Days</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <h5 className="font-bold text-slate-900 text-xs mb-2">Leave Quota Distribution</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600">Privilege Leave (Earned)</span>
                  <span className="font-semibold text-slate-800">8 / 12 Days remaining</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600">Casual Leave (Personal)</span>
                  <span className="font-semibold text-slate-800">4 / 6 Days remaining</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600">Medical / Sick Leave</span>
                  <span className="font-semibold text-slate-800">5 / 7 Days remaining</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Salary Information */}
        {activeTab === 'salary' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-indigo-600">
                  Monthly Compensation Structure
                </h5>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Generated monthly pay slip PDF', 'success')}
                >
                  Download Pay Slip
                </Button>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Basic Salary</span>
                  <span className="font-semibold text-slate-900">{formatINR(employee.salary.base)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">HRA & Special Allowances</span>
                  <span className="font-semibold text-emerald-600">+{formatINR(employee.salary.allowances)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Statutory Deductions (PF & Tax)</span>
                  <span className="font-semibold text-rose-600">-{formatINR(employee.salary.deductions)}</span>
                </div>
                <div className="flex justify-between py-2 text-sm font-bold text-slate-900 bg-slate-50 px-2 rounded-lg">
                  <span>Net Take-home Pay</span>
                  <span className="text-indigo-600">{formatINR(employee.salary.net)} / month</span>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-500">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Bank Account</span>
                  <span className="font-semibold text-slate-800">{employee.salary.bankAccount}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Income Tax PAN</span>
                  <span className="font-mono font-semibold text-slate-800">{employee.salary.pan}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Documents */}
        {activeTab === 'docs' && (
          <div className="space-y-2 text-xs">
            {[
              { name: 'Signed Employment Agreement & NDA', size: '1.4 MB', date: 'Jan 15, 2023', verified: true },
              { name: 'Aadhaar Identity Proof (eKYC Verified)', size: '850 KB', date: 'Jan 16, 2023', verified: true },
              { name: 'Permanent Account Number (PAN) Card', size: '620 KB', date: 'Jan 16, 2023', verified: true },
              { name: 'Degree Certificate & Educational Transcripts', size: '2.8 MB', date: 'Jan 18, 2023', verified: true },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{doc.name}</div>
                    <div className="text-[11px] text-slate-400">{doc.size} • Verified on {doc.date}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast(`Viewing simulated document: ${doc.name}`, 'info')}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
