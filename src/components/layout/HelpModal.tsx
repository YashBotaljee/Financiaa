import React from 'react';
import { Modal } from '../common/Modal';
import { CheckCircle2, AlertTriangle, Layers, Sparkles, Database, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

export interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Financiaa — Academic Prototype & Architecture Guide"
      subtitle="Interactive UI/UX concept review for faculty project approval"
      maxWidth="3xl"
      footer={
        <Button variant="primary" onClick={onClose}>
          Got it, Return to Prototype
        </Button>
      }
    >
      <div className="space-y-5 text-sm text-slate-600">
        <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-indigo-950 text-sm">
              Prototype Scope & Objectives
            </h4>
            <p className="text-xs text-indigo-900/80 mt-1 leading-relaxed">
              This interactive web application is built strictly as a <strong>frontend UI/UX prototype</strong> to demonstrate the proposed product architecture, UX workflows, visual design language, and enterprise SaaS modules before the technology stack (e.g. backend services, DB schema, auth) is finalized and approved.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What is Fully Clickable</span>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-600 list-disc list-inside">
              <li>Comprehensive 20+ page navigation suite</li>
              <li>Interactive Dashboard with Recharts analytics</li>
              <li>Finance Module (Ledger, Income, OPEX, Invoices)</li>
              <li>Employee, Department, Attendance & Leave flow</li>
              <li>Client Management with CRM detail drilldown</li>
              <li>P&L, Cash Flow, and Financial Reports</li>
              <li>Simulated AI Business Assistant & Watchdog</li>
              <li>Global search (⌘K), Filters, Modals, Forms</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs mb-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Academic Constraints Preserved</span>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-600 list-disc list-inside">
              <li>100% Mock & Static simulated data</li>
              <li>Zero backend or cloud API dependencies</li>
              <li>No external payment gateway / live bank accounts</li>
              <li>Clean decoupled React + TypeScript architecture</li>
              <li>Enterprise Indian B2B business modeling (INR ₹)</li>
              <li>Clean folder layout ready for API integration</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
            Suggested Demonstration Flow for Teachers
          </h4>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="font-bold text-indigo-600 shrink-0">1.</span>
              <span><strong>Dashboard:</strong> Review top KPI cards with growth trends, monthly revenue vs expenses chart, expense breakdown, recent transactions, and AI alert cards.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-indigo-600 shrink-0">2.</span>
              <span><strong>Finance & Transactions:</strong> Explore transaction ledger, filter by Income/Expense, click "+ Add Transaction" to see modal with real-time UI state addition.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-indigo-600 shrink-0">3.</span>
              <span><strong>Invoices:</strong> View unpaid/overdue invoices, click on an invoice to view the enterprise GST invoice detail invoice modal.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-indigo-600 shrink-0">4.</span>
              <span><strong>People:</strong> Inspect Employee Profiles, Department budget allocations, Attendance metrics, and approve/reject Leave Requests.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-indigo-600 shrink-0">5.</span>
              <span><strong>AI Intelligence:</strong> Click "AI Assistant" and select any suggested question (e.g. "Why did expenses increase this month?") to see automated executive insights.</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
