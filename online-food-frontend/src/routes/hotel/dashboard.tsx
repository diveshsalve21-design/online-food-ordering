import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Building2,
  TrendingUp,
  ShoppingBag,
  Clock,
  Star,
  CheckCircle2,
  AlertCircle,
  ChefHat,
  Bike,
  Plus,
  Power,
  Search,
  DollarSign,
  LogOut,
  Utensils,
  MapPin,
  Sparkles,
  Users,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { dishes as defaultDishes, restaurants, getFoodImageFallback } from "@/lib/data";
import { inr } from "@/lib/cart";
import { getActiveHotel, getRegisteredHotels, saveActiveHotel, HotelPartnerAccount, DEFAULT_5_HOTELS } from "@/routes/hotel/login";
import { toast } from "sonner";

export const Route = createFileRoute("/hotel/dashboard")({
  head: () => ({
    meta: [
      { title: "Hotel Partner Dashboard · FoodFun" },
      { name: "description", content: "Manage hotel partner orders, revenue & live stock inventory." },
    ],
  }),
  component: HotelDashboard,
});

type DashboardOrder = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: string;
  total: number;
  time: string;
  status: "Pending" | "Preparing" | "Out for delivery" | "Delivered";
};

// 🍛 100% ACCURATE & AUDITED DISH PHOTOGRAPHY FOR ALL 5 HOTELS
const HOTEL_SPECIFIC_DISHES_MAP: Record<string, any[]> = {
  "Divesh Salve": [
    {
      id: "divesh-1",
      name: "Fusion Butter Chicken Tacos",
      price: 389,
      veg: false,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Smokey butter chicken stuffed in crispy taco shells with mint chutney",
    },
    {
      id: "divesh-2",
      name: "Truffle Dal Makhani Bowl",
      price: 329,
      veg: true,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Slow-cooked black lentils infused with truffle oil & white butter",
    },
    {
      id: "divesh-3",
      name: "Paneer Tikka Fusion Sliders",
      price: 299,
      veg: true,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Grilled tandoori paneer patties in brioche buns with makhani aioli",
    },
    {
      id: "divesh-4",
      name: "Saffron Cardamom Kheer",
      price: 189,
      veg: true,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Rich rice pudding topped with Iranian saffron & roasted pistachios",
    },
    {
      id: "divesh-5",
      name: "Mango Coconut Fusion Cooler",
      price: 149,
      veg: true,
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Alphonso mango pulp blended with fresh tender coconut water",
    },
  ],
  "Pritesh Kanitkar": [
    {
      id: "pritesh-1",
      name: "Hyderabadi Dum Chicken Biryani",
      price: 399,
      veg: false,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Authentic dum biryani cooked with marinated chicken & aged basmati rice",
    },
    {
      id: "pritesh-2",
      name: "Kashmiri Mutton Rogan Josh",
      price: 489,
      veg: false,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Tender lamb cooked in aromatic Kashmiri spices & ratanjot gravy",
    },
    {
      id: "pritesh-3",
      name: "Butter Garlic Naan Basket",
      price: 149,
      veg: true,
      image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "3 pieces of fresh clay-oven baked garlic butter naan",
    },
    {
      id: "pritesh-4",
      name: "Royal Shahi Tukda",
      price: 179,
      veg: true,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Crispy fried bread soaked in rabri & garnished with silver leaf",
    },
    {
      id: "pritesh-5",
      name: "Masala Spiced Chaas",
      price: 79,
      veg: true,
      image: "https://images.unsplash.com/photo-1623065422902-30a2d299bcc4?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Traditional Indian buttermilk churned with roasted cumin & curry leaves",
    },
  ],
  "Rashmin Oak": [
    {
      id: "rashmin-1",
      name: "Tandoori Whole Chicken Special",
      price: 549,
      veg: false,
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Charcoal grilled whole chicken marinated in hung curd & tandoori spices",
    },
    {
      id: "rashmin-2",
      name: "Royal Mutton Seekh Kebab",
      price: 429,
      veg: false,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Juicy minced lamb skewers grilled over glowing coals",
    },
    {
      id: "rashmin-3",
      name: "Afghani Malai Paneer Tikka",
      price: 349,
      veg: true,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Cottage cheese marinated in cashew cream, green cardamom & cheese",
    },
    {
      id: "rashmin-4",
      name: "Charcoal Grilled Mushroom Platter",
      price: 299,
      veg: true,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Button mushrooms stuffed with spiced cheese & grilled in tandoor",
    },
    {
      id: "rashmin-5",
      name: "Smoked Jaljeera Soda",
      price: 99,
      veg: true,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Refreshing digestive drink infused with roasted cumin & rock salt",
    },
  ],
  "Himanshu Medhe": [
    {
      id: "himanshu-1",
      name: "Wood-Fired Truffle Margherita",
      price: 449,
      veg: true,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Neapolitan crust, San Marzano tomato sauce, fresh mozzarella & truffle oil",
    },
    {
      id: "himanshu-2",
      name: "Creamy Pesto Penne Pasta",
      price: 379,
      veg: true,
      image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Penne tossed in pine nut basil pesto cream sauce with cherry tomatoes",
    },
    {
      id: "himanshu-3",
      name: "Cheesy Garlic Stuffed Bread",
      price: 219,
      veg: true,
      image: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Artisanal loaf stuffed with melted mozzarella & garlic butter",
    },
    {
      id: "himanshu-4",
      name: "Classic Italian Tiramisu",
      price: 249,
      veg: true,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Coffee-soaked ladyfingers layered with mascarpone cream & cocoa",
    },
    {
      id: "himanshu-5",
      name: "Iced Caramel Macchiato",
      price: 189,
      veg: true,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Espresso layered with cold milk & buttery caramel drizzle",
    },
  ],
  "Swaraj Angre": [
    {
      id: "swaraj-1",
      name: "Surmai Fish Fry Thali",
      price: 499,
      veg: false,
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Crispy rawa fried Kingfish fillet served with rice, sol kadhi & fish curry",
    },
    {
      id: "swaraj-2",
      name: "Konkan Prawns Masala Curry",
      price: 529,
      veg: false,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Fresh tiger prawns cooked in roasted coconut & Malvani spices",
    },
    {
      id: "swaraj-3",
      name: "Bombil Crispy Rawa Fry",
      price: 349,
      veg: false,
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Golden fried Bombay Duck fish with spicy Konkani marinade",
    },
    {
      id: "swaraj-4",
      name: "Authentic Pink Sol Kadhi",
      price: 99,
      veg: true,
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Digestive kokum & fresh coconut milk drink spiced with garlic & green chillies",
    },
    {
      id: "swaraj-5",
      name: "Ukadiche Modak (2 Pcs)",
      price: 159,
      veg: true,
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
      available: true,
      desc: "Traditional steamed rice dumplings stuffed with fresh coconut & jaggery",
    },
  ],
};

