'use client';

import { motion } from 'motion/react';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Music, Play } from 'lucide-react';

interface MusicPlayerProps {
  className?: string;
}

export interface MusicPlayerRef {
  startMusic: () => Promise<void>;
}

const MusicPlayer = forwardRef<MusicPlayerRef, MusicPlayerProps>(({ className = '' }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startMusic = async () => {
    const audio = audioRef.current;
    
    if (!audio || isPlaying) return;

    try {
      audio.volume = 0.5;
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error al iniciar música:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    startMusic
  }));

  useEffect(() => {
    const audio = audioRef.current;
    
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    audio.volume = 0.5;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        audio.volume = 0.5;
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error al reproducir:', error);
        setIsPlaying(false);
      }
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Audio element separado - se carga inmediatamente */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/assets/audio/song.mp3"
        aria-label="Música de fondo de la boda"
        style={{ display: 'none' }}
      >
        <track
          kind="captions"
          src="/assets/audio/song.mp3"
          label="Sin subtítulos disponibles"
        />
        Tu navegador no soporta el elemento de audio.
      </audio>

      <motion.div
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          type: 'spring',
          stiffness: 200,
        }}
        className={`fixed bottom-6 right-6 z-40 ${className}`}
      >

        {/* Progress Ring */}
        <div className="relative">
          <svg
            className="w-14 h-14 transform -rotate-90 absolute inset-0"
            viewBox="0 0 64 64"
          >
            {/* Background circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#musicGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: progress / 100,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{
                strokeDasharray: '175.93',
                strokeDashoffset: 0,
              }}
            />
            <defs>
              <linearGradient
                id="musicGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--beige-light)" />
                <stop offset="50%" stopColor="var(--beige)" />
                <stop offset="100%" stopColor="var(--beige-dark)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Main Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 bg-white/95 backdrop-blur-md border border-beige-light/20 rounded-full shadow-xl hover:shadow-beige/20 transition-all duration-300 group overflow-hidden"
            onClick={togglePlayPause}
          >
            {/* Button background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-beige-light/20 to-beige/20 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-full"
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                  'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
                  'linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))',
                  'linear-gradient(315deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Icon container */}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              {isPlaying ? (
                // Pause icon with animated sound waves
                <div className="flex items-center space-x-0.5">
                  <motion.div
                    animate={{
                      scaleY: [1, 1.5, 1, 2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-1 h-3 bg-gradient-to-t from-beige-light to-beige rounded-full"
                  />
                  <motion.div
                    animate={{
                      scaleY: [1, 2, 1, 1.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.2,
                    }}
                    className="w-1 h-4 bg-gradient-to-t from-beige to-beige-dark rounded-full"
                  />
                  <motion.div
                    animate={{
                      scaleY: [1, 1.5, 2, 1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.4,
                    }}
                    className="w-1 h-3 bg-gradient-to-t from-beige-dark to-beige-light rounded-full"
                  />
                </div>
              ) : (
                // Play icon
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="filter drop-shadow-sm"
                >
                  <Play className="w-6 h-6 text-beige fill-current" />
                </motion.div>
              )}
            </div>

            {/* Ripple effect on click */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-beige-light/30 to-beige/30 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 2, opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>

          {/* Music info tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-gray-800/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm whitespace-nowrap pointer-events-none"
          >
            <div className="font-medium flex items-center gap-1">
              <Music className="w-3 h-3" />
              {isPlaying ? 'Reproduciendo' : 'Pausado'}
            </div>
            <div className="text-gray-300 text-xs">
              Música de Boda
            </div>

            {/* Tooltip arrow */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-gray-800/90 border-y-4 border-y-transparent"></div>
          </motion.div>

          {/* Volume indicator for when playing */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-beige-light to-beige rounded-full flex items-center justify-center shadow-lg"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-2 h-2 bg-white rounded-full"
              />
            </motion.div>
          )}

        </div>
      </motion.div>
    </>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;
