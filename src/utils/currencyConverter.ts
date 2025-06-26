import { ExchangeRates } from '../types';

// Static exchange rates (KSh as base currency)
export const DEFAULT_EXCHANGE_RATES: ExchangeRates = {
  'KSh': 1.0,      // Kenyan Shilling (base)
  'USD': 0.0077,   // US Dollar
  'EUR': 0.0074,   // Euro
  'GBP': 0.0063,   // British Pound
  'ZAR': 0.14,     // South African Rand
  'UGX': 28.5,     // Ugandan Shilling
  'TZS': 18.2,     // Tanzanian Shilling
  'RWF': 10.5,     // Rwandan Franc
  'ETB': 0.42,     // Ethiopian Birr
  'NGN': 12.8,     // Nigerian Naira
};

export const convertToBaseCurrency = (
  amount: number,
  fromCurrency: string,
  exchangeRates: ExchangeRates = DEFAULT_EXCHANGE_RATES
): number => {
  const normalizedCurrency = fromCurrency.toUpperCase();
  
  if (normalizedCurrency === 'KSH' || normalizedCurrency === 'KSHILLINGS') {
    return amount;
  }
  
  const rate = exchangeRates[normalizedCurrency];
  if (!rate) {
    console.warn(`Exchange rate not found for currency: ${fromCurrency}. Using 1:1 conversion.`);
    return amount;
  }
  
  // Convert to KSh (divide by the rate since rates are KSh per unit of foreign currency)
  return amount / rate;
};

export const formatCurrency = (
  amount: number,
  currency: string = 'KSh'
): string => {
  const normalizedCurrency = currency.toUpperCase();
  
  switch (normalizedCurrency) {
    case 'KSH':
    case 'KSHILLINGS':
      return `KSh ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'USD':
      return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'EUR':
      return `€${amount.toLocaleString('en-EU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'GBP':
      return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    default:
      return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

export const getSupportedCurrencies = (): string[] => {
  return Object.keys(DEFAULT_EXCHANGE_RATES);
};

export const getExchangeRateInfo = (currency: string): string => {
  const rate = DEFAULT_EXCHANGE_RATES[currency.toUpperCase()];
  if (!rate) return 'Rate not available';
  
  if (rate === 1.0) return 'Base currency';
  if (rate < 1) return `1 ${currency.toUpperCase()} = ${(1/rate).toFixed(2)} KSh`;
  return `1 KSh = ${rate.toFixed(4)} ${currency.toUpperCase()}`;
};