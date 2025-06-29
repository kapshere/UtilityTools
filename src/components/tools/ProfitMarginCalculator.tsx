
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp } from 'lucide-react';

const ProfitMarginCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(0);
  const [costOfGoodsSold, setCostOfGoodsSold] = useState<number>(0);
  const [operatingExpenses, setOperatingExpenses] = useState<number>(0);

  const grossProfit = revenue - costOfGoodsSold;
  const netProfit = grossProfit - operatingExpenses;
  const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Profit Margin Calculator</h2>
        <p className="text-muted-foreground">Calculate profit margins for your products or services</p>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Financial Inputs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="revenue">Total Revenue ($)</Label>
            <Input
              id="revenue"
              type="number"
              value={revenue || ''}
              onChange={(e) => setRevenue(Number(e.target.value))}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="cogs">Cost of Goods Sold ($)</Label>
            <Input
              id="cogs"
              type="number"
              value={costOfGoodsSold || ''}
              onChange={(e) => setCostOfGoodsSold(Number(e.target.value))}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="expenses">Operating Expenses ($)</Label>
            <Input
              id="expenses"
              type="number"
              value={operatingExpenses || ''}
              onChange={(e) => setOperatingExpenses(Number(e.target.value))}
              placeholder="0"
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Profit Calculations
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Gross Profit:</span>
              <span className="font-semibold">${grossProfit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Net Profit:</span>
              <span className="font-semibold">${netProfit.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Margin Percentages
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Gross Margin:</span>
              <span className="font-semibold">{grossMargin.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Net Margin:</span>
              <span className="font-semibold">{netMargin.toFixed(2)}%</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Margin Analysis</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Gross Margin:</strong> Shows profitability after direct costs</p>
          <p><strong>Net Margin:</strong> Shows overall profitability after all expenses</p>
          <div className="mt-4">
            <p className="font-medium">Industry Benchmarks:</p>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>Retail: 20-50% gross margin</li>
              <li>Manufacturing: 25-35% gross margin</li>
              <li>Software: 70-90% gross margin</li>
              <li>Services: 40-60% gross margin</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfitMarginCalculator;
