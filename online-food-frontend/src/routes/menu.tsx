import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Filter, MapPin, Search, Star, Timer, SlidersHorizontal, Check, X, Plus } from "lucide-react";
import { categories, dishes, getFoodImageFallback, getRestaurant, getRestaurantDishes, restaurants } from "@/lib/data";
import { useCart, inr } from "@/lib/cart";
import { VegDot } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>) => ({
    hotel: typeof search.hotel === "string" ? search.hotel : undefined,
    cat: typeof search.cat === "string" ? search.cat : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Menu · Online Food Ordering System" },
      { name: "description", content: "Browse menus from restaurants near you." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const searchParams = Route.useSearch();
  const hotel = searchParams.hotel;
  const initialCat = searchParams.cat || "all";
  const initialQ = searchParams.q || "";

  const [mode, setMode] = useState<"all" | "veg" | "nonveg">("all");
  const [cat, setCat] = useState<string>(initialCat);
  const [q, setQ] = useState(initialQ);
  const { add } = useCart();
  const selectedHotel = getRestaurant(hotel);
  const menuDishes = selectedHotel ? getRestaurantDishes(selectedHotel.id) : dishes;

  // Customization Modal State
  const [customizingDish, setCustomizingDish] = useState<typeof dishes[0] | null>(null);
  const [portion, setPortion] = useState<"regular" | "medium" | "large">("regular");
  const [addons, setAddons] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    setMode("all");
    if (searchParams.cat) setCat(searchParams.cat);
    if (searchParams.q) setQ(searchParams.q);
  }, [hotel, searchParams.cat, searchParams.q]);

  const list = useMemo(() => {
    return menuDishes.filter((dish) => {
      if (mode === "veg" && !dish.veg) return false;
      if (mode === "nonveg" && dish.veg) return false;
      if (cat !== "all" && dish.category !== cat) return false;
      return !q || dish.name.toLowerCase().includes(q.toLowerCase());
    });
  }, [mode, cat, q, menuDishes]);

  const openCustomizeModal = (dish: typeof dishes[0]) => {
    setCustomizingDish(dish);
    setPortion("regular");
    setAddons([]);
    setInstructions("");
  };

  const toggleAddon = (addon: string) => {
    setAddons((prev) => (prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]));
  };

  const getCustomizedPrice = () => {
    if (!customizingDish) return 0;
    let base = customizingDish.price;
    if (portion === "medium") base += 50;
    if (portion === "large") base += 100;
    if (addons.includes("cheese")) base += 30;
    if (addons.includes("sauce")) base += 20;
    if (addons.includes("spice")) base += 15;
    if (addons.includes("butter")) base += 25;
    return base;
  };

  const handleAddCustomizedToCart = () => {
    if (!customizingDish) return;
    const finalPrice = getCustomizedPrice();
    const portionName = portion === "regular" ? "Regular" : portion === "medium" ? "Medium (+₹50)" : "Large (+₹100)";
    const addonNames = addons.map((a) => a.charAt(0).toUpperCase() + a.slice(1)).join(", ");

    const customizedName = `${customizingDish.name} (${portionName}${addonNames ? ", " + addonNames : ""})`;

    add({
      id: `${customizingDish.id}_custom_${Date.now()}`,
      name: customizedName,
      price: finalPrice,
      image: customizingDish.image,
      veg: customizingDish.veg,
    });

    setCustomizingDish(null);
    toast.success(`Added customized "${customizingDish.name}" to cart!`, {
      description: `Total Price: ${inr(finalPrice)}`,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      <div className="glass-strong rounded-3xl p-5 border border-white/10 shadow-soft">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <h1 className="text-2xl font-black text-foreground">
              {selectedHotel ? selectedHotel.name : "Explore all hotel menus"}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedHotel
                ? `${selectedHotel.cuisine} · ${selectedHotel.time} · ${selectedHotel.distance}`
                : "Choose a hotel, then add its favourites to your cart."}
            </p>
          </div>
          {selectedHotel && (
            <span className="ml-auto flex items-center gap-1 rounded-full bg-[color:var(--veg)]/15 px-3 py-1 text-xs font-bold text-[color:var(--veg)]">
              <Star className="h-3.5 w-3.5 fill-current" /> {selectedHotel.rating}
            </span>
          )}
          <Tabs value={mode} onValueChange={(value) => setMode(value as typeof mode)} className={selectedHotel ? "" : "ml-auto"}>
            <TabsList className="rounded-full bg-white/5">
              <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                All
              </TabsTrigger>
              <TabsTrigger value="veg" className="rounded-full data-[state=active]:bg-[color:var(--veg)] data-[state=active]:text-black">
                🥦 Veg
              </TabsTrigger>
              <TabsTrigger value="nonveg" className="rounded-full data-[state=active]:bg-[color:var(--nonveg)] data-[state=active]:text-white">
                🍗 Non-Veg
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
          <HotelChip label="All hotels" active={!selectedHotel} />
          {restaurants.map((restaurant) => (
            <HotelChip key={restaurant.id} hotelId={restaurant.id} label={restaurant.name} active={selectedHotel?.id === restaurant.id} />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-full bg-white/5 px-3 border border-white/5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Search this menu…"
              className="h-10 border-0 bg-transparent focus-visible:ring-0 text-sm"
            />
          </div>
          <Button variant="ghost" className="rounded-full border border-white/10 text-xs">
            <Filter className="mr-2 h-4 w-4 text-primary" /> Filters
          </Button>
        </div>

        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
          <CatChip label="All" active={cat === "all"} onClick={() => setCat("all")} />
          {categories.map((category) => (
            <CatChip
              key={category.key}
              label={`${category.emoji} ${category.label}`}
              active={cat === category.key}
              onClick={() => setCat(category.key)}
            />
          ))}
        </div>
      </div>

      {/* Dish List */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((dish) => (
          <article key={dish.id} className="card-lift card-lift-hover overflow-hidden rounded-3xl glass border border-white/10 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = getFoodImageFallback(dish.category);
                  }}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={800}
                  height={500}
                />
                <span className="absolute left-3 top-3 grid h-6 w-6 place-items-center rounded-md bg-black/50 backdrop-blur">
                  <VegDot veg={dish.veg} />
                </span>
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs backdrop-blur">
                  <Timer className="h-3 w-3" /> {dish.time}m
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-foreground">{dish.name}</h3>
                  <div className="whitespace-nowrap font-black text-primary">{inr(dish.price)}</div>
                </div>
                {!selectedHotel && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary" /> {getRestaurant(dish.restaurantId)?.name}
                  </div>
                )}
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{dish.desc}</p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{dish.calories} kcal</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openCustomizeModal(dish)}
                    className="h-8 rounded-full border border-white/15 text-xs font-semibold hover:bg-white/10 hover:text-foreground"
                  >
                    <SlidersHorizontal className="mr-1 h-3.5 w-3.5 text-primary" /> Customize
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => add({ id: dish.id, name: dish.name, price: dish.price, image: dish.image, veg: dish.veg })}
                    className="h-8 rounded-full font-bold shadow-glow"
                    style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {list.length === 0 && (
        <div className="mt-10 rounded-3xl glass p-10 text-center text-muted-foreground">
          No dishes match these filters. Try another hotel or category.
        </div>
      )}

      {/* Dish Customization Modal */}
      {customizingDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 shadow-2xl space-y-5 p-6 sm:p-8">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex gap-3">
                <img
                  src={customizingDish.image}
                  alt={customizingDish.name}
                  className="h-16 w-16 rounded-2xl object-cover border border-white/10"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <VegDot veg={customizingDish.veg} />
                    <h3 className="text-lg font-bold text-foreground">{customizingDish.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{customizingDish.desc}</p>
                  <div className="text-sm font-black text-primary mt-1">Base Price: {inr(customizingDish.price)}</div>
                </div>
              </div>
              <button
                onClick={() => setCustomizingDish(null)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Portion Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                1. Select Portion Size
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { key: "regular", label: "Regular", price: "+₹0" },
                  { key: "medium", label: "Medium", price: "+₹50" },
                  { key: "large", label: "Large / Pack", price: "+₹100" },
                ].map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPortion(p.key as any)}
                    className={`rounded-2xl border p-3 text-center transition-all ${
                      portion === p.key
                        ? "border-primary bg-primary/10 font-bold text-foreground shadow-glow"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                    }`}
                  >
                    <div>{p.label}</div>
                    <div className="text-[10px] text-secondary mt-0.5">{p.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra Addons Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                2. Extra Add-ons & Toppings
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { key: "cheese", label: "Extra Cheese 🧀", price: "+₹30" },
                  { key: "sauce", label: "Extra Dip / Sauce 🥣", price: "+₹20" },
                  { key: "spice", label: "Extra Chilli & Spice 🌶️", price: "+₹15" },
                  { key: "butter", label: "Garlic Butter Coat 🧈", price: "+₹25" },
                ].map((item) => {
                  const isChecked = addons.includes(item.key);
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleAddon(item.key)}
                      className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                        isChecked
                          ? "border-primary bg-primary/10 font-semibold text-foreground"
                          : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`grid h-4 w-4 place-items-center rounded border ${isChecked ? "bg-primary border-primary text-black" : "border-white/20"}`}>
                          {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                        </span>
                        {item.label}
                      </span>
                      <span className="text-secondary font-medium text-[11px]">{item.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cooking Instructions */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
                3. Special Instructions (Optional)
              </label>
              <Textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="E.g. Make it extra crispy, less spicy, no onions..."
                className="rounded-xl border-white/10 bg-white/5 text-xs min-h-[60px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <Button
                onClick={handleAddCustomizedToCart}
                className="w-full h-12 rounded-xl text-base font-bold shadow-glow"
                style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
              >
                <Plus className="mr-1.5 h-5 w-5" />
                Add Customized Dish ({inr(getCustomizedPrice())})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HotelChip({ hotelId, label, active }: { hotelId?: string; label: string; active: boolean }) {
  return (
    <Link
      to="/menu"
      search={hotelId ? { hotel: hotelId } : {}}
      className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition ${
        active ? "text-primary-foreground shadow-glow font-bold" : "bg-white/5 text-muted-foreground hover:text-foreground"
      }`}
      style={active ? { background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" } : undefined}
    >
      {label}
    </Link>
  );
}

function CatChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition ${
        active ? "text-primary-foreground shadow-glow font-bold" : "bg-white/5 text-muted-foreground hover:text-foreground"
      }`}
      style={active ? { background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" } : undefined}
    >
      {label}
    </button>
  );
}
