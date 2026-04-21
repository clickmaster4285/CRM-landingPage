'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, Rocket, Users, Trophy, 
  Award, Clock, Globe, Heart, 
  ChevronRight, Sparkles, Zap, 
  Shield, TrendingUp, Briefcase, 
  Coffee, Target, Eye 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  
  // Counter states
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    support: 0
  });

  const stats = [
    { value: 50, label: "Projects Delivered", icon: Briefcase, suffix: "+", key: "projects" },
    { value: 30, label: "Happy Clients", icon: Users, suffix: "+", key: "clients" },
    { value: 98, label: "Client Satisfaction", icon: Trophy, suffix: "%", key: "satisfaction" },
    { value: 24, label: "Support Available", icon: Clock, suffix: "/7", key: "support" },
  ];

  const values = [
    { icon: Rocket, title: "Innovation First", desc: "We embrace cutting-edge technologies to build future-proof solutions" },
    { icon: Shield, title: "Quality Assured", desc: "Rigorous testing and code reviews ensure bug-free delivery" },
    { icon: Heart, title: "Client-Centric", desc: "Your success is our success. We're with you at every step" },
    { icon: Zap, title: "Agile Development", desc: "Fast iterations and continuous delivery for rapid results" },
  ];

  const services = [
    "Web Development", "Mobile Apps", "Cloud Solutions", 
    "AI Integration", "Custom Software", "DevOps Consulting"
  ];

  // Counter animation function
  const animateCounter = (start: number, end: number, duration: number, key: string) => {
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    const timer = setInterval(() => {
      current++;
      setCounters(prev => ({ ...prev, [key]: current }));
      if (current === end) clearInterval(timer);
    }, stepTime);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current?.querySelectorAll('.animate-header'), {
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

      // Content animation
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Values animation
      if (valuesRef.current) {
        gsap.from(valuesRef.current.querySelectorAll('.value-card'), {
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
        });
      }

      // Team animation
      if (teamRef.current) {
        gsap.from(teamRef.current, {
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Trigger counter animation when stats come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start counter animations
            animateCounter(0, 50, 2000, "projects");
            animateCounter(0, 30, 2000, "clients");
            animateCounter(0, 98, 2000, "satisfaction");
            animateCounter(0, 24, 2000, "support");
            observer.disconnect(); // Only animate once
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about-us"
      ref={containerRef} 
      className="py-24 lg:py-32 px-6 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="animate-header inline-flex items-center gap-2 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6 backdrop-blur-sm">
          
            <span>About ClickMasters</span>
          </div>

          <h2 className="animate-header text-4xl lg:text-5xl font-bold tracking-tight">
            We Build{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Software That Matters
            </span>
          </h2>
          
          <p className="animate-header mt-4 text-lg text-muted-foreground">
            Transforming ideas into powerful digital solutions with cutting-edge technology
          </p>
        </div>

        {/* Main Content with F1 Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Target className="w-3 h-3" />
              <span>Who We Are</span>
            </div>
            
            <h3 className="text-3xl font-bold">
              Crafting Excellence in Every Line of Code
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              ClickMasters is a premier software development company dedicated to 
              delivering innovative, scalable, and high-performance solutions. 
              With a team of passionate developers, designers, and strategists, 
              we transform complex challenges into seamless digital experiences.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Founded with a mission to empower businesses through technology, 
              we've helped over 30+ companies accelerate their digital transformation 
              journey. Our agile methodology ensures rapid delivery without compromising 
              on quality.
            </p>

            {/* Services Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {services.map((service, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 rounded-full bg-secondary/50 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 mt-4" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Let's Build Something Great
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Side - F1 Image */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]">
              <img 
                src="/f1.webp" 
                alt="ClickMasters Software Development Team" 
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Expert Development Team</p>
                    <p className="text-[10px] text-white/70">50+ projects delivered globally</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Stats Section with Counters */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            let displayValue = counters[stat.key as keyof typeof counters];
            
            return (
              <div 
                key={i} 
                className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-primary">
                  {displayValue}{stat.suffix}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Our Values */}
        <div ref={valuesRef} className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Eye className="w-4 h-4" />
              <span>Our Core Values</span>
            </div>
            <h3 className="text-3xl font-bold">What Drives Us</h3>
            <p className="text-muted-foreground mt-2">The principles that guide our work and culture</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div 
                  key={i} 
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div ref={teamRef} className="rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4">
                <Trophy className="w-3 h-3" />
                <span>Why Choose Us</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Your Trusted Technology Partner
              </h3>
              <p className="text-muted-foreground mb-6">
                We combine technical expertise with business acumen to deliver 
                solutions that drive real results. Our commitment to excellence 
                and client success sets us apart.
              </p>
              
              <div className="space-y-3">
                {[
                  "✅ 5+ years of industry experience",
                  "✅ Expert team of 15+ developers",
                  "✅ 24/7 dedicated support",
                  "✅ Flexible engagement models",
                ].map((item, i) => (
                  <p key={i} className="text-sm">{item}</p>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-2xl" />
              <div className="relative bg-card rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Coffee className="w-8 h-8 text-primary" />
                  <p className="font-semibold">Ready to start your project?</p>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Let's discuss how ClickMasters can help bring your vision to life.
                </p>
                <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Schedule a Consultation →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span>Trusted by innovative companies worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
}