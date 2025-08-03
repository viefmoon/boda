'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';

interface HeroSectionProps {
  isLoaded: boolean;
  couple: WeddingConfigType;
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection = ({
  isLoaded,
  couple,
  onScrollToSection,
}: HeroSectionProps) => {

  return (
    <div className="h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-100/20 to-purple-100/20 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-10 sm:pt-18 md:pt-20">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground mb-4 font-normal tracking-[0.3em] uppercase">
                Nos casamos
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-foreground mb-6 leading-tight font-normal">
                <span className="font-normal text-foreground">Nuestra</span>
                <span className="block text-gray-700 dark:text-gray-300 font-medium">
                  Boda
                </span>
              </h1>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mx-auto"></div>
            </motion.div>

            {/* Couple Photos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-4 sm:mb-6">
                {/* Bride */}
                <div className="text-center flex-shrink-0 justify-items-center">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl mb-4">
                    <img src={couple.bride.photo} alt={couple.bride.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-28 sm:w-32 md:w-40 lg:w-48 xl:w-56 mx-auto px-2">
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground font-light italic"
                      title={couple.bride.fullName}
                    >
                      {couple.bride.name}
                    </h3>
                  </div>
                </div>

                {/* Heart - Hidden on mobile, shown on larger screens */}
                <div className="hidden sm:block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-400 dark:text-gray-600 font-serif font-normal flex-shrink-0">
                  &
                </div>

                {/* Heart for mobile - shown between bride and groom on mobile */}
                <div className="sm:hidden text-2xl text-gray-400 dark:text-gray-600 my-4 font-serif font-normal">
                  &
                </div>

                {/* Groom */}
                <div className="text-center flex-shrink-0 justify-items-center">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl mb-4">
                    <img src={couple.groom.photo} alt={couple.groom.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-28 sm:w-32 md:w-40 lg:w-48 xl:w-56 mx-auto px-2">
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground font-light italic"
                      title={couple.groom.fullName}
                    >
                      {couple.groom.name}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <motion.button
                onClick={() => onScrollToSection('rsvp')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium tracking-[0.2em] text-sm sm:text-base uppercase shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                Confirmar Asistencia
              </motion.button>
              <motion.button
                onClick={() => onScrollToSection('details')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-foreground px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium tracking-[0.2em] text-sm sm:text-base uppercase transition-all duration-300 border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white cursor-pointer"
              >
                Ver Detalles
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center pb-6 sm:pb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="z-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-600 text-center cursor-pointer"
              onClick={() => onScrollToSection('couple')}
            >
              <div className="text-xs mb-1 sm:mb-2 text-foreground/70">
                Desliza hacia abajo
              </div>
              <svg className="w-6 h-6 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Remove the old absolute positioned scroll indicator */}
    </div>
  );
};
