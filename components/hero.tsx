'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';

const images = ['/f4.webp', '/f5.webp', '/f3.webp'];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  
  // Counter states
  const [activeUsers, setActiveUsers] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [support, setSupport] = useState(0);
  const [countersStarted, setCountersStarted] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // TEXT ANIMATION
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out',
      });

      gsap.from(buttonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from(statsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Counter animation - runs only once when page loads
  useEffect(() => {
    if (countersStarted) return;
    
    const animateCounter = (
      start: number, 
      end: number, 
      duration: number, 
      setter: React.Dispatch<React.SetStateAction<number>>
    ) => {
      const range = end - start;
      const stepTime = Math.abs(Math.floor(duration / range));
      let current = start;
      const timer = setInterval(() => {
        if (current < end) {
          current++;
          setter(current);
        } else {
          clearInterval(timer);
        }
      }, stepTime);
    };

    // Small delay to ensure component is mounted
    const timer = setTimeout(() => {
      setCountersStarted(true);
      // Active users: count from 0 to 10 (displayed as 10K)
      animateCounter(0, 10, 2000, setActiveUsers);
      // Uptime: count from 0 to 999 (displayed as 99.9%)
      animateCounter(0, 999, 2000, setUptime);
      // Support: count from 0 to 24 (displayed as 24/7)
      animateCounter(0, 24, 2000, setSupport);
    }, 500);

    return () => clearTimeout(timer);
  }, [countersStarted]);

  // BACKGROUND CAROUSEL
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(bgRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setIndex((prev) => (prev + 1) % images.length);
          gsap.to(bgRef.current, {
            opacity: 1,
            duration: 0.5,
          });
        },
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden"
    >
      {/* BACKGROUND CAROUSEL */}
      <div className="absolute inset-0 z-0">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${images[index]})`,
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="flex flex-col gap-8">

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Transform Your Business with{' '}
              <span
                className="text-white transition"
                style={{
                  textShadow: '0 0 10px rgba(255,255,255,0.25)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.textShadow =
                    '0 0 18px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.25)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.textShadow =
                    '0 0 10px rgba(255,255,255,0.25)';
                }}
              >
                ClickMasters
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-white/70 leading-relaxed"
            >
              The most powerful platform for modern businesses. Streamline your workflow,
              boost productivity, and scale faster than ever before.
            </p>

            <div ref={buttonsRef} className="flex gap-4 flex-wrap">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                onClick={scrollToContact}
              >
                Start Free Trial
              </Button>

              <Button size="lg" variant="ghost" className="px-8 text-white border-white/30 hover:bg-white/10" onClick={scrollToContact}>
                Watch Demo
              </Button>
            </div>

            {/* STATS with white text and counters */}
            <div ref={statsRef} className="flex gap-8 pt-4 text-white">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  {activeUsers}K+
                </p>
                <p className="text-sm sm:text-base text-white/70 mt-1 font-medium">Active Users</p>
              </div>
              <div className="w-px h-12 bg-white/20 self-center" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  {(uptime / 10).toFixed(1)}%
                </p>
                <p className="text-sm sm:text-base text-white/70 mt-1 font-medium">Uptime</p>
              </div>
              <div className="w-px h-12 bg-white/20 self-center" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  {support}/7
                </p>
                <p className="text-sm sm:text-base text-white/70 mt-1 font-medium">Support</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}