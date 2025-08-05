'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '@/constants/wedding';
import { useEffect, useState } from 'react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InvitationData {
  guest_name: string;
  max_guests: number;
}

export const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const searchParams = useSearchParams();
  const invitationCode = searchParams.get('invitation');
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  
  useEffect(() => {
    if (invitationCode && !dataFetched) {
      fetchInvitationData();
    }
  }, [invitationCode, dataFetched]);
  
  const fetchInvitationData = async () => {
    if (!invitationCode) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`/api/invitations/${invitationCode}`);
      const data = await response.json();
      
      if (response.ok && data.invitation) {
        setInvitationData(data.invitation);
      }
    } catch (error) {
    } finally {
      setLoading(false);
      setDataFetched(true);
    }
  };
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      const scrollY = window.scrollY;
      
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
    };
  }, [isOpen]);

  if (loading && invitationCode) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-modal-overlay backdrop-blur-sm z-50"
            onClick={(e) => e.stopPropagation()}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-card-bg rounded-2xl shadow-2xl max-w-md w-full mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-hover/5 dark:from-accent/5 dark:to-accent-hover/5"></div>
              
              <div className="relative p-8 sm:p-10 text-center">

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-serif text-text-primary dark:text-foreground mb-3">
                    {invitationData && invitationData.max_guests === 1 ? '¡Bienvenido!' : '¡Bienvenidos!'}
                  </h2>
                  
                  {invitationData ? (
                    <>
                      <p className="text-lg text-text-secondary dark:text-warm-white mb-2">
                        <span className="font-medium text-accent-hover dark:text-accent">{invitationData.guest_name}</span>
                      </p>
                      <p className="text-text-muted dark:text-warm-white/90 mb-6">
                        {invitationData.max_guests === 1 
                          ? 'Nos complace invitarte a celebrar nuestra boda'
                          : 'Nos complace invitarles a celebrar nuestra boda'}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-text-secondary dark:text-warm-white mb-2">
                        Invitado Especial
                      </p>
                      <p className="text-text-muted dark:text-warm-white/90 mb-6">
                        Nos complace invitarte a celebrar nuestra boda
                      </p>
                    </>
                  )}

                  <div className="mb-6">
                    <p className="text-xl sm:text-2xl font-serif text-accent-hover dark:text-accent">
                      {WEDDING_CONFIG.bride.name} & {WEDDING_CONFIG.groom.name}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 mx-auto bg-accent hover:bg-accent-hover text-white border-2 border-accent hover:border-accent-hover mb-4"
                  >
                    <span>Ver invitación</span>
                  </motion.button>

                  {invitationData && (
                    <p className="text-xs text-text-primary/60 dark:text-white/60">
                      Invitación válida para {invitationData.max_guests} {invitationData.max_guests === 1 ? 'persona' : 'personas'}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 right-4"
                >
                  <Sparkles className="w-6 h-6 text-accent" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-4 left-4"
                >
                  <Sparkles className="w-5 h-5 text-accent-hover" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};