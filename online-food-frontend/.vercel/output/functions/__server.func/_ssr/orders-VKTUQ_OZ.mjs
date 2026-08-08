import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as useCart, n as getStoredOrders, r as inr } from "./cart-qRuWGf-q.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { A as Printer, B as MapPin, E as RefreshCw, I as PackageCheck, L as Navigation, O as Radio, P as PhoneCall, R as Navigation2, S as Send, Y as FileText, _ as Star, b as ShoppingBag, dt as Bike, i as X, o as Utensils, ot as ChefHat, p as Timer, rt as CircleCheck, tt as Clock, v as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { n as dishes, s as restaurants } from "./data-C9guypz_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-VKTUQ_OZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RIDERS = [
	{
		name: "Naman Sharma",
		vehicle: "Bajaj Pulsar (MH 05 EV 9821)",
		rating: "4.9 ★",
		phone: "+91 98201 44102",
		distance: "1.8 km away"
	},
	{
		name: "Rahul Verma",
		vehicle: "TVS Apache (MH 04 AB 3140)",
		rating: "4.8 ★",
		phone: "+91 98192 11093",
		distance: "2.3 km away"
	},
	{
		name: "Vikram Singh",
		vehicle: "Hero Splendor (MH 02 CK 8812)",
		rating: "4.9 ★",
		phone: "+91 97693 55214",
		distance: "1.2 km away"
	},
	{
		name: "Sameer Khan",
		vehicle: "Honda Activa (MH 05 DF 4109)",
		rating: "4.7 ★",
		phone: "+91 99871 66380",
		distance: "3.1 km away"
	},
	{
		name: "Amit Deshmukh",
		vehicle: "Ather Electric 450X (MH 03 EV 2210)",
		rating: "5.0 ★",
		phone: "+91 98334 77192",
		distance: "0.9 km away"
	}
];
function getRiderForOrder(orderId) {
	let hash = 0;
	for (let i = 0; i < orderId.length; i++) hash = (hash + orderId.charCodeAt(i)) % RIDERS.length;
	return RIDERS[hash];
}
var steps = [
	{
		icon: CircleCheck,
		label: "Order Confirmed",
		time: "12:40 PM",
		done: true
	},
	{
		icon: Utensils,
		label: "Kitchen Preparing",
		time: "12:43 PM",
		done: true
	},
	{
		icon: ChefHat,
		label: "Food Freshly Cooked",
		time: "12:52 PM",
		done: true
	},
	{
		icon: PackageCheck,
		label: "Rider Picked Up",
		time: "01:00 PM",
		done: true
	},
	{
		icon: Bike,
		label: "Out for Delivery",
		time: "Now",
		done: false,
		active: true
	},
	{
		icon: MapPin,
		label: "Delivered at Doorstep",
		time: "Est. 01:14 PM",
		done: false
	}
];
function Orders() {
	const { add } = useCart();
	const [realOrders, setRealOrders] = (0, import_react.useState)([]);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [statusOverrides, setStatusOverrides] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return {};
		try {
			const raw = localStorage.getItem("online_food_order_status_overrides");
			return raw ? JSON.parse(raw) : {};
		} catch {
			return {};
		}
	});
	const [etaSeconds, setEtaSeconds] = (0, import_react.useState)(840);
	(0, import_react.useEffect)(() => {
		setRealOrders(getStoredOrders());
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setEtaSeconds((prev) => prev > 0 ? prev - 1 : 0);
		}, 1e3);
		return () => clearInterval(timer);
	}, []);
	const formatEta = (sec) => {
		const mins = Math.floor(sec / 60);
		const s = sec % 60;
		return `${mins}m ${s < 10 ? "0" : ""}${s}s`;
	};
	const [selectedInvoice, setSelectedInvoice] = (0, import_react.useState)(null);
	const [selectedRating, setSelectedRating] = (0, import_react.useState)(null);
	const [starCount, setStarCount] = (0, import_react.useState)(5);
	const [hoverStar, setHoverStar] = (0, import_react.useState)(0);
	const [selectedTags, setSelectedTags] = (0, import_react.useState)(["Tasty Food", "Fast Delivery"]);
	const [feedbackText, setFeedbackText] = (0, import_react.useState)("");
	const handleRepeatPlacedOrder = (orderItems) => {
		orderItems.forEach((item) => {
			for (let i = 0; i < item.qty; i++) add({
				id: item.id,
				name: item.name,
				price: item.price,
				image: item.image,
				veg: item.veg
			});
		});
		toast.success(`Repeat Order Added! (${orderItems.length} items copied to cart)`);
	};
	const handleRepeatMockOrder = (restaurantName) => {
		dishes.slice(0, 2).forEach((dish) => {
			add({
				id: dish.id,
				name: dish.name,
				price: dish.price,
				image: dish.image,
				veg: dish.veg
			});
		});
		toast.success(`Order from ${restaurantName} repeated! Items added to your cart.`);
	};
	const openRatingModal = (restaurantName, image) => {
		setSelectedRating({
			restaurantName,
			image
		});
		setStarCount(5);
		setFeedbackText("");
	};
	const toggleTag = (tag) => {
		setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
	};
	const handleCallRider = (name, phone) => {
		const cleanPhone = phone.replace(/\s+/g, "");
		toast.info(`Dialing ${name} (${phone})...`);
		if (typeof window !== "undefined") window.location.href = `tel:${cleanPhone}`;
	};
	const handleShareGps = (riderName, orderId) => {
		const shareText = `🚀 Tracking my FoodFusion order #${orderId || "FF-8921"} delivered by ${riderName}! Live status: On the way.`;
		const shareUrl = typeof window !== "undefined" ? window.location.href : "http://localhost:8080/orders";
		if (typeof navigator !== "undefined" && navigator.share) navigator.share({
			title: "Live Food Order Tracking",
			text: shareText,
			url: shareUrl
		}).then(() => toast.success("Live GPS Tracking link shared successfully!")).catch(() => {});
		else if (typeof navigator !== "undefined" && navigator.clipboard) {
			navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
			toast.success("Live GPS Tracking Link Copied to Clipboard! 📋", { description: "Share it on WhatsApp or SMS to track live location." });
		} else window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
	};
	const handleSubmitRating = () => {
		if (!selectedRating) return;
		toast.success(`Rating submitted for ${selectedRating.restaurantName}! ⭐ ${starCount}/5`, { description: "Thank you for your valuable feedback." });
		setSelectedRating(null);
	};
	const handlePrintInvoice = () => {
		toast.success("Downloading Tax Invoice PDF...", { description: `Invoice #${selectedInvoice?.id}` });
		if (typeof window !== "undefined") window.print();
	};
	const activeLiveOrder = realOrders.length > 0 ? realOrders[0] : null;
	const activeRider = activeLiveOrder ? getRiderForOrder(activeLiveOrder.id) : RIDERS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong relative overflow-hidden rounded-3xl p-6 border border-white/15 shadow-2xl space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-pulse"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex h-3 w-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-emerald-500" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-xl sm:text-2xl font-black text-foreground",
									children: ["Live Order #", activeLiveOrder ? activeLiveOrder.id : "FF-8921"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 animate-pulse",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-3 w-3 animate-spin text-emerald-400" }), " ON THE WAY"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: ["Expected arrival at ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: activeLiveOrder?.address || "Kalyan West"
								})]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-2.5 shadow-glow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-5 w-5 animate-bounce" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase font-bold text-muted-foreground tracking-wider",
								children: "Estimated Delivery"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg font-black text-primary font-mono tracking-tight",
								children: formatEta(etaSeconds)
							})] })]
						})]
					}),
					activeLiveOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-white/5 p-3.5 text-xs flex flex-wrap justify-between items-center gap-3 border border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Customer: "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-foreground",
								children: [
									activeLiveOrder.customerName,
									" (",
									activeLiveOrder.phone,
									")"
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Dishes: "
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-secondary truncate max-w-md",
									children: activeLiveOrder.items.map((i) => `${i.qty}× ${i.name}`).join(", ")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-primary text-sm",
								children: inr(activeLiveOrder.total)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-[1fr_1.2fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-4 w-4 text-primary" }), " Delivery Milestones"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "space-y-3.5 relative border-l-2 border-primary/30 ml-4 pl-4",
								children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "relative flex items-center justify-between gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `absolute -left-[27px] grid h-7 w-7 place-items-center rounded-full text-xs transition-all ${s.done ? "bg-primary text-black font-bold shadow-glow" : s.active ? "bg-emerald-500 text-black font-bold ring-4 ring-emerald-500/30 animate-pulse" : "bg-white/10 text-muted-foreground border border-white/10"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-3.5 w-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `text-sm font-bold ${s.done || s.active ? "text-foreground" : "text-muted-foreground"}`,
											children: s.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground",
											children: s.done ? `Completed · ${s.time}` : s.active ? "In Progress right now" : s.time
										})] }),
										s.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 animate-pulse border border-emerald-500/30",
											children: "LIVE"
										})
									]
								}, i))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-h-[300px] overflow-hidden rounded-3xl border border-white/15 bg-slate-950 p-6 flex flex-col justify-between shadow-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "absolute inset-0 opacity-20 pointer-events-none",
									style: {
										backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 1px, transparent 1px)`,
										backgroundSize: "24px 24px"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 w-48 rounded-full border border-primary/20 animate-ping opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 h-64 w-64 -translate-x-8 -translate-y-8 rounded-full border border-secondary/20 animate-pulse opacity-30" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 p-6 pointer-events-none flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: "w-full h-full",
										viewBox: "0 0 400 200",
										fill: "none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M 50 150 Q 200 40 350 150",
											stroke: "url(#routeGradient)",
											strokeWidth: "4",
											strokeDasharray: "6 6",
											className: "animate-pulse"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "routeGradient",
											x1: "0%",
											y1: "0%",
											x2: "100%",
											y2: "0%",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "0%",
													stopColor: "#f59e0b"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "50%",
													stopColor: "#10b981"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "100%",
													stopColor: "#3b82f6"
												})
											]
										}) })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative z-10 flex justify-between items-center text-xs font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-xl bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 shadow-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "h-3.5 w-3.5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FoodFun Hub" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-xl bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 shadow-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-emerald-400 animate-bounce" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Your Home (",
											activeLiveOrder?.city || "Kalyan",
											")"
										] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative z-10 my-auto text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-block relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 opacity-75 blur-md animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "relative grid h-16 w-16 place-items-center rounded-2xl shadow-glow border border-white/30",
											style: { background: "var(--gradient-sunset)" },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, { className: "h-8 w-8 text-[oklch(0.16_0.03_265)] animate-bounce" })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-base font-black text-white flex items-center justify-center gap-1.5",
												children: [
													activeRider.name,
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-amber-400" })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-emerald-400 font-bold flex items-center justify-center gap-1 mt-0.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation2, { className: "h-3 w-3 animate-spin" }),
													" ",
													activeRider.distance,
													" · Arriving in 14 mins (",
													activeRider.rating,
													")"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[11px] text-slate-400 font-mono mt-0.5",
												children: ["Vehicle: ", activeRider.vehicle]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative z-10 flex gap-2 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										onClick: () => handleCallRider(activeRider.name, activeRider.phone),
										className: "flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs h-9 cursor-pointer shadow-glow",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { className: "mr-1.5 h-3.5 w-3.5" }),
											" Call Rider (",
											activeRider.name.split(" ")[0],
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => handleShareGps(activeRider.name, activeLiveOrder?.id),
										className: "rounded-xl border border-white/15 bg-white/10 text-white hover:bg-white/20 text-xs h-9 cursor-pointer",
										children: "Share GPS Track"
									})]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-xl font-black text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5 text-primary" }), " Order History"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "Track live deliveries and view past completed orders"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setStatusFilter("all"),
								className: `rounded-full px-3 py-1 font-bold transition-all cursor-pointer ${statusFilter === "all" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-white"}`,
								children: [
									"All Orders (",
									realOrders.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStatusFilter("on-the-way"),
								className: `rounded-full px-3 py-1 font-bold transition-all cursor-pointer ${statusFilter === "on-the-way" ? "bg-amber-500 text-black shadow-sm" : "text-muted-foreground hover:text-white"}`,
								children: "On the Way 🟡"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStatusFilter("delivered"),
								className: `rounded-full px-3 py-1 font-bold transition-all cursor-pointer ${statusFilter === "delivered" ? "bg-emerald-500 text-black shadow-sm" : "text-muted-foreground hover:text-white"}`,
								children: "Delivered 🟢"
							})
						]
					})]
				}),
				realOrders.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 mb-6",
					children: realOrders.filter((order, idx) => {
						const effectiveStatus = statusOverrides[order.id] || (idx === 0 ? "On the way" : "Delivered");
						if (statusFilter === "on-the-way") return effectiveStatus === "On the way";
						if (statusFilter === "delivered") return effectiveStatus === "Delivered";
						return true;
					}).map((order, idx) => {
						const assignedRider = getRiderForOrder(order.id);
						const isDelivered = (statusOverrides[order.id] || (idx === 0 ? "On the way" : "Delivered")) === "Delivered";
						const durationMins = 18 + (order.id.charCodeAt(order.id.length - 1) || 5) % 8 * 2;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `glass-strong rounded-3xl p-5 border transition-all space-y-4 ${isDelivered ? "border-emerald-500/25 bg-emerald-950/10" : "border-amber-500/35 shadow-glow bg-amber-950/10"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-bold text-foreground",
											children: ["#", order.id]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wide flex items-center gap-1 ${isDelivered ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse"}`,
											children: isDelivered ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3 text-emerald-400" }), " Delivered"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, { className: "h-3 w-3 text-amber-400 animate-bounce" }), " On the way"] })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground flex items-center gap-2 mt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-primary" }),
											" ",
											order.date,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-secondary" }),
											" ",
											order.address
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-base font-black text-primary",
											children: inr(order.total)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground",
											children: order.paymentMethod
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-2xl p-3 border flex flex-wrap items-center justify-between gap-2 text-xs font-semibold ${isDelivered ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-amber-500/10 border-amber-500/20 text-amber-300"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery Status: " }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-white",
												children: isDelivered ? `Delivered in ${durationMins} mins` : "Out for Delivery · Est. 14 mins"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "opacity-75 ml-1.5",
												children: [
													"(",
													order.date,
													")"
												]
											})
										] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold opacity-80",
										children: isDelivered ? "Order Completed ✅" : "Rider Approaching 🛵"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-white/5 p-2.5 border border-white/10 flex items-center justify-between gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, { className: "h-4 w-4 text-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Assigned Rider: "
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: assignedRider.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground ml-1.5",
												children: [
													"(",
													assignedRider.vehicle,
													")"
												]
											})
										] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => handleCallRider(assignedRider.name, assignedRider.phone),
										className: "h-7 px-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold hover:bg-emerald-500/20 cursor-pointer",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { className: "mr-1 h-3 w-3" }),
											" Call ",
											assignedRider.name.split(" ")[0]
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Ordered Items:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-2 sm:grid-cols-2",
										children: order.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 rounded-xl bg-white/5 p-2.5 border border-white/5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: item.image,
													alt: item.name,
													className: "h-10 w-10 rounded-lg object-cover"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs font-bold text-foreground truncate",
														children: item.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-[11px] text-muted-foreground",
														children: [
															item.qty,
															" × ",
															inr(item.price)
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs font-bold text-primary",
													children: inr(item.qty * item.price)
												})
											]
										}, item.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-end gap-2 border-t border-white/10 pt-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => setSelectedInvoice(order),
											className: "h-8 rounded-xl border border-white/10 text-xs font-semibold hover:bg-white/10 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-1.5 h-3.5 w-3.5 text-primary" }), " Tax Invoice PDF"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => openRatingModal("FoodFusion Kitchen", order.items[0]?.image || ""),
											className: "h-8 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "mr-1.5 h-3.5 w-3.5 fill-amber-400" }), " Rate 5 Stars"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											onClick: () => handleRepeatPlacedOrder(order.items),
											className: "h-8 rounded-xl text-xs font-bold shadow-glow cursor-pointer",
											style: {
												background: "var(--gradient-sunset)",
												color: "oklch(0.16 0.03 265)"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-1.5 h-3.5 w-3.5" }), " Repeat Order"]
										})
									]
								})
							]
						}, order.id);
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong rounded-3xl p-8 text-center border border-white/10 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-foreground",
							children: "No Placed Orders Yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground max-w-sm mx-auto",
							children: "You haven't placed any food orders under this account yet. Browse our menu and place a delicious order!"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 pt-4 border-t border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
						children: "Sample Past Deliveries"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: restaurants.slice(0, 2).map((r, idx) => {
							const demoRider = RIDERS[idx % RIDERS.length];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: r.image,
										alt: r.name,
										className: "h-12 w-12 rounded-xl object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-sm text-foreground",
										children: r.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											"Rider: ",
											demoRider.name,
											" (",
											demoRider.rating,
											")"
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => handleRepeatMockOrder(r.name),
									className: "rounded-xl text-xs font-bold shadow-glow cursor-pointer shrink-0",
									style: {
										background: "var(--gradient-sunset)",
										color: "oklch(0.16 0.03 265)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "mr-1 h-3 w-3" }), " Reorder"]
								})]
							}, r.id);
						})
					})]
				})
			] }),
			selectedInvoice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong relative w-full max-w-lg rounded-3xl border border-white/15 p-6 shadow-2xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-white/10 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-bold text-foreground text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tax Invoice PDF" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400",
										children: "PAID"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedInvoice(null),
								className: "rounded-full p-1 text-muted-foreground hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-white text-black p-5 space-y-3 text-xs shadow-inner",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-b pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-black text-sm text-black uppercase tracking-wider",
											children: "Online Food Ordering"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-gray-600",
											children: "Kalyan West, Maharashtra - 421306"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-gray-600",
											children: "GSTIN: 27AAAAA0000A1Z5"
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-bold text-black",
											children: ["INVOICE #", selectedInvoice.id]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-gray-500",
											children: selectedInvoice.date
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-gray-700 uppercase text-[10px]",
										children: "Billed To:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-black",
										children: selectedInvoice.customerName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-gray-600",
										children: selectedInvoice.address
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-b py-2 space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between font-bold text-gray-500 text-[10px] uppercase",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Qty × Price" })]
									}), selectedInvoice.items.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											i.qty,
											" × ₹",
											i.price
										] })]
									}, idx))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 text-right text-gray-700",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", selectedInvoice.subtotal] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GST (5%):" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", selectedInvoice.gst] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", selectedInvoice.delivery] })]
										}),
										selectedInvoice.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-emerald-600 font-bold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Discount:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["-₹", selectedInvoice.discount] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between font-black text-sm text-black border-t pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grand Total:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", selectedInvoice.total] })]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-3 pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: handlePrintInvoice,
								className: "flex-1 h-11 rounded-xl text-xs font-bold shadow-glow cursor-pointer",
								style: {
									background: "var(--gradient-sunset)",
									color: "oklch(0.16 0.03 265)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "mr-2 h-4 w-4" }), " Print / Save PDF Invoice"]
							})
						})
					]
				})
			}),
			selectedRating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 shadow-2xl text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedRating(null),
							className: "absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: selectedRating.image,
							alt: selectedRating.restaurantName,
							className: "mx-auto h-16 w-16 rounded-2xl object-cover shadow-glow"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-black text-foreground",
							children: selectedRating.restaurantName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "How was your food & delivery experience?"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center gap-2 py-2",
							children: [
								1,
								2,
								3,
								4,
								5
							].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setStarCount(star),
								onMouseEnter: () => setHoverStar(star),
								onMouseLeave: () => setHoverStar(0),
								className: "transition-transform hover:scale-125 cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-8 w-8 ${(hoverStar || starCount) >= star ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" : "text-white/20"}` })
							}, star))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap justify-center gap-1.5 text-xs",
							children: [
								"Tasty Food",
								"Fast Delivery",
								"Hot & Fresh",
								"Good Packaging",
								"Great Portion"
							].map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleTag(tag),
								className: `rounded-full px-3 py-1 text-[11px] font-semibold border transition-all ${selectedTags.includes(tag) ? "border-primary bg-primary/20 text-primary shadow-glow" : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"}`,
								children: tag
							}, tag))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: feedbackText,
							onChange: (e) => setFeedbackText(e.target.value),
							placeholder: "Write a comment about your order (optional)...",
							className: "rounded-xl border-white/10 bg-white/5 text-xs min-h-[70px]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleSubmitRating,
							className: "w-full h-11 rounded-xl text-xs font-bold shadow-glow cursor-pointer",
							style: {
								background: "var(--gradient-sunset)",
								color: "oklch(0.16 0.03 265)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-2 h-4 w-4" }), " Submit Review"]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Orders as component };
