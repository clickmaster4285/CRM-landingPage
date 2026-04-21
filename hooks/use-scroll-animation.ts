'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  useEffect(() => {
  // Safe refresh only - no global kill

    // Refresh ScrollTrigger calculations
    return () => {
      ScrollTrigger.refresh(true);
    };
  }, []);

}
