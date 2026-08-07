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
} from "lucide-react";
import { useState, useEffect } from "react";
import { restaurants, dishes } from "@/lib/data";
import { useCart, inr, PlacedOrder, getStoredOrders } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders · Online Food Ordering System" }] }),
  component: Orders,
});

const steps = [
  { icon: CheckCircle2, label: "Order confirmed", done: true },
  { icon: Utensils, label: "Preparing", done: true },
  { icon: ChefHat, label: "Cooking", done: true },
  { icon: PackageCheck, label: "Picked up", done: true },
  { icon: Bike, label: "Out for delivery", done: false, active: true },
  { icon: MapPin, label: "Delivered", done: false },
];

function Orders() {
  const { add } = useCart();
  const [realOrders, setRealOrders] = useState<PlacedOrder[]>([]);

  // Load real placed orders from localStorage
  useEffect(() => {
    setRealOrders(getStoredOrders());
  }, []);

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

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 space-y-8">
      {/* Live Order Tracker */}
      <div className="glass-strong rounded-3xl p-6 border border-white/10 shadow-glow">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-black text-foreground">
            Live Order · #{activeLiveOrder ? activeLiveOrder.id : "FF10248"}
          </h1>
          <span className="rounded-full bg-[color:var(--veg)]/15 px-3 py-1 text-xs font-bold text-[color:var(--veg)]">
            On the way
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Timer className="h-4 w-4 text-primary" /> ETA 12 min
          </span>
        </div>

        {activeLiveOrder && (
          <div className="mt-3 rounded-xl bg-white/5 p-3 text-xs flex flex-wrap justify-between gap-2 border border-white/5">
            <div>
              <span className="text-muted-foreground">Customer: </span>
              <span className="font-bold text-foreground">{activeLiveOrder.customerName}</span>
              <span className="text-muted-foreground ml-2">Address: </span>
              <span className="text-foreground">{activeLiveOrder.address}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Items: </span>
              <span className="font-bold text-primary">
                {activeLiveOrder.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={i} className="flex items-center gap-3">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full ${
                    s.done
                      ? "text-primary-foreground shadow-glow"
                      : s.active
                      ? "bg-[color:var(--surface-2)] ring-2 ring-primary text-primary"
                      : "bg-white/5 text-muted-foreground"
                  }`}
                  style={s.done ? { background: "var(--gradient-sunset)" } : undefined}
                >
                  <s.icon className="h-4 w-4" />
                </span>
                <div>
                  <div className={`text-sm font-semibold ${s.done || s.active ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {s.done ? "Completed" : s.active ? "In progress" : "Pending"}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, oklch(0.72 0.19 45 / 0.35), transparent 45%), radial-gradient(circle at 70% 60%, oklch(0.55 0.22 300 / 0.3), transparent 50%), linear-gradient(120deg, rgba(255,255,255,0.05) 25%, transparent 25% 50%, rgba(255,255,255,0.05) 50% 75%, transparent 75%)",
                backgroundSize: "auto, auto, 40px 40px",
              }}
            />
            <div className="relative grid h-full min-h-[280px] place-items-center p-6 text-center">
              <div>
                <div
                  className="mx-auto grid h-14 w-14 place-items-center rounded-2xl shadow-glow"
                  style={{ background: "var(--gradient-sunset)" }}
                >
                  <Bike className="h-7 w-7 text-[oklch(0.16_0.03_265)]" style={{ animation: "float-y 2.5s ease-in-out infinite" }} />
                </div>
                <div className="mt-3 text-base font-bold text-foreground">Rahul is on the way</div>
                <div className="text-xs text-muted-foreground">2.1 km away · Bajaj Pulsar (KA 01 EV 9821)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" /> Order History
          </h2>
          <span className="text-xs text-muted-foreground">{realOrders.length} Recent Order(s)</span>
        </div>

        {/* Real Placed Orders List */}
        {realOrders.length > 0 && (
          <div className="space-y-4 mb-6">
            {realOrders.map((order) => (
              <div key={order.id} className="glass-strong rounded-3xl p-5 border border-primary/30 shadow-glow space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">#{order.id}</span>
                      <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                      <Clock className="h-3 w-3" /> {order.date}
                      <span>·</span>
                      <MapPin className="h-3 w-3 text-primary" /> {order.address}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-black text-primary">{inr(order.total)}</div>
                    <div className="text-[11px] text-muted-foreground">{order.paymentMethod}</div>
                  </div>
                </div>

                {/* Items Purchased List */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ordered Items:</div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5 border border-white/5">
                        <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                        <div className="min-w-0 flex-1 text-xs">
                          <div className="font-bold text-foreground truncate">{item.name}</div>
                          <div className="text-muted-foreground">Qty: {item.qty} × {inr(item.price)}</div>
                        </div>
                        <div className="font-bold text-secondary text-xs">{inr(item.price * item.qty)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                  <Button
                    size="sm"
                    onClick={() => handleRepeatPlacedOrder(order.items)}
                    className="h-8 rounded-xl text-xs font-semibold gap-1.5 cursor-pointer shadow-glow"
                    style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Repeat Order
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedInvoice(order)}
                    className="h-8 rounded-xl border border-white/15 text-xs text-muted-foreground hover:bg-white/10 hover:text-foreground gap-1.5 cursor-pointer"
                  >
                    <FileText className="h-3.5 w-3.5 text-primary" /> View Tax Invoice
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openRatingModal("Order #" + order.id, order.items[0]?.image || heroImg)}
                    className="h-8 rounded-xl border border-white/15 text-xs text-muted-foreground hover:bg-white/10 hover:text-foreground gap-1.5 cursor-pointer"
                  >
                    <Star className="h-3.5 w-3.5 text-secondary fill-current" /> Rate Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Default Mock Past Orders */}
        <div className="grid gap-4 md:grid-cols-2">
          {restaurants.slice(0, 4).map((r, idx) => {
            const mockId = `8920${idx + 1}`;
            const totalAmount = r.price + 120;
            const mockItems = [
              { name: `${r.name} Special Thali`, qty: 1, price: r.price },
              { name: "Garlic Butter Naan", qty: 2, price: 60 },
            ];

            const mockOrderObj = {
              id: mockId,
              customerName: "Divesh Salve",
              address: "Station Road, Kalyan, MH - 421306",
              date: "06 Aug 2026, 08:30 PM",
              items: mockItems,
              subtotal: r.price + 60,
              gst: 15,
              delivery: 45,
              discount: 0,
              total: totalAmount,
              paymentMethod: "Razorpay (Test Mode)",
              status: "Delivered",
            };

            return (
              <div key={r.id} className="glass flex gap-4 rounded-3xl p-4 border border-white/10">
                <img src={r.image} alt={r.name} className="h-20 w-20 shrink-0 rounded-2xl object-cover" loading="lazy" />
                <div className="min-w-0 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="truncate text-base font-bold text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground">3 items · {inr(totalAmount)}</div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleRepeatMockOrder(r.name)}
                      className="h-8 rounded-xl text-xs font-semibold gap-1.5 cursor-pointer shadow-glow"
                      style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Repeat
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedInvoice(mockOrderObj)}
                      className="h-8 rounded-xl border border-white/15 text-xs text-muted-foreground hover:bg-white/10 hover:text-foreground gap-1.5 cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5 text-primary" /> Invoice
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openRatingModal(r.name, r.image)}
                      className="h-8 rounded-xl border border-white/15 text-xs text-muted-foreground hover:bg-white/10 hover:text-foreground gap-1.5 cursor-pointer"
                    >
                      <Star className="h-3.5 w-3.5 text-secondary fill-current" /> Rate
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tax Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-lg rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">TAX INVOICE RECEIPT</div>
                <h3 className="text-xl font-bold text-foreground">INV-{selectedInvoice.id}</h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer Name:</span>
                <span className="font-bold text-foreground">{selectedInvoice.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Address:</span>
                <span className="text-foreground">{selectedInvoice.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="text-foreground">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-semibold text-accent">{selectedInvoice.paymentMethod}</span>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 space-y-2 border border-white/10 text-xs">
              <div className="flex justify-between text-muted-foreground pb-1 border-b border-white/10 font-semibold">
                <span>Item Breakdown</span>
                <span>Subtotal</span>
              </div>
              {selectedInvoice.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-foreground">
                  <span>{item.qty}× {item.name}</span>
                  <span>{inr(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="flex justify-between text-muted-foreground pt-2 border-t border-white/10">
                <span>GST (5%)</span>
                <span>{inr(selectedInvoice.gst || 15)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span>{selectedInvoice.delivery === 0 ? "FREE" : inr(selectedInvoice.delivery || 35)}</span>
              </div>
              {selectedInvoice.discount > 0 && (
                <div className="flex justify-between text-accent font-semibold">
                  <span>Discount Applied</span>
                  <span>-{inr(selectedInvoice.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm text-foreground pt-2 border-t border-white/10">
                <span>Total Amount Paid</span>
                <span className="text-primary">{inr(selectedInvoice.total)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={handlePrintInvoice}
                className="flex-1 h-11 rounded-xl font-bold gap-2 shadow-glow cursor-pointer"
                style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
              >
                <Printer className="h-4 w-4" /> Download / Print PDF
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedInvoice(null)}
                className="rounded-xl border border-white/10 text-muted-foreground hover:bg-white/10"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Rating & Feedback Modal */}
      {selectedRating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl space-y-5 text-center">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <img src={selectedRating.image} alt="" className="h-10 w-10 rounded-xl object-cover" />
                <h3 className="text-base font-bold text-foreground truncate">{selectedRating.restaurantName}</h3>
              </div>
              <button
                onClick={() => setSelectedRating(null)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">How was your food & delivery experience?</p>
              {/* Interactive Star Selection */}
              <div className="mt-3 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverStar(star)}
                    onMouseLeave={() => setHoverStar(0)}
                    onClick={() => setStarCount(star)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoverStar || starCount)
                          ? "fill-secondary text-secondary drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                          : "text-white/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="mt-1 text-xs font-bold text-secondary">
                {starCount === 5 ? "Excellent 🌟" : starCount === 4 ? "Good 👍" : starCount === 3 ? "Average 👌" : "Poor 👎"}
              </div>
            </div>

            {/* Quick Feedback Tags */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                What did you like?
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Fast Delivery", "Hot & Fresh", "Tasty Food", "Great Packaging", "Polite Driver"].map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full px-3 py-1 border transition-all cursor-pointer ${
                        active
                          ? "border-primary bg-primary/20 text-foreground font-semibold"
                          : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Textarea */}
            <div className="text-left">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                Write a comment (Optional)
              </label>
              <Textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell us what you loved about this order..."
                className="rounded-xl border-white/10 bg-white/5 text-xs min-h-[60px]"
              />
            </div>

            <Button
              onClick={handleSubmitRating}
              className="w-full h-11 rounded-xl font-bold shadow-glow cursor-pointer"
              style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
            >
              <Send className="mr-1.5 h-4 w-4" /> Submit Feedback
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
