
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Shuffle, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const RandomGenerator: React.FC = () => {
  const [numberMin, setNumberMin] = useState('1');
  const [numberMax, setNumberMax] = useState('100');
  const [numberResult, setNumberResult] = useState<number | null>(null);
  
  const [stringLength, setStringLength] = useState('10');
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [stringResult, setStringResult] = useState('');
  
  const [listItems, setListItems] = useState('Apple\nBanana\nCherry\nDate\nEggplant');
  const [listResult, setListResult] = useState('');

  const { toast } = useToast();

  const generateRandomNumber = () => {
    const min = parseInt(numberMin);
    const max = parseInt(numberMax);
    if (min > max) {
      toast({
        title: "Invalid Range",
        description: "Minimum value must be less than maximum value",
        variant: "destructive"
      });
      return;
    }
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumberResult(result);
  };

  const generateRandomString = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) {
      toast({
        title: "No Characters Selected",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }

    const length = parseInt(stringLength);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setStringResult(result);
  };

  const generateRandomListItem = () => {
    const items = listItems.split('\n').filter(item => item.trim() !== '');
    if (items.length === 0) {
      toast({
        title: "Empty List",
        description: "Please add some items to the list",
        variant: "destructive"
      });
      return;
    }
    const randomIndex = Math.floor(Math.random() * items.length);
    setListResult(items[randomIndex].trim());
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Random Generator</h2>
        <p className="text-muted-foreground">Generate random numbers, strings, and pick from lists</p>
      </div>

      <Tabs defaultValue="number" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="number">Numbers</TabsTrigger>
          <TabsTrigger value="string">Strings</TabsTrigger>
          <TabsTrigger value="list">List Picker</TabsTrigger>
        </TabsList>

        <TabsContent value="number">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min">Minimum</Label>
                  <Input
                    id="min"
                    type="number"
                    value={numberMin}
                    onChange={(e) => setNumberMin(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="max">Maximum</Label>
                  <Input
                    id="max"
                    type="number"
                    value={numberMax}
                    onChange={(e) => setNumberMax(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={generateRandomNumber} className="w-full">
                <Shuffle className="w-4 h-4 mr-2" />
                Generate Random Number
              </Button>

              {numberResult !== null && (
                <Card className="p-4 text-center bg-muted/50">
                  <div className="text-4xl font-bold mb-2">{numberResult}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(numberResult.toString())}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </Card>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="string">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="length">String Length</Label>
                <Input
                  id="length"
                  type="number"
                  min="1"
                  max="100"
                  value={stringLength}
                  onChange={(e) => setStringLength(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Character Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uppercase"
                      checked={includeUppercase}
                      onCheckedChange={setIncludeUppercase}
                    />
                    <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowercase"
                      checked={includeLowercase}
                      onCheckedChange={setIncludeLowercase}
                    />
                    <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="numbers"
                      checked={includeNumbers}
                      onCheckedChange={setIncludeNumbers}
                    />
                    <Label htmlFor="numbers">Numbers (0-9)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="symbols"
                      checked={includeSymbols}
                      onCheckedChange={setIncludeSymbols}
                    />
                    <Label htmlFor="symbols">Symbols (!@#$...)</Label>
                  </div>
                </div>
              </div>

              <Button onClick={generateRandomString} className="w-full">
                <Shuffle className="w-4 h-4 mr-2" />
                Generate Random String
              </Button>

              {stringResult && (
                <Card className="p-4 bg-muted/50">
                  <div className="font-mono text-lg mb-2 break-all">{stringResult}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(stringResult)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </Card>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="list">List Items (one per line)</Label>
                <Textarea
                  id="list"
                  value={listItems}
                  onChange={(e) => setListItems(e.target.value)}
                  placeholder="Enter items, one per line"
                  rows={8}
                />
              </div>

              <Button onClick={generateRandomListItem} className="w-full">
                <Shuffle className="w-4 h-4 mr-2" />
                Pick Random Item
              </Button>

              {listResult && (
                <Card className="p-4 text-center bg-muted/50">
                  <div className="text-2xl font-bold mb-2">{listResult}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(listResult)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </Card>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RandomGenerator;
