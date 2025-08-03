'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Heart, Plane, Flower2, Gem, Users, PartyPopper, Camera } from 'lucide-react';

export const GalleryPreview = () => {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Mock gallery images
  const galleryImages = [
    {
      id: 1,
      category: 'engagement',
      emoji: 'Heart',
      description: 'Nuestro Compromiso',
    },
    {
      id: 2,
      category: 'travel',
      emoji: 'Plane',
      description: 'Aventuras Juntos',
    },
    {
      id: 3,
      category: 'date',
      emoji: 'Flower2',
      description: 'Primeras Citas',
    },
    {
      id: 4,
      category: 'proposal',
      emoji: 'Gem',
      description: 'La Propuesta',
    },
    {
      id: 5,
      category: 'family',
      emoji: 'Users',
      description: 'Con la Familia',
    },
    {
      id: 6,
      category: 'friends',
      emoji: 'PartyPopper',
      description: 'Con Amigos',
    },
  ];

  return (
    <div
      ref={ref}
      className="py-20 px-4 bg-background dark:bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-4 font-light">
            Nuestra Historia de Amor
          </h2>
          <div className="w-24 h-px bg-gray-300 dark:bg-gray-700 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto font-light">
            Un vistazo a los momentos que nos han traído hasta aquí
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              {/* Image placeholder with emoji */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 dark:from-gray-700/50 dark:to-gray-800/50 flex items-center justify-center">
                <span className="opacity-50 group-hover:scale-110 transition-transform duration-300">
                  {(() => {
                    const iconMap = {
                      Heart: Heart,
                      Plane: Plane,
                      Flower2: Flower2,
                      Gem: Gem,
                      Users: Users,
                      PartyPopper: PartyPopper
                    };

                    const IconComponent = iconMap[image.emoji as keyof typeof iconMap];

                    return IconComponent ? <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 text-gray-600 dark:text-gray-400" /> : null;
                  })()}
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
          <button className="bg-transparent text-foreground/70 px-8 py-3 rounded-full font-light shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white group text-sm sm:text-base tracking-wider">
            <span className="flex items-center space-x-2">
              <span>Ver Galería Completa</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                <motion.span
                  animate={{
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="inline-block"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.span>
              </span>
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
