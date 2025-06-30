
import React from 'react';

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface InvoiceSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  selectedCurrency: Currency;
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
  subtotal,
  tax,
  total,
  selectedCurrency
}) => {
  return (
    <div className="mt-6 space-y-2 text-right">
      <p>Subtotal: {selectedCurrency.symbol}{subtotal.toFixed(2)}</p>
      <p>Tax (10%): {selectedCurrency.symbol}{tax.toFixed(2)}</p>
      <p className="text-lg font-semibold">Total: {selectedCurrency.symbol}{total.toFixed(2)}</p>
    </div>
  );
};

export default InvoiceSummary;
