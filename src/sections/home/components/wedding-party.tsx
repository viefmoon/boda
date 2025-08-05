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
      icon: <Heart className="w-4 h-4" />,
      color: '',
    },
    {
      tipo: 'Padrinos de Anillos',
      personas: ['Diego Mora Delgado', 'Lizeth Vera Alvarado'],
      icon: <CircleDot className="w-4 h-4" />,
      color: '',
    },
    {
      tipo: 'Padrinos de Arras',
      personas: ['Luis Armando Lozano Jiménez', 'Berenice Aguiñaga Olivares'],
      icon: <Sparkles className="w-4 h-4" />,
      color: '',
    },
    {
      tipo: 'Padrinos de Mancuerna',
      personas: ['Daniela Mora Delgado', 'Jason Iván Ceja Valencia'],
      icon: <Users className="w-4 h-4" />,
      color: '',
    },
  ];

  return (
    <div ref={ref} className="py-8 px-4 bg-background dark:bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground mb-3 font-light">
            Nuestros Padrinos
          </h2>
          <div className="w-16 h-px bg-accent/30 mx-auto"></div>
          <p className="text-sm text-text-muted mt-3 max-w-xl mx-auto font-light">
            Agradecemos a quienes nos acompañan
          </p>
        </motion.div>

        {/* Padrinos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {padrinos.map((padrino, index) => (
            <motion.div
              key={padrino.tipo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card-bg rounded-xl shadow-md p-4 border border-card-border hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-accent/10 text-accent rounded-full p-2">
                  {padrino.icon}
                </div>
                <h3 className="text-base font-serif text-foreground font-light">
                  {padrino.tipo}
                </h3>
              </div>
              
              <div className="space-y-1 pl-11">
                {padrino.personas.map((persona, personaIndex) => (
                  <p key={personaIndex} className="text-sm text-text-muted">
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
          className="mt-8 text-center"
        >
          <div className="bg-card-bg/50 backdrop-blur-sm rounded-xl p-4 max-w-2xl mx-auto border border-card-border">
            <p className="text-foreground text-sm italic font-light">
              &ldquo;Gracias por ser parte de nuestra historia&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};