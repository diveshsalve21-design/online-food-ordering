import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as useCart, r as inr } from "./cart-qRuWGf-q.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { B as MapPin, C as Search, F as PartyPopper, J as Flame, K as Heart, _ as Star, a as Wallet, at as ChevronRight, et as Copy, i as X, nt as CircleQuestionMark, p as Timer, q as Gift, r as Zap, rt as CircleCheck, s as Users, tt as Clock, u as Trophy, v as Sparkles, w as RotateCw, z as Mic } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as dishes, o as getRestaurantImageFallback, r as getFoodImageFallback, s as restaurants, t as categories } from "./data-C9guypz_.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
import { n as VegDot } from "./app-shell-BaaGiUhA.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BWg5CuFf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_food_default = "/assets/hero-food-CpSWeeui.jpg";
function Home() {
	const [mode, setMode] = (0, import_react.useState)("all");
	const filteredRestaurants = (0, import_react.useMemo)(() => restaurants.filter((r) => mode === "all" ? true : mode === "veg" ? r.veg : !r.veg), [mode]);
	const filteredDishes = (0, import_react.useMemo)(() => dishes.filter((d) => mode === "all" ? true : mode === "veg" ? d.veg : !d.veg).slice(0, 6), [mode]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 pb-12 sm:px-6 space-y-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickCategories, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {
				mode,
				setMode
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedRestaurants, { list: filteredRestaurants }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recommendations, { list: filteredDishes }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MealPlanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OffersRow, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardsSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngagementRow, {})
		]
	});
}
function Hero() {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) navigate({
			to: "/menu",
			search: { q: searchQuery }
		});
		else navigate({ to: "/menu" });
	};
	const handleVoiceSearch = () => {
		toast.info("Listening for voice search...", { description: "Say a dish like 'Biryani' or 'Pizza'" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative mt-6 overflow-hidden rounded-[28px] border border-white/10 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_food_default,
				alt: "A vibrant flatlay of biryani, pizza, burgers and Indian street food",
				className: "absolute inset-0 h-full w-full object-cover",
				width: 1600,
				height: 1200
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-tr from-background via-background/70 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid gap-8 p-6 sm:p-10 md:grid-cols-2 md:p-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "New · AI Smart Meal Planner" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 text-4xl leading-[1.05] font-black sm:text-5xl md:text-6xl text-foreground",
							children: [
								"Crave it. ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gradient-text",
									children: "Fusion"
								}),
								" delivers it."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-base text-muted-foreground",
							children: "From wood-fired pizzas to Hyderabadi biryani — 40,000+ dishes across India, delivered in 30 minutes flat."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSearchSubmit,
							className: "glass-strong mt-6 grid gap-2 rounded-2xl p-2 sm:grid-cols-[auto_1fr_auto]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), " Kalyan, MH"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 rounded-xl bg-white/5 px-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: searchQuery,
											onChange: (e) => setSearchQuery(e.target.value),
											placeholder: "Search dishes or restaurants…",
											className: "h-10 border-0 bg-transparent focus-visible:ring-0 text-sm"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleVoiceSearch,
											className: "grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-primary transition-colors cursor-pointer",
											"aria-label": "Voice search",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-4 w-4" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "h-12 rounded-xl px-5 text-base font-semibold shadow-glow cursor-pointer",
									style: {
										background: "var(--gradient-sunset)",
										color: "oklch(0.16 0.03 265)"
									},
									children: "Order Now"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground",
							children: [
								"30-min delivery",
								"Live tracking",
								"GST included",
								"UPI · Cards · COD"
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full glass px-3 py-1",
								children: t
							}, t))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingStat, {})
				})]
			})
		]
	});
}
function FloatingStat() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full min-h-[320px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onClick: () => navigate({ to: "/orders" }),
				className: "glass-strong absolute right-0 top-2 w-64 cursor-pointer rounded-2xl p-4 transition-transform hover:scale-105 border border-white/10",
				style: { animation: "float-y 6s ease-in-out infinite" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 place-items-center rounded-xl",
						style: { background: "var(--gradient-royal)" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Live now"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold text-foreground",
						children: "3,214 orders being prepared"
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onClick: () => navigate({ to: "/rewards" }),
				className: "glass-strong absolute bottom-0 right-24 w-72 cursor-pointer rounded-2xl p-4 transition-transform hover:scale-105 border border-white/10",
				style: { animation: "float-y 7s ease-in-out infinite 0.6s" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 place-items-center rounded-xl",
						style: { background: "linear-gradient(135deg, var(--veg), oklch(0.55 0.15 155))" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Your rewards"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"You have ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-secondary",
								children: "340"
							}),
							" pts · ₹150 off unlocked"
						]
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onClick: () => navigate({ to: "/rewards" }),
				className: "glass-strong absolute right-40 top-24 w-56 cursor-pointer rounded-2xl p-4 transition-transform hover:scale-105 border border-white/10",
				style: { animation: "float-y 5s ease-in-out infinite 0.3s" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-6 w-6 text-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Daily spin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold text-foreground",
						children: "1 free spin available"
					})] })]
				})
			})
		]
	});
}
function SectionHead({ title, sub, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl font-black sm:text-3xl text-foreground",
			children: title
		}), sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: sub
		})] }), action]
	});
}
function QuickCategories() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
		title: "What are you craving?",
		sub: "Browse by category"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3",
		children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => navigate({
				to: "/menu",
				search: { cat: c.key }
			}),
			className: "card-lift card-lift-hover glass-strong group flex flex-col items-center justify-center p-3.5 h-36 w-32 shrink-0 snap-start rounded-3xl text-center cursor-pointer border border-white/15 transition-all hover:border-primary/50 shadow-glow",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-white/20 shadow-lg transition-transform duration-300 group-hover:scale-110",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: c.image,
					alt: c.label,
					loading: "eager",
					className: "h-full w-full object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2.5 text-xs font-black text-foreground group-hover:text-primary transition-colors",
				children: c.label
			})]
		}, c.key))
	})] });
}
function ModeToggle({ mode, setMode }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-wrap items-center justify-between gap-4 rounded-2xl glass p-4 border border-white/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full",
				style: { background: "linear-gradient(135deg, var(--primary), var(--royal))" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-white" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-semibold text-foreground",
				children: "Browsing mode"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: "Switch instantly between veg & non-veg experiences"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
			value: mode,
			onValueChange: (v) => setMode(v),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "rounded-full bg-white/5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "all",
						className: "rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
						children: "All"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "veg",
						className: "rounded-full data-[state=active]:bg-[color:var(--veg)] data-[state=active]:text-black",
						children: "🥦 Pure Veg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "nonveg",
						className: "rounded-full data-[state=active]:bg-[color:var(--nonveg)] data-[state=active]:text-white",
						children: "🍗 Non-Veg"
					})
				]
			})
		})]
	});
}
function FeaturedRestaurants({ list }) {
	const [favorites, setFavorites] = (0, import_react.useState)({});
	const toggleFav = (id, name, e) => {
		e.stopPropagation();
		setFavorites((prev) => {
			const next = !prev[id];
			if (next) toast.success(`Saved ${name} to your favorites! ❤️`);
			else toast.info(`Removed ${name} from favorites.`);
			return {
				...prev,
				[id]: next
			};
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
		title: "Featured restaurants",
		sub: "Handpicked spots near you",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/menu",
			className: "inline-flex items-center gap-1 text-sm text-primary font-bold",
			children: ["See all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
		children: list.map((r) => {
			const isFav = !!favorites[r.id];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "card-lift card-lift-hover group overflow-hidden rounded-3xl glass border border-white/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[16/10] overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: r.image,
							alt: r.name,
							onError: (event) => {
								event.currentTarget.onerror = null;
								event.currentTarget.src = getRestaurantImageFallback(r.cuisine);
							},
							className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
							loading: "lazy",
							width: 800,
							height: 500
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background/80 via-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "absolute left-3 top-3 rounded-full border-0 text-xs font-semibold",
							style: {
								background: "var(--gradient-sunset)",
								color: "oklch(0.16 0.03 265)"
							},
							children: r.discount
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: (e) => toggleFav(r.id, r.name, e),
							className: `absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass-strong transition-colors cursor-pointer ${isFav ? "text-rose-500 fill-current" : "text-white hover:text-primary"}`,
							"aria-label": "Add to favorites",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 ${isFav ? "fill-current" : ""}` })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-3 left-3 flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-semibold backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block h-2 w-2 rounded-full",
									style: { background: r.veg ? "var(--veg)" : "var(--nonveg)" }
								}), r.veg ? "Pure Veg" : "Non-Veg"]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "truncate text-base font-bold text-foreground",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 truncate text-xs text-muted-foreground",
									children: r.cuisine
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 rounded-full bg-[color:var(--veg)]/15 px-2 py-1 text-xs font-bold text-[color:var(--veg)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-current" }),
									" ",
									r.rating
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center justify-between text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
										r.time,
										" min"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), r.distance]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["from ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: inr(r.price)
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "flex-1 rounded-xl font-bold cursor-pointer",
								style: {
									background: "var(--gradient-sunset)",
									color: "oklch(0.16 0.03 265)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/menu",
									search: { hotel: r.id },
									children: "View Menu"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "ghost",
								onClick: (e) => toggleFav(r.id, r.name, e),
								className: "rounded-xl border border-white/10 cursor-pointer",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `mr-1 h-4 w-4 ${isFav ? "fill-current text-rose-500" : ""}` }),
									" ",
									isFav ? "Saved" : "Save"
								]
							})]
						})
					]
				})]
			}, r.id);
		})
	})] });
}
function Recommendations({ list }) {
	const { add } = useCart();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
		title: "Recommended for you",
		sub: "Curated by AI · based on your taste & the time of day"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
		children: list.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "card-lift card-lift-hover overflow-hidden rounded-3xl glass border border-white/10 flex flex-col justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[16/10] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: d.image,
						alt: d.name,
						onError: (event) => {
							event.currentTarget.onerror = null;
							event.currentTarget.src = getFoodImageFallback(d.category);
						},
						className: "h-full w-full object-cover",
						loading: "lazy",
						width: 800,
						height: 500
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-3 top-3 flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-6 w-6 place-items-center rounded-md bg-black/50 backdrop-blur",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VegDot, { veg: d.veg })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs backdrop-blur",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-3 w-3" }),
							" ",
							d.time,
							"m"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-bold text-foreground",
						children: d.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "whitespace-nowrap text-base font-black text-primary",
						children: inr(d.price)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
					children: d.desc
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 pt-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [d.calories, " kcal"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => add({
							id: d.id,
							name: d.name,
							price: d.price,
							image: d.image,
							veg: d.veg
						}),
						className: "rounded-full px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow cursor-pointer transition-transform active:scale-95",
						style: {
							background: "var(--gradient-sunset)",
							color: "oklch(0.16 0.03 265)"
						},
						children: "Add to cart"
					})]
				})
			})]
		}, d.id))
	})] });
}
function MealPlanner() {
	const { add } = useCart();
	const [people, setPeople] = (0, import_react.useState)(2);
	const [budget, setBudget] = (0, import_react.useState)(500);
	const [veg, setVeg] = (0, import_react.useState)("nonveg");
	const [spice, setSpice] = (0, import_react.useState)(2);
	const plan = (0, import_react.useMemo)(() => {
		const pool = dishes.filter((d) => veg === "veg" ? d.veg : true);
		const picks = [];
		let spent = 0;
		for (const d of pool) if (spent + d.price <= budget && picks.length < people + 1) {
			picks.push(d);
			spent += d.price;
		}
		return {
			picks,
			spent
		};
	}, [
		people,
		budget,
		veg
	]);
	const handleAddPlanToCart = () => {
		if (plan.picks.length === 0) {
			toast.error("No dishes in your current meal plan. Increase budget!");
			return;
		}
		plan.picks.forEach((d) => {
			add({
				id: d.id,
				name: d.name,
				price: d.price,
				image: d.image,
				veg: d.veg
			});
		});
		toast.success(`Meal Plan added to cart! (${plan.picks.length} items)`, { description: `Total plan spend: ${inr(plan.spent)}` });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
		title: "Smart Meal Planner",
		sub: "Tell us the vibe. Our AI plans the perfect table.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			className: "rounded-full",
			style: {
				background: "var(--gradient-royal)",
				color: "white"
			},
			children: "AI · Beta"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 rounded-3xl glass-strong p-6 lg:grid-cols-[1.1fr_1.4fr] border border-white/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
					label: "Number of people",
					children: [
						1,
						2,
						4,
						6
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: people === n,
						onClick: () => setPeople(n),
						children: n
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" }),
					label: "Budget",
					children: [
						200,
						500,
						1e3
					].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: budget === b,
						onClick: () => setBudget(b),
						children: inr(b)
					}, b))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChoiceRow, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4" }),
					label: "Preference",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: veg === "veg",
						onClick: () => setVeg("veg"),
						children: "🥦 Veg"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: veg === "nonveg",
						onClick: () => setVeg("nonveg"),
						children: "🍗 Non-Veg"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs",
						children: "🌶️"
					}),
					label: "Spice level",
					children: [
						1,
						2,
						3,
						4
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: spice === s,
						onClick: () => setSpice(s),
						children: "🌶".repeat(s)
					}, s))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-black/20 p-5 flex flex-col justify-between border border-white/5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground",
					children: "Suggested plan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"Est. spend ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-secondary",
						children: inr(plan.spent)
					}),
					" / ",
					inr(budget)
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [plan.picks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-2 rounded-xl bg-white/5 p-4 text-sm text-muted-foreground",
					children: "Try increasing your budget to unlock more picks."
				}), plan.picks.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 rounded-xl bg-white/5 p-3 border border-white/5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: d.image,
							alt: d.name,
							onError: (event) => {
								event.currentTarget.onerror = null;
								event.currentTarget.src = getFoodImageFallback(d.category);
							},
							className: "h-14 w-14 rounded-lg object-cover",
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VegDot, { veg: d.veg }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-semibold text-foreground",
									children: d.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									d.calories,
									" kcal · ",
									d.time,
									" min"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-bold text-primary",
							children: inr(d.price)
						})
					]
				}, d.id))]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: handleAddPlanToCart,
				disabled: plan.picks.length === 0,
				className: "mt-5 w-full rounded-xl font-bold transition-all shadow-glow cursor-pointer",
				style: {
					background: "var(--gradient-sunset)",
					color: "oklch(0.16 0.03 265)"
				},
				children: "Add plan to cart"
			})]
		})]
	})] });
}
function ChoiceRow({ icon, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-6 w-6 place-items-center rounded-md bg-white/5",
			children: icon
		}), label]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children
	})] });
}
function Chip({ children, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `rounded-full px-4 py-2 text-sm font-medium transition cursor-pointer ${active ? "text-primary-foreground shadow-glow font-bold" : "bg-white/5 text-muted-foreground hover:text-foreground"}`,
		style: active ? {
			background: "var(--gradient-sunset)",
			color: "oklch(0.16 0.03 265)"
		} : void 0,
		children
	});
}
function OffersRow() {
	const navigate = useNavigate();
	const [selectedOffer, setSelectedOffer] = (0, import_react.useState)(null);
	const offers = [
		{
			title: "Flash Deal · Ends in 2h",
			body: "Flat 60% OFF up to ₹120",
			code: "FLASH60",
			grad: "var(--gradient-sunset)"
		},
		{
			title: "Weekend Combo",
			body: "2 Pizzas + Coke @ ₹499",
			code: "WEEKEND",
			grad: "var(--gradient-royal)"
		},
		{
			title: "Festival Feast",
			body: "Free dessert on orders above ₹599",
			code: "MITHAI",
			grad: "linear-gradient(135deg, var(--veg), oklch(0.6 0.18 130))"
		}
	];
	const handleApplyOfferModal = (code) => {
		if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(code);
		toast.success(`Coupon "${code}" copied!`, { description: "Code copied to clipboard and applied at checkout." });
		setSelectedOffer(null);
		navigate({ to: "/menu" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			title: "Special offers",
			sub: "Grab them while they're hot"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: offers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onClick: () => setSelectedOffer({
					title: o.title,
					body: o.body,
					code: o.code
				}),
				className: "card-lift card-lift-hover cursor-pointer overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-glow transition-all active:scale-[0.98]",
				style: { background: o.grad },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold opacity-80",
						children: o.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-2xl font-black leading-tight",
						children: o.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-black/25 px-3 py-1 text-xs font-bold tracking-wider flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }),
								" CODE · ",
								o.code
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })]
					})
				]
			}, o.code))
		}),
		selectedOffer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl text-center space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/30 shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPopper, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-white/10 px-3 py-1 text-xs text-muted-foreground",
						children: selectedOffer.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 text-2xl font-black text-foreground",
						children: selectedOffer.body
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "text-xl font-black tracking-widest text-secondary",
							children: selectedOffer.code
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => handleApplyOfferModal(selectedOffer.code),
							className: "rounded-xl font-bold shadow-glow",
							style: {
								background: "var(--gradient-sunset)",
								color: "oklch(0.16 0.03 265)"
							},
							children: "Copy & Claim"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setSelectedOffer(null),
						className: "w-full text-xs text-muted-foreground",
						children: "Close"
					})
				]
			})
		})
	] });
}
function RewardsSection() {
	const navigate = useNavigate();
	const points = 340;
	const next = 500;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
		title: "FoodFusion Rewards",
		sub: "Every ₹100 spent = 10 points. Redeem for real discounts."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 rounded-3xl glass-strong p-6 lg:grid-cols-[1.2fr_1fr] border border-white/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-16 w-16 place-items-center rounded-2xl shadow-glow",
					style: { background: "var(--gradient-sunset)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
						className: "h-8 w-8 text-[oklch(0.16_0.03_265)]",
						style: { animation: "float-y 3s ease-in-out infinite" }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase text-muted-foreground",
					children: "Current balance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-3xl font-black text-foreground",
					children: [
						points,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base font-semibold text-secondary",
							children: "pts"
						})
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next reward · ₹350 OFF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						points,
						"/",
						next
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: points / next * 100,
					className: "h-2 bg-white/10"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-3 gap-3",
				children: [
					{
						p: 100,
						r: "₹50 OFF"
					},
					{
						p: 250,
						r: "₹150 OFF"
					},
					{
						p: 500,
						r: "₹350 OFF"
					}
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => navigate({ to: "/rewards" }),
					className: "rounded-2xl bg-white/5 p-3 text-center cursor-pointer hover:bg-white/10 transition-colors border border-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [t.p, " pts"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm font-bold text-secondary",
						children: t.r
					})]
				}, t.p))
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-black/25 p-5 flex flex-col justify-between border border-white/5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold text-foreground",
				children: "Recent activity"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-3 text-sm",
				children: [
					{
						t: "Order · Napoli Wood Fire",
						p: "+28 pts"
					},
					{
						t: "Redeemed ₹50 OFF",
						p: "-100 pts"
					},
					{
						t: "Daily spin bonus",
						p: "+15 pts"
					}
				].map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: a.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `font-bold ${a.p.startsWith("+") ? "text-veg" : "text-primary"}`,
						children: a.p
					})]
				}, i))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => navigate({ to: "/rewards" }),
				className: "mt-4 w-full rounded-xl border border-white/10 text-xs font-semibold cursor-pointer",
				children: "View Reward Dashboard"
			})]
		})]
	})] });
}
function EngagementRow() {
	const navigate = useNavigate();
	const [showSpinModal, setShowSpinModal] = (0, import_react.useState)(false);
	const [isSpinning, setIsSpinning] = (0, import_react.useState)(false);
	const [spinResult, setSpinResult] = (0, import_react.useState)(null);
	const [showScratchModal, setShowScratchModal] = (0, import_react.useState)(false);
	const [isScratched, setIsScratched] = (0, import_react.useState)(false);
	const [showQuizModal, setShowQuizModal] = (0, import_react.useState)(false);
	const [quizStep, setQuizStep] = (0, import_react.useState)(0);
	const [quizScore, setQuizScore] = (0, import_react.useState)(0);
	const handleStartSpin = () => {
		setIsSpinning(true);
		setSpinResult(null);
		setTimeout(() => {
			setIsSpinning(false);
			const rewards = [
				"FLAT 60% OFF (Code: SPIN60)",
				"₹50 CASHBACK (Code: SPIN50)",
				"FREE DESSERT (Code: SPINDESSERT)"
			];
			const reward = rewards[Math.floor(Math.random() * rewards.length)];
			setSpinResult(reward);
			toast.success(`🎉 You Won: ${reward}`);
		}, 2500);
	};
	const handleQuizAnswer = (isCorrect) => {
		if (isCorrect) setQuizScore((prev) => prev + 1);
		if (quizStep < 2) setQuizStep((prev) => prev + 1);
		else setQuizStep(3);
	};
	const quizQuestions = [
		{
			q: "1. Which city is famous for Hyderabadi Biryani?",
			options: [
				"Hyderabad",
				"Delhi",
				"Mumbai"
			],
			ans: 0
		},
		{
			q: "2. What is the key cheese used in authentic Margherita Pizza?",
			options: [
				"Cheddar",
				"Mozzarella",
				"Processed Cheese"
			],
			ans: 1
		},
		{
			q: "3. Which spice gives Butter Chicken its signature warm color?",
			options: [
				"Kashmiri Red Chilli",
				"Turmeric",
				"Black Pepper"
			],
			ans: 0
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			title: "Play. Win. Eat.",
			sub: "Spin, scratch and quiz your way to tasty coupons."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-lift card-lift-hover overflow-hidden rounded-3xl glass p-6 flex flex-col justify-between border border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 place-items-center rounded-xl",
							style: {
								background: "conic-gradient(from 0deg, var(--primary), var(--secondary), var(--royal), var(--veg), var(--primary))",
								animation: "spin-slow 8s linear infinite"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 rounded-full bg-[color:var(--surface)]" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-foreground",
							children: "Daily Spin Wheel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "1 free spin today"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Win 5-60% off, ₹30-₹50 coupons, free delivery or double points."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => setShowSpinModal(true),
						className: "mt-4 w-full rounded-xl font-bold shadow-glow cursor-pointer",
						style: {
							background: "var(--gradient-sunset)",
							color: "oklch(0.16 0.03 265)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "mr-1.5 h-4 w-4" }), " Spin now"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-lift card-lift-hover overflow-hidden rounded-3xl p-6 flex flex-col justify-between border border-white/10",
					style: { background: "var(--gradient-royal)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 text-white" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-xl font-black text-white",
							children: "Festival Scratch Cards"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-white/80",
							children: "3 mystery cards waiting. Reveal & redeem coupons instantly."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setShowScratchModal(true),
						variant: "secondary",
						className: "mt-4 w-full rounded-xl font-bold cursor-pointer",
						children: "Scratch now"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-lift card-lift-hover overflow-hidden rounded-3xl glass p-6 flex flex-col justify-between border border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-3xl",
							children: "🧠"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-xl font-black text-foreground",
							children: "Food Quiz"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "3 questions. Score full marks to win a ₹100 coupon."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							setShowQuizModal(true);
							setQuizStep(0);
							setQuizScore(0);
						},
						variant: "ghost",
						className: "mt-4 w-full rounded-xl border border-white/15 font-semibold text-foreground hover:bg-white/10 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "mr-1.5 h-4 w-4 text-primary" }), " Start quiz"]
					})]
				})
			]
		}),
		showSpinModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl text-center space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowSpinModal(false),
						className: "absolute right-4 top-4 text-muted-foreground hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-black text-foreground",
						children: "Daily Fortune Wheel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "Spin the wheel to unlock your daily discount!"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto h-48 w-48 rounded-full border-4 border-amber-400 p-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-full w-full rounded-full transition-all duration-[2500ms] ${isSpinning ? "rotate-[1440deg] ease-out" : ""}`,
							style: { background: "conic-gradient(from 0deg, #f97316 0deg 60deg, #eab308 60deg 120deg, #22c55e 120deg 180deg, #3b82f6 180deg 240deg, #a855f7 240deg 300deg, #ec4899 300deg 360deg)" }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-xs font-black text-amber-400",
								children: isSpinning ? "SPINNING" : "FORTUNE"
							})
						})]
					}),
					spinResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-white/10 p-4 border border-amber-400/40 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyPopper, { className: "mx-auto h-8 w-8 text-amber-400 animate-bounce" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-base font-bold text-foreground",
								children: spinResult
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => {
									setShowSpinModal(false);
									navigate({ to: "/menu" });
								},
								className: "w-full h-10 rounded-xl font-bold shadow-glow",
								style: {
									background: "var(--gradient-sunset)",
									color: "oklch(0.16 0.03 265)"
								},
								children: "Use Coupon Now"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleStartSpin,
						disabled: isSpinning,
						className: "w-full h-12 rounded-xl text-base font-bold shadow-glow",
						style: {
							background: "var(--gradient-sunset)",
							color: "oklch(0.16 0.03 265)"
						},
						children: isSpinning ? "Spinning Wheel..." : "SPIN WHEEL NOW"
					})
				]
			})
		}),
		showScratchModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl text-center space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowScratchModal(false),
						className: "absolute right-4 top-4 text-muted-foreground hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-black text-foreground",
						children: "Diwali Mystery Card"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "Scratch the gold card below to reveal your prize!"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						onClick: () => setIsScratched(true),
						className: `mx-auto h-40 w-full max-w-xs rounded-2xl border-2 border-amber-400 p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isScratched ? "bg-gradient-to-tr from-emerald-900/60 to-slate-900 border-emerald-400" : "bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 shadow-glow"}`,
						children: isScratched ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 animate-in zoom-in-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "mx-auto h-8 w-8 text-emerald-400" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-black text-white",
									children: "FREE DESSERT + ₹50 OFF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-mono text-amber-300",
									children: "CODE: SCRATCHFREE"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-black font-black text-base flex flex-col items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-7 w-7 text-black" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CLICK TO SCRATCH CARD" })]
						})
					}),
					isScratched ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							toast.success("Coupon SCRATCHFREE Applied!");
							setShowScratchModal(false);
							navigate({ to: "/menu" });
						},
						className: "w-full h-11 rounded-xl font-bold shadow-glow",
						style: {
							background: "var(--gradient-sunset)",
							color: "oklch(0.16 0.03 265)"
						},
						children: "Claim & Order Food"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setIsScratched(true),
						variant: "secondary",
						className: "w-full rounded-xl font-bold",
						children: "Reveal Prize"
					})
				]
			})
		}),
		showQuizModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl text-center space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowQuizModal(false),
						className: "absolute right-4 top-4 text-muted-foreground hover:text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold text-foreground",
						children: "Food Master Quiz"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Answer 3 questions to win a ₹100 discount coupon!"
					})] }),
					quizStep < 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs font-bold text-primary",
								children: [
									"Question ",
									quizStep + 1,
									" of 3"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-bold text-foreground",
								children: quizQuestions[quizStep].q
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: quizQuestions[quizStep].options.map((opt, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleQuizAnswer(idx === quizQuestions[quizStep].ans),
									className: "w-full rounded-xl border border-white/10 bg-white/5 p-3 text-left text-xs font-semibold text-foreground hover:border-primary hover:bg-primary/10 transition-all",
									children: opt
								}, opt))
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-12 w-12 text-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xl font-black text-foreground",
								children: "Quiz Complete!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Score: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-secondary",
										children: [quizScore, "/3"]
									}),
									" correct!"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-white/5 p-3 border border-white/10 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-secondary",
									children: "Coupon Won: QUIZ100"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground text-[11px]",
									children: "Flat ₹100 OFF on orders above ₹399"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => {
									toast.success("Coupon QUIZ100 Applied!");
									setShowQuizModal(false);
									navigate({ to: "/menu" });
								},
								className: "w-full h-11 rounded-xl font-bold shadow-glow",
								style: {
									background: "var(--gradient-sunset)",
									color: "oklch(0.16 0.03 265)"
								},
								children: "Use Coupon Now"
							})
						]
					})
				]
			})
		})
	] });
}
//#endregion
export { Home as component };
