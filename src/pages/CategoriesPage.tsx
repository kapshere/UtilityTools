
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { categories } from '@/data/tools';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CategoryCard from '@/components/ui/CategoryCard';

const CategoriesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-10">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">All Categories</h1>
            <p className="text-muted-foreground max-w-2xl">
              Browse all tool categories available on our platform. Find the perfect tools for your needs organized by category.
            </p>
          </div>
          
          {/* Search Input */}
          <div className="mb-8 relative max-w-xl animate-slide-up">
            <Input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-6 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          </div>
          
          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <CategoryCard 
                  key={category.id} 
                  category={category}
                  toolCount={0}
                />
              ))
            ) : (
              <div className="col-span-full text-center p-8 glass-card">
                <p className="text-muted-foreground">No categories found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
