'use client';

import { useState, useEffect, useRef } from 'react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import {
  HeroSection,
  CoupleIntroduction,
  WeddingDetailsCard,
  CountdownTimer,
  WeddingParty,
  RSVP,
  GalleryPreview,
  ClosingMessage,
  FloatingNavigation,
  MusicPlayer,
  ScrollProgressIndicator,
  WelcomeModal,
} from '../components';
import { ScrollOptimizer } from '@/components/scroll-optimizer';
import { ContentPreloader } from '@/components/content-preloader';
import { NAVIGATION_SECTIONS, WEDDING_CONFIG } from '@/constants';

import type { MusicPlayerRef } from '../components/music-player';

export default function HomeView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const musicPlayerRef = useRef<MusicPlayerRef>(null);
  const { scrollToElement } = useSmoothScroll();

  const activeSection = useScrollSpy(
    NAVIGATION_SECTIONS.map((section) => section.id)
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    scrollToElement(sectionId);
  };

  const handleWelcomeModalClose = async () => {
    setShowWelcomeModal(false);
    
    if (musicPlayerRef.current) {
      await musicPlayerRef.current.startMusic();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Scroll Optimizer */}
      <ScrollOptimizer />
      
      {/* Content Preloader */}
      <ContentPreloader />
      
      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onClose={handleWelcomeModalClose} 
      />

      <FloatingNavigation
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <section id="hero" className="relative">
        <HeroSection
          isLoaded={isLoaded}
          couple={WEDDING_CONFIG}
          onScrollToSection={scrollToSection}
        />
      </section>

      {/* Couple Introduction */}
      <section id="couple" className="relative">
        <CoupleIntroduction />
      </section>

      {/* Wedding Details */}
      <section id="details" className="relative">
        <WeddingDetailsCard
          date={WEDDING_CONFIG.date}
        />
        <CountdownTimer targetDate={WEDDING_CONFIG.date} />
      </section>

      {/* Wedding Party */}
      <section id="wedding-party" className="relative">
        <WeddingParty />
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className="relative">
        <GalleryPreview />
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="relative">
        <RSVP />
      </section>

      {/* Closing Message */}
      <section id="closing" className="relative">
        <ClosingMessage
          bride={WEDDING_CONFIG.bride.fullName}
          groom={WEDDING_CONFIG.groom.fullName}
        />
      </section>

      {/* Music Player */}
      <MusicPlayer ref={musicPlayerRef} />

      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator activeSection={activeSection} />
    </div>
  );
}
