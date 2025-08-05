'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

interface CountdownTimerProps {
  targetDate: Date;
}

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      ref={ref}
      className="py-8 px-4 bg-cream dark:bg-background"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        {/* Compact Countdown Display */}
        <div className="bg-card-bg rounded-2xl p-6 md:p-8 shadow-lg border border-card-border text-center">
          <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-4">Cuenta Regresiva</h3>
          <div className="w-16 h-px bg-accent/30 mx-auto mb-6"></div>
          
          {/* Single Line Display */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-accent font-light">{timeLeft.days}</span>
              <span className="text-sm sm:text-base md:text-lg text-text-muted">días</span>
            </div>
            
            <span className="text-text-muted text-base sm:text-lg">:</span>
            
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-accent font-light">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm md:text-base text-text-muted">h</span>
            </div>
            
            <span className="text-text-muted text-base sm:text-lg">:</span>
            
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-accent font-light">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm md:text-base text-text-muted">m</span>
            </div>
            
            <span className="text-text-muted text-base sm:text-lg">:</span>
            
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-accent font-light">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm md:text-base text-text-muted">s</span>
            </div>
          </div>
          
          <p className="text-base text-text-muted mt-4">El gran día se acerca</p>
        </div>
      </motion.div>
    </div>
  );
};