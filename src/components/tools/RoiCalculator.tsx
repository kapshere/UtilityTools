
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, Calculator } from 'lucide-react';

const RoiCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [finalValue, setFinalValue] = useState<number>(0);
  const [additionalCosts, setAdditionalCosts] = useState<number>(0);
  const [timeFrame, setTimeFrame] = useState<number>(1);

  const totalCost = initialInvestment + additionalCosts;
  const netProfit = finalValue - totalCost;
  const roiPercentage = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
  const annualizedROI = timeFrame > 0 ? (Math.pow(finalValue / totalCost, 1 / timeFrame) - 1) * 100 : 0;

  const getROIAnalysis = () => {
    if (roiPercentage > 20) return { color: 'text-green-600', label: 'Excellent' };
    if (roiPercentage > 10) return { color: 'text-blue-600', label: 'Good' };
    if (roiPercentage > 0) return { color: 'text-yellow-600', label: 'Positive' };
    return { color: 'text-red-600', label: 'Negative' };
  };

  const analysis = getROIAnalysis();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">ROI Calculator</h2>
        <p className="text-muted-foreground">Calculate return on investment for business decisions</p>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="initial-investment">Initial Investment ($)</Label>
            <Input
              id="initial-investment"
              type="number"
              value={initialInvestment || ''}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="final-value">Final Value ($)</Label>
            <Input
              id="final-value"
              type="number"
              value={finalValue || ''}
              onChange={(e) => setFinalValue(Number(e.target.value))}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="additional-costs">Additional Costs ($)</Label>
            <Input
              id="additional-costs"
              type="number"
              value={additionalCosts || ''}
              onChange={(e) => setAdditionalCosts(Number(e.target.value))}
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="time-frame">Time Frame (Years)</Label>
            <Input
              id="time-frame"
              type="number"
              value={timeFrame || ''}
              onChange={(e) => setTimeFrame(Number(e.target.value))}
              placeholder="1"
              step="0.1"
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Investment Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Investment:</span>
              <span className="font-semibold">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Net Profit:</span>
              <span className={`font-semibold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${netProfit.toFixed(2)}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            ROI Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>ROI Percentage:</span>
              <span className={`font-semibold ${analysis.color}`}>
                {roiPercentage.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Annualized ROI:</span>
              <span className="font-semibold">
                {annualizedROI.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Performance:</span>
              <span className={`font-semibold ${analysis.color}`}>
                {analysis.label}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">ROI Interpretation</h3>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium mb-2">ROI Benchmarks:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Stock Market Average: 7-10%</li>
                <li>• Real Estate: 8-12%</li>
                <li>• Small Business: 15-30%</li>
                <li>• Startup Investments: 25%+</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Formula:</p>
              <p className="text-muted-foreground">
                ROI = (Final Value - Total Investment) / Total Investment × 100
              </p>
              <p className="text-muted-foreground mt-2">
                Annualized ROI accounts for the time factor in your investment
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RoiCalculator;