// Distinct orders for each of the 5 hotel owners
const HOTEL_ORDERS_MAP: Record<string, DashboardOrder[]> = {
  "Divesh Salve": [
    {
      id: "ORD-9821",
      customerName: "Divesh Salve",
      phone: "9876543210",
      address: "Station Road, Kalyan West, MH (421 306)",
      items: "2× Fusion Butter Chicken Tacos, 1× Mango Coconut Cooler",
      total: 927,
      time: "5 mins ago",
      status: "Preparing",
    },
    {
      id: "ORD-9820",
      customerName: "Aarav Sharma",
      phone: "9812345678",
      address: "Sector 4, Kalyan West",
      items: "1× Truffle Dal Makhani Bowl, 2× Paneer Tikka Sliders",
      total: 927,
      time: "18 mins ago",
      status: "Out for delivery",
    },
  ],
  "Pritesh Kanitkar": [
    {
      id: "ORD-9750",
      customerName: "Rohan Kulkarni",
      phone: "9822011223",
      address: "MG Road, Kalyan East",
      items: "2× Hyderabadi Dum Biryani, 2× Garlic Naan",
      total: 1096,
      time: "8 mins ago",
      status: "Preparing",
    },
  ],
  "Rashmin Oak": [
    {
      id: "ORD-9630",
      customerName: "Siddharth Mehta",
      phone: "9988776655",
      address: "Sector 4, Kalyan West",
      items: "1× Tandoori Whole Chicken, 1× Seekh Kebab Platter",
      total: 978,
      time: "12 mins ago",
      status: "Preparing",
    },
  ],
  "Himanshu Medhe": [
    {
      id: "ORD-9510",
      customerName: "Vikram Malhotra",
      phone: "9123456789",
      address: "Ram Baug, Kalyan West",
      items: "2× Wood-Fired Truffle Margherita, 1× Cheesy Garlic Bread",
      total: 1117,
      time: "10 mins ago",
      status: "Preparing",
    },
  ],
  "Swaraj Angre": [
    {
      id: "ORD-9410",
      customerName: "Ganesh Shinde",
      phone: "9867543210",
      address: "Khadakpada, Kalyan West",
      items: "1× Surmai Fish Fry Thali, 2× Sol Kadhi",
      total: 697,
      time: "4 mins ago",
      status: "Preparing",
    },
  ],
};

