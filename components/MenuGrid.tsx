"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import type { Product, Category } from "@/lib/data";

export function MenuGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-10">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-all ${
            activeCategory === "all"
              ? "bg-primary text-white shadow-md"
              : "bg-white text-text-muted border border-border hover:border-primary hover:text-primary"
          }`}
        >
          All ({products.length})
        </button>
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-text-muted border border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <h3 className="font-heading text-xl font-semibold text-sb-text mb-2">
            No products found
          </h3>
          <p className="text-text-muted">
            Try selecting a different category.
          </p>
        </div>
      )}
    </>
  );
}
