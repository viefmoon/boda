'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Heart } from 'lucide-react';

interface ClosingMessageProps {
  bride: string;
  groom: string;
}

export const ClosingMessage = ({ bride, groom }: ClosingMessageProps) => {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="py-4 px-4 bg-gradient-to-br from-cream to-warm-white dark:from-background dark:to-warm-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground mb-3">
            Con Amor y Gratitud
          </h2>
          <div className="w-16 h-px bg-accent/30 mx-auto mb-4"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card-bg/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-card-border mb-12"
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed mb-6 font-light">
            &quot;El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección&quot;
          </p>
          <div className="text-base sm:text-lg text-foreground/70">
            Con todo nuestro amor,
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mt-2">
            {groom} & {bride}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex justify-center space-x-4">
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-beige dark:text-beige fill-current" />
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-accent dark:text-accent fill-current" />
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-beige dark:text-beige fill-current" />
            </motion.span>
          </div>

          <p className="text-sm sm:text-base text-foreground/60">
            #SofiaYBayo2025 #AmorVerdadero #JuntosParaSiempre
          </p>
        </motion.div>

      </div>
    </div>
  );
};
