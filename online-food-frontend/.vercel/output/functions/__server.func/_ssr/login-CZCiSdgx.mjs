import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { B as MapPin, G as LoaderCircle, N as Phone, U as LogIn, V as Mail, W as Lock, X as Eye, Z as EyeOff, c as User, ft as ArrowLeft, it as CircleAlert, l as UserPlus, v as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BYfOmXtJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CZCiSdgx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REGISTERED_ACCOUNTS_KEY = "online_food_registered_users";
var CURRENT_USER_KEY = "online_food_current_user";
function getRegisteredAccounts() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
		if (!raw) return [];
		return JSON.parse(raw);
	} catch (err) {
		return [];
	}
}
function getCurrentUser() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(CURRENT_USER_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch (err) {
		return null;
	}
}
function saveCurrentUser(user) {
	if (typeof window !== "undefined") try {
		localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
	} catch (err) {}
}
function UserLoginRegister() {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = (0, import_react.useState)("login");
	const [loginEmail, setLoginEmail] = (0, import_react.useState)("");
	const [loginPassword, setLoginPassword] = (0, import_react.useState)("");
	const [showLoginPassword, setShowLoginPassword] = (0, import_react.useState)(false);
	const [isLoggingIn, setIsLoggingIn] = (0, import_react.useState)(false);
	const [regFullName, setRegFullName] = (0, import_react.useState)("");
	const [regEmail, setRegEmail] = (0, import_react.useState)("");
	const [regPhone, setRegPhone] = (0, import_react.useState)("");
	const [regAddress, setRegAddress] = (0, import_react.useState)("");
	const [regCity, setRegCity] = (0, import_react.useState)("Kalyan");
	const [regPincode, setRegPincode] = (0, import_react.useState)("421 306");
	const [regPassword, setRegPassword] = (0, import_react.useState)("");
	const [regConfirmPassword, setRegConfirmPassword] = (0, import_react.useState)("");
	const [showRegPassword, setShowRegPassword] = (0, import_react.useState)(false);
	const [isRegistering, setIsRegistering] = (0, import_react.useState)(false);
	const [loginError, setLoginError] = (0, import_react.useState)("");
	const [regError, setRegError] = (0, import_react.useState)("");
	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		setLoginError("");
		const emailOrPhone = loginEmail.trim().toLowerCase();
		const pwd = loginPassword;
		if (!emailOrPhone || !pwd) {
			setLoginError("Please enter your email/phone and password.");
			return;
		}
		setIsLoggingIn(true);
		await new Promise((r) => setTimeout(r, 800));
		const accounts = getRegisteredAccounts();
		const cleanSearch = emailOrPhone.trim().toLowerCase().replace(/\s+/g, "");
		const cleanDigits = emailOrPhone.replace(/\D/g, "");
		const match = accounts.find((a) => {
			const aEmail = a.email.toLowerCase();
			const aEmailPrefix = aEmail.split("@")[0];
			const aName = a.fullName.toLowerCase().replace(/\s+/g, "");
			const aPhone = a.phone.replace(/\D/g, "");
			return aEmail === cleanSearch || aEmailPrefix === cleanSearch || aName === cleanSearch || cleanDigits.length >= 5 && aPhone.includes(cleanDigits);
		});
		if (!match) {
			setIsLoggingIn(false);
			setLoginError(`No registered account found for "${loginEmail}". Please switch to "Register New Account" tab.`);
			toast.error("Account not found. Please register first!");
			return;
		}
		if (match.password && match.password !== pwd) {
			setIsLoggingIn(false);
			setLoginError("Incorrect password. Please try again.");
			toast.error("Incorrect password!");
			return;
		}
		setIsLoggingIn(false);
		saveCurrentUser(match);
		toast.success(`Welcome back, ${match.fullName}! 🎉`, { description: `Logged in as ${match.email}` });
		navigate({ to: "/profile" });
	};
	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		setRegError("");
		const cleanEmail = regEmail.trim().toLowerCase();
		if (!regFullName.trim()) {
			setRegError("Full Name is required.");
			return;
		}
		if (!cleanEmail || !cleanEmail.includes("@")) {
			setRegError("Please enter a valid Email Address.");
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
		await new Promise((r) => setTimeout(r, 1e3));
		const accounts = getRegisteredAccounts();
		const cleanPhone = regPhone.trim().replace(/\D/g, "");
		if (accounts.find((a) => a.email.toLowerCase() === cleanEmail)) {
			setIsRegistering(false);
			setRegError(`The email "${cleanEmail}" is already registered. Please login or use another email.`);
			toast.error("Email already registered! Please login.");
			return;
		}
		if (accounts.find((a) => a.phone.replace(/\D/g, "") === cleanPhone && cleanPhone.length >= 10)) {
			setIsRegistering(false);
			setRegError(`The phone number "${regPhone}" is already registered to an account.`);
			toast.error("Phone number already registered!");
			return;
		}
		const newUser = {
			fullName: regFullName.trim(),
			email: cleanEmail,
			phone: regPhone.trim(),
			address: regAddress.trim() || "Kalyan West",
			city: regCity.trim() || "Kalyan",
			pincode: regPincode.trim() || "421 306",
			password: regPassword,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const updatedAccounts = [...accounts, newUser];
		if (typeof window !== "undefined") try {
			localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
		} catch (err) {}
		saveCurrentUser(newUser);
		setIsRegistering(false);
		toast.success(`🎉 Account Registered Successfully! Welcome ${newUser.fullName}`, { description: "Your new account has been created and saved." });
		navigate({ to: "/profile" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to Home" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-secondary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Customer Authentication" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-white/10 shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow",
							style: { background: "var(--gradient-sunset)" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-7 w-7 text-[oklch(0.16_0.03_265)]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-2xl font-black tracking-tight text-foreground sm:text-3xl",
							children: ["Customer ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-text",
								children: "Portal"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs sm:text-sm text-muted-foreground",
							children: "Sign in to your registered account or register a brand-new customer account."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: activeTab,
					onValueChange: (v) => setActiveTab(v),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-2 rounded-2xl bg-white/5 p-1 border border-white/10 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "login",
								className: "rounded-xl text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-black shadow-glow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "mr-1.5 h-3.5 w-3.5" }), " Login"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "register",
								className: "rounded-xl text-xs font-bold data-[state=active]:bg-secondary data-[state=active]:text-black shadow-glow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "mr-1.5 h-3.5 w-3.5" }), " New Register"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "login",
							className: "space-y-4 focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleLoginSubmit,
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
											children: "Registered Email / Phone"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "text",
												autoComplete: "off",
												autoCorrect: "off",
												autoCapitalize: "off",
												spellCheck: false,
												placeholder: "your.email@gmail.com or phone",
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
													placeholder: "Enter your password",
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
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), " Verifying Credentials..."]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4" }), " Login to Account"]
										})
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "register",
							className: "space-y-4 focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleRegisterSubmit,
								className: "space-y-3",
								children: [
									regError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-xl bg-destructive/20 border border-destructive/40 p-3 text-xs text-destructive font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: regError })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-semibold uppercase text-muted-foreground",
											children: "Full Name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "e.g. Divesh Salve",
												value: regFullName,
												onChange: (e) => setRegFullName(e.target.value),
												className: "h-10 rounded-xl border-white/10 bg-white/5 pl-10 text-sm",
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
												children: "Email Address"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "email",
													placeholder: "yourname@gmail.com",
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
												children: "City"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "Kalyan",
												value: regCity,
												onChange: (e) => setRegCity(e.target.value),
												className: "h-10 rounded-xl border-white/10 bg-white/5 text-sm"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs font-semibold uppercase text-muted-foreground",
												children: "PIN Code"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "421 306",
												value: regPincode,
												onChange: (e) => setRegPincode(e.target.value),
												className: "h-10 rounded-xl border-white/10 bg-white/5 text-sm"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-semibold uppercase text-muted-foreground",
											children: "Delivery Address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "Flat no, Street & Area, Kalyan",
												value: regAddress,
												onChange: (e) => setRegAddress(e.target.value),
												className: "h-10 rounded-xl border-white/10 bg-white/5 pl-10 text-sm"
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
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), " Saving New Account..."]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), " Create & Register New Account"]
										})
									})
								]
							})
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { UserLoginRegister as component, getCurrentUser, getRegisteredAccounts, saveCurrentUser };
