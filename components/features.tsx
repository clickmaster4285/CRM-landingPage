'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Sparkles, Zap, Shield, Users, TrendingUp, LayoutGrid, ChevronDown, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const allFeatures = [
  {
    title: 'Real-Time Analytics',
    description: 'Track your metrics in real-time with beautiful dashboards.',
    image: '/f1.webp',
    icon: TrendingUp,
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: 'Advanced Automation',
    description: 'Automate repetitive tasks and workflows.',
    image: '/f2.webp',
    icon: Zap,
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: 'Seamless Integration',
    description: 'Connect with your favorite tools easily.',
    image: '/f3.webp',
    icon: LayoutGrid,
    gradient: "from-orange-500/20 to-yellow-500/20"
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-level security with compliance.',
    image: '/f4.webp',
    icon: Shield,
    gradient: "from-red-500/20 to-rose-500/20"
  },
  {
    title: 'Smart Collaboration',
    description: 'Real-time teamwork without friction.',
    image: '/f5.webp',
    icon: Users,
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Built to grow globally with your business.',
    image: '/f6.webp',
    icon: Sparkles,
    gradient: "from-indigo-500/20 to-blue-500/20"
  },
];

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(allFeatures.length).fill(false));

  const visibleFeatures = allFeatures.slice(0, visibleCount);
  const hasMore = visibleCount < allFeatures.length;

  const loadMore = () => {
    setIsLoading(true);
    // Simulate loading delay for smooth animation
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 3, allFeatures.length));
      setIsLoading(false);
      
      // Scroll to new cards smoothly
      setTimeout(() => {
        const newCards = document.querySelectorAll('.feature-card');
        if (newCards.length) {
          newCards[visibleCount]?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    }, 500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerElements = headerRef.current?.querySelectorAll('.animate-header');
      if (headerElements?.length) {
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

      // Animate visible cards only
      cardsRef.current.slice(0, visibleCount).forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [visibleCount]);

  // Animate new cards when they appear
  useEffect(() => {
    if (visibleCount > 3) {
      const newCards = cardsRef.current.slice(3, visibleCount);
      newCards.forEach((card, i) => {
        if (card) {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'back.out(0.4)',
          });
        }
      });
    }
  }, [visibleCount]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <section
      id="features"
      ref={containerRef}
      className="py-24 lg:py-32 px-6 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="animate-header inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
          
            <span>Features</span>
          </div>

          <h2 className="animate-header text-4xl lg:text-5xl font-bold tracking-tight">
            Powerful{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          
          <p className="animate-header mt-4 text-lg text-muted-foreground">
            Built for modern teams. Everything you need to succeed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleFeatures.map((f, idx) => {
            const Icon = f.icon;
            const originalIndex = allFeatures.findIndex(feature => feature.title === f.title);
            return (
              <div
                key={f.title}
                ref={(el) => (cardsRef.current[originalIndex] = el)}
                className="feature-card group rounded-2xl bg-card/80 backdrop-blur-sm border border-border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30"
              >
                {/* Image Container with Skeleton Loading */}
                <div className="relative aspect-[16/9] overflow-hidden bg-muted/20">
                  {!loadedImages[originalIndex] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/20">
                      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                  )}
                  <Image
                    src={f.image}
                    alt={f.title}
                    width={800}
                    height={600}
                    priority={originalIndex < 2}
                    loading={originalIndex < 2 ? "eager" : "lazy"}
                    quality={80}
                    className={`
                      w-full h-full object-cover transition-all duration-700 
                      group-hover:scale-110
                      ${loadedImages[originalIndex] ? 'opacity-100' : 'opacity-0'}
                    `}
                    onLoad={() => handleImageLoad(originalIndex)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${f.gradient} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <button className="mt-4 text-xs text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Learn more
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Bottom Decorative Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            );
          })}
        </div>

        {/* See More Button */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  See More Features
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Show Less Button (when all features are visible) */}
        {visibleCount === allFeatures.length && allFeatures.length > 3 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                setVisibleCount(3);
                window.scrollTo({ top: containerRef.current?.offsetTop, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-muted-foreground hover:text-primary transition-all duration-300 text-sm"
            >
              <ChevronDown className="w-4 h-4 rotate-180" />
              Show Less
            </button>
          </div>
        )}

        {/* Counter Indicator */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Showing {visibleCount} of {allFeatures.length} features
          </p>
        </div>

      
      </div>
    </section>
  );
}