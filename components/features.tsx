'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Real-Time Analytics',
    description: 'Track your metrics in real-time with beautiful dashboards.',
    image: '/f1.jpg',
  },
  {
    title: 'Advanced Automation',
    description: 'Automate repetitive tasks and workflows.',
    image: '/f2.webp',
  },
  {
    title: 'Seamless Integration',
    description: 'Connect with your favorite tools easily.',
    image: '/f3.jpg',
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-level security with compliance.',
    image: '/f4.jpg',
  },
  {
    title: 'Smart Collaboration',
    description: 'Real-time teamwork without friction.',
    image: '/f5.webp',
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Built to grow globally with your business.',
    image: '/f6.webp',
  },
];

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = containerRef.current?.querySelector('h2');

      if (heading) {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
          },
          y: 25,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power3.out',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={containerRef}
      className="py-24 lg:py-32 bg-gradient-soft"
    >
      <div className="container mx-auto px-6">

        {/* Header (same style as UseCases) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-primary mb-3">
            Powerful features
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Built for modern teams.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {features.map((f, i) => (
            <div
              key={f.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group rounded-3xl bg-card border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30"
            >

              {/* IMAGE */}
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={f.image}
                  alt={f.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h3 className="text-xl font-semibold mb-3">
                  {f.title}
                </h3>

                <p className="text-sm text-foreground/80 leading-relaxed">
                  {f.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}