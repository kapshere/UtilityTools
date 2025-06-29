
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BinaryConverter: React.FC = () => {
  const [binaryValue, setBinaryValue] = useState('');
  const [decimalValue, setDecimalValue] = useState('');
  const [hexValue, setHexValue] = useState('');
  const { toast } = useToast();

  const convertFromBinary = (binary: string) => {
    try {
      if (!/^[01]*$/.test(binary) || !binary) {
        setDecimalValue('');
        setHexValue('');
        return;
      }
      const decimal = parseInt(binary, 2);
      setDecimalValue(decimal.toString());
      setHexValue(decimal.toString(16).toUpperCase());
    } catch (error) {
      setDecimalValue('');
      setHexValue('');
    }
  };

  const convertFromDecimal = (decimal: string) => {
    try {
      if (!/^\d+$/.test(decimal) || !decimal) {
        setBinaryValue('');
        setHexValue('');
        return;
      }
      const num = parseInt(decimal, 10);
      setBinaryValue(num.toString(2));
      setHexValue(num.toString(16).toUpperCase());
    } catch (error) {
      setBinaryValue('');
      setHexValue('');
    }
  };

  const convertFromHex = (hex: string) => {
    try {
      if (!/^[0-9A-Fa-f]*$/.test(hex) || !hex) {
        setBinaryValue('');
        setDecimalValue('');
        return;
      }
      const decimal = parseInt(hex, 16);
      setBinaryValue(decimal.toString(2));
      setDecimalValue(decimal.toString());
    } catch (error) {
      setBinaryValue('');
      setDecimalValue('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Value copied to clipboard",
    });
  };

  const clearAll = () => {
    setBinaryValue('');
    setDecimalValue('');
    setHexValue('');
    toast({
      title: "Cleared",
      description: "All values have been cleared",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Binary Converter</h2>
        <p className="text-muted-foreground">Convert between binary, decimal, and hexadecimal</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Binary Input */}
          <div className="space-y-2">
            <Label htmlFor="binary">Binary (Base 2)</Label>
            <div className="flex gap-2">
              <Input
                id="binary"
                placeholder="Enter binary number (e.g., 1010)"
                value={binaryValue}
                onChange={(e) => {
                  setBinaryValue(e.target.value);
                  convertFromBinary(e.target.value);
                }}
                className="font-mono"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(binaryValue)}
                disabled={!binaryValue}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Decimal Input */}
          <div className="space-y-2">
            <Label htmlFor="decimal">Decimal (Base 10)</Label>
            <div className="flex gap-2">
              <Input
                id="decimal"
                placeholder="Enter decimal number (e.g., 10)"
                value={decimalValue}
                onChange={(e) => {
                  setDecimalValue(e.target.value);
                  convertFromDecimal(e.target.value);
                }}
                className="font-mono"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(decimalValue)}
                disabled={!decimalValue}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Hexadecimal Input */}
          <div className="space-y-2">
            <Label htmlFor="hex">Hexadecimal (Base 16)</Label>
            <div className="flex gap-2">
              <Input
                id="hex"
                placeholder="Enter hex number (e.g., A)"
                value={hexValue}
                onChange={(e) => {
                  setHexValue(e.target.value);
                  convertFromHex(e.target.value);
                }}
                className="font-mono"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(hexValue)}
                disabled={!hexValue}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={clearAll}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950/20">
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <p className="font-medium mb-2">Quick Reference:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Binary:</strong> Uses only 0 and 1 (e.g., 1010 = 10)</li>
            <li><strong>Decimal:</strong> Standard base-10 numbers (e.g., 10)</li>
            <li><strong>Hexadecimal:</strong> Uses 0-9 and A-F (e.g., A = 10)</li>
            <li>Enter a value in any field to see conversions in the others</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default BinaryConverter;
