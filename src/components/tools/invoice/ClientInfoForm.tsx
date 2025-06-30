
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CompanyInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
}

interface ClientInfoFormProps {
  clientInfo: CompanyInfo;
  setClientInfo: (info: CompanyInfo) => void;
}

const ClientInfoForm: React.FC<ClientInfoFormProps> = ({
  clientInfo,
  setClientInfo
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Client Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Client Name"
          value={clientInfo.name}
          onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
        />
        <Input
          placeholder="Client Email"
          value={clientInfo.email}
          onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
        />
        <Textarea
          placeholder="Client Address"
          value={clientInfo.address}
          onChange={(e) => setClientInfo({...clientInfo, address: e.target.value})}
        />
        <Input
          placeholder="Client Phone"
          value={clientInfo.phone}
          onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
        />
      </div>
    </Card>
  );
};

export default ClientInfoForm;
