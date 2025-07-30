'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export const EventSchedule = () => {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const scheduleItems = [
    {
      time: '3:30 PM',
      event: 'Llegada de Invitados',
      description: 'Bebidas de bienvenida disponibles',
    },
    {
      time: '4:00 PM',
      event: 'Ceremonia de Boda',
      description: 'Intercambio de votos',
    },
    {
      time: '4:30 PM',
      event: 'Sesión de Fotografía',
      description: 'Bebida de bienvenida para invitados',
    },
    {
      time: '6:30 PM',
      event: 'Comienza la Recepción',
      description: 'Cena y celebración',
    },
    {
      time: '7:30 PM',
      event: 'Primer Baile',
      description: 'Momento especial de los novios',
    },
    {
      time: '8:00 PM',
      event: 'Baile y Fiesta',
      description: '¡Que continúe la celebración!',
    },
    {
      time: '12:00 AM',
      event: 'Despedida',
      description: 'Despedida con bengalas',
    },
  ];

  return (
    <div
      ref={ref}
      className="py-16 px-4 bg-cream/30"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal mb-4 font-light">
            Línea de Tiempo del Evento
          </h3>
          <div className="w-24 h-0.5 bg-gold mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gold-light"></div>

          <div className="space-y-8">
            {scheduleItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-ivory shadow-lg z-10"></div>

                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0
                      ? 'md:text-right md:pr-8'
                      : 'md:text-left md:pl-8'
                  } pl-12 md:pl-0`}
                >
                  <div className="bg-ivory rounded-none p-6 shadow-lg border border-gold/30">
                    <div className="flex items-center mb-2">
                      <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-none text-xs sm:text-sm font-light uppercase tracking-wider">
                        {item.time}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg md:text-xl font-serif text-charcoal mb-1 font-light italic">
                      {item.event}
                    </h4>
                    <p className="text-charcoal/70 text-xs sm:text-sm md:text-base font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
