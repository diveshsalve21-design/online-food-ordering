import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getCurrentUser } from "./login-CAyqzBQd.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as useCart, r as inr } from "./cart-qRuWGf-q.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { $ as CreditCard, B as MapPin, G as LoaderCircle, J as Flame, U as LogIn, W as Lock, ct as Building, d as Truck, ft as ArrowLeft, h as Tag, i as X, k as QrCode, r as Zap, rt as CircleCheck, st as Check, u as Trophy, x as ShieldCheck, y as Smartphone } from "../_libs/lucide-react.mjs";
import { a as RewardsModal } from "./rewards-modal-XME2Uxsx.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-C4KmpZQs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Checkout() {
	const navigate = useNavigate();
	const { items, subtotal, gst, delivery: baseDelivery, deliverySavings, uniqueRestaurants, isMultiRestaurant, clear, saveOrder } = useCart();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [showRewardsModal, setShowRewardsModal] = (0, import_react.useState)(false);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [houseNo, setHouseNo] = (0, import_react.useState)("Flat 402, Sunshine Apartments");
	const [street, setStreet] = (0, import_react.useState)("Station Road, West");
	const [city, setCity] = (0, import_react.useState)("Kalyan");
	const [state, setState] = (0, import_react.useState)("Maharashtra");
	const [pincode, setPincode] = (0, import_react.useState)("421 306");
	const [instructions, setInstructions] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const user = getCurrentUser();
		setCurrentUser(user);
		if (user) {
			if (user.fullName) setFullName(user.fullName);
			if (user.phone) setPhone(user.phone);
			if (user.address) setStreet(user.address);
			if (user.city) setCity(user.city);
			if (user.pincode) setPincode(user.pincode);
		}
	}, []);
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("razorpay");
	const [placed, setPlaced] = (0, import_react.useState)(false);
	const [paymentDetails, setPaymentDetails] = (0, import_react.useState)(null);
	const [couponCode, setCouponCode] = (0, import_react.useState)("");
	const [appliedCoupon, setAppliedCoupon] = (0, import_react.useState)(null);
	const delivery = appliedCoupon?.isFreeDelivery ? 0 : baseDelivery;
	const rawTotal = subtotal + gst + delivery;
	const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
	const total = Math.max(0, rawTotal - discount);
	const [showRazorpayModal, setShowRazorpayModal] = (0, import_react.useState)(false);
	const [rzpTab, setRzpTab] = (0, import_react.useState)("upi");
	const [testUpiId, setTestUpiId] = (0, import_react.useState)("divesh@okhdfcbank");
	const [testCardNumber, setTestCardNumber] = (0, import_react.useState)("4111 •••• •••• 1111");
	const [testCardExpiry, setTestCardExpiry] = (0, import_react.useState)("12/28");
	const [testCardCvv, setTestCardCvv] = (0, import_react.useState)("123");
	const [isAuthorizing, setIsAuthorizing] = (0, import_react.useState)(false);
	if (!currentUser) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-xl px-4 py-16 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-strong space-y-6 rounded-3xl p-8 border border-white/10 shadow-glow",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-amber-500/20 text-amber-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-10 w-10" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-black text-foreground",
					children: "Login Required to Order"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Without logging in, food ordering is not allowed. Please login or register a new customer account to place your food order."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col sm:flex-row gap-3 pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "flex-1 h-12 rounded-xl text-base font-bold shadow-glow cursor-pointer",
						style: {
							background: "var(--gradient-sunset)",
							color: "oklch(0.16 0.03 265)"
						},
						onClick: () => navigate({ to: "/login" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "mr-2 h-5 w-5" }), " Go to Login / Register Page"]
					})
				})
			]
		})
	});
	const handleApplyCoupon = (codeToApply) => {
		const code = (codeToApply || couponCode).trim().toUpperCase();
		if (!code) {
			toast.error("Please enter a valid coupon code!");
			return;
		}
		if (items.length === 0) {
			toast.error("Your cart is empty! Add items first.");
			return;
		}
		if ((typeof window !== "undefined" ? JSON.parse(localStorage.getItem("foodfun_used_coupons") || "[]") : []).includes(code)) {
			toast.error(`⛔ Coupon Code "${code}" Already Used!`, { description: "Each coupon code can only be redeemed once per account." });
			return;
		}
		const rule = {
			FLASH60: {
				minSubtotal: 249,
				calc: (sub) => ({
					discountAmount: Math.min(Math.round(sub * .6), 150),
					isFreeDelivery: false,
					label: "Saved 60% OFF (Max ₹150)"
				})
			},
			SPIN60: {
				minSubtotal: 249,
				calc: (sub) => ({
					discountAmount: Math.min(Math.round(sub * .6), 150),
					isFreeDelivery: false,
					label: "Saved 60% OFF"
				})
			},
			QUIZ100: {
				minSubtotal: 199,
				calc: () => ({
					discountAmount: 100,
					isFreeDelivery: false,
					label: "Flat ₹100 OFF"
				})
			},
			FOODFUN100: {
				minSubtotal: 199,
				calc: () => ({
					discountAmount: 100,
					isFreeDelivery: false,
					label: "Flat ₹100 OFF"
				})
			},
			REFER100: {
				minSubtotal: 199,
				calc: () => ({
					discountAmount: 100,
					isFreeDelivery: false,
					label: "Flat ₹100 OFF"
				})
			},
			SCRATCHFREE: {
				minSubtotal: 199,
				calc: () => ({
					discountAmount: 50,
					isFreeDelivery: true,
					label: "Free Dessert + ₹50 OFF & FREE Delivery"
				})
			},
			FREEDEL: {
				minSubtotal: 149,
				calc: () => ({
					discountAmount: 0,
					isFreeDelivery: true,
					label: "FREE Delivery Unlocked"
				})
			},
			BOGO: {
				minSubtotal: 249,
				calc: (sub) => ({
					discountAmount: Math.round(sub * .5),
					isFreeDelivery: false,
					label: "BOGO 50% OFF"
				})
			},
			WEEKEND: {
				minSubtotal: 249,
				calc: (sub) => ({
					discountAmount: Math.round(sub * .5),
					isFreeDelivery: false,
					label: "Weekend Combo 50% OFF"
				})
			},
			FOODFUN50: {
				minSubtotal: 149,
				calc: () => ({
					discountAmount: 50,
					isFreeDelivery: false,
					label: "Flat ₹50 OFF"
				})
			}
		}[code];
		if (!rule) {
			toast.error(`Invalid Coupon Code "${code}". Try FLASH60, QUIZ100, or FREEDEL!`);
			return;
		}
		if (subtotal < rule.minSubtotal) {
			toast.error(`⛔ Minimum Order Requirement Not Met!`, { description: `Coupon "${code}" requires a minimum food total of ${inr(rule.minSubtotal)}. Add ${inr(rule.minSubtotal - subtotal)} more to apply!` });
			return;
		}
		const { discountAmount, isFreeDelivery, label } = rule.calc(subtotal);
		setAppliedCoupon({
			code,
			discountAmount,
			isFreeDelivery
		});
		toast.success(`Coupon "${code}" Applied! ${label}`);
	};
	const handleRemoveCoupon = () => {
		setAppliedCoupon(null);
		setCouponCode("");
		toast.info("Coupon removed.");
	};
	const handlePaymentSuccess = (paymentId) => {
		const mockOrderId = "ORD_" + Math.floor(1e5 + Math.random() * 9e5);
		const finalPaymentId = paymentId || "pay_rzp_test_" + Math.random().toString(36).substring(2, 10);
		saveOrder({
			id: mockOrderId,
			paymentId: finalPaymentId,
			userEmail: currentUser?.email || "",
			customerName: fullName,
			phone,
			address: `${houseNo}, ${street}, ${city}, ${state} - ${pincode}`,
			items: [...items],
			subtotal,
			gst,
			delivery,
			discount,
			total,
			status: "On the way",
			paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Razorpay (Test Mode)"
		});
		if (appliedCoupon && typeof window !== "undefined") {
			const usedCoupons = JSON.parse(localStorage.getItem("foodfun_used_coupons") || "[]");
			if (!usedCoupons.includes(appliedCoupon.code)) {
				usedCoupons.push(appliedCoupon.code);
				localStorage.setItem("foodfun_used_coupons", JSON.stringify(usedCoupons));
			}
		}
		if (typeof window !== "undefined") {
			const currentSpins = parseInt(localStorage.getItem("foodfun_spins_count") || "0", 10);
			localStorage.setItem("foodfun_spins_count", (currentSpins + 1).toString());
		}
		setPaymentDetails({
			paymentId: finalPaymentId,
			orderId: mockOrderId,
			paidAmount: total
		});
		setPlaced(true);
		setShowRazorpayModal(false);
		setIsAuthorizing(false);
		clear();
		toast.success("Razorpay Payment Successful! 🎉", { description: `Payment ID: ${finalPaymentId} · +1 Bonus Spin Unlocked!` });
		setTimeout(() => {
			setShowRewardsModal(true);
		}, 400);
	};
	const handleStartPayment = (e) => {
		e.preventDefault();
		if (items.length === 0) {
			toast.error("Your cart is empty! Add items before placing an order.");
			return;
		}
		if (!fullName || !phone || !street || !city) {
			toast.error("Please fill in your delivery address details.");
			return;
		}
		if (paymentMethod === "cod") {
			setIsAuthorizing(true);
			setTimeout(() => {
				handlePaymentSuccess("pay_cod_" + Math.floor(1e5 + Math.random() * 9e5));
			}, 1e3);
		} else setShowRazorpayModal(true);
	};
	const executeRazorpayTestPay = () => {
		setIsAuthorizing(true);
		setTimeout(() => {
			handlePaymentSuccess("pay_rzp_test_" + Math.random().toString(36).substring(2, 10));
		}, 1500);
	};
	if (placed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-strong space-y-6 rounded-3xl p-8 border border-white/10 shadow-glow",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent/20 text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-12 w-12" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-black text-foreground",
					children: "Order Confirmed!"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"Thank you for ordering with ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-primary",
							children: "FoodFun"
						}),
						". Delivery to ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-foreground",
							children: [
								fullName,
								" (",
								city,
								")"
							]
						}),
						"."
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-white/5 p-4 text-left space-y-2 text-sm border border-white/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-white/10 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Order ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground",
								children: paymentDetails?.orderId
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-white/10 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Razorpay Payment ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-secondary",
								children: paymentDetails?.paymentId
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-white/10 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-accent flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), " Paid via Razorpay (Test Mode)"]
							})]
						}),
						appliedCoupon && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-white/10 pb-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									"Coupon Discount (",
									appliedCoupon.code,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-accent",
								children: ["-", inr(appliedCoupon.discountAmount)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between pt-1 font-bold text-base",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Amount Paid" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: inr(paymentDetails?.paidAmount ?? total)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-center space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-bold text-amber-400 flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5 animate-bounce" }), " Order Reward Unlocked!"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Spin the 3D Fortune Wheel to win a free dessert or cashback coupon!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setShowRewardsModal(true),
							className: "h-10 px-6 rounded-xl font-bold text-xs shadow-glow border border-amber-400 bg-amber-500 text-black hover:bg-amber-400 cursor-pointer",
							children: "Spin Fortune Wheel Now 🎡"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "flex-1 rounded-xl font-bold shadow-glow cursor-pointer",
						style: {
							background: "var(--gradient-sunset)",
							color: "oklch(0.16 0.03 265)"
						},
						onClick: () => navigate({ to: "/orders" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "mr-2 h-5 w-5" }), " Track Live Delivery Order"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "flex-1 rounded-xl border border-white/10 text-muted-foreground hover:text-foreground cursor-pointer",
						onClick: () => navigate({ to: "/" }),
						children: "Back to Home"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardsModal, {
			open: showRewardsModal,
			onOpenChange: setShowRewardsModal
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/menu",
					className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Menu" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs text-blue-400 font-semibold shadow-glow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3.5 w-3.5 text-blue-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Razorpay Test Mode Active" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleStartPayment,
				className: "grid gap-6 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						title: "Delivery Address",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground mb-1 block",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: fullName,
									onChange: (e) => setFullName(e.target.value),
									placeholder: "Full name",
									className: "rounded-xl border-white/10 bg-white/5 text-sm",
									required: true
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground mb-1 block",
									children: "Phone Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									placeholder: "9876543210",
									className: "rounded-xl border-white/10 bg-white/5 text-sm",
									required: true
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground mb-1 block",
								children: "Flat / House / Building"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: houseNo,
								onChange: (e) => setHouseNo(e.target.value),
								placeholder: "Flat / House no.",
								className: "rounded-xl border-white/10 bg-white/5 text-sm",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground mb-1 block",
								children: "Street & Area"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: street,
								onChange: (e) => setStreet(e.target.value),
								placeholder: "Street, Area",
								className: "rounded-xl border-white/10 bg-white/5 text-sm",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs text-muted-foreground mb-1 block",
										children: "City"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: city,
										onChange: (e) => setCity(e.target.value),
										placeholder: "City",
										className: "rounded-xl border-white/10 bg-white/5 text-sm",
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs text-muted-foreground mb-1 block",
										children: "State"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: state,
										onChange: (e) => setState(e.target.value),
										placeholder: "State",
										className: "rounded-xl border-white/10 bg-white/5 text-sm",
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs text-muted-foreground mb-1 block",
										children: "PIN Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: pincode,
										onChange: (e) => setPincode(e.target.value),
										placeholder: "PIN",
										className: "rounded-xl border-white/10 bg-white/5 text-sm",
										required: true
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-muted-foreground mb-1 block",
								children: "Delivery Instructions (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: instructions,
								onChange: (e) => setInstructions(e.target.value),
								placeholder: "E.g. Leave with guard, ring doorbell...",
								className: "rounded-xl border-white/10 bg-white/5 text-sm min-h-[70px]"
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						title: "Payment Method",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-primary" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									onClick: () => setPaymentMethod("razorpay"),
									className: `flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${paymentMethod === "razorpay" ? "border-primary bg-primary/10 shadow-glow" : "border-white/10 bg-white/5 hover:bg-white/10"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "payment",
											checked: paymentMethod === "razorpay",
											onChange: () => setPaymentMethod("razorpay"),
											className: "accent-primary h-4 w-4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 font-bold text-foreground text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Razorpay Payment Gateway" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400 uppercase tracking-wider",
												children: "TEST MODE"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Instant UPI, Cards, Google Pay, PhonePe & NetBanking"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 rounded-lg bg-blue-900/40 px-2.5 py-1 border border-blue-500/30 text-xs font-bold text-blue-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-blue-400" }), "Razorpay"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									onClick: () => setPaymentMethod("upi"),
									className: `flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${paymentMethod === "upi" ? "border-primary bg-primary/10 shadow-glow" : "border-white/10 bg-white/5 hover:bg-white/10"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "payment",
											checked: paymentMethod === "upi",
											onChange: () => setPaymentMethod("upi"),
											className: "accent-primary h-4 w-4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-foreground text-sm flex items-center gap-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "UPI (GPay / PhonePe / Paytm)" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Pay via UPI QR code or VPA"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-5 w-5 text-secondary" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									onClick: () => setPaymentMethod("card"),
									className: `flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${paymentMethod === "card" ? "border-primary bg-primary/10 shadow-glow" : "border-white/10 bg-white/5 hover:bg-white/10"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "payment",
											checked: paymentMethod === "card",
											onChange: () => setPaymentMethod("card"),
											className: "accent-primary h-4 w-4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-foreground text-sm",
											children: "Credit / Debit Card"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Visa, Mastercard, RuPay, Maestro"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-5 w-5 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									onClick: () => setPaymentMethod("cod"),
									className: `flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${paymentMethod === "cod" ? "border-primary bg-primary/10 shadow-glow" : "border-white/10 bg-white/5 hover:bg-white/10"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "payment",
											checked: paymentMethod === "cod",
											onChange: () => setPaymentMethod("cod"),
											className: "accent-primary h-4 w-4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-foreground text-sm",
											children: "Cash on Delivery"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Pay in cash when order arrives at doorstep"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-5 w-5 text-muted-foreground" })]
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong sticky top-24 rounded-3xl p-6 border border-white/10 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-base font-bold text-foreground mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-5 w-5 text-primary" }), " Order Summary"]
								}), isMultiRestaurant && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-black text-emerald-300",
									children: "Multi-Hotel Combo"
								})]
							}),
							isMultiRestaurant && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs text-emerald-400 font-semibold space-y-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between font-bold text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5 text-emerald-400" }),
											" ",
											uniqueRestaurants.length,
											" Restaurants in 1 Order"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 font-bold",
										children: ["Saved ", inr(deliverySavings)]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-h-60 overflow-y-auto space-y-3 pr-1 text-sm",
								children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground text-center py-6",
									children: "Your cart is empty."
								}) : items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "truncate min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "truncate text-foreground font-medium",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-semibold text-primary",
													children: [item.qty, "×"]
												}),
												" ",
												item.name
											]
										}), item.restaurantName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] font-bold text-secondary",
											children: ["📍 ", item.restaurantName]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground whitespace-nowrap",
										children: inr(item.price * item.qty)
									})]
								}, item.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 border-t border-white/10 pt-4 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-xs font-bold text-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-3.5 w-3.5 text-secondary" }), " Redeem Coupon Code"]
									}),
									appliedCoupon ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-400 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-emerald-400" }),
												"Coupon \"",
												appliedCoupon.code,
												"\" Applied (",
												inr(appliedCoupon.discountAmount),
												" OFF)"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleRemoveCoupon,
											className: "text-xs text-rose-400 hover:underline font-bold px-1",
											children: "Remove"
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: couponCode,
											onChange: (e) => setCouponCode(e.target.value.toUpperCase()),
											placeholder: "Enter code (e.g. FLASH60)",
											className: "rounded-xl border-white/10 bg-white/5 text-xs font-mono tracking-wider uppercase h-10"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											onClick: () => handleApplyCoupon(),
											className: "h-10 rounded-xl text-xs font-bold px-4 shadow-glow",
											style: {
												background: "var(--gradient-sunset)",
												color: "oklch(0.16 0.03 265)"
											},
											children: "Apply"
										})]
									}),
									!appliedCoupon && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-1.5 pt-1 text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground self-center",
											children: "Try:"
										}), [
											"FLASH60",
											"QUIZ100",
											"SCRATCHFREE"
										].map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setCouponCode(code);
												handleApplyCoupon(code);
											},
											className: "rounded-full bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-secondary hover:bg-white/10",
											children: code
										}, code))]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
										label: "Subtotal",
										value: inr(subtotal)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
										label: "GST (5%)",
										value: inr(gst)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
										label: "Delivery Fee",
										value: delivery === 0 ? "FREE" : isMultiRestaurant ? `${inr(delivery)} (Combined)` : inr(delivery),
										valueClass: delivery === 0 ? "text-accent font-bold" : ""
									}),
									isMultiRestaurant && deliverySavings > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-emerald-400 font-bold text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Multi-Hotel Delivery Savings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["-", inr(deliverySavings)] })]
									}),
									appliedCoupon && appliedCoupon.discountAmount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-accent font-bold text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Coupon Discount (",
											appliedCoupon.code,
											")"
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["-", inr(appliedCoupon.discountAmount)] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex justify-between border-t border-white/10 pt-3 text-lg font-black text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Payable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: inr(total)
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: items.length === 0 || isAuthorizing,
								className: "mt-6 h-12 w-full rounded-xl text-base font-bold transition-all shadow-glow hover:brightness-110 disabled:opacity-50 cursor-pointer",
								style: {
									background: "var(--gradient-sunset)",
									color: "oklch(0.16 0.03 265)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center justify-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" }),
										"Pay ",
										inr(total),
										" via ",
										paymentMethod === "cod" ? "COD" : "Razorpay (Test Mode)"
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Encrypted 256-bit Razorpay Sandbox SSL" })]
							})
						]
					})
				})]
			}),
			showRazorpayModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-[#0c2340] px-6 py-4 flex items-center justify-between border-b border-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black text-white text-lg",
									children: "R"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm font-bold text-white",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Online Food Ordering System" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-blue-500/30 px-2 py-0.5 text-[9px] font-bold text-blue-300 uppercase",
										children: "TEST MODE"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-blue-200/70",
									children: "Merchant ID: TMuBr5MC7iovU2"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowRazorpayModal(false),
								className: "rounded-full p-1.5 text-blue-200/70 hover:bg-white/10 hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-[#122e52] px-6 py-3 flex items-center justify-between border-b border-white/10 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-blue-200",
								children: "Amount to Pay"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-black text-white",
								children: inr(total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex rounded-xl bg-white/5 p-1 border border-white/10 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setRzpTab("upi"),
											className: `flex-1 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${rzpTab === "upi" ? "bg-primary text-black shadow-glow" : "text-muted-foreground hover:text-white"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-3.5 w-3.5" }), "UPI / QR"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setRzpTab("card"),
											className: `flex-1 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${rzpTab === "card" ? "bg-primary text-black shadow-glow" : "text-muted-foreground hover:text-white"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-3.5 w-3.5" }), "Cards"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setRzpTab("netbanking"),
											className: `flex-1 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${rzpTab === "netbanking" ? "bg-primary text-black shadow-glow" : "text-muted-foreground hover:text-white"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-3.5 w-3.5" }), "NetBanking"]
										})
									]
								}),
								rzpTab === "upi" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "mx-auto h-12 w-12 text-secondary mb-2" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Scan QR or enter VPA"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: testUpiId,
												onChange: (e) => setTestUpiId(e.target.value),
												className: "mt-2 text-center text-sm rounded-xl border-white/10 bg-white/5",
												placeholder: "vpa@upi"
											})
										]
									})
								}),
								rzpTab === "card" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] text-muted-foreground uppercase tracking-wider block mb-1",
										children: "Test Card Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: testCardNumber,
										onChange: (e) => setTestCardNumber(e.target.value),
										className: "rounded-xl border-white/10 bg-white/5 text-sm font-mono"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[10px] text-muted-foreground uppercase tracking-wider block mb-1",
											children: "Expiry"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: testCardExpiry,
											onChange: (e) => setTestCardExpiry(e.target.value),
											className: "rounded-xl border-white/10 bg-white/5 text-sm font-mono"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[10px] text-muted-foreground uppercase tracking-wider block mb-1",
											children: "CVV"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: testCardCvv,
											onChange: (e) => setTestCardCvv(e.target.value),
											className: "rounded-xl border-white/10 bg-white/5 text-sm font-mono"
										})] })]
									})]
								}),
								rzpTab === "netbanking" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2 text-xs",
									children: [
										"HDFC Bank",
										"ICICI Bank",
										"SBI",
										"Axis Bank",
										"Kotak",
										"Yes Bank"
									].map((bank) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "rounded-xl border border-white/10 bg-white/5 p-2.5 text-center font-medium hover:border-primary hover:bg-white/10",
										children: bank
									}, bank))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: executeRazorpayTestPay,
									disabled: isAuthorizing,
									className: "w-full h-12 rounded-xl text-base font-bold transition-all shadow-glow",
									style: {
										background: "var(--gradient-sunset)",
										color: "oklch(0.16 0.03 265)"
									},
									children: isAuthorizing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center justify-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), "Authorizing Razorpay Test Payment..."]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center justify-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }),
											"Pay ",
											inr(total),
											" (Test Success)"
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Secured by Razorpay Payments India" })]
								})
							]
						})
					]
				})
			})
		]
	});
}
function SectionCard({ title, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass-strong space-y-4 rounded-3xl p-6 border border-white/10 shadow-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-base font-bold text-foreground",
			children: [icon, title]
		}), children]
	});
}
function SummaryRow({ label, value, valueClass = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: valueClass,
			children: value
		})]
	});
}
//#endregion
export { Checkout as component };
