import React, { useState } from 'react';
import {
  Lightbulb,
  ArrowRight,
  Sparkles,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { AI_INSIGHTS } from '../../data/mock/aiInsights';
import { AIInsight } from '../../types';
import { useToast } from '../../components/common/Toast';

export const BusinessInsightsPage: React.FC = () => {
  const { showToast } = useToast();
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);

  const getSeverityBadge = (severity: AIInsight['severity']) => {
    switch (severity) {
      case 'Info':
        return <Badge variant="info" size="sm" dot>Info</Badge>;
      case 'Attention':
        return <Badge variant="warning" size="sm" dot>Attention</Badge>;
      case 'Warning':
        return <Badge variant="danger" size="sm" dot>Warning</Badge>;
    }
  };

  const getSeverityIcon = (severity: AIInsight['severity']) => {
    switch (severity) {
      case 'Info':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'Attention':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'Warning':
        return <AlertCircle className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Business Insights
            </h1>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              Continuous Intelligence
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Machine-audited observations, financial opportunities, and operational anomalies
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => showToast('Refreshed telemetry across all 5 insight categories', 'success')}
          icon={<Sparkles className="w-4 h-4 text-indigo-600" />}
        >
          Re-Analyze Ledger
        </Button>
      </div>

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {AI_INSIGHTS.map((insight) => (
          <Card
            key={insight.id}
            className="hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {insight.category} Insight
                  </span>
                  {getSeverityBadge(insight.severity)}
                </div>
                <span className="text-[11px] text-slate-400">{insight.date}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                "{insight.title}"
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {insight.explanation}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Impact: {insight.metricsImpacted || 'General'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedInsight(insight)}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                View Details →
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Insight Details Modal */}
      {selectedInsight && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedInsight(null)}
          title={`Insight Details — ${selectedInsight.category}`}
          subtitle={`Logged on ${selectedInsight.date}`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  showToast('Action plan logged to executive task board', 'success');
                  setSelectedInsight(null);
                }}
              >
                Accept Recommendation
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setSelectedInsight(null)}>
                Dismiss
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              {getSeverityIcon(selectedInsight.severity)}
              <div>
                <span className="font-bold text-slate-900 block">{selectedInsight.title}</span>
                <span className="text-[11px] text-slate-500">{selectedInsight.explanation}</span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1.5 text-slate-400">
                Detailed Analysis & Root Cause
              </h5>
              <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                {selectedInsight.details}
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1.5 text-indigo-600">
                Recommended Remediation Action
              </h5>
              <div className="bg-indigo-50/70 p-3 rounded-lg border border-indigo-100 text-indigo-950 font-medium leading-relaxed">
                {selectedInsight.recommendedAction}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
