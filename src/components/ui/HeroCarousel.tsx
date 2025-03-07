
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SlideProps {
  title: string;
  subtitle: string;
  bgColor: string;
  icon: React.ElementType;
  buttonText: string;
  buttonLink: string;
}

const slides: SlideProps[] = [
  {
    title: "All the tools you need",
    subtitle: "A collection of 50+ essential web tools designed with simplicity and elegance.",
    bgColor: "from-blue-600/50 to-violet-500/50",
    icon: Star,
    buttonText: "Explore Tools",
    buttonLink: "#categories"
  },
  {
    title: "Powerful & Fast",
    subtitle: "Lightning-fast tools that work directly in your browser with no installations required.",
    bgColor: "from-amber-600/50 to-rose-500/50",
    icon: Zap,
    buttonText: "See Popular Tools",
    buttonLink: "/popular"
  },
  {
    title: "Find the perfect tool",
    subtitle: "Search through our extensive collection to find exactly what you need.",
    bgColor: "from-emerald-600/50 to-teal-500/50",
    icon: Search,
    buttonText: "Browse Categories",
    buttonLink: "/categories"
  }
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  return (
    <div className="relative overflow-hidden h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px]">
      {slides.map((slide, index) => {
        const Icon = slide.icon;
        return (
          <div
            key={index}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-1000 p-4",
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-b",
                slide.bgColor,
                "opacity-20"
              )}
            />
            <div 
              className="absolute inset-0 bg-grid-pattern opacity-10" 
              style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M0 0h20v20H0z\'/%3E%3C/g%3E%3C/svg%3E")',
                backgroundSize: '20px 20px'
              }}
            />
            
            <div className="relative z-20 text-center max-w-4xl mx-auto animate-fade-in px-4">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className={cn(
                  "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center",
                  "bg-primary/10 text-primary"
                )}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 sm:mb-4">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
                {slide.subtitle}
              </p>
              
              <Button asChild size="lg" className="rounded-full px-4 sm:px-6 transition-transform hover:scale-105">
                <a href={slide.buttonLink}>
                  {slide.buttonText}
                </a>
              </Button>
            </div>
          </div>
        );
      })}
      
      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 rounded-full bg-background/50 hover:bg-background/80 w-8 h-8 sm:w-10 sm:h-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 rounded-full bg-background/50 hover:bg-background/80 w-8 h-8 sm:w-10 sm:h-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentSlide === index 
                ? "bg-primary w-4 sm:w-6" 
                : "bg-primary/30 hover:bg-primary/50"
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
