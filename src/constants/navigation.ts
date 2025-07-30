export const NAVIGATION_ANIMATIONS = {
  navigation: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2 },
  },
  button: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: { duration: 0.3 },
  },
  background: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { duration: 0.3, type: 'spring', stiffness: 300 },
  },
  icon: {
    active: {
      rotate: [0, -10, 10, -10, 0],
      scale: [1, 1.1, 1],
    },
    hover: { scale: 1.2, rotate: 5 },
    transition: { duration: 0.5 },
  },
  pulse: {
    animate: { scale: [1, 1.5, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const NAVIGATION_SECTIONS = [
  {
    id: 'hero',
    label: 'Inicio',
    icon: 'Home',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    id: 'couple',
    label: 'Los Novios',
    icon: 'Heart',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'details',
    label: 'Detalles',
    icon: 'Calendar',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'venue',
    label: 'Lugar',
    icon: 'MapPin',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'gallery',
    label: 'Galería',
    icon: 'Camera',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'rsvp',
    label: 'Confirmar',
    icon: 'Mail',
    gradient: 'from-cyan-500 to-teal-500',
  },
];
