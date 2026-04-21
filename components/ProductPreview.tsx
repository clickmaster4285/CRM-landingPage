'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Mail, Phone, MessageSquare, MoreHorizontal, Sparkles, Zap, Eye, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ProductPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const stages = [
    { name: "New", count: 12, color: "oklch(0.75 0.15 220)", gradient: "from-blue-500/20 to-cyan-500/20" },
    { name: "Contacted", count: 8, color: "oklch(0.7 0.2 295)", gradient: "from-purple-500/20 to-pink-500/20" },
    { name: "Proposal", count: 5, color: "oklch(0.75 0.18 50)", gradient: "from-orange-500/20 to-yellow-500/20" },
    { name: "Won", count: 3, color: "oklch(0.7 0.18 160)", gradient: "from-green-500/20 to-emerald-500/20" },
  ];

  const companies = ["Acme Studio", "Northwind", "Lumen", "Pixel Co", "Vertex", "Atlas Inc"];
  const amounts = ["12.5k", "8.2k", "15.3k", "6.8k", "22.1k", "9.4k"];

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (isAnimating) return;
      setIsAnimating(true);

      const ctx = gsap.context(() => {
        // Header animation
        if (headerRef.current) {
          const headerElements = headerRef.current.querySelectorAll('.animate-on-scroll');
          if (headerElements.length) {
            gsap.fromTo(headerElements, 
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: headerRef.current,
                  start: 'top 80%',
                  once: true,
                }
              }
            );
          }
        }

        // Preview window animation
        if (previewRef.current) {
          gsap.fromTo(previewRef.current,
            { y: 60, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: previewRef.current,
                start: 'top 85%',
                once: true,
              }
            }
          );
        }

        // Sidebar animation
        if (sidebarRef.current) {
          gsap.fromTo(sidebarRef.current,
            { x: 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sidebarRef.current,
                start: 'top 85%',
                once: true,
              }
            }
          );
        }

        // Stage columns animation
        stagesRef.current.forEach((stage, i) => {
          if (stage) {
            gsap.fromTo(stage,
              { x: -30, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.5,
                delay: i * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: stage,
                  start: 'top 90%',
                  once: true,
                }
              }
            );
          }
        });

      }, containerRef);

      setTimeout(() => setIsAnimating(false), 1000);
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 lg:py-32 px-6 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="animate-on-scroll inline-flex items-center gap-2 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Live Preview</span>
          </div>

          <h2 className="animate-on-scroll text-4xl lg:text-5xl font-bold tracking-tight">
            A workspace that{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              breathes.
            </span>
          </h2>
          
          <p className="animate-on-scroll mt-4 text-lg text-muted-foreground">
            Beautiful by default. Powerful when you need it.
          </p>
        </div>

        {/* Product Preview Window */}
        <div ref={previewRef} className="max-w-6xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border shadow-2xl overflow-hidden backdrop-blur-sm">
            
            {/* Window Header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60 hover:bg-destructive transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60 hover:bg-yellow-400 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-primary/60 hover:bg-primary transition-colors cursor-pointer" />
              </div>
              <div className="text-xs text-muted-foreground ml-3 flex items-center gap-2">
                <Zap className="w-3 h-3" />
                <span>ClickMasters.app/pipeline</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-[1fr_320px] gap-6 p-6">
              
              {/* Pipeline Stages */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stages.map((stage, stageIdx) => (
                  <div
                    key={stage.name}
                    ref={(el) => (stagesRef.current[stageIdx] = el)}
                    className={`rounded-xl bg-gradient-to-br ${stage.gradient} p-3 min-h-[300px] backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 opacity-0`}
                  >
                    {/* Stage Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full animate-pulse" 
                          style={{ background: stage.color, boxShadow: `0 0 8px ${stage.color}` }}
                        />
                        <span className="text-xs font-semibold uppercase tracking-wider">{stage.name}</span>
                      </div>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {stage.count}
                      </span>
                    </div>

                    {/* Stage Cards */}
                    <div className="space-y-2">
                      {[0, 1].map((cardIdx) => {
                        const companyIndex = (stage.count + cardIdx) % companies.length;
                        return (
                          <div
                            key={cardIdx}
                            className="rounded-xl bg-card border border-border p-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                            onMouseEnter={() => setHoveredCard(stageIdx * 2 + cardIdx)}
                            onMouseLeave={() => setHoveredCard(null)}
                          >
                            <div className="relative">
                              <div className="text-xs font-semibold mb-1 truncate flex items-center gap-1">
                                {companies[companyIndex]}
                                {hoveredCard === stageIdx * 2 + cardIdx && (
                                  <Eye className="w-3 h-3 text-primary animate-pulse" />
                                )}
                              </div>
                              <div className="text-[11px] text-primary font-medium mb-2">
                                ${amounts[companyIndex]}k
                              </div>
                              <div className="flex -space-x-1">
                                {[0, 1].map((a) => (
                                  <div 
                                    key={a} 
                                    className="w-5 h-5 rounded-full border-2 border-card transition-transform group-hover:scale-110" 
                                    style={{ background: `oklch(0.7 0.15 ${100 + a * 80})` }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div ref={sidebarRef} className="space-y-4 opacity-0">
                
                {/* Contact Card - Sara Kim */}
                <div className="rounded-xl bg-card border border-border p-4 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center text-sm font-semibold text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
                        SK
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Sara Kim</div>
                        <div className="text-xs text-muted-foreground">Acme Studio</div>
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {[Mail, Phone, Calendar].map((Icon, i) => (
                      <button 
                        key={i} 
                        className="rounded-lg bg-secondary/60 hover:bg-primary hover:text-primary-foreground p-2.5 flex items-center justify-center transition-all duration-300 group/btn"
                      >
                        <Icon className="w-4 h-4 text-foreground/70 group-hover/btn:text-white transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activity Card */}
                <div className="rounded-xl bg-card border border-border p-4 hover:shadow-xl transition-all duration-300">
                  <div className="text-xs font-semibold mb-4 text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" />
                    Recent Activity
                  </div>
                  
                  <div className="space-y-3">
                    {/* Email opened */}
                    <div className="flex items-start gap-3 text-xs group/item">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                        <Mail className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Email opened</div>
                        <div className="text-muted-foreground">2m ago</div>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-primary/30 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </div>

                    {/* Replied to thread */}
                    <div className="flex items-start gap-3 text-xs group/item">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                        <MessageSquare className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Replied to thread</div>
                        <div className="text-muted-foreground">1h ago</div>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-primary/30 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </div>

                    {/* Demo scheduled */}
                    <div className="flex items-start gap-3 text-xs group/item">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">Demo scheduled</div>
                        <div className="text-muted-foreground">Yesterday</div>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-primary/30 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">+47%</p>
                    <p className="text-xs text-muted-foreground">Pipeline growth this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Indicator */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span>Live demo — Interactive preview</span>
          </div>
        </div>
      </div>
    </section>
  );
}