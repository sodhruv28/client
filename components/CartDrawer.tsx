"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/data";

export function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, totalItems, totalPrice } =
    useCart();

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" id="cart-drawer">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-xl font-bold text-sb-text">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="bg-accent text-sb-text text-xs font-bold px-2.5 py-0.5 rounded-full">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            id="cart-close-btn"
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream transition-colors text-text-muted hover:text-sb-text"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <span className="text-5xl mb-4">🛒</span>
              <h3 className="font-heading text-lg font-semibold text-sb-text mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-text-muted mb-6 max-w-xs">
                Looks like you haven&apos;t added any treats yet. Explore our
                menu to find something delicious!
              </p>
              <Link
                href="/menu"
                onClick={closeCart}
                className="btn-primary text-sm"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {state.items.map((item, index) => {
                const customKey = Object.entries(item.customizations || {})
                  .map(([k, v]) => `${k}=${v}`)
                  .join(",");

                return (
                  <li
                    key={`${item.product.id}-${customKey}-${index}`}
                    className="flex gap-4 p-3 rounded-xl bg-cream/60 animate-fade-in"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-cream-dark">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-sb-text leading-tight truncate">
                        {item.product.name}
                      </h4>

                      {/* Customizations */}
                      {Object.keys(item.customizations || {}).length > 0 && (
                        <p className="text-xs text-text-muted mt-0.5 truncate">
                          {Object.values(item.customizations).join(", ")}
                        </p>
                      )}

                      <p className="text-sm font-bold text-primary mt-1">
                        {formatPrice(item.product.price)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.customizations
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-border text-sm font-bold text-text-muted hover:border-primary hover:text-primary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold text-sb-text w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.customizations
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-border text-sm font-bold text-text-muted hover:border-primary hover:text-primary transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                        {/* Remove */}
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.customizations)
                          }
                          className="ml-auto text-xs text-error hover:underline"
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-text-muted font-medium">Subtotal</span>
              <span className="text-xl font-bold text-sb-text">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <p className="text-xs text-text-light">
              Delivery charges calculated at checkout
            </p>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              id="cart-checkout-btn"
              className="btn-primary w-full text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
