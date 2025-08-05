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
        className="bg-white/10 backdrop-blur-md rounded-full px-2 sm:px-3 py-2 sm:py-2.5 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300"
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
