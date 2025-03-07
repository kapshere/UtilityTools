
import { useState, useEffect } from 'react';

export type IntersectionOptions = {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
};

// Hook to detect when an element is visible in viewport
export const useIntersectionObserver = (
  options: IntersectionOptions = {}
) => {
  const [ref, setRef] = useState<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
      root: options.root || null,
    });

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, options.threshold, options.rootMargin, options.root]);

  return { ref: setRef, isVisible };
};

// Class names for staggered animation
export const staggeredAnimation = (
  index: number, 
  baseClass: string, 
  delay: number = 50
) => {
  return `${baseClass} animate-delay-${index * delay}`;
};

// Page transition animation
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
};
