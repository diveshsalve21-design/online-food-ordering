import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, Search, Timer } from "lucide-react";
import { categories, dishes } from "@/lib/data";
import { useCart, inr } from "@/lib/cart";
import { VegDot } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/menu")({
  head: () => ({ meta: [{ title: "Menu · FoodFusion" }, { name: "description", content: "Browse dishes across categories with veg / non-veg filters." }] }),
  component: MenuPage,
});

function MenuPage() {
  const [mode, setMode] = useState<"all" | "veg" | "nonveg">("all");
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");
  const { add } = useCart();

  const list = useMemo(() => {
    return dishes.filter((d) => {
      if (mode === "veg" && !d.veg) return false;
      if (mode === "nonveg" && d.veg) return false;
      if (cat !== "all" && d.category !== cat) return false;
      if (q && !d.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [mode, cat, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      <div className="glass-strong rounded-3xl p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-black">Explore the menu</h1>
          <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)} className="ml-auto">
            <TabsList className="rounded-full bg-white/5">
              <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All</TabsTrigger>
              <TabsTrigger value="veg" className="rounded-full data-[state=active]:bg-[color:var(--veg)] data-[state=active]:text-black">🥦 Veg</TabsTrigger>
              <TabsTrigger value="nonveg" className="rounded-full data-[state=active]:bg-[color:var(--nonveg)] data-[state=active]:text-white">🍗 Non-Veg</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex flex-1 min-w-[240px] items-center gap-2 rounded-full bg-white/5 px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes…" className="h-10 border-0 bg-transparent focus-visible:ring-0" />
          </div>
          <Button variant="ghost" className="rounded-full border border-white/10"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
        </div>
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
          <CatChip label="All" active={cat === "all"} onClick={() => setCat("all")} />
          {categories.map((c) => (
            <CatChip key={c.key} label={`${c.emoji} ${c.label}`} active={cat === c.key} onClick={() => setCat(c.key)} />
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => (
          <article key={d.id} className="card-lift card-lift-hover overflow-hidden rounded-3xl glass">
            <div className="relative aspect-[16/10]">
              <img src={d.image} alt={d.name} className="h-full w-full object-cover" loading="lazy" width={800} height={500} />
              <span className="absolute left-3 top-3 grid h-6 w-6 place-items-center rounded-md bg-black/50 backdrop-blur"><VegDot veg={d.veg} /></span>
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs backdrop-blur"><Timer className="h-3 w-3" /> {d.time}m</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold">{d.name}</h3>
                <div className="whitespace-nowrap font-black text-primary">{inr(d.price)}</div>
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{d.desc}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{d.calories} kcal</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="rounded-full border border-white/10 h-8">Customize</Button>
                  <Button size="sm" onClick={() => add({ id: d.id, name: d.name, price: d.price, image: d.image, veg: d.veg })} className="h-8 rounded-full" style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}>Add</Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CatChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition ${active ? "text-primary-foreground shadow-glow" : "bg-white/5 text-muted-foreground hover:text-foreground"}`} style={active ? { background: "var(--gradient-sunset)" } : undefined}>
      {label}
    </button>
  );
}
