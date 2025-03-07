
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
import { Search, Star, TrendingUp, Clock, Grid3X3, ChevronRight, FileText, Briefcase } from 'lucide-react';

const Index: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const featuredTools = tools.filter(tool => tool.featured);
  const newTools = tools.filter(tool => tool.new);
  const pdfTools = tools.filter(tool => 
    tool.category.id === "files" && 
    (tool.name.toLowerCase().includes("pdf") || tool.description.toLowerCase().includes("pdf"))
  );
  const businessTools = tools.filter(tool => 
    tool.category.id === "finance" || 
    tool.category.id === "analytics" ||
    tool.name.toLowerCase().includes("business") || 
    tool.description.toLowerCase().includes("business")
  );

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
          
          <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-0 right-0 z-20 px-4">
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
              <Input
                type="text"
                placeholder="Search for tools..."
                className="search-input pl-10 pr-16 sm:pr-20 py-4 sm:py-6 rounded-full shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                type="submit"
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 rounded-full text-xs sm:text-sm"
              >
                <Search className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Search</span>
              </Button>
            </form>
          </div>
        </section>
        
        {/* Categories Bar */}
        <section id="categories" className="py-6 sm:py-8 container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center">
              <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              </span>
              Browse Categories
            </h2>
            <Link 
              to="/categories"
              className="text-xs sm:text-sm text-primary hover:underline flex items-center"
            >
              View All
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            </Link>
          </div>
          <CategoryBar />
        </section>
        
        {/* Featured Tools */}
        <section className="py-6 sm:py-8 container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-heading text-lg sm:text-xl lg:text-2xl flex items-center">
              <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 rounded-full p-1 mr-2">
                <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              </span>
              Featured Tools
            </h2>
            <Link 
              to="/all-tools"
              className="text-xs sm:text-sm text-primary hover:underline flex items-center"
            >
              View All
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            </Link>
          </div>
          <ToolsGrid tools={featuredTools} />
        </section>
        
        {/* New Tools */}
        <section className="py-6 sm:py-8 container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-heading text-lg sm:text-xl lg:text-2xl flex items-center">
              <span className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 rounded-full p-1 mr-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              </span>
              New Tools
            </h2>
            <Link 
              to="/new"
              className="text-xs sm:text-sm text-primary hover:underline flex items-center"
            >
              View All
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            </Link>
          </div>
          <ToolsGrid tools={newTools} />
        </section>
        
        {/* PDF Tools */}
        <section className="py-6 sm:py-8 container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-heading text-lg sm:text-xl lg:text-2xl flex items-center">
              <span className="bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 rounded-full p-1 mr-2">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              </span>
              PDF Tools
            </h2>
            <Link 
              to="/all-tools?category=files"
              className="text-xs sm:text-sm text-primary hover:underline flex items-center"
            >
              View All
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            </Link>
          </div>
          <ToolsGrid tools={pdfTools.length > 0 ? pdfTools : tools.filter(tool => tool.category.id === "files").slice(0, 4)} />
        </section>
        
        {/* Business Tools */}
        <section className="py-6 sm:py-8 container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-heading text-lg sm:text-xl lg:text-2xl flex items-center">
              <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 rounded-full p-1 mr-2">
                <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
              </span>
              Business Tools
            </h2>
            <Link 
              to="/all-tools?category=finance"
              className="text-xs sm:text-sm text-primary hover:underline flex items-center"
            >
              View All
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            </Link>
          </div>
          <ToolsGrid tools={businessTools.length > 0 ? businessTools : tools.filter(tool => tool.category.id === "finance").slice(0, 4)} />
        </section>
        
        {/* All Categories */}
        <section className="py-6 sm:py-8 container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-heading text-lg sm:text-xl lg:text-2xl flex items-center">
              <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              </span>
              All Categories
            </h2>
            <Link 
              to="/categories"
              className="text-xs sm:text-sm text-primary hover:underline flex items-center"
            >
              View All Categories
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categoryToolCounts.slice(0, 6).map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                toolCount={category.toolCount}
              />
            ))}
          </div>
          {categoryToolCounts.length > 6 && (
            <div className="text-center mt-6 sm:mt-8">
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
        <section className="py-6 sm:py-8 container mx-auto px-4">
          <div className="glass-card p-4 sm:p-8 rounded-lg text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Explore Our Complete Collection</h2>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
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
