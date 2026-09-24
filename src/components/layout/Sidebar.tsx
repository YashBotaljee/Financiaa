import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  CreditCard,
  Users,
  Building2,
  CalendarCheck2,
  CalendarDays,
  Briefcase,
  Activity,
  DollarSign,
  BarChart3,
  FileSpreadsheet,
  UserCheck,
  TrendingUp,
  Sparkles,
  Lightbulb,
  ShieldAlert,
  Settings,
  X,
  ChevronDown,
} from 'lucide-react';
import { NavSection } from '../../types';

export interface SidebarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: NavSection;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navGroups: NavGroup[] = [
    {
      groupName: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      groupName: 'FINANCE',
      items: [
        { id: 'finance-overview', label: 'Financial Overview', icon: Wallet },
        { id: 'transactions', label: 'Transactions', icon: Receipt },
        { id: 'income', label: 'Income', icon: ArrowDownLeft },
        { id: 'expenses', label: 'Expenses', icon: ArrowUpRight },
        { id: 'invoices', label: 'Invoices', icon: FileText, badge: '5' },
        { id: 'payments', label: 'Payments', icon: CreditCard },
      ],
    },
    {
      groupName: 'PEOPLE',
      items: [
        { id: 'employees', label: 'Employees', icon: Users },
        { id: 'departments', label: 'Departments', icon: Building2 },
        { id: 'attendance', label: 'Attendance', icon: CalendarCheck2 },
        { id: 'leave', label: 'Leave Requests', icon: CalendarDays, badge: '2', badgeColor: 'bg-amber-100 text-amber-700' },
      ],
    },
    {
      groupName: 'CLIENTS',
      items: [
        { id: 'clients', label: 'All Clients', icon: Briefcase },
        { id: 'client-activity', label: 'Client Activity', icon: Activity },
        { id: 'client-payments', label: 'Client Payments', icon: DollarSign },
      ],
    },
    {
      groupName: 'REPORTS',
      items: [
        { id: 'financial-reports', label: 'Financial Reports', icon: BarChart3 },
        { id: 'employee-reports', label: 'Employee Reports', icon: UserCheck },
        { id: 'client-reports', label: 'Client Reports', icon: FileSpreadsheet },
        { id: 'business-analytics', label: 'Business Analytics', icon: TrendingUp },
      ],
    },
    {
      groupName: 'AI INTELLIGENCE',
      items: [
        { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles, badge: 'PROTOTYPE', badgeColor: 'bg-indigo-100 text-indigo-700 font-semibold' },
        { id: 'business-insights', label: 'Business Insights', icon: Lightbulb },
        { id: 'business-watch', label: 'Business Watch', icon: ShieldAlert, badge: '3', badgeColor: 'bg-rose-100 text-rose-700' },
      ],
    },
    {
      groupName: 'PREFERENCES',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  const handleSelect = (id: NavSection) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-black text-lg tracking-wider">
              F
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-base tracking-tight flex items-center gap-1.5">
                Financiaa
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  OS
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium -mt-0.5">Enterprise Suite</span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-slate-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.groupName}>
              <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                {group.groupName}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                            item.badgeColor
                              ? item.badgeColor
                              : isActive
                              ? 'bg-indigo-800 text-white'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Academic Prototype Notice Footer */}
        <div className="p-3 border-t border-slate-800/80 shrink-0 bg-slate-950/40">
          <div className="rounded-lg bg-slate-800/80 p-2.5 border border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              UI Demo Mode
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Interactive prototype for academic approval. All records use simulated data.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
