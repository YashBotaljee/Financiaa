import React from 'react';
import {
  ShieldAlert,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { BUSINESS_WATCH_ALERTS } from '../../data/mock/aiInsights';
import { useToast } from '../../components/common/Toast';
import { NavSection } from '../../types';

export interface BusinessWatchPageProps {
  onNavigate?: (section: NavSection) => void;
}

export const BusinessWatchPage: React.FC<BusinessWatchPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const getStatusBadge = (status: 'Normal' | 'Watch' | 'Critical') => {
    switch (status) {
      case 'Normal':
        return <Badge variant="success" size="sm" dot>Normal</Badge>;
      case 'Watch':
        return <Badge variant="warning" size="sm" dot>Watch</Badge>;
      case 'Critical':
        return <Badge variant="danger" size="sm" dot>Critical</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cash Flow':
        return <DollarSign className="w-5 h-5 text-emerald-600" />;
      case 'Expense Changes':
        return <Activity className="w-5 h-5 text-amber-600" />;
      case 'Overdue Payments':
        return <AlertTriangle className="w-5 h-5 text-rose-600" />;
      case 'Revenue Changes':
        return <TrendingUp className="w-5 h-5 text-indigo-600" />;
      case 'Budget Monitoring':
        return <Layers className="w-5 h-5 text-sky-600" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Business Watch
            </h1>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Active Watchdog
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor important business events and trends.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => showToast('Polled all 5 watchdog health checks. All systems responsive.', 'success')}
        >
          Check Thresholds Now
        </Button>
      </div>

      {/* Monitor Category Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {BUSINESS_WATCH_ALERTS.map((alert) => (
          <Card
            key={alert.id}
            className={`transition-all hover:border-slate-300 ${
              alert.status === 'Critical'
                ? 'border-rose-200/80 bg-rose-50/10'
                : alert.status === 'Watch'
                ? 'border-amber-200/80'
                : 'border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                {getCategoryIcon(alert.category)}
              </div>
              {getStatusBadge(alert.status)}
            </div>

            <div className="mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {alert.category}
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                "{alert.title}"
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {alert.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Current Reading:</span>
                <span className="font-bold text-slate-900">{alert.currentValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Benchmark:</span>
                <span className="text-slate-600 font-medium">{alert.threshold}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {alert.updatedAt}
              </span>
              <button
                onClick={() => {
                  if (alert.category === 'Overdue Payments' && onNavigate) onNavigate('invoices');
                  else if (alert.category === 'Expense Changes' && onNavigate) onNavigate('expenses');
                  else if (alert.category === 'Revenue Changes' && onNavigate) onNavigate('income');
                  else showToast(`Reviewing parameter: ${alert.title}`, 'info');
                }}
                className="font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center gap-1"
              >
                Inspect →
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
