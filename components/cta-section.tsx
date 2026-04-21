'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: 'power3.out',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-6 lg:py-12 bg-secondary-foreground">
      <div className="container mx-auto px-6">

        {/* CTA Card */}
        <div
          ref={containerRef}
          className="relative max-w-5xl mx-auto "
        >

          {/* soft mesh overlay */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

          {/* content */}
          <div
            ref={contentRef}
            className="relative text-center px-8 py-16 lg:py-24"
          >

            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-tight">
              The work is hard enough.<br />
              Your tools shouldn't be.
            </h2>

            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto">
              Try Pinnacle free. Move your work over in an afternoon. Wonder why you waited.
            </p>

            <Button
              size="lg"
              className="mt-8 rounded-full bg-white text-black hover:bg-white/90 h-12 px-7 text-base shadow-lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

          </div>

        </div>
      </div>
    </section>
  );
}