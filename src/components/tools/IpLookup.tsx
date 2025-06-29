
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Globe, Server, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
  postal: string;
}

const IpLookup: React.FC = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const lookupIp = async () => {
    if (!ipAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter an IP address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://ipinfo.io/${ipAddress}/json`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Invalid IP address');
      }
      
      setIpInfo(data);
      toast({
        title: "Success",
        description: "IP information retrieved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to lookup IP address",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentIp = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ipinfo.io/json');
      const data = await response.json();
      setIpAddress(data.ip);
      setIpInfo(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get current IP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">IP Address Lookup</h2>
        <p className="text-muted-foreground">Get detailed information about any IP address</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="ip-input">IP Address</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="ip-input"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="Enter IP address (e.g., 8.8.8.8)"
                onKeyPress={(e) => e.key === 'Enter' && lookupIp()}
              />
              <Button onClick={lookupIp} disabled={loading}>
                <Search className="h-4 w-4 mr-2" />
                {loading ? 'Looking up...' : 'Lookup'}
              </Button>
            </div>
          </div>

          <Button onClick={getCurrentIp} variant="outline" disabled={loading}>
            <Globe className="h-4 w-4 mr-2" />
            Get My IP
          </Button>

          {ipInfo && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">IP Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">IP Address</p>
                      <p className="text-sm text-muted-foreground">{ipInfo.ip}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {ipInfo.city}, {ipInfo.region}, {ipInfo.country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">ISP/Organization</p>
                      <p className="text-sm text-muted-foreground">{ipInfo.org}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Timezone</p>
                      <p className="text-sm text-muted-foreground">{ipInfo.timezone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {ipInfo.loc && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Coordinates</p>
                  <p className="text-sm text-muted-foreground">{ipInfo.loc}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default IpLookup;
