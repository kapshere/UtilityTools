
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ToolType } from '@/data/tools';
import { PlusCircle, Edit, Trash, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ToolsManagement: React.FC = () => {
  const [toolsList, setToolsList] = useState<ToolType[]>([]);
  const [filterText, setFilterText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Fetch tools from Supabase
  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tools')
        .select('*, category:categories(*)');

      if (error) throw error;

      if (data) {
        const formattedTools = data.map(tool => ({
          id: tool.id,
          name: tool.name,
          description: tool.description || '',
          category: {
            id: tool.category?.id || '',
            name: tool.category?.name || '',
            description: tool.category?.description || '',
            icon: tool.category?.icon || '',
            color: ''
          },
          path: tool.url || '',
          icon: () => null,
          featured: tool.featured || false,
          new: false
        }));
        setToolsList(formattedTools);
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
      toast({
        title: "Error",
        description: "Failed to load tools",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter tools based on search text
  const filteredTools = toolsList.filter(tool => 
    tool.name.toLowerCase().includes(filterText.toLowerCase()) ||
    tool.description.toLowerCase().includes(filterText.toLowerCase()) ||
    tool.category.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Remove tool
  const removeTool = async (toolId: string) => {
    if (window.confirm(`Are you sure you want to remove this tool?`)) {
      try {
        const { error } = await supabase
          .from('tools')
          .delete()
          .eq('id', toolId);

        if (error) throw error;

        setToolsList(prev => prev.filter(tool => tool.id !== toolId));
        
        toast({
          title: "Tool removed",
          description: "The tool has been removed successfully.",
          variant: "default",
        });
      } catch (error) {
        console.error('Error removing tool:', error);
        toast({
          title: "Error",
          description: "Failed to remove tool",
          variant: "destructive",
        });
      }
    }
  };

  // Add new tool
  const addNewTool = () => {
    // This will be implemented in the AddToolDialog component
    console.log('Add new tool');
  };

  // Edit tool
  const openEditDialog = (tool: ToolType) => {
    // This will be implemented in the EditToolDialog component
    console.log('Edit tool:', tool);
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading tools...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <Input
          placeholder="Search tools..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={addNewTool}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Tool
        </Button>
      </div>
      
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
              {filteredTools.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No tools found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTools.map((tool) => (
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
                          onClick={() => openEditDialog(tool)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeTool(tool.id)}
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
    </div>
  );
};

export default ToolsManagement;
