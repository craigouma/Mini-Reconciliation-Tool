import React from 'react';
import { Download, AlertTriangle } from 'lucide-react';
import { ReconciliationResult } from '../types';
import { formatCurrency } from '../utils/currencyConverter';

interface DiscrepancyTableProps {
  discrepancies: ReconciliationResult['discrepancies'];
  onExport?: () => void;
}

export const DiscrepancyTable: React.FC<DiscrepancyTableProps> = ({
  discrepancies,
  onExport
}) => {
  if (discrepancies.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-purple-600 flex-shrink-0" />
          <h3 className="text-base sm:text-lg font-semibold text-purple-800">
            <span className="hidden sm:inline">Amount/Status Discrepancies</span>
            <span className="sm:hidden">Discrepancies</span>
            <span className="ml-1">({discrepancies.length})</span>
          </h3>
        </div>
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm sm:text-base"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="hidden sm:inline">Transaction Reference</span>
                <span className="sm:hidden">Ref</span>
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="hidden sm:inline">Internal Amount</span>
                <span className="sm:hidden">Internal</span>
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="hidden sm:inline">Provider Amount</span>
                <span className="sm:hidden">Provider</span>
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="hidden sm:inline">Internal Status</span>
                <span className="sm:hidden">Int Status</span>
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="hidden sm:inline">Provider Status</span>
                <span className="sm:hidden">Prov Status</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {discrepancies.map((discrepancy, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-2 sm:px-6 py-4 text-sm font-medium text-gray-900">
                  <div className="truncate max-w-[80px] sm:max-w-none" title={discrepancy.transaction.transaction_reference}>
                    {discrepancy.transaction.transaction_reference}
                  </div>
                </td>
                <td className="px-2 sm:px-6 py-4 text-sm text-gray-900">
                  <div className="flex flex-col">
                    <span className={`text-xs sm:text-sm ${discrepancy.internalAmount !== discrepancy.providerAmount ? 'text-red-600 font-medium' : ''}`}>
                      {formatCurrency(discrepancy.internalAmount, 'KSh')}
                    </span>
                    {discrepancy.internalCurrency && discrepancy.internalCurrency !== 'KSh' && (
                      <span className="text-xs text-gray-500 hidden sm:block">
                        (Original: {formatCurrency(discrepancy.transaction.amount, discrepancy.internalCurrency)})
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-2 sm:px-6 py-4 text-sm text-gray-900">
                  <div className="flex flex-col">
                    <span className={`text-xs sm:text-sm ${discrepancy.internalAmount !== discrepancy.providerAmount ? 'text-red-600 font-medium' : ''}`}>
                      {formatCurrency(discrepancy.providerAmount, 'KSh')}
                    </span>
                    {discrepancy.providerCurrency && discrepancy.providerCurrency !== 'KSh' && (
                      <span className="text-xs text-gray-500 hidden sm:block">
                        (Original: {discrepancy.providerCurrency})
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    discrepancy.internalStatus !== discrepancy.providerStatus
                      ? 'bg-red-100 text-red-800'
                      : discrepancy.internalStatus.toLowerCase() === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : discrepancy.internalStatus.toLowerCase() === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <span className="hidden sm:inline">{discrepancy.internalStatus}</span>
                    <span className="sm:hidden">
                      {discrepancy.internalStatus.toLowerCase() === 'completed' ? '✓' :
                       discrepancy.internalStatus.toLowerCase() === 'pending' ? '⏳' : '✗'}
                    </span>
                  </span>
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    discrepancy.internalStatus !== discrepancy.providerStatus
                      ? 'bg-red-100 text-red-800'
                      : discrepancy.providerStatus.toLowerCase() === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : discrepancy.providerStatus.toLowerCase() === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <span className="hidden sm:inline">{discrepancy.providerStatus}</span>
                    <span className="sm:hidden">
                      {discrepancy.providerStatus.toLowerCase() === 'completed' ? '✓' :
                       discrepancy.providerStatus.toLowerCase() === 'pending' ? '⏳' : '✗'}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};