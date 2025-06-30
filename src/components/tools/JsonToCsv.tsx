
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JsonToCsv: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [csvOutput, setCsvOutput] = useState<string>('');
  const { toast } = useToast();

  const convertJsonToCsv = () => {
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
      
      if (!Array.isArray(jsonData)) {
        toast({
          title: "Error",
          description: "JSON must be an array of objects",
          variant: "destructive",
        });
        return;
      }

      if (jsonData.length === 0) {
        setCsvOutput('');
        return;
      }

      // Get all unique keys from all objects
      const allKeys = new Set<string>();
      jsonData.forEach(obj => {
        if (typeof obj === 'object' && obj !== null) {
          Object.keys(obj).forEach(key => allKeys.add(key));
        }
      });

      const headers = Array.from(allKeys);
      
      // Create CSV header
      const csvHeader = headers.map(header => `"${header}"`).join(',');
      
      // Create CSV rows
      const csvRows = jsonData.map(obj => {
        return headers.map(header => {
          const value = obj && typeof obj === 'object' ? obj[header] : '';
          const stringValue = value !== null && value !== undefined ? String(value) : '';
          return `"${stringValue.replace(/"/g, '""')}"`;
        }).join(',');
      });

      const csv = [csvHeader, ...csvRows].join('\n');
      setCsvOutput(csv);

      toast({
        title: "Success",
        description: "JSON converted to CSV successfully",
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
    navigator.clipboard.writeText(csvOutput);
    toast({
      title: "Success",
      description: "CSV copied to clipboard",
    });
  };

  const downloadCsv = () => {
    const element = document.createElement('a');
    const file = new Blob([csvOutput], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = 'converted_data.csv';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const loadSampleData = () => {
    const sampleJson = `[
  {
    "name": "John Doe",
    "age": 30,
    "city": "New York",
    "email": "john@example.com"
  },
  {
    "name": "Jane Smith",
    "age": 25,
    "city": "Los Angeles",
    "email": "jane@example.com"
  },
  {
    "name": "Bob Johnson",
    "age": 35,
    "city": "Chicago",
    "email": "bob@example.com"
  }
]`;
    setJsonInput(sampleJson);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">JSON to CSV Converter</h2>
        <p className="text-muted-foreground">Convert JSON arrays to CSV format</p>
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
              placeholder="Enter JSON array here..."
              className="min-h-80 font-mono text-sm"
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="csv-output">CSV Output</Label>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} size="sm" variant="outline" disabled={!csvOutput}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={downloadCsv} size="sm" variant="outline" disabled={!csvOutput}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              id="csv-output"
              value={csvOutput}
              readOnly
              placeholder="CSV output will appear here..."
              className="min-h-80 font-mono text-sm"
            />
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={convertJsonToCsv} className="w-full max-w-md">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Convert to CSV
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">How to Use</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>1. Paste your JSON array in the input field</p>
          <p>2. Click "Convert to CSV" to transform the data</p>
          <p>3. Copy the result or download as a CSV file</p>
          <p className="mt-4"><strong>Note:</strong> The JSON must be an array of objects with similar structure.</p>
        </div>
      </Card>
    </div>
  );
};

export default JsonToCsv;
