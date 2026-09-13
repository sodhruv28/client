"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/components/CartProvider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            id="nav-logo"
            className="flex items-center gap-2 group"
            onClick={() => setMobileOpen(false)}
          >
            <span className="text-2xl">🍪</span>
            <span
              className={`font-heading text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                scrolled ? "text-primary" : "text-white"
              }`}
            >
              sweet.bonanza
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/menu", label: "Menu" },
              { href: "/track", label: "Track Order" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-accent ${
                  scrolled ? "text-sb-text" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={toggleCart}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                scrolled
                  ? "bg-primary text-white hover:bg-primary-hover"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-accent text-sb-text text-xs font-bold rounded-full animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile: Cart + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              id="mobile-cart-btn"
              onClick={toggleCart}
              className={`relative p-2 rounded-full transition-colors ${
                scrolled ? "text-primary" : "text-white"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-accent text-sb-text text-[10px] font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? "text-sb-text" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 w-72 h-full bg-white shadow-xl animate-slide-in-right">
            <div className="pt-20 px-6 flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Menu" },
                { href: "/track", label: "Track Order" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 text-lg font-semibold text-sb-text hover:bg-cream rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-border">
                <a
                  href="https://instagram.com/sweet.bonanza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 px-4 text-sm text-text-muted hover:text-primary transition-colors"
                >
                  <span className="text-lg">📸</span>
                  Follow on Instagram
                </a>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-3 px-4 text-sm text-text-muted hover:text-primary transition-colors"
                >
                  <span className="text-lg">💬</span>
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
