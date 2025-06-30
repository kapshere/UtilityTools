
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

interface CompanyInfoFormProps {
  companyInfo: CompanyInfo;
  setCompanyInfo: (info: CompanyInfo) => void;
}

const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({
  companyInfo,
  setCompanyInfo
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Company Information</h3>
      <div className="space-y-4">
        <Input
          placeholder="Company Name"
          value={companyInfo.name}
          onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
        />
        <Textarea
          placeholder="Address"
          value={companyInfo.address}
          onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
        />
        <Input
          placeholder="Email"
          value={companyInfo.email}
          onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
        />
        <Input
          placeholder="Phone"
          value={companyInfo.phone}
          onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
        />
      </div>
    </Card>
  );
};

export default CompanyInfoForm;
