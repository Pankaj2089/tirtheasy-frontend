'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import OwlCarousel only on client side
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

interface SafeOwlCarouselProps {
  children: React.ReactNode;
  className?: string;
  key?: string;
  [key: string]: any; // Allow any owl carousel options to be passed as props
}

// Helper function to check if jQuery is available
const isJQueryReady = (): boolean => {
  if (typeof window === 'undefined') return false;
  return typeof (window as any).jQuery !== 'undefined' && typeof (window as any).jQuery.fn !== 'undefined';
};

export default function SafeOwlCarousel({ children, className, key, ...owlCarouselProps }: SafeOwlCarouselProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if jQuery is available
    const checkJQuery = () => {
      if (isJQueryReady()) {
        setIsReady(true);
      } else {
        // Retry after a short delay
        setTimeout(checkJQuery, 100);
      }
    };

    // Initial check
    if (isJQueryReady()) {
      setIsReady(true);
    } else {
      // Wait for jQuery to load
      checkJQuery();
      
      // Fallback: set ready after max wait time (2 seconds)
      const timeout = setTimeout(() => {
        if (isJQueryReady()) {
          setIsReady(true);
        } else {
          console.warn('jQuery not available after timeout, OwlCarousel may not work correctly');
          setIsReady(true); // Still render to avoid blocking UI
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, []);

  if (!isReady) {
    // Return a placeholder while waiting for jQuery
    return <div className={className}>{children}</div>;
  }

  return (
    <OwlCarousel className={className} key={key} {...owlCarouselProps}>
      {children}
    </OwlCarousel>
  );
}

