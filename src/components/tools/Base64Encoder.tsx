
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, FileUp, FileDown, RefreshCw } from 'lucide-react';

const Base64Encoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text. Make sure you're using valid characters.",
        variant: "destructive",
      });
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decode Base64. Make sure your input is valid Base64.",
        variant: "destructive",
      });
    }
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Base64 Encoder/Decoder</h2>
      <p className="text-muted-foreground">
        Convert text to Base64 format or decode Base64 back to plain text.
      </p>

      <Card className="p-6">
        <Tabs defaultValue="encode" className="w-full" onValueChange={(value) => setMode(value as 'encode' | 'decode')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
              </label>
              <Textarea
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="font-mono min-h-[100px]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => copyToClipboard(input)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Input
              </Button>
              <Button onClick={handleProcess}>
                {mode === 'encode' ? (
                  <FileUp className="mr-2 h-4 w-4" />
                ) : (
                  <FileDown className="mr-2 h-4 w-4" />
                )}
                {mode === 'encode' ? 'Encode' : 'Decode'}
              </Button>
            </div>

            {output && (
              <div className="mt-6">
                <label className="text-sm font-medium mb-2 block">Result:</label>
                <div className="relative">
                  <Textarea
                    value={output}
                    readOnly
                    className="font-mono min-h-[100px] bg-muted"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(output)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </Card>
    </div>
  );
};

export default Base64Encoder;
