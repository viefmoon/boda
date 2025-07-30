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
      className="py-20 px-4 bg-gradient-to-br from-rose-100 to-pink-200"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-6">
            Con Amor y Gratitud
          </h2>
          <div className="w-24 h-px bg-rose-500 mx-auto mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/40 mb-12"
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed mb-6 font-light">
            &quot;El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección&quot;
          </p>
          <div className="text-base sm:text-lg text-gray-600">
            Con todo nuestro amor,
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-rose-600 mt-2">
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
            <span className="animate-bounce">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-500 fill-current" />
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-rose-500 fill-current" />
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-500 fill-current" />
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-600">
            #SofiaYOswaldo2025 #AmorVerdadero #JuntosParaSiempre
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/40"
        >
          <p className="text-xs sm:text-sm text-gray-500">
            ¿Preguntas? Contáctanos en bodaoswaldsofiaM@gmail.com
          </p>
        </motion.div>
      </div>
    </div>
  );
};
