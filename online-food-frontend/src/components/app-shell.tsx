import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Flame, MapPin, Search, ShoppingBag, Sparkles, User, LogOut, LogIn, Trophy, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart, inr } from "@/lib/cart";
import { getCurrentUser, CustomerUser } from "@/routes/login";
import { DeliveryChatBot } from "@/components/delivery-chat-bot";
import { RewardsModal } from "@/components/rewards-modal";
import { GroupOrderModal } from "@/components/group-order-modal";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { count, setOpen } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Currently logged-in user state
  const [user, setUser] = useState<CustomerUser | null>(null);

  // Modals state
  const [showRewards, setShowRewards] = useState(false);
  const [showGroupRoom, setShowGroupRoom] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("online_food_current_user");
    }
    setUser(null);
    toast.info("Logged out successfully.");
    navigate({ to: "/login" });
  };

  const nav = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/offers", label: "Offers" },
    { to: "/rewards", label: "Rewards" },
    { to: "/orders", label: "Orders" },
    ...(!user ? [{ to: "/login", label: "User Login" }] : []),
    { to: "/hotel/login", label: "Hotel Login" },
  ];

  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "var(--gradient-mesh)" }}
      />
      <header className="sticky top-0 z-40">
        <div className="glass border-b border-white/10">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
            <Link to="/" className="flex items-center gap-2">
              <div
                className="grid h-9 w-9 place-items-center rounded-xl shadow-glow"
                style={{ background: "var(--gradient-sunset)" }}
              >
                <Flame className="h-5 w-5 text-[oklch(0.16_0.03_265)]" />
              </div>
              <div className="text-xl font-black tracking-tight">
                Food <span className="gradient-text">Fusion</span>
              </div>
            </Link>

            <div className="ml-4 hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground md:flex">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-foreground">Kalyan</span>
              <span className="opacity-60">· Maharashtra (421 306)</span>
            </div>

            <nav className="ml-auto hidden items-center gap-1 lg:flex">
              {nav.map((n) => {
                const active = pathname === n.to;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      active ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-2 lg:ml-2">
              {/* Dynamic User Profile or Logout Button */}
              {user ? (
                <div className="flex items-center gap-1.5">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-white/10 transition-colors"
                  >
                    <div
                      className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-black"
                      style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                    >
                      {user.fullName.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline max-w-[100px] truncate">{user.fullName}</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    title="Logout"
                    className="h-8 w-8 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link to="/login" title="User Login">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              )}

              {/* 🎡 Spin & Win Rewards Button */}
              <button
                onClick={() => setShowRewards(true)}
                title="Spin & Win Rewards"
                className="hidden sm:flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition-colors cursor-pointer"
              >
                <Trophy className="h-4 w-4 animate-bounce text-amber-400" />
                <span>Spin & Win</span>
              </button>

              {/* 👥 Group Order Room Button */}
              <button
                onClick={() => setShowGroupRoom(true)}
                title="Group Order Room"
                className="hidden sm:flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition-colors cursor-pointer"
              >
                <Users className="h-4 w-4 text-primary" />
                <span>Group Order</span>
              </button>

              {/* Animated Cart Button */}
              <button
                onClick={() => setOpen(true)}
                className={`relative flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-all duration-300 cursor-pointer ${
                  count > 0 ? "scale-105" : "hover:scale-105"
                }`}
                style={{ background: "var(--gradient-sunset)" }}
              >
                <ShoppingBag className="h-4 w-4 text-[oklch(0.16_0.03_265)]" />
                <span className="hidden sm:inline text-[oklch(0.16_0.03_265)] font-black">Cart</span>
                {count > 0 && (
                  <span className="relative flex h-5 min-w-5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative grid h-5 min-w-5 place-items-center rounded-full bg-background px-1.5 text-xs font-black text-primary shadow-md">
                      {count}
                    </span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <SiteFooter />
      <CartDrawer onOpenGroupRoom={() => setShowGroupRoom(true)} onOpenRewards={() => setShowRewards(true)} />
      <DeliveryChatBot />
      <RewardsModal open={showRewards} onOpenChange={setShowRewards} />
      <GroupOrderModal open={showGroupRoom} onOpenChange={setShowGroupRoom} />
    </div>
  );
}

function CartDrawer({ onOpenGroupRoom, onOpenRewards }: { onOpenGroupRoom?: () => void; onOpenRewards?: () => void }) {
  const { items, setQty, remove, subtotal, gst, delivery, deliverySavings, uniqueRestaurants, isMultiRestaurant, total, open, setOpen } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full border-l border-white/10 bg-[color:var(--surface)] text-foreground sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between text-foreground">
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" /> Your Cart
            </span>
            {isMultiRestaurant && (
              <span className="rounded-full bg-primary/20 border border-primary/40 px-2.5 py-0.5 text-[10px] font-black text-primary">
                Multi-Hotel Order
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Quick Action Shortcuts inside Cart */}
        <div className="mt-2 flex gap-2">
          {onOpenGroupRoom && (
            <button
              onClick={() => { setOpen(false); onOpenGroupRoom(); }}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition-colors cursor-pointer"
            >
              <Users className="h-3.5 w-3.5" /> Group Order
            </button>
          )}
          {onOpenRewards && (
            <button
              onClick={() => { setOpen(false); onOpenRewards(); }}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 py-1.5 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition-colors cursor-pointer"
            >
              <Trophy className="h-3.5 w-3.5" /> Spin & Win
            </button>
          )}
        </div>

        <div className="mt-4 flex h-[calc(100vh-7.5rem)] flex-col">
          {/* MULTI-HOTEL COMBO BANNER */}
          {isMultiRestaurant && (
            <div className="mb-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400 font-semibold space-y-1">
              <div className="flex items-center justify-between font-bold text-foreground">
                <span className="flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-emerald-400" /> Multi-Hotel Combo Cart Active!
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 font-bold">
                  Saved {inr(deliverySavings)}
                </span>
              </div>
              <div className="text-[11px] text-muted-foreground">
                Ordering from <span className="font-bold text-white">{uniqueRestaurants.join(" + ")}</span> in 1 combined single order!
              </div>
            </div>
          )}

          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            {items.length === 0 && (
              <div className="mt-24 text-center text-muted-foreground">
                <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary" />
                Your cart is empty. Add something delicious!
              </div>
            )}
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-2xl bg-white/5 p-3 border border-white/5">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <div className="truncate font-semibold text-sm text-foreground">{item.name}</div>
                      {item.restaurantName && (
                        <div className="text-[10px] font-bold text-secondary mt-0.5">
                          📍 {item.restaurantName}
                        </div>
                      )}
                    </div>
                    <button onClick={() => remove(item.id)} className="text-xs text-muted-foreground hover:text-rose-400">✕</button>
                  </div>
                  <div className="mt-1 text-xs font-bold text-primary">{inr(item.price)}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1 text-xs border border-white/5">
                      <button onClick={() => setQty(item.id, item.qty - 1)} className="px-1 font-bold hover:text-primary">-</button>
                      <span className="font-bold text-foreground">{item.qty}</span>
                      <button onClick={() => setQty(item.id, item.qty + 1)} className="px-1 font-bold hover:text-primary">+</button>
                    </div>
                    <div className="text-xs font-bold text-foreground">{inr(item.price * item.qty)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <div className="space-y-3 border-t border-white/10 pt-4">
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
                <div className="flex justify-between"><span>GST (5%)</span><span>{inr(gst)}</span></div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? "FREE" : isMultiRestaurant ? `${inr(delivery)} (Combined)` : inr(delivery)}</span>
                </div>
                {deliverySavings > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Multi-Hotel Delivery Savings</span>
                    <span>-{inr(deliverySavings)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-foreground pt-1 border-t border-white/10">
                  <span>Total</span><span className="text-primary">{inr(total)}</span>
                </div>
              </div>
              <Button
                onClick={() => {
                  const currentUser = getCurrentUser();
                  setOpen(false);
                  if (!currentUser) {
                    toast.error("Please login to your account before checking out!", {
                      description: "Redirecting to login page...",
                    });
                    navigate({ to: "/login" });
                  } else {
                    navigate({ to: "/checkout" });
                  }
                }}
                className="w-full h-11 rounded-xl text-sm font-bold shadow-glow cursor-pointer"
                style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
              >
                Proceed to Checkout ({inr(total)})
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function VegDot({ veg }: { veg: boolean }) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
      style={{ background: veg ? "var(--veg)" : "var(--nonveg)" }}
    />
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40 py-8 text-xs text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <Flame className="h-4 w-4 text-primary" /> Food Fusion Delivery System
        </div>
        <div>© 2026 Food Fusion. All rights reserved.</div>
      </div>
    </footer>
  );
}
