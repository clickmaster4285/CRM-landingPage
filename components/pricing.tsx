'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for individuals and small teams',
    features: [
      'Up to 10 projects',
      '5 team members',
      'Basic analytics',
      'Community support',
      '5GB storage',
    ],
  },
  {
    name: 'Professional',
    price: '$79',
    description: 'For growing businesses',
    highlight: true,
    features: [
      'Unlimited projects',
      '25 team members',
      'Advanced analytics',
      'Priority support',
      '100GB storage',
      'Custom integrations',
      'Advanced automation',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Professional',
      'Unlimited everything',
      'Dedicated support',
      'Custom contracts',
      'On-premise option',
      'Advanced security',
      'SLA guarantee',
    ],
  },
];

export function Pricing() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Title animation
      gsap.from(containerRef.current?.querySelector('h2'), {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 25,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });

      // Cards animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          delay: i * 0.12,
          ease: 'power3.out',
        });

        // hover lift only
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            duration: 0.25,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          });
        });

        // soft glow for featured
        if (card.dataset.featured === 'true') {
          gsap.to(card, {
            boxShadow: '0 0 40px rgba(var(--primary), 0.18)',
            repeat: -1,
            yoyo: true,
            duration: 2.8,
            ease: 'sine.inOut',
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="py-24 px-6 bg-background"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Simple, <span className="text-primary">Transparent Pricing</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Choose a plan that grows with your business.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">

         {plans.map((plan, i) => (
  <div
    key={plan.name}
    ref={(el) => (cardsRef.current[i] = el)}
    className="relative"
  >

    {/* OUTSIDE CARD BADGE (FIXED) */}
    {plan.highlight && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
        <span className="bg-primary text-primary-foreground px-4 py-1 text-xs rounded-full shadow-md">
          Most Popular
        </span>
      </div>
    )}

    <Card
      data-featured={plan.highlight ? 'true' : 'false'}
      className={`
        relative h-full rounded-2xl
        bg-card border shadow-sm
        transition-all duration-300
        ${plan.highlight ? 'border-primary scale-[1.03]' : 'border-border'}
      `}
    >

      {/* HEADER */}
      <CardHeader className="p-6 pb-3">
        <CardTitle className="text-xl font-semibold">
          {plan.name}
        </CardTitle>

        <CardDescription className="text-sm mt-1">
          {plan.description}
        </CardDescription>

        <div className="mt-5">
          <span className="text-4xl font-bold">
            {plan.price}
          </span>
          <span className="text-muted-foreground ml-1">
            /mo
          </span>
        </div>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="p-6 pt-4 flex flex-col gap-6">

        <Button
          className={`w-full ${
            plan.highlight ? 'bg-primary hover:bg-primary/90' : ''
          }`}
          variant={plan.highlight ? 'default' : 'outline'}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Get Started
        </Button>

        <div className="space-y-3">
          {plan.features.map((f, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-1" />
              <span className="text-sm text-muted-foreground">
                {f}
              </span>
            </div>
          ))}
        </div>

      </CardContent>

    </Card>

  </div>
))}

        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground">
          All plans include a 30-day free trial. No credit card required.
        </div>

      </div>
    </section>
  );
}