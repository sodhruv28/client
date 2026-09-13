"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice, isValidPincode, generateOrderId } from "@/lib/data";

export default function CheckoutPage() {
  const router = useRouter();
  const { state, totalPrice, totalItems, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    deliveryDate: "",
    giftNote: "",
    paymentMethod: "upi",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pincodeValid, setPincodeValid] = useState<boolean | null>(null);

  const deliveryCharge = totalPrice >= 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryCharge;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    // Pincode validation
    if (name === "pincode" && value.length === 6) {
      setPincodeValid(isValidPincode(value));
    } else if (name === "pincode") {
      setPincodeValid(null);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim() || form.phone.length < 10)
      newErrors.phone = "Valid phone number required";
    if (!form.address.trim()) newErrors.address = "Delivery address is required";
    if (!form.pincode.trim() || form.pincode.length !== 6)
      newErrors.pincode = "Valid 6-digit pincode required";
    else if (!isValidPincode(form.pincode))
      newErrors.pincode = "Sorry, we don't deliver to this pincode yet";
    if (!form.deliveryDate) newErrors.deliveryDate = "Please select a delivery date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = generateOrderId();

    // Save order to localStorage
    const order = {
      id: orderId,
      items: state.items.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        customizations: item.customizations,
      })),
      ...form,
      total: grandTotal,
      status: "placed",
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("sb-orders") || "[]");
      existing.push(order);
      localStorage.setItem("sb-orders", JSON.stringify(existing));
    } catch {
      // Ignore
    }

    clearCart();
    router.push(`/checkout/confirmation?orderId=${orderId}`);
  };

  // Tomorrow as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  if (state.items.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <span className="text-5xl block mb-4">🛒</span>
        <h1 className="font-heading text-2xl font-bold text-sb-text mb-3">
          Your cart is empty
        </h1>
        <p className="text-text-muted mb-6">
          Add some treats to your cart before checking out.
        </p>
        <Link href="/menu" className="btn-primary">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-sb-text mb-2">
          Checkout
        </h1>
        <p className="text-text-muted mb-10">
          Almost there! Fill in your delivery details to place your order.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Delivery Details */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50">
                <h2 className="font-heading text-xl font-bold text-sb-text mb-6">
                  Delivery Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-sb-text mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`input-field ${errors.name ? "!border-error" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-error mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-sb-text mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 99999 99999"
                      className={`input-field ${errors.phone ? "!border-error" : ""}`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-error mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-sb-text mb-1.5"
                  >
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Full address with landmarks"
                    className={`input-field resize-none ${errors.address ? "!border-error" : ""}`}
                  />
                  {errors.address && (
                    <p className="text-xs text-error mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-semibold text-sb-text mb-1.5"
                    >
                      Pincode *
                    </label>
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      maxLength={6}
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="395001"
                      className={`input-field ${
                        errors.pincode
                          ? "!border-error"
                          : pincodeValid === true
                            ? "!border-success"
                            : ""
                      }`}
                    />
                    {errors.pincode && (
                      <p className="text-xs text-error mt-1">{errors.pincode}</p>
                    )}
                    {pincodeValid === true && !errors.pincode && (
                      <p className="text-xs text-success mt-1 flex items-center gap-1">
                        <span>✓</span> We deliver to this area!
                      </p>
                    )}
                    {pincodeValid === false && !errors.pincode && (
                      <p className="text-xs text-error mt-1">
                        Sorry, we don&apos;t deliver here yet
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="deliveryDate"
                      className="block text-sm font-semibold text-sb-text mb-1.5"
                    >
                      Delivery Date *
                    </label>
                    <input
                      id="deliveryDate"
                      name="deliveryDate"
                      type="date"
                      min={minDate}
                      value={form.deliveryDate}
                      onChange={handleChange}
                      className={`input-field ${errors.deliveryDate ? "!border-error" : ""}`}
                    />
                    {errors.deliveryDate && (
                      <p className="text-xs text-error mt-1">
                        {errors.deliveryDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Gift Note */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50">
                <h2 className="font-heading text-xl font-bold text-sb-text mb-4">
                  🎁 Add a Gift Note{" "}
                  <span className="text-sm font-normal text-text-muted">(optional)</span>
                </h2>
                <textarea
                  id="giftNote"
                  name="giftNote"
                  rows={2}
                  value={form.giftNote}
                  onChange={handleChange}
                  placeholder="Write a personal message for the receiver..."
                  className="input-field resize-none"
                />
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50">
                <h2 className="font-heading text-xl font-bold text-sb-text mb-4">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: "upi", label: "UPI (GPay / PhonePe / Paytm)", icon: "📱" },
                    { id: "card", label: "Credit / Debit Card", icon: "💳" },
                    { id: "cod", label: "Cash on Delivery", icon: "💵" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      htmlFor={`payment-${method.id}`}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                        form.paymentMethod === method.id
                          ? "bg-cream border-2 border-primary"
                          : "bg-cream/50 border-2 border-transparent hover:border-border"
                      }`}
                    >
                      <input
                        type="radio"
                        id={`payment-${method.id}`}
                        name="paymentMethod"
                        value={method.id}
                        checked={form.paymentMethod === method.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          form.paymentMethod === method.id
                            ? "border-primary"
                            : "border-border"
                        }`}
                      >
                        {form.paymentMethod === method.id && (
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </span>
                      <span className="text-lg">{method.icon}</span>
                      <span className="text-sm font-medium text-sb-text">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50 sticky top-28">
                <h2 className="font-heading text-xl font-bold text-sb-text mb-6">
                  Order Summary
                </h2>

                {/* Items */}
                <ul className="space-y-4 mb-6">
                  {state.items.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-cream-dark">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-sb-text truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-text-muted">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-sb-text whitespace-nowrap">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-semibold text-sb-text">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Delivery</span>
                    <span
                      className={`font-semibold ${
                        deliveryCharge === 0
                          ? "text-success"
                          : "text-sb-text"
                      }`}
                    >
                      {deliveryCharge === 0
                        ? "FREE"
                        : formatPrice(deliveryCharge)}
                    </span>
                  </div>
                  {deliveryCharge === 0 && (
                    <p className="text-xs text-success">
                      🎉 Free delivery on orders above ₹500
                    </p>
                  )}
                </div>

                <div className="border-t border-border mt-4 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-sb-text">Total</span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                <button
                  type="submit"
                  id="place-order-btn"
                  className="btn-primary w-full mt-6 py-4 text-base"
                >
                  Place Order
                </button>

                <p className="text-xs text-text-light text-center mt-3">
                  By placing this order, you agree to our terms of service
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
