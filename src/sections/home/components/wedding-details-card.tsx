'use client';

import { motion } from 'motion/react';
import {
  formatWeddingTime,
  generateGoogleCalendarLink,
  generateMapLink,
} from '@/lib/wedding-utils';
import type { WeddingConfigType } from '@/types';
import { Calendar, MapPin, PartyPopper, ShirtIcon } from 'lucide-react';

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
    <div className="py-20 bg-gradient-to-br from-white to-rose-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            Detalles de la Boda
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Únete a nosotros para celebrar nuestro amor
          </p>
        </motion.div>

        {/* Date Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-gradient-to-br from-white via-rose-50/30 to-pink-50/50 rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 mb-12 border border-rose-100/50 overflow-hidden group"
        >
          {/* Background Decorations */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-rose-200/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

          <div className="relative z-10">
            {/* Save the Date Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500/10 to-pink-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-rose-200/50"
              >
                <span className="text-2xl">💕</span>
                <span className="text-sm sm:text-base font-semibold text-rose-600 tracking-wide uppercase">
                  Guarda la Fecha
                </span>
              </motion.div>
            </div>

            {/* Date Display */}
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 sm:gap-8 md:gap-12 mb-8">
              {/* Day */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center group-hover:scale-105 transition-transform duration-300 flex-1 sm:flex-none"
              >
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl p-4 sm:p-6 shadow-lg mb-2 h-24 sm:h-28 md:h-32 lg:h-36 flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none">
                    {date.getDate()}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mt-3">
                  Día
                </p>
              </motion.div>

              {/* Month */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center group-hover:scale-105 transition-transform duration-300 flex-1 sm:flex-none"
              >
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-4 sm:p-6 shadow-lg mb-2 h-24 sm:h-28 md:h-32 lg:h-36 flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none mb-1">
                    {date
                      .toLocaleDateString('es-ES', {
                        month: 'short',
                      })
                      .toUpperCase()}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-medium opacity-90">
                    {date.getFullYear()}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mt-3">
                  Mes y Año
                </p>
              </motion.div>

              {/* Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center group-hover:scale-105 transition-transform duration-300 flex-1 sm:flex-none"
              >
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-4 sm:p-6 shadow-lg mb-2 h-24 sm:h-28 md:h-32 lg:h-36 flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-none">
                    {formatWeddingTime(date, 'es-ES')}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mt-3">
                  Hora
                </p>
              </motion.div>
            </div>

            {/* Weekday Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center mb-8 px-2"
            >
              <div className="relative inline-block w-full max-w-sm sm:max-w-md md:max-w-lg bg-gradient-to-r from-white/90 via-rose-50/80 to-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 shadow-xl border border-rose-100/50 group/weekday hover:shadow-2xl transition-all duration-300">
                {/* Decorative elements */}
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-60 group-hover/weekday:scale-110 transition-transform duration-300"></div>
                <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-60 group-hover/weekday:scale-110 transition-transform duration-300"></div>

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3">
                    <span className="text-xl sm:text-2xl md:text-3xl">🗓️</span>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-gray-800 font-bold text-center leading-tight">
                      {date.toLocaleDateString('es-ES', {
                        weekday: 'long',
                      })}
                    </p>
                    <span className="text-xl sm:text-2xl md:text-3xl">🗓️</span>
                  </div>
                  <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-3"></div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-medium">
                    {date.toLocaleDateString('es-ES', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-rose-600 font-semibold mt-2">
                    ¡Marca tu calendario!
                  </p>
                </div>
              </div>
            </motion.div>

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
                className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group/btn"
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

              <p className="text-xs sm:text-sm text-gray-500 mt-4 max-w-md mx-auto">
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
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100">
            <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Información Importante
            </h4>
            <div className="grid md:grid-cols-3 gap-6 text-xs sm:text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-2">
                  <ShirtIcon className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />
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
