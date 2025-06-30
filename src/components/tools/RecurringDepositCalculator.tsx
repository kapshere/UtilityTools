
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, TrendingUp, Repeat } from 'lucide-react';

const RecurringDepositCalculator: React.FC = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [timePeriod, setTimePeriod] = useState<number>(12);
  const [timeUnit, setTimeUnit] = useState<string>('months');

  const getTimeInMonths = () => {
    switch (timeUnit) {
      case 'months': return timePeriod;
      case 'years': return timePeriod * 12;
      default: return timePeriod;
    }
  };

  const n = getTimeInMonths();
  const r = interestRate / 100 / 12; // Monthly interest rate

  // RD Maturity Formula: M = P * [(1 + r)^n - 1] / r * (1 + r)
  const maturityAmount = monthlyDeposit * (Math.pow(1 + r, n) - 1) / r * (1 + r);
  const totalInvestment = monthlyDeposit * n;
  const interestEarned = maturityAmount - totalInvestment;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Recurring Deposit Calculator</h2>
        <p className="text-muted-foreground">Calculate returns on your recurring deposit investments</p>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="monthly">Monthly Deposit (₹)</Label>
            <Input
              id="monthly"
              type="number"
              value={monthlyDeposit || ''}
              onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
              placeholder="5000"
            />
          </div>
          <div>
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              value={interestRate || ''}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              placeholder="7.5"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="time">Time Period</Label>
            <Input
              id="time"
              type="number"
              value={timePeriod || ''}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              placeholder="12"
            />
          </div>
          <div>
            <Label htmlFor="timeUnit">Time Unit</Label>
            <Select value={timeUnit} onValueChange={setTimeUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Repeat className="h-5 w-5 mr-2" />
            Total Investment
          </h3>
          <p className="text-2xl font-bold text-blue-600">₹{totalInvestment.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Interest Earned
          </h3>
          <p className="text-2xl font-bold text-green-600">₹{interestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Maturity Amount
          </h3>
          <p className="text-2xl font-bold text-purple-600">₹{maturityAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Investment Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total Return:</span>
            <span className="font-semibold">{((maturityAmount / totalInvestment - 1) * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Monthly Contribution:</span>
            <span className="font-semibold">₹{monthlyDeposit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Investment Period:</span>
            <span className="font-semibold">{n} months</span>
          </div>
          <div className="flex justify-between">
            <span>Effective Annual Return:</span>
            <span className="font-semibold">{(interestRate).toFixed(2)}%</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RecurringDepositCalculator;
