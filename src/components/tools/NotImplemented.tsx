
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotImplemented: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Alert className="mb-6 max-w-xl mx-auto">
        <AlertTriangle className="h-5 w-5 mr-2" />
        <AlertTitle className="mb-2">Tool Under Development</AlertTitle>
        <AlertDescription>
          This tool is currently under development and will be available soon. 
          We're working hard to bring you the best tools possible.
        </AlertDescription>
      </Alert>
      
      <Button variant="outline" asChild>
        <Link to="/all-tools">Explore Other Tools</Link>
      </Button>
    </div>
  );
};

export default NotImplemented;
