'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Sign Up',
    description:
      'Create your account in minutes with no credit card required. Get instant access to all features.',
  },
  {
    number: '02',
    title: 'Configure',
    description:
      'Set up your workspace and connect your existing tools through our simple integration panel.',
  },
  {
    number: '03',
    title: 'Automate',
    description:
      'Define your workflows and let our platform handle the heavy lifting automatically.',
  },
  {
    number: '04',
    title: 'Scale',
    description:
      'Watch your business grow as our platform scales with you to handle any workload.',
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = containerRef.current?.querySelector('h2');

      if (heading) {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      }

      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power3.out',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="py-24 px-6 bg-secondary-foreground text-white relative overflow-hidden"
    >
      {/* subtle glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From zero to hero in minutes. Simple onboarding, powerful results.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

          {/* connector line */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => (stepsRef.current[index] = el)}
              className="relative"
            >
              <div className="flex flex-col h-full items-start">

                {/* Number */}
                <div className="mb-5 relative">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
                    {step.number}
                  </div>

                  {/* glow ring */}
                  <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}