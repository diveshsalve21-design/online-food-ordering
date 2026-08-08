import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as getCurrentUser } from "./login-CAyqzBQd.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-qRuWGf-q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CartContext = (0, import_react.createContext)(void 0);
var inr = (amount) => new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0
}).format(amount);
var LOCAL_STORAGE_KEY = "online_food_orders";
function resolveRestaurantName(item) {
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
function getStoredOrders(forUserEmail) {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
		const allOrders = raw ? JSON.parse(raw) : [];
		const activeUser = getCurrentUser();
		const targetEmail = (forUserEmail || activeUser?.email || "").toLowerCase().trim();
		if (!targetEmail) return [];
		return allOrders.filter((order) => {
			if (!order.userEmail) return true;
			return order.userEmail.toLowerCase().trim() === targetEmail;
		});
	} catch (err) {
		console.error("Failed to load orders from localStorage", err);
		return [];
	}
}
function saveStoredOrder(order) {
	const activeUser = getCurrentUser();
	const fullOrder = {
		...order,
		userEmail: order.userEmail || activeUser?.email || "divesh@fusion.in",
		date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		})
	};
	if (typeof window !== "undefined") try {
		const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
		const updated = [fullOrder, ...raw ? JSON.parse(raw) : []];
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
	} catch (err) {
		console.error("Failed to save order to localStorage", err);
	}
	return fullOrder;
}
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [open, setOpen] = (0, import_react.useState)(false);
	const add = (item) => {
		const rName = resolveRestaurantName(item);
		const itemWithRestaurant = {
			...item,
			restaurantName: rName,
			qty: 1
		};
		setItems((prev) => {
			if (prev.find((i) => i.id === item.id)) return prev.map((i) => i.id === item.id ? {
				...i,
				qty: i.qty + 1
			} : i);
			return [...prev, itemWithRestaurant];
		});
		setOpen(true);
		toast.success(`${item.name} added to cart`, { description: `From ${rName} · ${inr(item.price)}` });
	};
	const setQty = (id, qty) => {
		setItems((prev) => qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => i.id === id ? {
			...i,
			qty
		} : i));
	};
	const subtotal = (0, import_react.useMemo)(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
	const count = (0, import_react.useMemo)(() => items.reduce((s, i) => s + i.qty, 0), [items]);
	const uniqueRestaurants = (0, import_react.useMemo)(() => {
		const names = items.map((i) => i.restaurantName || "Partner Kitchen");
		return Array.from(new Set(names));
	}, [items]);
	const isMultiRestaurant = uniqueRestaurants.length > 1;
	const delivery = subtotal === 0 || subtotal >= 499 ? 0 : isMultiRestaurant ? 45 : 39;
	const deliverySavings = isMultiRestaurant ? uniqueRestaurants.length * 39 - 45 : 0;
	const gst = Math.round(subtotal * .05);
	const value = (0, import_react.useMemo)(() => ({
		items,
		add,
		remove: (id) => setQty(id, 0),
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
		getOrders: getStoredOrders
	}), [
		items,
		open,
		subtotal,
		gst,
		delivery,
		deliverySavings,
		uniqueRestaurants,
		isMultiRestaurant,
		count
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const value = (0, import_react.useContext)(CartContext);
	if (!value) throw new Error("useCart must be used within CartProvider");
	return value;
}
//#endregion
export { useCart as i, getStoredOrders as n, inr as r, CartProvider as t };
