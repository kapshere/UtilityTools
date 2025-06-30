
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const YamlToJson: React.FC = () => {
  const [yamlInput, setYamlInput] = useState<string>('');
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const { toast } = useToast();

  // Simple YAML parser (basic implementation)
  const parseYaml = (yamlStr: string): any => {
    const lines = yamlStr.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
    const result: any = {};
    let currentPath: string[] = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      const indent = line.length - line.trimStart().length;
      const colonIndex = trimmed.indexOf(':');
      
      if (colonIndex === -1) continue;
      
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      
      // Adjust current path based on indentation
      const level = Math.floor(indent / 2);
      currentPath = currentPath.slice(0, level);
      currentPath.push(key);
      
      // Set value in result object
      let current = result;
      for (let i = 0; i < currentPath.length - 1; i++) {
        if (!current[currentPath[i]]) {
          current[currentPath[i]] = {};
        }
        current = current[currentPath[i]];
      }
      
      if (value) {
        // Parse value
        let parsedValue: any = value;
        if (value === 'true') parsedValue = true;
        else if (value === 'false') parsedValue = false;
        else if (value === 'null') parsedValue = null;
        else if (!isNaN(Number(value)) && value !== '') parsedValue = Number(value);
        else if (value.startsWith('"') && value.endsWith('"')) {
          parsedValue = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          parsedValue = value.slice(1, -1);
        }
        
        current[currentPath[currentPath.length - 1]] = parsedValue;
      } else {
        current[currentPath[currentPath.length - 1]] = {};
      }
    }
    
    return result;
  };

  const convertYamlToJson = () => {
    try {
      if (!yamlInput.trim()) {
        toast({
          title: "Error",
          description: "Please enter YAML data",
          variant: "destructive",
        });
        return;
      }

      const parsedYaml = parseYaml(yamlInput);
      const json = JSON.stringify(parsedYaml, null, 2);
      setJsonOutput(json);

      toast({
        title: "Success",
        description: "YAML converted to JSON successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid YAML format",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    toast({
      title: "Success",
      description: "JSON copied to clipboard",
    });
  };

  const downloadJson = () => {
    const element = document.createElement('a');
    const file = new Blob([jsonOutput], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'converted_data.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const loadSampleData = () => {
    const sampleYaml = `# Sample YAML Configuration
name: John Doe
age: 30
address:
  street: 123 Main St
  city: New York
  country: USA
skills:
  - JavaScript
  - React
  - Node.js
active: true
salary: 75000`;
    setYamlInput(sampleYaml);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">YAML to JSON Converter</h2>
        <p className="text-muted-foreground">Convert YAML format to JSON</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="yaml-input">YAML Input</Label>
              <Button onClick={loadSampleData} size="sm" variant="outline">
                Load Sample
              </Button>
            </div>
            <Textarea
              id="yaml-input"
              value={yamlInput}
              onChange={(e) => setYamlInput(e.target.value)}
              placeholder="Enter YAML data here..."
              className="min-h-80 font-mono text-sm"
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="json-output">JSON Output</Label>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} size="sm" variant="outline" disabled={!jsonOutput}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={downloadJson} size="sm" variant="outline" disabled={!jsonOutput}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              id="json-output"
              value={jsonOutput}
              readOnly
              placeholder="JSON output will appear here..."
              className="min-h-80 font-mono text-sm"
            />
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={convertYamlToJson} className="w-full max-w-md">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Convert to JSON
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">How to Use</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>1. Paste your YAML data in the input field</p>
          <p>2. Click "Convert to JSON" to transform the data</p>
          <p>3. Copy the result or download as a JSON file</p>
          <p className="mt-4"><strong>Note:</strong> This is a basic YAML parser. Complex YAML features may not be fully supported.</p>
        </div>
      </Card>
    </div>
  );
};

export default YamlToJson;
