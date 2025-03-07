
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { tools } from '@/data/tools';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  
  const tool = tools.find(t => t.id === toolId);
  
  // Find related tools from the same category
  const relatedTools = tool 
    ? tools
        .filter(t => t.category.id === tool.category.id && t.id !== tool.id)
        .slice(0, 3)
    : [];

  if (!tool) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <div className="glass-card p-8 text-center">
            <h1 className="text-2xl font-semibold mb-4">Tool Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The tool you're looking for doesn't exist.
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
            <Link to={`/categories/${tool.category.id}`} className="hover:text-primary">
              {tool.category.name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>{tool.name}</span>
          </div>
          
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          {/* Tool Header */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center mb-4">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mr-4",
                "bg-primary/10 text-primary dark:bg-primary/20"
              )}>
                <tool.icon className="w-6 h-6" />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold">{tool.name}</h1>
                <span className={cn(
                  "category-chip mt-1",
                  tool.category.color
                )}>
                  {tool.category.name}
                </span>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mt-4">
              {tool.description}
            </p>
          </div>
          
          {/* Tool Interface Placeholder */}
          <div className="glass-panel rounded-lg p-8 mb-12 animate-scale-in">
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-4">Tool Interface Coming Soon</h3>
              <p className="text-muted-foreground">
                This tool is under development and will be available soon.
              </p>
            </div>
          </div>
          
          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="mb-8 animate-slide-up">
              <h2 className="text-xl font-semibold mb-6">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedTools.map(relatedTool => (
                  <Link 
                    key={relatedTool.id} 
                    to={relatedTool.path}
                    className="tool-card"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                          <relatedTool.icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-medium">{relatedTool.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {relatedTool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolPage;
