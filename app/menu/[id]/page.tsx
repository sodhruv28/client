import { getProductById, getProducts, getProductsByCategory } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductCard } from "@/components/ProductCard";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  props: PageProps<"/menu/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — sweet.bonanza`,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/menu/[id]">) {
  const { id } = await props.params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ProductDetail product={product} />
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-sb-text mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
