export interface Transaction {
  transaction_reference: string;
  amount: number;
  status: string;
  currency?: string;
  [key: string]: any;
}

export interface ReconciliationResult {
  matched: Transaction[];
  internalOnly: Transaction[];
  providerOnly: Transaction[];
  discrepancies: {
    transaction: Transaction;
    internalAmount: number;
    providerAmount: number;
    internalStatus: string;
    providerStatus: string;
    internalCurrency?: string;
    providerCurrency?: string;
  }[];
}

export interface FileUploadError {
  type: 'format' | 'columns' | 'parsing';
  message: string;
}

export interface ExchangeRates {
  [currency: string]: number;
}

export interface CurrencySettings {
  baseCurrency: string;
  exchangeRates: ExchangeRates;
}