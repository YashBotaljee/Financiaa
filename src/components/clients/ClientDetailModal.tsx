import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Client } from '../../types';
import { formatINR } from '../../utils/formatters';
import { INITIAL_INVOICES } from '../../data/mock/invoices';
import { INITIAL_TRANSACTIONS } from '../../data/mock/transactions';
import { CLIENT_ACTIVITIES } from '../../data/mock/clients';
import { Briefcase, Building, Mail, Phone, MapPin, Receipt, Clock } from 'lucide-react';
import { useToast } from '../common/Toast';

export interface ClientDetailModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onViewInvoice?: (invoiceId: string) => void;
}

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({
  client,
  isOpen,
  onClose,
  onViewInvoice,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'transactions' | 'activity'>('overview');
  const { showToast } = useToast();

  if (!client) return null;

  const clientInvoices = INITIAL_INVOICES.filter(
    (i) => i.client.toLowerCase().includes(client.name.toLowerCase().split(' ')[0])
  );

  const clientTxns = INITIAL_TRANSACTIONS.filter(
    (t) => t.description.toLowerCase().includes(client.name.toLowerCase().split(' ')[0])
  );

  const clientActs = CLIENT_ACTIVITIES.filter(
    (a) => a.clientId === client.id || a.clientName.toLowerCase().includes(client.name.toLowerCase().split(' ')[0])
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${client.name} — Client Portfolio`}
      subtitle={`${client.company} • ${client.industry} • ${client.city}`}
      maxWidth="3xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => showToast(`Dispatched account statement to ${client.email}`, 'success')}
          >
            Email Account Statement
          </Button>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header Hero */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-slate-900">{client.name}</h4>
                <Badge
                  variant={
                    client.status === 'Active'
                      ? 'success'
                      : client.status === 'Pending Onboarding'
                      ? 'warning'
                      : 'neutral'
                  }
                  dot
                >
                  {client.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">{client.company} • {client.city}, India</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Outstanding Balance
            </span>
            <span
              className={`text-xl font-bold font-sans ${
                client.outstanding > 0 ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              {client.outstanding > 0 ? formatINR(client.outstanding) : 'Fully Cleared'}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Overview & Projects
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'invoices'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Invoices ({clientInvoices.length})
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'transactions'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Payment History ({clientTxns.length})
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'activity'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Activity Timeline
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-indigo-600">
                  Primary Contact Person
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Representative</span>
                    <span className="font-semibold text-slate-800">{client.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email Address</span>
                    <span className="font-semibold text-indigo-600">{client.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Direct Phone</span>
                    <span className="font-semibold text-slate-800">{client.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location Base</span>
                    <span className="font-semibold text-slate-800">{client.city}, India</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-indigo-600">
                  Financial Relationship
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Lifetime Billed Value</span>
                    <span className="font-bold text-slate-900">{formatINR(client.totalBilled)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Outstanding</span>
                    <span className="font-semibold text-rose-600">{formatINR(client.outstanding)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contract Engagement</span>
                    <span className="font-semibold text-slate-800">Annual Retainer SLA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active Service Lines</span>
                    <span className="font-semibold text-slate-800">{client.projectsCount} Projects</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <h5 className="font-bold text-slate-900 text-xs mb-3">Active Deliverables & Engagements</h5>
              <div className="space-y-2">
                {[
                  { name: 'Core Cloud Microservices Platform', status: 'In Progress (85%)', lead: 'Vikram Sharma' },
                  { name: 'Telemetry Integration & Automated Webhooks', status: 'Delivered / QA', lead: 'Tanvi Saxena' },
                  { name: 'Security Audit & ISO Compliance Support', status: 'Scheduled for Oct', lead: 'Siddharth Sen' },
                ].slice(0, client.projectsCount).map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div>
                      <span className="font-semibold text-slate-800">{p.name}</span>
                      <p className="text-[11px] text-slate-400">Lead Architect: {p.lead}</p>
                    </div>
                    <Badge variant="indigo" size="sm">{p.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Invoices */}
        {activeTab === 'invoices' && (
          <div className="space-y-2 text-xs">
            {clientInvoices.length === 0 ? (
              <div className="p-8 text-center text-slate-400">No invoices generated for this client yet.</div>
            ) : (
              clientInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{inv.id}</span>
                      <Badge
                        variant={
                          inv.status === 'Paid'
                            ? 'success'
                            : inv.status === 'Overdue'
                            ? 'danger'
                            : 'warning'
                        }
                        size="sm"
                        dot
                      >
                        {inv.status}
                      </Badge>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Issued: {inv.issueDate} • Due: {inv.dueDate}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 font-sans">{formatINR(inv.total)}</span>
                    {onViewInvoice && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          onClose();
                          onViewInvoice(inv.id);
                        }}
                      >
                        View
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Transactions */}
        {activeTab === 'transactions' && (
          <div className="space-y-2 text-xs">
            {clientTxns.length === 0 ? (
              <div className="p-8 text-center text-slate-400">No past transactions recorded for this client.</div>
            ) : (
              clientTxns.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white"
                >
                  <div>
                    <span className="font-semibold text-slate-800">{t.description}</span>
                    <p className="text-[11px] text-slate-400">{t.id} • {t.date} • {t.paymentMethod}</p>
                  </div>
                  <span className="font-bold text-emerald-600 font-sans">+{formatINR(t.amount)}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: Activity */}
        {activeTab === 'activity' && (
          <div className="space-y-3 text-xs">
            {clientActs.length === 0 ? (
              <div className="p-8 text-center text-slate-400">No recent logs recorded.</div>
            ) : (
              clientActs.map((act) => (
                <div key={act.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Clock className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{act.action}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{act.timestamp}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
