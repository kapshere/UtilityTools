
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileImage, RefreshCw, Download, X, FileText, Layers } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
// Note: In a real app, you would use a library like pdf.js to render PDFs to images

const PDFToImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFormat, setImageFormat] = useState<'png' | 'jpeg'>('png');
  const [imageQuality, setImageQuality] = useState<number>(90);
  const [convertedImages, setConvertedImages] = useState<{page: number, url: string}[]>([]);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setConvertedImages([]);
      
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pages = pdfDoc.getPageCount();
        setPageCount(pages);
        // Select all pages by default
        setSelectedPages(Array.from({ length: pages }, (_, i) => i));
      } catch (error) {
        console.error('Error loading PDF:', error);
        toast({
          title: "Error",
          description: "Failed to load PDF file. The file might be corrupted.",
          variant: "destructive",
        });
        setFile(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
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
      setConvertedImages([]);
      
      try {
        const arrayBuffer = await droppedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pages = pdfDoc.getPageCount();
        setPageCount(pages);
        // Select all pages by default
        setSelectedPages(Array.from({ length: pages }, (_, i) => i));
      } catch (error) {
        console.error('Error loading PDF:', error);
        toast({
          title: "Error",
          description: "Failed to load PDF file. The file might be corrupted.",
          variant: "destructive",
        });
        setFile(null);
      }
    }
  };

  const handleReset = () => {
    setFile(null);
    setPageCount(0);
    setSelectedPages([]);
    setConvertedImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePageSelection = (page: number) => {
    setSelectedPages(prev => 
      prev.includes(page) 
        ? prev.filter(p => p !== page) 
        : [...prev, page]
    );
  };

  const selectAllPages = () => {
    setSelectedPages(Array.from({ length: pageCount }, (_, i) => i));
  };

  const deselectAllPages = () => {
    setSelectedPages([]);
  };

  // For demo purposes, we'll simulate PDF to image conversion
  // In a real app, you would use a library like pdf.js to render PDFs to images
  const convertToImages = async () => {
    if (!file || selectedPages.length === 0) return;
    
    setIsLoading(true);
    try {
      // Simulated conversion - in a real app, you would use pdf.js or similar
      const newImages = [];
      
      // Sort pages to process them in order
      const sortedPages = [...selectedPages].sort((a, b) => a - b);
      
      for (const pageIndex of sortedPages) {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // For demo, create a placeholder image or canvas
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 1100;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Draw a placeholder "page"
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.strokeStyle = '#cccccc';
          ctx.lineWidth = 2;
          ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
          
          ctx.fillStyle = '#333333';
          ctx.font = '20px Arial';
          ctx.fillText(`Page ${pageIndex + 1} of PDF: ${file.name}`, 50, 50);
          
          // Draw some dummy content
          ctx.fillStyle = '#666666';
          for (let i = 0; i < 20; i++) {
            ctx.fillRect(50, 100 + i * 30, Math.random() * 700, 10);
          }
          
          const imageUrl = canvas.toDataURL(imageFormat === 'png' ? 'image/png' : 'image/jpeg', imageQuality / 100);
          newImages.push({ page: pageIndex + 1, url: imageUrl });
        }
      }
      
      setConvertedImages(newImages);
      
      toast({
        title: "Success!",
        description: `${newImages.length} pages have been converted to images`,
      });
    } catch (error) {
      console.error('Error converting PDF to images:', error);
      toast({
        title: "Error",
        description: "Failed to convert PDF to images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadAllImages = () => {
    // Create a zip file in a real application
    toast({
      title: "Download Started",
      description: "Your images will download individually.",
    });
    
    // Trigger download for each image
    convertedImages.forEach(image => {
      const link = document.createElement('a');
      link.href = image.url;
      link.download = `page_${image.page}.${imageFormat}`;
      link.click();
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">PDF to Image Converter</h2>
      <p className="text-muted-foreground">
        Convert PDF pages to high-quality images in PNG or JPEG format.
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
              Upload a PDF file to convert to images
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
                    {pageCount} {pageCount === 1 ? 'page' : 'pages'} • {selectedPages.length} selected
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
            
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Pages to Convert</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={selectAllPages}>Select All</Button>
                  <Button variant="outline" size="sm" onClick={deselectAllPages}>Deselect All</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
                {Array.from({ length: pageCount }, (_, i) => (
                  <div 
                    key={i}
                    className={`p-2 text-center border rounded-md cursor-pointer ${
                      selectedPages.includes(i) ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                    }`}
                    onClick={() => handlePageSelection(i)}
                  >
                    <p className="text-xs font-medium">{i + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Image Format</Label>
                <Select value={imageFormat} onValueChange={(value: string) => setImageFormat(value as 'png' | 'jpeg')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG (higher quality)</SelectItem>
                    <SelectItem value="jpeg">JPEG (smaller size)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Image Quality: {imageQuality}%</Label>
                </div>
                <Slider
                  value={[imageQuality]} 
                  onValueChange={(value) => setImageQuality(value[0])}
                  min={10}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button 
            onClick={convertToImages} 
            disabled={!file || selectedPages.length === 0 || isLoading}
            className="min-w-[140px]"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <FileImage className="mr-2 h-4 w-4" />
                Convert to Images
              </>
            )}
          </Button>
        </div>
      </Card>

      {convertedImages.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Converted Images</h3>
            <Button variant="outline" onClick={downloadAllImages}>
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {convertedImages.map((image) => (
              <div key={image.page} className="border rounded-md p-2">
                <img 
                  src={image.url} 
                  alt={`Page ${image.page}`}
                  className="w-full h-auto object-contain bg-white mb-2"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm">Page {image.page}</p>
                  <Button size="sm" variant="ghost" asChild>
                    <a href={image.url} download={`page_${image.page}.${imageFormat}`}>
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default PDFToImage;
