
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Calculator, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const categories = [
  'Office Supplies',
  'Travel',
  'Meals & Entertainment',
  'Professional Services',
  'Marketing',
  'Utilities',
  'Equipment',
  'Software',
  'Training',
  'Other'
];

const ExpenseCalculator: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', description: '', amount: 0, category: '', date: new Date().toISOString().split('T')[0] }
  ]);
  const { toast } = useToast();

  const addExpense = () => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      description: '',
      amount: 0,
      category: '',
      date: new Date().toISOString().split('T')[0]
    };
    setExpenses([...expenses, newExpense]);
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const updateExpense = (id: string, field: keyof Expense, value: string | number) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, [field]: value } : expense
    ));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (expense.category && expense.amount > 0) {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  const exportToCSV = () => {
    const csvContent = 'Description,Amount,Category,Date\n' +
      expenses.map(expense => 
        `"${expense.description}",${expense.amount},"${expense.category}","${expense.date}"`
      ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Expenses exported to CSV",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Expense Calculator</h2>
        <p className="text-muted-foreground">Track and calculate your business expenses</p>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Expense Entries</h3>
          <Button onClick={addExpense} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>

        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <Input
                placeholder="Description"
                value={expense.description}
                onChange={(e) => updateExpense(expense.id, 'description', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Amount"
                value={expense.amount || ''}
                onChange={(e) => updateExpense(expense.id, 'amount', Number(e.target.value))}
              />
              <Select
                value={expense.category}
                onValueChange={(value) => updateExpense(expense.id, 'category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={expense.date}
                onChange={(e) => updateExpense(expense.id, 'date', e.target.value)}
              />
              <Button
                onClick={() => removeExpense(expense.id)}
                size="sm"
                variant="destructive"
                disabled={expenses.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Total Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Expenses:</span>
              <span>${totalExpenses.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Number of Entries:</span>
              <span>{expenses.filter(e => e.amount > 0).length}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
          <div className="space-y-2">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={category} className="flex justify-between">
                <span className="text-sm">{category}:</span>
                <span className="text-sm font-medium">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="text-center">
        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </Button>
      </div>
    </div>
  );
};

export default ExpenseCalculator;
