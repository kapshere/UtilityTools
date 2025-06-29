
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download, Scissors } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImageCropper: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
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
    
    setOriginalDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
    
    // Set initial crop area to center of image
    setCropArea({
      x: Math.floor(img.naturalWidth * 0.25),
      y: Math.floor(img.naturalHeight * 0.25),
      width: Math.floor(img.naturalWidth * 0.5),
      height: Math.floor(img.naturalHeight * 0.5)
    });
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    const img = imageRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;
    
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    setIsDragging(true);
    setDragStart({ x, y });
    setCropArea(prev => ({ ...prev, x, y, width: 0, height: 0 }));
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;

    const img = imageRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;
    
    const currentX = (event.clientX - rect.left) * scaleX;
    const currentY = (event.clientY - rect.top) * scaleY;

    const width = currentX - dragStart.x;
    const height = currentY - dragStart.y;

    setCropArea(prev => ({
      ...prev,
      width: Math.abs(width),
      height: Math.abs(height),
      x: width < 0 ? currentX : dragStart.x,
      y: height < 0 ? currentY : dragStart.y
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const cropImage = () => {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    
    if (!img || !canvas || !selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image and define a crop area",
        variant: "destructive",
      });
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to crop area
    canvas.width = cropArea.width;
    canvas.height = cropArea.height;

    // Draw cropped image
    ctx.drawImage(
      img,
      cropArea.x, cropArea.y, cropArea.width, cropArea.height,
      0, 0, cropArea.width, cropArea.height
    );

    toast({
      title: "Image Cropped!",
      description: `Cropped to ${cropArea.width}x${cropArea.height} pixels`,
    });
  };

  const downloadCroppedImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cropped-image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const updateCropArea = (field: keyof typeof cropArea, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0);
    setCropArea(prev => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Image Cropper</h2>
        <p className="text-muted-foreground">Upload an image and select the area to crop</p>
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
                  alt="Image to crop"
                  className="max-w-full h-auto cursor-crosshair"
                  onLoad={handleImageLoad}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
                
                {/* Crop overlay */}
                <div
                  className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20"
                  style={{
                    left: `${(cropArea.x / originalDimensions.width) * 100}%`,
                    top: `${(cropArea.y / originalDimensions.height) * 100}%`,
                    width: `${(cropArea.width / originalDimensions.width) * 100}%`,
                    height: `${(cropArea.height / originalDimensions.height) * 100}%`,
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Crop Controls */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="crop-x">X Position</Label>
                  <Input
                    id="crop-x"
                    type="number"
                    value={cropArea.x}
                    onChange={(e) => updateCropArea('x', e.target.value)}
                    max={originalDimensions.width}
                  />
                </div>
                <div>
                  <Label htmlFor="crop-y">Y Position</Label>
                  <Input
                    id="crop-y"
                    type="number"
                    value={cropArea.y}
                    onChange={(e) => updateCropArea('y', e.target.value)}
                    max={originalDimensions.height}
                  />
                </div>
                <div>
                  <Label htmlFor="crop-width">Width</Label>
                  <Input
                    id="crop-width"
                    type="number"
                    value={cropArea.width}
                    onChange={(e) => updateCropArea('width', e.target.value)}
                    max={originalDimensions.width - cropArea.x}
                  />
                </div>
                <div>
                  <Label htmlFor="crop-height">Height</Label>
                  <Input
                    id="crop-height"
                    type="number"
                    value={cropArea.height}
                    onChange={(e) => updateCropArea('height', e.target.value)}
                    max={originalDimensions.height - cropArea.y}
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={cropImage}>
                  <Scissors className="h-4 w-4 mr-2" />
                  Crop Image
                </Button>
                <Button onClick={downloadCroppedImage} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Original: {originalDimensions.width} × {originalDimensions.height} pixels</p>
                <p>Crop Area: {cropArea.width} × {cropArea.height} pixels</p>
                <p>Click and drag on the image to select crop area</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Hidden canvas for cropping */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageCropper;
