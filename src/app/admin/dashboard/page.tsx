'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSecureInvitationCode } from '@/lib/invitation-utils';
import { copyWhatsAppMessage, generateWhatsAppLink } from '@/lib/whatsapp-message';

interface Invitation {
  id: string;
  invitation_code: string;
  guest_name: string;
  max_guests: number;
  is_used: boolean;
  created_at: string;
}

interface RSVP {
  id: string;
  invitation_id: string;
  name: string;
  attendance: 'yes' | 'no';
  guests_count: number;
  message?: string | null;
  dietary_restrictions?: string | null;
  created_at: string;
  invitation?: Invitation;
}

export default function AdminDashboard() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'create' | 'invitations' | 'rsvps'>('create');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastCreatedInvitation, setLastCreatedInvitation] = useState<Invitation | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [invitationToDelete, setInvitationToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [newInvitation, setNewInvitation] = useState({
    guest_name: '',
    max_guests: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: invitationsData, error: invError } = await supabase
        .from('invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (!invError && invitationsData) {
        setInvitations(invitationsData);
      }

      const { data: rsvpsData, error: rsvpError } = await supabase
        .from('rsvps')
        .select('*, invitation:invitations!inner(*)')
        .order('created_at', { ascending: false });

      if (!rsvpError && rsvpsData) {
        setRsvps(rsvpsData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };


  const handleCreateInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const maxGuests = parseInt(newInvitation.max_guests);
    
    if (!newInvitation.guest_name.trim()) {
      alert('Por favor ingresa el nombre del invitado');
      return;
    }
    
    if (isNaN(maxGuests) || maxGuests < 1) {
      alert('El número de invitados debe ser al menos 1');
      return;
    }
    
    if (maxGuests > 20) {
      alert('El número máximo de invitados es 20');
      return;
    }
    
    const invitationCode = generateSecureInvitationCode(newInvitation.guest_name);
    
    const { data, error } = await supabase
      .from('invitations')
      .insert({
        invitation_code: invitationCode,
        guest_name: newInvitation.guest_name,
        max_guests: maxGuests,
      })
      .select()
      .single();

    if (!error && data) {
      setInvitations([data, ...invitations]);
      setNewInvitation({ guest_name: '', max_guests: '' });
      setLastCreatedInvitation(data);
      setShowSuccessModal(true);
    } else {
      alert('Error al crear invitación');
    }
  };

  const handleDeleteInvitation = async () => {
    if (!invitationToDelete) return;
    
    setDeleteLoading(true);
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', invitationToDelete);

    if (!error) {
      setInvitations(invitations.filter(inv => inv.id !== invitationToDelete));
      
      setRsvps(rsvps.filter(rsvp => rsvp.invitation_id !== invitationToDelete));
      
      setShowDeleteModal(false);
      setInvitationToDelete(null);
    } else {
      alert('Error al eliminar la invitación');
    }
    setDeleteLoading(false);
  };

  const openDeleteModal = (id: string) => {
    setInvitationToDelete(id);
    setShowDeleteModal(true);
  };

  const getInvitationById = (id: string) => {
    return invitations.find(inv => inv.id === id);
  };

  const hasConfirmedRSVP = (invitationId: string) => {
    return rsvps.some(rsvp => rsvp.invitation_id === invitationId);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  
  const handleCopyWhatsApp = async (invitation: Invitation) => {
    const success = await copyWhatsAppMessage(invitation.guest_name, invitation.invitation_code, invitation.max_guests);
    
    const button = document.getElementById(`message-${invitation.invitation_code}`);
    if (button && success) {
      button.textContent = '✓ Copiado';
      setTimeout(() => {
        button.textContent = '📋 Copiar Mensaje';
      }, 2000);
    }
  };
  
  const handleOpenWhatsApp = (invitation: Invitation) => {
    const link = generateWhatsAppLink(invitation.guest_name, invitation.invitation_code, invitation.max_guests);
    window.open(link, '_blank');
  };

  const getConfirmedGuests = () => {
    return rsvps
      .filter(r => r.attendance === 'yes')
      .reduce((sum, r) => sum + r.guests_count, 0);
  };

  const getTotalInvitedCapacity = () => {
    return invitations.reduce((sum, inv) => sum + inv.max_guests, 0);
  };

  const getAcceptedInvitations = () => {
    return rsvps.filter(r => r.attendance === 'yes').length;
  };

  const getPendingInvitations = () => {
    return invitations.filter(inv => !inv.is_used).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream to-beige-light dark:from-background dark:to-card-bg flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-beige-light dark:from-background dark:to-card-bg pb-20">
      <AnimatePresence>
        {showSuccessModal && lastCreatedInvitation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-card-bg rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="text-xl font-serif text-foreground mb-2">¡Invitación Creada!</h3>
                
                <div className="bg-gray-50 dark:bg-background rounded-2xl p-4 mb-4">
                  <p className="text-sm text-text-primary dark:text-white/70 mb-1">
                    <strong>Invitado:</strong> {lastCreatedInvitation.guest_name}
                  </p>
                  <p className="text-sm text-text-primary dark:text-white/70 mb-1">
                    <strong>Máx. personas:</strong> {lastCreatedInvitation.max_guests}
                  </p>
                  <p className="text-xs text-accent font-mono mt-2">
                    Código: {lastCreatedInvitation.invitation_code}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleCopyWhatsApp(lastCreatedInvitation);
                    }}
                    className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-full transition-colors flex items-center justify-center gap-2"
                  >
                    <span>📋</span> Copiar Mensaje de Invitación
                  </button>
                  
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full bg-gray-300 dark:bg-card-bg text-foreground py-3 rounded-full"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && invitationToDelete && (() => {
          const invitation = getInvitationById(invitationToDelete);
          const hasRSVP = hasConfirmedRSVP(invitationToDelete);
          const rsvp = rsvps.find(r => r.invitation_id === invitationToDelete);
          
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowDeleteModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white dark:bg-card-bg rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  hasRSVP 
                    ? 'bg-red-100 dark:bg-red-900/20' 
                    : 'bg-yellow-100 dark:bg-yellow-900/20'
                }`}>
                  <span className="text-3xl">{hasRSVP ? '🚨' : '⚠️'}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-foreground mb-3 text-center">
                  {hasRSVP ? '¡Advertencia!' : '¿Eliminar invitación?'}
                </h3>

                {invitation && (
                  <div className="bg-gray-50 dark:bg-background rounded-xl p-3 mb-4">
                    <p className="text-sm font-medium text-foreground mb-1">
                      {invitation.guest_name}
                    </p>
                    <p className="text-xs text-text-primary/60 dark:text-white/60">
                      Código: {invitation.invitation_code}
                    </p>
                  </div>
                )}

                {hasRSVP ? (
                  <div className="space-y-3 mb-6">
                    <p className="text-text-primary dark:text-white/80 text-center font-medium">
                      Esta invitación ya fue confirmada
                    </p>
                    {rsvp && (
                      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-3">
                        <p className="text-sm text-red-800 dark:text-red-400">
                          <strong>Confirmación actual:</strong>
                        </p>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                          • {rsvp.attendance === 'yes' ? 'Asistirá' : 'No asistirá'}
                          {rsvp.attendance === 'yes' && ` - ${rsvp.guests_count} ${rsvp.guests_count === 1 ? 'persona' : 'personas'}`}
                        </p>
                      </div>
                    )}
                    <p className="text-sm text-text-primary/70 dark:text-white/70 text-center">
                      Al eliminar esta invitación, también se eliminará la confirmación de asistencia.
                    </p>
                  </div>
                ) : (
                  <p className="text-text-primary dark:text-white/80 text-center mb-6">
                    Esta acción no se puede deshacer. La invitación será eliminada permanentemente.
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setInvitationToDelete(null);
                    }}
                    className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-full transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteInvitation}
                    disabled={deleteLoading}
                    className={`flex-1 px-4 py-3 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      hasRSVP 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {deleteLoading ? 'Eliminando...' : (hasRSVP ? 'Eliminar de todos modos' : 'Sí, eliminar')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <div className="sticky top-0 bg-white/80 dark:bg-card-bg/80 backdrop-blur-lg z-40 border-b border-card-border">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-serif text-foreground">Panel Admin</h1>
            <button
              onClick={handleLogout}
              className="text-red-500 p-2"
              aria-label="Cerrar sesión"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="min-w-[140px] bg-white dark:bg-card-bg rounded-2xl p-4 shadow-sm border border-card-border snap-center"
          >
            <div className="text-3xl mb-2">📨</div>
            <div className="text-2xl font-bold text-foreground">{invitations.length}</div>
            <div className="text-xs text-text-primary dark:text-white/70">Invitaciones</div>
          </motion.div>
          
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="min-w-[140px] bg-white dark:bg-card-bg rounded-2xl p-4 shadow-sm border border-card-border snap-center"
          >
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-accent">{getAcceptedInvitations()}</div>
            <div className="text-xs text-text-primary dark:text-white/70">Confirmadas</div>
          </motion.div>
          
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="min-w-[140px] bg-white dark:bg-card-bg rounded-2xl p-4 shadow-sm border border-card-border snap-center"
          >
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-foreground">
              {getConfirmedGuests()}/{getTotalInvitedCapacity()}
            </div>
            <div className="text-xs text-text-primary dark:text-white/70">Asistirán/Invitados</div>
          </motion.div>
          
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="min-w-[140px] bg-white dark:bg-card-bg rounded-2xl p-4 shadow-sm border border-card-border snap-center"
          >
            <div className="text-3xl mb-2">⏳</div>
            <div className="text-2xl font-bold text-yellow-600">{getPendingInvitations()}</div>
            <div className="text-xs text-text-primary dark:text-white/70">Pendientes</div>
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-card-bg border-t border-card-border z-40">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'create' 
                ? 'text-accent' 
                : 'text-text-primary/50 dark:text-white/50'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs">Crear</span>
          </button>
          
          <button
            onClick={() => setActiveTab('invitations')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'invitations' 
                ? 'text-accent' 
                : 'text-text-primary/50 dark:text-white/50'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Invitaciones</span>
            {invitations.length > 0 && (
              <span className="absolute top-2 ml-6 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {invitations.length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('rsvps')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'rsvps' 
                ? 'text-accent' 
                : 'text-text-primary/50 dark:text-white/50'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">RSVPs</span>
            {rsvps.length > 0 && (
              <span className="absolute top-2 ml-6 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {rsvps.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="px-4">
        <AnimatePresence mode="wait">
          {activeTab === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-card-bg rounded-3xl p-6 shadow-lg border border-card-border">
                <h2 className="text-xl font-serif text-foreground mb-6 text-center">
                  Nueva Invitación
                </h2>
                
                <form onSubmit={handleCreateInvitation} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                      Nombre del Invitado
                    </label>
                    <input
                      type="text"
                      value={newInvitation.guest_name}
                      onChange={(e) => setNewInvitation({...newInvitation, guest_name: e.target.value})}
                      required
                      className="w-full px-4 py-4 border border-card-border rounded-2xl focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-gray-50 dark:bg-background text-stone-900 dark:text-white text-base"
                      placeholder="Ej: Juan y María Pérez"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                      Número Máximo de Invitados
                    </label>
                    <input
                      type="number"
                      value={newInvitation.max_guests}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseInt(value) > 0 && parseInt(value) <= 20)) {
                          setNewInvitation({...newInvitation, max_guests: value});
                        }
                      }}
                      required
                      min="1"
                      max="20"
                      className="w-full px-4 py-4 border border-card-border rounded-2xl focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-gray-50 dark:bg-background text-stone-900 dark:text-white text-base"
                      placeholder="Ej: 2"
                    />
                    <p className="text-xs text-text-primary/60 dark:text-white/60 mt-1">
                      Máximo 20 personas por invitación
                    </p>
                  </div>
                  
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-full font-medium text-base transition-all duration-300 shadow-lg"
                  >
                    Crear Invitación
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === 'invitations' && (
            <motion.div
              key="invitations"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <h2 className="text-xl font-serif text-foreground mb-4">
                Lista de Invitaciones
              </h2>
              
              {invitations.length === 0 ? (
                <div className="bg-white dark:bg-card-bg rounded-2xl p-8 text-center">
                  <p className="text-text-primary/60 dark:text-white/60">
                    No hay invitaciones creadas
                  </p>
                </div>
              ) : (
                invitations.map((invitation) => (
                  <motion.div
                    key={invitation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white dark:bg-card-bg rounded-2xl p-4 shadow-sm border border-card-border"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground text-base">
                          {invitation.guest_name}
                        </h3>
                        <p className="text-xs text-text-primary/60 dark:text-white/60 mt-1">
                          Código: <span className="font-mono text-accent">{invitation.invitation_code}</span>
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        invitation.is_used 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {invitation.is_used ? 'Confirmado' : 'Pendiente'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-primary/60 dark:text-white/60">
                        Máx: {invitation.max_guests} {invitation.max_guests === 1 ? 'persona' : 'personas'}
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <button
                        id={`message-${invitation.invitation_code}`}
                        onClick={() => handleCopyWhatsApp(invitation)}
                        className="flex-1 bg-accent hover:bg-accent-hover text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                      >
                        📋 Copiar Mensaje
                      </button>
                      <button
                        onClick={() => openDeleteModal(invitation.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs transition-colors"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'rsvps' && (
            <motion.div
              key="rsvps"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <h2 className="text-xl font-serif text-foreground mb-4">
                Confirmaciones Recibidas
              </h2>
              
              {rsvps.length === 0 ? (
                <div className="bg-white dark:bg-card-bg rounded-2xl p-8 text-center">
                  <p className="text-text-primary/60 dark:text-white/60">
                    No hay confirmaciones aún
                  </p>
                </div>
              ) : (
                rsvps.map((rsvp) => (
                  <motion.div
                    key={rsvp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-card-bg rounded-2xl p-4 shadow-sm border border-card-border"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-foreground text-base">
                        {rsvp.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        rsvp.attendance === 'yes' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {rsvp.attendance === 'yes' ? '✅ Asistirá' : '❌ No asistirá'}
                      </span>
                    </div>
                    
                    {rsvp.attendance === 'yes' && (
                      <div className="mb-2">
                        <p className="text-sm text-text-primary dark:text-white">
                          👥 Confirmó: {rsvp.guests_count} {rsvp.guests_count === 1 ? 'persona' : 'personas'}
                        </p>
                        {rsvp.invitation && (
                          <p className="text-xs text-text-primary/60 dark:text-white/60">
                            (Invitación para {rsvp.invitation.max_guests} {rsvp.invitation.max_guests === 1 ? 'persona' : 'personas'})
                          </p>
                        )}
                      </div>
                    )}
                    
                    {rsvp.dietary_restrictions && (
                      <p className="text-xs text-text-primary/70 dark:text-white/70 mb-2">
                        🍽️ {rsvp.dietary_restrictions}
                      </p>
                    )}
                    
                    {rsvp.message && (
                      <p className="text-sm text-text-primary/80 dark:text-white/80 italic bg-gray-50 dark:bg-background rounded-xl p-3 mt-2">
                        "{rsvp.message}"
                      </p>
                    )}
                    
                    <p className="text-xs text-text-primary/50 dark:text-white/50 mt-2">
                      {new Date(rsvp.created_at).toLocaleDateString('es-MX', { 
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}