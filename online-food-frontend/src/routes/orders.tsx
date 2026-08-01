import { createFileRoute } from "@tanstack/react-router";
import { Bike, CheckCircle2, ChefHat, MapPin, PackageCheck, Timer, Utensils } from "lucide-react";
import { restaurants } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders · FoodFusion" }] }),
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
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <div className="glass-strong rounded-3xl p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-black">Live order · #FF10248</h1>
          <span className="rounded-full bg-[color:var(--veg)]/15 px-3 py-1 text-xs font-bold text-[color:var(--veg)]">On the way</span>
          <span className="ml-auto inline-flex items-center gap-1 text-sm text-muted-foreground"><Timer className="h-4 w-4" /> ETA 12 min</span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className={`grid h-9 w-9 place-items-center rounded-full ${s.done ? "text-primary-foreground shadow-glow" : s.active ? "bg-[color:var(--surface-2)] ring-2 ring-primary" : "bg-white/5 text-muted-foreground"}`} style={s.done ? { background: "var(--gradient-sunset)" } : undefined}>
                  <s.icon className="h-4 w-4" />
                </span>
                <div>
                  <div className={`text-sm font-semibold ${s.done || s.active ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.done ? "Completed" : s.active ? "In progress" : "Pending"}</div>
                </div>
              </li>
            ))}
          </ol>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, oklch(0.72 0.19 45 / 0.35), transparent 45%), radial-gradient(circle at 70% 60%, oklch(0.55 0.22 300 / 0.3), transparent 50%), linear-gradient(120deg, rgba(255,255,255,0.05) 25%, transparent 25% 50%, rgba(255,255,255,0.05) 50% 75%, transparent 75%)", backgroundSize: "auto, auto, 40px 40px" }} />
            <div className="relative grid h-full min-h-[280px] place-items-center">
              <div className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl shadow-glow" style={{ background: "var(--gradient-sunset)" }}>
                  <Bike className="h-7 w-7 text-[oklch(0.16_0.03_265)]" style={{ animation: "float-y 2.5s ease-in-out infinite" }} />
                </div>
                <div className="mt-3 text-sm font-semibold">Rahul is on the way</div>
                <div className="text-xs text-muted-foreground">2.1 km · Bajaj Pulsar</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-12 mb-4 text-xl font-black">Order history</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {restaurants.slice(0, 4).map((r) => (
          <div key={r.id} className="glass flex gap-3 rounded-2xl p-4">
            <img src={r.image} alt="" className="h-16 w-16 rounded-xl object-cover" loading="lazy" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{r.name}</div>
              <div className="text-xs text-muted-foreground">3 items · ₹{r.price + 120}</div>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="ghost" className="h-7 rounded-full border border-white/10 text-xs">Repeat</Button>
                <Button size="sm" variant="ghost" className="h-7 rounded-full border border-white/10 text-xs">Invoice</Button>
                <Button size="sm" variant="ghost" className="h-7 rounded-full border border-white/10 text-xs">Rate</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
