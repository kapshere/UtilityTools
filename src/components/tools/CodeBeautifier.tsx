
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CodeBeautifier: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const { toast } = useToast();

  const beautifyCode = () => {
    if (!inputCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to beautify",
        variant: "destructive",
      });
      return;
    }

    try {
      let formatted = '';
      
      switch (language) {
        case 'javascript':
        case 'json':
          formatted = beautifyJavaScript(inputCode);
          break;
        case 'css':
          formatted = beautifyCSS(inputCode);
          break;
        case 'html':
          formatted = beautifyHTML(inputCode);
          break;
        default:
          formatted = inputCode;
      }
      
      setOutputCode(formatted);
      toast({
        title: "Success",
        description: "Code beautified successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to beautify code",
        variant: "destructive",
      });
    }
  };

  const beautifyJavaScript = (code: string): string => {
    // Simple JavaScript/JSON beautifier
    let result = '';
    let indent = 0;
    const indentStr = '  ';
    let inString = false;
    let stringChar = '';
    
    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const nextChar = code[i + 1];
      
      if (!inString && (char === '"' || char === "'")) {
        inString = true;
        stringChar = char;
        result += char;
      } else if (inString && char === stringChar && code[i - 1] !== '\\') {
        inString = false;
        result += char;
      } else if (!inString) {
        if (char === '{' || char === '[') {
          result += char + '\n';
          indent++;
          result += indentStr.repeat(indent);
        } else if (char === '}' || char === ']') {
          result = result.trimEnd();
          result += '\n';
          indent--;
          result += indentStr.repeat(indent) + char;
          if (nextChar && nextChar !== ',' && nextChar !== '}' && nextChar !== ']') {
            result += '\n' + indentStr.repeat(indent);
          }
        } else if (char === ',') {
          result += char + '\n' + indentStr.repeat(indent);
        } else if (char === ';') {
          result += char + '\n' + indentStr.repeat(indent);
        } else {
          result += char;
        }
      } else {
        result += char;
      }
    }
    
    return result.trim();
  };

  const beautifyCSS = (code: string): string => {
    return code
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n\n')
      .replace(/,\s*/g, ',\n')
      .trim();
  };

  const beautifyHTML = (code: string): string => {
    let result = '';
    let indent = 0;
    const indentStr = '  ';
    const tokens = code.match(/<\/?[^>]+>|[^<]+/g) || [];
    
    tokens.forEach(token => {
      if (token.startsWith('</')) {
        indent--;
        result += indentStr.repeat(indent) + token + '\n';
      } else if (token.startsWith('<') && !token.endsWith('/>')) {
        result += indentStr.repeat(indent) + token + '\n';
        if (!token.match(/<(br|hr|img|input|meta|link)/i)) {
          indent++;
        }
      } else if (token.trim()) {
        result += indentStr.repeat(indent) + token.trim() + '\n';
      }
    });
    
    return result.trim();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode);
    toast({
      title: "Copied!",
      description: "Beautified code copied to clipboard",
    });
  };

  const downloadCode = () => {
    const fileExtensions = {
      javascript: 'js',
      json: 'json',
      css: 'css',
      html: 'html'
    };
    
    const blob = new Blob([outputCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beautified.${fileExtensions[language as keyof typeof fileExtensions]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Code Beautifier</h2>
        <p className="text-muted-foreground">Format and beautify your code</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="language">Programming Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="input-code">Input Code</Label>
            <Textarea
              id="input-code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Paste your code here..."
              className="min-h-[200px] font-mono"
            />
          </div>

          <Button onClick={beautifyCode} className="w-full">
            <Code className="h-4 w-4 mr-2" />
            Beautify Code
          </Button>

          {outputCode && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="output-code">Beautified Code</Label>
                <div className="space-x-2">
                  <Button onClick={copyToClipboard} size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={downloadCode} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea
                id="output-code"
                value={outputCode}
                readOnly
                className="min-h-[200px] font-mono"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CodeBeautifier;
