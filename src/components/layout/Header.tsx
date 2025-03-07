
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when navigating
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode ? 'true' : 'false');
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 backdrop-blur-sm',
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <span className="text-primary">ToolHub</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search tools..."
              className="pl-10 pr-4 py-2 rounded-full bg-secondary/50 border-none focus:ring-2 focus:ring-primary/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/popular" className="text-sm font-medium hover:text-primary transition-colors">
              Popular
            </Link>
            <Link to="/new" className="text-sm font-medium hover:text-primary transition-colors">
              New
            </Link>
          </nav>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDark ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>

        <div className="flex md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleDarkMode}
            className="mr-2"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t animate-slide-down">
          <div className="container mx-auto px-4 py-4">
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary/50 border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-7 top-[4.7rem] transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            </div>
            
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-sm font-medium hover:text-primary px-2 py-1 rounded-md hover:bg-secondary/50 transition-colors">
                Home
              </Link>
              <Link to="/categories" className="text-sm font-medium hover:text-primary px-2 py-1 rounded-md hover:bg-secondary/50 transition-colors">
                Categories
              </Link>
              <Link to="/popular" className="text-sm font-medium hover:text-primary px-2 py-1 rounded-md hover:bg-secondary/50 transition-colors">
                Popular
              </Link>
              <Link to="/new" className="text-sm font-medium hover:text-primary px-2 py-1 rounded-md hover:bg-secondary/50 transition-colors">
                New
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
