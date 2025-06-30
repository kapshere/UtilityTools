
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RefreshCcw, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CsvToJson: React.FC = () => {
  const [csvInput, setCsvInput] = useState<string>('');
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const { toast } = useToast();

  const convertCsvToJson = () => {
    try {
      if (!csvInput.trim()) {
        toast({
          title: "Error",
          description: "Please enter CSV data",
          variant: "destructive",
        });
        return;
      }

      const lines = csvInput.trim().split('\n');
      if (lines.length < 2) {
        toast({
          title: "Error",
          description: "CSV must have at least a header row and one data row",
          variant: "destructive",
        });
        return;
      }

      // Parse CSV header
      const headers = parseCsvLine(lines[0]);
      
      // Parse CSV data
      const jsonData = [];
      for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i]);
        if (values.length === headers.length) {
          const obj: Record<string, string> = {};
          headers.forEach((header, index) => {
            obj[header] = values[index];
          });
          jsonData.push(obj);
        }
      }

      const json = JSON.stringify(jsonData, null, 2);
      setJsonOutput(json);

      toast({
        title: "Success",
        description: "CSV converted to JSON successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid CSV format",
        variant: "destructive",
      });
    }
  };

  const parseCsvLine = (line: string): string[] => {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    values.push(current.trim());
    return values;
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
    const sampleCsv = `name,age,city,email
"John Doe",30,"New York","john@example.com"
"Jane Smith",25,"Los Angeles","jane@example.com"
"Bob Johnson",35,"Chicago","bob@example.com"`;
    setCsvInput(sampleCsv);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">CSV to JSON Converter</h2>
        <p className="text-muted-foreground">Convert CSV data to JSON format</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="csv-input">CSV Input</Label>
              <Button onClick={loadSampleData} size="sm" variant="outline">
                Load Sample
              </Button>
            </div>
            <Textarea
              id="csv-input"
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="Enter CSV data here..."
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
        <Button onClick={convertCsvToJson} className="w-full max-w-md">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Convert to JSON
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">How to Use</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>1. Paste your CSV data in the input field</p>
          <p>2. Make sure the first row contains column headers</p>
          <p>3. Click "Convert to JSON" to transform the data</p>
          <p>4. Copy the result or download as a JSON file</p>
          <p className="mt-4"><strong>Note:</strong> CSV should have proper formatting with commas as separators and quotes around text containing commas.</p>
        </div>
      </Card>
    </div>
  );
};

export default CsvToJson;
