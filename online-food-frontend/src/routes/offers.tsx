import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/offers")({
  head: () => ({ meta: [{ title: "Offers · FoodFusion" }] }),
  component: Offers,
});

const offers = [
  { t: "Flash Deals", d: "Up to 60% OFF · ends tonight", g: "var(--gradient-sunset)", code: "FLASH60" },
  { t: "Today's Special", d: "Chef's tasting menu at ₹399", g: "var(--gradient-royal)", code: "CHEF399" },
  { t: "Buy 1 Get 1", d: "On all wood-fired pizzas", g: "linear-gradient(135deg, var(--veg), oklch(0.6 0.18 130))", code: "BOGO" },
  { t: "Weekend Combo", d: "2 mains + drink @ ₹499", g: "linear-gradient(135deg, oklch(0.55 0.22 300), oklch(0.72 0.19 45))", code: "WEEKEND" },
  { t: "Festival Feast", d: "Free dessert above ₹599", g: "linear-gradient(135deg, var(--gold), var(--primary))", code: "MITHAI" },
  { t: "Refer & Earn", d: "₹100 for you + friend", g: "var(--gradient-royal)", code: "REFER100" },
];

function Offers() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      <h1 className="text-3xl font-black">All offers</h1>
      <p className="mt-1 text-muted-foreground">Handpicked deals updated every hour.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((o) => (
          <div key={o.code} className="card-lift card-lift-hover overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-glow" style={{ background: o.g }}>
            <div className="text-xs font-semibold opacity-80">{o.t}</div>
            <div className="mt-2 text-2xl font-black leading-tight">{o.d}</div>
            <div className="mt-8 flex items-center justify-between">
              <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-bold tracking-wider">CODE · {o.code}</span>
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
