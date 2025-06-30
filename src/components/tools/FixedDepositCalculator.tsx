
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, TrendingUp, PiggyBank } from 'lucide-react';

const FixedDepositCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [timePeriod, setTimePeriod] = useState<number>(1);
  const [timeUnit, setTimeUnit] = useState<string>('years');
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('quarterly');

  const getCompoundingFactor = () => {
    switch (compoundingFrequency) {
      case 'annually': return 1;
      case 'semi-annually': return 2;
      case 'quarterly': return 4;
      case 'monthly': return 12;
      case 'daily': return 365;
      default: return 4;
    }
  };

  const getTimeInYears = () => {
    switch (timeUnit) {
      case 'months': return timePeriod / 12;
      case 'years': return timePeriod;
      default: return timePeriod;
    }
  };

  const n = getCompoundingFactor();
  const t = getTimeInYears();
  const r = interestRate / 100;

  // Compound Interest Formula: A = P(1 + r/n)^(nt)
  const maturityAmount = principal * Math.pow(1 + r / n, n * t);
  const interestEarned = maturityAmount - principal;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Fixed Deposit Calculator</h2>
        <p className="text-muted-foreground">Calculate returns on your fixed deposit investments</p>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="principal">Principal Amount (₹)</Label>
            <Input
              id="principal"
              type="number"
              value={principal || ''}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              placeholder="100000"
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
              placeholder="1"
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
          <div className="md:col-span-2">
            <Label htmlFor="compounding">Compounding Frequency</Label>
            <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annually">Annually</SelectItem>
                <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <PiggyBank className="h-5 w-5 mr-2" />
            Principal Amount
          </h3>
          <p className="text-2xl font-bold text-blue-600">₹{principal.toLocaleString()}</p>
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
            <span>Effective Annual Yield:</span>
            <span className="font-semibold">{((maturityAmount / principal - 1) / t * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Total Return:</span>
            <span className="font-semibold">{((maturityAmount / principal - 1) * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Investment Period:</span>
            <span className="font-semibold">{timePeriod} {timeUnit}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FixedDepositCalculator;
