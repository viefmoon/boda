'use client';

import { motion } from 'framer-motion';

export default function NoInvitationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-beige-light dark:from-background dark:to-card-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white dark:bg-card-bg rounded-3xl p-8 shadow-xl border border-card-border">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔒</span>
          </div>
          
          <h1 className="text-3xl font-serif text-foreground mb-4">
            Invitación Requerida
          </h1>
          
          <p className="text-text-primary dark:text-white/80 mb-6">
            Para acceder a este sitio necesitas un código de invitación válido.
          </p>
          
          <p className="text-sm text-text-primary/60 dark:text-white/60">
            Si recibiste una invitación, por favor usa el enlace proporcionado en tu invitación.
          </p>
          
          <div className="mt-8 pt-6 border-t border-card-border">
            <p className="text-xs text-text-primary/50 dark:text-white/50">
              Si tienes problemas para acceder, contacta a los novios directamente.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}