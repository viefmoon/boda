'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Heart, CircleDot, Sparkles, Users } from 'lucide-react';

interface Padrino {
  tipo: string;
  personas: string[];
  icon: React.ReactNode;
  color: string;
}

export const WeddingParty = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const padrinos: Padrino[] = [
    {
      tipo: 'Padrinos de Velación',
      personas: ['Pedro Salcedo Terrones', 'Jacqueline Lozano Jiménez'],
      icon: <Heart className="w-5 h-5" />,
      color: '',
    },
    {
      tipo: 'Padrinos de Anillos',
      personas: ['Diego Mora Delgado', 'Lizeth Vera Alvarado'],
      icon: <CircleDot className="w-5 h-5" />,
      color: '',
    },
    {
      tipo: 'Padrinos de Arras',
      personas: ['Luis Armando Lozano Jiménez', 'Berenice Aguiñaga Olivares'],
      icon: <Sparkles className="w-5 h-5" />,
      color: '',
    },
    {
      tipo: 'Padrinos de Mancuerna',
      personas: ['Daniela Mora Delgado', 'Jason Iván Ceja Valencia'],
      icon: <Users className="w-5 h-5" />,
      color: '',
    },
  ];

  return (
    <div ref={ref} className="py-16 px-4 bg-background dark:bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-3 font-light">
            Nuestros Padrinos
          </h2>
          <div className="w-20 h-px bg-gray-300 dark:bg-gray-700 mx-auto"></div>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70 mt-4 max-w-2xl mx-auto font-light">
            Agradecemos a quienes nos acompañan en este día especial
          </p>
        </motion.div>

        {/* Padrinos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {padrinos.map((padrino, index) => (
            <motion.div
              key={padrino.tipo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full p-2.5">
                  {padrino.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-serif text-foreground font-light">
                  {padrino.tipo}
                </h3>
              </div>
              
              <div className="space-y-2 pl-14">
                {padrino.personas.map((persona, personaIndex) => (
                  <p key={personaIndex} className="text-base text-foreground/70">
                    {persona}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 max-w-3xl mx-auto border border-gray-200 dark:border-gray-700">
            <p className="text-foreground text-sm sm:text-base italic font-light">
              &ldquo;Gracias por ser parte de nuestra historia y acompañarnos en este momento tan especial&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};