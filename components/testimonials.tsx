'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, Quote, Star, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Pinnacle has transformed how we manage our operations. The time savings alone have been incredible.',
    author: 'Sarah Johnson',
    role: 'CEO at TechStart',
    initials: 'SJ',
    rating: 5,
  },
  {
    quote: 'The best investment we\'ve made for our team. The ROI was visible within the first month.',
    author: 'Michael Chen',
    role: 'Operations Manager at GrowthCo',
    initials: 'MC',
    rating: 5,
  },
  {
    quote: 'Outstanding customer support and feature set. Honestly, there\'s nothing else like it on the market.',
    author: 'Emma Williams',
    role: 'Founder at CreativeStudio',
    initials: 'EW',
    rating: 5,
  },
  {
    quote: 'Seamless integration with our existing tools. The team was up and running in hours, not weeks.',
    author: 'David Martinez',
    role: 'CTO at DataViz Inc',
    initials: 'DM',
    rating: 5,
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTestimonial = testimonials[currentIndex];

  // GSAP animations for header
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current?.querySelectorAll('.animate-header'), {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    startAutoRotate();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 5000);
  };

  const animateTransition = (direction: 'next' | 'prev', callback: () => void) => {
    if (isAnimating || !cardRef.current) return;
    
    setIsAnimating(true);
    
    // Fade out animation
    gsap.to(cardRef.current, {
      opacity: 0,
      y: -20,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        callback();
        // Fade in animation
        gsap.fromTo(cardRef.current, 
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(0.5)', onComplete: () => setIsAnimating(false) }
        );
      }
    });
  };

  const nextTestimonial = () => {
    if (isAnimating) return;
    animateTransition('next', () => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    });
    startAutoRotate();
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    animateTransition('prev', () => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    });
    startAutoRotate();
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    animateTransition('goto', () => {
      setCurrentIndex(index);
    });
    startAutoRotate();
  };

  // Pause auto-rotate on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    startAutoRotate();
  };

  return (
    <section 
      id="testimonials" 
      ref={containerRef} 
      className="py-24 lg:py-32 px-6 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="animate-header inline-flex items-center gap-2 px-4 py-2 rounded-full  text-primary text-sm font-medium mb-6">
           
            <span>Testimonials</span>
          </div>
          <h2 className="animate-header text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="animate-header text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about their experience with Pinnacle.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Card */}
          <div ref={cardRef} className="relative">
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
              
              {/* Decorative quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-20 h-20 text-primary" />
              </div>
              
              <CardContent className="p-8 md:p-10">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < currentTestimonial.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/90 mb-8 leading-relaxed text-lg md:text-xl font-medium">
                  "{currentTestimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-gradient-to-r from-primary to-primary/70 text-primary-foreground text-lg">
                      {currentTestimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground text-lg">
                      {currentTestimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Buttons at the bottom */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`
                    transition-all duration-300 rounded-full
                    ${index === currentIndex 
                      ? 'w-8 h-2 bg-primary' 
                      : 'w-2 h-2 bg-primary/30 hover:bg-primary/50'
                    }
                  `}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auto-rotate indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
           
          </div>
        </div>

      
      </div>
    </section>
  );
}