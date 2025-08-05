'use client';

import { motion } from 'motion/react';
import {
  formatWeddingTime,
  generateGoogleCalendarLink,
} from '@/lib/wedding-utils';
import { Calendar, Clock, MapPin, Church, GlassWater } from 'lucide-react';
import { WEDDING_CONFIG } from '@/constants/wedding';
import { generateMapLink } from '@/lib/wedding-utils';

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
    <div className="py-12 bg-background dark:bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4 font-light">
            Detalles de la Boda
          </h2>
          <div className="w-24 h-px bg-gray-300 dark:bg-gray-700 mx-auto mb-4"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">
            Únete a nosotros para celebrar nuestro amor
          </p>
        </motion.div>

        {/* Date Card - Compact Elegant Design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-card-bg rounded-2xl shadow-xl p-8 mb-8 border border-card-border"
        >
          <div className="text-center">
            {/* Date Header */}
            <div className="mb-6">
              <span className="text-xs font-light text-text-muted tracking-[0.3em] uppercase">
                Guarda la Fecha
              </span>
            </div>

            {/* Compact Date Display */}
            <div className="space-y-4 mb-8">
              {/* Main Date */}
              <div className="flex items-center justify-center gap-3">
                <h3 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-gray-100">
                  {date.getDate()}
                </h3>
                <div className="text-left">
                  <p className="text-xl font-serif text-soft-gray">
                    {date.toLocaleDateString('es-ES', { month: 'long' })}
                  </p>
                  <p className="text-sm text-text-muted">
                    {date.getFullYear()}
                  </p>
                </div>
              </div>

              {/* Day and Time */}
              <div className="flex items-center justify-center gap-6 text-sm text-text-muted">
                <span className="capitalize">
                  {date.toLocaleDateString('es-ES', { weekday: 'long' })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatWeddingTime(date, 'es-ES')}
                </span>
              </div>
            </div>

            {/* Calendar Button */}
            <motion.a
              href={generateGoogleCalendarLink(calendarEvent)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              <span>Agregar al Calendario</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Additional Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {/* Dress Code */}
          <div className="bg-card-bg rounded-xl p-6 text-center border border-card-border">
            <div className="flex justify-center gap-3 mb-3">
              <div className="bg-white/10 dark:bg-white/5 p-2 rounded-lg backdrop-blur-sm">
                <img 
                  src="/images/tuxedo.png" 
                  alt="Tuxedo" 
                  className="w-12 h-12 object-contain dark:opacity-90 dark:filter dark:brightness-125"
                />
              </div>
              <div className="bg-white/10 dark:bg-white/5 p-2 rounded-lg backdrop-blur-sm">
                <img 
                  src="/images/dress.png" 
                  alt="Dress" 
                  className="w-12 h-12 object-contain dark:opacity-90 dark:filter dark:brightness-125"
                />
              </div>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
              Código de Vestimenta
            </h4>
            <p className="text-sm text-text-muted font-medium">
              All Black
            </p>
            <p className="text-xs text-text-muted mt-1">
              (Blanco prohibido)
            </p>
          </div>

          {/* Ceremony */}
          <div className="bg-card-bg rounded-xl p-6 border border-card-border">
            <div className="text-3xl mb-3 text-center">⛪</div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-center">
              Ceremonia
            </h4>
            <p className="text-xs text-text-muted mb-1 text-center font-medium">
              {WEDDING_CONFIG.venue.ceremony.name}
            </p>
            <p className="text-xs text-text-muted mb-3 text-center">
              {WEDDING_CONFIG.venue.ceremony.address}
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-text-muted mb-3">
              <Clock className="w-3 h-3" />
              <span>{WEDDING_CONFIG.venue.ceremony.time}</span>
            </div>
            <a
              href={WEDDING_CONFIG.venue.ceremony.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-xs bg-accent/10 hover:bg-accent/20 text-accent py-2 rounded-lg transition-colors"
            >
              Ver en mapa
            </a>
          </div>

          {/* Reception */}
          <div className="bg-card-bg rounded-xl p-6 border border-card-border">
            <GlassWater className="w-8 h-8 text-text-muted mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-center">
              Recepción
            </h4>
            <p className="text-xs text-text-muted mb-1 text-center font-medium">
              {WEDDING_CONFIG.venue.reception.name}
            </p>
            <p className="text-xs text-text-muted mb-3 text-center">
              {WEDDING_CONFIG.venue.reception.address}
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-text-muted mb-3">
              <Clock className="w-3 h-3" />
              <span>{WEDDING_CONFIG.venue.reception.time}</span>
            </div>
            <a
              href={WEDDING_CONFIG.venue.reception.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-xs bg-accent/10 hover:bg-accent/20 text-accent py-2 rounded-lg transition-colors"
            >
              Ver en mapa
            </a>
          </div>

        </motion.div>
      </div>
    </div>
  );
};