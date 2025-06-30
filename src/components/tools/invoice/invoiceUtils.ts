
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

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyInfo: CompanyInfo;
  clientInfo: CompanyInfo;
  items: InvoiceItem[];
  selectedCurrency: Currency;
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
}

export const generateInvoicePDF = (data: InvoiceData) => {
  const {
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
  } = data;

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
};

export const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];
