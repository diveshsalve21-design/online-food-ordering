import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartItem = { id: string; name: string; price: number; image: string; veg: boolean; qty: number };
type AddItem = Omit<CartItem, "qty">;
type CartContextValue = { items: CartItem[]; add: (item: AddItem) => void; remove: (id: string) => void; setQty: (id: string, qty: number) => void; clear: () => void; subtotal: number; gst: number; delivery: number; total: number };
const CartContext = createContext<CartContextValue | undefined>(undefined);
export const inr = (amount: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (item: AddItem) => setItems(current => {
    const existing = current.find(x => x.id === item.id);
    return existing ? current.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x) : [...current, { ...item, qty: 1 }];
  });
  const setQty = (id: string, qty: number) => setItems(current => qty < 1 ? current.filter(x => x.id !== id) : current.map(x => x.id === id ? { ...x, qty } : x));
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const delivery = subtotal === 0 || subtotal >= 299 ? 0 : 39;
  const value = useMemo(() => ({ items, add, remove: (id: string) => setQty(id, 0), setQty, clear: () => setItems([]), subtotal, gst, delivery, total: subtotal + gst + delivery }), [items, subtotal, gst, delivery]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const value = useContext(CartContext); if (!value) throw new Error("useCart must be used within CartProvider"); return value; }
