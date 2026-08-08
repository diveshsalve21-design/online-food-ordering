import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getCurrentUser } from "./login-CAyqzBQd.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { B as MapPin, H as LogOut, K as Heart, m as Ticket, q as Gift } from "../_libs/lucide-react.mjs";
import { s as restaurants } from "./data-C9guypz_.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-Cg_Uoo1f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Profile() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setCurrentUser(getCurrentUser());
	}, []);
	const handleApplyCoupon = (code, desc) => {
		toast.success(`Coupon ${code} Applied!`, { description: `${desc}. Discount will be reflected at checkout.` });
	};
	const handleLogout = () => {
		if (typeof window !== "undefined") localStorage.removeItem("online_food_current_user");
		toast.info("Logged out of customer profile.");
		navigate({ to: "/login" });
	};
	const initials = currentUser?.fullName ? currentUser.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "DS";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6 px-4 pb-16 pt-8 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-strong flex flex-wrap items-center gap-6 rounded-3xl p-6 border border-white/10 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-20 w-20 place-items-center rounded-2xl text-2xl font-black shadow-glow",
					style: {
						background: "var(--gradient-sunset)",
						color: "oklch(0.16 0.03 265)"
					},
					children: initials
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-black text-foreground",
						children: currentUser?.fullName || "Divesh Salve"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground",
						children: [
							currentUser?.email || "divesh@fusion.in",
							" · ",
							currentUser?.phone || "+91 98765 43210"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-white/5 px-3 py-1 text-muted-foreground border border-white/5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mr-1 inline h-3 w-3 text-primary" }),
								currentUser?.address || "Station Road",
								", ",
								currentUser?.city || "Kalyan",
								" (",
								currentUser?.pincode || "421306",
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-[color:var(--gold)]/15 px-3 py-1 font-semibold text-secondary border border-[color:var(--gold)]/30",
							children: "Gold Member"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:grid grid-cols-3 gap-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Points",
								value: "340"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Orders",
								value: "82"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Saved",
								value: "₹4.2k"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleLogout,
						variant: "ghost",
						className: "rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-bold text-rose-400 hover:bg-rose-500/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-1.5 h-3.5 w-3.5" }), " Logout"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-4 w-4 text-primary" }),
					title: "Rewards progress",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "160 pts to ₹350 OFF"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: 68,
							className: "mt-2 h-2.5 bg-white/10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								asChild: true,
								className: "w-full rounded-xl text-xs font-bold cursor-pointer",
								style: {
									background: "var(--gradient-sunset)",
									color: "oklch(0.16 0.03 265)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/rewards",
									children: "View All Rewards"
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "h-4 w-4 text-secondary" }),
					title: "Coupon wallet",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coupon, {
							code: "FLASH60",
							desc: "60% off up to ₹120",
							onApply: () => handleApplyCoupon("FLASH60", "60% off up to ₹120")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coupon, {
							code: "FREEDEL",
							desc: "Free delivery on orders above ₹199",
							onApply: () => handleApplyCoupon("FREEDEL", "Free delivery applied")
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 text-destructive" }),
					title: "Favourite restaurants",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: restaurants.slice(0, 3).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl bg-white/5 p-2 text-sm border border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: r.image,
									alt: r.name,
									className: "h-8 w-8 rounded-lg object-cover",
									loading: "lazy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-xs font-semibold text-foreground",
									children: r.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								asChild: true,
								className: "h-7 px-2 rounded-lg text-xs text-primary hover:bg-white/10 cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/menu",
									search: { hotel: r.id },
									children: "Menu"
								})
							})]
						}, r.id))
					})
				})
			]
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-white/5 px-4 py-3 border border-white/5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-lg font-black text-secondary",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-wider text-muted-foreground",
			children: label
		})]
	});
}
function Card({ icon, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-3xl p-5 border border-white/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center gap-2 text-sm font-semibold text-foreground",
			children: [icon, title]
		}), children]
	});
}
function Coupon({ code, desc, onApply }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between rounded-xl border border-dashed border-white/15 bg-white/5 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-bold text-secondary text-sm",
			children: code
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted-foreground",
			children: desc
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onApply,
			className: "text-xs font-bold text-primary hover:underline px-2 py-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer",
			children: "APPLY"
		})]
	});
}
//#endregion
export { Profile as component };
