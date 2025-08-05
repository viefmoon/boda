'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Gift } from 'lucide-react';

export const RSVP = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: '1',
    dietaryRestrictions: '',
    message: '',
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
        email: '',
        attendance: '',
        guests: '1',
        dietaryRestrictions: '',
        message: '',
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
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground mb-6 text-center">
                Confirma tu Asistencia
              </h3>

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
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-foreground/80 mb-2"
                  >
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-card-border rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all duration-300 bg-white dark:bg-card-bg text-foreground placeholder-text-muted"
                    placeholder="Correo electrónico"
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
                {/* Dietary Restrictions */}
                {formData.attendance === 'yes' && (
                  <div>
                    <label
                      htmlFor="dietaryRestrictions"
                      className="block text-xs sm:text-sm font-medium text-foreground/80 mb-2"
                    >
                      Restricciones alimentarias
                    </label>
                    <input
                      type="text"
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-card-border rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all duration-300 bg-white dark:bg-card-bg text-foreground placeholder-text-muted"
                      placeholder="Vegetariano, alergias, etc."
                    />
                  </div>
                )}
                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-medium text-foreground/80 mb-2"
                  >
                    Mensaje para los novios
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:border-gray-500 dark:focus:border-gray-400 outline-none transition-all duration-300 resize-none bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 dark:placeholder-gray-600"
                    placeholder="Comparte tus buenos deseos..."
                  />
                </div>

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
            {/* RSVP Deadline */}
            <div className="bg-card-bg rounded-2xl p-6 shadow-md border border-card-border">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-beige-light dark:bg-beige-dark rounded-full flex items-center justify-center mr-4">
                  <span className="text-accent dark:text-accent text-xl">⏰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">
                    Fecha límite RSVP
                  </h4>
                  <p className="text-foreground/70 text-xs sm:text-sm">
                    15 de mayo de 2025
                  </p>
                </div>
              </div>
              <p className="text-foreground/70 text-xs sm:text-sm">
                Por favor confirma antes de esta fecha para ayudarnos con la organización
              </p>
            </div>


            {/* Gift Registry */}
            <div className="bg-gradient-to-br from-cream to-warm-white dark:from-warm-white dark:to-cream rounded-2xl p-6 shadow-lg border border-beige-light/50 dark:border-beige-dark/50">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-beige-light dark:bg-beige-dark rounded-full flex items-center justify-center mr-4">
                  <Gift className="w-6 h-6 text-accent dark:text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">
                    Mesa de Regalos
                  </h4>
                  <p className="text-foreground/70 text-xs sm:text-sm">
                    Tu presencia es nuestro mejor regalo
                  </p>
                </div>
              </div>
              <p className="text-foreground/70 text-xs sm:text-sm mb-4">
                Si deseas obsequiarnos algo, hemos preparado una lista de regalos en Amazon
              </p>
              <a
                href="https://www.amazon.com.mx/wedding/registry/FUM15LPMHE1K"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Gift className="w-5 h-5" />
                Ver Mesa de Regalos en Amazon
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
