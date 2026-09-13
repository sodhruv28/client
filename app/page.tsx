import Image from "next/image";
import Link from "next/link";
import {
  getBestsellers,
  getCategories,
  getTestimonials,
  formatPrice,
} from "@/lib/data";
import { HeroSection } from "@/components/HeroSection";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

export default function Home() {
  const bestsellers = getBestsellers();
  const categories = getCategories();
  const testimonials = getTestimonials();

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── Bestsellers ───────────────────────────────────────────────── */}
      <section id="bestsellers" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">
              Fan Favourites
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-sb-text mt-3 mb-4">
              Our Bestsellers
            </h2>
            <div className="section-divider mb-5" />
            <p className="text-text-muted max-w-lg mx-auto">
              The treats everyone keeps coming back for. Baked fresh, packed with
              love, and delivered to your door.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {bestsellers.map((product, i) => (
              <Link
                key={product.id}
                href={`/menu/${product.id}`}
                className={`product-card group block bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 opacity-0 animate-fade-in-up stagger-${i + 1}`}
              >
                <div className="relative aspect-square overflow-hidden bg-cream-dark">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="product-image object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {product.badge && (
                    <span className="badge badge-bestseller absolute top-3 left-3 z-10">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-heading text-xl font-semibold text-sb-text mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-text-light font-medium group-hover:text-primary transition-colors">
                      Order Now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu" className="btn-secondary">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Categories ────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 sm:py-28 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">
              Explore
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-sb-text mt-3 mb-4">
              Browse by Category
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.id}`}
                id={`cat-${cat.id}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-heading text-lg font-bold text-white">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Brand Story ───────────────────────────────────────────────── */}
      <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/hero-bg.jpg"
                  alt="sweet.bonanza desserts"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -right-6 glass-card rounded-xl p-5 max-w-[200px] hidden lg:block">
                <p className="font-heading text-3xl font-bold text-primary mb-1">500+</p>
                <p className="text-sm text-text-muted">Happy customers & counting</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="text-accent font-semibold text-sm tracking-widest uppercase">
                Our Story
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-sb-text mt-3 mb-6 leading-tight">
                Baked with Heart,{" "}
                <span className="text-primary">Delivered with Love</span>
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  What started as a passion for baking in a Surat home kitchen has
                  grown into something truly special. At sweet.bonanza, every
                  cookie, brownie, and cake is handcrafted in small batches using
                  only premium ingredients — real Belgian chocolate, farm-fresh
                  butter, and the finest nuts and spices.
                </p>
                <p>
                  We believe desserts should be an experience, not just food.
                  That&apos;s why we obsess over every detail — from the first
                  bite to the unboxing moment. Whether it&apos;s a midnight craving,
                  a festival celebration, or a gift for someone special, we make
                  sure it&apos;s unforgettable.
                </p>
                <p className="font-semibold text-sb-text">
                  No preservatives. No shortcuts. Just pure, honest baking.
                </p>
              </div>

              <div className="flex flex-wrap gap-8 mt-8">
                {[
                  { value: "100%", label: "Handmade" },
                  { value: "Fresh", label: "Small Batch" },
                  { value: "Same Day", label: "Delivery" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-2xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-sm text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 sm:py-28 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">
              Client Love
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-sb-text mt-3 mb-4">
              What Our Customers Say
            </h2>
            <div className="section-divider" />
          </div>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ─── Festival Banner ───────────────────────────────────────────── */}
      <section id="festival-banner" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <Image
              src="/products/rakhi-hamper.jpg"
              alt="Festival hampers"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            <div className="relative z-10 px-8 sm:px-14 py-16 sm:py-20">
              <span className="badge badge-seasonal mb-4 inline-block">
                Limited Edition
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-lg leading-tight">
                Festival Hampers Now Available
              </h2>
              <p className="text-white/80 max-w-md mb-8 leading-relaxed">
                Celebrate every occasion with our curated gift hampers. Packed
                with our bestselling treats, beautifully wrapped, and ready to
                make someone&apos;s day special.
              </p>
              <Link href="/menu?category=hampers" className="btn-primary">
                Explore Hampers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ───────────────────────────────────────────────── */}
      <section id="cta" className="py-20 sm:py-28 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-sb-text mb-6 leading-tight">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Custom cakes, corporate gifting, bulk orders, or something totally
            unique — we love a creative challenge. Drop us a message and
            let&apos;s create something special together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919999999999?text=Hi!%20I%20want%20to%20place%20a%20custom%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              <span>💬</span>
              WhatsApp Us
            </a>
            <a
              href="https://instagram.com/sweet.bonanza"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
            >
              <span>📸</span>
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
