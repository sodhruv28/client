"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SavedOrder {
  id: string;
  name: string;
  total: number;
  deliveryDate: string;
  items: { name: string; quantity: number }[];
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<SavedOrder | null>(null);

  useEffect(() => {
    if (!orderId) return;
    try {
      const orders = JSON.parse(localStorage.getItem("sb-orders") || "[]");
      const found = orders.find((o: SavedOrder) => o.id === orderId);
      if (found) setOrder(found);
    } catch {
      // Ignore
    }
  }, [orderId]);

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success animation */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center animate-bounce-in">
          <span className="text-4xl">🎉</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-sb-text mb-3">
          Order Placed Successfully!
        </h1>
        <p className="text-text-muted max-w-md mx-auto mb-8">
          Thank you for your order. We&apos;ve received it and will start
          preparing your treats right away.
        </p>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50 text-left mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-text-muted">Order ID</p>
              <p className="text-xl font-bold text-primary font-mono">
                {orderId || "—"}
              </p>
            </div>
            <span className="badge badge-new">Placed</span>
          </div>

          {order && (
            <>
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Customer</span>
                  <span className="font-semibold text-sb-text">{order.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Delivery Date</span>
                  <span className="font-semibold text-sb-text">
                    {new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Items</span>
                  <span className="font-semibold text-sb-text">
                    {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                  </span>
                </div>
              </div>

              <div className="border-t border-border mt-4 pt-4 flex justify-between">
                <span className="font-bold text-sb-text">Total Paid</span>
                <span className="font-bold text-primary text-lg">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/track?orderId=${orderId}`}
            className="btn-primary w-full sm:w-auto"
          >
            Track Your Order
          </Link>
          <Link href="/menu" className="btn-secondary w-full sm:w-auto">
            Continue Shopping
          </Link>
        </div>

        {/* WhatsApp share */}
        <div className="mt-10 p-5 rounded-xl bg-cream text-center">
          <p className="text-sm text-text-muted mb-3">
            📱 You&apos;ll receive a confirmation on WhatsApp shortly
          </p>
          <a
            href={`https://wa.me/919999999999?text=Hi!%20I%20just%20placed%20order%20${orderId}%20on%20sweet.bonanza!`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary font-semibold hover:underline"
          >
            Contact us on WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="pt-32 pb-20 px-4 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream animate-pulse" />
      <div className="h-8 w-64 mx-auto bg-cream rounded-lg animate-pulse mb-3" />
      <div className="h-4 w-48 mx-auto bg-cream rounded-lg animate-pulse" />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmationContent />
    </Suspense>
  );
}
