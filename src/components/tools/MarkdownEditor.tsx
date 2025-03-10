
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, FileText, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is a **markdown** editor.\n\n- List item 1\n- List item 2\n\n[Link example](https://example.com)\n\n```js\nconsole.log("Code block example");\n```');
  const [html, setHtml] = useState('');
  const { toast } = useToast();

  // Simple markdown to HTML converter
  const convertMarkdownToHtml = (markdown: string) => {
    let html = markdown
      // Headers
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Lists
      .replace(/^\- (.*)$/gm, '<li>$1</li>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Horizontal rule
      .replace(/^\-\-\-$/gm, '<hr>')
      // Blockquotes
      .replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>')
      // Paragraphs - must be last
      .replace(/^(?!<h|<li|<pre|<blockquote|<hr)(.*)$/gm, '<p>$1</p>');
    
    // Wrap lists
    html = html.replace(/<li>(.*?)<\/li>/g, function(match) {
      return '<ul>' + match + '</ul>';
    }).replace(/<\/ul><ul>/g, '');
    
    return html;
  };

  useEffect(() => {
    setHtml(convertMarkdownToHtml(markdown));
  }, [markdown]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    toast({
      title: 'Markdown Copied!',
      description: 'Markdown content has been copied to clipboard.',
    });
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    toast({
      title: 'Downloaded!',
      description: 'Markdown file has been downloaded.',
    });
  };

  const handleHtmlDownload = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    toast({
      title: 'Downloaded!',
      description: 'HTML file has been downloaded.',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">Markdown Editor</h2>
      <p className="text-lg text-muted-foreground">
        Edit Markdown on the left and see the rendered preview on the right. Download your work when you're done.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Markdown Editor</h3>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button size="sm" variant="outline" onClick={handleDownload} className="download-button">
                <Download className="h-4 w-4 mr-2" />
                Download .md
              </Button>
            </div>
          </div>
          
          <Card className="p-4">
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="min-h-[500px] font-mono text-sm"
              placeholder="Type your markdown here..."
            />
          </Card>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Preview</h3>
            <Button size="sm" variant="outline" onClick={handleHtmlDownload} className="download-button">
              <FileText className="h-4 w-4 mr-2" />
              Download HTML
            </Button>
          </div>
          
          <Card className={cn("p-6 min-h-[500px] overflow-auto bg-white dark:bg-gray-900")}>
            <div 
              className="markdown-preview prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Card>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button size="lg" onClick={handleDownload} className="download-button">
          <Save className="h-5 w-5 mr-2" />
          Save Your Document
        </Button>
      </div>
    </div>
  );
};

export default MarkdownEditor;
