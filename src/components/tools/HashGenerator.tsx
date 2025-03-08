
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, FileText, Upload, Shield, RefreshCw, Lock, File } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';

type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

const HashGenerator: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [hashResult, setHashResult] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('text');
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHashing, setIsHashing] = useState<boolean>(false);
  const { toast } = useToast();

  const hashText = async () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter text to hash",
        variant: "destructive"
      });
      return;
    }
    
    setIsHashing(true);
    
    try {
      // Convert text to an ArrayBuffer
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      // Hash the data using the Web Crypto API
      const hashBuffer = await generateHash(data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setHashResult(hashHex);
      
      toast({
        title: "Success",
        description: `${algorithm} hash generated successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hash",
        variant: "destructive"
      });
    } finally {
      setIsHashing(false);
    }
  };

  const hashFile = async (file: File) => {
    setIsHashing(true);
    
    try {
      // Read the file as an ArrayBuffer
      const fileBuffer = await file.arrayBuffer();
      
      // Hash the file data
      const hashBuffer = await generateHash(fileBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setHashResult(hashHex);
      
      toast({
        title: "Success",
        description: `${algorithm} hash generated for ${file.name}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate file hash",
        variant: "destructive"
      });
    } finally {
      setIsHashing(false);
    }
  };

  const generateHash = async (data: ArrayBuffer): Promise<ArrayBuffer> => {
    let hashAlgo = '';
    
    switch (algorithm) {
      case 'MD5':
        // Web Crypto API doesn't support MD5, would need a separate library
        throw new Error("MD5 is not supported in this browser");
      case 'SHA-1':
        hashAlgo = 'SHA-1';
        break;
      case 'SHA-256':
        hashAlgo = 'SHA-256';
        break;
      case 'SHA-384':
        hashAlgo = 'SHA-384';
        break;
      case 'SHA-512':
        hashAlgo = 'SHA-512';
        break;
      default:
        hashAlgo = 'SHA-256';
    }
    
    return await crypto.subtle.digest(hashAlgo, data);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    hashFile(file);
  };

  const handleClear = () => {
    setText('');
    setHashResult('');
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = () => {
    if (!hashResult) return;
    
    navigator.clipboard.writeText(hashResult);
    toast({
      title: "Copied!",
      description: "Hash has been copied to clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Generate secure hash values for text or files using various hash algorithms.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="file">File</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="text-input">Enter Text</Label>
                <Textarea
                  id="text-input"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text to hash..."
                  className="min-h-[120px]"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="file" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Upload File</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-secondary/10 transition-colors" onClick={() => fileInputRef.current?.click()}>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                  <File className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">All file types supported</p>
                </div>
                
                {fileName && (
                  <div className="mt-2 text-sm bg-secondary/30 p-2 rounded">
                    <span className="font-medium">File:</span> {fileName}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="space-y-2">
            <Label htmlFor="algorithm">Hash Algorithm</Label>
            <Select 
              value={algorithm}
              onValueChange={(value) => setAlgorithm(value as HashAlgorithm)}
            >
              <SelectTrigger id="algorithm">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SHA-256">SHA-256 (Recommended)</SelectItem>
                <SelectItem value="SHA-512">SHA-512</SelectItem>
                <SelectItem value="SHA-384">SHA-384</SelectItem>
                <SelectItem value="SHA-1">SHA-1 (Not Recommended)</SelectItem>
                <SelectItem value="MD5" disabled>MD5 (Not Secure, Unavailable)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              onClick={activeTab === 'text' ? hashText : () => fileInputRef.current?.click()}
              disabled={isHashing || (activeTab === 'text' && !text)}
            >
              {isHashing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Hashing...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Generate Hash
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleClear}
              disabled={isHashing || (!text && !fileName)}
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          </div>
        </Card>
        
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-x-2 flex items-center">
              <h3 className="font-medium">Hash Result</h3>
              {algorithm && hashResult && (
                <div className="text-xs bg-secondary/50 px-2 py-0.5 rounded">
                  {algorithm}
                </div>
              )}
            </div>
            
            {hashResult && (
              <Button 
                size="sm" 
                variant="ghost"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            )}
          </div>
          
          {hashResult ? (
            <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto break-all">
              {hashResult}
            </div>
          ) : (
            <div className="border border-dashed rounded-md p-8 text-center">
              <Lock className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                {isHashing ? "Generating hash..." : "Hash result will appear here"}
              </p>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground space-y-2 bg-secondary/20 p-3 rounded-md">
            <p className="flex items-start gap-2">
              <Shield className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                <strong>SHA-256</strong> is the recommended algorithm for most purposes, 
                providing excellent security with good performance.
              </span>
            </p>
            <p>
              <strong>Note:</strong> Hashing is a one-way function. You cannot recover the 
              original data from a hash value.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HashGenerator;
