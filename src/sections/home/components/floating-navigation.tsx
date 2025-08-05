'use client';

import { motion } from 'motion/react';
import {
  NavigationButton,
} from '@/components';
import { NAVIGATION_SECTIONS } from '@/constants';
import { NAVIGATION_ANIMATIONS } from '@/constants/navigation';

interface FloatingNavigationProps {
  activeSection: string;
  onScrollToSection: (sectionId: string) => void;
}

export default function FloatingNavigation({
  activeSection,
  onScrollToSection,
}: FloatingNavigationProps) {
  return (
    <motion.nav
      initial={NAVIGATION_ANIMATIONS.navigation.initial}
      animate={NAVIGATION_ANIMATIONS.navigation.animate}
      transition={NAVIGATION_ANIMATIONS.navigation.transition}
      className="fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300"
    >
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-full px-2 sm:px-3 py-2 sm:py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.1)] border border-gray-200 dark:border-white/20 hover:bg-white dark:hover:bg-gray-900/90 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)] transition-all duration-300"
      >
        <div className="flex items-center space-x-4 sm:space-x-6">
          {NAVIGATION_SECTIONS.map((section, index) => (
            <NavigationButton
              key={section.id}
              section={section}
              index={index}
              isActive={activeSection === section.id}
              onClick={() => onScrollToSection(section.id)}
            />
          ))}

        </div>
      </motion.div>
    </motion.nav>
  );
}
