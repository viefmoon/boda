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
      <div className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-12 shadow-xl border border-rose-100"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-800 mb-4">
              ¡Gracias!
            </h3>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              Hemos recibido tu confirmación. ¡Nos vemos pronto!
            </p>
            <div className="mt-6 text-2xl">💕</div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            Confirmación de Asistencia
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
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
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 mb-6 text-center">
                Confirma tu Asistencia
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
                    placeholder="Nombre completo"
                  />
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
                    placeholder="Correo electrónico"
                  />
                </div>
                {/* Attendance */}
                <div>
                  <label
                    htmlFor="attendance"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                  >
                    ¿Asistirás? *
                  </label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
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
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                    >
                      Número de invitados
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
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
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                    >
                      Restricciones alimentarias
                    </label>
                    <input
                      type="text"
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="Vegetariano, alergias, etc."
                    />
                  </div>
                )}
                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                  >
                    Mensaje para los novios
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300 resize-none"
                    placeholder="Comparte tus buenos deseos..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-4 px-6 rounded-xl font-medium text-base sm:text-lg hover:from-rose-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-rose-600 text-xl">⏰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    Fecha límite RSVP
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    15 de mayo de 2025
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                Por favor confirma antes de esta fecha para ayudarnos con la organización
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-xl">📞</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    ¿Preguntas?
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Estamos aquí para ayudarte
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>📧 bodaoswaldsofiaM@gmail.com</p>
                <p>📱 +52 123 456 7890</p>
              </div>
            </div>

            {/* Gift Registry */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 shadow-lg border border-amber-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <Gift className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    Mesa de Regalos
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Tu presencia es nuestro mejor regalo
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mb-4">
                Si deseas obsequiarnos algo, hemos preparado una lista de regalos
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/60 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                  Gank Now
                </span>
                <span className="bg-white/60 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                  Fantia
                </span>
                <span className="bg-white/60 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                  Trakteer
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
