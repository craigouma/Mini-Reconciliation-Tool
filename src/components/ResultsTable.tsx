import React from 'react';
import { Download } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/currencyConverter';

interface ResultsTableProps {
  title: string;
  transactions: Transaction[];
  colorClass: string;
  onExport?: () => void;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  title,
  transactions,
  colorClass,
  onExport
}) => {
  if (transactions.length === 0) return null;

  const columns = ['transaction_reference', 'amount', 'currency', 'status'];

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b gap-3 sm:gap-0">
        <h3 className={`text-base sm:text-lg font-semibold ${colorClass}`}>
          {title} ({transactions.length})
        </h3>
        {onExport && (
          <button
            onClick={onExport}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
              colorClass.includes('green') 
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : colorClass.includes('yellow')
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
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
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <span className="hidden sm:inline">{column.replace('_', ' ')}</span>
                  <span className="sm:hidden">
                    {column === 'transaction_reference' ? 'Ref' : 
                     column === 'amount' ? 'Amount' :
                     column === 'currency' ? 'Curr' : 'Status'}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 sm:px-6 py-4 text-sm font-medium text-gray-900">
                  <div className="truncate max-w-[120px] sm:max-w-none" title={transaction.transaction_reference}>
                    {transaction.transaction_reference}
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="hidden sm:inline">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </span>
                  <span className="sm:hidden text-xs">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                    {transaction.currency || 'KSh'}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status.toLowerCase() === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : transaction.status.toLowerCase() === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <span className="hidden sm:inline">{transaction.status}</span>
                    <span className="sm:hidden">
                      {transaction.status.toLowerCase() === 'completed' ? '✓' :
                       transaction.status.toLowerCase() === 'pending' ? '⏳' : '✗'}
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