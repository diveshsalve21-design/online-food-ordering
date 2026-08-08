import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
require_jsx_runtime();
var $$splitComponentImporter = () => import("./menu-RKy2sHnj.mjs");
var Route = createFileRoute("/menu")({
	validateSearch: (search) => ({
		hotel: typeof search.hotel === "string" ? search.hotel : void 0,
		cat: typeof search.cat === "string" ? search.cat : void 0,
		q: typeof search.q === "string" ? search.q : void 0
	}),
	head: () => ({ meta: [{ title: "Menu · Online Food Ordering System" }, {
		name: "description",
		content: "Browse menus from restaurants near you."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
