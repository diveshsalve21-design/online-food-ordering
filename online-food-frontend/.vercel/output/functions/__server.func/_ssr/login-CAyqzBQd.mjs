import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CAyqzBQd.js
var $$splitComponentImporter = () => import("./login-CZCiSdgx.mjs");
var Route = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "User Login & Register · Online Food Ordering System" }, {
		name: "description",
		content: "Real user registration and login portal with local storage persistence."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var CURRENT_USER_KEY = "online_food_current_user";
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
//#endregion
export { getCurrentUser as n, Route as t };
