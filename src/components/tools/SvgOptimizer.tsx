
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Upload, Download, Copy, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SvgOptimizer: React.FC = () => {
  const [inputSvg, setInputSvg] = useState('');
  const [outputSvg, setOutputSvg] = useState('');
  const [originalSize, setOriginalSize] = useState(0);
  const [optimizedSize, setOptimizedSize] = useState(0);
  const [options, setOptions] = useState({
    removeComments: true,
    removeMetadata: true,
    removeEmptyElements: true,
    removeUnusedDefs: true,
    minifyStyles: true,
    removeDefaultAttrs: true,
    convertColors: true,
    removeViewBox: false,
  });
  const { toast } = useToast();

  const optimizeSvg = () => {
    if (!inputSvg.trim()) {
      toast({
        title: "Error",
        description: "Please provide SVG content to optimize",
        variant: "destructive",
      });
      return;
    }

    try {
      let optimized = inputSvg;
      const originalBytes = new Blob([inputSvg]).size;

      // Remove comments
      if (options.removeComments) {
        optimized = optimized.replace(/<!--[\s\S]*?-->/g, '');
      }

      // Remove metadata elements
      if (options.removeMetadata) {
        optimized = optimized.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
        optimized = optimized.replace(/<title[\s\S]*?<\/title>/gi, '');
        optimized = optimized.replace(/<desc[\s\S]*?<\/desc>/gi, '');
      }

      // Remove empty elements
      if (options.removeEmptyElements) {
        optimized = optimized.replace(/<(\w+)([^>]*)>\s*<\/\1>/g, '');
      }

      // Remove unused defs
      if (options.removeUnusedDefs) {
        optimized = optimized.replace(/<defs>\s*<\/defs>/g, '');
      }

      // Minify inline styles
      if (options.minifyStyles) {
        optimized = optimized.replace(/style="([^"]*)"/g, (match, style) => {
          const minified = style.replace(/\s+/g, ' ').replace(/;\s*}/g, '}').trim();
          return `style="${minified}"`;
        });
      }

      // Remove default attributes
      if (options.removeDefaultAttrs) {
        optimized = optimized.replace(/\s+fill="black"/g, '');
        optimized = optimized.replace(/\s+stroke="none"/g, '');
        optimized = optimized.replace(/\s+stroke-width="1"/g, '');
      }

      // Convert colors to shorter format
      if (options.convertColors) {
        // Convert rgb() to hex
        optimized = optimized.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, (match, r, g, b) => {
          const hex = ((parseInt(r) << 16) | (parseInt(g) << 8) | parseInt(b)).toString(16).padStart(6, '0');
          return `#${hex}`;
        });
        
        // Convert long hex to short hex where possible
        optimized = optimized.replace(/#([a-f0-9])\1([a-f0-9])\2([a-f0-9])\3/gi, '#$1$2$3');
      }

      // Remove viewBox if requested
      if (options.removeViewBox) {
        optimized = optimized.replace(/\s+viewBox="[^"]*"/g, '');
      }

      // Clean up whitespace
      optimized = optimized.replace(/\s+/g, ' ').trim();
      optimized = optimized.replace(/>\s+</g, '><');

      const optimizedBytes = new Blob([optimized]).size;

      setOutputSvg(optimized);
      setOriginalSize(originalBytes);
      setOptimizedSize(optimizedBytes);

      toast({
        title: "SVG Optimized!",
        description: `Size reduced by ${((originalBytes - optimizedBytes) / originalBytes * 100).toFixed(1)}%`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to optimize SVG. Please check your SVG syntax.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputSvg(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "SVG code copied to clipboard",
    });
  };

  const downloadSvg = () => {
    if (!outputSvg) return;
    
    const blob = new Blob([outputSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        <h2 className="text-2xl font-bold mb-2">SVG Optimizer</h2>
        <p className="text-muted-foreground">Optimize SVG files to reduce size while maintaining quality</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <Label htmlFor="svg-upload">Upload SVG File</Label>
            <div className="mt-2">
              <input
                id="svg-upload"
                type="file"
                accept=".svg,image/svg+xml"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                onClick={() => document.getElementById('svg-upload')?.click()}
                variant="outline"
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload SVG File
              </Button>
            </div>
          </div>

          {/* Input SVG */}
          <div>
            <Label htmlFor="input-svg">SVG Code</Label>
            <Textarea
              id="input-svg"
              placeholder="Paste your SVG code here..."
              value={inputSvg}
              onChange={(e) => setInputSvg(e.target.value)}
              className="font-mono min-h-[200px]"
            />
          </div>

          {/* Optimization Options */}
          <div>
            <Label className="text-base font-medium">Optimization Options</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {Object.entries(options).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="text-sm">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => setOptions(prev => ({ ...prev, [key]: checked }))}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Optimize Button */}
          <div className="flex justify-center">
            <Button onClick={optimizeSvg} disabled={!inputSvg.trim()}>
              <FileImage className="h-4 w-4 mr-2" />
              Optimize SVG
            </Button>
          </div>

          {/* Results */}
          {outputSvg && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Optimized SVG</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(outputSvg)}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadSvg}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={outputSvg}
                readOnly
                className="font-mono min-h-[200px] bg-muted"
              />

              {/* Size Comparison */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Original Size</p>
                  <p className="font-medium">{formatBytes(originalSize)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Optimized Size</p>
                  <p className="font-medium">{formatBytes(optimizedSize)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reduction</p>
                  <p className="font-medium text-green-600">
                    {originalSize > 0 ? ((originalSize - optimizedSize) / originalSize * 100).toFixed(1) : 0}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SvgOptimizer;
