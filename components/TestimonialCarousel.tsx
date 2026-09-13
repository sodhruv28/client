"use client";

import { useState } from "react";
import type { Testimonial } from "@/lib/data";

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Card */}
      <div className="glass-card rounded-2xl p-8 sm:p-12 text-center min-h-[280px] flex flex-col items-center justify-center">
        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {Array.from({ length: testimonials[active].rating }).map((_, i) => (
            <span key={i} className="text-accent text-xl">
              ★
            </span>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-lg sm:text-xl text-sb-text leading-relaxed mb-6 max-w-xl font-medium italic">
          &ldquo;{testimonials[active].text}&rdquo;
        </blockquote>

        {/* Author */}
        <div>
          <p className="font-heading font-semibold text-sb-text text-lg">
            {testimonials[active].name}
          </p>
          <p className="text-sm text-text-muted mt-0.5">
            on {testimonials[active].product}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-border text-text-muted hover:border-primary hover:text-primary transition-all"
          aria-label="Previous testimonial"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === active
                  ? "bg-primary w-7"
                  : "bg-border hover:bg-text-muted"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-border text-text-muted hover:border-primary hover:text-primary transition-all"
          aria-label="Next testimonial"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
