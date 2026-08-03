import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, MapPin, Truck } from "lucide-react";
import { useState } from "react";
import { useCart, inr } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout · FoodFusion" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, subtotal, gst, delivery, total, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
        <Card title="Delivery address" icon={<MapPin className="h-4 w-4" />}>
          <div className="grid gap-2 sm:grid-cols-2">
            <Input placeholder="Full name" className="rounded-xl border-white/10 bg-white/5" />
            <Input placeholder="Phone" className="rounded-xl border-white/10 bg-white/5" />
          </div>
          <Input placeholder="Flat / House no." className="rounded-xl border-white/10 bg-white/5" />
          <Input placeholder="Street, Area" className="rounded-xl border-white/10 bg-white/5" />
          <div className="grid gap-2 sm:grid-cols-3">
            <Input placeholder="City" className="rounded-xl border-white/10 bg-white/5" />
            <Input placeholder="State" className="rounded-xl border-white/10 bg-white/5" />
            <Input placeholder="PIN" className="rounded-xl border-white/10 bg-white/5" />
          </div>
          <Textarea placeholder="Delivery instructions (optional)" className="rounded-xl border-white/10 bg-white/5" />
        </Card>

        <Card title="Payment method" icon={<CreditCard className="h-4 w-4" />}>
          <div className="grid gap-2 sm:grid-cols-3">
            {["UPI", "Google Pay", "PhonePe", "Paytm", "Credit / Debit Card", "Cash on Delivery"].map((p) => (
              <label key={p} className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10">
                <input type="radio" name="pay" className="accent-[color:var(--primary)]" defaultChecked={p === "UPI"} />
                {p}
              </label>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="glass-strong rounded-3xl p-5">
          <div className="flex items-center gap-2 text-sm font-semibold"><Truck className="h-4 w-4 text-primary" /> Order summary</div>
          <div className="mt-4 space-y-2 text-sm">
            {items.length === 0 && <div className="text-muted-foreground">Your cart is empty.</div>}
            {items.map((i) => (
              <div key={i.id} className="flex items-center justify-between">
                <span className="truncate text-muted-foreground">{i.qty} × {i.name}</span>
                <span>{inr(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-sm text-muted-foreground">
            <Row l="Subtotal" v={inr(subtotal)} />
            <Row l="GST (5%)" v={inr(gst)} />
            <Row l="Delivery" v={delivery === 0 ? "FREE" : inr(delivery)} />
            <div className="mt-2 flex justify-between text-base font-bold text-foreground">
              <span>Total</span><span>{inr(total)}</span>
            </div>
          </div>
          <Button disabled={items.length === 0 || placed} onClick={() => { clear(); setPlaced(true); }} className="mt-5 w-full rounded-xl" style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}>
            <CheckCircle2 className="mr-2 h-4 w-4" /> Place order
          </Button>
          {placed && <p className="mt-3 text-center text-sm text-[color:var(--veg)]">Order placed! You can track it from Orders.</p>}
        </div>
      </div>
    </div>
  );
}
function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="glass-strong space-y-3 rounded-3xl p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">{icon}{title}</div>
      {children}
    </section>
  );
}
function Row({ l, v }: { l: string; v: string }) {
  return <div className="flex justify-between"><span>{l}</span><span>{v}</span></div>;
}
