'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import React from 'react';

export const RSVP = () => {

  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    guests: '1',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        attendance: '',
        guests: '1',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="py-8 px-4 bg-cream dark:bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-card-bg rounded-3xl p-12 shadow-lg border border-card-border"
          >
            <div className="w-20 h-20 bg-beige-light rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✨</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-4">
              ¡Gracias!
            </h3>
            <p className="text-foreground/70 text-base sm:text-lg md:text-xl">
              Hemos recibido tu confirmación. ¡Nos vemos pronto!
            </p>
            <div className="mt-6 text-2xl text-accent">♥</div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="py-8 px-4 bg-cream dark:bg-background"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground mb-3 font-light">
            Confirmación de Asistencia
          </h2>
          <div className="w-16 h-px bg-accent/30 mx-auto mb-3"></div>
          <p className="text-sm text-text-muted max-w-xl mx-auto font-light">
            Por favor, confírmanos tu asistencia para nuestro gran día
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card-bg rounded-3xl p-8 shadow-lg border border-card-border">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground mb-3 text-center">
                Confirma tu Asistencia
              </h3>
              <p className="text-sm text-foreground/70 text-center mb-6">
                Fecha límite: <span className="font-medium text-accent">15 de mayo de 2025</span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-foreground/80 mb-2"
                  >
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-card-border rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all duration-300 bg-white dark:bg-card-bg text-foreground placeholder-text-muted"
                    placeholder="Nombre completo"
                  />
                </div>
                {/* Attendance */}
                <div>
                  <label
                    htmlFor="attendance"
                    className="block text-xs sm:text-sm font-medium text-foreground/80 mb-2"
                  >
                    ¿Asistirás? *
                  </label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-card-border rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all duration-300 bg-white dark:bg-card-bg text-foreground placeholder-text-muted"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="yes">Sí, ahí estaré</option>
                    <option value="no">No podré asistir</option>
                  </select>
                </div>
                {/* Number of Guests */}
                {formData.attendance === 'yes' && (
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-xs sm:text-sm font-medium text-foreground/80 mb-2"
                    >
                      Número de invitados
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-card-border rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all duration-300 bg-white dark:bg-card-bg text-foreground placeholder-text-muted"
                    >
                      <option value="1">1 persona</option>
                      <option value="2">2 personas</option>
                      <option value="3">3 personas</option>
                      <option value="4">4 personas</option>
                    </select>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover text-white py-4 px-6 rounded-full font-light text-base sm:text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 tracking-wider"
                >
                  Enviar Confirmación
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >

          </motion.div>
        </div>
      </div>
    </div>
  );
};
