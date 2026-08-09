import { createFileRoute } from "@tanstack/react-router";
import {
  Bike,
  CheckCircle2,
  ChefHat,
  MapPin,
  PackageCheck,
  Timer,
  Utensils,
  RefreshCw,
  FileText,
  Star,
  Download,
  X,
  Send,
  Printer,
  ShoppingBag,
  Clock,
  PhoneCall,
  Navigation,
  Sparkles,
  Radio,
  Navigation2,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { restaurants, dishes } from "@/lib/data";
import { useCart, inr, PlacedOrder, getStoredOrders } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Live Orders & Tracking · Food Fusion" }] }),
  component: Orders,
});

// MULTIPLE DELIVERY RIDERS POOL
const RIDERS = [
  { name: "Naman Sharma", vehicle: "Bajaj Pulsar (MH 05 EV 9821)", rating: "4.9 ★", phone: "+91 98201 44102", distance: "1.8 km away" },
  { name: "Rashmin Salve", vehicle: "TVS Apache (MH 04 AB 3140)", rating: "4.8 ★", phone: "+91 98192 11093", distance: "2.3 km away" },
  { name: "Vikram Singh", vehicle: "Hero Splendor (MH 02 CK 8812)", rating: "4.9 ★", phone: "+91 97693 55214", distance: "1.2 km away" },
  { name: "Sameer Khan", vehicle: "Honda Activa (MH 05 DF 4109)", rating: "4.7 ★", phone: "+91 99871 66380", distance: "3.1 km away" },
  { name: "Amit Deshmukh", vehicle: "Ather Electric 450X (MH 03 EV 2210)", rating: "5.0 ★", phone: "+91 98334 77192", distance: "0.9 km away" },
];

function getRiderForOrder(orderId: string) {
  let hash = 0;
  for (let i = 0; i < orderId.length; i++) {
    hash = (hash + orderId.charCodeAt(i)) % RIDERS.length;
  }
  return RIDERS[hash];
}

const steps = [
  { icon: CheckCircle2, label: "Order Confirmed", time: "12:40 PM", done: true },
  { icon: Utensils, label: "Kitchen Preparing", time: "12:43 PM", done: true },
  { icon: ChefHat, label: "Food Freshly Cooked", time: "12:52 PM", done: true },
  { icon: PackageCheck, label: "Rider Picked Up", time: "01:00 PM", done: true },
  { icon: Bike, label: "Out for Delivery", time: "Now", done: false, active: true },
  { icon: MapPin, label: "Delivered at Doorstep", time: "Est. 01:14 PM", done: false },
];

