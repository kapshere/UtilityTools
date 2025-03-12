import React, { useState } from 'react';
import { useToolsData } from './tools/useToolsData';
import ToolsFilter from './tools/ToolsFilter';
import ToolsTable from './tools/ToolsTable';
import AddToolDialog from './tools/AddToolDialog';
import EditToolDialog from './EditToolDialog';
import { ToolType } from '@/data/tools';
import { supabase } from '@/integrations/supabase/client';

const ToolsManagement: React.FC = () => {
  const { toolsList, isLoading, fetchTools, removeTool } = useToolsData();
  const [filterText, setFilterText] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<ToolType | null>(null);
  
  // Filter tools based on search text
  const filteredTools = toolsList.filter(tool => 
    tool.name.toLowerCase().includes(filterText.toLowerCase()) ||
    tool.description.toLowerCase().includes(filterText.toLowerCase()) ||
    tool.category.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Add new tool
  const addNewTool = () => {
    setIsAddDialogOpen(true);
  };

  // Edit tool
  const openEditDialog = (tool: ToolType) => {
    setEditingTool(tool);
    setIsEditDialogOpen(true);
  };

  const updateTool = async (updatedTool: ToolType) => {
    try {
      const { error } = await supabase
        .from('tools')
        .update({
          name: updatedTool.name,
          description: updatedTool.description,
          category_id: updatedTool.category.id,
          url: updatedTool.path,
          featured: updatedTool.featured,
          new: updatedTool.new
        })
        .eq('id', updatedTool.id);

      if (error) throw error;

      fetchTools(); // Refresh the tools list
      setIsEditDialogOpen(false);
      setEditingTool(null);
    } catch (error) {
      console.error('Error updating tool:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading tools...</div>;
  }

  return (
    <div className="space-y-4">
      <ToolsFilter 
        filterText={filterText}
        setFilterText={setFilterText}
        onAddNew={addNewTool}
      />
      
      <ToolsTable 
        tools={filteredTools}
        onEdit={openEditDialog}
        onRemove={removeTool}
      />

      <AddToolDialog 
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        onToolAdded={fetchTools}
      />
      
      <EditToolDialog 
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        editingTool={editingTool}
        setEditingTool={setEditingTool}
        updateTool={updateTool}
      />
    </div>
  );
};

export default ToolsManagement;
