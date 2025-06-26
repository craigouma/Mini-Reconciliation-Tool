import { Transaction, ReconciliationResult } from '../types';
import { convertToBaseCurrency } from './currencyConverter';

export const reconcileTransactions = (
  internalTransactions: Transaction[],
  providerTransactions: Transaction[]
): ReconciliationResult => {
  const internalMap = new Map<string, Transaction>();
  const providerMap = new Map<string, Transaction>();

  // Create maps for efficient lookup and convert amounts to base currency
  internalTransactions.forEach(transaction => {
    const convertedTransaction = {
      ...transaction,
      originalAmount: transaction.amount,
      amount: convertToBaseCurrency(transaction.amount, transaction.currency || 'KSh')
    };
    internalMap.set(transaction.transaction_reference, convertedTransaction);
  });

  providerTransactions.forEach(transaction => {
    const convertedTransaction = {
      ...transaction,
      originalAmount: transaction.amount,
      amount: convertToBaseCurrency(transaction.amount, transaction.currency || 'KSh')
    };
    providerMap.set(transaction.transaction_reference, convertedTransaction);
  });

  const matched: Transaction[] = [];
  const internalOnly: Transaction[] = [];
  const providerOnly: Transaction[] = [];
  const discrepancies: ReconciliationResult['discrepancies'] = [];

  // Check internal transactions
  internalTransactions.forEach(internalTransaction => {
    const ref = internalTransaction.transaction_reference;
    const providerTransaction = providerMap.get(ref);

    if (providerTransaction) {
      // Transaction exists in both systems
      const internalConverted = internalMap.get(ref)!;
      
      // Use converted amounts for comparison (with small tolerance for floating point precision)
      const amountDifference = Math.abs(internalConverted.amount - providerTransaction.amount);
      const tolerance = 0.01; // 1 cent tolerance
      
      const amountsMatch = amountDifference < tolerance;
      const statusesMatch = internalTransaction.status === providerTransaction.status;

      if (amountsMatch && statusesMatch) {
        matched.push(internalTransaction);
      } else {
        matched.push(internalTransaction);
        
        // Add to discrepancies if there are differences
        discrepancies.push({
          transaction: internalTransaction,
          internalAmount: internalConverted.amount,
          providerAmount: providerTransaction.amount,
          internalStatus: internalTransaction.status,
          providerStatus: providerTransaction.status,
          internalCurrency: internalTransaction.currency || 'KSh',
          providerCurrency: providerTransaction.currency || 'KSh'
        });
      }
    } else {
      // Transaction only exists in internal system
      internalOnly.push(internalTransaction);
    }
  });

  // Check provider transactions that don't exist in internal system
  providerTransactions.forEach(providerTransaction => {
    const ref = providerTransaction.transaction_reference;
    if (!internalMap.has(ref)) {
      providerOnly.push(providerTransaction);
    }
  });

  return {
    matched,
    internalOnly,
    providerOnly,
    discrepancies
  };
};