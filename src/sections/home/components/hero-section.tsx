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
    <div className="h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/couple-hero.jpg" 
          alt="Sofía y Oswaldo" 
          className="w-full h-full object-cover object-top"
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70"></div>
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
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 font-normal tracking-[0.3em] uppercase">
                Nos casamos
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight font-normal">
                <span className="font-normal text-white/90">Nuestra</span>
                <span className="block text-white font-medium">
                  Boda
                </span>
              </h1>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
            </motion.div>

            {/* Couple Names */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-8 sm:mb-10"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
                <span className="block mb-2">{couple.bride.name}</span>
                <span className="text-xl sm:text-2xl md:text-3xl font-light">&</span>
                <span className="block mt-2">{couple.groom.name}</span>
              </h2>
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
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium tracking-[0.2em] text-sm sm:text-base uppercase shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-white/50"
              >
                Confirmar Asistencia
              </motion.button>
              <motion.button
                onClick={() => onScrollToSection('details')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium tracking-[0.2em] text-sm sm:text-base uppercase transition-all duration-300 border border-white/50 hover:bg-white/10 cursor-pointer"
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
              <div className="text-xs mb-1 sm:mb-2 text-white/80">
                Desliza hacia abajo
              </div>
              <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
