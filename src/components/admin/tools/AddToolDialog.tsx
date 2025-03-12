
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { categories } from '@/data/tools';
import { PlusCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AddToolDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onToolAdded: () => void;
}

const AddToolDialog: React.FC<AddToolDialogProps> = ({
  isOpen,
  setIsOpen,
  onToolAdded
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [url, setUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategoryId('');
    setUrl('');
    setFeatured(false);
    setIsNew(true);
  };

  const handleSubmit = async () => {
    if (!name || !categoryId) {
      toast({
        title: "Error",
        description: "Name and category are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('tools')
        .insert({
          name,
          description,
          category_id: categoryId,
          url,
          featured,
          new: isNew
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Tool added successfully",
      });
      
      resetForm();
      setIsOpen(false);
      onToolAdded();
      
    } catch (error) {
      console.error('Error adding tool:', error);
      toast({
        title: "Error",
        description: "Failed to add tool",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Tool</DialogTitle>
          <DialogDescription>
            Create a new tool to add to the collection.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="col-span-3"
              placeholder="https://example.com"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              value={categoryId}
              onValueChange={setCategoryId}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Featured
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Checkbox 
                id="featured" 
                checked={featured}
                onCheckedChange={(checked) => {
                  setFeatured(checked as boolean);
                }}
              />
              <Label htmlFor="featured" className="text-sm font-normal">
                Show in featured section
              </Label>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              New
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Checkbox 
                id="new" 
                checked={isNew}
                onCheckedChange={(checked) => {
                  setIsNew(checked as boolean);
                }}
              />
              <Label htmlFor="new" className="text-sm font-normal">
                Mark as new tool
              </Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            <PlusCircle className="h-4 w-4 mr-2" />
            {isLoading ? 'Adding...' : 'Add Tool'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToolDialog;
