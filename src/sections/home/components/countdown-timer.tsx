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

  const timeUnits = [
    {
      label: 'Días',
      value: timeLeft.days,
    },
    {
      label: 'Horas',
      value: timeLeft.hours,
    },
    {
      label: 'Minutos',
      value: timeLeft.minutes,
    },
    {
      label: 'Segundos',
      value: timeLeft.seconds,
    },
  ];

  return (
    <div
      ref={ref}
      className="py-16 px-4 bg-background dark:bg-background"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4 font-light">
            Cuenta Regresiva
          </h2>
          <div className="w-24 h-px bg-gray-300 dark:bg-gray-700 mx-auto mb-4"></div>
          <p className="text-foreground/70 text-base sm:text-lg md:text-xl font-light">
            El gran día se acerca
          </p>
        </motion.div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{
                opacity: inView ? 1 : 0,
                scale: inView ? 1 : 0.8,
                y: inView ? 0 : 50,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1 + 0.2,
                type: 'spring',
                stiffness: 100,
              }}
              className="relative group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                {/* Content */}
                <div className="text-5xl lg:text-6xl font-serif font-light text-gray-700 dark:text-gray-300 mb-2">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-foreground/60 font-sans text-sm uppercase tracking-[0.2em]">
                  {unit.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <div className="inline-block bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm border border-gray-200/20 dark:border-gray-700/20">
            <p className="text-foreground font-light text-sm sm:text-base md:text-lg">
              {timeLeft.days > 0
                ? `${timeLeft.days} días para el gran día`
                : timeLeft.hours > 0
                ? `${timeLeft.hours} horas para el gran día`
                : timeLeft.minutes > 0
                ? `${timeLeft.minutes} minutos para el gran día`
                : '¡El momento ha llegado!'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
