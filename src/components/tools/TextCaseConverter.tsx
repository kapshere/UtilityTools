
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const TextCaseConverter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Text has been copied to clipboard.',
    });
  };

  const handleReset = () => {
    setInputText('');
  };

  const toUpperCase = (text: string) => text.toUpperCase();
  const toLowerCase = (text: string) => text.toLowerCase();
  const toTitleCase = (text: string) => {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const toSentenceCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, match => match.toUpperCase());
  };
  const toAlternatingCase = (text: string) => {
    return text
      .split('')
      .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
      .join('');
  };
  const toKebabCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  };
  const toSnakeCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^\w_]/g, '');
  };
  const toCamelCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
  };
  const toPascalCase = (text: string) => {
    const camelCase = toCamelCase(text);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };
  const toInverseCase = (text: string) => {
    return text
      .split('')
      .map(char => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase();
        }
        return char.toUpperCase();
      })
      .join('');
  };

  const caseConverters = [
    { name: 'UPPERCASE', converter: toUpperCase },
    { name: 'lowercase', converter: toLowerCase },
    { name: 'Title Case', converter: toTitleCase },
    { name: 'Sentence case', converter: toSentenceCase },
    { name: 'aLtErNaTiNg CaSe', converter: toAlternatingCase },
    { name: 'kebab-case', converter: toKebabCase },
    { name: 'snake_case', converter: toSnakeCase },
    { name: 'camelCase', converter: toCamelCase },
    { name: 'PascalCase', converter: toPascalCase },
    { name: 'InVeRsE cAsE', converter: toInverseCase }
  ];

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Convert your text between different case styles. Enter text below and click on the desired case format.
      </p>

      <Card className="p-6">
        <div className="mb-4">
          <Textarea
            placeholder="Enter your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
        
        <div className="flex justify-end gap-2 mb-6">
          <Button variant="outline" onClick={handleReset} disabled={!inputText}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
        
        <h3 className="text-lg font-medium mb-4">Convert to:</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {caseConverters.map((caseConverter, index) => (
            <Card 
              key={index} 
              className={cn(
                "p-4 cursor-pointer hover:shadow-md transition-all",
                !inputText && "opacity-50 pointer-events-none"
              )}
            >
              <div className="flex flex-col h-full">
                <h4 className="font-medium mb-2">{caseConverter.name}</h4>
                <div className="bg-muted rounded-md p-2 text-sm mb-2 overflow-hidden flex-grow">
                  <div className="line-clamp-3">
                    {inputText ? caseConverter.converter(inputText) : 'Result will appear here...'}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-auto" 
                  onClick={() => handleCopy(caseConverter.converter(inputText))}
                  disabled={!inputText}
                >
                  <Copy className="h-3 w-3 mr-2" />
                  Copy
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TextCaseConverter;
