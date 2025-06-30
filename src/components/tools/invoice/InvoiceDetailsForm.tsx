
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndianRupee } from 'lucide-react';

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface InvoiceDetailsFormProps {
  invoiceNumber: string;
  setInvoiceNumber: (value: string) => void;
  invoiceDate: string;
  setInvoiceDate: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currencies: Currency[];
}

const InvoiceDetailsForm: React.FC<InvoiceDetailsFormProps> = ({
  invoiceNumber,
  setInvoiceNumber,
  invoiceDate,
  setInvoiceDate,
  dueDate,
  setDueDate,
  selectedCurrency,
  setSelectedCurrency,
  currencies
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="invoice-number">Invoice Number</Label>
          <Input
            id="invoice-number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="invoice-date">Invoice Date</Label>
            <Input
              id="invoice-date"
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="due-date">Due Date</Label>
            <Input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Select value={selectedCurrency.code} onValueChange={(value) => {
            const currency = currencies.find(c => c.code === value);
            if (currency) setSelectedCurrency(currency);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center gap-2">
                    {currency.code === 'INR' && <IndianRupee className="h-4 w-4" />}
                    <span>{currency.symbol} {currency.code} - {currency.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default InvoiceDetailsForm;
