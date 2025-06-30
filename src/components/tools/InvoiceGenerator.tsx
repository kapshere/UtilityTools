
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import InvoiceDetailsForm from './invoice/InvoiceDetailsForm';
import CompanyInfoForm from './invoice/CompanyInfoForm';
import ClientInfoForm from './invoice/ClientInfoForm';
import InvoiceItemsTable from './invoice/InvoiceItemsTable';
import InvoiceSummary from './invoice/InvoiceSummary';
import InvoiceNotesSection from './invoice/InvoiceNotesSection';
import { generateInvoicePDF, currencies } from './invoice/invoiceUtils';

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

const InvoiceGenerator: React.FC = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  
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
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleGeneratePDF = () => {
    generateInvoicePDF({
      invoiceNumber,
      invoiceDate,
      dueDate,
      companyInfo,
      clientInfo,
      items,
      selectedCurrency,
      subtotal,
      tax,
      total,
      notes
    });

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
        <InvoiceDetailsForm
          invoiceNumber={invoiceNumber}
          setInvoiceNumber={setInvoiceNumber}
          invoiceDate={invoiceDate}
          setInvoiceDate={setInvoiceDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          currencies={currencies}
        />

        <CompanyInfoForm
          companyInfo={companyInfo}
          setCompanyInfo={setCompanyInfo}
        />
      </div>

      <ClientInfoForm
        clientInfo={clientInfo}
        setClientInfo={setClientInfo}
      />

      <InvoiceItemsTable
        items={items}
        selectedCurrency={selectedCurrency}
        addItem={addItem}
        removeItem={removeItem}
        updateItem={updateItem}
      />

      <InvoiceSummary
        subtotal={subtotal}
        tax={tax}
        total={total}
        selectedCurrency={selectedCurrency}
      />

      <InvoiceNotesSection
        notes={notes}
        setNotes={setNotes}
      />

      <div className="text-center">
        <Button onClick={handleGeneratePDF} size="lg">
          <Download className="h-4 w-4 mr-2" />
          Download Invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
