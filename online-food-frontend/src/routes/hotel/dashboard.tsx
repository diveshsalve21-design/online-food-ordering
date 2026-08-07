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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { dishes as defaultDishes } from "@/lib/data";
import { inr } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/hotel/dashboard")({
  head: () => ({
    meta: [
      { title: "Hotel Partner Dashboard · Online Food Ordering System" },
      { name: "description", content: "Manage live orders, menu items, and earnings." },
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

function HotelDashboard() {
  const navigate = useNavigate();
  const [hotelEmail, setHotelEmail] = useState("hotel@restaurant.com");

  // Load hotel partner user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("hotel_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.email) setHotelEmail(parsed.email);
        } catch (e) {}
      }
    }
  }, []);

  // Hotel Menu State
  const [menuList, setMenuList] = useState(
    defaultDishes.slice(0, 6).map((d) => ({ ...d, available: true }))
  );

  // Incoming Live Orders State
  const [orders, setOrders] = useState<DashboardOrder[]>([
    {
      id: "ORD-9821",
      customerName: "Divesh Salve",
      phone: "9876543210",
      address: "Station Road, Kalyan, MH (421 306)",
      items: "2× Hyderabadi Biryani, 1× Butter Naan",
      total: 620,
      time: "5 mins ago",
      status: "Preparing",
    },
    {
      id: "ORD-9820",
      customerName: "Aarav Sharma",
      phone: "9812345678",
      address: "Sector 4, Kalyan, MH",
      items: "1× Margherita Wood-Fired Pizza",
      total: 399,
      time: "18 mins ago",
      status: "Out for delivery",
    },
    {
      id: "ORD-9819",
      customerName: "Priya Patel",
      phone: "9898989898",
      address: "Kalyan West, MH",
      items: "2× Masala Dosa, 1× Filter Coffee",
      total: 280,
      time: "42 mins ago",
      status: "Delivered",
    },
  ]);

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

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("hotel_user");
    }
    toast.info("Logged out of Hotel Partner Hub.");
    navigate({ to: "/hotel/login" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 space-y-8">
      {/* Top Partner Header */}
      <div className="glass-strong flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6 border border-white/10 shadow-glow">
        <div className="flex items-center gap-4">
          <div
            className="grid h-14 w-14 place-items-center rounded-2xl shadow-glow"
            style={{ background: "var(--gradient-sunset)" }}
          >
            <Building2 className="h-7 w-7 text-[oklch(0.16_0.03_265)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-foreground">Royal Spice Hotel Partner Hub</h1>
              <Badge className="rounded-full bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                ACTIVE
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Logged in as <span className="font-semibold text-secondary">{hotelEmail}</span> · Kalyan Branch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            View Customer Site
          </Link>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-bold text-rose-400 hover:bg-rose-500/20"
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
          <div className="text-3xl font-black text-foreground">24</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="h-3 w-3" /> +18% vs yesterday
          </div>
        </div>

        <div className="glass rounded-3xl p-5 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Today's Revenue</span>
            <DollarSign className="h-4 w-4 text-secondary" />
          </div>
          <div className="text-3xl font-black text-foreground">{inr(8920)}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="h-3 w-3" /> Payout processed
          </div>
        </div>

        <div className="glass rounded-3xl p-5 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Avg Kitchen Prep Time</span>
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div className="text-3xl font-black text-foreground">16 <span className="text-sm font-semibold text-muted-foreground">mins</span></div>
          <div className="text-[11px] text-muted-foreground">Optimal speed</div>
        </div>

        <div className="glass rounded-3xl p-5 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Hotel Rating</span>
            <Star className="h-4 w-4 text-secondary fill-current" />
          </div>
          <div className="text-3xl font-black text-foreground">4.8 <span className="text-sm font-semibold text-muted-foreground">/ 5.0</span></div>
          <div className="text-[11px] text-secondary font-semibold">142 reviews</div>
        </div>
      </div>

      {/* Live Customer Orders Management */}
      <div className="glass-strong rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" /> Live Incoming Customer Orders
          </h2>
          <span className="text-xs text-muted-foreground">{orders.length} Active Orders</span>
        </div>

        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl bg-white/5 p-4 border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-foreground">{o.id}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      o.status === "Preparing"
                        ? "bg-amber-500/20 text-amber-400"
                        : o.status === "Out for delivery"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {o.time}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 text-xs">
                <div>
                  <div className="text-muted-foreground">Customer:</div>
                  <div className="font-bold text-foreground text-sm">{o.customerName} ({o.phone})</div>
                  <div className="text-muted-foreground mt-0.5">{o.address}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Ordered Items:</div>
                  <div className="font-semibold text-secondary text-sm">{o.items}</div>
                  <div className="font-black text-primary text-sm mt-0.5">Total: {inr(o.total)}</div>
                </div>
              </div>

              {/* Status Update Controls */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10 text-xs">
                <span className="text-muted-foreground self-center font-medium">Update Status:</span>
                <Button
                  size="sm"
                  onClick={() => handleUpdateStatus(o.id, "Preparing")}
                  className={`h-7 rounded-lg text-xs font-semibold ${
                    o.status === "Preparing" ? "bg-amber-500 text-black" : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <ChefHat className="mr-1 h-3 w-3" /> Preparing
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleUpdateStatus(o.id, "Out for delivery")}
                  className={`h-7 rounded-lg text-xs font-semibold ${
                    o.status === "Out for delivery" ? "bg-blue-500 text-white" : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Bike className="mr-1 h-3 w-3" /> Out for Delivery
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleUpdateStatus(o.id, "Delivered")}
                  className={`h-7 rounded-lg text-xs font-semibold ${
                    o.status === "Delivered" ? "bg-emerald-500 text-black" : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Delivered
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu & Dish Availability Management */}
      <div className="glass-strong rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-foreground flex items-center gap-2">
              <Utensils className="h-5 w-5 text-secondary" /> Hotel Menu & Stock Management
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Toggle dish availability or update prices live.</p>
          </div>
          <Button
            size="sm"
            onClick={() => toast.success("Dish Editor Opened!", { description: "Add new item modal" })}
            className="rounded-xl font-bold gap-1 shadow-glow"
            style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
          >
            <Plus className="h-4 w-4" /> Add New Dish
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {menuList.map((dish) => (
            <div key={dish.id} className="rounded-2xl bg-white/5 p-3.5 border border-white/10 flex items-center gap-3">
              <img src={dish.image} alt={dish.name} className="h-14 w-14 rounded-xl object-cover" />
              <div className="min-w-0 flex-1 text-xs">
                <div className="font-bold text-foreground truncate text-sm">{dish.name}</div>
                <div className="text-secondary font-bold">{inr(dish.price)}</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${dish.available ? "bg-emerald-400" : "bg-rose-400"}`}
                  />
                  <span className={dish.available ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
                    {dish.available ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleAvailability(dish.id, dish.name)}
                className={`h-8 w-8 p-0 rounded-xl border ${
                  dish.available
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    : "border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                }`}
                title={dish.available ? "Mark as Out of Stock" : "Mark as In Stock"}
              >
                <Power className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
