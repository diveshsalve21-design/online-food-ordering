import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { et as Copy, q as Gift, st as Check, v as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Progress } from "./progress-Crx1Tb8I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rewards-B_KsaTWd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Rewards() {
	const [points, setPoints] = (0, import_react.useState)(340);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleRedeem = (requiredPts, rewardText) => {
		if (points < requiredPts) {
			toast.error(`You need ${requiredPts - points} more points to redeem ${rewardText}!`);
			return;
		}
		setPoints((prev) => prev - requiredPts);
		toast.success(`Redeemed ${rewardText}! ${requiredPts} points deducted.`);
	};
	const handleCopyReferral = () => {
		if (typeof navigator !== "undefined" && navigator.clipboard) {
			navigator.clipboard.writeText("FOODFUN100");
			setCopied(true);
			toast.success("Referral Code 'FOODFUN100' copied to clipboard!");
			setTimeout(() => setCopied(false), 2e3);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-strong overflow-hidden rounded-3xl p-6 border border-white/10 shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-20 w-20 place-items-center rounded-2xl shadow-glow shrink-0",
						style: { background: "var(--gradient-sunset)" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
							className: "h-9 w-9 text-[oklch(0.16_0.03_265)]",
							style: { animation: "float-y 3s ease-in-out infinite" }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-bold uppercase tracking-wider text-primary",
							children: "FoodFun Rewards"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-4xl font-black text-foreground",
							children: [
								points,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg font-semibold text-secondary",
									children: "pts"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Every ₹100 spent = 10 pts"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto max-w-sm flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next Reward: ₹350 OFF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [points, "/500"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: Math.min(points / 500 * 100, 100),
							className: "h-2.5 bg-white/10"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
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
					className: "rounded-2xl border border-white/10 bg-white/5 p-4 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [t.p, " pts required"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xl font-bold text-secondary",
							children: t.r
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => handleRedeem(t.p, t.r),
							disabled: points < t.p,
							className: "mt-3 w-full rounded-xl font-bold transition-all shadow-glow disabled:opacity-40",
							style: {
								background: "var(--gradient-sunset)",
								color: "oklch(0.16 0.03 265)"
							},
							children: points >= t.p ? "Redeem Now" : "Need More Pts"
						})
					]
				}, t.p))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6 border border-white/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-base font-bold text-foreground mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), "Reward History"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2.5 text-sm",
					children: [
						{
							t: "+28 pts · Napoli Wood Fire",
							d: "Yesterday"
						},
						{
							t: "-100 pts · Redeemed ₹50 OFF",
							d: "3 days ago"
						},
						{
							t: "+15 pts · Daily spin bonus",
							d: "5 days ago"
						},
						{
							t: "+42 pts · Spice Route Kitchen",
							d: "1 week ago"
						}
					].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-xl bg-white/5 px-4 py-2.5 text-xs text-muted-foreground border border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: x.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] opacity-70",
							children: x.d
						})]
					}, x.t))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6 border border-white/10 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-bold text-foreground",
					children: "Refer & Earn ₹100"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Invite your friends to FoodFusion. You both get ₹100 credited when they place their first order."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 p-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "text-base font-black tracking-wider text-secondary",
						children: "AARAV100"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: handleCopyReferral,
						className: "rounded-xl px-4 text-xs font-bold",
						style: {
							background: "var(--gradient-sunset)",
							color: "oklch(0.16 0.03 265)"
						},
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4 mr-1" }), copied ? "Copied" : "Copy Code"]
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { Rewards as component };
