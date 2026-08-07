import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getCurrentUser } from "@/routes/login";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  veg: boolean;
  qty: number;
  restaurantId?: string;
  restaurantName?: string;
};

export type PlacedOrder = {
  id: string;
  paymentId: string;
  date: string;
  userEmail?: string;
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
  deliverySavings: number;
  uniqueRestaurants: string[];
  isMultiRestaurant: boolean;
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

// Resolve Restaurant Name from Item ID if not explicitly passed
function resolveRestaurantName(item: AddItem): string {
  if (item.restaurantName) return item.restaurantName;
  const id = item.id.toLowerCase();
  if (id.includes("napoli")) return "Napoli Wood Fire";
  if (id.includes("spice") || id.includes("indian")) return "Spice Route Kitchen";
  if (id.includes("wok")) return "Wok House";
  if (id.includes("grill") || id.includes("burger")) return "Burger Lab";
  if (id.includes("green")) return "Green Bowl Co.";
  if (id.includes("sweet")) return "Sweet Tooth";
  if (id.includes("coastal")) return "Coastal Curry House";
  if (id.includes("bistro")) return "Bombay Street Bistro";
  if (id.includes("divesh")) return "Divesh Fusion Kitchen";
  if (id.includes("pritesh")) return "Pritesh Spice Hub";
  if (id.includes("rashmin")) return "Rashmin Royal Grill";
  if (id.includes("himanshu")) return "Himanshu Bistro & Cafe";
  if (id.includes("swaraj")) return "Swaraj Coastal Delights";
  return "Partner Kitchen";
}

// Get user-specific order history
export function getStoredOrders(forUserEmail?: string): PlacedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const allOrders: PlacedOrder[] = raw ? JSON.parse(raw) : [];

    const activeUser = getCurrentUser();
    const targetEmail = (forUserEmail || activeUser?.email || "").toLowerCase().trim();

    if (!targetEmail) {
      return [];
    }

    return allOrders.filter((order) => {
      if (!order.userEmail) return true;
      return order.userEmail.toLowerCase().trim() === targetEmail;
    });
  } catch (err) {
    console.error("Failed to load orders from localStorage", err);
    return [];
  }
}

// Save order tied to current logged-in user account
export function saveStoredOrder(order: Omit<PlacedOrder, "date">): PlacedOrder {
  const activeUser = getCurrentUser();
  const fullOrder: PlacedOrder = {
    ...order,
    userEmail: order.userEmail || activeUser?.email || "divesh@fusion.in",
    date: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const allOrders: PlacedOrder[] = raw ? JSON.parse(raw) : [];
      const updated = [fullOrder, ...allOrders];
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
    const rName = resolveRestaurantName(item);
    const itemWithRestaurant: CartItem = {
      ...item,
      restaurantName: rName,
      qty: 1,
    };

    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, itemWithRestaurant];
    });

    // Automatically slide open the Cart Drawer page when item is added!
    setOpen(true);

    toast.success(`${item.name} added to cart`, {
      description: `From ${rName} · ${inr(item.price)}`,
    });
  };

  const setQty = (id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  };

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  // MULTI-HOTEL CART TRACKING & SAVINGS LOGIC
  const uniqueRestaurants = useMemo(() => {
    const names = items.map((i) => i.restaurantName || "Partner Kitchen");
    return Array.from(new Set(names));
  }, [items]);

  const isMultiRestaurant = uniqueRestaurants.length > 1;

  // Delivery calculation:
  // Single restaurant: ₹39
  // Multi restaurant: ₹45 combined delivery fee (saving 39 * N - 45!)
  const delivery = subtotal === 0 || subtotal >= 499 ? 0 : isMultiRestaurant ? 45 : 39;
  const deliverySavings = isMultiRestaurant ? uniqueRestaurants.length * 39 - 45 : 0;

  const gst = Math.round(subtotal * 0.05);

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
      deliverySavings,
      uniqueRestaurants,
      isMultiRestaurant,
      total: subtotal + gst + delivery,
      count,
      open,
      setOpen,
      saveOrder: saveStoredOrder,
      getOrders: getStoredOrders,
    }),
    [items, open, subtotal, gst, delivery, deliverySavings, uniqueRestaurants, isMultiRestaurant, count]
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
