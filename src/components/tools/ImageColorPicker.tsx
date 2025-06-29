
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Copy, Pipette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImageColorPicker: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff');
  const [colorFormat, setColorFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setCursorPosition({ x, y });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(x, y, 1, 1);
    const [r, g, b] = imageData.data;
    
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    setSelectedColor(hex);
  };

  const formatColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    switch (colorFormat) {
      case 'rgb':
        return `rgb(${r}, ${g}, ${b})`;
      case 'hsl':
        const hsl = rgbToHsl(r, g, b);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      default:
        return hex;
    }
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Color value copied to clipboard",
    });
  };

  const loadImageToCanvas = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Image Color Picker</h2>
        <p className="text-muted-foreground">Upload an image and click to pick colors</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="image-upload">Upload Image</Label>
            <div className="mt-2">
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
            </div>
          </div>

          {selectedImage && (
            <div className="space-y-4">
              <div className="relative border rounded-lg overflow-hidden">
                <img
                  ref={imageRef}
                  src={selectedImage}
                  alt="Color picker"
                  className="max-w-full h-auto cursor-crosshair"
                  onLoad={loadImageToCanvas}
                  onClick={handleCanvasClick}
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 cursor-crosshair"
                  onClick={handleCanvasClick}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Color Format</Label>
                  <select
                    value={colorFormat}
                    onChange={(e) => setColorFormat(e.target.value as 'hex' | 'rgb' | 'hsl')}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="hex">HEX</option>
                    <option value="rgb">RGB</option>
                    <option value="hsl">HSL</option>
                  </select>
                </div>

                <div>
                  <Label>Selected Color</Label>
                  <div className="flex mt-1">
                    <div
                      className="w-12 h-10 border rounded-l"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <Input
                      value={formatColor(selectedColor)}
                      readOnly
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={() => copyToClipboard(formatColor(selectedColor))}
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Color
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Click anywhere on the image to pick a color</p>
                <p>Position: ({cursorPosition.x}, {cursorPosition.y})</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImageColorPicker;
