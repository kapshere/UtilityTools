
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileImage, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImageToBase64: React.FC = () => {
  const [base64Output, setBase64Output] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select a valid image file",
        variant: "destructive",
      });
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setBase64Output(result);
      setImagePreview(result);
    };
    
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64Output);
    toast({
      title: "Success",
      description: "Base64 string copied to clipboard",
    });
  };

  const downloadBase64 = () => {
    const element = document.createElement('a');
    const file = new Blob([base64Output], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName.split('.')[0]}_base64.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Image to Base64 Converter</h2>
        <p className="text-muted-foreground">Convert images to Base64 encoded strings</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="image-upload">Select Image</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="mt-2"
            />
          </div>

          {imagePreview && (
            <div className="space-y-4">
              <div>
                <Label>Image Preview</Label>
                <div className="mt-2 border rounded-lg p-4 bg-muted/50">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-full max-h-64 mx-auto object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Base64 Output</Label>
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} size="sm" variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button onClick={downloadBase64} size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={base64Output}
                  readOnly
                  placeholder="Base64 output will appear here..."
                  className="min-h-32 font-mono text-sm"
                />
              </div>

              <div className="text-sm text-muted-foreground">
                <p><strong>File:</strong> {fileName}</p>
                <p><strong>Size:</strong> {Math.round(base64Output.length * 0.75)} bytes</p>
                <p><strong>Base64 Length:</strong> {base64Output.length} characters</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileImage className="h-5 w-5 mr-2" />
          About Base64 Encoding
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Base64 encoding converts binary image data into ASCII text format.</p>
          <p><strong>Use cases:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Embedding images in HTML/CSS</li>
            <li>Storing images in JSON/XML</li>
            <li>Email attachments</li>
            <li>Data URIs for web development</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ImageToBase64;
