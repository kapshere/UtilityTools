
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ToolType } from '@/data/tools';
import { Edit, Trash, CheckCircle2, XCircle } from 'lucide-react';

interface ToolsTableProps {
  tools: ToolType[];
  onEdit: (tool: ToolType) => void;
  onRemove: (toolId: string) => void;
}

const ToolsTable: React.FC<ToolsTableProps> = ({ tools, onEdit, onRemove }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>New</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No tools found
                </TableCell>
              </TableRow>
            ) : (
              tools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell className="font-medium">{tool.name}</TableCell>
                  <TableCell>{tool.category.name}</TableCell>
                  <TableCell>
                    {tool.featured ? 
                      <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                      <XCircle className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                    }
                  </TableCell>
                  <TableCell>
                    {tool.new ? 
                      <CheckCircle2 className="h-5 w-5 text-blue-500" /> : 
                      <XCircle className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => onEdit(tool)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => onRemove(tool.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ToolsTable;
