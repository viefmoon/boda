'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

export const GalleryPreview = () => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Mock gallery images
  const galleryImages = [
    {
      id: 1,
      category: 'engagement',
      emoji: '💕',
      description: t('gallery.engagement'),
    },
    {
      id: 2,
      category: 'travel',
      emoji: '✈️',
      description: t('gallery.travel'),
    },
    {
      id: 3,
      category: 'date',
      emoji: '🌹',
      description: t('gallery.date'),
    },
    {
      id: 4,
      category: 'proposal',
      emoji: '💍',
      description: t('gallery.proposal'),
    },
    {
      id: 5,
      category: 'family',
      emoji: '👨‍👩‍👧‍👦',
      description: t('gallery.family'),
    },
    {
      id: 6,
      category: 'friends',
      emoji: '🎉',
      description: t('gallery.friends'),
    },
  ];

  return (
    <div
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-rose-50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            {t('gallery.journey-title')}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('gallery.journey-subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image placeholder with emoji */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                  {image.emoji}
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs sm:text-sm md:text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {image.description}
                  </p>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="bg-white text-gray-700 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-rose-300 group text-sm sm:text-base">
            <span className="flex items-center space-x-2">
              <span>{t('gallery.view-full')}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                📸
              </span>
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
