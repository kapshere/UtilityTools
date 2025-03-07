
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Moon, Sun, LightbulbIcon, Grid3X3, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/all-tools?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 backdrop-blur-sm',
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-semibold"
          >
            <span className="text-primary">ToolHub</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
            <form onSubmit={handleSearch} className="relative w-64">
              <Input
                type="text"
                placeholder="Search tools..."
                className="pl-10 pr-4 py-2 rounded-full bg-secondary/50 border-none focus:ring-2 focus:ring-primary/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            </form>
            
            <nav className="flex items-center space-x-1 lg:space-x-2">
              <Link 
                to="/" 
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === "/" 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-secondary/80 hover:text-primary"
                )}
              >
                Home
              </Link>
              
              <Link 
                to="/categories" 
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === "/categories" 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-secondary/80 hover:text-primary"
                )}
              >
                Categories
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "px-3 py-2 h-auto font-medium",
                      location.pathname === "/all-tools" && "bg-primary/10 text-primary"
                    )}
                  >
                    Tools
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/all-tools">
                      <Grid3X3 className="w-4 h-4 mr-2" />
                      All Tools
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/popular">
                      <span className="w-4 h-4 mr-2">🔥</span>
                      Popular Tools
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/new">
                      <span className="w-4 h-4 mr-2">✨</span>
                      New Tools
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link 
                to="/suggest-tool" 
                className={cn(
                  "px-3 py-2 rounded-md text-sm flex items-center gap-1 transition-colors",
                  location.pathname === "/suggest-tool" 
                    ? "bg-primary/10 text-primary" 
                    : "text-primary hover:bg-secondary/80"
                )}
              >
                <LightbulbIcon className="w-4 h-4" />
                Suggest Tool
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
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t animate-slide-down overflow-hidden">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-4 relative">
              <Input
                type="text"
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary/50 border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Button 
                type="submit" 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full"
              >
                Go
              </Button>
            </form>
            
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center",
                  location.pathname === "/" 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-secondary/80"
                )}
              >
                Home
              </Link>
              
              <Link 
                to="/categories" 
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center",
                  location.pathname === "/categories" 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-secondary/80"
                )}
              >
                Categories
              </Link>
              
              <Link 
                to="/all-tools" 
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center",
                  location.pathname === "/all-tools" 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-secondary/80"
                )}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                All Tools
              </Link>
              
              <Link 
                to="/popular" 
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center",
                  location.pathname === "/popular" 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-secondary/80"
                )}
              >
                <span className="w-4 h-4 mr-2">🔥</span>
                Popular Tools
              </Link>
              
              <Link 
                to="/new" 
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center",
                  location.pathname === "/new" 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-secondary/80"
                )}
              >
                <span className="w-4 h-4 mr-2">✨</span>
                New Tools
              </Link>
              
              <Link 
                to="/suggest-tool" 
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm font-medium flex items-center gap-1 transition-colors",
                  location.pathname === "/suggest-tool" 
                    ? "bg-primary/10 text-primary" 
                    : "text-primary hover:bg-secondary/80"
                )}
              >
                <LightbulbIcon className="w-4 h-4" />
                Suggest Tool
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
