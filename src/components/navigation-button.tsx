import { NAVIGATION_ANIMATIONS } from '@/constants/navigation';
import type { NavigationSection } from '@/types/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Heart, Calendar, MapPin, Camera, Mail } from 'lucide-react';

// NavigationButton Component for better code organization
interface NavigationButtonProps {
  section: NavigationSection;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export function NavigationButton({
  section,
  index,
  isActive,
  onClick,
}: NavigationButtonProps) {

  const baseClasses =
    'relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 group overflow-hidden cursor-pointer';

  const activeClasses = 'text-white';

  const inactiveClasses =
    'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800';

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      whileHover={NAVIGATION_ANIMATIONS.button.hover}
      whileTap={NAVIGATION_ANIMATIONS.button.tap}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {/* Animated Background for Active State */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={NAVIGATION_ANIMATIONS.background.initial}
            animate={NAVIGATION_ANIMATIONS.background.animate}
            exit={NAVIGATION_ANIMATIONS.background.exit}
            transition={NAVIGATION_ANIMATIONS.background.transition}
            className="absolute inset-0 bg-gray-800 dark:bg-gray-200 rounded-lg sm:rounded-xl"
          />
        )}
      </AnimatePresence>


      {/* Icon with Bounce Animation */}
      <motion.span
        className="text-sm sm:text-base relative z-10"
        animate={isActive ? NAVIGATION_ANIMATIONS.icon.active : {}}
        transition={NAVIGATION_ANIMATIONS.icon.transition}
        whileHover={NAVIGATION_ANIMATIONS.icon.hover}
      >
        {(() => {
          const iconMap = {
            Home,
            Heart,
            Calendar,
            MapPin,
            Camera,
            Mail
          };

          const IconComponent = iconMap[section.icon as keyof typeof iconMap];

          return IconComponent ? <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" /> : null;
        })()}
      </motion.span>

      {/* Label with Slide Animation */}
      <motion.span
        className="hidden sm:inline-block whitespace-nowrap relative z-10 text-xs sm:text-sm"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * index }}
      >
        {section.label}
      </motion.span>

      {/* Active Indicator Dot with Pulse */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={NAVIGATION_ANIMATIONS.background.initial}
            animate={{ scale: 1, opacity: 1 }}
            exit={NAVIGATION_ANIMATIONS.background.exit}
            transition={NAVIGATION_ANIMATIONS.background.transition}
            className="absolute -bottom-0.5 sm:-bottom-1 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white rounded-full shadow-lg z-10"
          >
            <motion.div
              animate={NAVIGATION_ANIMATIONS.pulse.animate}
              transition={NAVIGATION_ANIMATIONS.pulse.transition}
              className="w-full h-full bg-white rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.button>
  );
}

