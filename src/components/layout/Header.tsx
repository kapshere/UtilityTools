
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMobile } from '@/hooks/use-mobile';
import { useAdmin } from '@/hooks/useAdmin';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Home, 
  Grid3X3, 
  Heart, 
  Search, 
  HelpCircle, 
  Settings, 
  MoonStar, 
  Sun,
  ShieldCheck
} from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const location = useLocation();
  const isMobile = useMobile();
  const { isAdmin } = useAdmin();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { icon: <Home size={16} />, text: 'Home', path: '/' },
    { icon: <Grid3X3 size={16} />, text: 'All Tools', path: '/all-tools' },
    { icon: <Grid3X3 size={16} />, text: 'Categories', path: '/categories' },
    { icon: <Heart size={16} />, text: 'Favorites', path: '/favorites' },
    { icon: <HelpCircle size={16} />, text: 'Support', path: '/support' },
  ];

  if (isAdmin) {
    navItems.push({ icon: <ShieldCheck size={16} />, text: 'Admin', path: '/admin' });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 shadow-sm backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl">Tools<span className="text-primary">Hub</span></span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={closeMenu}
              >
                <Button 
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  size={isMobile ? "sm" : "default"}
                  className={cn(
                    "transition-all",
                    isActive(item.path) 
                      ? "font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.text}</span>
                  </span>
                </Button>
              </Link>
            ))}
          </nav>

          {/* User actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <MoonStar size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 pb-4 space-y-2 animate-slide-down">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={closeMenu} 
                className={cn(
                  "block px-3 py-2 rounded-md w-full text-sm font-medium",
                  isActive(item.path) 
                    ? "bg-primary-foreground text-primary" 
                    : "text-gray-600 hover:bg-secondary dark:text-gray-300"
                )}
              >
                <span className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.text}</span>
                </span>
              </Link>
            ))}
            
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-medium">Dark Mode</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <MoonStar size={20} />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
