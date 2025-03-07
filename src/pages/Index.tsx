
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryBar from '@/components/layout/CategoryBar';
import ToolsGrid from '@/components/ui/ToolsGrid';
import CategoryCard from '@/components/ui/CategoryCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { tools, categories } from '@/data/tools';
import { Search, Star, TrendingUp, Clock } from 'lucide-react';

const Index: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const featuredTools = tools.filter(tool => tool.featured);
  const newTools = tools.filter(tool => tool.new);

  // Calculate tool count per category
  const categoryToolCounts = categories.map(category => ({
    ...category,
    toolCount: tools.filter(tool => tool.category.id === category.id).length
  }));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16 pb-10">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-secondary/50 to-background py-20 px-4 overflow-hidden">
          <div 
            className="absolute inset-0 bg-grid-pattern opacity-10" 
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M0 0h20v20H0z\'/%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '20px 20px'
            }}
          />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              All the tools you need,
              <br />
              <span className="text-primary">beautifully crafted</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              A collection of 50+ essential web tools designed with simplicity and elegance.
              Everything you need in one place.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
              <Input
                type="text"
                placeholder="Search for tools..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                type="submit"
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 rounded-md"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>
        </section>
        
        {/* Categories Bar */}
        <section className="py-8 container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
              <Star className="h-4 w-4" />
            </span>
            Browse Categories
          </h2>
          <CategoryBar />
        </section>
        
        {/* Featured Tools */}
        <section className="py-8 container mx-auto px-4">
          <h2 className="section-heading flex items-center">
            <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 rounded-full p-1 mr-2">
              <Star className="h-4 w-4" />
            </span>
            Featured Tools
          </h2>
          <ToolsGrid tools={featuredTools} />
        </section>
        
        {/* New Tools */}
        <section className="py-8 container mx-auto px-4">
          <h2 className="section-heading flex items-center">
            <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 rounded-full p-1 mr-2">
              <Clock className="h-4 w-4" />
            </span>
            New Tools
          </h2>
          <ToolsGrid tools={newTools} />
        </section>
        
        {/* All Categories */}
        <section className="py-8 container mx-auto px-4">
          <h2 className="section-heading flex items-center">
            <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
              <TrendingUp className="h-4 w-4" />
            </span>
            All Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryToolCounts.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                toolCount={category.toolCount}
              />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