function Orders() {
  const { add } = useCart();
  const [realOrders, setRealOrders] = useState<PlacedOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | "on-the-way" | "delivered">("all");

  // Status Overrides State (Persisted in LocalStorage)
  const [statusOverrides, setStatusOverrides] = useState<Record<string, "On the way" | "Delivered">>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem("online_food_order_status_overrides");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const handleToggleOrderStatus = (orderId: string, currentStatus: "On the way" | "Delivered") => {
    const nextStatus = currentStatus === "On the way" ? "Delivered" : "On the way";
    const updated = { ...statusOverrides, [orderId]: nextStatus };
    setStatusOverrides(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("online_food_order_status_overrides", JSON.stringify(updated));
    }
    toast.success(`Order #${orderId} status updated to "${nextStatus}"!`, {
      description: nextStatus === "Delivered" ? "Order marked as successfully delivered to doorstep 🟢" : "Order marked as live on the way 🟡",
    });
  };

  // Live Timer State (Countdown in seconds: starts at 840s = 14 mins)
  const [etaSeconds, setEtaSeconds] = useState(840);

  // Load real placed orders from localStorage
  useEffect(() => {
    setRealOrders(getStoredOrders());
  }, []);

  // Live countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatEta = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s < 10 ? "0" : ""}${s}s`;
  };

  // Invoice Modal State
  const [selectedInvoice, setSelectedInvoice] = useState<PlacedOrder | {
    id: string;
    customerName: string;
    address: string;
    date: string;
    items: { name: string; qty: number; price: number }[];
    subtotal: number;
    gst: number;
    delivery: number;
    discount: number;
    total: number;
    paymentMethod: string;
    status: string;
  } | null>(null);

  // Rating Modal State
  const [selectedRating, setSelectedRating] = useState<{
    restaurantName: string;
    image: string;
  } | null>(null);
  const [starCount, setStarCount] = useState(5);
  const [hoverStar, setHoverStar] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Tasty Food", "Fast Delivery"]);
  const [feedbackText, setFeedbackText] = useState("");

  const handleRepeatPlacedOrder = (orderItems: { id: string; name: string; price: number; image: string; veg: boolean; qty: number }[]) => {
    orderItems.forEach((item) => {
      for (let i = 0; i < item.qty; i++) {
        add({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          veg: item.veg,
        });
      }
    });
    toast.success(`Repeat Order Added! (${orderItems.length} items copied to cart)`);
  };

  const handleRepeatMockOrder = (restaurantName: string) => {
    dishes.slice(0, 2).forEach((dish) => {
      add({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        veg: dish.veg,
      });
    });
    toast.success(`Order from ${restaurantName} repeated! Items added to your cart.`);
  };

  const openRatingModal = (restaurantName: string, image: string) => {
    setSelectedRating({ restaurantName, image });
    setStarCount(5);
    setFeedbackText("");
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleCallRider = (name: string, phone: string) => {
    const cleanPhone = phone.replace(/\s+/g, "");
    toast.info(`Dialing ${name} (${phone})...`);
    if (typeof window !== "undefined") {
      window.location.href = `tel:${cleanPhone}`;
    }
  };

  const handleShareGps = (riderName: string, orderId?: string) => {
    const shareText = `🚀 Tracking my FoodFusion order #${orderId || "FF-8921"} delivered by ${riderName}! Live status: On the way.`;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "http://localhost:8080/orders";

    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: "Live Food Order Tracking",
          text: shareText,
          url: shareUrl,
        })
        .then(() => toast.success("Live GPS Tracking link shared successfully!"))
        .catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast.success("Live GPS Tracking Link Copied to Clipboard! 📋", {
        description: "Share it on WhatsApp or SMS to track live location.",
      });
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
    }
  };

  const handleSubmitRating = () => {
    if (!selectedRating) return;
    toast.success(`Rating submitted for ${selectedRating.restaurantName}! ⭐ ${starCount}/5`, {
      description: "Thank you for your valuable feedback.",
    });
    setSelectedRating(null);
  };

  const handlePrintInvoice = () => {
    toast.success("Downloading Tax Invoice PDF...", {
      description: `Invoice #${selectedInvoice?.id}`,
    });
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const activeLiveOrder = realOrders.length > 0 ? realOrders[0] : null;
  const activeRider = activeLiveOrder ? getRiderForOrder(activeLiveOrder.id) : RIDERS[0];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 space-y-8">
      {/* 🚀 ANIMATED LIVE ORDER TRACKER DASHBOARD */}
      <div className="glass-strong relative overflow-hidden rounded-3xl p-6 border border-white/15 shadow-2xl space-y-6">
        {/* Animated Glow Background Accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-pulse"
        />

        {/* Top Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-foreground">
                  Live Order #{activeLiveOrder ? activeLiveOrder.id : "FF-8921"}
                </h1>
                <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 animate-pulse">
                  <Radio className="h-3 w-3 animate-spin text-emerald-400" /> ON THE WAY
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Expected arrival at <span className="font-semibold text-foreground">{activeLiveOrder?.address || "Kalyan West"}</span>
              </p>
            </div>
          </div>

          {/* Animated ETA Countdown Card */}
          <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-2.5 shadow-glow">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-primary">
              <Timer className="h-5 w-5 animate-bounce" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Estimated Delivery</div>
              <div className="text-lg font-black text-primary font-mono tracking-tight">{formatEta(etaSeconds)}</div>
            </div>
          </div>
        </div>

        {/* Order Details Banner */}
        {activeLiveOrder && (
          <div className="rounded-2xl bg-white/5 p-3.5 text-xs flex flex-wrap justify-between items-center gap-3 border border-white/10">
            <div>
              <span className="text-muted-foreground">Customer: </span>
              <span className="font-bold text-foreground">{activeLiveOrder.customerName} ({activeLiveOrder.phone})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Dishes: </span>
              <span className="font-bold text-secondary truncate max-w-md">
                {activeLiveOrder.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
              </span>
            </div>
            <div className="font-bold text-primary text-sm">{inr(activeLiveOrder.total)}</div>
          </div>
        )}

        {/* Live Delivery Progress Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Vertical Step Timeline */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Navigation className="h-4 w-4 text-primary" /> Delivery Milestones
            </div>
            <ol className="space-y-3.5 relative border-l-2 border-primary/30 ml-4 pl-4">
              {steps.map((s, i) => (
                <li key={i} className="relative flex items-center justify-between gap-3">
                  {/* Glowing Node Dot */}
                  <span
                    className={`absolute -left-[27px] grid h-7 w-7 place-items-center rounded-full text-xs transition-all ${
                      s.done
                        ? "bg-primary text-black font-bold shadow-glow"
                        : s.active
                        ? "bg-emerald-500 text-black font-bold ring-4 ring-emerald-500/30 animate-pulse"
                        : "bg-white/10 text-muted-foreground border border-white/10"
                    }`}
                  >
                    <s.icon className="h-3.5 w-3.5" />
                  </span>

                  <div>
                    <div className={`text-sm font-bold ${s.done || s.active ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.label}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {s.done ? `Completed · ${s.time}` : s.active ? "In Progress right now" : s.time}
                    </div>
                  </div>

                  {s.active && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 animate-pulse border border-emerald-500/30">
                      LIVE
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* 🛵 ANIMATED MAP RADAR ROUTE CANVAS */}
          <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-white/15 bg-slate-950 p-6 flex flex-col justify-between shadow-2xl">
            {/* Grid Pattern Background */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Glowing Radar Sonar Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="h-48 w-48 rounded-full border border-primary/20 animate-ping opacity-40" />
              <div className="absolute inset-0 h-64 w-64 -translate-x-8 -translate-y-8 rounded-full border border-secondary/20 animate-pulse opacity-30" />
            </div>

            {/* SVG Animated Delivery Route & Moving Motorcycle */}
            <div className="absolute inset-0 p-6 pointer-events-none flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                <path
                  d="M 50 150 Q 200 40 350 150"
                  stroke="url(#routeGradient)"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Top Map Location Badges */}
            <div className="relative z-10 flex justify-between items-center text-xs font-semibold">
              <div className="flex items-center gap-2 rounded-xl bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 shadow-lg">
                <Utensils className="h-3.5 w-3.5 text-amber-400" />
                <span>Food Fusion Hub</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 shadow-lg">
                <MapPin className="h-3.5 w-3.5 text-emerald-400 animate-bounce" />
                <span>Your Home ({activeLiveOrder?.city || "Kalyan"})</span>
              </div>
            </div>

            {/* Center Animated Delivery Driver Card */}
            <div className="relative z-10 my-auto text-center">
              <div className="inline-block relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 opacity-75 blur-md animate-pulse" />
                <div
                  className="relative grid h-16 w-16 place-items-center rounded-2xl shadow-glow border border-white/30"
                  style={{ background: "var(--gradient-sunset)" }}
                >
                  <Bike className="h-8 w-8 text-[oklch(0.16_0.03_265)] animate-bounce" />
                </div>
              </div>

              <div className="mt-3">
                <div className="text-base font-black text-white flex items-center justify-center gap-1.5">
                  {activeRider.name} <Sparkles className="h-4 w-4 text-amber-400" />
                </div>
                <div className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1 mt-0.5">
                  <Navigation2 className="h-3 w-3 animate-spin" /> {activeRider.distance} · Arriving in 14 mins ({activeRider.rating})
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">Vehicle: {activeRider.vehicle}</div>
              </div>
            </div>

            {/* Bottom Rider Contact Bar */}
            <div className="relative z-10 flex gap-2 pt-2">
              <Button
                size="sm"
                onClick={() => handleCallRider(activeRider.name, activeRider.phone)}
                className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs h-9 cursor-pointer shadow-glow"
              >
                <PhoneCall className="mr-1.5 h-3.5 w-3.5" /> Call Rider ({activeRider.name.split(" ")[0]})
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleShareGps(activeRider.name, activeLiveOrder?.id)}
                className="rounded-xl border border-white/15 bg-white/10 text-white hover:bg-white/20 text-xs h-9 cursor-pointer"
              >
                Share GPS Track
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 📜 ORDER HISTORY SECTION */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-black text-foreground flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" /> Order History
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Track live deliveries and view past completed orders</p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 text-xs">
            <button
              onClick={() => setStatusFilter("all")}
              className={`rounded-full px-3 py-1 font-bold transition-all cursor-pointer ${
                statusFilter === "all" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-white"
              }`}
            >
              All Orders ({realOrders.length})
            </button>
            <button
              onClick={() => setStatusFilter("on-the-way")}
              className={`rounded-full px-3 py-1 font-bold transition-all cursor-pointer ${
                statusFilter === "on-the-way" ? "bg-amber-500 text-black shadow-sm" : "text-muted-foreground hover:text-white"
              }`}
            >
              On the Way 🟡
            </button>
            <button
              onClick={() => setStatusFilter("delivered")}
              className={`rounded-full px-3 py-1 font-bold transition-all cursor-pointer ${
                statusFilter === "delivered" ? "bg-emerald-500 text-black shadow-sm" : "text-muted-foreground hover:text-white"
              }`}
            >
              Delivered 🟢
            </button>
          </div>
        </div>

        {/* Real Placed Orders List */}
        {realOrders.length > 0 ? (
          <div className="space-y-4 mb-6">
            {realOrders
              .filter((order, idx) => {
                const effectiveStatus = statusOverrides[order.id] || (idx === 0 ? "On the way" : "Delivered");
                if (statusFilter === "on-the-way") return effectiveStatus === "On the way";
                if (statusFilter === "delivered") return effectiveStatus === "Delivered";
                return true;
              })
              .map((order, idx) => {
                const assignedRider = getRiderForOrder(order.id);
                // Calculate dynamic delivery status (index 0 is active on the way, index 1+ are delivered)
                const effectiveStatus = statusOverrides[order.id] || (idx === 0 ? "On the way" : "Delivered");
                const isDelivered = effectiveStatus === "Delivered";

                // Delivery duration math (e.g. 18 to 26 mins)
                const hash = (order.id.charCodeAt(order.id.length - 1) || 5) % 8;
                const durationMins = 18 + hash * 2;

                return (
                  <div
                    key={order.id}
                    className={`glass-strong rounded-3xl p-5 border transition-all space-y-4 ${
                      isDelivered ? "border-emerald-500/25 bg-emerald-950/10" : "border-amber-500/35 shadow-glow bg-amber-950/10"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">#{order.id}</span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wide flex items-center gap-1 ${
                              isDelivered ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse"
                            }`}
                          >
                            {isDelivered ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Delivered
                              </>
                            ) : (
                              <>
                                <Bike className="h-3 w-3 text-amber-400 animate-bounce" /> On the way
                              </>
                            )}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                          <Clock className="h-3.5 w-3.5 text-primary" /> {order.date}
                          <span>·</span>
                          <MapPin className="h-3.5 w-3.5 text-secondary" /> {order.address}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-black text-primary">{inr(order.total)}</div>
                        <div className="text-[11px] text-muted-foreground">{order.paymentMethod}</div>
                      </div>
                    </div>

                    {/* ⏱️ DELIVERY DURATION & TIME STAMP BANNER */}
                    <div
                      className={`rounded-2xl p-3 border flex flex-wrap items-center justify-between gap-2 text-xs font-semibold ${
                        isDelivered
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                          : "bg-amber-500/10 border-amber-500/20 text-amber-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4" />
                        <div>
                          <span>Delivery Status: </span>
                          <span className="font-bold text-white">
                            {isDelivered ? `Delivered in ${durationMins} mins` : "Out for Delivery · Est. 14 mins"}
                          </span>
                          <span className="opacity-75 ml-1.5">({order.date})</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold opacity-80">
                        {isDelivered ? "Order Completed ✅" : "Rider Approaching 🛵"}
                      </span>
                    </div>

                    {/* Assigned Rider Info Pill */}
                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Bike className="h-4 w-4 text-secondary" />
                        <div>
                          <span className="text-muted-foreground">Assigned Rider: </span>
                          <span className="font-bold text-foreground">{assignedRider.name}</span>
                          <span className="text-muted-foreground ml-1.5">({assignedRider.vehicle})</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCallRider(assignedRider.name, assignedRider.phone)}
                        className="h-7 px-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold hover:bg-emerald-500/20 cursor-pointer"
                      >
                        <PhoneCall className="mr-1 h-3 w-3" /> Call {assignedRider.name.split(" ")[0]}
                      </Button>
                    </div>

                    {/* Items Purchased List */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ordered Items:</div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5 border border-white/5">
                            <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-foreground truncate">{item.name}</div>
                              <div className="text-[11px] text-muted-foreground">
                                {item.qty} × {inr(item.price)}
                              </div>
                            </div>
                            <div className="text-xs font-bold text-primary">{inr(item.qty * item.price)}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Action Buttons */}
                    <div className="flex flex-wrap items-center justify-end gap-2 border-t border-white/10 pt-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedInvoice(order)}
                        className="h-8 rounded-xl border border-white/10 text-xs font-semibold hover:bg-white/10 cursor-pointer"
                      >
                        <FileText className="mr-1.5 h-3.5 w-3.5 text-primary" /> Tax Invoice PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openRatingModal("FoodFusion Kitchen", order.items[0]?.image || "")}
                        className="h-8 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 cursor-pointer"
                      >
                        <Star className="mr-1.5 h-3.5 w-3.5 fill-amber-400" /> Rate 5 Stars
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleRepeatPlacedOrder(order.items)}
                        className="h-8 rounded-xl text-xs font-bold shadow-glow cursor-pointer"
                        style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                      >
                        <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Repeat Order
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="glass-strong rounded-3xl p-8 text-center border border-white/10 space-y-3">
            <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-bold text-foreground">No Placed Orders Yet</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              You haven't placed any food orders under this account yet. Browse our menu and place a delicious order!
            </p>
          </div>
        )}

        {/* Demo Recent History Cards */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sample Past Deliveries</div>
          <div className="grid gap-4 sm:grid-cols-2">
            {restaurants.slice(0, 2).map((r, idx) => {
              const demoRider = RIDERS[idx % RIDERS.length];
              return (
                <div key={r.id} className="glass rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={r.image} alt={r.name} className="h-12 w-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-sm text-foreground">{r.name}</div>
                      <div className="text-xs text-muted-foreground">Rider: {demoRider.name} ({demoRider.rating})</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleRepeatMockOrder(r.name)}
                    className="rounded-xl text-xs font-bold shadow-glow cursor-pointer shrink-0"
                    style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                  >
                    <RefreshCw className="mr-1 h-3 w-3" /> Reorder
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 📄 TAX INVOICE PDF PREVIEW MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-lg rounded-3xl border border-white/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <FileText className="h-5 w-5 text-primary" />
                <span>Tax Invoice PDF</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  PAID
                </span>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="rounded-full p-1 text-muted-foreground hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Printable Invoice Sheet */}
            <div className="rounded-2xl bg-white text-black p-5 space-y-3 text-xs shadow-inner">
              <div className="flex justify-between border-b pb-2">
                <div>
                  <h3 className="font-black text-sm text-black uppercase tracking-wider">Online Food Ordering</h3>
                  <div className="text-[10px] text-gray-600">Kalyan West, Maharashtra - 421306</div>
                  <div className="text-[10px] text-gray-600">GSTIN: 27AAAAA0000A1Z5</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-black">INVOICE #{selectedInvoice.id}</div>
                  <div className="text-[10px] text-gray-500">{selectedInvoice.date}</div>
                </div>
              </div>

              <div>
                <div className="font-bold text-gray-700 uppercase text-[10px]">Billed To:</div>
                <div className="font-semibold text-black">{selectedInvoice.customerName}</div>
                <div className="text-[10px] text-gray-600">{selectedInvoice.address}</div>
              </div>

              <div className="border-t border-b py-2 space-y-1">
                <div className="flex justify-between font-bold text-gray-500 text-[10px] uppercase">
                  <span>Item</span>
                  <span>Qty × Price</span>
                </div>
                {selectedInvoice.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between font-medium">
                    <span>{i.name}</span>
                    <span>{i.qty} × ₹{i.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-right text-gray-700">
                <div className="flex justify-between"><span>Subtotal:</span><span>₹{selectedInvoice.subtotal}</span></div>
                <div className="flex justify-between"><span>GST (5%):</span><span>₹{selectedInvoice.gst}</span></div>
                <div className="flex justify-between"><span>Delivery:</span><span>₹{selectedInvoice.delivery}</span></div>
                {selectedInvoice.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount:</span><span>-₹{selectedInvoice.discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-sm text-black border-t pt-1">
                  <span>Grand Total:</span>
                  <span>₹{selectedInvoice.total}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={handlePrintInvoice}
                className="flex-1 h-11 rounded-xl text-xs font-bold shadow-glow cursor-pointer"
                style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
              >
                <Printer className="mr-2 h-4 w-4" /> Print / Save PDF Invoice
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ 5-STAR RATING MODAL */}
      {selectedRating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 shadow-2xl text-center space-y-4">
            <button
              onClick={() => setSelectedRating(null)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={selectedRating.image}
              alt={selectedRating.restaurantName}
              className="mx-auto h-16 w-16 rounded-2xl object-cover shadow-glow"
            />
            <div>
              <h3 className="text-lg font-black text-foreground">{selectedRating.restaurantName}</h3>
              <p className="text-xs text-muted-foreground">How was your food & delivery experience?</p>
            </div>

            {/* Interactive Stars */}
            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setStarCount(star)}
                  onMouseEnter={() => setHoverStar(star)}
                  onMouseLeave={() => setHoverStar(0)}
                  className="transition-transform hover:scale-125 cursor-pointer"
                >
                  <Star
                    className={`h-8 w-8 ${
                      (hoverStar || starCount) >= star
                        ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                        : "text-white/20"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Quick Feedback Tags */}
            <div className="flex flex-wrap justify-center gap-1.5 text-xs">
              {["Tasty Food", "Fast Delivery", "Hot & Fresh", "Good Packaging", "Great Portion"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold border transition-all ${
                    selectedTags.includes(tag)
                      ? "border-primary bg-primary/20 text-primary shadow-glow"
                      : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <Textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write a comment about your order (optional)..."
              className="rounded-xl border-white/10 bg-white/5 text-xs min-h-[70px]"
            />

            <Button
              onClick={handleSubmitRating}
              className="w-full h-11 rounded-xl text-xs font-bold shadow-glow cursor-pointer"
              style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
            >
              <Send className="mr-2 h-4 w-4" /> Submit Review
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
