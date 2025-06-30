
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  selectedCurrency: Currency;
  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, field: keyof InvoiceItem, value: string | number) => void;
}

const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({
  items,
  selectedCurrency,
  addItem,
  removeItem,
  updateItem
}) => {
  return (
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
    </Card>
  );
};

export default InvoiceItemsTable;
