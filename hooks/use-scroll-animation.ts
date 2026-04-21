'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  useEffect(() => {
    // Kill all ScrollTriggers on mount to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Refresh ScrollTrigger calculations
    return () => {
      ScrollTrigger.refresh();
    };
  }, []);
}
