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
      color: 'from-rose-400 to-pink-500',
    },
    {
      tipo: 'Padrinos de Anillos',
      personas: ['Diego Mora Delgado', 'Lizeth Vera Alvarado'],
      icon: <CircleDot className="w-5 h-5" />,
      color: 'from-amber-400 to-orange-500',
    },
    {
      tipo: 'Padrinos de Arras',
      personas: ['Luis Armando Lozano Jiménez', 'Berenice Aguiñaga Olivares'],
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-purple-400 to-indigo-500',
    },
    {
      tipo: 'Padrinos de Mancuerna',
      personas: ['Daniela Mora Delgado', 'Jason Iván Ceja Valencia'],
      icon: <Users className="w-5 h-5" />,
      color: 'from-emerald-400 to-teal-500',
    },
  ];

  return (
    <div ref={ref} className="py-16 px-4 bg-gradient-to-br from-white via-rose-50/30 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-800 mb-3">
            Nuestros Padrinos
          </h2>
          <div className="w-20 h-px bg-rose-400 mx-auto"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
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
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`bg-gradient-to-r ${padrino.color} text-white rounded-full p-2.5`}>
                  {padrino.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {padrino.tipo}
                </h3>
              </div>
              
              <div className="space-y-2">
                {padrino.personas.map((persona, personaIndex) => (
                  <p key={personaIndex} className="text-sm sm:text-base text-gray-600">
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
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 max-w-3xl mx-auto border border-rose-100">
            <p className="text-gray-700 text-sm sm:text-base italic">
              &ldquo;Gracias por ser parte de nuestra historia y acompañarnos en este momento tan especial&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};