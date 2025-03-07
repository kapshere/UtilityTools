
import React from 'react';
import ToolCard from './ToolCard';
import type { ToolType } from '@/data/tools';
import { cn } from '@/lib/utils';

interface ToolsGridProps {
  tools: ToolType[];
  className?: string;
}

const ToolsGrid: React.FC<ToolsGridProps> = ({ tools, className }) => {
  return (
    <div className={cn("tool-grid", className)}>
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
};

export default ToolsGrid;
