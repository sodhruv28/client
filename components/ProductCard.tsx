"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/data";
import type { Product } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const badgeClass = product.badge === "Bestseller"
    ? "badge-bestseller"
    : product.badge === "New"
      ? "badge-new"
      : product.badge === "Seasonal"
        ? "badge-seasonal"
        : "";

  return (
    <Link
      href={`/menu/${product.id}`}
      id={`product-card-${product.id}`}
      className="product-card block bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-dark">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="product-image object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`badge ${badgeClass} absolute top-3 left-3 z-10`}>
            {product.badge}
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="bg-white/90 text-sb-text font-bold text-sm px-4 py-2 rounded-md">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick add button */}
        {product.inStock && (
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-md shadow-lg transition-all ${
              added
                ? "bg-success text-white scale-110"
                : "bg-white text-primary hover:bg-primary hover:text-white hover:scale-110"
            }`}
            aria-label={added ? "Added to cart" : "Add to cart"}
          >
            {added ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-heading text-lg font-semibold text-sb-text mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-text-light font-medium">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
