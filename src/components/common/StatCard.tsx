import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
  changePeriod?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendPositive?: boolean; // if false, up might be bad (e.g. expenses)
  icon: React.ReactNode;
  iconBgColor?: string;
  badge?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changePeriod,
  trend = 'neutral',
  trendPositive = true,
  icon,
  iconBgColor = 'bg-indigo-50 text-indigo-600',
  badge,
  onClick,
}) => {
  // Determine if trend is good or bad
  const isPositive = (trend === 'up' && trendPositive) || (trend === 'down' && !trendPositive);
  const isNegative = (trend === 'down' && trendPositive) || (trend === 'up' && !trendPositive);

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 font-sans">{value}</h3>
        </div>
        <div className={`p-2.5 rounded-lg shrink-0 ${iconBgColor}`}>
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-1.5">
          {change !== undefined && (
            <span
              className={`inline-flex items-center gap-0.5 font-semibold ${
                isPositive
                  ? 'text-emerald-600'
                  : isNegative
                  ? 'text-rose-600'
                  : 'text-slate-600'
              }`}
            >
              {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
              {change > 0 ? `+${change}%` : `${change}%`}
            </span>
          )}
          {changePeriod && <span className="text-slate-400">{changePeriod}</span>}
          {subtitle && <span className="text-slate-500 font-medium">{subtitle}</span>}
        </div>

        {badge && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};
