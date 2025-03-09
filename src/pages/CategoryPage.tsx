
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ToolsGrid from '@/components/ui/ToolsGrid';
import { tools, categories } from '@/data/tools';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = useMemo(() => {
    return categories.find(c => c.id === categoryId);
  }, [categoryId]);
  
  const categoryTools = useMemo(() => {
    return tools.filter(tool => tool.category.id === categoryId);
  }, [categoryId]);

  if (!category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <div className="glass-card p-8 text-center">
            <h1 className="text-2xl font-semibold mb-4">Category Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The category you're looking for doesn't exist.
            </p>
            <Link to="/" className="text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <Link to="/categories" className="hover:text-primary">
              Categories
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>{category.name}</span>
          </div>
          
          {/* Category Header */}
          <div className="mb-12 animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center",
                category.color
              )}>
                <category.icon className="w-8 h-8" />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold">{category.name} Tools</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mt-2">
                  {category.description}
                </p>
              </div>
            </div>
            
            <div className="h-1 w-full bg-gradient-to-r from-primary/50 to-transparent rounded-full"></div>
          </div>
          
          {/* Tools Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <span className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                "bg-primary/10 text-primary"
              )}>
                <category.icon className="w-4 h-4" />
              </span>
              All {category.name} Tools ({categoryTools.length})
            </h2>
            
            {categoryTools.length > 0 ? (
              <ToolsGrid tools={categoryTools} className="animate-fade-in" />
            ) : (
              <div className="glass-card p-8 text-center">
                <p className="text-muted-foreground">
                  No tools available in this category yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
