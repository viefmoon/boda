import type { NAVIGATION_SECTIONS } from '@/constants';
import type { NAVIGATION_ANIMATIONS } from '@/constants/navigation';

export type NavigationSection = (typeof NAVIGATION_SECTIONS)[number];
export type NavigationAnimation = typeof NAVIGATION_ANIMATIONS;
