import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Users,
  Briefcase,
  Receipt,
  FileText,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { NavSection } from '../../types';
import { EMPLOYEES } from '../../data/mock/employees';
import { CLIENTS } from '../../data/mock/clients';
import { INITIAL_TRANSACTIONS } from '../../data/mock/transactions';
import { INITIAL_INVOICES } from '../../data/mock/invoices';
import { formatINR } from '../../utils/formatters';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: NavSection) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Handled externally if needed
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Filter grouped data
  const filteredEmployees = EMPLOYEES.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q) ||
      e.designation.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredClients = CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredTransactions = INITIAL_TRANSACTIONS.filter(
    (t) =>
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q)
  ).slice(0, 3);

  const filteredInvoices = INITIAL_INVOICES.filter(
    (i) =>
      i.id.toLowerCase().includes(q) ||
      i.client.toLowerCase().includes(q) ||
      i.clientCompany.toLowerCase().includes(q)
  ).slice(0, 3);

  const reportsList = [
    { title: 'Profit & Loss Statement (P&L)', category: 'Financial', route: 'financial-reports' as NavSection },
    { title: 'Operating Cash Flow Projections', category: 'Financial', route: 'financial-reports' as NavSection },
    { title: 'Employee Attendance & Cost Analysis', category: 'Human Resources', route: 'employee-reports' as NavSection },
    { title: 'Client Receivables & Aging Buckets', category: 'Revenue', route: 'client-reports' as NavSection },
  ].filter(
    (r) => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
  ).slice(0, 2);

  const hasAnyResults =
    filteredEmployees.length > 0 ||
    filteredClients.length > 0 ||
    filteredTransactions.length > 0 ||
    filteredInvoices.length > 0 ||
    reportsList.length > 0;

  const handleSelect = (route: NavSection) => {
    onNavigate(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search employees, clients, transactions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!hasAnyResults ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No matching records found for "{query}".
            </div>
          ) : (
            <>
              {/* EMPLOYEES */}
              {filteredEmployees.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-2 mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Employees</span>
                  </div>
                  <div className="space-y-1">
                    {filteredEmployees.map((emp) => (
                      <button
                        key={emp.id}
                        onClick={() => handleSelect('employees')}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={emp.avatar}
                            alt={emp.name}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <div className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600">
                              {emp.name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {emp.designation} • {emp.department}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CLIENTS */}
              {filteredClients.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-2 mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <Briefcase className="w-3.5 h-3.5 text-sky-500" />
                    <span>Clients</span>
                  </div>
                  <div className="space-y-1">
                    {filteredClients.map((client) => (
                      <button
                        key={client.id}
                        onClick={() => handleSelect('clients')}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600">
                            {client.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {client.company} • {client.city}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium text-slate-700">
                            {client.outstanding > 0 ? formatINR(client.outstanding) : 'Cleared'}
                          </div>
                          <div className="text-[10px] text-slate-400">Outstanding</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TRANSACTIONS */}
              {filteredTransactions.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-2 mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <Receipt className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Transactions</span>
                  </div>
                  <div className="space-y-1">
                    {filteredTransactions.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleSelect('transactions')}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600">
                            {t.description}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {t.id} • {t.category} • {t.date}
                          </div>
                        </div>
                        <span
                          className={`text-xs font-bold ${
                            t.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'
                          }`}
                        >
                          {t.type === 'Income' ? '+' : '-'} {formatINR(t.amount)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* INVOICES */}
              {filteredInvoices.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-2 mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Invoices</span>
                  </div>
                  <div className="space-y-1">
                    {filteredInvoices.map((inv) => (
                      <button
                        key={inv.id}
                        onClick={() => handleSelect('invoices')}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600">
                            {inv.id} — {inv.client}
                          </div>
                          <div className="text-[11px] text-slate-500">Due {inv.dueDate}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-900">{formatINR(inv.total)}</div>
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                              inv.status === 'Paid'
                                ? 'bg-emerald-50 text-emerald-700'
                                : inv.status === 'Overdue'
                                ? 'bg-rose-50 text-rose-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* REPORTS */}
              {reportsList.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-2 mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <BarChart3 className="w-3.5 h-3.5 text-purple-500" />
                    <span>Reports & Analytics</span>
                  </div>
                  <div className="space-y-1">
                    {reportsList.map((rep) => (
                      <button
                        key={rep.title}
                        onClick={() => handleSelect(rep.route)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left transition-colors cursor-pointer group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600">
                            {rep.title}
                          </div>
                          <div className="text-[11px] text-slate-500">{rep.category}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search spans Employees, Clients, Ledger, Invoices, and Reports</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
