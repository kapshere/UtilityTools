
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Copy, Hash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const UuidGenerator: React.FC = () => {
  const [singleUuid, setSingleUuid] = useState('');
  const [bulkCount, setBulkCount] = useState('5');
  const [bulkUuids, setBulkUuids] = useState('');
  const { toast } = useToast();

  const generateUuid = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateSingleUuid = () => {
    const uuid = generateUuid();
    setSingleUuid(uuid);
  };

  const generateBulkUuids = () => {
    const count = parseInt(bulkCount);
    if (count < 1 || count > 100) {
      toast({
        title: "Invalid Count",
        description: "Please enter a number between 1 and 100",
        variant: "destructive"
      });
      return;
    }

    const uuids = [];
    for (let i = 0; i < count; i++) {
      uuids.push(generateUuid());
    }
    setBulkUuids(uuids.join('\n'));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "UUID(s) copied to clipboard"
    });
  };

  const clearAll = () => {
    setSingleUuid('');
    setBulkUuids('');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">UUID Generator</h2>
        <p className="text-muted-foreground">Generate universally unique identifiers (UUIDs/GUIDs)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Single UUID Generator */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Hash className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Single UUID</h3>
              <Badge variant="secondary">v4</Badge>
            </div>
            
            <Button onClick={generateSingleUuid} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate UUID
            </Button>

            {singleUuid && (
              <div className="space-y-2">
                <Label>Generated UUID:</Label>
                <div className="flex space-x-2">
                  <Input
                    value={singleUuid}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(singleUuid)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Bulk UUID Generator */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Hash className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Bulk Generator</h3>
              <Badge variant="secondary">v4</Badge>
            </div>

            <div>
              <Label htmlFor="count">Number of UUIDs (1-100)</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="100"
                value={bulkCount}
                onChange={(e) => setBulkCount(e.target.value)}
              />
            </div>
            
            <Button onClick={generateBulkUuids} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate {bulkCount} UUIDs
            </Button>

            {bulkUuids && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Generated UUIDs:</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(bulkUuids)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                </div>
                <Textarea
                  value={bulkUuids}
                  readOnly
                  className="font-mono text-sm"
                  rows={8}
                />
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Info and Actions */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">About UUIDs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <strong>Version 4 (Random):</strong> Generated using random or pseudo-random numbers
            </div>
            <div>
              <strong>Format:</strong> 8-4-4-4-12 hexadecimal digits
            </div>
            <div>
              <strong>Use Cases:</strong> Database keys, session IDs, file names
            </div>
            <div>
              <strong>Uniqueness:</strong> Extremely low probability of collision
            </div>
          </div>
          
          {(singleUuid || bulkUuids) && (
            <div className="pt-4 border-t">
              <Button variant="outline" onClick={clearAll}>
                Clear All Results
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UuidGenerator;
