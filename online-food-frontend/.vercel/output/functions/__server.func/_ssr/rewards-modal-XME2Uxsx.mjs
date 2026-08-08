import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { E as RefreshCw, J as Flame, et as Copy, i as X, it as CircleAlert, st as Check, u as Trophy, v as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rewards-modal-XME2Uxsx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var PRIZES = [
	{
		id: "lava",
		label: "🎁 FREE Lava Cake",
		wheelText: "🎁 FREE LAVA CAKE",
		code: "SCRATCHFREE",
		minOrder: 199,
		color: "#f59e0b"
	},
	{
		id: "flat100",
		label: "🎟️ Flat ₹100 OFF",
		wheelText: "🎟️ FLAT ₹100 OFF",
		code: "QUIZ100",
		minOrder: 199,
		color: "#10b981"
	},
	{
		id: "flash60",
		label: "⚡ 60% OFF Order",
		wheelText: "⚡ 60% OFF ORDER",
		code: "FLASH60",
		minOrder: 249,
		color: "#ef4444"
	},
	{
		id: "freedel",
		label: "🛵 FREE Delivery",
		wheelText: "🛵 FREE DELIVERY",
		code: "FREEDEL",
		minOrder: 149,
		color: "#3b82f6"
	},
	{
		id: "bogo",
		label: "🍕 BOGO 50% OFF",
		wheelText: "🍕 BOGO 50% OFF",
		code: "BOGO",
		minOrder: 249,
		color: "#8b5cf6"
	},
	{
		id: "bonus",
		label: "💰 ₹50 Bonus Cash",
		wheelText: "💰 ₹50 BONUS CASH",
		code: "FOODFUN50",
		minOrder: 149,
		color: "#ec4899"
	}
];
function RewardsModal({ open, onOpenChange }) {
	const [spinning, setSpinning] = (0, import_react.useState)(false);
	const [rotation, setRotation] = (0, import_react.useState)(0);
	const [wonPrize, setWonPrize] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [spinsLeft, setSpinsLeft] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			const savedSpins = localStorage.getItem("foodfun_spins_count");
			if (savedSpins !== null) setSpinsLeft(parseInt(savedSpins, 10));
			else {
				localStorage.setItem("foodfun_spins_count", "1");
				setSpinsLeft(1);
			}
		}
	}, [open]);
	const handleSpin = () => {
		if (spinning) return;
		if (spinsLeft <= 0) {
			toast.error("⛔ Spin Limit Reached!", { description: "You have used your 1 Daily Spin. Place a food order to unlock +1 Bonus Spin!" });
			return;
		}
		setSpinning(true);
		setWonPrize(null);
		const nextSpins = spinsLeft - 1;
		setSpinsLeft(nextSpins);
		if (typeof window !== "undefined") localStorage.setItem("foodfun_spins_count", nextSpins.toString());
		const prizeIndex = Math.floor(Math.random() * PRIZES.length);
		const targetPrize = PRIZES[prizeIndex];
		const sliceAngle = 360 / PRIZES.length;
		const targetDegree = 1800 + (PRIZES.length - prizeIndex) * sliceAngle - sliceAngle / 2;
		setRotation((prev) => prev + targetDegree);
		setTimeout(() => {
			setSpinning(false);
			setWonPrize(targetPrize);
			toast.success(`Cool! Not bad! 🎉 You won ${targetPrize.label}!`, { description: `Code: "${targetPrize.code}" (Min order ₹${targetPrize.minOrder})` });
		}, 4e3);
	};
	const handleAddBonusSpin = () => {
		const nextSpins = spinsLeft + 1;
		setSpinsLeft(nextSpins);
		if (typeof window !== "undefined") localStorage.setItem("foodfun_spins_count", nextSpins.toString());
		toast.success("🎟️ +1 Bonus Spin Unlocked!", { description: "You have received 1 extra spin credit." });
	};
	const handleCopyCode = (code) => {
		if (typeof navigator !== "undefined" && navigator.clipboard) {
			navigator.clipboard.writeText(code);
			setCopied(true);
			toast.success(`Coupon code "${code}" copied to clipboard!`);
			setTimeout(() => setCopied(false), 2e3);
		}
	};
	const sliceDeg = 360 / PRIZES.length;
	const R = 145;
	const cx = 150;
	const cy = 150;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md border-white/20 bg-[color:var(--surface)] text-foreground rounded-3xl p-6 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "text-xl font-black text-foreground flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-6 w-6 text-amber-400 animate-bounce" }), "FoodFun Spin & Win Rewards!"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2 mt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${spinsLeft > 0 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"}`,
						children: [
							"🎟️ ",
							spinsLeft,
							" Spin",
							spinsLeft === 1 ? "" : "s",
							" Remaining Today"
						]
					}), spinsLeft <= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleAddBonusSpin,
						className: "text-[10px] font-bold text-amber-400 underline hover:text-amber-300 cursor-pointer flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3 w-3" }), " Get Bonus Spin"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col items-center space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-72 w-72 flex items-center justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-3 z-30 h-0 w-0 border-x-8 border-x-transparent border-t-[18px] border-t-amber-400 drop-shadow-xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-4 border-amber-400/50 shadow-glow animate-pulse" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full w-full rounded-full overflow-hidden shadow-2xl border-4 border-amber-400 transition-transform duration-[4000ms] ease-out",
							style: { transform: `rotate(${rotation}deg)` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 300 300",
								className: "h-full w-full",
								children: PRIZES.map((prize, i) => {
									const startAngle = i * sliceDeg - 90;
									const endAngle = (i + 1) * sliceDeg - 90;
									const midAngle = startAngle + sliceDeg / 2;
									const radStart = startAngle * Math.PI / 180;
									const radEnd = endAngle * Math.PI / 180;
									const radMid = midAngle * Math.PI / 180;
									const x1 = cx + R * Math.cos(radStart);
									const y1 = cy + R * Math.sin(radStart);
									const x2 = cx + R * Math.cos(radEnd);
									const y2 = cy + R * Math.sin(radEnd);
									const textR = 92;
									const tx = cx + textR * Math.cos(radMid);
									const ty = cy + textR * Math.sin(radMid);
									const textRotate = midAngle + 90;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: `M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`,
										fill: prize.color,
										stroke: "#1e293b",
										strokeWidth: "2"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: tx,
										y: ty,
										fill: "#ffffff",
										fontSize: "10",
										fontWeight: "900",
										textAnchor: "middle",
										dominantBaseline: "central",
										transform: `rotate(${textRotate}, ${tx}, ${ty})`,
										style: {
											fontFamily: "system-ui, sans-serif",
											letterSpacing: "0.5px",
											filter: "drop-shadow(0px 1.5px 2px rgba(0,0,0,0.8))"
										},
										children: prize.wheelText
									})] }, prize.id);
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleSpin,
							disabled: spinning || spinsLeft <= 0,
							className: "absolute z-20 grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-slate-950 text-xs font-black text-amber-400 shadow-2xl transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
							children: spinning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 animate-spin text-amber-400" }) : spinsLeft > 0 ? "SPIN!" : "0 LEFT"
						})
					]
				}), wonPrize ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center space-y-2 animate-in zoom-in-95",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs font-black text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-amber-400 animate-pulse" }), " Cool! Not Bad! 🌟 Reward Unlocked!"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-black text-white",
							children: wonPrize.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[11px] text-muted-foreground font-medium",
							children: ["Valid on minimum food order of ₹", wonPrize.minOrder]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-500/30",
								children: wonPrize.code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => handleCopyCode(wonPrize.code),
								className: "h-8 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/10",
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), copied ? "Copied" : "Copy"]
							})]
						})
					]
				}) : spinsLeft <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-center text-xs text-amber-300 font-semibold flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), "Daily spin limit reached! Place an order or click \"Get Bonus Spin\"."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleSpin,
					disabled: spinning || spinsLeft <= 0,
					className: "w-full h-12 rounded-2xl font-black text-sm shadow-glow cursor-pointer disabled:opacity-50",
					style: {
						background: "var(--gradient-sunset)",
						color: "oklch(0.16 0.03 265)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "mr-2 h-5 w-5" }),
						" Spin Fortune Wheel (",
						spinsLeft,
						" Left)"
					]
				})]
			})]
		})
	});
}
//#endregion
export { RewardsModal as a, DialogTitle as i, DialogContent as n, DialogHeader as r, Dialog as t };
