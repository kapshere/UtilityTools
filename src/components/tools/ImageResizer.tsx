
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Upload, Download, Maximize } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImageResizer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [newDimensions, setNewDimensions] = useState({ width: 0, height: 0 });
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
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

  const handleImageLoad = () => {
    const img = imageRef.current;
    if (!img) return;
    
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    
    setOriginalDimensions({ width, height });
    setNewDimensions({ width, height });
  };

  const updateWidth = (value: string) => {
    const width = parseInt(value) || 0;
    
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.height / originalDimensions.width;
      const height = Math.round(width * aspectRatio);
      setNewDimensions({ width, height });
    } else {
      setNewDimensions(prev => ({ ...prev, width }));
    }
  };

  const updateHeight = (value: string) => {
    const height = parseInt(value) || 0;
    
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      const width = Math.round(height * aspectRatio);
      setNewDimensions({ width, height });
    } else {
      setNewDimensions(prev => ({ ...prev, height }));
    }
  };

  const setPresetSize = (preset: 'small' | 'medium' | 'large' | 'hd' | 'fullhd') => {
    const presets = {
      small: { width: 640, height: 480 },
      medium: { width: 1024, height: 768 },
      large: { width: 1920, height: 1080 },
      hd: { width: 1280, height: 720 },
      fullhd: { width: 1920, height: 1080 }
    };
    
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const targetRatio = presets[preset].width / presets[preset].height;
      const originalRatio = originalDimensions.width / originalDimensions.height;
      
      if (originalRatio > targetRatio) {
        // Image is wider, fit by width
        const width = presets[preset].width;
        const height = Math.round(width / originalRatio);
        setNewDimensions({ width, height });
      } else {
        // Image is taller, fit by height
        const height = presets[preset].height;
        const width = Math.round(height * originalRatio);
        setNewDimensions({ width, height });
      }
    } else {
      setNewDimensions(presets[preset]);
    }
  };

  const resizeImage = () => {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    
    if (!img || !canvas || !selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    if (newDimensions.width <= 0 || newDimensions.height <= 0) {
      toast({
        title: "Error",
        description: "Please enter valid dimensions",
        variant: "destructive",
      });
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = newDimensions.width;
    canvas.height = newDimensions.height;

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw resized image
    ctx.drawImage(img, 0, 0, newDimensions.width, newDimensions.height);

    const originalSize = getImageSize(originalDimensions.width, originalDimensions.height);
    const newSize = getImageSize(newDimensions.width, newDimensions.height);

    toast({
      title: "Image Resized!",
      description: `Resized from ${originalSize} to ${newSize}`,
    });
  };

  const downloadResizedImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
    const qualityValue = format === 'png' ? 1 : quality / 100;

    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resized-image.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, mimeType, qualityValue);
  };

  const getImageSize = (width: number, height: number) => {
    return `${width} × ${height}`;
  };

  const getFileSizeEstimate = () => {
    const pixels = newDimensions.width * newDimensions.height;
    const bytesPerPixel = format === 'png' ? 4 : format === 'webp' ? 1.5 : 3;
    const estimatedBytes = pixels * bytesPerPixel * (quality / 100);
    return formatBytes(estimatedBytes);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Image Resizer</h2>
        <p className="text-muted-foreground">Resize images to specific dimensions</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
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
            <div className="space-y-6">
              <div className="flex justify-center">
                <img
                  ref={imageRef}
                  src={selectedImage}
                  alt="Image to resize"
                  className="max-w-full max-h-64 border rounded"
                  onLoad={handleImageLoad}
                />
              </div>

              {/* Preset Sizes */}
              <div>
                <Label className="text-base font-medium">Preset Sizes</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={() => setPresetSize('small')}>
                    Small (640×480)
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPresetSize('medium')}>
                    Medium (1024×768)
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPresetSize('hd')}>
                    HD (1280×720)
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPresetSize('fullhd')}>
                    Full HD (1920×1080)
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setPresetSize('large')}>
                    Large (1920×1080)
                  </Button>
                </div>
              </div>

              {/* Custom Dimensions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="width">Width (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={newDimensions.width}
                    onChange={(e) => updateWidth(e.target.value)}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={newDimensions.height}
                    onChange={(e) => updateHeight(e.target.value)}
                    min="1"
                  />
                </div>
                <div className="flex items-end">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="aspect-ratio"
                      checked={maintainAspectRatio}
                      onCheckedChange={setMaintainAspectRatio}
                    />
                    <Label htmlFor="aspect-ratio" className="text-sm">
                      Maintain aspect ratio
                    </Label>
                  </div>
                </div>
              </div>

              {/* Format and Quality */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="format">Output Format</Label>
                  <select
                    id="format"
                    value={format}
                    onChange={(e) => setFormat(e.target.value as 'png' | 'jpeg' | 'webp')}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>
                {format !== 'png' && (
                  <div>
                    <Label htmlFor="quality">Quality ({quality}%)</Label>
                    <Input
                      id="quality"
                      type="range"
                      min="1"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center">
                <Button onClick={resizeImage}>
                  <Maximize className="h-4 w-4 mr-2" />
                  Resize Image
                </Button>
                <Button onClick={downloadResizedImage} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>

              {/* Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="text-muted-foreground">Original</p>
                  <p className="font-medium">{getImageSize(originalDimensions.width, originalDimensions.height)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">New Size</p>
                  <p className="font-medium">{getImageSize(newDimensions.width, newDimensions.height)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Size</p>
                  <p className="font-medium">{getFileSizeEstimate()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Hidden canvas for resizing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageResizer;
