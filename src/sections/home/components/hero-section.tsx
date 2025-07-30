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
    <div className="h-screen bg-gradient-to-b from-cream via-ivory to-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-light/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold-light/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-light/10 rounded-full blur-3xl"></div>
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
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gold-dark mb-4 font-light tracking-widest uppercase">
                Bienvenidos a Nuestra Boda
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-charcoal mb-6 leading-tight">
                <span className="font-light italic">Nuestra</span>
                <span className="block text-gold font-normal">
                  Boda
                </span>
              </h1>
              <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
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
                  <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-gold shadow-2xl mb-4">
                    <img src={couple.bride.photo} alt={couple.bride.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-28 sm:w-32 md:w-40 lg:w-48 xl:w-56 mx-auto px-2">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-charcoal font-light italic"
                      title={couple.bride.fullName}
                    >
                      {couple.bride.name}
                    </h3>
                  </div>
                </div>

                {/* Heart - Hidden on mobile, shown on larger screens */}
                <div className="hidden sm:block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gold animate-pulse flex-shrink-0">
                  &
                </div>

                {/* Heart for mobile - shown between bride and groom on mobile */}
                <div className="sm:hidden text-2xl text-gold my-4 font-serif">
                  &
                </div>

                {/* Groom */}
                <div className="text-center flex-shrink-0 justify-items-center">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-gold shadow-2xl mb-4">
                    <img src={couple.groom.photo} alt={couple.groom.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-28 sm:w-32 md:w-40 lg:w-48 xl:w-56 mx-auto px-2">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-charcoal font-light italic"
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
                className="bg-gold hover:bg-gold-dark text-white px-8 sm:px-10 py-3 sm:py-4 rounded-none font-light tracking-widest text-sm sm:text-base uppercase shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gold"
              >
                Confirmar Asistencia
              </motion.button>
              <motion.button
                onClick={() => onScrollToSection('details')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent backdrop-blur-sm text-charcoal px-8 sm:px-10 py-3 sm:py-4 rounded-none font-light tracking-widest text-sm sm:text-base uppercase shadow-lg hover:shadow-xl transition-all duration-300 border border-charcoal hover:bg-charcoal hover:text-ivory cursor-pointer"
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
              <div className="text-xs mb-1 sm:mb-2">
                Desliza hacia abajo
              </div>
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
