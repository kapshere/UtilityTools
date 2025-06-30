
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, BarChart3, PiggyBank } from 'lucide-react';

const MutualFundCalculator: React.FC = () => {
  const [investmentType, setInvestmentType] = useState<string>('sip');
  const [monthlyAmount, setMonthlyAmount] = useState<number>(10000);
  const [lumpSumAmount, setLumpSumAmount] = useState<number>(100000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);

  const calculateSIP = () => {
    const r = expectedReturn / 100 / 12; // Monthly interest rate
    const n = timePeriod * 12; // Total months
    
    // SIP Formula: FV = PMT * [(1 + r)^n - 1] / r * (1 + r)
    const futureValue = monthlyAmount * (Math.pow(1 + r, n) - 1) / r * (1 + r);
    const totalInvestment = monthlyAmount * n;
    const totalReturns = futureValue - totalInvestment;
    
    return { futureValue, totalInvestment, totalReturns };
  };

  const calculateLumpSum = () => {
    const r = expectedReturn / 100;
    const n = timePeriod;
    
    // Compound Interest Formula: A = P(1 + r)^n
    const futureValue = lumpSumAmount * Math.pow(1 + r, n);
    const totalInvestment = lumpSumAmount;
    const totalReturns = futureValue - totalInvestment;
    
    return { futureValue, totalInvestment, totalReturns };
  };

  const sipResults = calculateSIP();
  const lumpSumResults = calculateLumpSum();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Mutual Fund Calculator</h2>
        <p className="text-muted-foreground">Calculate SIP and lump sum mutual fund returns</p>
      </div>

      <Tabs value={investmentType} onValueChange={setInvestmentType} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
          <TabsTrigger value="lumpsum">Lump Sum Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="sip" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">SIP Investment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthly-sip">Monthly SIP Amount (₹)</Label>
                <Input
                  id="monthly-sip"
                  type="number"
                  value={monthlyAmount || ''}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  placeholder="10000"
                />
              </div>
              <div>
                <Label htmlFor="return-sip">Expected Annual Return (%)</Label>
                <Input
                  id="return-sip"
                  type="number"
                  value={expectedReturn || ''}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  placeholder="12"
                  step="0.1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="period-sip">Investment Period (Years)</Label>
                <Input
                  id="period-sip"
                  type="number"
                  value={timePeriod || ''}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  placeholder="10"
                />
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <PiggyBank className="h-5 w-5 mr-2" />
                Total Investment
              </h3>
              <p className="text-2xl font-bold text-blue-600">₹{sipResults.totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Total Returns
              </h3>
              <p className="text-2xl font-bold text-green-600">₹{sipResults.totalReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Future Value
              </h3>
              <p className="text-2xl font-bold text-purple-600">₹{sipResults.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lumpsum" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Lump Sum Investment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lumpsum-amount">Investment Amount (₹)</Label>
                <Input
                  id="lumpsum-amount"
                  type="number"
                  value={lumpSumAmount || ''}
                  onChange={(e) => setLumpSumAmount(Number(e.target.value))}
                  placeholder="100000"
                />
              </div>
              <div>
                <Label htmlFor="return-lumpsum">Expected Annual Return (%)</Label>
                <Input
                  id="return-lumpsum"
                  type="number"
                  value={expectedReturn || ''}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  placeholder="12"
                  step="0.1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="period-lumpsum">Investment Period (Years)</Label>
                <Input
                  id="period-lumpsum"
                  type="number"
                  value={timePeriod || ''}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  placeholder="10"
                />
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <PiggyBank className="h-5 w-5 mr-2" />
                Investment Amount
              </h3>
              <p className="text-2xl font-bold text-blue-600">₹{lumpSumResults.totalInvestment.toLocaleString()}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Total Returns
              </h3>
              <p className="text-2xl font-bold text-green-600">₹{lumpSumResults.totalReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Future Value
              </h3>
              <p className="text-2xl font-bold text-purple-600">₹{lumpSumResults.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium mb-2">SIP Benefits:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Rupee cost averaging</li>
              <li>Disciplined investing</li>
              <li>Power of compounding</li>
              <li>Lower risk through averaging</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-2">Lump Sum Benefits:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Higher potential returns in bull markets</li>
              <li>Simple one-time investment</li>
              <li>Full exposure to market gains</li>
              <li>Suitable for available surplus funds</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MutualFundCalculator;
