import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$8 } from "./login-CAyqzBQd.mjs";
import { t as CartProvider } from "./cart-qRuWGf-q.mjs";
import { n as Route$9 } from "./login-Dn4VTafF.mjs";
import { t as AppShell } from "./app-shell-BaaGiUhA.mjs";
import { t as Route$10 } from "./menu-BN76RJVP.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DODyOQue.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-WLWYbC-P.css";
function reportLovableError(error, context) {
	console.error("Application error", context, error);
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "FoodFun · Online Food Delivery" },
			{
				name: "description",
				content: "Order from top restaurants with FoodFun. Multi-hotel single cart, live tracking, rewards, group ordering & 1-click delivery."
			},
			{
				name: "author",
				content: "FoodFun"
			},
			{
				property: "og:title",
				content: "FoodFun · Online Food Delivery"
			},
			{
				property: "og:description",
				content: "Order Pizza, Biryani, Burgers & more online."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) })
	});
}
var $$splitComponentImporter$6 = () => import("./routes-BWg5CuFf.mjs");
var Route$6 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./checkout-C4KmpZQs.mjs");
var Route$5 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Checkout · FoodFun" }, {
		name: "description",
		content: "Complete your food order with Razorpay test mode payment on FoodFun."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./offers-BOX2lOqE.mjs");
var Route$4 = createFileRoute("/offers")({
	head: () => ({ meta: [{ title: "Offers · FoodFun" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./orders-VKTUQ_OZ.mjs");
var Route$3 = createFileRoute("/orders")({
	head: () => ({ meta: [{ title: "Live Orders & Tracking · FoodFun" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./profile-Cg_Uoo1f.mjs");
var Route$2 = createFileRoute("/profile")({
	head: () => ({ meta: [{ title: "Profile · FoodFun" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./rewards-B_KsaTWd.mjs");
var Route$1 = createFileRoute("/rewards")({
	head: () => ({ meta: [{ title: "Rewards · FoodFun" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./dashboard-CQNlPYSV.mjs");
var Route = createFileRoute("/hotel/dashboard")({
	head: () => ({ meta: [{ title: "Hotel Partner Dashboard · FoodFun" }, {
		name: "description",
		content: "Manage hotel partner orders, revenue & live stock inventory."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	CheckoutRoute: Route$5.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$7
	}),
	LoginRoute: Route$8.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$7
	}),
	MenuRoute: Route$10.update({
		id: "/menu",
		path: "/menu",
		getParentRoute: () => Route$7
	}),
	OffersRoute: Route$4.update({
		id: "/offers",
		path: "/offers",
		getParentRoute: () => Route$7
	}),
	OrdersRoute: Route$3.update({
		id: "/orders",
		path: "/orders",
		getParentRoute: () => Route$7
	}),
	ProfileRoute: Route$2.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => Route$7
	}),
	RewardsRoute: Route$1.update({
		id: "/rewards",
		path: "/rewards",
		getParentRoute: () => Route$7
	}),
	HotelDashboardRoute: Route.update({
		id: "/hotel/dashboard",
		path: "/hotel/dashboard",
		getParentRoute: () => Route$7
	}),
	HotelLoginRoute: Route$9.update({
		id: "/hotel/login",
		path: "/hotel/login",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
