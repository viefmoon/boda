'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export const CoupleIntroduction = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="py-8 px-4 bg-cream dark:bg-background"
    >
      <div className="max-w-6xl mx-auto">

        {/* Love Quote Only */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <div className="bg-card-bg/90 backdrop-blur-sm rounded-2xl p-10 md:p-16 max-w-3xl mx-auto shadow-xl border border-card-border">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground/90 italic mb-6 leading-relaxed">
              &ldquo;Eres con quien quiero compartir cada amanecer y atardecer.&rdquo;
            </p>
            <div className="w-16 h-px bg-accent/30 mx-auto mb-4"></div>
            <p className="text-soft-gray text-sm sm:text-base">— Nuestro amor eterno</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
