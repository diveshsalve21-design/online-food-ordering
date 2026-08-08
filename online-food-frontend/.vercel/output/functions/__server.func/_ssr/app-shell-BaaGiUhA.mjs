import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as getCurrentUser } from "./login-CAyqzBQd.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as useCart, n as getStoredOrders, r as inr } from "./cart-qRuWGf-q.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { B as MapPin, D as Receipt, H as LogOut, J as Flame, P as PhoneCall, S as Send, b as ShoppingBag, c as User, dt as Bike, et as Copy, h as Tag, i as X, k as QrCode, l as UserPlus, s as Users, st as Check, u as Trophy, ut as Bot, v as Sparkles } from "../_libs/lucide-react.mjs";
import { a as RewardsModal, i as DialogTitle$1, n as DialogContent$1, r as DialogHeader, t as Dialog$1 } from "./rewards-modal-XME2Uxsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-BaaGiUhA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeliveryChatBot() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [inputText, setInputText] = (0, import_react.useState)("");
	const messagesEndRef = (0, import_react.useRef)(null);
	const activeUser = getCurrentUser();
	const orders = getStoredOrders();
	const activeLiveOrder = orders.length > 0 ? orders[0] : null;
	const [messages, setMessages] = (0, import_react.useState)([{
		id: "1",
		sender: "bot",
		text: `Hello ${activeUser?.fullName ? activeUser.fullName.split(" ")[0] : "there"}! 👋 I am your FoodFun AI Delivery Assistant. How can I help you with your order today?`,
		time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		})
	}]);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	(0, import_react.useEffect)(() => {
		if (open) scrollToBottom();
	}, [messages, open]);
	const addBotMessage = (text, actionButton) => {
		setTimeout(() => {
			setMessages((prev) => [...prev, {
				id: Math.random().toString(),
				sender: "bot",
				text,
				time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				}),
				actionButton
			}]);
		}, 600);
	};
	const handleSend = (userText) => {
		const text = (userText || inputText).trim();
		if (!text) return;
		const userMsg = {
			id: Math.random().toString(),
			sender: "user",
			text,
			time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			})
		};
		setMessages((prev) => [...prev, userMsg]);
		if (!userText) setInputText("");
		const lower = text.toLowerCase();
		if (lower.includes("where") || lower.includes("status") || lower.includes("track") || lower.includes("order")) if (activeLiveOrder) addBotMessage(`🚀 Your order #${activeLiveOrder.id} is ON THE WAY! Assigned rider Naman is approx 1.8 km away and arriving in ~14 mins.`, {
			label: "View Live Map",
			onClick: () => {
				setOpen(false);
				if (typeof window !== "undefined") window.location.href = "/orders";
			}
		});
		else addBotMessage("You don't have any active live delivery in progress right now. Would you like to check our delicious menu?", {
			label: "Explore Menu",
			onClick: () => {
				setOpen(false);
				if (typeof window !== "undefined") window.location.href = "/menu";
			}
		});
		else if (lower.includes("rider") || lower.includes("call") || lower.includes("driver") || lower.includes("naman")) addBotMessage("📞 Your assigned delivery partner is Naman Sharma (+91 98201 44102). Riding Bajaj Pulsar (MH 05 EV 9821). Rating: 4.9 ★", {
			label: "Call Rider Naman",
			onClick: () => {
				toast.info("Calling Delivery Partner Naman (+91 98201 44102)...");
				if (typeof window !== "undefined") window.location.href = "tel:+919820144102";
			}
		});
		else if (lower.includes("coupon") || lower.includes("offer") || lower.includes("discount") || lower.includes("code")) addBotMessage("🎟️ Here are the active working coupons:\n• FLASH60 : 60% OFF up to ₹120\n• QUIZ100 : Flat ₹100 OFF\n• SCRATCHFREE : Free Dessert + ₹50 OFF & Free Delivery!", {
			label: "View All Offers",
			onClick: () => {
				setOpen(false);
				if (typeof window !== "undefined") window.location.href = "/offers";
			}
		});
		else if (lower.includes("invoice") || lower.includes("bill") || lower.includes("receipt") || lower.includes("payment")) addBotMessage("📄 All your tax invoices and Razorpay test mode payment receipts are saved in your Order History. You can view & download PDF invoices anytime!", {
			label: "Order History & Invoices",
			onClick: () => {
				setOpen(false);
				if (typeof window !== "undefined") window.location.href = "/orders";
			}
		});
		else addBotMessage(`Thanks for reaching out! I can help you track your live food order, contact your delivery rider, or find discount coupons. What would you like to do?`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setOpen(true),
		className: "fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full px-4 py-3 text-black font-bold text-sm shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/30",
		style: { background: "var(--gradient-sunset)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "absolute -top-1 -right-1 flex h-2.5 w-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:inline font-black",
			children: "Delivery Support"
		})]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-6 right-6 z-50 w-full max-w-[360px] sm:max-w-[390px] overflow-hidden rounded-3xl border border-white/20 bg-slate-950/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3.5 border-b border-white/10",
				style: { background: "var(--gradient-sunset)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 text-black",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-9 w-9 place-items-center rounded-xl bg-black/20 text-black font-bold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-black text-sm tracking-tight flex items-center gap-1.5",
						children: ["Delivery Assistant ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-amber-950" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] font-bold text-black/70 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-700 animate-pulse" }), " Online · Instant Support"]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(false),
					className: "rounded-full p-1.5 text-black/70 hover:bg-black/10 hover:text-black transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-[320px] overflow-y-auto p-4 space-y-3.5 text-xs",
				children: [messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `max-w-[85%] rounded-2xl p-3 leading-relaxed ${m.sender === "user" ? "bg-primary text-black font-semibold rounded-br-none shadow-glow" : "bg-white/10 text-foreground border border-white/10 rounded-bl-none"}`,
						children: [m.text, m.actionButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2.5 pt-2 border-t border-white/15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: m.actionButton.onClick,
								className: "w-full h-8 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-[11px] cursor-pointer",
								children: m.actionButton.label
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] text-muted-foreground mt-1 px-1",
						children: m.time
					})]
				}, m.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-3 py-2 bg-white/5 border-t border-white/10 flex flex-wrap gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleSend("Where is my order?"),
						className: "rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, { className: "h-3 w-3 text-primary" }), " Track Order"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleSend("Contact Delivery Rider"),
						className: "rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { className: "h-3 w-3 text-emerald-400" }), " Call Rider Naman"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleSend("Active Coupons"),
						className: "rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-3 w-3 text-secondary" }), " Coupons"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					handleSend();
				},
				className: "p-3 bg-black/40 border-t border-white/10 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: inputText,
					onChange: (e) => setInputText(e.target.value),
					placeholder: "Ask about live delivery, rider, coupons...",
					className: "h-10 rounded-xl border-white/10 bg-white/5 text-xs text-foreground placeholder:text-muted-foreground/60"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					disabled: !inputText.trim(),
					className: "h-10 w-10 shrink-0 rounded-xl text-black font-bold disabled:opacity-40 cursor-pointer shadow-glow",
					style: { background: "var(--gradient-sunset)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				})]
			})
		]
	})] });
}
function GroupOrderModal({ open, onOpenChange }) {
	const { items, add, subtotal, gst, delivery, total } = useCart();
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [roomCode] = (0, import_react.useState)("FF-ROOM-9821");
	const [members, setMembers] = (0, import_react.useState)([{
		name: "Divesh Salve (Host 👑)",
		itemsCount: items.length > 0 ? items.length : 1,
		amount: subtotal > 0 ? Math.round(subtotal * .6) : 240
	}, {
		name: "Pritesh Kanitkar",
		itemsCount: 1,
		amount: 189
	}]);
	const handleCopyLink = () => {
		const url = typeof window !== "undefined" ? `${window.location.origin}/group?code=${roomCode}` : "http://localhost:8080/group";
		if (typeof navigator !== "undefined" && navigator.clipboard) {
			navigator.clipboard.writeText(url);
			setCopied(true);
			toast.success("Group Room Link copied to clipboard!", { description: "Share this link with friends to let them order from their phones." });
			setTimeout(() => setCopied(false), 2e3);
		}
	};
	const handleSimulateFriendJoin = () => {
		add({
			id: "grill-burger",
			name: "Smoky Chicken Burger",
			price: 289,
			image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=95",
			veg: false,
			restaurantName: "Burger Lab"
		});
		setMembers((prev) => [...prev, {
			name: "Rashmin Oak",
			itemsCount: 1,
			amount: 289
		}]);
		toast.success("Friend Rashmin Oak joined the Group Room!", { description: "Rashmin added 1x Smoky Chicken Burger from Burger Lab." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
			className: "max-w-lg border-white/20 bg-[color:var(--surface)] text-foreground rounded-3xl p-6 shadow-2xl space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle$1, {
						className: "text-xl font-black text-foreground flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6 text-primary" }), "AI Group Order Room & Bill Splitter"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "Order food with friends! Friends scan QR code, add dishes from their phones, and AI splits the bill automatically."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-white p-2 shadow-lg text-slate-900",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-full w-full" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-1.5 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground font-semibold",
								children: "Active Group Room Code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-mono font-black text-primary tracking-wider",
								children: roomCode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: handleCopyLink,
									className: "h-8 rounded-xl border border-white/10 bg-white/10 text-xs font-bold hover:bg-white/20 cursor-pointer",
									children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 h-3.5 w-3.5 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "mr-1 h-3.5 w-3.5 text-primary" }), copied ? "Link Copied" : "Copy Room Link"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: handleSimulateFriendJoin,
									className: "h-8 rounded-xl border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold hover:bg-secondary/20 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "mr-1 h-3.5 w-3.5" }), " + Simulate Friend"]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4 text-emerald-400" }), " Live Member Bill Breakdown"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [members.length, " Members"] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 max-h-48 overflow-y-auto pr-1",
						children: members.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 rounded-2xl bg-white/5 p-3 border border-white/5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/20 text-[10px] font-black text-primary",
									children: m.name.slice(0, 2).toUpperCase()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "truncate min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-foreground truncate",
										children: m.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] text-muted-foreground",
										children: [m.itemsCount, " Item(s) Selected"]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right whitespace-nowrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-black text-emerald-400",
									children: inr(m.amount)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-muted-foreground",
									children: "Individual Share"
								})]
							})]
						}, idx))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-primary/30 bg-primary/10 p-3.5 flex items-center justify-between text-xs font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: "Total Combined Group Cart"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-lg font-black text-primary",
						children: inr(total > 0 ? total : 429)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							onOpenChange(false);
							toast.success("Group Cart updated! Ready for Razorpay single-click split checkout.");
						},
						className: "h-10 rounded-xl text-xs font-bold shadow-glow cursor-pointer",
						style: {
							background: "var(--gradient-sunset)",
							color: "oklch(0.16 0.03 265)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "mr-1.5 h-4 w-4" }), " Proceed to Group Checkout"]
					})]
				})
			]
		})
	});
}
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function AppShell({ children }) {
	const navigate = useNavigate();
	const { count, setOpen } = useCart();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [user, setUser] = (0, import_react.useState)(null);
	const [showRewards, setShowRewards] = (0, import_react.useState)(false);
	const [showGroupRoom, setShowGroupRoom] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setUser(getCurrentUser());
	}, [pathname]);
	const handleLogout = () => {
		if (typeof window !== "undefined") localStorage.removeItem("online_food_current_user");
		setUser(null);
		toast.info("Logged out successfully.");
		navigate({ to: "/login" });
	};
	const nav = [
		{
			to: "/",
			label: "Home"
		},
		{
			to: "/menu",
			label: "Menu"
		},
		{
			to: "/offers",
			label: "Offers"
		},
		{
			to: "/rewards",
			label: "Rewards"
		},
		{
			to: "/orders",
			label: "Orders"
		},
		...!user ? [{
			to: "/login",
			label: "User Login"
		}] : [],
		{
			to: "/hotel/login",
			label: "Hotel Login"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none fixed inset-0 -z-10",
				style: { background: "var(--gradient-mesh)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass border-b border-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-xl shadow-glow",
									style: { background: "var(--gradient-sunset)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-5 w-5 text-[oklch(0.16_0.03_265)]" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xl font-black tracking-tight",
									children: ["Food", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "gradient-text",
										children: "Fun"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-4 hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground md:flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground",
										children: "Kalyan"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "opacity-60",
										children: "· Maharashtra (421 306)"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "ml-auto hidden items-center gap-1 lg:flex",
								children: nav.map((n) => {
									const active = pathname === n.to;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: n.to,
										className: `rounded-full px-3 py-1.5 text-sm transition ${active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`,
										children: n.label
									}, n.to);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex items-center gap-2 lg:ml-2",
								children: [
									user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/profile",
											className: "flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-white/10 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-6 w-6 place-items-center rounded-full text-[10px] font-black",
												style: {
													background: "var(--gradient-sunset)",
													color: "oklch(0.16 0.03 265)"
												},
												children: user.fullName.slice(0, 2).toUpperCase()
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline max-w-[100px] truncate",
												children: user.fullName
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											onClick: handleLogout,
											title: "Logout",
											className: "h-8 w-8 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" })
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "rounded-full text-muted-foreground hover:text-foreground",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/login",
											title: "User Login",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setShowRewards(true),
										title: "Spin & Win Rewards",
										className: "hidden sm:flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition-colors cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-4 w-4 animate-bounce text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Spin & Win" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setShowGroupRoom(true),
										title: "Group Order Room",
										className: "hidden sm:flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition-colors cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Group Order" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setOpen(true),
										className: `relative flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-all duration-300 cursor-pointer ${count > 0 ? "scale-105" : "hover:scale-105"}`,
										style: { background: "var(--gradient-sunset)" },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4 text-[oklch(0.16_0.03_265)]" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline text-[oklch(0.16_0.03_265)] font-black",
												children: "Cart"
											}),
											count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "relative flex h-5 min-w-5 items-center justify-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "relative grid h-5 min-w-5 place-items-center rounded-full bg-background px-1.5 text-xs font-black text-primary shadow-md",
													children: count
												})]
											})
										]
									})
								]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {
				onOpenGroupRoom: () => setShowGroupRoom(true),
				onOpenRewards: () => setShowRewards(true)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeliveryChatBot, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardsModal, {
				open: showRewards,
				onOpenChange: setShowRewards
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupOrderModal, {
				open: showGroupRoom,
				onOpenChange: setShowGroupRoom
			})
		]
	});
}
function CartDrawer({ onOpenGroupRoom, onOpenRewards }) {
	const { items, setQty, remove, subtotal, gst, delivery, deliverySavings, uniqueRestaurants, isMultiRestaurant, total, open, setOpen } = useCart();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-full border-l border-white/10 bg-[color:var(--surface)] text-foreground sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
					className: "flex items-center justify-between text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5 text-primary" }), " Your Cart"]
					}), isMultiRestaurant && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-primary/20 border border-primary/40 px-2.5 py-0.5 text-[10px] font-black text-primary",
						children: "Multi-Hotel Order"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-2",
					children: [onOpenGroupRoom && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setOpen(false);
							onOpenGroupRoom();
						},
						className: "flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition-colors cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5" }), " Group Order"]
					}), onOpenRewards && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setOpen(false);
							onOpenRewards();
						},
						className: "flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 py-1.5 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition-colors cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3.5 w-3.5" }), " Spin & Win"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex h-[calc(100vh-7.5rem)] flex-col",
					children: [
						isMultiRestaurant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400 font-semibold space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between font-bold text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4 text-emerald-400" }), " Multi-Hotel Combo Cart Active!"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 font-bold",
									children: ["Saved ", inr(deliverySavings)]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-muted-foreground",
								children: [
									"Ordering from ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-white",
										children: uniqueRestaurants.join(" + ")
									}),
									" in 1 combined single order!"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-3 overflow-y-auto pr-1",
							children: [items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-24 text-center text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mx-auto mb-3 h-8 w-8 text-primary" }), "Your cart is empty. Add something delicious!"]
							}), items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 rounded-2xl bg-white/5 p-3 border border-white/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: item.name,
									className: "h-16 w-16 rounded-xl object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "truncate font-semibold text-sm text-foreground",
												children: item.name
											}), item.restaurantName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[10px] font-bold text-secondary mt-0.5",
												children: ["📍 ", item.restaurantName]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => remove(item.id),
												className: "text-xs text-muted-foreground hover:text-rose-400",
												children: "✕"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 text-xs font-bold text-primary",
											children: inr(item.price)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1 text-xs border border-white/5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setQty(item.id, item.qty - 1),
														className: "px-1 font-bold hover:text-primary",
														children: "-"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-bold text-foreground",
														children: item.qty
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setQty(item.id, item.qty + 1),
														className: "px-1 font-bold hover:text-primary",
														children: "+"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-bold text-foreground",
												children: inr(item.price * item.qty)
											})]
										})
									]
								})]
							}, item.id))]
						}),
						items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 border-t border-white/10 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inr(subtotal) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GST (5%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inr(gst) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: delivery === 0 ? "FREE" : isMultiRestaurant ? `${inr(delivery)} (Combined)` : inr(delivery) })]
									}),
									deliverySavings > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-emerald-400 font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Multi-Hotel Delivery Savings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["-", inr(deliverySavings)] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between font-bold text-sm text-foreground pt-1 border-t border-white/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: inr(total)
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => {
									const currentUser = getCurrentUser();
									setOpen(false);
									if (!currentUser) {
										toast.error("Please login to your account before checking out!", { description: "Redirecting to login page..." });
										navigate({ to: "/login" });
									} else navigate({ to: "/checkout" });
								},
								className: "w-full h-11 rounded-xl text-sm font-bold shadow-glow cursor-pointer",
								style: {
									background: "var(--gradient-sunset)",
									color: "oklch(0.16 0.03 265)"
								},
								children: [
									"Proceed to Checkout (",
									inr(total),
									")"
								]
							})]
						})
					]
				})
			]
		})
	});
}
function VegDot({ veg }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-block h-2.5 w-2.5 rounded-full shrink-0",
		style: { background: veg ? "var(--veg)" : "var(--nonveg)" }
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-white/10 bg-black/40 py-8 text-xs text-muted-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 font-bold text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4 text-primary" }), " FoodFun Delivery System"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "© 2026 FoodFun. All rights reserved." })]
		})
	});
}
//#endregion
export { VegDot as n, AppShell as t };
