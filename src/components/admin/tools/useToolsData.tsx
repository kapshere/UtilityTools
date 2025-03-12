
import { useState, useEffect } from 'react';
import { ToolType } from '@/data/tools';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useToolsData = () => {
  const [toolsList, setToolsList] = useState<ToolType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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
            // The icon function is part of our ToolType but not in the database
            // So we create a placeholder that returns null
            icon: () => null,
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

  useEffect(() => {
    fetchTools();
  }, []);

  return {
    toolsList,
    isLoading,
    fetchTools,
    removeTool
  };
};
