'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check, ArrowRight, Sparkles, Zap, Shield, Rocket, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ProblemSolution() {
  const containerRef = useRef(null);
  const beforeRef = useRef(null);
  const afterRef = useRef(null);
  const arrowRef = useRef(null);
  const headerRef = useRef(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const before = [
    { text: "Sticky notes everywhere", icon: "📝", image: "/crm-fail.webp" },
    { text: "Leads slipping through cracks", icon: "💔", image: "/crm-fail.webp" },
    { text: "10 tabs, zero clarity", icon: "🔄", image: "/crm-fail.webp" },
    { text: "Forgotten follow-ups", icon: "⏰", image: "/crm-fail.webp" }
  ];
  
  const after = [
    { text: "One calm dashboard", icon: "🎯", image: "/f6.webp" },
    { text: "Every lead, tracked", icon: "📊", image: "/f6.webp" },
    { text: "Clarity at a glance", icon: "👁️", image: "/f6.webp" },
    { text: "Auto follow-ups that ship", icon: "🚀", image: "/f6.webp" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerElements = headerRef.current?.querySelectorAll('.animate-header');
      if (headerElements) {
        gsap.from(headerElements, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }

      // Before card animation - slide from left
      if (beforeRef.current) {
        gsap.from(beforeRef.current, {
          scrollTrigger: {
            trigger: beforeRef.current,
            start: 'top 85%',
          },
          x: -80,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(0.4)',
        });
      }

      // Arrow animation - scale and rotate with glow
      if (arrowRef.current) {
        gsap.from(arrowRef.current, {
          scrollTrigger: {
            trigger: arrowRef.current,
            start: 'top 85%',
          },
          scale: 0,
          opacity: 0,
          rotation: -180,
          duration: 0.7,
          ease: 'back.out(0.6)',
        });
        
        // Continuous subtle pulse for arrow
        gsap.to(arrowRef.current, {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // After card animation - slide from right
      if (afterRef.current) {
        gsap.from(afterRef.current, {
          scrollTrigger: {
            trigger: afterRef.current,
            start: 'top 85%',
          },
          x: 80,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(0.4)',
        });
      }

      // List items stagger animation for before card
      const beforeItems = beforeRef.current?.querySelectorAll('.before-item');
      if (beforeItems) {
        gsap.from(beforeItems, {
          scrollTrigger: {
            trigger: beforeRef.current,
            start: 'top 85%',
          },
          x: -40,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out',
        });
      }

      // List items stagger animation for after card
      const afterItems = afterRef.current?.querySelectorAll('.after-item');
      if (afterItems) {
        gsap.from(afterItems, {
          scrollTrigger: {
            trigger: afterRef.current,
            start: 'top 85%',
          },
          x: 40,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out',
        });
      }

      // Enhanced hover animations for cards
      if (beforeRef.current) {
        beforeRef.current.addEventListener('mouseenter', () => {
          gsap.to(beforeRef.current, {
            y: -8,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
        beforeRef.current.addEventListener('mouseleave', () => {
          gsap.to(beforeRef.current, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      }

      if (afterRef.current) {
        afterRef.current.addEventListener('mouseenter', () => {
          gsap.to(afterRef.current, {
            y: -8,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
        afterRef.current.addEventListener('mouseleave', () => {
          gsap.to(afterRef.current, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      }

      // Enhanced breathing animation for after card with multiple effects
      gsap.to(afterRef.current, {
        boxShadow: '0 0 40px rgba(var(--primary), 0.25), 0 0 20px rgba(var(--primary), 0.15)',
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: 'sine.inOut',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 lg:py-32 px-6 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header with visual flair */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
          <div className="animate-header inline-flex items-center gap-2 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6 backdrop-blur-sm">
           
            <span>The Transformation</span>
          </div>
          
          <h2 className="animate-header text-4xl lg:text-6xl font-bold tracking-tight">
            From{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-destructive/20 to-transparent blur-xl" />
              <span className="relative text-destructive line-through">chaos</span>
            </span>
            {' '}to{' '}
            <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-pulse">
              clarity
            </span>
          </h2>
          
          <p className="animate-header mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            You didn't start your business to wrestle with spreadsheets. We get it.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center max-w-6xl mx-auto">
          
          {/* Before Card - F5 Image Style */}
          <div 
            ref={beforeRef}
            className="group relative rounded-2xl border border-border bg-gradient-to-br from-card to-destructive/5 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <img src="/crm-fail.webp" alt="F5" className="w-full h-full object-cover" />
            </div>
            
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-destructive/20 via-transparent to-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs uppercase tracking-wider text-destructive font-semibold flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                  Before ClickMasters
                </div>
                <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">😫</div>
              </div>
              
              <ul className="space-y-5">
                {before.map((b, idx) => (
                  <li 
                    key={b.text} 
                    className="before-item flex items-start gap-3 text-foreground/70 group/item cursor-pointer"
                    onMouseEnter={() => setHoveredFeature(idx)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-destructive/20 transition-all duration-300 group-hover/item:scale-110">
                      <X className="w-3.5 h-3.5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium">{b.text}</span>
                      {hoveredFeature === idx && (
                        <div className="text-xs text-destructive/70 mt-1 animate-fadeIn">
                          Stop wasting time on this
                        </div>
                      )}
                    </div>
                    <span className="text-lg opacity-0 group-hover/item:opacity-100 transition-opacity">
                      {b.icon}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Animated Arrow */}
          <div className="relative">
            <div 
              ref={arrowRef}
              className="hidden lg:flex w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 items-center justify-center shadow-lg relative"
            >
              <ArrowRight className="w-6 h-6 text-primary-foreground" />
            </div>
            
            {/* Decorative circles around arrow */}
            <div className="absolute inset-0 hidden lg:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-primary/20 animate-ping" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-primary/10 animate-pulse" />
            </div>
          </div>

          {/* After Card - F6 Image Style */}
          <div 
            ref={afterRef}
            className="group relative rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card via-primary/5 to-primary/10 backdrop-blur-sm p-8 shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden"
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <img src="/f6.webp" alt="F6" className="w-full h-full object-cover" />
            </div>
            
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Success Particles Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs uppercase tracking-wider text-primary font-semibold flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  With ClickMasters
                </div>
                <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity animate-bounce">
                  🚀
                </div>
              </div>
              
              <ul className="space-y-5">
                {after.map((a, idx) => (
                  <li 
                    key={a.text} 
                    className="after-item flex items-start gap-3 font-medium group/item cursor-pointer"
                    onMouseEnter={() => setHoveredFeature(idx + 10)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-primary/30 transition-all duration-300 group-hover/item:scale-110">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-foreground/90 font-medium">{a.text}</span>
                      {hoveredFeature === idx + 10 && (
                        <div className="text-xs text-primary/70 mt-1 animate-fadeIn">
                          This is how we make it happen
                        </div>
                      )}
                    </div>
                    <span className="text-lg opacity-0 group-hover/item:opacity-100 transition-opacity">
                      {a.icon}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Success Metrics Badge */}
            <div className="absolute bottom-4 right-4 bg-primary/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              +98% efficiency
            </div>
          </div>
        </div>

        {/* Bottom CTA with Stats */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">10K+</p>
                <p className="text-xs text-muted-foreground">Businesses Transformed</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">99%</p>
                <p className="text-xs text-muted-foreground">Customer Satisfaction</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">3x</p>
                <p className="text-xs text-muted-foreground">Productivity Boost</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Rocket className="w-4 h-4 text-primary" />
              Join thousands of businesses that made the switch
              <TrendingUp className="w-4 h-4 text-primary" />
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}