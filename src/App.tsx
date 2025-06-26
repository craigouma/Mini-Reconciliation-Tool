import React, { useState } from 'react';
import { AlertCircle, RefreshCw, Settings } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { SummaryStats } from './components/SummaryStats';
import { ResultsTable } from './components/ResultsTable';
import { DiscrepancyTable } from './components/DiscrepancyTable';
import { CurrencySettings } from './components/CurrencySettings';
import { Transaction, ReconciliationResult, FileUploadError } from './types';
import { reconcileTransactions } from './utils/reconciliation';
import { exportToCSV, exportDiscrepancies } from './utils/csvExport';

function App() {
  const [internalTransactions, setInternalTransactions] = useState<Transaction[]>([]);
  const [providerTransactions, setProviderTransactions] = useState<Transaction[]>([]);
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const [providerFile, setProviderFile] = useState<File | null>(null);
  const [results, setResults] = useState<ReconciliationResult | null>(null);
  const [errors, setErrors] = useState<{ internal?: FileUploadError; provider?: FileUploadError }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCurrencySettings, setShowCurrencySettings] = useState(false);

  const handleInternalFileUpload = (transactions: Transaction[]) => {
    setInternalTransactions(transactions);
    setErrors(prev => ({ ...prev, internal: undefined }));
  };

  const handleProviderFileUpload = (transactions: Transaction[]) => {
    setProviderTransactions(transactions);
    setErrors(prev => ({ ...prev, provider: undefined }));
  };

  const handleInternalError = (error: FileUploadError) => {
    setErrors(prev => ({ ...prev, internal: error }));
    setInternalTransactions([]);
    setInternalFile(null);
  };

  const handleProviderError = (error: FileUploadError) => {
    setErrors(prev => ({ ...prev, provider: error }));
    setProviderTransactions([]);
    setProviderFile(null);
  };

  const handleReconcile = async () => {
    if (internalTransactions.length === 0 || providerTransactions.length === 0) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const reconciliationResults = reconcileTransactions(internalTransactions, providerTransactions);
    setResults(reconciliationResults);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setInternalTransactions([]);
    setProviderTransactions([]);
    setInternalFile(null);
    setProviderFile(null);
    setResults(null);
    setErrors({});
  };

  const canReconcile = internalTransactions.length > 0 && providerTransactions.length > 0 && !isProcessing;

  // Check if any transactions have different currencies
  const hasMultipleCurrencies = [...internalTransactions, ...providerTransactions]
    .some(t => t.currency && t.currency !== 'KSh');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Mini Reconciliation Tool</h1>
            <button
              onClick={() => setShowCurrencySettings(true)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm sm:text-base"
              title="View exchange rates"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">FX Rates</span>
              <span className="sm:hidden">Rates</span>
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            Compare transaction records between internal systems and payment providers with multi-currency support
          </p>
          {hasMultipleCurrencies && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg mx-2 sm:mx-auto sm:inline-block">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-blue-800">
                  Multi-currency transactions detected - amounts converted to KSh for reconciliation
                </span>
              </div>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <FileUpload
              title="Internal System Export"
              onFileUpload={(transactions) => {
                setInternalFile(new File([], 'internal.csv'));
                handleInternalFileUpload(transactions);
              }}
              onError={handleInternalError}
              uploadedFile={internalFile}
              onRemoveFile={() => {
                setInternalFile(null);
                setInternalTransactions([]);
              }}
              isLoading={isProcessing}
            />
            {errors.internal && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-700">{errors.internal.message}</span>
              </div>
            )}
          </div>

          <div>
            <FileUpload
              title="Provider Statement"
              onFileUpload={(transactions) => {
                setProviderFile(new File([], 'provider.csv'));
                handleProviderFileUpload(transactions);
              }}
              onError={handleProviderError}
              uploadedFile={providerFile}
              onRemoveFile={() => {
                setProviderFile(null);
                setProviderTransactions([]);
              }}
              isLoading={isProcessing}
            />
            {errors.provider && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-700">{errors.provider.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
          <button
            onClick={handleReconcile}
            disabled={!canReconcile}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all w-full sm:w-auto ${
              canReconcile
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Start Reconciliation'
            )}
          </button>

          {(internalTransactions.length > 0 || providerTransactions.length > 0 || results) && (
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Reset
            </button>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-4 sm:space-y-6">
            <SummaryStats results={results} />

            <DiscrepancyTable
              discrepancies={results.discrepancies}
              onExport={() => exportDiscrepancies(results.discrepancies, 'discrepancies.csv')}
            />

            <ResultsTable
              title="✅ Matched Transactions"
              transactions={results.matched}
              colorClass="text-green-600"
              onExport={() => exportToCSV(results.matched, 'matched_transactions.csv')}
            />

            <ResultsTable
              title="⚠️ Internal Only"
              transactions={results.internalOnly}
              colorClass="text-yellow-600"
              onExport={() => exportToCSV(results.internalOnly, 'internal_only.csv')}
            />

            <ResultsTable
              title="❌ Provider Only"
              transactions={results.providerOnly}
              colorClass="text-red-600"
              onExport={() => exportToCSV(results.providerOnly, 'provider_only.csv')}
            />
          </div>
        )}

        {/* Currency Settings Modal */}
        <CurrencySettings
          isOpen={showCurrencySettings}
          onClose={() => setShowCurrencySettings(false)}
        />
      </div>
    </div>
  );
}

export default App;