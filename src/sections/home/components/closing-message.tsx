'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

interface ClosingMessageProps {
  bride: string;
  groom: string;
}

export const ClosingMessage = ({ bride, groom }: ClosingMessageProps) => {

  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="py-4 px-4 bg-background dark:bg-background"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card-bg backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-card-border mb-12"
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-sm sm:text-base text-foreground/60">
            #SofiaYBayo2025 #AmorVerdadero #JuntosParaSiempre
          </p>
        </motion.div>

      </div>
    </div>
  );
};
