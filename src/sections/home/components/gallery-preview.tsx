'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

export const GalleryPreview = () => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    // Lista estática de imágenes - actualiza esta lista cuando agregues nuevas fotos
    const imageFiles = [
      'Imagen de WhatsApp 2025-07-29 a las 12.35.30_7899bb7e.jpg',
      'Imagen de WhatsApp 2025-07-29 a las 12.35.31_0f71bb90.jpg',
      'Imagen de WhatsApp 2025-07-29 a las 12.35.31_64ce211c.jpg',
      'Imagen de WhatsApp 2025-07-29 a las 19.47.44_a0ee89fc.jpg',
    ];

    setGalleryImages(imageFiles);
  }, []);

  return (
    <div
      ref={ref}
      className="py-8 px-4 bg-background dark:bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground mb-3 font-light">
            Nuestra Historia de Amor
          </h2>
          <div className="w-16 h-px bg-accent/30 mx-auto mb-4"></div>
          <p className="text-sm text-text-primary dark:text-white max-w-xl mx-auto font-light">
            Un vistazo a los momentos que nos han traído hasta aquí
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((imageName, index) => (
            <motion.div
              key={`gallery-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="group relative aspect-square bg-card-bg rounded-xl shadow-md overflow-hidden border border-card-border hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Actual Image */}
              <img
                src={`/assets/images/gallery/${imageName}`}
                alt={`Memoria ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="eager"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs sm:text-sm md:text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    Memoria {index + 1}
                  </p>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};