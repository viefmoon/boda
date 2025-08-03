'use client';

import { motion } from 'motion/react';
import {
  formatWeddingTime,
  generateGoogleCalendarLink,
} from '@/lib/wedding-utils';
import { Calendar, ShirtIcon } from 'lucide-react';

interface WeddingDetailsCardProps {
  date: Date;
}

export const WeddingDetailsCard = ({
  date,
}: WeddingDetailsCardProps) => {
  const calendarEvent = {
    title: 'Nuestro Día de Boda',
    start: date,
    end: new Date(date.getTime() + 5 * 60 * 60 * 1000), // 5 hours later
    description: 'Únete a nosotros en nuestra celebración especial',
  };

  return (
    <div className="py-20 bg-background dark:bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-4 font-light">
            Detalles de la Boda
          </h2>
          <div className="w-24 h-px bg-gray-300 dark:bg-gray-700 mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto font-light">
            Únete a nosotros para celebrar nuestro amor
          </p>
        </motion.div>

        {/* Date Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg p-8 sm:p-10 md:p-12 mb-12 border border-gray-200 dark:border-gray-800 overflow-hidden group"
        >
          {/* Background Decorations */}

          <div className="relative z-10">
            {/* Save the Date Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-3 bg-transparent rounded-full px-6 py-3 mb-6"
              >
                <span className="text-sm sm:text-base font-light text-gray-600 dark:text-gray-400 tracking-[0.3em] uppercase">
                  Guarda la Fecha
                </span>
              </motion.div>
            </div>

            {/* Date Display */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center mb-10">
              {/* Day */}
              <div className="flex-1">
                <p className="text-6xl md:text-7xl font-serif text-gray-700 dark:text-gray-300 font-light">{date.getDate()}</p>
                <p className="text-sm font-sans uppercase tracking-[0.2em] text-foreground/60 mt-1">
                  {date.toLocaleDateString('es-ES', { weekday: 'long' })}
                </p>
              </div>

              {/* Divider */}
              <div className="h-16 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
              <div className="w-16 h-px bg-gray-300 dark:bg-gray-700 sm:hidden my-4"></div>

              {/* Month and Year */}
              <div className="flex-1">
                <p className="text-3xl md:text-4xl font-serif text-foreground font-light">
                  {date.toLocaleDateString('es-ES', { month: 'long' })}
                </p>
                <p className="text-lg text-foreground/60">{date.getFullYear()}</p>
              </div>

              {/* Time */}
              <div className="flex-1">
                <p className="text-3xl md:text-4xl font-serif text-foreground font-light">
                  {formatWeddingTime(date, 'es-ES')}
                </p>
                <p className="text-sm text-foreground/60">Hora</p>
              </div>
            </div>


            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <motion.a
                href={generateGoogleCalendarLink(calendarEvent)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-8 py-4 rounded-full font-light text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-300 group/btn tracking-wider"
              >
                <span className="group-hover/btn:scale-110 transition-transform duration-200">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <span>Agregar al Calendario</span>
                <motion.span
                  className="text-sm opacity-75"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>

              <p className="text-xs sm:text-sm text-foreground/60 mt-4 max-w-md mx-auto">
                Sincroniza con tu calendario para no perderte nuestro gran día
              </p>
            </motion.div>
          </div>
        </motion.div>


        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
            <h4 className="text-lg sm:text-xl md:text-2xl font-light text-foreground mb-4">
              Información Importante
            </h4>
            <div className="grid md:grid-cols-3 gap-6 text-xs sm:text-sm text-foreground/70">
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-2">
                  <ShirtIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 dark:text-gray-400" />
                </div>
                <p className="font-medium">Código de Vestimenta</p>
                <p>Vestimenta Formal</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl mb-2">🚗</div>
                <p className="font-medium">Estacionamiento</p>
                <p>Valet disponible</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl sm:text-2xl mb-2">📱</div>
                <p className="font-medium">Contacto</p>
                <p>+52 123 456 7890</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
