
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Minimize, Copy, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JavaScriptMinifier: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [originalSize, setOriginalSize] = useState(0);
  const [minifiedSize, setMinifiedSize] = useState(0);
  const { toast } = useToast();

  const minifyJavaScript = () => {
    if (!inputCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter some JavaScript code to minify",
        variant: "destructive",
      });
      return;
    }

    try {
      const minified = performMinification(inputCode);
      setOutputCode(minified);
      setOriginalSize(new Blob([inputCode]).size);
      setMinifiedSize(new Blob([minified]).size);
      
      toast({
        title: "Success",
        description: "JavaScript minified successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to minify JavaScript",
        variant: "destructive",
      });
    }
  };

  const performMinification = (code: string): string => {
    // Simple JavaScript minification
    return code
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      // Remove whitespace around operators and punctuation
      .replace(/\s*([{}();,:])\s*/g, '$1')
      .replace(/\s*([=+\-*/%&|!<>])\s*/g, '$1')
      // Remove trailing whitespace
      .trim();
  };

  const calculateSavings = () => {
    if (originalSize === 0) return 0;
    return Math.round(((originalSize - minifiedSize) / originalSize) * 100);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode);
    toast({
      title: "Copied!",
      description: "Minified code copied to clipboard",
    });
  };

  const downloadCode = () => {
    const blob = new Blob([outputCode], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">JavaScript Minifier</h2>
        <p className="text-muted-foreground">Minify JavaScript code to reduce file size</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="input-code">JavaScript Code</Label>
            <Textarea
              id="input-code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Paste your JavaScript code here..."
              className="min-h-[200px] font-mono"
            />
          </div>

          <Button onClick={minifyJavaScript} className="w-full">
            <Minimize className="h-4 w-4 mr-2" />
            Minify JavaScript
          </Button>

          {outputCode && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Original Size</p>
                      <p className="text-lg font-bold">{originalSize} bytes</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Minimize className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Minified Size</p>
                      <p className="text-lg font-bold">{minifiedSize} bytes</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {calculateSavings()}% saved
                    </Badge>
                  </div>
                </Card>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="output-code">Minified Code</Label>
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
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
            </>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Minification Benefits</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Reduces file size for faster loading</li>
          <li>• Removes unnecessary whitespace and comments</li>
          <li>• Decreases bandwidth usage</li>
          <li>• Improves website performance</li>
          <li>• Note: This is a basic minifier. For production, use tools like UglifyJS or Terser</li>
        </ul>
      </Card>
    </div>
  );
};

export default JavaScriptMinifier;
