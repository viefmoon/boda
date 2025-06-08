import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            id: entry.target.id,
            ratio: entry.intersectionRatio,
            top: entry.boundingClientRect.top,
          }))
          .sort((a, b) => {
            // Sort by intersection ratio first, then by distance from top
            if (Math.abs(a.ratio - b.ratio) > 0.1) {
              return b.ratio - a.ratio;
            }

            return Math.abs(a.top) - Math.abs(b.top);
          });

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].id);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    // Observe all sections
    const elements: HTMLElement[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        elements.push(element);
        observer.observe(element);
      }
    });

    // Fallback: detect active section on scroll for edge cases
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);

        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);

          break;
        }
      }
    };

    // Add scroll listener as fallback
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
};

export const useInView = (threshold: number = 0.1) => {
  const [inView, setInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return [setRef, inView] as const;
};
