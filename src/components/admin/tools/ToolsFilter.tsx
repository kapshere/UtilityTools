
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface ToolsFilterProps {
  filterText: string;
  setFilterText: (text: string) => void;
  onAddNew: () => void;
}

const ToolsFilter: React.FC<ToolsFilterProps> = ({ 
  filterText, 
  setFilterText, 
  onAddNew 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      <Input
        placeholder="Search tools..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="max-w-md"
      />
      <Button onClick={onAddNew}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add New Tool
      </Button>
    </div>
  );
};

export default ToolsFilter;
