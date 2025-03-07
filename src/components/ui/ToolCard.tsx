
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { ToolType } from '@/data/tools';
import { Badge } from '@/components/ui/badge';

interface ToolCardProps {
  tool: ToolType;
  className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, className }) => {
  return (
    <Link 
      to={tool.path}
      className={cn(
        "tool-card group animate-scale-in", 
        className
      )}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            "bg-primary/10 text-primary dark:bg-primary/20 group-hover:bg-primary/20",
            "transition-all duration-300"
          )}>
            <tool.icon className="w-5 h-5" />
          </div>
          <div className="flex items-center space-x-2">
            {tool.new && (
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 hover:bg-green-200 transition-colors">
                New
              </Badge>
            )}
            {tool.featured && (
              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 hover:bg-amber-200 transition-colors">
                Featured
              </Badge>
            )}
            <span className={cn(
              "category-chip",
              tool.category.color
            )}>
              {tool.category.name}
            </span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {tool.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">
          {tool.description}
        </p>
        
        <div className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-auto">
          <span>Open Tool</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="transition-transform duration-300 transform group-hover:translate-x-1"
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
