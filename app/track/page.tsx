"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { orderStatuses } from "@/lib/data";
import type { OrderStatus } from "@/lib/data";

interface SavedOrder {
  id: string;
  name: string;
  total: number;
  status: OrderStatus;
  deliveryDate: string;
  createdAt: string;
  items: { name: string; quantity: number }[];
}

function TrackContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("orderId") || "");
  const [order, setOrder] = useState<SavedOrder | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const id = searchParams.get("orderId");
    if (id) {
      setOrderId(id);
      lookupOrder(id);
    }
  }, [searchParams]);

  const lookupOrder = (id: string) => {
    setSearched(true);
    try {
      const orders = JSON.parse(localStorage.getItem("sb-orders") || "[]");
      const found = orders.find(
        (o: SavedOrder) => o.id.toLowerCase() === id.toLowerCase()
      );
      setOrder(found || null);
    } catch {
      setOrder(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) lookupOrder(orderId.trim());
  };

  const currentStatusIndex = order
    ? orderStatuses.findIndex((s) => s.key === order.status)
    : -1;

  return (
    <div className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-sb-text mb-3">
            Track Your Order
          </h1>
          <p className="text-text-muted">
            Enter your order ID to check the current status of your order.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex gap-3">
            <input
              id="order-id-input"
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g., SB-A1B2C3)"
              className="input-field flex-1 text-base"
            />
            <button type="submit" id="track-btn" className="btn-primary whitespace-nowrap">
              Track
            </button>
          </div>
        </form>

        {/* Results */}
        {searched && !order && (
          <div className="bg-white rounded-md p-8 shadow-sm border border-border/50 text-center">
            <h3 className="font-heading text-xl font-semibold text-sb-text mb-2">
              Order Not Found
            </h3>
            <p className="text-text-muted max-w-sm mx-auto mb-6">
              We couldn&apos;t find an order with that ID. Please double-check
              your order ID and try again.
            </p>
            <Link href="/menu" className="btn-secondary text-sm">
              Browse Menu Instead
            </Link>
          </div>
        )}

        {order && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50 animate-fade-in">
            {/* Order header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-sm text-text-muted">Order ID</p>
                <p className="text-xl font-bold text-primary font-mono">
                  {order.id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-muted">Placed on</p>
                <p className="text-sm font-semibold text-sb-text">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {orderStatuses.map((status, i) => {
                const isCompleted = i < currentStatusIndex;
                const isActive = i === currentStatusIndex;
                const isPending = i > currentStatusIndex;

                return (
                  <div key={status.key}>
                    <div className="flex items-center gap-4">
                      <div
                        className={`timeline-dot ${
                          isCompleted
                            ? "completed"
                            : isActive
                              ? "active"
                              : "pending"
                        }`}
                      >
                        {isCompleted ? (
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          isActive && <span className="w-2.5 h-2.5 rounded bg-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-semibold text-sm ${
                            isPending ? "text-text-light" : "text-sb-text"
                          }`}
                        >
                          {status.label}
                        </p>
                        {isActive && (
                          <p className="text-xs text-primary font-medium mt-0.5">
                            Current status
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Connector line */}
                    {i < orderStatuses.length - 1 && (
                      <div className="ml-[19px]">
                        <div
                          className={`timeline-line ${
                            i < currentStatusIndex ? "completed" : "pending"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Order details */}
            <div className="mt-8 pt-6 border-t border-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Items</span>
                <span className="font-medium text-sb-text text-right">
                  {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Delivery Date</span>
                <span className="font-medium text-sb-text">
                  {new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Total</span>
                <span className="font-bold text-primary">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Help */}
            <div className="mt-6 p-4 rounded-xl bg-cream text-center">
              <p className="text-sm text-text-muted mb-2">
                Questions about your order?
              </p>
              <a
                href={`https://wa.me/919999999999?text=Hi!%20I%20have%20a%20question%20about%20order%20${order.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary font-semibold hover:underline"
              >
                WhatsApp us →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="pt-32 pb-20 px-4 text-center">
      <div className="h-10 w-72 mx-auto bg-cream rounded-lg animate-pulse mb-3" />
      <div className="h-4 w-56 mx-auto bg-cream rounded-lg animate-pulse mb-10" />
      <div className="max-w-2xl mx-auto h-14 bg-cream rounded-xl animate-pulse" />
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <TrackContent />
    </Suspense>
  );
}
