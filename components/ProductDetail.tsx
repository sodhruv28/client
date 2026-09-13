"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/data";
import type { Product } from "@/lib/data";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState<Record<string, string>>(
    () => {
      const defaults: Record<string, string> = {};
      product.customizations?.forEach((c) => {
        defaults[c.label] = c.options[0];
      });
      return defaults;
    }
  );
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, customizations);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const badgeClass =
    product.badge === "Bestseller"
      ? "badge-bestseller"
      : product.badge === "New"
        ? "badge-new"
        : product.badge === "Seasonal"
          ? "badge-seasonal"
          : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      {/* Image */}
      <div className="relative">
        <div className="aspect-square rounded-2xl overflow-hidden bg-cream-dark shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        {product.badge && (
          <span className={`badge ${badgeClass} absolute top-4 left-4`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-4">
          <Link href="/menu" className="hover:text-primary transition-colors">
            Menu
          </Link>
          <span>›</span>
          <span className="text-sb-text font-medium truncate">{product.name}</span>
        </nav>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-sb-text mb-3">
          {product.name}
        </h1>

        <p className="text-2xl font-bold text-primary mb-6">
          {formatPrice(product.price)}
        </p>

        <p className="text-text-muted leading-relaxed mb-8">
          {product.longDescription}
        </p>

        {/* Customizations */}
        {product.customizations && product.customizations.length > 0 && (
          <div className="space-y-5 mb-8">
            {product.customizations.map((custom) => (
              <div key={custom.label}>
                <label className="block text-sm font-semibold text-sb-text mb-2">
                  {custom.label}
                </label>
                <div className="flex flex-wrap gap-2">
                  {custom.options.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        setCustomizations((prev) => ({
                          ...prev,
                          [custom.label]: option,
                        }))
                      }
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        customizations[custom.label] === option
                          ? "bg-primary text-white shadow-md"
                          : "bg-cream border border-border text-text-muted hover:border-primary hover:text-primary"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-4 mb-6">
          {/* Quantity */}
          <div className="flex items-center border-2 border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-11 h-11 flex items-center justify-center text-lg font-bold text-text-muted hover:bg-cream transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-11 h-11 flex items-center justify-center text-sm font-bold text-sb-text border-x-2 border-border">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-11 h-11 flex items-center justify-center text-lg font-bold text-text-muted hover:bg-cream transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to cart */}
          <button
            id="add-to-cart-btn"
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`btn-primary flex-1 text-base py-3.5 ${
              !product.inStock
                ? "opacity-50 cursor-not-allowed"
                : added
                  ? "!bg-success"
                  : ""
            }`}
          >
            {!product.inStock
              ? "Sold Out"
              : added
                ? "✓ Added to Cart!"
                : `Add to Cart — ${formatPrice(product.price * quantity)}`}
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-auto pt-8 border-t border-border">
          {[
            { icon: "🍫", text: "Premium Ingredients" },
            { icon: "👩‍🍳", text: "Fresh & Handmade" },
            { icon: "📦", text: "Secure Packaging" },
          ].map((feature) => (
            <div key={feature.text} className="text-center">
              <span className="text-2xl block mb-1">{feature.icon}</span>
              <span className="text-xs text-text-muted font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
