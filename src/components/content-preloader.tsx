'use client';

import { useEffect } from 'react';

export const ContentPreloader = () => {
  useEffect(() => {
    // Precargar imágenes críticas
    const criticalImages = [
      '/assets/images/bride-circle.png',
      '/assets/images/groom-circle.png',
      '/images/couple-hero.jpg',
      '/images/dress.png',
      '/images/tuxedo.png',
      // Precargar imágenes de la galería
      '/assets/images/gallery/Imagen de WhatsApp 2025-07-29 a las 12.35.30_7899bb7e.jpg',
      '/assets/images/gallery/Imagen de WhatsApp 2025-07-29 a las 12.35.31_0f71bb90.jpg',
      '/assets/images/gallery/Imagen de WhatsApp 2025-07-29 a las 12.35.31_64ce211c.jpg',
      '/assets/images/gallery/Imagen de WhatsApp 2025-07-29 a las 19.47.44_a0ee89fc.jpg',
    ];

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Precargar fuentes si es necesario
    const fonts = [
      'var(--font-lato)',
      'var(--font-cormorant)',
    ];

    // Forzar el cálculo de layout para prevenir reflows
    document.body.offsetHeight;
  }, []);

  return null;
};