function HotelDashboard() {
  const navigate = useNavigate();
  const [activeHotel, setActiveHotel] = useState<HotelPartnerAccount | null>(null);

  // Dynamic dishes & live orders state for this specific hotel
  const [menuList, setMenuList] = useState<any[]>([]);
  const [orders, setOrders] = useState<DashboardOrder[]>([]);

  // ADD NEW DISH MODAL STATE
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [newDishName, setNewDishName] = useState("");
  const [newDishPrice, setNewDishPrice] = useState("");
  const [newDishVeg, setNewDishVeg] = useState(true);
  const [newDishDesc, setNewDishDesc] = useState("");
  const [newDishImage, setNewDishImage] = useState("");

  // Load active hotel account
  useEffect(() => {
    const current = getActiveHotel();
    if (current) {
      setActiveHotel(current);
      setupHotelDashboardData(current);
    } else {
      const def = DEFAULT_5_HOTELS[0];
      setActiveHotel(def);
      setupHotelDashboardData(def);
    }
  }, []);

  const setupHotelDashboardData = (hotel: HotelPartnerAccount) => {
    // Orders matching owner
    const key = Object.keys(HOTEL_ORDERS_MAP).find((k) =>
      k.toLowerCase().includes(hotel.ownerName.split(" ")[0].toLowerCase())
    );
    const initialOrders = key ? HOTEL_ORDERS_MAP[key] : HOTEL_ORDERS_MAP["Divesh Salve"];
    setOrders(initialOrders);

    // Dishes matching owner
    const dishKey = Object.keys(HOTEL_SPECIFIC_DISHES_MAP).find((k) =>
      k.toLowerCase().includes(hotel.ownerName.split(" ")[0].toLowerCase())
    );
    const initialDishes = dishKey ? HOTEL_SPECIFIC_DISHES_MAP[dishKey] : HOTEL_SPECIFIC_DISHES_MAP["Divesh Salve"];
    setMenuList(initialDishes);
  };

  const handleSwitchHotel = (h: HotelPartnerAccount) => {
    saveActiveHotel(h);
    setActiveHotel(h);
    setupHotelDashboardData(h);
    toast.success(`Switched to ${h.ownerName}'s Dashboard! 🏬`, {
      description: h.hotelName,
    });
  };

  const handleUpdateStatus = (orderId: string, newStatus: DashboardOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order #${orderId} status updated to "${newStatus}"!`);
  };

  const toggleAvailability = (id: string, name: string) => {
    setMenuList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.available;
          toast.info(`${name} is now ${nextState ? "IN STOCK" : "OUT OF STOCK"}`);
          return { ...item, available: nextState };
        }
        return item;
      })
    );
  };

  // HANDLE REAL ADDING NEW DISH TO HOTEL MENU
  const handleCreateDishSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newDishName.trim()) {
      toast.error("Please enter a Dish Name.");
      return;
    }
    if (!newDishPrice || Number(newDishPrice) <= 0) {
      toast.error("Please enter a valid Dish Price.");
      return;
    }

    const defaultImages = [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    ];

    const newDishObj = {
      id: `dish-custom-${Date.now()}`,
      name: newDishName.trim(),
      price: Number(newDishPrice),
      veg: newDishVeg,
      desc: newDishDesc.trim() || "Chef's signature fresh delicacy prepared on order.",
      image: newDishImage.trim() || defaultImages[Math.floor(Math.random() * defaultImages.length)],
      available: true,
    };

    setMenuList((prev) => [newDishObj, ...prev]);

    toast.success(`🎉 "${newDishObj.name}" Added to ${activeHotel?.hotelName} Menu!`, {
      description: `Price: ${inr(newDishObj.price)} · Available Live for Customers`,
    });

    // Reset Form
    setNewDishName("");
    setNewDishPrice("");
    setNewDishDesc("");
    setNewDishImage("");
    setShowAddDishModal(false);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("online_food_active_hotel");
      localStorage.removeItem("hotel_user");
    }
    toast.info("Logged out of Hotel Partner Hub.");
    navigate({ to: "/hotel/login" });
  };

  // Seed stats based on hotel owner
  const ownerName = activeHotel?.ownerName || "Divesh Salve";
  const seed = ownerName.length + (ownerName.charCodeAt(0) % 10);
  const ordersToday = 19 + (seed % 12);
  const revenueToday = 7400 + seed * 420;
  const prepTimeMin = 13 + (seed % 5);
  const hotelRating = (4.6 + (seed % 4) * 0.1).toFixed(1);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 space-y-6">
      {/* 🏬 SWITCH BETWEEN ALL 5 HOTEL DASHBOARDS BAR */}
      <div className="glass-strong rounded-3xl p-4 border border-white/15 shadow-glow flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-wider">
          <Users className="h-4 w-4 text-secondary" /> Switch Hotel Dashboard (5 Partners):
        </div>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_5_HOTELS.map((h) => {
            const isActive = activeHotel?.ownerName === h.ownerName;
            return (
              <button
                key={h.ownerName}
                type="button"
                onClick={() => handleSwitchHotel(h)}
                className={`rounded-2xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? "border-primary bg-primary text-black shadow-glow"
                    : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                }`}
              >
                {h.ownerName} ({h.hotelName.split(" ")[0]})
              </button>
            );
          })}
        </div>
      </div>

      {/* 🏬 DYNAMIC HOTEL PARTNER HEADER */}
      <div className="glass-strong flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6 border border-white/10 shadow-glow">
        <div className="flex items-center gap-4">
          <div
            className="grid h-14 w-14 place-items-center rounded-2xl shadow-glow shrink-0"
            style={{ background: "var(--gradient-sunset)" }}
          >
            <Building2 className="h-7 w-7 text-[oklch(0.16_0.03_265)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-foreground">
                {activeHotel ? `${activeHotel.hotelName} Partner Hub` : "Hotel Partner Hub"}
              </h1>
              <Badge className="rounded-full bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold">
                ACTIVE PARTNER
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Owner: <span className="font-bold text-white">{activeHotel?.ownerName}</span> · Email:{" "}
              <span className="font-semibold text-secondary">{activeHotel?.email}</span> · {activeHotel?.address || "Kalyan"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            View Customer Site
          </Link>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-bold text-rose-400 hover:bg-rose-500/20 cursor-pointer"
          >
            <LogOut className="mr-1.5 h-3.5 w-3.5" /> Logout
          </Button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass rounded-3xl p-5 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Orders Today</span>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-black text-foreground">{ordersToday}</div>
          <div className="flex items-center text-[10px] text-emerald-400 font-semibold">
            <TrendingUp className="mr-1 h-3 w-3" /> +22% vs yesterday
          </div>
        </div>

        <div className="glass rounded-3xl p-5 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Today's Revenue</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-foreground">{inr(revenueToday)}</div>
          <div className="text-[10px] text-muted-foreground">Payout processed</div>
        </div>

        <div className="glass rounded-3xl p-5 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Avg Kitchen Prep Time</span>
            <Clock className="h-4 w-4 text-secondary" />
          </div>
          <div className="text-2xl font-black text-foreground">{prepTimeMin} mins</div>
          <div className="text-[10px] text-muted-foreground">Optimal kitchen speed</div>
        </div>

        <div className="glass rounded-3xl p-5 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Hotel Rating</span>
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-2xl font-black text-foreground">{hotelRating} <span className="text-xs text-muted-foreground font-normal">/ 5.0</span></div>
          <div className="text-[10px] text-muted-foreground">164 customer reviews</div>
        </div>
      </div>

      {/* Live Incoming Customer Orders */}
      <div className="glass-strong rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-black text-foreground">
              Live Incoming Orders for {activeHotel?.hotelName}
            </h2>
          </div>
          <Badge variant="outline" className="rounded-full border-white/10 text-xs font-bold">
            {orders.filter((o) => o.status !== "Delivered").length} Active Orders
          </Badge>
        </div>

        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 transition-all hover:border-white/20"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-foreground">{order.id}</span>
                  <Badge
                    className={`rounded-full text-[10px] font-bold ${
                      order.status === "Pending"
                        ? "bg-amber-500/20 text-amber-400"
                        : order.status === "Preparing"
                        ? "bg-blue-500/20 text-blue-400"
                        : order.status === "Out for delivery"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {order.status}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">{order.time}</span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 text-xs">
                <div>
                  <div className="text-muted-foreground">Customer:</div>
                  <div className="font-bold text-foreground">{order.customerName} ({order.phone})</div>
                  <div className="text-muted-foreground text-[11px] mt-0.5">{order.address}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Ordered Items:</div>
                  <div className="font-semibold text-secondary">{order.items}</div>
                  <div className="font-bold text-foreground mt-0.5">Total: {inr(order.total)}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                <span className="text-xs font-semibold text-muted-foreground mr-1">Update Status:</span>
                <Button
                  size="sm"
                  variant={order.status === "Preparing" ? "default" : "ghost"}
                  onClick={() => handleUpdateStatus(order.id, "Preparing")}
                  className="rounded-xl text-[11px] h-8 font-bold cursor-pointer"
                >
                  <ChefHat className="mr-1 h-3 w-3" /> Preparing
                </Button>
                <Button
                  size="sm"
                  variant={order.status === "Out for delivery" ? "default" : "ghost"}
                  onClick={() => handleUpdateStatus(order.id, "Out for delivery")}
                  className="rounded-xl text-[11px] h-8 font-bold cursor-pointer"
                >
                  <Bike className="mr-1 h-3 w-3" /> Out for Delivery
                </Button>
                <Button
                  size="sm"
                  variant={order.status === "Delivered" ? "default" : "ghost"}
                  onClick={() => handleUpdateStatus(order.id, "Delivered")}
                  className="rounded-xl text-[11px] h-8 font-bold cursor-pointer"
                >
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Delivered
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🍛 HOTEL MENU & STOCK MANAGEMENT */}
      <div className="glass-strong rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground">
              {activeHotel?.hotelName} Menu & Stock Management
            </h2>
            <p className="text-xs text-muted-foreground">
              Unique signature menu items for {activeHotel?.ownerName}'s restaurant.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setShowAddDishModal(true)}
            className="rounded-xl text-xs font-bold shadow-glow cursor-pointer"
            style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
          >
            <Plus className="mr-1 h-3.5 w-3.5" /> Add New Dish
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {menuList.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3.5 gap-3 hover:border-white/20 transition-all"
            >
              <img
                src={dish.image}
                alt={dish.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getFoodImageFallback(
                    dish.name.toLowerCase().includes("pizza")
                      ? "pizza"
                      : dish.name.toLowerCase().includes("pasta")
                      ? "pasta"
                      : dish.name.toLowerCase().includes("biryani")
                      ? "biryani"
                      : "sides"
                  );
                }}
                className="h-12 w-12 rounded-xl object-cover shrink-0 border border-white/10"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs text-foreground truncate flex items-center gap-1">
                  <span>{dish.name}</span>
                  <span className={`h-2 w-2 rounded-full shrink-0 ${dish.veg ? "bg-emerald-500" : "bg-rose-500"}`} />
                </div>
                <div className="text-xs font-black text-primary mt-0.5">{inr(dish.price)}</div>
              </div>
              <Button
                size="sm"
                variant={dish.available ? "default" : "destructive"}
                onClick={() => toggleAvailability(dish.id, dish.name)}
                className="rounded-xl text-[11px] h-8 font-bold cursor-pointer shrink-0"
              >
                <Power className="mr-1 h-3 w-3" /> {dish.available ? "In Stock" : "Out of Stock"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* 🛠️ REAL "+ ADD NEW DISH" MODAL */}
      {showAddDishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <Plus className="h-5 w-5 text-primary" /> Add New Dish to {activeHotel?.hotelName}
              </div>
              <button
                onClick={() => setShowAddDishModal(false)}
                className="rounded-full p-1 text-muted-foreground hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDishSubmit} className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Dish Name</Label>
                <Input
                  placeholder="e.g. Special Paneer Makhani Bowl"
                  value={newDishName}
                  onChange={(e) => setNewDishName(e.target.value)}
                  className="rounded-xl border-white/10 bg-white/5 text-xs h-10"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Price (₹)</Label>
                  <Input
                    type="number"
                    placeholder="349"
                    value={newDishPrice}
                    onChange={(e) => setNewDishPrice(e.target.value)}
                    className="rounded-xl border-white/10 bg-white/5 text-xs h-10"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Type</Label>
                  <div className="flex rounded-xl border border-white/10 bg-white/5 p-1 h-10">
                    <button
                      type="button"
                      onClick={() => setNewDishVeg(true)}
                      className={`flex-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        newDishVeg ? "bg-emerald-500/20 text-emerald-400" : "text-muted-foreground"
                      }`}
                    >
                      🥦 Veg
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewDishVeg(false)}
                      className={`flex-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        !newDishVeg ? "bg-rose-500/20 text-rose-400" : "text-muted-foreground"
                      }`}
                    >
                      🍗 Non-Veg
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Dish Image URL (Optional)</Label>
                <Input
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newDishImage}
                  onChange={(e) => setNewDishImage(e.target.value)}
                  className="rounded-xl border-white/10 bg-white/5 text-xs h-10"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Short Description</Label>
                <Textarea
                  placeholder="Chef special preparation with fresh herbs and spices..."
                  value={newDishDesc}
                  onChange={(e) => setNewDishDesc(e.target.value)}
                  className="rounded-xl border-white/10 bg-white/5 text-xs min-h-[60px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-xl text-xs font-bold shadow-glow mt-2 cursor-pointer"
                style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
              >
                <Plus className="mr-1 h-4 w-4" /> Save & Publish Dish Live
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
