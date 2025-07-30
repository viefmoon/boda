'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { generateMapLink } from '@/lib/wedding-utils';
import { Calendar, GlassWater } from 'lucide-react';

interface VenueInformationProps {
  venue: WeddingConfigType['venue'];
}

export const VenueInformation = ({ venue }: VenueInformationProps) => {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            Ubicación y Lugar
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Celebremos juntos en estos hermosos lugares
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Ceremony Venue */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-purple-100"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-3xl">⛪</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-2">
                Ceremonia
              </h3>
              <div className="w-16 h-px bg-purple-400 mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {venue.ceremony.name}
                </h4>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
                  {venue.ceremony.address}
                </p>
                <div className="inline-block bg-white/60 rounded-lg px-4 py-2 shadow-sm">
                  <p className="text-purple-700 font-medium text-sm sm:text-base">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {venue.ceremony.time}
                  </p>
                </div>
              </div>

              <div className="bg-white/50 rounded-2xl p-6 space-y-4">
                <h5 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                  Detalles de la Ceremonia
                </h5>
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <p>• Por favor llegar 15 minutos antes</p>
                  <p>• Ceremonia sin dispositivos electrónicos</p>
                  <p>• Estacionamiento disponible</p>
                  <p>• Acceso para sillas de ruedas</p>
                </div>
              </div>

              <button
                onClick={() =>
                  window.open(venue.ceremony.mapUrl || generateMapLink(venue.ceremony.name), '_blank')
                }
                className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer"
              >
                Ver en el Mapa
              </button>
            </div>
          </motion.div>

          {/* Reception Venue */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-lg border border-amber-100"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <GlassWater className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-2">
                Recepción
              </h3>
              <div className="w-16 h-px bg-amber-400 mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {venue.reception.name}
                </h4>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
                  {venue.reception.address}
                </p>
                <div className="inline-block bg-white/60 rounded-lg px-4 py-2 shadow-sm">
                  <p className="text-amber-700 font-medium text-sm sm:text-base">
                    🍽️ {venue.reception.time}
                  </p>
                </div>
              </div>

              <div className="bg-white/50 rounded-2xl p-6 space-y-4">
                <h5 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                  Detalles de la Recepción
                </h5>
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <p>• Cóctel de bienvenida</p>
                  <p>• Barra libre disponible</p>
                  <p>• Música y baile hasta las 2 AM</p>
                  <p>• Servicio de valet parking</p>
                </div>
              </div>

              <button
                onClick={() =>
                  window.open(venue.reception.mapUrl || generateMapLink(venue.reception.name), '_blank')
                }
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 px-6 rounded-xl font-medium hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer"
              >
                Ver en el Mapa
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
