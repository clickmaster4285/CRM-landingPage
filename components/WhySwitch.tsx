'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Minus, Sparkles, TrendingUp, Award, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Cell = boolean | "partial";
const rows: { feature: string; spreadsheet: Cell; complex: Cell; ClickMasters: Cell }[] = [
  { feature: "Set up in under 5 minutes", spreadsheet: false, complex: false, ClickMasters: true },
  { feature: "Beautiful, simple interface", spreadsheet: false, complex: "partial", ClickMasters: true },
  { feature: "Built-in automations", spreadsheet: false, complex: true, ClickMasters: true },
  { feature: "No training required", spreadsheet: "partial", complex: false, ClickMasters: true },
  { feature: "Affordable for small teams", spreadsheet: true, complex: false, ClickMasters: true },
];

function Cell({ v, isClickMasters = false }: { v: boolean | "partial"; isClickMasters?: boolean }) {
  if (v === true) return <Check className={`w-5 h-5 ${isClickMasters ? 'text-primary' : 'text-primary'} mx-auto transition-all duration-300 group-hover:scale-110`} />;
  if (v === "partial") return <Minus className="w-5 h-5 text-muted-foreground mx-auto transition-all duration-300" />;
  return <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto transition-all duration-300" />;
}

export function WhySwitch() {
  const containerRef = useRef(null);
  const tableRef = useRef(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef(null);

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

      // Table container animation
      if (tableRef.current) {
        gsap.from(tableRef.current, {
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Table header animation
      const tableHeader = tableRef.current?.querySelector('.table-header');
      if (tableHeader) {
        gsap.from(tableHeader.children, {
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 85%',
          },
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power2.out',
        });
      }

      // Rows stagger animation
      rowsRef.current.forEach((row, i) => {
        if (row) {
          gsap.from(row, {
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
            },
            x: -30,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power2.out',
          });

          // Hover animation for rows
          row.addEventListener('mouseenter', () => {
            gsap.to(row, {
              backgroundColor: 'rgba(var(--primary), 0.05)',
              scale: 1.01,
              duration: 0.3,
              ease: 'power2.out',
            });
            
            // Animate cells in the row
            const cells = row.querySelectorAll('.cell-animate');
            gsap.to(cells, {
              scale: 1.05,
              duration: 0.2,
              stagger: 0.05,
              ease: 'back.out(0.5)',
            });
          });

          row.addEventListener('mouseleave', () => {
            gsap.to(row, {
              backgroundColor: i % 2 ? 'rgba(var(--secondary), 0.2)' : 'transparent',
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
            
            const cells = row.querySelectorAll('.cell-animate');
            gsap.to(cells, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out',
            });
          });
        }
      });

      // ClickMasters column highlight animation
      const ClickMastersCells = tableRef.current?.querySelectorAll('.ClickMasters-cell');
      if (ClickMastersCells) {
        gsap.from(ClickMastersCells, {
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 85%',
          },
          scale: 0,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.5,
          ease: 'back.out(0.6)',
        });
        
        // Continuous subtle pulse on ClickMasters column
        gsap.to(ClickMastersCells, {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.1,
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="why-switch"
      ref={containerRef} 
      className="py-24 lg:py-32 px-6 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header with enhanced design */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
          <div className="animate-header inline-flex items-center gap-2 px-4 py-2 rounded-full  text-primary text-sm font-medium mb-6 backdrop-blur-sm">
           
            <span>Comparison</span>
          </div>

          <h2 className="animate-header text-4xl lg:text-5xl font-bold tracking-tight">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Us?
            </span>
          </h2>
          
          <p className="animate-header mt-4 text-lg text-muted-foreground">
            Other tools are too clunky or too bare. We hit the sweet spot.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="animate-header rounded-xl bg-card/50 backdrop-blur-sm border border-border p-4 text-center hover:border-primary/30 transition-all duration-300">
            <div className="inline-flex p-2 rounded-lg bg-primary/10 mb-2">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">5x</p>
            <p className="text-xs text-muted-foreground">Faster setup</p>
          </div>
          
          <div className="animate-header rounded-xl bg-card/50 backdrop-blur-sm border border-border p-4 text-center hover:border-primary/30 transition-all duration-300" style={{ animationDelay: '0.05s' }}>
            <div className="inline-flex p-2 rounded-lg bg-primary/10 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">3x</p>
            <p className="text-xs text-muted-foreground">More efficient</p>
          </div>
          
          <div className="animate-header rounded-xl bg-card/50 backdrop-blur-sm border border-border p-4 text-center hover:border-primary/30 transition-all duration-300" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex p-2 rounded-lg bg-primary/10 mb-2">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">98%</p>
            <p className="text-xs text-muted-foreground">User satisfaction</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div ref={tableRef} className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden shadow-xl">
            
            {/* Table Header */}
            <div className="table-header grid grid-cols-4 px-6 py-5 border-b border-border bg-gradient-to-r from-primary/5 to-transparent text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="font-bold text-foreground">Feature</div>
              <div className="text-center">Spreadsheets</div>
              <div className="text-center">Heavy CRMs</div>
              <div className="text-center text-primary">ClickMasters</div>
            </div>

            {/* Table Rows */}
            {rows.map((r, i) => (
              <div
                key={r.feature}
                ref={(el) => (rowsRef.current[i] = el)}
                className={`grid grid-cols-4 px-6 py-4 items-center text-sm transition-all duration-300 ${
                  i % 2 ? "bg-secondary/20" : "bg-card/30"
                }`}
              >
                {/* Feature Column */}
                <div className="font-medium text-foreground/90 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary/50" />
                  {r.feature}
                </div>
                
                {/* Spreadsheet Column */}
                <div className="cell-animate flex justify-center">
                  <Cell v={r.spreadsheet} isClickMasters={false} />
                </div>
                
                {/* Complex CRM Column */}
                <div className="cell-animate flex justify-center">
                  <Cell v={r.complex} isClickMasters={false} />
                </div>
                
                {/* ClickMasters Column - Highlighted */}
                <div className="cell-animate ClickMasters-cell flex justify-center relative">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-sm" />
                  <Cell v={r.ClickMasters} isClickMasters={true} />
                </div>
              </div>
            ))}

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-border bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-primary" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Minus className="w-3 h-3 text-muted-foreground" />
                    <span>Partial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Minus className="w-3 h-3 text-muted-foreground/40" />
                    <span>Not available</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  
                  <span>ClickMasters wins in every category</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span>✨</span>
            Join thousands who already made the 
ClickMasters
            <span>✨</span>
          </p>
        </div>
      </div>
    </section>
  );
}