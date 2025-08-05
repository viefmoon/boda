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
    'relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 group cursor-pointer';

  const activeClasses = 'text-accent dark:text-accent';

  const inactiveClasses =
    'text-text-muted dark:text-warm-white/70 hover:text-accent dark:hover:text-accent';

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
            className="absolute inset-0 bg-accent/20 dark:bg-accent/20 rounded-full"
          />
        )}
      </AnimatePresence>


      {/* Icon with Bounce Animation */}
      <motion.span
        className="relative z-10"
        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.2 }}
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

          return IconComponent ? <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} /> : null;
        })()}
      </motion.span>


      {/* Active Indicator - Subtle glow */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-full"
          >
            <div className="absolute inset-0 bg-accent/10 dark:bg-accent/10 rounded-full blur-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-card-bg/90 dark:bg-card-bg/90 text-foreground dark:text-foreground text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none shadow-lg border border-card-border"
      >
        {section.label}
      </motion.div>

    </motion.button>
  );
}

