
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, ArrowUpDown, Copy, Check, Download, Upload, FileUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const Base64Encoder: React.FC = () => {
  const { toast } = useToast();
  const [encodeInput, setEncodeInput] = useState<string>('Hello, World!');
  const [encodeOutput, setEncodeOutput] = useState<string>('');
  const [decodeInput, setDecodeInput] = useState<string>('');
  const [decodeOutput, setDecodeOutput] = useState<string>('');
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('encode');

  const encodeToBase64 = () => {
    try {
      let result = btoa(encodeInput);
      
      if (urlSafe) {
        // Make URL-safe by replacing + with - and / with _
        result = result.replace(/\+/g, '-').replace(/\//g, '_');
      }
      
      setEncodeOutput(result);
      
      toast({
        title: "Success",
        description: "Text encoded to Base64"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to encode text. Make sure it contains valid characters.",
        variant: "destructive"
      });
    }
  };

  const decodeFromBase64 = () => {
    try {
      let input = decodeInput;
      
      if (urlSafe) {
        // Reverse URL-safe encoding by replacing - with + and _ with /
        input = input.replace(/-/g, '+').replace(/_/g, '/');
      }
      
      const result = atob(input);
      setDecodeOutput(result);
      
      toast({
        title: "Success",
        description: "Base64 decoded to text"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to decode. Input may not be valid Base64.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    toast({
      title: "Copied",
      description: "Text copied to clipboard"
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = (text: string, filename: string) => {
    if (!text) return;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Downloaded",
      description: `File "${filename}" downloaded successfully`
    });
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>, target: 'encode' | 'decode') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (target === 'encode') {
        setEncodeInput(content);
      } else {
        setDecodeInput(content);
      }
    };
    reader.readAsText(file);
    
    // Reset the file input
    e.target.value = '';
    
    toast({
      title: "File Loaded",
      description: `File "${file.name}" loaded successfully`
    });
  };

  const handleFileToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const base64 = result.split(',')[1]; // Extract the Base64 part after "data:image/png;base64,"
      
      if (activeTab === 'encode') {
        setEncodeOutput(base64);
      } else {
        setDecodeInput(base64);
      }
      
      toast({
        title: "File Converted",
        description: `File "${file.name}" converted to Base64`
      });
    };
    reader.readAsDataURL(file);
    
    // Reset the file input
    e.target.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="encode" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="encode">Encode to Base64</TabsTrigger>
          <TabsTrigger value="decode">Decode from Base64</TabsTrigger>
        </TabsList>
        
        <TabsContent value="encode">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="encode-input">Text to Encode</Label>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('encode-file-upload')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Text
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('file-to-base64')?.click()}
                      >
                        <FileUp className="h-4 w-4 mr-1" />
                        Upload File to Base64
                      </Button>
                    </div>
                  </div>
                  <input 
                    id="encode-file-upload" 
                    type="file" 
                    className="hidden"
                    onChange={(e) => uploadFile(e, 'encode')}
                  />
                  <input 
                    id="file-to-base64" 
                    type="file" 
                    className="hidden"
                    onChange={handleFileToBase64}
                  />
                  <Textarea
                    id="encode-input"
                    placeholder="Enter text to encode..."
                    value={encodeInput}
                    onChange={(e) => setEncodeInput(e.target.value)}
                    rows={5}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="url-safe"
                    checked={urlSafe}
                    onCheckedChange={(checked) => setUrlSafe(checked as boolean)}
                  />
                  <Label 
                    htmlFor="url-safe" 
                    className="cursor-pointer"
                  >
                    URL-safe encoding (replace + with - and / with _)
                  </Label>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={encodeToBase64}
                  disabled={!encodeInput}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Encode to Base64
                </Button>
                
                {encodeOutput && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="encode-output">Base64 Result</Label>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(encodeOutput)}
                        >
                          {copied ? (
                            <Check className="h-4 w-4 mr-1" />
                          ) : (
                            <Copy className="h-4 w-4 mr-1" />
                          )}
                          Copy
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadText(encodeOutput, 'encoded.txt')}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      id="encode-output"
                      value={encodeOutput}
                      readOnly
                      rows={5}
                      className="font-mono bg-secondary/10"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="decode">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="decode-input">Base64 to Decode</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('decode-file-upload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Upload
                    </Button>
                  </div>
                  <input 
                    id="decode-file-upload" 
                    type="file" 
                    className="hidden"
                    onChange={(e) => uploadFile(e, 'decode')}
                  />
                  <Textarea
                    id="decode-input"
                    placeholder="Enter Base64 to decode..."
                    value={decodeInput}
                    onChange={(e) => setDecodeInput(e.target.value)}
                    rows={5}
                    className="font-mono"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="url-safe-decode"
                    checked={urlSafe}
                    onCheckedChange={(checked) => setUrlSafe(checked as boolean)}
                  />
                  <Label 
                    htmlFor="url-safe-decode" 
                    className="cursor-pointer"
                  >
                    URL-safe decoding (replace - with + and _ with /)
                  </Label>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={decodeFromBase64}
                  disabled={!decodeInput}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Decode from Base64
                </Button>
                
                {decodeOutput && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="decode-output">Decoded Result</Label>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(decodeOutput)}
                        >
                          {copied ? (
                            <Check className="h-4 w-4 mr-1" />
                          ) : (
                            <Copy className="h-4 w-4 mr-1" />
                          )}
                          Copy
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadText(decodeOutput, 'decoded.txt')}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      id="decode-output"
                      value={decodeOutput}
                      readOnly
                      rows={5}
                      className="bg-secondary/10"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Base64Encoder;
