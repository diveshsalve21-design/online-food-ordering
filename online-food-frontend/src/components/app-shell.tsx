import { Link, useRouterState } from "@tanstack/react-router";
import { Flame, MapPin, Search, ShoppingBag, Sparkles, User, Building2 } from "lucide-react";
import { useCart, inr } from "@/lib/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/offers", label: "Offers" },
  { to: "/rewards", label: "Rewards" },
  { to: "/orders", label: "Orders" },
  { to: "/login", label: "User Login" },
  { to: "/hotel/login", label: "Hotel Login" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { count, setOpen } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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
              <div className="text-lg font-black tracking-tight">
                Online Food <span className="gradient-text">Ordering System</span>
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
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link to="/profile"><User className="h-5 w-5" /></Link>
              </Button>
              <button
                onClick={() => setOpen(true)}
                className="relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-primary-foreground shadow-glow transition hover:brightness-110"
                style={{ background: "var(--gradient-sunset)" }}
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {count > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-background px-1 text-xs font-bold text-primary">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <SiteFooter />
      <CartDrawer />
    </div>
  );
}

function CartDrawer() {
  const { items, setQty, remove, subtotal, gst, delivery, total, open, setOpen } = useCart();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full border-l border-white/10 bg-[color:var(--surface)] text-foreground sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <ShoppingBag className="h-5 w-5 text-primary" /> Your Cart
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex h-[calc(100vh-8rem)] flex-col">
          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            {items.length === 0 && (
              <div className="mt-24 text-center text-muted-foreground">
                <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary" />
                Your cart is empty. Add something delicious!
              </div>
            )}
            {items.map((i) => (
              <div key={i.id} className="glass flex gap-3 rounded-2xl p-3">
                <img src={i.image} alt={i.name} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <VegDot veg={i.veg} />
                    <div className="truncate text-sm font-semibold">{i.name}</div>
                  </div>
                  <div className="mt-1 text-sm text-primary">{inr(i.price * i.qty)}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => setQty(i.id, i.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full bg-white/10">−</button>
                    <span className="w-6 text-center text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full bg-white/10">+</button>
                    <button onClick={() => remove(i.id)} className="ml-auto text-xs text-muted-foreground hover:text-destructive">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <div className="glass-strong mt-4 space-y-2 rounded-2xl p-4">
              <Row label="Subtotal" value={inr(subtotal)} />
              <Row label="GST (5%)" value={inr(gst)} />
              <Row label="Delivery" value={delivery === 0 ? "FREE" : inr(delivery)} valueClass={delivery === 0 ? "text-veg" : ""} />
              <Separator className="my-2 bg-white/10" />
              <Row label="Total" value={inr(total)} bold />
              <Button className="mt-2 w-full rounded-xl text-base" style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }} asChild>
                <Link to="/checkout" onClick={() => setOpen(false)}>Checkout</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value, bold, valueClass = "" }: { label: string; value: string; bold?: boolean; valueClass?: string }) {
  return (
    <div className={`flex items-center justify-between text-sm ${bold ? "text-base font-bold" : "text-muted-foreground"}`}>
      <span>{label}</span>
      <span className={`${bold ? "text-foreground" : ""} ${valueClass}`}>{value}</span>
    </div>
  );
}

export function VegDot({ veg }: { veg: boolean }) {
  return (
    <span
      aria-label={veg ? "Veg" : "Non-veg"}
      className="grid h-4 w-4 shrink-0 place-items-center rounded border"
      style={{ borderColor: veg ? "var(--veg)" : "var(--nonveg)" }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: veg ? "var(--veg)" : "var(--nonveg)" }} />
    </span>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[color:var(--surface)]/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "var(--gradient-sunset)" }}>
              <Flame className="h-5 w-5 text-[oklch(0.16_0.03_265)]" />
            </div>
            <div className="text-lg font-black">Online Food <span className="gradient-text">Ordering System</span></div>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Craft-forward food delivery. Discover restaurants, plan meals with AI, earn rewards.
          </p>
        </div>
        <FooterCol title="Support" links={[{ label: "Privacy Policy", to: "#" }, { label: "Terms", to: "#" }, { label: "FAQs", to: "#" }, { label: "Hotel Partner Login", to: "/hotel/login" }]} />
        <div>
          <div className="text-sm font-semibold">Newsletter</div>
          <p className="mt-2 text-xs text-muted-foreground">Weekly drops, offers & new spots.</p>
          <form className="mt-3 flex gap-2">
            <Input placeholder="you@fusion.in" className="rounded-full border-white/10 bg-white/5" />
            <Button size="sm" className="rounded-full" style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}>Join</Button>
          </form>
          <div className="mt-4 flex gap-2 text-xs text-muted-foreground">
            <Search className="h-4 w-4" /> Available in 40+ Indian cities
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FoodFusion. All rights reserved.
      </div>
    </footer>
  );
}
function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="hover:text-foreground">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
