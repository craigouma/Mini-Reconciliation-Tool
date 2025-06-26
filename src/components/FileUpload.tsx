import React, { useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Transaction, FileUploadError } from '../types';
import Papa from 'papaparse';

interface FileUploadProps {
  title: string;
  onFileUpload: (transactions: Transaction[]) => void;
  onError: (error: FileUploadError) => void;
  uploadedFile: File | null;
  onRemoveFile: () => void;
  isLoading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  title,
  onFileUpload,
  onError,
  uploadedFile,
  onRemoveFile,
  isLoading
}) => {
  const validateColumns = (data: any[]): boolean => {
    if (data.length === 0) return false;
    
    const requiredColumns = ['transaction_reference', 'amount', 'status'];
    const firstRow = data[0];
    
    return requiredColumns.every(col => col in firstRow);
  };

  const handleFileUpload = useCallback((file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      onError({
        type: 'format',
        message: 'Please upload a CSV file'
      });
      return;
    }

    Papa.parse(file, {
      complete: (results) => {
        try {
          if (results.errors.length > 0) {
            onError({
              type: 'parsing',
              message: `CSV parsing error: ${results.errors[0].message}`
            });
            return;
          }

          const data = results.data as any[];
          
          if (!validateColumns(data)) {
            onError({
              type: 'columns',
              message: 'CSV must contain columns: transaction_reference, amount, status (currency is optional)'
            });
            return;
          }

          const transactions: Transaction[] = data.map(row => ({
            ...row,
            amount: parseFloat(row.amount),
            transaction_reference: row.transaction_reference?.toString() || '',
            status: row.status?.toString() || '',
            currency: row.currency?.toString() || 'KSh' // Default to KSh if no currency specified
          })).filter(t => t.transaction_reference && !isNaN(t.amount));

          onFileUpload(transactions);
        } catch (error) {
          onError({
            type: 'parsing',
            message: 'Failed to process CSV file'
          });
        }
      },
      header: true,
      skipEmptyLines: true
    });
  }, [onFileUpload, onError]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      
      {uploadedFile ? (
        <div className="flex items-center justify-between p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-green-800 truncate">{uploadedFile.name}</p>
              <p className="text-xs text-green-600">
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            onClick={onRemoveFile}
            className="p-1 hover:bg-green-100 rounded-full transition-colors flex-shrink-0 ml-2"
            disabled={isLoading}
          >
            <X className="w-4 h-4 text-green-600" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
        >
          <Upload className="w-10 sm:w-12 h-10 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base text-gray-600 mb-2">Drop your CSV file here, or</p>
          <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm sm:text-base">
            Browse Files
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isLoading}
            />
          </label>
          <div className="mt-3 space-y-1">
            <p className="text-xs text-gray-500">
              Required: transaction_reference, amount, status
            </p>
            <p className="text-xs text-gray-500">
              Optional: currency (defaults to KSh)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};