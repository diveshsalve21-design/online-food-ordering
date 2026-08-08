import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Dn4VTafF.js
var $$splitComponentImporter = () => import("./login-Dr__0gWm.mjs");
var Route = createFileRoute("/hotel/login")({
	head: () => ({ meta: [{ title: "Hotel Partner Login & Registration · FoodFun" }, {
		name: "description",
		content: "Partner portal for restaurant and hotel partner management on FoodFun."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var DEFAULT_5_HOTELS = [
	{
		hotelName: "Divesh Fusion Kitchen",
		ownerName: "Divesh Salve",
		email: "divesh.salve@foodfusion.com",
		phone: "9876543210",
		cuisine: "Multi-Cuisine · Fusion Special",
		address: "Station Road, Kalyan West",
		city: "Kalyan",
		password: "Divesh@123"
	},
	{
		hotelName: "Pritesh Spice Hub",
		ownerName: "Pritesh Kanitkar",
		email: "pritesh.kanitkar@foodfusion.com",
		phone: "9876543211",
		cuisine: "North Indian · Mughlai",
		address: "MG Road, Kalyan East",
		city: "Kalyan",
		password: "Pritesh@123"
	},
	{
		hotelName: "Rashmin Royal Grill",
		ownerName: "Rashmin Oak",
		email: "rashmin.oak@foodfusion.com",
		phone: "9876543212",
		cuisine: "BBQ & Tandoori Specials",
		address: "Sector 4, Kalyan West",
		city: "Kalyan",
		password: "Rashmin@123"
	},
	{
		hotelName: "Himanshu Bistro & Cafe",
		ownerName: "Himanshu Medhe",
		email: "himanshu.medhe@foodfusion.com",
		phone: "9876543213",
		cuisine: "Italian · Wood-Fired Pizza",
		address: "Ram Baug, Kalyan West",
		city: "Kalyan",
		password: "Himanshu@123"
	},
	{
		hotelName: "Swaraj Coastal Delights",
		ownerName: "Swaraj Angre",
		email: "swaraj.angre@foodfusion.com",
		phone: "9876543214",
		cuisine: "Konkan Seafood · Malvani",
		address: "Khadakpada, Kalyan West",
		city: "Kalyan",
		password: "Swaraj@123"
	}
];
var ACTIVE_HOTEL_KEY = "online_food_active_hotel";
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
//#endregion
export { saveActiveHotel as i, Route as n, getActiveHotel as r, DEFAULT_5_HOTELS as t };
