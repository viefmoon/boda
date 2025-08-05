'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Download, X } from 'lucide-react';
import { generateGoogleCalendarLink, generateICSFile, getDeviceType } from '@/lib/wedding-utils';

interface CalendarButtonProps {
  event: {
    title: string;
    start: Date;
    end: Date;
    description?: string;
    location?: string;
  };
}

export function CalendarButton({ event }: CalendarButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  
  const handleCalendarClick = () => {
    const deviceType = getDeviceType();
    
    if (deviceType === 'desktop') {
      setShowOptions(true);
    } else {
      // For mobile devices, directly download .ics file
      downloadICSFile();
    }
  };
  
  const downloadICSFile = () => {
    const icsContent = generateICSFile(event);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = 'boda-sofia-oswaldo.ics';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setShowOptions(false);
  };
  
  const openGoogleCalendar = () => {
    window.open(generateGoogleCalendarLink(event), '_blank');
    setShowOptions(false);
  };
  
  return (
    <>
      <motion.button
        onClick={handleCalendarClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Calendar className="w-4 h-4" />
        <span>Agregar al Calendario</span>
      </motion.button>
      
      {/* Desktop Options Modal */}
      <AnimatePresence>
        {showOptions && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowOptions(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-card-bg rounded-xl shadow-2xl p-6 z-50 max-w-sm w-full mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-foreground">
                  Agregar al Calendario
                </h3>
                <button
                  onClick={() => setShowOptions(false)}
                  className="text-text-muted hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={downloadICSFile}
                  className="w-full flex items-center gap-3 p-4 rounded-lg border border-border-light hover:bg-accent/5 transition-colors text-left"
                >
                  <Download className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">
                      Descargar archivo .ics
                    </p>
                    <p className="text-xs text-text-muted">
                      Compatible con Apple Calendar, Outlook y más
                    </p>
                  </div>
                </button>
                
                <button
                  onClick={openGoogleCalendar}
                  className="w-full flex items-center gap-3 p-4 rounded-lg border border-border-light hover:bg-accent/5 transition-colors text-left"
                >
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">
                      Google Calendar
                    </p>
                    <p className="text-xs text-text-muted">
                      Abrir en navegador
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}