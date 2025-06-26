import React, { useState } from 'react';
import { Settings, Info } from 'lucide-react';
import { DEFAULT_EXCHANGE_RATES, getSupportedCurrencies, getExchangeRateInfo } from '../utils/currencyConverter';

interface CurrencySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurrencySettings: React.FC<CurrencySettingsProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('KSh');
  const supportedCurrencies = getSupportedCurrencies();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-blue-600" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Currency Exchange Rates</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Base Currency: Kenyan Shilling (KSh)</span>
            </div>
            <p className="text-sm text-gray-600">
              All amounts are converted to KSh for reconciliation. Exchange rates are static and used for demonstration purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {supportedCurrencies.map((currency) => (
              <div
                key={currency}
                className={`p-3 sm:p-4 border rounded-lg transition-colors ${
                  currency === 'KSh' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800 text-sm sm:text-base">{currency}</span>
                    {currency === 'KSh' && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Base
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm text-gray-600">
                      {getExchangeRateInfo(currency)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Important Notes:</p>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                  <li>Exchange rates are static and for demonstration purposes only</li>
                  <li>In production, rates should be fetched from a reliable financial API</li>
                  <li>All reconciliation comparisons are done in KSh after conversion</li>
                  <li>Original amounts and currencies are preserved for display</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 sm:p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};