"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Product } from "@/lib/data";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
  customizations: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; customizations?: Record<string, string> } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; customizations?: Record<string, string> } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; customizations?: Record<string, string>; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (product: Product, customizations?: Record<string, string>) => void;
  removeItem: (productId: string, customizations?: Record<string, string>) => void;
  updateQuantity: (productId: string, quantity: number, customizations?: Record<string, string>) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getItemKey(productId: string, customizations?: Record<string, string>): string {
  if (!customizations || Object.keys(customizations).length === 0) return productId;
  const sorted = Object.entries(customizations).sort(([a], [b]) => a.localeCompare(b));
  return `${productId}::${sorted.map(([k, v]) => `${k}=${v}`).join(",")}`;
}

function matchItem(item: CartItem, productId: string, customizations?: Record<string, string>): boolean {
  return getItemKey(item.product.id, item.customizations) === getItemKey(productId, customizations);
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, customizations = {} } = action.payload;
      const existingIndex = state.items.findIndex((item) =>
        matchItem(item, product.id, customizations)
      );

      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
        };
        return { ...state, items: newItems, isOpen: true };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity: 1, customizations }],
        isOpen: true,
      };
    }

    case "REMOVE_ITEM": {
      const { productId, customizations } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => !matchItem(item, productId, customizations)),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity, customizations } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => !matchItem(item, productId, customizations)),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          matchItem(item, productId, customizations)
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [], isOpen: false };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "LOAD_CART":
      return { ...state, items: action.payload };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sweet-bonanza-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: "LOAD_CART", payload: parsed });
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("sweet-bonanza-cart", JSON.stringify(state.items));
    } catch {
      // Ignore storage errors
    }
  }, [state.items]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const value: CartContextType = {
    state,
    addItem: (product, customizations) =>
      dispatch({ type: "ADD_ITEM", payload: { product, customizations } }),
    removeItem: (productId, customizations) =>
      dispatch({ type: "REMOVE_ITEM", payload: { productId, customizations } }),
    updateQuantity: (productId, quantity, customizations) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity, customizations } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
    openCart: () => dispatch({ type: "OPEN_CART" }),
    closeCart: () => dispatch({ type: "CLOSE_CART" }),
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
