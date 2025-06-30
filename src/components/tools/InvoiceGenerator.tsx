import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Plus, Trash2, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface CompanyInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

const currencies: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

const InvoiceGenerator: React.FC = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]); // Default to INR
  
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  
  const [clientInfo, setClientInfo] = useState<CompanyInfo>({
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0, amount: 0 }
  ]);
  
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const generatePDF = () => {
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .company-info, .client-info { margin-bottom: 20px; }
          .invoice-details { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .totals { text-align: right; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>INVOICE</h1>
          <h2>${invoiceNumber}</h2>
        </div>
        
        <div class="company-info">
          <strong>From:</strong><br>
          ${companyInfo.name}<br>
          ${companyInfo.address}<br>
          ${companyInfo.email}<br>
          ${companyInfo.phone}
        </div>
        
        <div class="client-info">
          <strong>To:</strong><br>
          ${clientInfo.name}<br>
          ${clientInfo.address}<br>
          ${clientInfo.email}<br>
          ${clientInfo.phone}
        </div>
        
        <div class="invoice-details">
          <strong>Invoice Date:</strong> ${invoiceDate}<br>
          <strong>Due Date:</strong> ${dueDate}<br>
          <strong>Currency:</strong> ${selectedCurrency.name} (${selectedCurrency.code})
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${selectedCurrency.symbol}${item.rate.toFixed(2)}</td>
                <td>${selectedCurrency.symbol}${item.amount.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="totals">
          <p><strong>Subtotal: ${selectedCurrency.symbol}${subtotal.toFixed(2)}</strong></p>
          <p><strong>Tax (10%): ${selectedCurrency.symbol}${tax.toFixed(2)}</strong></p>
          <p><strong>Total: ${selectedCurrency.symbol}${total.toFixed(2)}</strong></p>
        </div>
        
        ${notes ? `<div><strong>Notes:</strong><br>${notes}</div>` : ''}
      </body>
      </html>
    `;

    const blob = new Blob([invoiceHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoiceNumber}.html`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Invoice downloaded successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Invoice Generator</h2>
        <p className="text-muted-foreground">Create professional invoices for your business</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Company Information</h3>
          <div className="space-y-4">
            <Input
              placeholder="Company Name"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
            />
            <Textarea
              placeholder="Address"
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
            />
            <Input
              placeholder="Email"
              value={companyInfo.email}
              onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
            />
            <Input
              placeholder="Phone"
              value={companyInfo.phone}
              onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
            />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Client Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Client Name"
            value={clientInfo.name}
            onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
          />
          <Input
            placeholder="Client Email"
            value={clientInfo.email}
            onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
          />
          <Textarea
            placeholder="Client Address"
            value={clientInfo.address}
            onChange={(e) => setClientInfo({...clientInfo, address: e.target.value})}
          />
          <Input
            placeholder="Client Phone"
            value={clientInfo.phone}
            onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
          />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Invoice Items</h3>
          <Button onClick={addItem} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
        
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <Input
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                className="w-20"
              />
              <Input
                type="number"
                placeholder="Rate"
                value={item.rate}
                onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                className="w-24"
              />
              <div className="w-24 text-right">{selectedCurrency.symbol}{item.amount.toFixed(2)}</div>
              <Button
                onClick={() => removeItem(item.id)}
                size="sm"
                variant="destructive"
                disabled={items.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2 text-right">
          <p>Subtotal: {selectedCurrency.symbol}{subtotal.toFixed(2)}</p>
          <p>Tax (10%): {selectedCurrency.symbol}{tax.toFixed(2)}</p>
          <p className="text-lg font-semibold">Total: {selectedCurrency.symbol}{total.toFixed(2)}</p>
        </div>
      </Card>

      <Card className="p-6">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Additional notes or terms"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2"
        />
      </Card>

      <div className="text-center">
        <Button onClick={generatePDF} size="lg">
          <Download className="h-4 w-4 mr-2" />
          Download Invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
