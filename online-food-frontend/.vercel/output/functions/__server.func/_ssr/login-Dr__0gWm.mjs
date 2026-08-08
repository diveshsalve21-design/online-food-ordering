import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { G as LoaderCircle, N as Phone, U as LogIn, V as Mail, W as Lock, X as Eye, Z as EyeOff, ft as ArrowLeft, g as Store, it as CircleAlert, l as UserPlus, lt as Building2, s as Users, x as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as DEFAULT_5_HOTELS } from "./login-Dn4VTafF.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Dr__0gWm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REGISTERED_HOTELS_KEY = "online_food_registered_hotels";
var ACTIVE_HOTEL_KEY = "online_food_active_hotel";
function getRegisteredHotels() {
	if (typeof window === "undefined") return DEFAULT_5_HOTELS;
	try {
		const raw = localStorage.getItem(REGISTERED_HOTELS_KEY);
		if (!raw) {
			localStorage.setItem(REGISTERED_HOTELS_KEY, JSON.stringify(DEFAULT_5_HOTELS));
			return DEFAULT_5_HOTELS;
		}
		let updated = [...JSON.parse(raw)];
		let changed = false;
		for (const def of DEFAULT_5_HOTELS) if (!updated.some((h) => h.ownerName.toLowerCase().includes(def.ownerName.split(" ")[0].toLowerCase()))) {
			updated.push(def);
			changed = true;
		}
		if (changed) localStorage.setItem(REGISTERED_HOTELS_KEY, JSON.stringify(updated));
		return updated;
	} catch (err) {
		return DEFAULT_5_HOTELS;
	}
}
function saveActiveHotel(hotel) {
	if (typeof window !== "undefined") try {
		localStorage.setItem(ACTIVE_HOTEL_KEY, JSON.stringify(hotel));
	} catch (err) {}
}
function getActiveHotel() {
	if (typeof window === "undefined") return DEFAULT_5_HOTELS[0];
	try {
		const raw = localStorage.getItem(ACTIVE_HOTEL_KEY);
		return raw ? JSON.parse(raw) : DEFAULT_5_HOTELS[0];
	} catch (err) {
		return DEFAULT_5_HOTELS[0];
	}
}
function HotelLogin() {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = (0, import_react.useState)("login");
	const [loginEmail, setLoginEmail] = (0, import_react.useState)("");
	const [loginPassword, setLoginPassword] = (0, import_react.useState)("");
	const [showLoginPassword, setShowLoginPassword] = (0, import_react.useState)(false);
	const [isLoggingIn, setIsLoggingIn] = (0, import_react.useState)(false);
	const [loginError, setLoginError] = (0, import_react.useState)("");
	const [regHotelName, setRegHotelName] = (0, import_react.useState)("");
	const [regOwnerName, setRegOwnerName] = (0, import_react.useState)("");
	const [regEmail, setRegEmail] = (0, import_react.useState)("");
	const [regPhone, setRegPhone] = (0, import_react.useState)("");
	const [regCuisine, setRegCuisine] = (0, import_react.useState)("North Indian · Biryani");
	const [regAddress, setRegAddress] = (0, import_react.useState)("");
	const [regCity, setRegCity] = (0, import_react.useState)("Kalyan");
	const [regPassword, setRegPassword] = (0, import_react.useState)("");
	const [regConfirmPassword, setRegConfirmPassword] = (0, import_react.useState)("");
	const [showRegPassword, setShowRegPassword] = (0, import_react.useState)(false);
	const [isRegistering, setIsRegistering] = (0, import_react.useState)(false);
	const [regError, setRegError] = (0, import_react.useState)("");
	const handleQuickHotelLogin = (hotel) => {
		saveActiveHotel(hotel);
		toast.success(`Logged in as Hotel Owner ${hotel.ownerName}! 🏬`, { description: `Opened ${hotel.hotelName} Dashboard` });
		navigate({ to: "/hotel/dashboard" });
	};
	const handleHotelLoginSubmit = async (e) => {
		e.preventDefault();
		setLoginError("");
		const emailOrPhone = loginEmail.trim().toLowerCase();
		const pwd = loginPassword;
		if (!emailOrPhone || !pwd) {
			setLoginError("Please enter your hotel email or phone and password.");
			return;
		}
		setIsLoggingIn(true);
		await new Promise((r) => setTimeout(r, 600));
		const hotels = getRegisteredHotels();
		const cleanSearch = emailOrPhone.replace(/\s+/g, "");
		const cleanDigits = emailOrPhone.replace(/\D/g, "");
		const match = hotels.find((h) => {
			const hEmail = h.email.toLowerCase();
			const hName = h.hotelName.toLowerCase().replace(/\s+/g, "");
			const hOwner = h.ownerName.toLowerCase().replace(/\s+/g, "");
			const hPhone = h.phone.replace(/\D/g, "");
			return hEmail === cleanSearch || hName === cleanSearch || hOwner === cleanSearch || cleanDigits.length >= 4 && hPhone.includes(cleanDigits);
		});
		if (!match) {
			setIsLoggingIn(false);
			setLoginError(`No registered hotel partner account found for "${loginEmail}". Please click one of the 5 Hotel Partner buttons below or register!`);
			toast.error("Hotel account not found!");
			return;
		}
		if (match.password && match.password !== pwd) {
			setIsLoggingIn(false);
			setLoginError("Incorrect password. Please try again.");
			toast.error("Incorrect hotel password!");
			return;
		}
		setIsLoggingIn(false);
		saveActiveHotel(match);
		toast.success(`Welcome back, ${match.hotelName}! 🏪`, { description: `Logged in as Hotel Owner ${match.ownerName}` });
		navigate({ to: "/hotel/dashboard" });
	};
	const handleHotelRegisterSubmit = async (e) => {
		e.preventDefault();
		setRegError("");
		const cleanEmail = regEmail.trim().toLowerCase();
		regPhone.trim().replace(/\D/g, "");
		if (!regHotelName.trim()) {
			setRegError("Hotel / Restaurant Name is required.");
			return;
		}
		if (!regOwnerName.trim()) {
			setRegError("Owner / Manager Name is required.");
			return;
		}
		if (!cleanEmail || !cleanEmail.includes("@")) {
			setRegError("Please enter a valid Hotel Email address.");
			return;
		}
		if (!regPhone.trim() || regPhone.length < 10) {
			setRegError("Please enter a valid 10-digit Phone Number.");
			return;
		}
		if (!regPassword || regPassword.length < 6) {
			setRegError("Password must be at least 6 characters long.");
			return;
		}
		if (regPassword !== regConfirmPassword) {
			setRegError("Passwords do not match. Please re-check.");
			return;
		}
		setIsRegistering(true);
		await new Promise((r) => setTimeout(r, 800));
		const hotels = getRegisteredHotels();
		if (hotels.find((h) => h.email.toLowerCase() === cleanEmail)) {
			setIsRegistering(false);
			setRegError(`The email "${cleanEmail}" is already registered to another hotel.`);
			toast.error("Hotel email already registered!");
			return;
		}
		const newHotel = {
			hotelName: regHotelName.trim(),
			ownerName: regOwnerName.trim(),
			email: cleanEmail,
			phone: regPhone.trim(),
			cuisine: regCuisine.trim() || "Multi-Cuisine",
			address: regAddress.trim() || "Station Road",
			city: regCity.trim() || "Kalyan",
			password: regPassword,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const updatedHotels = [...hotels, newHotel];
		if (typeof window !== "undefined") try {
			localStorage.setItem(REGISTERED_HOTELS_KEY, JSON.stringify(updatedHotels));
		} catch (err) {}
		saveActiveHotel(newHotel);
		setIsRegistering(false);
		toast.success(`🎉 Hotel "${newHotel.hotelName}" Registered Successfully!`, { description: `Logged in as Owner ${newHotel.ownerName}` });
		navigate({ to: "/hotel/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center px-4 py-8 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Customer Storefront" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong rounded-3xl p-5 border border-white/15 shadow-glow space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-secondary" }), " 5 Hotel Partner Dashboards"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full",
							children: "1-Click Instant Login"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 sm:grid-cols-5 gap-2",
						children: DEFAULT_5_HOTELS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => handleQuickHotelLogin(h),
							className: "flex flex-col items-center text-center p-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary transition-all cursor-pointer group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 place-items-center rounded-xl bg-primary/20 text-primary font-black text-xs group-hover:scale-110 transition-transform",
									children: h.ownerName.charAt(0)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-black text-xs text-foreground mt-1.5 leading-tight",
									children: h.ownerName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[9px] text-muted-foreground line-clamp-1",
									children: h.hotelName.split(" ")[0]
								})
							]
						}, h.ownerName))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong relative overflow-hidden rounded-3xl border border-white/15 p-6 shadow-2xl sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow",
									style: { background: "var(--gradient-sunset)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-7 w-7 text-[oklch(0.16_0.03_265)]" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-2xl font-black tracking-tight text-foreground sm:text-3xl",
									children: ["Hotel Partner ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "gradient-text",
										children: "Portal"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs sm:text-sm text-muted-foreground",
									children: "Login to your restaurant partner account or register a new hotel account."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
							value: activeTab,
							onValueChange: (v) => setActiveTab(v),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
									className: "grid w-full grid-cols-2 rounded-2xl bg-white/5 p-1 border border-white/10 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "login",
										className: "rounded-xl text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-black shadow-glow cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "mr-1.5 h-3.5 w-3.5" }), " Hotel Login"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
										value: "register",
										className: "rounded-xl text-xs font-bold data-[state=active]:bg-secondary data-[state=active]:text-black shadow-glow cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "mr-1.5 h-3.5 w-3.5" }), " Register New Hotel"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "login",
									className: "space-y-4 focus-visible:outline-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleHotelLoginSubmit,
										className: "space-y-4",
										autoComplete: "off",
										autoCapitalize: "off",
										children: [
											loginError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 rounded-xl bg-destructive/20 border border-destructive/40 p-3 text-xs text-destructive font-semibold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loginError })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs font-semibold uppercase text-muted-foreground",
													children: "Hotel Registered Email / Phone / Owner Name"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														type: "text",
														autoComplete: "off",
														placeholder: "e.g. Divesh Salve, Pritesh Kanitkar, Rashmin Oak, Himanshu Medhe, Swaraj Angre",
														value: loginEmail,
														onChange: (e) => setLoginEmail(e.target.value),
														className: "h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-sm",
														required: true
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs font-semibold uppercase text-muted-foreground",
													children: "Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															type: showLoginPassword ? "text" : "password",
															autoComplete: "new-password",
															placeholder: "Enter hotel password",
															value: loginPassword,
															onChange: (e) => setLoginPassword(e.target.value),
															className: "h-11 rounded-xl border-white/10 bg-white/5 pl-10 pr-10 text-sm",
															required: true
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setShowLoginPassword(!showLoginPassword),
															className: "absolute right-3.5 top-3.5 text-muted-foreground hover:text-white",
															children: showLoginPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "submit",
												disabled: isLoggingIn,
												className: "mt-2 h-12 w-full rounded-xl text-base font-bold transition-all shadow-glow cursor-pointer",
												style: {
													background: "var(--gradient-sunset)",
													color: "oklch(0.16 0.03 265)"
												},
												children: isLoggingIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), " Authenticating Hotel..."]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" }), " Login to Hotel Dashboard"]
												})
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "register",
									className: "space-y-4 focus-visible:outline-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleHotelRegisterSubmit,
										className: "space-y-3",
										autoComplete: "off",
										autoCapitalize: "off",
										children: [
											regError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 rounded-xl bg-destructive/20 border border-destructive/40 p-3 text-xs text-destructive font-semibold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: regError })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-3 sm:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs font-semibold uppercase text-muted-foreground",
														children: "Hotel / Restaurant Name"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															placeholder: "e.g. Divesh Fusion Kitchen",
															value: regHotelName,
															onChange: (e) => setRegHotelName(e.target.value),
															className: "h-10 rounded-xl border-white/10 bg-white/5 pl-10 text-sm",
															required: true
														})]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs font-semibold uppercase text-muted-foreground",
														children: "Owner / Manager Name"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														placeholder: "e.g. Divesh Salve",
														value: regOwnerName,
														onChange: (e) => setRegOwnerName(e.target.value),
														className: "h-10 rounded-xl border-white/10 bg-white/5 text-sm",
														required: true
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-3 sm:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs font-semibold uppercase text-muted-foreground",
														children: "Hotel Email"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															type: "email",
															placeholder: "hotel@foodfusion.com",
															value: regEmail,
															onChange: (e) => setRegEmail(e.target.value),
															className: "h-10 rounded-xl border-white/10 bg-white/5 pl-10 text-sm",
															required: true
														})]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs font-semibold uppercase text-muted-foreground",
														children: "Phone Number"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															type: "tel",
															placeholder: "9876543210",
															value: regPhone,
															onChange: (e) => setRegPhone(e.target.value),
															className: "h-10 rounded-xl border-white/10 bg-white/5 pl-10 text-sm",
															required: true
														})]
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-3 sm:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs font-semibold uppercase text-muted-foreground",
														children: "Cuisine Type"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														placeholder: "e.g. Biryani · North Indian",
														value: regCuisine,
														onChange: (e) => setRegCuisine(e.target.value),
														className: "h-10 rounded-xl border-white/10 bg-white/5 text-sm"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs font-semibold uppercase text-muted-foreground",
														children: "City"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														placeholder: "Kalyan",
														value: regCity,
														onChange: (e) => setRegCity(e.target.value),
														className: "h-10 rounded-xl border-white/10 bg-white/5 text-sm"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-3 sm:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs font-semibold uppercase text-muted-foreground",
														children: "Password"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														type: showRegPassword ? "text" : "password",
														placeholder: "Create password",
														value: regPassword,
														onChange: (e) => setRegPassword(e.target.value),
														className: "h-10 rounded-xl border-white/10 bg-white/5 text-sm",
														required: true
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs font-semibold uppercase text-muted-foreground",
														children: "Confirm Password"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														type: showRegPassword ? "text" : "password",
														placeholder: "Confirm password",
														value: regConfirmPassword,
														onChange: (e) => setRegConfirmPassword(e.target.value),
														className: "h-10 rounded-xl border-white/10 bg-white/5 text-sm",
														required: true
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "submit",
												disabled: isRegistering,
												className: "mt-2 h-12 w-full rounded-xl text-base font-bold transition-all shadow-glow cursor-pointer",
												style: {
													background: "var(--gradient-sunset)",
													color: "oklch(0.16 0.03 265)"
												},
												children: isRegistering ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), " Registering Hotel Partner..."]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), " Register Hotel Account"]
												})
											})
										]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground border-t border-white/10 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Encrypted Partner Portal · FoodFun Merchant Services" })]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { HotelLogin as component, getActiveHotel, getRegisteredHotels, saveActiveHotel };
