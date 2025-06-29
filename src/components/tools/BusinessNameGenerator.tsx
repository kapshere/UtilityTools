
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shuffle, Copy, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BusinessNameGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [industry, setIndustry] = useState('');
  const [style, setStyle] = useState('');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const { toast } = useToast();

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Retail', 'Food & Beverage',
    'Consulting', 'Marketing', 'Real Estate', 'Education', 'Entertainment'
  ];

  const styles = [
    'Professional', 'Creative', 'Modern', 'Classic', 'Playful'
  ];

  const prefixes = ['Pro', 'Smart', 'Elite', 'Prime', 'Peak', 'Global', 'Digital', 'Rapid', 'Stellar', 'Quantum'];
  const suffixes = ['Solutions', 'Systems', 'Group', 'Labs', 'Works', 'Hub', 'Co', 'Inc', 'Partners', 'Ventures'];
  const descriptors = ['Innovative', 'Creative', 'Dynamic', 'Strategic', 'Advanced', 'Premier', 'Expert', 'Trusted'];

  const generateNames = () => {
    if (!keyword.trim()) {
      toast({
        title: "Error",
        description: "Please enter a keyword",
        variant: "destructive",
      });
      return;
    }

    const names: string[] = [];
    const baseKeyword = keyword.trim();

    // Generate different combinations
    for (let i = 0; i < 20; i++) {
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const randomDescriptor = descriptors[Math.floor(Math.random() * descriptors.length)];

      switch (i % 4) {
        case 0:
          names.push(`${baseKeyword} ${randomSuffix}`);
          break;
        case 1:
          names.push(`${randomPrefix} ${baseKeyword}`);
          break;
        case 2:
          names.push(`${randomDescriptor} ${baseKeyword}`);
          break;
        case 3:
          names.push(`${baseKeyword} ${randomPrefix}`);
          break;
      }
    }

    setGeneratedNames([...new Set(names)].slice(0, 12));
    toast({
      title: "Success",
      description: "Business names generated!",
    });
  };

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name);
    toast({
      title: "Copied!",
      description: "Business name copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Business Name Generator</h2>
        <p className="text-muted-foreground">Generate creative business name ideas</p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="keyword">Keyword *</Label>
            <Input
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter main keyword"
            />
          </div>
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((ind) => (
                  <SelectItem key={ind} value={ind}>
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="style">Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                {styles.map((st) => (
                  <SelectItem key={st} value={st}>
                    {st}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={generateNames} className="w-full mt-4">
          <Shuffle className="h-4 w-4 mr-2" />
          Generate Names
        </Button>
      </Card>

      {generatedNames.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            Generated Names
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {generatedNames.map((name, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted"
              >
                <span className="font-medium">{name}</span>
                <Button
                  onClick={() => copyName(name)}
                  size="sm"
                  variant="ghost"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Tips for Choosing a Business Name</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Keep it simple and easy to remember</li>
          <li>• Make sure it's easy to spell and pronounce</li>
          <li>• Check domain name availability</li>
          <li>• Ensure it reflects your brand identity</li>
          <li>• Avoid trademark conflicts</li>
          <li>• Consider how it sounds when spoken aloud</li>
        </ul>
      </Card>
    </div>
  );
};

export default BusinessNameGenerator;
