'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { Heart, Mail, Sparkles, Hand } from 'lucide-react';

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName: string;
}

export const LetterAnimation = ({
  onOpen,
  coupleName,
}: LetterAnimationProps) => {
  const searchParams = useSearchParams();

  const toName =
    searchParams.get('to') || searchParams.get('toName') || 'Invitado Especial';

  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-warm-white via-beige-light to-warm-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-beige-light/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-beige/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-beige-light/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100%', opacity: 0.3, rotate: 0 }}
            animate={{
              y: '-100%',
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 360, 720],
              x: [0, 50, -50, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5,
            }}
            className="absolute text-beige"
            style={{
              left: `${10 + i * 15}%`,
            }}
          >
            <Heart className="w-6 h-6 text-beige-dark fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center">
          {/* Greeting Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8 sm:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 mb-4">
              ¡Bienvenido!
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto">
              {toName ? (
                <>
                  Querido/a{' '}
                  <span className="font-light text-beige-dark">{toName}</span>
                  <br />
                  Estás invitado/a a nuestra boda
                </>
              ) : (
                'Estás invitado/a a nuestra boda'
              )}
            </p>
          </motion.div>

          {/* Letter Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative mx-auto"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="relative cursor-pointer"
              onClick={handleClick}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Envelope Back */}
              <motion.div
                className="w-80 h-56 sm:w-96 sm:h-64 bg-gradient-to-br from-beige-light to-beige rounded-lg shadow-2xl relative mx-auto"
                animate={{
                  rotateY: isOpening ? 15 : 0,
                  z: isOpening ? -50 : 0,
                }}
                transition={{ duration: 0.8 }}
              >
                {/* Envelope Pattern */}
                <div className="absolute inset-4 border-2 border-beige-dark/30 rounded border-dashed"></div>

                {/* Wax Seal */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-lg flex items-center justify-center"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    rotate: isHovered ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail className="w-6 h-6 text-white" />
                </motion.div>

                {/* Envelope Flap */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-beige to-beige-dark origin-top"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                  animate={{
                    rotateX: isOpening ? -180 : 0,
                    z: isOpening ? 50 : 0,
                  }}
                  transition={{ duration: 1, delay: isOpening ? 0.2 : 0 }}
                />
              </motion.div>

              {/* Letter Inside */}
              <AnimatePresence>
                {isOpening && (
                  <motion.div
                    initial={{ y: 0, opacity: 0, scale: 0.8 }}
                    animate={{ y: -40, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-54 sm:w-80 sm:h-58 bg-gradient-to-br from-warm-white to-white rounded-lg shadow-xl border border-beige-light"
                  >
                    <div className="p-6 sm:p-8 h-full flex flex-col justify-center text-center">
                      <div className="text-beige-dark mb-4">
                        <Heart className="w-8 h-8 sm:w-10 sm:h-10 mx-auto fill-current" />
                      </div>
                      {toName && (
                        <p className="text-sm sm:text-base text-gray-600 mb-2">
                          Para:{' '}
                          <span className="font-light text-beige-dark">
                            {toName}
                          </span>
                        </p>
                      )}
                      <h3 className="text-lg sm:text-xl font-serif text-gray-800 mb-2">
                        {coupleName}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Te invitamos a celebrar nuestra unión
                      </p>
                      <div className="text-xs sm:text-sm text-gray-500 font-serif italic">
                        &ldquo;Donde hay amor, hay vida&rdquo;
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sparkle Effects */}
              <AnimatePresence>
                {isHovered && !isOpening && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, (Math.random() - 0.5) * 100],
                          y: [0, (Math.random() - 0.5) * 100],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                        className="absolute top-1/2 left-1/2 text-yellow-400 pointer-events-none"
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Click Instruction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpening ? 0 : 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="mt-8 sm:mt-12"
          >
            <motion.p
              animate={{
                y: [0, -8, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-sm sm:text-base text-soft-gray font-light"
            >
              {isHovered
                ? '¡Haz clic para abrir!'
                : 'Haz clic en el sobre para abrir'}
            </motion.p>
            <div className="flex justify-center mt-4">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-2xl"
              >
                <Hand className="w-8 h-8 text-gray-600" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading overlay when opening */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-beige-light border-t-beige-dark rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 text-lg font-medium">
                Abriendo la invitación...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
