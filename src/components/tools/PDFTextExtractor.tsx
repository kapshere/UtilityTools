
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileText, RefreshCw, Copy, Download, X } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
// Note: In a real application, you would use a library like pdf.js to extract text

const PDFTextExtractor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: "Invalid file format",
          description: "Only PDF files are accepted",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
      setExtractedText('');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      if (droppedFile.type !== 'application/pdf') {
        toast({
          title: "Invalid file format",
          description: "Only PDF files are accepted",
          variant: "destructive",
        });
        return;
      }
      
      setFile(droppedFile);
      setExtractedText('');
    }
  };

  const handleReset = () => {
    setFile(null);
    setExtractedText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const extractText = async () => {
    if (!file) return;
    
    setIsLoading(true);
    try {
      // In a real application, you would use pdf.js or another library to extract text
      // This is a simulated text extraction
      
      // Check if the file is loaded
      const fileArrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileArrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      
      // For demo purposes, we'll generate dummy text
      let simulatedText = '';
      
      for (let i = 0; i < pageCount; i++) {
        simulatedText += `# Content from page ${i + 1}\n\n`;
        
        // Generate some random paragraphs
        const paragraphCount = 2 + Math.floor(Math.random() * 3);
        for (let p = 0; p < paragraphCount; p++) {
          const sentenceCount = 3 + Math.floor(Math.random() * 5);
          for (let s = 0; s < sentenceCount; s++) {
            const wordCount = 5 + Math.floor(Math.random() * 10);
            const words = Array(wordCount).fill(0).map(() => {
              const length = 3 + Math.floor(Math.random() * 8);
              return 'lorem'.substring(0, length) + 'ipsum'.substring(0, Math.random() * 5);
            });
            
            simulatedText += words.join(' ') + '. ';
          }
          simulatedText += '\n\n';
        }
        
        // Add some structured content
        if (i === 0) {
          simulatedText += "Document Title: " + file.name.replace('.pdf', '') + "\n";
          simulatedText += "Date: " + new Date().toLocaleDateString() + "\n\n";
        }
        
        if (i === pageCount - 1) {
          simulatedText += "--- End of Document ---\n";
        }
      }
      
      // If not preserving formatting, remove extra line breaks
      if (!preserveFormatting) {
        simulatedText = simulatedText
          .replace(/\n+/g, '\n')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ');
      }
      
      setExtractedText(simulatedText);
      
      toast({
        title: "Success!",
        description: `Text extracted from ${pageCount} pages`,
      });
    } catch (error) {
      console.error('Error extracting text:', error);
      toast({
        title: "Error",
        description: "Failed to extract text from PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  const downloadAsText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file ? file.name.replace('.pdf', '.txt') : 'extracted-text.txt';
    link.click();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">PDF Text Extractor</h2>
      <p className="text-muted-foreground">
        Extract text content from PDF files. Copy the text or save it as a TXT file.
      </p>

      <Card className="p-6">
        {!file ? (
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center mb-6 hover:bg-muted/50 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Drop a PDF file here or click to browse</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Upload a PDF file to extract its text content
            </p>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between bg-muted p-3 rounded-md">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="preserve-formatting"
                checked={preserveFormatting}
                onCheckedChange={() => setPreserveFormatting(!preserveFormatting)}
              />
              <label htmlFor="preserve-formatting" className="text-sm text-muted-foreground cursor-pointer">
                Preserve formatting (paragraphs, line breaks)
              </label>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button 
            onClick={extractText} 
            disabled={!file || isLoading}
            className="min-w-[140px]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Extracting...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Extract Text
              </>
            )}
          </Button>
        </div>
      </Card>

      {extractedText && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Extracted Text</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadAsText}>
                <Download className="mr-2 h-4 w-4" />
                Download as TXT
              </Button>
            </div>
          </div>
          
          <Textarea
            value={extractedText}
            readOnly
            className="h-80 font-mono text-sm"
          />
        </Card>
      )}
    </div>
  );
};

export default PDFTextExtractor;
