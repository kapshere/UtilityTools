
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Calculator, DollarSign } from 'lucide-react';

const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const n = parseFloat(years) * 12; // Total number of payments

    if (p > 0 && r > 0 && n > 0) {
      const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthlyPayment * n;
      const totalInterest = totalPayment - p;

      setResults({
        monthlyPayment,
        totalPayment,
        totalInterest
      });
    }
  };

  const clearCalculation = () => {
    setPrincipal('');
    setInterestRate('');
    setYears('');
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Loan Calculator</h2>
        <p className="text-muted-foreground">Calculate loan payments and total interest</p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="principal">Loan Amount ($)</Label>
            <Input
              id="principal"
              type="number"
              placeholder="100000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rate">Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              placeholder="5.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="years">Loan Term (Years)</Label>
            <Input
              id="years"
              type="number"
              placeholder="30"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateLoan} className="flex-1">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate
          </Button>
          <Button variant="outline" onClick={clearCalculation}>
            Clear
          </Button>
        </div>

        {results && (
          <>
            <Separator className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">
                  ${results.monthlyPayment.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Monthly Payment</div>
              </Card>
              <Card className="p-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-600">
                  ${results.totalPayment.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Total Payment</div>
              </Card>
              <Card className="p-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-600">
                  ${results.totalInterest.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Total Interest</div>
              </Card>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default LoanCalculator;
