import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';
import { ReconciliationResult } from '../types';

interface SummaryStatsProps {
  results: ReconciliationResult;
}

export const SummaryStats: React.FC<SummaryStatsProps> = ({ results }) => {
  const totalTransactions = results.matched.length + results.internalOnly.length + results.providerOnly.length;
  const matchRate = totalTransactions > 0 ? (results.matched.length / totalTransactions) * 100 : 0;

  const stats = [
    {
      label: 'Matched Transactions',
      value: results.matched.length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      label: 'Internal Only',
      value: results.internalOnly.length,
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      label: 'Provider Only',
      value: results.providerOnly.length,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      label: 'Match Rate',
      value: `${matchRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Reconciliation Summary</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-3 sm:p-4 rounded-lg border-2 ${stat.bgColor} ${stat.borderColor}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <stat.icon className={`w-5 sm:w-6 h-5 sm:h-6 ${stat.color} flex-shrink-0`} />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 leading-tight">{stat.label}</p>
                <p className={`text-lg sm:text-2xl font-bold ${stat.color} leading-tight`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {results.discrepancies.length > 0 && (
        <div className="mt-4 p-3 sm:p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm font-medium text-purple-800">
              {results.discrepancies.length} transaction(s) with amount/status discrepancies
            </span>
          </div>
        </div>
      )}
    </div>
  );
};