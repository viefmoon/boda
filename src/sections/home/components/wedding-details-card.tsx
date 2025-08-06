'use client';

import { motion } from 'motion/react';
import { formatWeddingTime } from '@/lib/wedding-utils';
import { Clock, PartyPopper, Gift, Hotel } from 'lucide-react';
import { WEDDING_CONFIG } from '@/constants/wedding';
import { CalendarButton } from '@/components/calendar-button';

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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4 font-light">
            Detalles de la Boda
          </h2>
          <div className="w-24 h-px bg-border-light dark:bg-stone-700 mx-auto mb-4"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">
            Únete a nosotros para celebrar nuestro amor
          </p>
        </motion.div>

        {/* Date Card - Compact Elegant Design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="relative bg-white dark:bg-card-bg rounded-2xl shadow-xl p-8 mb-8 border border-border-light dark:border-card-border"
        >
          <div className="text-center">
            {/* Date Header */}
            <div className="mb-6">
              <span className="text-sm sm:text-base font-medium text-text-primary dark:text-warm-white tracking-[0.2em] uppercase">
                Guarda la Fecha
              </span>
            </div>

            {/* Compact Date Display */}
            <div className="space-y-4 mb-8">
              {/* Main Date */}
              <div className="flex items-center justify-center gap-3">
                <h3 className="text-4xl md:text-5xl font-serif text-stone-900 dark:text-warm-white">
                  {date.getDate()}
                </h3>
                <div className="text-left">
                  <p className="text-xl font-serif text-text-secondary dark:text-warm-white">
                    {date.toLocaleDateString('es-ES', { month: 'long' })}
                  </p>
                  <p className="text-sm text-text-muted dark:text-warm-white/80">
                    {date.getFullYear()}
                  </p>
                </div>
              </div>

              {/* Day and Time */}
              <div className="flex items-center justify-center gap-6 text-sm text-text-secondary dark:text-warm-white/90">
                <span className="capitalize font-medium">
                  {date.toLocaleDateString('es-ES', { weekday: 'long' })}
                </span>
                <span className="text-stone-400">•</span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-4 h-4" />
                  {formatWeddingTime(date, 'es-ES')}
                </span>
              </div>
            </div>

            {/* Calendar Button */}
            <CalendarButton 
              event={{
                ...calendarEvent,
                location: `${WEDDING_CONFIG.venue.ceremony.name}, ${WEDDING_CONFIG.venue.ceremony.address}`
              }} 
            />
          </div>
        </motion.div>

        {/* Additional Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {/* Dress Code */}
          <div className="bg-card-bg rounded-xl p-6 text-center border border-card-border">
            <div className="flex justify-center gap-3 mb-3">
              <div className="bg-stone-100 dark:bg-stone-800 p-2 rounded-lg">
                <img 
                  src="/images/tuxedo.png" 
                  alt="Tuxedo" 
                  className="w-12 h-12 object-contain dark:invert-0"
                  style={{ filter: 'none' }}
                />
              </div>
              <div className="bg-stone-100 dark:bg-stone-800 p-2 rounded-lg">
                <img 
                  src="/images/dress.png" 
                  alt="Dress" 
                  className="w-12 h-12 object-contain dark:invert-0"
                  style={{ filter: 'none' }}
                />
              </div>
            </div>
            <h4 className="font-medium text-lg text-stone-900 dark:text-foreground mb-1">
              Código de Vestimenta
            </h4>
            <p className="text-base text-text-primary dark:text-warm-white font-medium">
              All Black
            </p>
            <p className="text-sm text-text-secondary dark:text-warm-white/80 mt-1">
              (Blanco prohibido)
            </p>
          </div>

          {/* Ceremony */}
          <div className="bg-card-bg rounded-xl p-6 border border-card-border">
            <div className="text-3xl mb-3 text-center">⛪</div>
            <h4 className="font-medium text-lg text-stone-900 dark:text-foreground mb-2 text-center">
              Ceremonia
            </h4>
            <p className="text-sm text-text-primary dark:text-warm-white mb-1 text-center font-medium">
              {WEDDING_CONFIG.venue.ceremony.name}
            </p>
            <p className="text-sm text-text-secondary dark:text-warm-white/90 mb-3 text-center">
              {WEDDING_CONFIG.venue.ceremony.address}
            </p>
            <div className="flex items-center justify-center gap-1 text-sm text-text-secondary dark:text-warm-white/90 mb-3">
              <Clock className="w-3 h-3" />
              <span>{WEDDING_CONFIG.venue.ceremony.time}</span>
            </div>
            <a
              href={WEDDING_CONFIG.venue.ceremony.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-sm bg-accent/10 hover:bg-accent/20 text-accent py-2 rounded-lg transition-colors"
            >
              Ver en mapa
            </a>
          </div>

          {/* Reception */}
          <div className="bg-card-bg rounded-xl p-6 border border-card-border">
            <PartyPopper className="w-8 h-8 text-text-muted mx-auto mb-3" />
            <h4 className="font-medium text-lg text-stone-900 dark:text-foreground mb-2 text-center">
              Recepción
            </h4>
            <p className="text-sm text-text-primary dark:text-warm-white mb-1 text-center font-medium">
              {WEDDING_CONFIG.venue.reception.name}
            </p>
            <p className="text-sm text-text-secondary dark:text-warm-white/90 mb-3 text-center">
              {WEDDING_CONFIG.venue.reception.address}
            </p>
            <div className="flex items-center justify-center gap-1 text-sm text-text-secondary dark:text-warm-white/90 mb-3">
              <Clock className="w-3 h-3" />
              <span>{WEDDING_CONFIG.venue.reception.time}</span>
            </div>
            <a
              href={WEDDING_CONFIG.venue.reception.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-sm bg-accent/10 hover:bg-accent/20 text-accent py-2 rounded-lg transition-colors"
            >
              Ver en mapa
            </a>
          </div>

        </motion.div>

        {/* Accommodation Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="max-w-5xl mx-auto mt-8"
        >
          <div className="bg-card-bg rounded-xl p-6 border border-card-border">
            <Hotel className="w-8 h-8 text-text-muted mx-auto mb-3" />
            <h4 className="font-medium text-lg text-stone-900 dark:text-foreground mb-2 text-center">
              Hospedaje Disponible
            </h4>
            <p className="text-sm text-text-secondary dark:text-warm-white/90 mb-4 text-center">
              Opciones de hospedaje cercanas al lugar del evento
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Hotel 1 */}
              <a
                href="https://maps.app.goo.gl/N7kSYgARU7isLD177?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-stone-800/20 p-4 rounded-lg border border-border-light dark:border-stone-700 hover:bg-accent/5 dark:hover:bg-accent/10 transition-all duration-200 text-center group"
              >
                <Hotel className="w-6 h-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-text-primary dark:text-warm-white mb-1">Hotel Acuario</p>
                <p className="text-xs text-accent group-hover:text-accent-hover">Ver ubicación →</p>
              </a>
              
              {/* Hotel 2 */}
              <a
                href="https://maps.app.goo.gl/KfHuqpXMTXeVBJNj9?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-stone-800/20 p-4 rounded-lg border border-border-light dark:border-stone-700 hover:bg-accent/5 dark:hover:bg-accent/10 transition-all duration-200 text-center group"
              >
                <Hotel className="w-6 h-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-text-primary dark:text-warm-white mb-1">Hotel Posada Santa Fe</p>
                <p className="text-xs text-accent group-hover:text-accent-hover">Ver ubicación →</p>
              </a>
              
              {/* Hotel 3 */}
              <a
                href="https://maps.app.goo.gl/QmfQZvRx9rc778rQ8?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-stone-800/20 p-4 rounded-lg border border-border-light dark:border-stone-700 hover:bg-accent/5 dark:hover:bg-accent/10 transition-all duration-200 text-center group"
              >
                <Hotel className="w-6 h-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-text-primary dark:text-warm-white mb-1">Hotel Pabela</p>
                <p className="text-xs text-accent group-hover:text-accent-hover">Ver ubicación →</p>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Gift Registry */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="max-w-2xl mx-auto mt-8"
        >
          <div className="bg-card-bg rounded-xl p-6 border border-card-border">
            <Gift className="w-8 h-8 text-text-muted mx-auto mb-3" />
            <h4 className="font-medium text-lg text-stone-900 dark:text-foreground mb-2 text-center">
              Mesa de Regalos
            </h4>
            <p className="text-sm text-text-primary dark:text-warm-white mb-1 text-center font-medium">
              Tu presencia es nuestro mejor regalo
            </p>
            <p className="text-sm text-text-secondary dark:text-warm-white/90 mb-4 text-center">
              Si deseas obsequiarnos algo, hemos preparado una lista de regalos en Amazon
            </p>
            <a
              href="https://www.amazon.com.mx/wedding/registry/FUM15LPMHE1K"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-sm bg-accent/10 hover:bg-accent/20 text-accent py-2 rounded-lg transition-colors mb-4"
            >
              Ver Mesa de Regalos
            </a>
            
            <div className="border-t border-border-light dark:border-stone-700 pt-4 mt-4">
              <p className="text-xs text-text-muted dark:text-warm-white/70 text-center mb-2">
                También puedes contribuir a nuestra nueva vida juntos
              </p>
              <div className="bg-stone-50 dark:bg-stone-800/20 p-3 rounded-lg">
                <p className="text-xs text-text-muted dark:text-warm-white/60 text-center mb-1">
                  Transferencia bancaria
                </p>
                <p className="text-sm font-mono text-text-primary dark:text-warm-white text-center select-all">
                  4152 3136 9121 8288
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};