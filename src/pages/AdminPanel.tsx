
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAdmin } from '@/hooks/useAdmin';
import { tools, categories, ToolType } from '@/data/tools';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, Lock, ShieldCheck, ListChecks, Grid3X3, 
  PlusCircle, Edit, Trash, CheckCircle2, XCircle, Star
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { isAdmin, login, logout } = useAdmin();
  const [password, setPassword] = useState('');
  const [toolsList, setToolsList] = useState<ToolType[]>([...tools]);
  const [editingTool, setEditingTool] = useState<ToolType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filter tools based on search text
  const filteredTools = toolsList.filter(tool => 
    tool.name.toLowerCase().includes(filterText.toLowerCase()) ||
    tool.description.toLowerCase().includes(filterText.toLowerCase()) ||
    tool.category.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast({
        title: "Login successful",
        description: "You are now logged in as admin",
        variant: "default",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  // Update tool
  const updateTool = (updatedTool: ToolType) => {
    setToolsList(prev => 
      prev.map(tool => tool.id === updatedTool.id ? updatedTool : tool)
    );
    setIsEditDialogOpen(false);
    setEditingTool(null);
    
    toast({
      title: "Tool updated",
      description: `${updatedTool.name} has been updated successfully.`,
      variant: "default",
    });
  };

  // Remove tool
  const removeTool = (toolId: string) => {
    if (window.confirm(`Are you sure you want to remove this tool?`)) {
      setToolsList(prev => prev.filter(tool => tool.id !== toolId));
      
      toast({
        title: "Tool removed",
        description: "The tool has been removed successfully.",
        variant: "default",
      });
    }
  };

  // Edit tool dialog
  const openEditDialog = (tool: ToolType) => {
    setEditingTool({...tool});
    setIsEditDialogOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16 pb-10 container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Admin Panel</h1>
        </div>
        
        {!isAdmin ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Admin Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="mt-1"
                    autoComplete="current-password"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use "admin123" for demo purposes
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Login as Admin
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                  Admin Dashboard
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage tools and application settings
                </p>
              </div>
              <Button variant="destructive" onClick={logout}>Logout</Button>
            </div>
            
            <Tabs defaultValue="tools" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="tools">
                  <ListChecks className="h-4 w-4 mr-2" />
                  Manage Tools
                </TabsTrigger>
                <TabsTrigger value="categories">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Categories
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tools" className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <Input
                    placeholder="Search tools..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="max-w-md"
                  />
                  <Button>
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
                        {filteredTools.map((tool) => (
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
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="categories" className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium mb-4">Categories Management</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Tools Count</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell>
                              {tools.filter(tool => tool.category.id === category.id).length}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
      
      {/* Edit Tool Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Tool</DialogTitle>
            <DialogDescription>
              Make changes to the tool. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          {editingTool && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editingTool.name}
                  onChange={(e) => setEditingTool({...editingTool, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={editingTool.description}
                  onChange={(e) => setEditingTool({...editingTool, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={editingTool.category.id}
                  onValueChange={(value) => {
                    const selectedCategory = categories.find(cat => cat.id === value);
                    if (selectedCategory) {
                      setEditingTool({...editingTool, category: selectedCategory});
                    }
                  }}
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
                    checked={!!editingTool.featured}
                    onCheckedChange={(checked) => {
                      setEditingTool({...editingTool, featured: checked as boolean});
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
                    checked={!!editingTool.new}
                    onCheckedChange={(checked) => {
                      setEditingTool({...editingTool, new: checked as boolean});
                    }}
                  />
                  <Label htmlFor="new" className="text-sm font-normal">
                    Mark as new tool
                  </Label>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => editingTool && updateTool(editingTool)}>
              <Star className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
