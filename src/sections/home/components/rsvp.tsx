'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';

interface Invitation {
  id: string;
  invitation_code: string;
  guest_name: string;
  max_guests: number;
}

interface ExistingRSVP {
  id?: string;
  name: string;
  attendance: 'yes' | 'no';
  guests_count: number;
  dietary_restrictions?: string | null;
  message?: string | null;
}

export const RSVP = () => {
  const searchParams = useSearchParams();
  const invitationCode = searchParams.get('invitation');
  
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [existingRsvp, setExistingRsvp] = useState<ExistingRSVP | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    guests: '1',
    dietary_restrictions: '',
    message: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (invitationCode) {
      loadInvitation();
    }
  }, [invitationCode]);
  
  useEffect(() => {
    if (invitation && !existingRsvp) {
      setFormData(prev => ({
        ...prev,
        name: invitation.guest_name
      }));
    }
    if (existingRsvp) {
      setFormData({
        name: existingRsvp.name,
        attendance: existingRsvp.attendance,
        guests: existingRsvp.guests_count.toString(),
        dietary_restrictions: existingRsvp.dietary_restrictions || '',
        message: existingRsvp.message || ''
      });
    }
  }, [invitation, existingRsvp]);

  const loadInvitation = async () => {
    if (!invitationCode) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/invitations/${invitationCode}`);
      const data = await response.json();
      
      if (response.ok) {
        setInvitation(data.invitation);
        if (data.hasResponded && data.rsvp) {
          setExistingRsvp(data.rsvp);
        }
      } else {
        setError('Invitación no válida');
      }
    } catch (err) {
      setError('Error al cargar la invitación');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRSVP = async () => {
    if (!existingRsvp?.id) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/rsvp/${existingRsvp.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setExistingRsvp(null);
        setIsEditing(false);
        setShowDeleteModal(false);
        setFormData({
          name: invitation?.guest_name || '',
          attendance: '',
          guests: '1',
          dietary_restrictions: '',
          message: ''
        });
      } else {
        alert('Error al eliminar la confirmación');
      }
    } catch (error) {
      alert('Error al eliminar la confirmación');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invitationCode) {
      setError('Se requiere un código de invitación válido');
      return;
    }
    
    
    setLoading(true);
    setError('');
    
    try {
      const method = existingRsvp && isEditing ? 'PUT' : 'POST';
      const url = existingRsvp && isEditing ? `/api/rsvp/${existingRsvp.id}` : '/api/rsvp';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invitation_code: invitationCode,
          name: formData.name,
          attendance: formData.attendance,
          guests_count: parseInt(formData.guests),
          dietary_restrictions: formData.dietary_restrictions,
          message: ''
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (isEditing) {
          setExistingRsvp({
            ...existingRsvp,
            name: formData.name,
            attendance: formData.attendance as 'yes' | 'no',
            guests_count: parseInt(formData.guests),
            dietary_restrictions: formData.dietary_restrictions,
            message: formData.message
          });
          setIsEditing(false);
        } else {
          setIsSubmitted(true);
        }
      } else {
        setError(data.error || 'Error al enviar confirmación');
      }
    } catch (err) {
      setError('Error al enviar confirmación');
    } finally {
      setLoading(false);
    }
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

  if (existingRsvp && !isEditing) {
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
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-4">
              Ya has confirmado tu asistencia
            </h3>
            <p className="text-text-primary dark:text-white text-base sm:text-lg md:text-xl mb-4">
              {existingRsvp.attendance === 'yes' 
                ? `Confirmaste asistencia para ${existingRsvp.guests_count} ${existingRsvp.guests_count === 1 ? 'persona' : 'personas'}`
                : 'Confirmaste que no podrás asistir'}
            </p>
            
            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-full transition-colors"
              >
                ✏️ Editar respuesta
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
              >
                🗑️ Eliminar respuesta
              </button>
            </div>
            
          </motion.div>

          {showDeleteModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowDeleteModal(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white dark:bg-card-bg rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">⚠️</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif text-foreground mb-3 text-center">
                    ¿Eliminar confirmación?
                  </h3>

                  <p className="text-text-primary dark:text-white/80 text-center mb-6">
                    Esta acción no se puede deshacer. Tendrás que confirmar nuevamente tu asistencia si cambias de opinión.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-full transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleDeleteRSVP}
                      disabled={loading}
                      className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Eliminando...' : 'Sí, eliminar'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    );
  }

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
            <p className="text-text-primary dark:text-white text-base sm:text-lg md:text-xl">
              Hemos recibido tu confirmación. ¡Nos vemos pronto!
            </p>
            <div className="mt-6 text-2xl text-accent">♥</div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!invitationCode) {
    return (
      <div className="py-8 px-4 bg-cream dark:bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card-bg rounded-3xl p-12 shadow-lg border border-card-border">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-4">
              Confirmación de Asistencia
            </h3>
            <p className="text-text-primary dark:text-white text-base sm:text-lg mb-4">
              Necesitas un código de invitación para confirmar tu asistencia.
            </p>
            <p className="text-sm text-text-primary/70 dark:text-white/70">
              Si recibiste una invitación, usa el link proporcionado.
            </p>
          </div>
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          {invitation && (
            <div className="mb-4">
              <p className="text-lg sm:text-xl text-accent font-light">
                Invitación para:
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground mb-2">
                {invitation.guest_name}
              </h2>
            </div>
          )}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground mb-3 font-light">
            Confirmación de Asistencia
          </h2>
          <div className="w-16 h-px bg-accent/30 mx-auto mb-3"></div>
          <p className="text-sm text-text-primary dark:text-white max-w-xl mx-auto font-light">
            Por favor, confírmanos tu asistencia para nuestro gran día
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card-bg rounded-3xl p-8 shadow-lg border border-card-border">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-foreground mb-3 text-center">
                Confirmación de Asistencia
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-text-primary dark:text-white mb-2"
                  >
                    Nombre:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    disabled={true}
                    className="w-full px-4 py-3 border border-card-border rounded-xl bg-gray-100 dark:bg-card-bg/50 text-stone-700 dark:text-white/70 cursor-not-allowed font-medium"
                  />
                  <p className="text-xs text-text-primary/50 dark:text-white/50 mt-1">
                    Esta invitación es personal e intransferible
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="attendance"
                    className="block text-xs sm:text-sm font-medium text-text-primary dark:text-white mb-2"
                  >
                    ¿Asistirás? *
                  </label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-card-border rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all duration-300 bg-white dark:bg-card-bg text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="yes">Sí, ahí estaré</option>
                    <option value="no">No podré asistir</option>
                  </select>
                </div>
                {formData.attendance === 'yes' && invitation && (
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-xs sm:text-sm font-medium text-text-primary dark:text-white mb-2"
                    >
                      Número de invitados (máximo: {invitation.max_guests})
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-card-border rounded-xl focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all duration-300 bg-white dark:bg-card-bg text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400"
                    >
                      {Array.from({ length: invitation.max_guests }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'persona' : 'personas'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}



                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent-hover text-white py-4 px-6 rounded-full font-light text-base sm:text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : (isEditing ? 'Actualizar Confirmación' : 'Enviar Confirmación')}
                </button>
                
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      if (existingRsvp) {
                        setFormData({
                          name: existingRsvp.name,
                          attendance: existingRsvp.attendance,
                          guests: existingRsvp.guests_count.toString(),
                          dietary_restrictions: existingRsvp.dietary_restrictions || '',
                          message: existingRsvp.message || ''
                        });
                      }
                    }}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-4 px-6 rounded-full font-light text-base sm:text-lg transition-all duration-300 mt-3"
                  >
                    Cancelar
                  </button>
                )}
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >

          </motion.div>
        </div>
      </div>
    </div>
  );
};
