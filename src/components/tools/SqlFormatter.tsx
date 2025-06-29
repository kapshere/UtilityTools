
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SqlFormatter: React.FC = () => {
  const [inputSql, setInputSql] = useState('');
  const [outputSql, setOutputSql] = useState('');
  const [formatStyle, setFormatStyle] = useState('standard');
  const { toast } = useToast();

  const formatSQL = () => {
    if (!inputSql.trim()) {
      toast({
        title: "Error",
        description: "Please enter some SQL to format",
        variant: "destructive",
      });
      return;
    }

    try {
      let formatted = '';
      
      switch (formatStyle) {
        case 'standard':
          formatted = formatStandardSQL(inputSql);
          break;
        case 'compact':
          formatted = formatCompactSQL(inputSql);
          break;
        case 'expanded':
          formatted = formatExpandedSQL(inputSql);
          break;
        default:
          formatted = inputSql;
      }
      
      setOutputSql(formatted);
      toast({
        title: "Success",
        description: "SQL formatted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to format SQL",
        variant: "destructive",
      });
    }
  };

  const formatStandardSQL = (sql: string): string => {
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
      'GROUP BY', 'ORDER BY', 'HAVING', 'INSERT', 'UPDATE', 'DELETE', 'CREATE',
      'ALTER', 'DROP', 'AND', 'OR', 'UNION', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
    ];

    let formatted = sql
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase();

    // Add line breaks before major keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${keyword}`);
    });

    // Format SELECT statements
    formatted = formatted
      .replace(/SELECT\s+/gi, 'SELECT\n    ')
      .replace(/,\s*/g, ',\n    ')
      .replace(/\n    FROM/gi, '\nFROM')
      .replace(/\n    WHERE/gi, '\nWHERE')
      .replace(/\n    GROUP BY/gi, '\nGROUP BY')
      .replace(/\n    ORDER BY/gi, '\nORDER BY')
      .replace(/\n    HAVING/gi, '\nHAVING');

    // Clean up extra newlines and spaces
    formatted = formatted
      .replace(/\n\s*\n/g, '\n')
      .replace(/^\n+/, '')
      .trim();

    return formatted;
  };

  const formatCompactSQL = (sql: string): string => {
    return sql
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase();
  };

  const formatExpandedSQL = (sql: string): string => {
    let formatted = formatStandardSQL(sql);
    
    // Add more spacing for expanded format
    formatted = formatted
      .replace(/\(/g, '(\n        ')
      .replace(/\)/g, '\n    )')
      .replace(/,/g, ',\n        ')
      .replace(/\n\s*\n/g, '\n');

    return formatted;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputSql);
    toast({
      title: "Copied!",
      description: "Formatted SQL copied to clipboard",
    });
  };

  const downloadSQL = () => {
    const blob = new Blob([outputSql], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">SQL Formatter</h2>
        <p className="text-muted-foreground">Format and beautify SQL queries</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="format-style">Formatting Style</Label>
            <Select value={formatStyle} onValueChange={setFormatStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="expanded">Expanded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="input-sql">Input SQL</Label>
            <Textarea
              id="input-sql"
              value={inputSql}
              onChange={(e) => setInputSql(e.target.value)}
              placeholder="Paste your SQL query here..."
              className="min-h-[200px] font-mono"
            />
          </div>

          <Button onClick={formatSQL} className="w-full">
            <Code className="h-4 w-4 mr-2" />
            Format SQL
          </Button>

          {outputSql && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="output-sql">Formatted SQL</Label>
                <div className="space-x-2">
                  <Button onClick={copyToClipboard} size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={downloadSQL} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea
                id="output-sql"
                value={outputSql}
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

export default SqlFormatter;
