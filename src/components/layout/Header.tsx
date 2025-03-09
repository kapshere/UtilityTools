
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Moon, Sun, LightbulbIcon, Grid3X3, ChevronDown, LifeBuoy, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useFavorites } from '@/hooks/use-favorites';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const hasFavoriteItems = favorites.length > 0;

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  useEffect(() => {
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
                <DropdownMenuContent align="end" className="w-60">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/all-tools">
                        <Grid3X3 className="w-4 h-4 mr-2" />
                        All Tools
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/tool-category/pdf">
                        <span className="w-4 h-4 mr-2 text-red-500">📄</span>
                        PDF Tools
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tool-category/image">
                        <span className="w-4 h-4 mr-2 text-blue-500">🖼️</span>
                        Image Tools
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tool-category/text">
                        <span className="w-4 h-4 mr-2 text-purple-500">📝</span>
                        Text Tools
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tool-category/calculators">
                        <span className="w-4 h-4 mr-2 text-amber-500">🧮</span>
                        Calculators
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tool-category/ai">
                        <span className="w-4 h-4 mr-2 text-emerald-500">🤖</span>
                        AI Tools
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tool-category/utility">
                        <span className="w-4 h-4 mr-2 text-cyan-500">🔧</span>
                        Utility Tools
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tool-category/security">
                        <span className="w-4 h-4 mr-2 text-gray-700">🔒</span>
                        Security Tools
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tool-category/games">
                        <span className="w-4 h-4 mr-2 text-pink-500">🎮</span>
                        Game Tools
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/categories">
                        <span className="w-4 h-4 mr-2">🗂️</span>
                        Categories
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link 
                to="/favorites" 
                className={cn(
                  "px-3 py-2 rounded-md text-sm flex items-center gap-1 transition-colors relative",
                  location.pathname === "/favorites" 
                    ? "bg-primary/10 text-primary" 
                    : "text-primary hover:bg-secondary/80"
                )}
              >
                <Heart className={cn("w-4 h-4", hasFavoriteItems && "fill-red-500 text-red-500")} />
                Favorites
                {hasFavoriteItems && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>
              
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
              
              <Link 
                to="/support" 
                className={cn(
                  "px-3 py-2 rounded-md text-sm flex items-center gap-1 transition-colors",
                  location.pathname === "/support" 
                    ? "bg-primary/10 text-primary" 
                    : "text-primary hover:bg-secondary/80"
                )}
              >
                <LifeBuoy className="w-4 h-4" />
                Support
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
            <Link 
              to="/favorites" 
              className="relative mr-2"
            >
              <Button 
                variant="ghost" 
                size="icon"
                className={cn(
                  location.pathname === "/favorites" && "bg-primary/10"
                )}
              >
                <Heart className={cn("h-5 w-5", hasFavoriteItems && "fill-red-500 text-red-500")} />
              </Button>
              {hasFavoriteItems && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            
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
              
              <div className="px-3 py-2 text-sm font-medium text-foreground">Tool Categories</div>
              
              <Link 
                to="/tool-category/pdf" 
                className="pl-6 py-2 text-sm flex items-center text-muted-foreground hover:text-foreground"
              >
                <span className="w-4 h-4 mr-2 text-red-500">📄</span>
                PDF Tools
              </Link>
              
              <Link 
                to="/tool-category/image" 
                className="pl-6 py-2 text-sm flex items-center text-muted-foreground hover:text-foreground"
              >
                <span className="w-4 h-4 mr-2 text-blue-500">🖼️</span>
                Image Tools
              </Link>
              
              <Link 
                to="/tool-category/text" 
                className="pl-6 py-2 text-sm flex items-center text-muted-foreground hover:text-foreground"
              >
                <span className="w-4 h-4 mr-2 text-purple-500">📝</span>
                Text Tools
              </Link>
              
              <Link 
                to="/tool-category/calculators" 
                className="pl-6 py-2 text-sm flex items-center text-muted-foreground hover:text-foreground"
              >
                <span className="w-4 h-4 mr-2 text-amber-500">🧮</span>
                Calculators
              </Link>
              
              <Link 
                to="/tool-category/ai" 
                className="pl-6 py-2 text-sm flex items-center text-muted-foreground hover:text-foreground"
              >
                <span className="w-4 h-4 mr-2 text-emerald-500">🤖</span>
                AI Tools
              </Link>
              
              <Link 
                to="/tool-category/utility" 
                className="pl-6 py-2 text-sm flex items-center text-muted-foreground hover:text-foreground"
              >
                <span className="w-4 h-4 mr-2 text-cyan-500">🔧</span>
                Utility Tools
              </Link>
              
              <Link 
                to="/tool-category/security" 
                className="pl-6 py-2 text-sm flex items-center text-muted-foreground hover:text-foreground"
              >
                <span className="w-4 h-4 mr-2 text-gray-700">🔒</span>
                Security Tools
              </Link>
              
              <Link 
                to="/tool-category/games" 
                className="pl-6 py-2 text-sm flex items-center text-muted-foreground hover:text-foreground"
              >
                <span className="w-4 h-4 mr-2 text-pink-500">🎮</span>
                Game Tools
              </Link>
              
              <div className="border-t my-2"></div>
              
              <Link 
                to="/favorites" 
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center",
                  location.pathname === "/favorites" 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-secondary/80"
                )}
              >
                <Heart className={cn("w-4 h-4 mr-2", hasFavoriteItems && "fill-red-500 text-red-500")} />
                Favorites
                {hasFavoriteItems && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {favorites.length}
                  </span>
                )}
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
              
              <Link 
                to="/support" 
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm font-medium flex items-center gap-1 transition-colors",
                  location.pathname === "/support" 
                    ? "bg-primary/10 text-primary" 
                    : "text-primary hover:bg-secondary/80"
                )}
              >
                <LifeBuoy className="w-4 h-4" />
                Support
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
