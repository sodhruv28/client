"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Artisanal desserts"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="w-2 h-2 rounded bg-accent" />
            <span className="text-sm font-medium text-white/90">
              Now delivering across Surat
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Surat&apos;s Premium Bakery.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-lg mb-10">
            Order freshly baked cookie tins and brownie tubs online. Delivered directly to your door across Surat.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/menu"
              id="hero-cta-menu"
              className="btn-primary text-base px-8 py-4"
            >
              Browse Menu
            </Link>
            <a
              href="#bestsellers"
              id="hero-cta-popular"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold transition-colors hover:bg-white/20"
            >
              See What&apos;s Popular
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-14">
            {[
              { text: "Premium Ingredients" },
              { text: "Fresh Small Batches" },
              { text: "Same Day Delivery" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 text-white/70"
              >
                <div className="w-1.5 h-1.5 rounded-sm bg-accent/80" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
