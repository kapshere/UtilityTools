
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Facebook, Instagram, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-t from-muted/60 to-muted/10 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Footer Top - Main sections */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-8 mb-10">
          <div className="space-y-4 md:col-span-5">
            <Link to="/" className="inline-block mb-2">
              <h3 className="text-2xl font-bold text-primary">UtilityTools</h3>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              A comprehensive collection of powerful web-based tools designed for developers, designers, writers, and professionals across all industries. Find everything you need in one place.
            </p>
            
            <div className="flex items-center space-x-2 pt-4">
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-md font-semibold mb-4 pb-1 border-b border-border">Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/all-tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link to="/all-tools?filter=featured" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Popular Tools
                </Link>
              </li>
              <li>
                <Link to="/all-tools?filter=new" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  New Tools
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom - Copyright & Links */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} UtilityTools. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <Link to="/accessibility" className="hover:text-primary transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer Banner */}
      <div className={cn(
        "w-full py-2.5 text-center text-sm",
        "bg-primary/10 text-primary/80 dark:text-primary/70"
      )}>
        Made with <Heart className="w-3 h-3 inline mx-1 text-red-500" /> by the UtilityTools Team
      </div>
    </footer>
  );
};

export default Footer;
