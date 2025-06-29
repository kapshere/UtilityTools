
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Common currencies
  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'KRW', name: 'South Korean Won' },
  ];

  // Mock exchange rates (in a real app, you'd fetch from an API)
  const mockRates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, INR: 74.5, KRW: 1180 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.59, INR: 87.8, KRW: 1390 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 150, CAD: 1.71, AUD: 1.85, CHF: 1.26, CNY: 8.84, INR: 102, KRW: 1615 },
    JPY: { USD: 0.0091, EUR: 0.0078, GBP: 0.0067, CAD: 0.011, AUD: 0.012, CHF: 0.0084, CNY: 0.059, INR: 0.68, KRW: 10.7 },
  };

  const convertCurrency = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const rate = mockRates[fromCurrency]?.[toCurrency] || 1;
      const convertedAmount = parseFloat(amount) * rate;
      
      setResult(convertedAmount);
      setExchangeRate(rate);
      setIsLoading(false);
      
      toast({
        title: "Conversion Complete",
        description: `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
      });
    }, 500);
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setResult(null);
    setExchangeRate(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Currency Converter</h2>
        <p className="text-muted-foreground">Convert between different currencies</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <Label>From Currency</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={swapCurrencies}
                className="mb-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <Label>To Currency</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={convertCurrency} 
            className="w-full"
            disabled={isLoading || !amount}
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Convert
          </Button>

          {result !== null && exchangeRate && (
            <Card className="p-4 bg-muted/50">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {result.toFixed(2)} {toCurrency}
                </div>
                <div className="text-sm text-muted-foreground">
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </div>
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CurrencyConverter;
