import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Filter, MapPin, Search, Star, Timer, SlidersHorizontal, Check, X, Plus, Building2, Flame, Sparkles, ZoomIn } from "lucide-react";
import { categories, dishes, getFoodImageFallback, getRestaurant, getRestaurantDishes, restaurants } from "@/lib/data";
import { useCart, inr } from "@/lib/cart";
import { VegDot } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ImageLightboxModal, ImageLightboxData } from "@/components/image-lightbox-modal";

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

  // Customization & Image Lightbox Modal State
  const [customizingDish, setCustomizingDish] = useState<typeof dishes[0] | null>(null);
  const [lightboxData, setLightboxData] = useState<ImageLightboxData | null>(null);
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
    if (portion === "large") base += 90;
    base += addons.length * 35;
    return base;
  };

  const handleAddCustomizedToCart = () => {
    if (!customizingDish) return;
    const finalPrice = getCustomizedPrice();
    const portionText = portion !== "regular" ? ` (${portion.toUpperCase()})` : "";
    const addonText = addons.length > 0 ? ` + ${addons.join(", ")}` : "";

    add({
      id: `${customizingDish.id}-${portion}-${addons.join("-")}`,
      name: `${customizingDish.name}${portionText}${addonText}`,
      price: finalPrice,
      image: customizingDish.image,
      veg: customizingDish.veg,
    });

    setCustomizingDish(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 space-y-6">
      {/* 🏬 HOTEL SELECTOR BANNER */}
      <div className="glass-strong rounded-3xl p-6 border border-white/10 shadow-glow space-y-5">
        {/* Top Title & Veg Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
              <Building2 className="h-4 w-4" /> Hotel & Restaurant Menus
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">
              {selectedHotel ? selectedHotel.name : "Explore All Hotel Menus"}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              {selectedHotel
                ? `${selectedHotel.cuisine} · ${selectedHotel.time} · ${selectedHotel.distance}`
                : "Select any hotel below to view its exclusive food menu & specials."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {selectedHotel && (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <Star className="h-3.5 w-3.5 fill-current" /> {selectedHotel.rating} Rating
              </span>
            )}
            <Tabs value={mode} onValueChange={(value) => setMode(value as typeof mode)}>
              <TabsList className="rounded-full bg-white/5 p-1 border border-white/10">
                <TabsTrigger value="all" className="rounded-full text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-black">
                  All
                </TabsTrigger>
                <TabsTrigger value="veg" className="rounded-full text-xs font-bold data-[state=active]:bg-[color:var(--veg)] data-[state=active]:text-black">
                  🥦 Veg
                </TabsTrigger>
                <TabsTrigger value="nonveg" className="rounded-full text-xs font-bold data-[state=active]:bg-[color:var(--nonveg)] data-[state=active]:text-white">
                  🍗 Non-Veg
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* 🏬 HOTEL SELECTOR CAROUSEL BADGES */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-secondary" /> Select Hotel to View Menu:
          </div>
          <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-2">
            <Link
              to="/menu"
              className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-bold transition-all shrink-0 cursor-pointer ${
                !selectedHotel
                  ? "border-primary bg-primary/20 text-foreground shadow-glow"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
            >
              <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/20 text-primary text-[10px] font-black">
                ALL
              </div>
              <span>All Hotels</span>
            </Link>

            {restaurants.map((r) => {
              const isActive = selectedHotel?.id === r.id;
              return (
                <Link
                  key={r.id}
                  to="/menu"
                  search={{ hotel: r.id }}
                  className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-1.5 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "border-primary bg-primary/20 text-foreground shadow-glow"
                      : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  <img src={r.image} alt={r.name} className="h-7 w-7 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-foreground leading-none">{r.name}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{r.cuisine.split("·")[0]}</div>
                  </div>
                  <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
                    ★ {r.rating}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
          <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-2xl bg-white/5 px-3.5 border border-white/10">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder={selectedHotel ? `Search inside ${selectedHotel.name} menu...` : "Search dishes across all hotels..."}
              className="h-10 border-0 bg-transparent focus-visible:ring-0 text-xs text-foreground placeholder:text-muted-foreground/60"
            />
            {q && (
              <button onClick={() => setQ("")} className="text-xs text-muted-foreground hover:text-white">✕</button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        <CategoryChip label="All Items" active={cat === "all"} onClick={() => setCat("all")} />
        {categories.map((c) => (
          <CategoryChip
            key={c.key}
            label={`${c.emoji} ${c.label}`}
            active={cat === c.key}
            onClick={() => setCat(c.key)}
          />
        ))}
      </div>

      {/* 🍛 DISHES GRID */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-foreground">
            {selectedHotel ? `${selectedHotel.name} Menu Items` : "Available Dishes"} ({list.length})
          </h2>
          {selectedHotel && (
            <Link to="/menu" className="text-xs font-bold text-primary hover:underline">
              ← View All Hotels
            </Link>
          )}
        </div>

        {list.length === 0 ? (
          <div className="glass-strong rounded-3xl p-12 text-center border border-white/10 space-y-3">
            <Search className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-bold text-foreground">No dishes found</h3>
            <p className="text-xs text-muted-foreground">Try clearing filters or search for another dish name.</p>
            <Button
              onClick={() => {
                setCat("all");
                setMode("all");
                setQ("");
              }}
              variant="ghost"
              className="rounded-xl border border-white/10 text-xs font-bold"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onAdd={() => add({ id: dish.id, name: dish.name, price: dish.price, image: dish.image, veg: dish.veg })}
                onCustomize={() => openCustomizeModal(dish)}
                onPreviewImage={() =>
                  setLightboxData({
                    src: dish.image,
                    title: dish.name,
                    price: dish.price,
                    restaurantName: getRestaurant(dish.restaurantId)?.name,
                    veg: dish.veg,
                    dishId: dish.id,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* 🛠️ ENLARGED DISH CUSTOMIZATION MODAL */}
      {customizingDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 sm:p-6 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-xl md:max-w-2xl rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header with Dish Image & Details */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={customizingDish.image}
                  alt={customizingDish.name}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <VegDot veg={customizingDish.veg} />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{customizingDish.veg ? "Pure Veg" : "Non-Veg"}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-foreground mt-0.5">{customizingDish.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{customizingDish.desc}</p>
                </div>
              </div>
              <button
                onClick={() => setCustomizingDish(null)}
                className="rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Portion Selector */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-primary">1. Select Portion Size</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "regular", label: "Regular", extra: 0, sub: "Base Portion" },
                  { key: "medium", label: "Medium", extra: 50, sub: "+50% Extra" },
                  { key: "large", label: "Large", extra: 90, sub: "+100% Jumbo" },
                ].map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPortion(p.key as any)}
                    className={`rounded-2xl border p-3.5 text-center transition-all cursor-pointer ${
                      portion === p.key
                        ? "border-primary bg-primary/20 text-primary shadow-glow ring-2 ring-primary/40"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                    }`}
                  >
                    <div className="text-sm font-bold text-foreground">{p.label}</div>
                    <div className="text-xs font-semibold text-primary mt-0.5">{p.extra > 0 ? `+${inr(p.extra)}` : "Base price"}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{p.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons Selector */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-secondary">2. Add Extra Toppings (+₹35 each)</label>
              <div className="grid grid-cols-2 gap-3">
                {["Extra Cheese", "Spicy Jalapenos", "Garlic Butter", "Paneer Cubes"].map((addon) => {
                  const isChecked = addons.includes(addon);
                  return (
                    <button
                      key={addon}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`flex items-center justify-between rounded-2xl border p-3.5 text-left font-bold text-sm transition-all cursor-pointer ${
                        isChecked
                          ? "border-secondary bg-secondary/20 text-secondary shadow-glow ring-2 ring-secondary/40"
                          : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                      }`}
                    >
                      <span>{addon}</span>
                      {isChecked ? <Check className="h-5 w-5 text-secondary" /> : <Plus className="h-5 w-5 opacity-60" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground">3. Special Cooking Instructions</label>
              <Textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="E.g. Make it extra spicy, less oil, no onion..."
                className="rounded-2xl border-white/10 bg-white/5 text-sm p-3.5 min-h-[75px]"
              />
            </div>

            {/* Submit Action Button */}
            <Button
              onClick={handleAddCustomizedToCart}
              className="w-full h-13 rounded-2xl text-base font-black shadow-glow cursor-pointer transition-transform active:scale-98"
              style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
            >
              Add Customized Dish ({inr(getCustomizedPrice())})
            </Button>
          </div>
        </div>
      )}

      {/* 🖼️ DOUBLE-CLICK IMAGE LIGHTBOX MODAL */}
      <ImageLightboxModal data={lightboxData} onClose={() => setLightboxData(null)} />
    </div>
  );
}

function HotelChip({ hotelId, label, active }: { hotelId?: string; label: string; active: boolean }) {
  return (
    <Link
      to="/menu"
      search={{ hotel: hotelId }}
      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 cursor-pointer border ${
        active
          ? "border-primary bg-primary/20 text-foreground shadow-glow"
          : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 cursor-pointer border ${
        active
          ? "border-primary bg-primary text-black shadow-glow"
          : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function DishCard({
  dish,
  onAdd,
  onCustomize,
  onPreviewImage,
}: {
  dish: typeof dishes[0];
  onAdd: () => void;
  onCustomize: () => void;
  onPreviewImage?: () => void;
}) {
  const restaurant = getRestaurant(dish.restaurantId);
  return (
    <div className="glass rounded-3xl p-4 border border-white/10 flex flex-col justify-between space-y-3 transition-all hover:scale-[1.01] hover:border-white/20 shadow-soft">
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-2xl h-44 border border-white/10 group">
          <img
            src={dish.image}
            alt={dish.name}
            onDoubleClick={onPreviewImage}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getFoodImageFallback(dish.category);
            }}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 cursor-zoom-in"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/10">
            <VegDot veg={dish.veg} />
            <span>{dish.veg ? "Pure Veg" : "Non-Veg"}</span>
          </div>

          {/* 🔍 Zoom Preview Shortcut Button */}
          {onPreviewImage && (
            <button
              type="button"
              onClick={onPreviewImage}
              title="Double-click image or click to zoom"
              className="absolute top-2.5 right-2.5 rounded-full bg-black/60 backdrop-blur-md p-1.5 text-white border border-white/20 hover:bg-black/80 transition-colors cursor-pointer"
            >
              <ZoomIn className="h-3.5 w-3.5 text-amber-400" />
            </button>
          )}

          <div className="absolute bottom-2.5 right-2.5 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-muted-foreground border border-white/10 flex items-center gap-1">
            <Timer className="h-3 w-3 text-primary" /> {dish.time} min
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-black text-base text-foreground leading-tight">{dish.name}</h3>
            <span className="font-black text-base text-primary shrink-0">{inr(dish.price)}</span>
          </div>
          {restaurant && (
            <div className="text-[11px] font-semibold text-secondary mt-0.5">
              by {restaurant.name}
            </div>
          )}
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{dish.desc}</p>
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-white/10">
        <Button
          size="sm"
          variant="ghost"
          onClick={onCustomize}
          className="flex-1 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/10 cursor-pointer"
        >
          Customize
        </Button>
        <Button
          size="sm"
          onClick={onAdd}
          className="flex-1 rounded-xl text-xs font-bold shadow-glow cursor-pointer"
          style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
        >
          <Plus className="mr-1 h-3.5 w-3.5" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}
