import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  veg: boolean;
  qty: number;
};

export type PlacedOrder = {
  id: string;
  paymentId: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  gst: number;
  delivery: number;
  discount: number;
  total: number;
  status: "On the way" | "Delivered";
  paymentMethod: string;
};

type AddItem = Omit<CartItem, "qty">;

type CartContextValue = {
  items: CartItem[];
  add: (item: AddItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  gst: number;
  delivery: number;
  total: number;
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  saveOrder: (order: Omit<PlacedOrder, "date">) => void;
  getOrders: () => PlacedOrder[];
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const inr = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const LOCAL_STORAGE_KEY = "online_food_orders";

export function getStoredOrders(): PlacedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to load orders from localStorage", err);
    return [];
  }
}

export function saveStoredOrder(order: Omit<PlacedOrder, "date">): PlacedOrder {
  const fullOrder: PlacedOrder = {
    ...order,
    date: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const existing = getStoredOrders();
  const updated = [fullOrder, ...existing];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save order to localStorage", err);
    }
  }
  return fullOrder;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = (item: AddItem) => {
    setItems((current) => {
      const existing = current.find((x) => x.id === item.id);
      return existing
        ? current.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x))
        : [...current, { ...item, qty: 1 }];
    });
    setOpen(true);
    toast.success(`Added "${item.name}" to cart!`);
  };

  const setQty = (id: string, qty: number) =>
    setItems((current) =>
      qty < 1
        ? current.filter((x) => x.id !== id)
        : current.map((x) => (x.id === id ? { ...x, qty } : x))
    );

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const delivery = subtotal === 0 || subtotal >= 299 ? 0 : 39;

  const value = useMemo(
    () => ({
      items,
      add,
      remove: (id: string) => setQty(id, 0),
      setQty,
      clear: () => setItems([]),
      subtotal,
      gst,
      delivery,
      total: subtotal + gst + delivery,
      count,
      open,
      setOpen,
      saveOrder: saveStoredOrder,
      getOrders: getStoredOrders,
    }),
    [items, open, subtotal, gst, delivery, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used within CartProvider");
  }
  return value;
}
