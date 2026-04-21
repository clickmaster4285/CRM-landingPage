'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = [
  "NORTHWIND", "LUMEN", "ACME CORP", "VERTEX", "PIXEL CO",
  "ATLAS", "ORBIT", "HELIO", "NIMBUS", "QUANTA", "PARALLEL",
];

export function TrustedBy() {
  const trackRef = useRef(null);

  const doubled = [...logos, ...logos];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      // smooth infinite loop
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      // pause on hover
      track.parentElement?.addEventListener("mouseenter", () => tween.pause());
      track.parentElement?.addEventListener("mouseleave", () => tween.resume());

    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-14 border-y border-border bg-card/40">

      <div className="container mx-auto px-6">

        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Trusted by 4,200+ teams worldwide
        </p>

        {/* VIEWPORT */}
        <div className="overflow-hidden relative">

          {/* TRACK */}
          <div
            ref={trackRef}
            className="flex w-max gap-14 will-change-transform"
          >
            {doubled.map((l, i) => (
              <div
                key={i}
                className="text-sm font-bold tracking-[0.25em] text-muted-foreground/70 hover:text-foreground transition whitespace-nowrap"
              >
                {l}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}