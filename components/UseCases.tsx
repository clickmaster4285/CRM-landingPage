'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Briefcase, Users, Building2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    img: "/usecase-freelancer.jpg",
    persona: "Freelancers",
    problem: "Juggling clients in your inbox",
    help: "One view of every project, payment, and follow-up.",
    icon: Briefcase,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    img: "/usecase-team.jpg",
    persona: "Small teams",
    problem: "Nobody knows who's doing what",
    help: "Shared pipelines, clear ownership, zero stepped-on toes.",
    icon: Users,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    img: "/usecase-agency.jpg",
    persona: "Agencies",
    problem: "Pitching faster than you can track",
    help: "Templates, automation, and clean handoffs to delivery.",
    icon: Building2,
    color: "from-orange-500/20 to-red-500/20",
  },
];

export function UseCases() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with stagger
      const headerElements = headerRef.current?.querySelectorAll('.animate-header');
      if (headerElements) {
        gsap.from(headerElements, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }

      // Cards animation with 3D effect
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Initial entrance animation
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotationX: 15,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'back.out(0.5)',
        });

        // Content stagger animation inside card
        const title = card.querySelector('.card-title');
        const problem = card.querySelector('.card-problem');
        const help = card.querySelector('.card-help');
        const image = card.querySelector('.card-image');
        
        if (title && problem && help && image) {
          gsap.from([title, problem, help], {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: i * 0.15 + 0.3,
            ease: 'power2.out',
          });
        }

        // Enhanced hover animations
        card.addEventListener('mouseenter', () => {
          // Card lift and scale
          gsap.to(card, {
            y: -12,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
          });
          
          // Image scale on hover
          if (image) {
            gsap.to(image, {
              scale: 1.1,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
          
          // Glow effect on card
          gsap.to(card, {
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(var(--primary), 0.3)',
            duration: 0.3,
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
          
          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
          
          gsap.to(card, {
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
          });
        });
      });

      // Floating animation for cards (subtle continuous movement)
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.to(card, {
            y: -5,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5,
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="use-cases" 
      ref={containerRef} 
      className="py-24 lg:py-32 px-6 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header with enhanced design */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="animate-header inline-flex items-center gap-2 px-4 py-2 rounded-full  text-primary text-sm font-medium mb-6 backdrop-blur-sm">
          
            <span>Use Cases</span>
          </div>

          <h2 className="animate-header text-4xl lg:text-5xl font-bold tracking-tight">
            Made for{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              makers
            </span>
            , not megacorps.
          </h2>
          
          <p className="animate-header mt-4 text-lg text-muted-foreground">
            Built for the way you work — whether you're a freelancer, small team, or agency.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.persona}
                ref={(el) => (cardsRef.current[i] = el)}
                className="group relative cursor-pointer"
              >
                {/* Glowing background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${c.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative rounded-2xl bg-card/80 backdrop-blur-sm border border-border overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  
                  {/* Image Container with overlay */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.persona}
                      className="card-image w-full h-full object-cover transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon badge on image */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="card-title text-xl font-semibold mb-4 flex items-center gap-2">
                      {c.persona}
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </h3>

                    {/* Problem Section */}
                    <div className="card-problem mb-4">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                        The problem
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {c.problem}
                      </p>
                    </div>

                    {/* Help Section */}
                    <div className="card-help">
                      <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-2 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        How we help
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                        {c.help}
                      </p>
                    </div>
                  </div>

                  {/* Decorative bottom line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA with animation */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
             
            </div>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}