import React, { useState } from 'react';
import { Activity, Clock, FileText, CheckCircle2, CreditCard, HelpCircle, Filter } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { CLIENT_ACTIVITIES } from '../../data/mock/clients';
import { formatINR } from '../../utils/formatters';
import { useToast } from '../../components/common/Toast';

export const ClientActivityPage: React.FC = () => {
  const { showToast } = useToast();
  const [selectedType, setSelectedType] = useState<string>('All');

  const filtered = selectedType === 'All'
    ? CLIENT_ACTIVITIES
    : CLIENT_ACTIVITIES.filter((a) => a.type === selectedType);

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'payment':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'contract':
        return <Activity className="w-4 h-4 text-indigo-600" />;
      case 'milestone':
        return <CreditCard className="w-4 h-4 text-purple-600" />;
      default:
        return <HelpCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Client Activity & Engagement Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time feed of contract events, billing alerts, client tickets, and milestone signoffs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
          >
            <option value="All">All Events</option>
            <option value="invoice">Invoices</option>
            <option value="payment">Payments</option>
            <option value="contract">Contracts</option>
            <option value="milestone">Milestones</option>
          </select>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast('Exported client activity log to PDF', 'info')}
          >
            Export Log
          </Button>
        </div>
      </div>

      <Card title="Activity Feed Stream" subtitle="Chronological enterprise client event ledger">
        <div className="space-y-4">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs shrink-0 mt-0.5">
                {getActionIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-xs font-bold text-slate-900">{item.clientName}</span>
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.action}</p>
                <div className="mt-2.5 flex items-center gap-2">
                  <Badge variant="neutral" size="sm">
                    {item.type.toUpperCase()}
                  </Badge>
                  {item.amount && (
                    <span className="text-xs font-bold text-emerald-600 font-sans">
                      {formatINR(item.amount)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
