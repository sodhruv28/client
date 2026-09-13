import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/data";
import { MenuGrid } from "@/components/MenuGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu — sweet.bonanza",
  description:
    "Browse our full menu of handcrafted desserts. Cookie tins, brownie tubs, kunafa cookies, cakes, and festival hampers. Order online for delivery in Surat.",
};

function MenuGridFallback() {
  return (
    <div>
      <div className="flex gap-3 mb-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 w-28 bg-cream rounded-full animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-border/50">
            <div className="aspect-square bg-cream animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-cream rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-cream rounded animate-pulse" />
              <div className="h-6 w-20 bg-cream rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <>
      {/* Header */}
      <div className="bg-primary pt-28 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Menu
          </h1>
          <p className="text-white/70 max-w-lg mx-auto">
            Every item is baked fresh to order. Browse our collection and find
            your next favourite treat.
          </p>
        </div>
      </div>

      {/* Menu content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<MenuGridFallback />}>
            <MenuGrid products={products} categories={categories} />
          </Suspense>
        </div>
      </section>
    </>
  );
}

