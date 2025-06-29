
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Scan, Copy, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DecodedJWT {
  header: any;
  payload: any;
  signature: string;
  isValid: boolean;
}

const JwtDecoder: React.FC = () => {
  const [jwtToken, setJwtToken] = useState('');
  const [decodedJWT, setDecodedJWT] = useState<DecodedJWT | null>(null);
  const { toast } = useToast();

  const decodeJWT = () => {
    if (!jwtToken.trim()) {
      toast({
        title: "Error",
        description: "Please enter a JWT token",
        variant: "destructive",
      });
      return;
    }

    try {
      const parts = jwtToken.split('.');
      
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      const signature = parts[2];

      // Check if token is expired
      const now = Math.floor(Date.now() / 1000);
      const isExpired = payload.exp && payload.exp < now;
      const isValid = !isExpired;

      setDecodedJWT({
        header,
        payload,
        signature,
        isValid
      });

      toast({
        title: "Success",
        description: "JWT token decoded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JWT token format",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">JWT Decoder</h2>
        <p className="text-muted-foreground">Decode and analyze JWT tokens</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="jwt-input">JWT Token</Label>
            <Textarea
              id="jwt-input"
              value={jwtToken}
              onChange={(e) => setJwtToken(e.target.value)}
              placeholder="Paste your JWT token here..."
              className="min-h-[100px] font-mono text-sm"
            />
          </div>

          <Button onClick={decodeJWT} className="w-full">
            <Scan className="h-4 w-4 mr-2" />
            Decode JWT
          </Button>
        </div>
      </Card>

      {decodedJWT && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Token Status</h3>
              <Badge variant={decodedJWT.isValid ? "default" : "destructive"}>
                {decodedJWT.isValid ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Valid
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Expired
                  </>
                )}
              </Badge>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Header</h3>
              <Button
                onClick={() => copyToClipboard(JSON.stringify(decodedJWT.header, null, 2))}
                size="sm"
                variant="outline"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(decodedJWT.header, null, 2)}
            </pre>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Payload</h3>
              <Button
                onClick={() => copyToClipboard(JSON.stringify(decodedJWT.payload, null, 2))}
                size="sm"
                variant="outline"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(decodedJWT.payload, null, 2)}
            </pre>
            
            {decodedJWT.payload.exp && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md">
                <p className="text-sm">
                  <strong>Expires:</strong> {formatTimestamp(decodedJWT.payload.exp)}
                </p>
              </div>
            )}
            
            {decodedJWT.payload.iat && (
              <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-950/20 rounded-md">
                <p className="text-sm">
                  <strong>Issued at:</strong> {formatTimestamp(decodedJWT.payload.iat)}
                </p>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Signature</h3>
            <div className="bg-muted p-4 rounded-md">
              <code className="text-sm break-all">{decodedJWT.signature}</code>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Note: Signature verification requires the secret key and is not performed in this client-side tool.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JwtDecoder;
