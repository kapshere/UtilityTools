
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
            <div className="flex items-center mb-4">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mr-4",
                category.color
              )}>
                <category.icon className="w-6 h-6" />
              </div>
              
              <h1 className="text-3xl font-bold">{category.name} Tools</h1>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              {category.description}
            </p>
          </div>
          
          {/* Tools Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6">
              All {category.name} Tools ({categoryTools.length})
            </h2>
            
            {categoryTools.length > 0 ? (
              <ToolsGrid tools={categoryTools} />
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
