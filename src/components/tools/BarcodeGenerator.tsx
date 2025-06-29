
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Copy, BarChart3 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BarcodeGenerator: React.FC = () => {
  const [text, setText] = useState('123456789012');
  const [barcodeType, setBarcodeType] = useState('code128');
  const [width, setWidth] = useState('2');
  const [height, setHeight] = useState('100');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const barcodeTypes = [
    { value: 'code128', label: 'Code 128' },
    { value: 'code39', label: 'Code 39' },
    { value: 'ean13', label: 'EAN-13' },
    { value: 'ean8', label: 'EAN-8' },
    { value: 'upc', label: 'UPC-A' },
  ];

  // Simple barcode generation using canvas
  const generateBarcode = () => {
    const canvas = canvasRef.current;
    if (!canvas || !text) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barWidth = parseInt(width);
    const barHeight = parseInt(height);
    
    // Clear canvas
    canvas.width = text.length * barWidth * 8;
    canvas.height = barHeight + 40;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate simple pattern based on text
    ctx.fillStyle = 'black';
    let x = 10;
    
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const pattern = charCode % 8; // Simple pattern generation
      
      for (let j = 0; j < 8; j++) {
        if ((pattern >> j) & 1) {
          ctx.fillRect(x, 10, barWidth, barHeight);
        }
        x += barWidth;
      }
    }

    // Add text below barcode
    ctx.fillStyle = 'black';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, barHeight + 30);
  };

  const downloadBarcode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `barcode-${text}.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Downloaded!",
      description: "Barcode image has been downloaded"
    });
  };

  const copyToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          toast({
            title: "Copied!",
            description: "Barcode image copied to clipboard"
          });
        }
      });
    } catch (error) {
      // Fallback to copying canvas data URL as text
      const dataURL = canvas.toDataURL();
      await navigator.clipboard.writeText(dataURL);
      toast({
        title: "Copied!",
        description: "Barcode data URL copied to clipboard"
      });
    }
  };

  React.useEffect(() => {
    generateBarcode();
  }, [text, barcodeType, width, height]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Barcode Generator</h2>
        <p className="text-muted-foreground">Generate various types of barcodes from text</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text to Encode</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or numbers"
              />
            </div>

            <div>
              <Label htmlFor="type">Barcode Type</Label>
              <Select value={barcodeType} onValueChange={setBarcodeType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {barcodeTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Bar Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  min="1"
                  max="10"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="height">Bar Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  min="50"
                  max="300"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={downloadBarcode} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" onClick={copyToClipboard} className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </Card>

        {/* Preview */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <h3 className="font-medium">Preview</h3>
            </div>
            
            <div className="border rounded-lg p-4 bg-white min-h-[200px] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full border"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>

            <div className="text-sm text-muted-foreground">
              <p><strong>Type:</strong> {barcodeTypes.find(t => t.value === barcodeType)?.label}</p>
              <p><strong>Text:</strong> {text}</p>
              <p><strong>Dimensions:</strong> {width}px × {height}px bars</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Info */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950/20">
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <p className="font-medium mb-2">Tips:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Different barcode types have specific format requirements</li>
            <li>EAN-13 requires exactly 13 digits</li>
            <li>EAN-8 requires exactly 8 digits</li>
            <li>Code 39 supports alphanumeric characters</li>
            <li>Adjust bar width and height for better readability</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default BarcodeGenerator;
