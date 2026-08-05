import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Filter, MapPin, Search, Star, Timer } from "lucide-react";
import { categories, dishes, getFoodImageFallback, getRestaurant, getRestaurantDishes, restaurants } from "@/lib/data";
import { useCart, inr } from "@/lib/cart";
import { VegDot } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>) => ({ hotel: typeof search.hotel === "string" ? search.hotel : undefined }),
  head: () => ({ meta: [{ title: "Menu · FoodFusion" }, { name: "description", content: "Browse menus from restaurants near you." }] }),
  component: MenuPage,
});

function MenuPage() {
  const { hotel } = Route.useSearch();
  const [mode, setMode] = useState<"all" | "veg" | "nonveg">("all");
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");
  const { add } = useCart();
  const selectedHotel = getRestaurant(hotel);
  const menuDishes = selectedHotel ? getRestaurantDishes(selectedHotel.id) : dishes;

  useEffect(() => {
    setMode("all");
    setCat("all");
    setQ("");
  }, [hotel]);

  const list = useMemo(() => menuDishes.filter((dish) => {
    if (mode === "veg" && !dish.veg) return false;
    if (mode === "nonveg" && dish.veg) return false;
    if (cat !== "all" && dish.category !== cat) return false;
    return !q || dish.name.toLowerCase().includes(q.toLowerCase());
  }), [mode, cat, q, menuDishes]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      <div className="glass-strong rounded-3xl p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <h1 className="text-2xl font-black">{selectedHotel ? selectedHotel.name : "Explore all hotel menus"}</h1>
            <p className="mt-1 text-xs text-muted-foreground">{selectedHotel ? `${selectedHotel.cuisine} · ${selectedHotel.time} · ${selectedHotel.distance}` : "Choose a hotel, then add its favourites to your cart."}</p>
          </div>
          {selectedHotel && <span className="ml-auto flex items-center gap-1 rounded-full bg-[color:var(--veg)]/15 px-2 py-1 text-xs font-bold text-[color:var(--veg)]"><Star className="h-3 w-3 fill-current" /> {selectedHotel.rating}</span>}
          <Tabs value={mode} onValueChange={(value) => setMode(value as typeof mode)} className={selectedHotel ? "" : "ml-auto"}>
            <TabsList className="rounded-full bg-white/5">
              <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All</TabsTrigger>
              <TabsTrigger value="veg" className="rounded-full data-[state=active]:bg-[color:var(--veg)] data-[state=active]:text-black">🥦 Veg</TabsTrigger>
              <TabsTrigger value="nonveg" className="rounded-full data-[state=active]:bg-[color:var(--nonveg)] data-[state=active]:text-white">🍗 Non-Veg</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
          <HotelChip label="All hotels" active={!selectedHotel} />
          {restaurants.map((restaurant) => <HotelChip key={restaurant.id} hotelId={restaurant.id} label={restaurant.name} active={selectedHotel?.id === restaurant.id} />)}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-full bg-white/5 px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search this menu…" className="h-10 border-0 bg-transparent focus-visible:ring-0" />
          </div>
          <Button variant="ghost" className="rounded-full border border-white/10"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
        </div>
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
          <CatChip label="All" active={cat === "all"} onClick={() => setCat("all")} />
          {categories.map((category) => <CatChip key={category.key} label={`${category.emoji} ${category.label}`} active={cat === category.key} onClick={() => setCat(category.key)} />)}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((dish) => (
          <article key={dish.id} className="card-lift card-lift-hover overflow-hidden rounded-3xl glass">
            <div className="relative aspect-[16/10]">
              <img src={dish.image} alt={dish.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = getFoodImageFallback(dish.category); }} className="h-full w-full object-cover" loading="lazy" width={800} height={500} />
              <span className="absolute left-3 top-3 grid h-6 w-6 place-items-center rounded-md bg-black/50 backdrop-blur"><VegDot veg={dish.veg} /></span>
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs backdrop-blur"><Timer className="h-3 w-3" /> {dish.time}m</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2"><h3 className="text-base font-bold">{dish.name}</h3><div className="whitespace-nowrap font-black text-primary">{inr(dish.price)}</div></div>
              {!selectedHotel && <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {getRestaurant(dish.restaurantId)?.name}</div>}
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{dish.desc}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{dish.calories} kcal</span>
                <div className="flex gap-2"><Button size="sm" variant="ghost" className="h-8 rounded-full border border-white/10">Customize</Button><Button size="sm" onClick={() => add({ id: dish.id, name: dish.name, price: dish.price, image: dish.image, veg: dish.veg })} className="h-8 rounded-full" style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}>Add</Button></div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 && <div className="mt-10 rounded-3xl glass p-10 text-center text-muted-foreground">No dishes match these filters. Try another hotel or category.</div>}
    </div>
  );
}

function HotelChip({ hotelId, label, active }: { hotelId?: string; label: string; active: boolean }) {
  return <Link to="/menu" search={hotelId ? { hotel: hotelId } : {}} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition ${active ? "text-primary-foreground shadow-glow" : "bg-white/5 text-muted-foreground hover:text-foreground"}`} style={active ? { background: "var(--gradient-sunset)" } : undefined}>{label}</Link>;
}

function CatChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition ${active ? "text-primary-foreground shadow-glow" : "bg-white/5 text-muted-foreground hover:text-foreground"}`} style={active ? { background: "var(--gradient-sunset)" } : undefined}>{label}</button>;
}
