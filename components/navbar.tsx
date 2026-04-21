'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-500
        ${isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-lg'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105">
            <span className="text-primary-foreground font-bold text-lg">
              CM
            </span>
          </div>
          <span
            className={`
              font-bold text-lg transition-all duration-300
              ${isScrolled 
                ? 'text-primary' 
                : 'text-white'
              }
            `}
            style={{
              textShadow: !isScrolled ? '0 0 12px rgba(255,255,255,0.18)' : 'none',
            }}
          >
            ClickMasters
          </span>
        </div>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-8">
{['Features', 'About Us', 'Pricing', 'How it works', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-').replace(/choose us/, 'switch')}`}
              className={`
                transition-all duration-300 text-sm font-medium
                ${isScrolled
                  ? 'text-foreground/70 hover:text-primary hover:translate-y-[-2px]'
                  : 'text-white/80 hover:text-white hover:translate-y-[-2px] drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]'
                }
              `}
            >
              {item}
            </a>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {/* Sign In - Changes color with scroll */}
          <Button
            variant="ghost"
            className={`
              hidden sm:inline-flex transition-all duration-300
              ${isScrolled
                ? 'text-foreground/70 hover:text-primary hover:bg-primary/10'
                : 'text-white/80 hover:text-white hover:bg-white/10'
              }
            `}
            onClick={scrollToContact}
          >
            Sign In
          </Button>

          {/* CTA - Static but enhanced */}
          <Button 
            className={`
              transition-all duration-300 hover:scale-105
              ${isScrolled
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg'
              }
            `}
            onClick={scrollToContact}
          >
            Start Free Trial
          </Button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
