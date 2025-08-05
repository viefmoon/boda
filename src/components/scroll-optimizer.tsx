'use client';

import { useEffect } from 'react';

export const ScrollOptimizer = () => {
  useEffect(() => {
    // Solo optimizar imágenes lazy loading nativas
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      
      images.forEach(img => {
        (img as HTMLImageElement).loading = 'lazy';
      });
    }
  }, []);
  
  return null;
};