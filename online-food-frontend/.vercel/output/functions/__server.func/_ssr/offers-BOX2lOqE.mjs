import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { at as ChevronRight, et as Copy, h as Tag } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offers-BOX2lOqE.js
var import_jsx_runtime = require_jsx_runtime();
var offers = [
	{
		t: "Flash Deals",
		d: "Up to 60% OFF · ends tonight",
		g: "var(--gradient-sunset)",
		code: "FLASH60"
	},
	{
		t: "Today's Special",
		d: "Chef's tasting menu at ₹399",
		g: "var(--gradient-royal)",
		code: "CHEF399"
	},
	{
		t: "Buy 1 Get 1",
		d: "On all wood-fired pizzas",
		g: "linear-gradient(135deg, var(--veg), oklch(0.6 0.18 130))",
		code: "BOGO"
	},
	{
		t: "Weekend Combo",
		d: "2 mains + drink @ ₹499",
		g: "linear-gradient(135deg, oklch(0.55 0.22 300), oklch(0.72 0.19 45))",
		code: "WEEKEND"
	},
	{
		t: "Festival Feast",
		d: "Free dessert above ₹599",
		g: "linear-gradient(135deg, var(--gold), var(--primary))",
		code: "MITHAI"
	},
	{
		t: "Refer & Earn",
		d: "₹100 for you + friend",
		g: "var(--gradient-royal)",
		code: "REFER100"
	}
];
function Offers() {
	const navigate = useNavigate();
	const handleApplyOffer = (code) => {
		if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(code);
		toast.success(`Coupon "${code}" copied to clipboard!`, {
			description: "Use it at checkout for instant discount.",
			action: {
				label: "Go to Menu",
				onClick: () => navigate({ to: "/menu" })
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-10 w-10 place-items-center rounded-2xl shadow-glow",
				style: { background: "var(--gradient-sunset)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-5 w-5 text-[oklch(0.16_0.03_265)]" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-black",
				children: "All Offers & Coupons"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Click any card to copy code and claim your discount."
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
			children: offers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onClick: () => handleApplyOffer(o.code),
				className: "card-lift card-lift-hover cursor-pointer overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-glow transition-all active:scale-[0.98]",
				style: { background: o.g },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase tracking-wider opacity-90",
						children: o.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-2xl font-black leading-tight",
						children: o.d
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3.5 py-1.5 text-xs font-bold tracking-wider backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), o.code]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center text-xs font-bold gap-1 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur hover:bg-white/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Claim" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
						})]
					})
				]
			}, o.code))
		})]
	});
}
//#endregion
export { Offers as component };
