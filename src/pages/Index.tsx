
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryBar from '@/components/layout/CategoryBar';
import ToolsGrid from '@/components/ui/ToolsGrid';
import CategoryCard from '@/components/ui/CategoryCard';
import HeroCarousel from '@/components/ui/HeroCarousel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { tools, categories } from '@/data/tools';
import { Search, Star, TrendingUp, Clock, Grid3X3 } from 'lucide-react';

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
      navigate(`/all-tools?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-16 pb-10">
        {/* Hero Carousel Section */}
        <section className="relative overflow-hidden">
          <HeroCarousel />
          
          <div className="absolute bottom-20 left-0 right-0 z-20 px-4">
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
              <Input
                type="text"
                placeholder="Search for tools..."
                className="search-input pl-10 pr-20 py-6 rounded-full shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                type="submit"
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 rounded-full"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>
        </section>
        
        {/* Categories Bar */}
        <section id="categories" className="py-8 container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                <Star className="h-4 w-4" />
              </span>
              Browse Categories
            </h2>
            <Link 
              to="/categories"
              className="text-sm text-primary hover:underline flex items-center"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <CategoryBar />
        </section>
        
        {/* Featured Tools */}
        <section className="py-8 container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-heading flex items-center">
              <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 rounded-full p-1 mr-2">
                <Star className="h-4 w-4" />
              </span>
              Featured Tools
            </h2>
            <Link 
              to="/all-tools"
              className="text-sm text-primary hover:underline flex items-center"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <ToolsGrid tools={featuredTools} />
        </section>
        
        {/* New Tools */}
        <section className="py-8 container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-heading flex items-center">
              <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 rounded-full p-1 mr-2">
                <Clock className="h-4 w-4" />
              </span>
              New Tools
            </h2>
            <Link 
              to="/new"
              className="text-sm text-primary hover:underline flex items-center"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <ToolsGrid tools={newTools} />
        </section>
        
        {/* All Categories */}
        <section className="py-8 container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-heading flex items-center">
              <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                <TrendingUp className="h-4 w-4" />
              </span>
              All Categories
            </h2>
            <Link 
              to="/categories"
              className="text-sm text-primary hover:underline flex items-center"
            >
              View All Categories
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryToolCounts.slice(0, 6).map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                toolCount={category.toolCount}
              />
            ))}
          </div>
          {categoryToolCounts.length > 6 && (
            <div className="text-center mt-8">
              <Button asChild>
                <Link to="/categories">
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  View All Categories
                </Link>
              </Button>
            </div>
          )}
        </section>
        
        {/* All Tools CTA */}
        <section className="py-8 container mx-auto px-4">
          <div className="glass-card p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Explore Our Complete Collection</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Browse our full library of {tools.length} productivity tools to find exactly what you need.
            </p>
            <Button asChild size="lg">
              <Link to="/all-tools">
                <Grid3X3 className="w-4 h-4 mr-2" />
                View All Tools
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
