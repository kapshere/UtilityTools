
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, Lock, ShieldCheck, ListChecks, Grid3X3, 
  PlusCircle, Edit, Trash, CheckCircle2, XCircle, Star,
  MessageSquare, Lightbulb, Mail, Reply 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  replied: boolean;
  reply_text: string | null;
  created_at: string;
};

type ToolSuggestion = {
  id: string;
  name: string;
  description: string;
  category: string;
  link: string | null;
  email: string;
  reviewed: boolean;
  approved: boolean;
  created_at: string;
};

const AdminPanel: React.FC = () => {
  const { isAdmin, login, logout } = useAdmin();
  const [password, setPassword] = useState('');
  const [toolsList, setToolsList] = useState<ToolType[]>([...tools]);
  const [editingTool, setEditingTool] = useState<ToolType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // New state for contact messages and tool suggestions
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [toolSuggestions, setToolSuggestions] = useState<ToolSuggestion[]>([]);
  const [replyingTo, setReplyingTo] = useState<ContactMessage | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewingTool, setReviewingTool] = useState<ToolSuggestion | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  // Fetch messages and suggestions when admin is logged in
  useEffect(() => {
    if (isAdmin) {
      fetchContactMessages();
      fetchToolSuggestions();
    }
  }, [isAdmin]);

  // Fetch contact messages
  const fetchContactMessages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setContactMessages(data || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      toast({
        title: "Error",
        description: "Failed to load contact messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch tool suggestions
  const fetchToolSuggestions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tool_suggestions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setToolSuggestions(data || []);
    } catch (error) {
      console.error('Error fetching tool suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to load tool suggestions",
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

  // Open reply dialog
  const openReplyDialog = (message: ContactMessage) => {
    setReplyingTo(message);
    setReplyMessage(message.reply_text || '');
    setIsReplyDialogOpen(true);
  };
  
  // Send reply to contact message
  const sendReply = async () => {
    if (!replyingTo) return;
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          replied: true,
          reply_text: replyMessage 
        })
        .eq('id', replyingTo.id);
      
      if (error) throw error;
      
      // Update the local state
      setContactMessages(messages => 
        messages.map(msg => 
          msg.id === replyingTo.id 
            ? { ...msg, replied: true, reply_text: replyMessage } 
            : msg
        )
      );
      
      setIsReplyDialogOpen(false);
      setReplyingTo(null);
      setReplyMessage('');
      
      toast({
        title: "Reply Sent",
        description: "Your reply has been sent successfully.",
      });
      
      // In a real app, you would send an email here
      console.log(`Sending email to ${replyingTo.email} with reply: ${replyMessage}`);
      
    } catch (error) {
      console.error('Error sending reply:', error);
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive",
      });
    }
  };
  
  // Open review dialog for tool suggestion
  const openReviewDialog = (suggestion: ToolSuggestion) => {
    setReviewingTool(suggestion);
    setIsReviewDialogOpen(true);
  };
  
  // Review tool suggestion
  const reviewToolSuggestion = async (approved: boolean) => {
    if (!reviewingTool) return;
    
    try {
      const { error } = await supabase
        .from('tool_suggestions')
        .update({ 
          reviewed: true,
          approved 
        })
        .eq('id', reviewingTool.id);
      
      if (error) throw error;
      
      // Update the local state
      setToolSuggestions(suggestions => 
        suggestions.map(suggestion => 
          suggestion.id === reviewingTool.id 
            ? { ...suggestion, reviewed: true, approved } 
            : suggestion
        )
      );
      
      setIsReviewDialogOpen(false);
      setReviewingTool(null);
      
      toast({
        title: approved ? "Suggestion Approved" : "Suggestion Rejected",
        description: `The tool suggestion has been ${approved ? 'approved' : 'rejected'}.`,
      });
      
      // In a real app, you would send an email to the user here
      console.log(`Sending email to ${reviewingTool.email} about their suggestion status: ${approved ? 'Approved' : 'Rejected'}`);
      
    } catch (error) {
      console.error('Error reviewing tool suggestion:', error);
      toast({
        title: "Error",
        description: "Failed to update suggestion status",
        variant: "destructive",
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
                <h2 className="text-2xl font-semibold flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                  Admin Dashboard
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage tools, messages, and application settings
                </p>
              </div>
              <Button variant="destructive" onClick={logout}>Logout</Button>
            </div>
            
            <Tabs defaultValue="tools" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="tools">
                  <ListChecks className="h-4 w-4 mr-2" />
                  Manage Tools
                </TabsTrigger>
                <TabsTrigger value="categories">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Categories
                </TabsTrigger>
                <TabsTrigger value="messages">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </TabsTrigger>
                <TabsTrigger value="suggestions">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Tool Suggestions
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
              
              <TabsContent value="messages" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                    Contact Messages
                  </h3>
                  <Button variant="outline" onClick={fetchContactMessages} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Refresh"}
                  </Button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contactMessages.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                              No messages found
                            </TableCell>
                          </TableRow>
                        ) : (
                          contactMessages.map((message) => (
                            <TableRow key={message.id}>
                              <TableCell className="font-medium">{message.name}</TableCell>
                              <TableCell>{message.email}</TableCell>
                              <TableCell>{message.subject}</TableCell>
                              <TableCell>{new Date(message.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>
                                {message.replied ? 
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                    Replied
                                  </span> : 
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                                    Pending
                                  </span>
                                }
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => openReplyDialog(message)}
                                >
                                  <Reply className="h-4 w-4 mr-2" />
                                  {message.replied ? "View Reply" : "Reply"}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="suggestions" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                    Tool Suggestions
                  </h3>
                  <Button variant="outline" onClick={fetchToolSuggestions} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Refresh"}
                  </Button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Submitted By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {toolSuggestions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                              No tool suggestions found
                            </TableCell>
                          </TableRow>
                        ) : (
                          toolSuggestions.map((suggestion) => (
                            <TableRow key={suggestion.id}>
                              <TableCell className="font-medium">{suggestion.name}</TableCell>
                              <TableCell>
                                {categories.find(cat => cat.id === suggestion.category)?.name || suggestion.category}
                              </TableCell>
                              <TableCell>{suggestion.email}</TableCell>
                              <TableCell>{new Date(suggestion.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>
                                {!suggestion.reviewed ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                                    Pending Review
                                  </span>
                                ) : suggestion.approved ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                    Approved
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                                    Rejected
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => openReviewDialog(suggestion)}
                                    disabled={suggestion.reviewed}
                                  >
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Review
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
      
      {/* Reply to Message Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>
              Send a reply to {replyingTo?.name}
            </DialogDescription>
          </DialogHeader>
          
          {replyingTo && (
            <div className="space-y-4 py-4">
              <div className="bg-muted p-4 rounded-md">
                <div className="mb-2">
                  <span className="font-semibold">From:</span> {replyingTo.name} ({replyingTo.email})
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Subject:</span> {replyingTo.subject}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Message:</span>
                </div>
                <div className="pl-2 border-l-2 border-primary/20">
                  {replyingTo.message}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reply" className="text-lg font-medium">
                  Your Reply
                </Label>
                <Textarea
                  id="reply"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Write your reply here..."
                  className="min-h-[150px]"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendReply} disabled={!replyMessage.trim()}>
              <Mail className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Review Tool Suggestion Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Review Tool Suggestion</DialogTitle>
            <DialogDescription>
              Review the suggested tool and approve or reject it
            </DialogDescription>
          </DialogHeader>
          
          {reviewingTool && (
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Tool Name:</span> {reviewingTool.name}
                </div>
                <div>
                  <span className="font-semibold">Category:</span> {categories.find(cat => cat.id === reviewingTool.category)?.name || reviewingTool.category}
                </div>
                <div>
                  <span className="font-semibold">Description:</span>
                  <p className="mt-1 p-2 bg-muted rounded-md">{reviewingTool.description}</p>
                </div>
                {reviewingTool.link && (
                  <div>
                    <span className="font-semibold">Link:</span> {reviewingTool.link}
                  </div>
                )}
                <div>
                  <span className="font-semibold">Suggested by:</span> {reviewingTool.email}
                </div>
                <div>
                  <span className="font-semibold">Date:</span> {new Date(reviewingTool.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => reviewToolSuggestion(false)}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button variant="default" onClick={() => reviewToolSuggestion(true)}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
