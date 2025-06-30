
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JsonToYaml: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [yamlOutput, setYamlOutput] = useState<string>('');
  const { toast } = useToast();

  // Simple JSON to YAML converter
  const jsonToYaml = (obj: any, indent: number = 0): string => {
    const spaces = '  '.repeat(indent);
    let yaml = '';

    if (Array.isArray(obj)) {
      for (const item of obj) {
        yaml += `${spaces}- `;
        if (typeof item === 'object' && item !== null) {
          yaml += '\n' + jsonToYaml(item, indent + 1);
        } else {
          yaml += formatValue(item) + '\n';
        }
      }
    } else if (typeof obj === 'object' && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        yaml += `${spaces}${key}:`;
        if (Array.isArray(value)) {
          yaml += '\n' + jsonToYaml(value, indent + 1);
        } else if (typeof value === 'object' && value !== null) {
          yaml += '\n' + jsonToYaml(value, indent + 1);
        } else {
          yaml += ' ' + formatValue(value) + '\n';
        }
      }
    }

    return yaml;
  };

  const formatValue = (value: any): string => {
    if (value === null) return 'null';
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'string') {
      // Quote strings that contain special characters or are special values
      if (value.includes(':') || value.includes('#') || value.includes('\n') || 
          value === 'true' || value === 'false' || value === 'null' || 
          !isNaN(Number(value))) {
        return `"${value.replace(/"/g, '\\"')}"`;
      }
      return value;
    }
    return String(value);
  };

  const convertJsonToYaml = () => {
    try {
      if (!jsonInput.trim()) {
        toast({
          title: "Error",
          description: "Please enter JSON data",
          variant: "destructive",
        });
        return;
      }

      const jsonData = JSON.parse(jsonInput);
      const yaml = jsonToYaml(jsonData);
      setYamlOutput(yaml);

      toast({
        title: "Success",
        description: "JSON converted to YAML successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(yamlOutput);
    toast({
      title: "Success",
      description: "YAML copied to clipboard",
    });
  };

  const downloadYaml = () => {
    const element = document.createElement('a');
    const file = new Blob([yamlOutput], { type: 'text/yaml' });
    element.href = URL.createObjectURL(file);
    element.download = 'converted_data.yaml';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const loadSampleData = () => {
    const sampleJson = `{
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "skills": [
    "JavaScript",
    "React",
    "Node.js"
  ],
  "active": true,
  "salary": 75000
}`;
    setJsonInput(sampleJson);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">JSON to YAML Converter</h2>
        <p className="text-muted-foreground">Convert JSON format to YAML</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="json-input">JSON Input</Label>
              <Button onClick={loadSampleData} size="sm" variant="outline">
                Load Sample
              </Button>
            </div>
            <Textarea
              id="json-input"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Enter JSON data here..."
              className="min-h-80 font-mono text-sm"
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="yaml-output">YAML Output</Label>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} size="sm" variant="outline" disabled={!yamlOutput}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={downloadYaml} size="sm" variant="outline" disabled={!yamlOutput}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              id="yaml-output"
              value={yamlOutput}
              readOnly
              placeholder="YAML output will appear here..."
              className="min-h-80 font-mono text-sm"
            />
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={convertJsonToYaml} className="w-full max-w-md">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Convert to YAML
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">How to Use</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>1. Paste your JSON data in the input field</p>
          <p>2. Click "Convert to YAML" to transform the data</p>
          <p>3. Copy the result or download as a YAML file</p>
          <p className="mt-4"><strong>Note:</strong> The converter handles basic JSON structures. Complex nested objects are supported.</p>
        </div>
      </Card>
    </div>
  );
};

export default JsonToYaml;
