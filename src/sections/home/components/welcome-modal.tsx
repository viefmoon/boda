'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { Heart, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '@/constants/wedding';
import { useEffect } from 'react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || searchParams.get('toName') || 'Invitado Especial';
  
  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      const scrollY = window.scrollY;
      
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-hover/5 dark:from-beige-light/10 dark:to-beige/10"></div>
              
              {/* Content */}
              <div className="relative p-8 sm:p-10 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent to-accent-hover rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-10 h-10 text-white fill-current" />
                  </div>
                </motion.div>

                {/* Welcome text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-serif text-gray-800 dark:text-foreground mb-3">
                    ¡Bienvenido!
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-text-muted mb-2">
                    Querido/a <span className="font-medium text-accent-hover dark:text-beige-dark">{guestName}</span>
                  </p>
                  <p className="text-gray-600 dark:text-text-muted mb-6">
                    Nos complace invitarte a celebrar nuestra boda
                  </p>

                  {/* Couple names */}
                  <div className="mb-8">
                    <p className="text-xl sm:text-2xl font-serif text-accent-hover dark:text-beige-dark">
                      {WEDDING_CONFIG.bride.name} & {WEDDING_CONFIG.groom.name}
                    </p>
                  </div>

                  {/* Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-beige-dark text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Ver invitación</span>
                  </motion.button>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 right-4"
                >
                  <Sparkles className="w-6 h-6 text-accent dark:text-beige-light" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-4 left-4"
                >
                  <Sparkles className="w-5 h-5 text-accent-hover dark:text-beige" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};