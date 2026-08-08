import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as useCart, r as inr } from "./cart-qRuWGf-q.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { B as MapPin, C as Search, J as Flame, M as Plus, T as RotateCcw, _ as Star, b as ShoppingBag, i as X, lt as Building2, n as ZoomIn, p as Timer, st as Check, t as ZoomOut } from "../_libs/lucide-react.mjs";
import { n as DialogContent, t as Dialog } from "./rewards-modal-XME2Uxsx.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { a as getRestaurantDishes, i as getRestaurant, n as dishes, r as getFoodImageFallback, s as restaurants, t as categories } from "./data-C9guypz_.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { n as VegDot } from "./app-shell-BaaGiUhA.mjs";
import { t as Route } from "./menu-BN76RJVP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-RKy2sHnj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImageLightboxModal({ data, onClose }) {
	const { add } = useCart();
	const [zoom, setZoom] = (0, import_react.useState)(1);
	if (!data) return null;
	const handleZoomIn = () => setZoom((z) => Math.min(z + .5, 3));
	const handleZoomOut = () => setZoom((z) => Math.max(z - .5, 1));
	const handleResetZoom = () => setZoom(1);
	const handleAddToCart = () => {
		if (data.dishId && data.price) {
			add({
				id: data.dishId,
				name: data.title,
				price: data.price,
				image: data.src,
				veg: data.veg ?? false,
				restaurantName: data.restaurantName ?? "FoodFun Kitchen"
			});
			toast.success(`Added 1x ${data.title} to cart!`);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!data,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-4xl border-white/20 bg-slate-950/95 text-white p-0 overflow-hidden rounded-3xl shadow-2xl backdrop-blur-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-white/10 p-4 bg-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [data.veg !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `inline-grid h-4 w-4 place-items-center rounded-sm border ${data.veg ? "border-emerald-500 bg-emerald-500/20" : "border-rose-500 bg-rose-500/20"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${data.veg ? "bg-emerald-500" : "bg-rose-500"}` })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-black text-base text-white",
							children: data.title
						}), data.restaurantName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3 text-primary" }),
								" ",
								data.restaurantName
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: handleZoomIn,
								title: "Zoom In",
								className: "h-8 w-8 rounded-full border border-white/10 text-white hover:bg-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: handleZoomOut,
								title: "Zoom Out",
								className: "h-8 w-8 rounded-full border border-white/10 text-white hover:bg-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: handleResetZoom,
								title: "Reset Zoom",
								className: "h-8 w-8 rounded-full border border-white/10 text-white hover:bg-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" })
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-h-[400px] max-h-[70vh] overflow-hidden flex items-center justify-center p-6 bg-black/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: data.src,
						alt: data.title,
						onDoubleClick: handleZoomIn,
						className: "max-h-[60vh] max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-300 cursor-zoom-in",
						style: { transform: `scale(${zoom})` }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-3 right-4 text-[10px] font-semibold text-muted-foreground bg-black/60 px-3 py-1 rounded-full backdrop-blur-md",
						children: [
							"💡 Double-click image to zoom in (",
							Math.round(zoom * 100),
							"%)"
						]
					})]
				}),
				data.price && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-4 border-t border-white/10 bg-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground font-semibold",
						children: "Dish Price"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xl font-black text-primary",
						children: inr(data.price)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleAddToCart,
						className: "h-11 px-6 rounded-xl font-bold shadow-glow cursor-pointer",
						style: {
							background: "var(--gradient-sunset)",
							color: "oklch(0.16 0.03 265)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mr-2 h-4 w-4" }),
							" Add to Cart (",
							inr(data.price),
							")"
						]
					})]
				})
			]
		})
	});
}
function MenuPage() {
	const searchParams = Route.useSearch();
	const hotel = searchParams.hotel;
	const initialCat = searchParams.cat || "all";
	const initialQ = searchParams.q || "";
	const [mode, setMode] = (0, import_react.useState)("all");
	const [cat, setCat] = (0, import_react.useState)(initialCat);
	const [q, setQ] = (0, import_react.useState)(initialQ);
	const { add } = useCart();
	const selectedHotel = getRestaurant(hotel);
	const menuDishes = selectedHotel ? getRestaurantDishes(selectedHotel.id) : dishes;
	const [customizingDish, setCustomizingDish] = (0, import_react.useState)(null);
	const [lightboxData, setLightboxData] = (0, import_react.useState)(null);
	const [portion, setPortion] = (0, import_react.useState)("regular");
	const [addons, setAddons] = (0, import_react.useState)([]);
	const [instructions, setInstructions] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setMode("all");
		if (searchParams.cat) setCat(searchParams.cat);
		if (searchParams.q) setQ(searchParams.q);
	}, [
		hotel,
		searchParams.cat,
		searchParams.q
	]);
	const list = (0, import_react.useMemo)(() => {
		return menuDishes.filter((dish) => {
			if (mode === "veg" && !dish.veg) return false;
			if (mode === "nonveg" && dish.veg) return false;
			if (cat !== "all" && dish.category !== cat) return false;
			return !q || dish.name.toLowerCase().includes(q.toLowerCase());
		});
	}, [
		mode,
		cat,
		q,
		menuDishes
	]);
	const openCustomizeModal = (dish) => {
		setCustomizingDish(dish);
		setPortion("regular");
		setAddons([]);
		setInstructions("");
	};
	const toggleAddon = (addon) => {
		setAddons((prev) => prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]);
	};
	const getCustomizedPrice = () => {
		if (!customizingDish) return 0;
		let base = customizingDish.price;
		if (portion === "medium") base += 50;
		if (portion === "large") base += 90;
		base += addons.length * 35;
		return base;
	};
	const handleAddCustomizedToCart = () => {
		if (!customizingDish) return;
		const finalPrice = getCustomizedPrice();
		const portionText = portion !== "regular" ? ` (${portion.toUpperCase()})` : "";
		const addonText = addons.length > 0 ? ` + ${addons.join(", ")}` : "";
		add({
			id: `${customizingDish.id}-${portion}-${addons.join("-")}`,
			name: `${customizingDish.name}${portionText}${addonText}`,
			price: finalPrice,
			image: customizingDish.image,
			veg: customizingDish.veg
		});
		setCustomizingDish(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-6 border border-white/10 shadow-glow space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" }), " Hotel & Restaurant Menus"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl sm:text-3xl font-black text-foreground",
								children: selectedHotel ? selectedHotel.name : "Explore All Hotel Menus"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs sm:text-sm text-muted-foreground",
								children: selectedHotel ? `${selectedHotel.cuisine} · ${selectedHotel.time} · ${selectedHotel.distance}` : "Select any hotel below to view its exclusive food menu & specials."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [selectedHotel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current" }),
									" ",
									selectedHotel.rating,
									" Rating"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
								value: mode,
								onValueChange: (value) => setMode(value),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
									className: "rounded-full bg-white/5 p-1 border border-white/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "all",
											className: "rounded-full text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-black",
											children: "All"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "veg",
											className: "rounded-full text-xs font-bold data-[state=active]:bg-[color:var(--veg)] data-[state=active]:text-black",
											children: "🥦 Veg"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "nonveg",
											className: "rounded-full text-xs font-bold data-[state=active]:bg-[color:var(--nonveg)] data-[state=active]:text-white",
											children: "🍗 Non-Veg"
										})
									]
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5 text-secondary" }), " Select Hotel to View Menu:"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "no-scrollbar flex gap-2.5 overflow-x-auto pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/menu",
							className: `flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-bold transition-all shrink-0 cursor-pointer ${!selectedHotel ? "border-primary bg-primary/20 text-foreground shadow-glow" : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-6 w-6 place-items-center rounded-full bg-primary/20 text-primary text-[10px] font-black",
								children: "ALL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All Hotels" })]
						}), restaurants.map((r) => {
							const isActive = selectedHotel?.id === r.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/menu",
								search: { hotel: r.id },
								className: `flex items-center gap-2.5 rounded-2xl border px-3.5 py-1.5 text-xs font-semibold transition-all shrink-0 cursor-pointer ${isActive ? "border-primary bg-primary/20 text-foreground shadow-glow" : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: r.image,
										alt: r.name,
										className: "h-7 w-7 rounded-xl object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-foreground leading-none",
										children: r.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-muted-foreground mt-0.5",
										children: r.cuisine.split("·")[0]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-400",
										children: ["★ ", r.rating]
									})
								]
							}, r.id);
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-3 pt-2 border-t border-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-[240px] flex-1 items-center gap-2 rounded-2xl bg-white/5 px-3.5 border border-white/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: q,
									onChange: (event) => setQ(event.target.value),
									placeholder: selectedHotel ? `Search inside ${selectedHotel.name} menu...` : "Search dishes across all hotels...",
									className: "h-10 border-0 bg-transparent focus-visible:ring-0 text-xs text-foreground placeholder:text-muted-foreground/60"
								}),
								q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQ(""),
									className: "text-xs text-muted-foreground hover:text-white",
									children: "✕"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar flex gap-2 overflow-x-auto pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryChip, {
					label: "All Items",
					active: cat === "all",
					onClick: () => setCat("all")
				}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryChip, {
					label: `${c.emoji} ${c.label}`,
					active: cat === c.key,
					onClick: () => setCat(c.key)
				}, c.key))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-black text-foreground",
					children: [
						selectedHotel ? `${selectedHotel.name} Menu Items` : "Available Dishes",
						" (",
						list.length,
						")"
					]
				}), selectedHotel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/menu",
					className: "text-xs font-bold text-primary hover:underline",
					children: "← View All Hotels"
				})]
			}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-12 text-center border border-white/10 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-foreground",
						children: "No dishes found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Try clearing filters or search for another dish name."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							setCat("all");
							setMode("all");
							setQ("");
						},
						variant: "ghost",
						className: "rounded-xl border border-white/10 text-xs font-bold",
						children: "Reset Filters"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((dish) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DishCard, {
					dish,
					onAdd: () => add({
						id: dish.id,
						name: dish.name,
						price: dish.price,
						image: dish.image,
						veg: dish.veg
					}),
					onCustomize: () => openCustomizeModal(dish),
					onPreviewImage: () => setLightboxData({
						src: dish.image,
						title: dish.name,
						price: dish.price,
						restaurantName: getRestaurant(dish.restaurantId)?.name,
						veg: dish.veg,
						dishId: dish.id
					})
				}, dish.id))
			})] }),
			customizingDish && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 sm:p-6 animate-in fade-in-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong relative w-full max-w-xl md:max-w-2xl rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-white/10 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: customizingDish.image,
									alt: customizingDish.name,
									className: "h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-white/20 shadow-md"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VegDot, { veg: customizingDish.veg }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
											children: customizingDish.veg ? "Pure Veg" : "Non-Veg"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg sm:text-xl font-black text-foreground mt-0.5",
										children: customizingDish.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground line-clamp-1 mt-0.5",
										children: customizingDish.desc
									})
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCustomizingDish(null),
								className: "rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-white transition-colors cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-black uppercase tracking-wider text-primary",
								children: "1. Select Portion Size"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-3",
								children: [
									{
										key: "regular",
										label: "Regular",
										extra: 0,
										sub: "Base Portion"
									},
									{
										key: "medium",
										label: "Medium",
										extra: 50,
										sub: "+50% Extra"
									},
									{
										key: "large",
										label: "Large",
										extra: 90,
										sub: "+100% Jumbo"
									}
								].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setPortion(p.key),
									className: `rounded-2xl border p-3.5 text-center transition-all cursor-pointer ${portion === p.key ? "border-primary bg-primary/20 text-primary shadow-glow ring-2 ring-primary/40" : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-bold text-foreground",
											children: p.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-semibold text-primary mt-0.5",
											children: p.extra > 0 ? `+${inr(p.extra)}` : "Base price"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground mt-0.5",
											children: p.sub
										})
									]
								}, p.key))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-black uppercase tracking-wider text-secondary",
								children: "2. Add Extra Toppings (+₹35 each)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [
									"Extra Cheese",
									"Spicy Jalapenos",
									"Garlic Butter",
									"Paneer Cubes"
								].map((addon) => {
									const isChecked = addons.includes(addon);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => toggleAddon(addon),
										className: `flex items-center justify-between rounded-2xl border p-3.5 text-left font-bold text-sm transition-all cursor-pointer ${isChecked ? "border-secondary bg-secondary/20 text-secondary shadow-glow ring-2 ring-secondary/40" : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: addon }), isChecked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5 text-secondary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 opacity-60" })]
									}, addon);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-muted-foreground",
								children: "3. Special Cooking Instructions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: instructions,
								onChange: (e) => setInstructions(e.target.value),
								placeholder: "E.g. Make it extra spicy, less oil, no onion...",
								className: "rounded-2xl border-white/10 bg-white/5 text-sm p-3.5 min-h-[75px]"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: handleAddCustomizedToCart,
							className: "w-full h-13 rounded-2xl text-base font-black shadow-glow cursor-pointer transition-transform active:scale-98",
							style: {
								background: "var(--gradient-sunset)",
								color: "oklch(0.16 0.03 265)"
							},
							children: [
								"Add Customized Dish (",
								inr(getCustomizedPrice()),
								")"
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageLightboxModal, {
				data: lightboxData,
				onClose: () => setLightboxData(null)
			})
		]
	});
}
function CategoryChip({ label, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: `rounded-full px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 cursor-pointer border ${active ? "border-primary bg-primary text-black shadow-glow" : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`,
		children: label
	});
}
function DishCard({ dish, onAdd, onCustomize, onPreviewImage }) {
	const restaurant = getRestaurant(dish.restaurantId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-3xl p-4 border border-white/10 flex flex-col justify-between space-y-3 transition-all hover:scale-[1.01] hover:border-white/20 shadow-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-2xl h-44 border border-white/10 group",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: dish.image,
						alt: dish.name,
						onDoubleClick: onPreviewImage,
						onError: (e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src = getFoodImageFallback(dish.category);
						},
						className: "h-full w-full object-cover transition-transform duration-500 hover:scale-105 cursor-zoom-in",
						loading: "lazy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VegDot, { veg: dish.veg }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dish.veg ? "Pure Veg" : "Non-Veg" })]
					}),
					onPreviewImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onPreviewImage,
						title: "Double-click image or click to zoom",
						className: "absolute top-2.5 right-2.5 rounded-full bg-black/60 backdrop-blur-md p-1.5 text-white border border-white/20 hover:bg-black/80 transition-colors cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "h-3.5 w-3.5 text-amber-400" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-2.5 right-2.5 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-muted-foreground border border-white/10 flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-3 w-3 text-primary" }),
							" ",
							dish.time,
							" min"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-black text-base text-foreground leading-tight",
						children: dish.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-black text-base text-primary shrink-0",
						children: inr(dish.price)
					})]
				}),
				restaurant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[11px] font-semibold text-secondary mt-0.5",
					children: ["by ", restaurant.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground line-clamp-2 mt-1",
					children: dish.desc
				})
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2 pt-2 border-t border-white/10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				onClick: onCustomize,
				className: "flex-1 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/10 cursor-pointer",
				children: "Customize"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: onAdd,
				className: "flex-1 rounded-xl text-xs font-bold shadow-glow cursor-pointer",
				style: {
					background: "var(--gradient-sunset)",
					color: "oklch(0.16 0.03 265)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-3.5 w-3.5" }), " Add to Cart"]
			})]
		})]
	});
}
//#endregion
export { MenuPage as component };
