
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ChevronRight, SendIcon, LightbulbIcon } from 'lucide-react';
import { categories } from '@/data/tools';

const SuggestTool: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    link: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to a backend
    console.log('Tool suggestion submitted:', formData);
    
    toast({
      title: "Suggestion Received!",
      description: "Thank you for suggesting a tool. We'll review it soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      link: '',
      email: ''
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-muted-foreground mb-6 animate-fade-in">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Suggest Tool</span>
          </div>
          
          {/* Page Header */}
          <div className="mb-12 animate-slide-up">
            <h1 className="text-3xl font-bold mb-4 flex items-center">
              <span className="bg-primary/10 text-primary rounded-full p-2 mr-3">
                <LightbulbIcon className="h-6 w-6" />
              </span>
              Suggest a Tool
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Know an awesome tool that should be included in our collection? Let us know! 
              Fill out the form below with details about the tool you'd like to suggest.
            </p>
          </div>
          
          {/* Suggestion Form */}
          <div className="max-w-2xl mx-auto glass-card p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Tool Name</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Enter the tool name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="Describe what this tool does"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="link">Tool Website (Optional)</Label>
                <Input 
                  id="link"
                  name="link"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.link}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  We'll notify you when your suggested tool is added.
                </p>
              </div>
              
              <Button type="submit" className="w-full">
                <SendIcon className="mr-2 h-4 w-4" />
                Submit Suggestion
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SuggestTool;
