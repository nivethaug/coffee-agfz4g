import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./catalog";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      count: items.reduce((a, i) => a + i.qty, 0),
      total: items.reduce((a, i) => a + i.qty * i.product.price, 0),
      add: (id, qty = 1) =>
        setItems((prev) => {
          const p = PRODUCTS.find((x) => x.id === id);
          if (!p) return prev;
          const existing = prev.find((i) => i.product.id === id);
          if (existing) {
            return prev.map((i) =>
              i.product.id === id ? { ...i, qty: i.qty + qty } : i
            );
          }
          return [...prev, { product: p, qty }];
        }),
      setQty: (id, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((i) => i.product.id !== id)
            : prev.map((i) => (i.product.id === id ? { ...i, qty } : i))
        ),
      remove: (id) => setItems((prev) => prev.filter((i) => i.product.id !== id)),
      clear: () => setItems([]),
    }),
    [items]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useCart = (): CartCtx => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
