import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ChevronRight,
  Clock,
  Flame,
  Gift,
  Heart,
  MapPin,
  Mic,
  Search,
  Sparkles,
  Star,
  Timer,
  Trophy,
  Users,
  Wallet,
  Zap,
  Copy,
  X,
  RotateCw,
  CheckCircle2,
  HelpCircle,
  PartyPopper,
} from "lucide-react";
import heroImg from "@/assets/hero-food.jpg";
import { categories, dishes, getFoodImageFallback, getRestaurantImageFallback, restaurants } from "@/lib/data";
import { useCart, inr } from "@/lib/cart";
import { VegDot } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Home,
});

type Mode = "all" | "veg" | "nonveg";

function Home() {
  const [mode, setMode] = useState<Mode>("all");
  const filteredRestaurants = useMemo(
    () => restaurants.filter((r) => (mode === "all" ? true : mode === "veg" ? r.veg : !r.veg)),
    [mode],
  );
  const filteredDishes = useMemo(
    () => dishes.filter((d) => (mode === "all" ? true : mode === "veg" ? d.veg : !d.veg)).slice(0, 6),
    [mode],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 space-y-12">
      <Hero />
      <QuickCategories />
      <ModeToggle mode={mode} setMode={setMode} />
      <FeaturedRestaurants list={filteredRestaurants} />
      <Recommendations list={filteredDishes} />
      <MealPlanner />
      <OffersRow />
      <RewardsSection />
      <EngagementRow />
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/menu", search: { q: searchQuery } });
    } else {
      navigate({ to: "/menu" });
    }
  };

  const handleVoiceSearch = () => {
    toast.info("Listening for voice search...", {
      description: "Say a dish like 'Biryani' or 'Pizza'",
    });
  };

  return (
    <section className="relative mt-6 overflow-hidden rounded-[28px] border border-white/10 shadow-soft">
      <img
        src={heroImg}
        alt="A vibrant flatlay of biryani, pizza, burgers and Indian street food"
        className="absolute inset-0 h-full w-full object-cover"
        width={1600}
        height={1200}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/70 to-transparent" />
      <div className="relative grid gap-8 p-6 sm:p-10 md:grid-cols-2 md:p-14">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>New · AI Smart Meal Planner</span>
          </div>
          <h1 className="mt-4 text-4xl leading-[1.05] font-black sm:text-5xl md:text-6xl text-foreground">
            Crave it. <span className="gradient-text">Fusion</span> delivers it.
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            From wood-fired pizzas to Hyderabadi biryani — 40,000+ dishes across India, delivered in 30 minutes flat.
          </p>

          <form onSubmit={handleSearchSubmit} className="glass-strong mt-6 grid gap-2 rounded-2xl p-2 sm:grid-cols-[auto_1fr_auto]">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Kalyan, MH
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes or restaurants…"
                className="h-10 border-0 bg-transparent focus-visible:ring-0 text-sm"
              />
              <button
                type="button"
                onClick={handleVoiceSearch}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                aria-label="Voice search"
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
            <Button
              type="submit"
              className="h-12 rounded-xl px-5 text-base font-semibold shadow-glow cursor-pointer"
              style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
            >
              Order Now
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {["30-min delivery", "Live tracking", "GST included", "UPI · Cards · COD"].map((t) => (
              <span key={t} className="rounded-full glass px-3 py-1">{t}</span>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <FloatingStat />
        </div>
      </div>
    </section>
  );
}

function FloatingStat() {
  const navigate = useNavigate();
  return (
    <div className="relative h-full min-h-[320px]">
      <div
        onClick={() => navigate({ to: "/orders" })}
        className="glass-strong absolute right-0 top-2 w-64 cursor-pointer rounded-2xl p-4 transition-transform hover:scale-105 border border-white/10"
        style={{ animation: "float-y 6s ease-in-out infinite" }}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "var(--gradient-royal)" }}>
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Live now</div>
            <div className="text-sm font-semibold text-foreground">3,214 orders being prepared</div>
          </div>
        </div>
      </div>
      <div
        onClick={() => navigate({ to: "/rewards" })}
        className="glass-strong absolute bottom-0 right-24 w-72 cursor-pointer rounded-2xl p-4 transition-transform hover:scale-105 border border-white/10"
        style={{ animation: "float-y 7s ease-in-out infinite 0.6s" }}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "linear-gradient(135deg, var(--veg), oklch(0.55 0.15 155))" }}>
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Your rewards</div>
            <div className="text-sm font-semibold text-foreground">You have <span className="text-secondary">340</span> pts · ₹150 off unlocked</div>
          </div>
        </div>
      </div>
      <div
        onClick={() => navigate({ to: "/rewards" })}
        className="glass-strong absolute right-40 top-24 w-56 cursor-pointer rounded-2xl p-4 transition-transform hover:scale-105 border border-white/10"
        style={{ animation: "float-y 5s ease-in-out infinite 0.3s" }}
      >
        <div className="flex items-center gap-3">
          <Gift className="h-6 w-6 text-secondary" />
          <div>
            <div className="text-xs text-muted-foreground">Daily spin</div>
            <div className="text-sm font-semibold text-foreground">1 free spin available</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHead({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-black sm:text-3xl text-foreground">{title}</h2>
        {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function QuickCategories() {
  const navigate = useNavigate();
  return (
    <section>
      <SectionHead title="What are you craving?" sub="Browse by category" />
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => navigate({ to: "/menu", search: { cat: c.key } })}
            className="card-lift card-lift-hover glass group grid h-28 w-28 shrink-0 snap-start place-items-center rounded-2xl text-center cursor-pointer border border-white/10"
          >
            <div className="text-3xl transition-transform group-hover:scale-110">{c.emoji}</div>
            <div className="mt-1 text-xs font-medium text-foreground">{c.label}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

function ModeToggle({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl glass p-4 border border-white/10">
      <div className="flex items-center gap-3 text-sm">
        <span className="grid h-8 w-8 place-items-center rounded-full" style={{ background: "linear-gradient(135deg, var(--primary), var(--royal))" }}>
          <Sparkles className="h-4 w-4 text-white" />
        </span>
        <div>
          <div className="font-semibold text-foreground">Browsing mode</div>
          <div className="text-xs text-muted-foreground">Switch instantly between veg & non-veg experiences</div>
        </div>
      </div>
      <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
        <TabsList className="rounded-full bg-white/5">
          <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All</TabsTrigger>
          <TabsTrigger value="veg" className="rounded-full data-[state=active]:bg-[color:var(--veg)] data-[state=active]:text-black">🥦 Pure Veg</TabsTrigger>
          <TabsTrigger value="nonveg" className="rounded-full data-[state=active]:bg-[color:var(--nonveg)] data-[state=active]:text-white">🍗 Non-Veg</TabsTrigger>
        </TabsList>
      </Tabs>
    </section>
  );
}

function FeaturedRestaurants({ list }: { list: typeof restaurants }) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFav = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = !prev[id];
      if (next) {
        toast.success(`Saved ${name} to your favorites! ❤️`);
      } else {
        toast.info(`Removed ${name} from favorites.`);
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <section>
      <SectionHead
        title="Featured restaurants"
        sub="Handpicked spots near you"
        action={<Link to="/menu" className="inline-flex items-center gap-1 text-sm text-primary font-bold">See all <ChevronRight className="h-4 w-4" /></Link>}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => {
          const isFav = !!favorites[r.id];
          return (
            <article key={r.id} className="card-lift card-lift-hover group overflow-hidden rounded-3xl glass border border-white/10">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={r.image}
                  alt={r.name}
                  onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = getRestaurantImageFallback(r.cuisine); }}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent" />
                <Badge className="absolute left-3 top-3 rounded-full border-0 text-xs font-semibold" style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}>
                  {r.discount}
                </Badge>
                <button
                  type="button"
                  onClick={(e) => toggleFav(r.id, r.name, e)}
                  className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass-strong transition-colors cursor-pointer ${isFav ? "text-rose-500 fill-current" : "text-white hover:text-primary"}`}
                  aria-label="Add to favorites"
                >
                  <Heart className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
                </button>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-semibold backdrop-blur">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ background: r.veg ? "var(--veg)" : "var(--nonveg)" }} />
                    {r.veg ? "Pure Veg" : "Non-Veg"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-foreground">{r.name}</h3>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">{r.cuisine}</div>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-[color:var(--veg)]/15 px-2 py-1 text-xs font-bold text-[color:var(--veg)]">
                    <Star className="h-3 w-3 fill-current" /> {r.rating}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{r.time} min</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{r.distance}</span>
                  <span>from <span className="font-semibold text-foreground">{inr(r.price)}</span></span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild size="sm" className="flex-1 rounded-xl font-bold cursor-pointer" style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}>
                    <Link to="/menu" search={{ hotel: r.id }}>View Menu</Link>
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={(e) => toggleFav(r.id, r.name, e)}
                    className="rounded-xl border border-white/10 cursor-pointer"
                  >
                    <Heart className={`mr-1 h-4 w-4 ${isFav ? "fill-current text-rose-500" : ""}`} /> {isFav ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Recommendations({ list }: { list: typeof dishes }) {
  const { add } = useCart();
  return (
    <section>
      <SectionHead
        title="Recommended for you"
        sub="Curated by AI · based on your taste & the time of day"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => (
          <article key={d.id} className="card-lift card-lift-hover overflow-hidden rounded-3xl glass border border-white/10 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = getFoodImageFallback(d.category); }}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={800}
                  height={500}
                />
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-black/50 backdrop-blur">
                    <VegDot veg={d.veg} />
                  </span>
                </div>
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs backdrop-blur">
                  <Timer className="h-3 w-3" /> {d.time}m
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-foreground">{d.name}</h3>
                  <div className="whitespace-nowrap text-base font-black text-primary">{inr(d.price)}</div>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{d.desc}</p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{d.calories} kcal</span>
                <button
                  type="button"
                  onClick={() => add({ id: d.id, name: d.name, price: d.price, image: d.image, veg: d.veg })}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow cursor-pointer transition-transform active:scale-95"
                  style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MealPlanner() {
  const { add } = useCart();
  const [people, setPeople] = useState(2);
  const [budget, setBudget] = useState(500);
  const [veg, setVeg] = useState<"veg" | "nonveg">("nonveg");
  const [spice, setSpice] = useState(2);

  const plan = useMemo(() => {
    const pool = dishes.filter((d) => (veg === "veg" ? d.veg : true));
    const picks: typeof dishes = [];
    let spent = 0;
    for (const d of pool) {
      if (spent + d.price <= budget && picks.length < people + 1) {
        picks.push(d);
        spent += d.price;
      }
    }
    return { picks, spent };
  }, [people, budget, veg]);

  const handleAddPlanToCart = () => {
    if (plan.picks.length === 0) {
      toast.error("No dishes in your current meal plan. Increase budget!");
      return;
    }
    plan.picks.forEach((d) => {
      add({ id: d.id, name: d.name, price: d.price, image: d.image, veg: d.veg });
    });
    toast.success(`Meal Plan added to cart! (${plan.picks.length} items)`, {
      description: `Total plan spend: ${inr(plan.spent)}`,
    });
  };

  return (
    <section>
      <SectionHead
        title="Smart Meal Planner"
        sub="Tell us the vibe. Our AI plans the perfect table."
        action={<Badge className="rounded-full" style={{ background: "var(--gradient-royal)", color: "white" }}>AI · Beta</Badge>}
      />
      <div className="grid gap-6 rounded-3xl glass-strong p-6 lg:grid-cols-[1.1fr_1.4fr] border border-white/10">
        <div className="space-y-5">
          <ChoiceRow icon={<Users className="h-4 w-4" />} label="Number of people">
            {[1, 2, 4, 6].map((n) => (
              <Chip key={n} active={people === n} onClick={() => setPeople(n)}>{n}</Chip>
            ))}
          </ChoiceRow>
          <ChoiceRow icon={<Wallet className="h-4 w-4" />} label="Budget">
            {[200, 500, 1000].map((b) => (
              <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>{inr(b)}</Chip>
            ))}
          </ChoiceRow>
          <ChoiceRow icon={<Flame className="h-4 w-4" />} label="Preference">
            <Chip active={veg === "veg"} onClick={() => setVeg("veg")}>🥦 Veg</Chip>
            <Chip active={veg === "nonveg"} onClick={() => setVeg("nonveg")}>🍗 Non-Veg</Chip>
          </ChoiceRow>
          <ChoiceRow icon={<span className="text-xs">🌶️</span>} label="Spice level">
            {[1, 2, 3, 4].map((s) => (
              <Chip key={s} active={spice === s} onClick={() => setSpice(s)}>{"🌶".repeat(s)}</Chip>
            ))}
          </ChoiceRow>
        </div>

        <div className="rounded-2xl bg-black/20 p-5 flex flex-col justify-between border border-white/5">
          <div>
            <div className="flex items-center justify-between text-xs">
              <div className="text-muted-foreground">Suggested plan</div>
              <div>Est. spend <span className="font-bold text-secondary">{inr(plan.spent)}</span> / {inr(budget)}</div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {plan.picks.length === 0 && (
                <div className="col-span-2 rounded-xl bg-white/5 p-4 text-sm text-muted-foreground">Try increasing your budget to unlock more picks.</div>
              )}
              {plan.picks.map((d) => (
                <div key={d.id} className="flex gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
                  <img src={d.image} alt={d.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = getFoodImageFallback(d.category); }} className="h-14 w-14 rounded-lg object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <VegDot veg={d.veg} />
                      <div className="truncate text-sm font-semibold text-foreground">{d.name}</div>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{d.calories} kcal · {d.time} min</div>
                  </div>
                  <div className="text-sm font-bold text-primary">{inr(d.price)}</div>
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={handleAddPlanToCart}
            disabled={plan.picks.length === 0}
            className="mt-5 w-full rounded-xl font-bold transition-all shadow-glow cursor-pointer"
            style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
          >
            Add plan to cart
          </Button>
        </div>
      </div>
    </section>
  );
}

function ChoiceRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-white/5">{icon}</span>
        {label}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition cursor-pointer ${active ? "text-primary-foreground shadow-glow font-bold" : "bg-white/5 text-muted-foreground hover:text-foreground"}`}
      style={active ? { background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" } : undefined}
    >
      {children}
    </button>
  );
}

function OffersRow() {
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState<{ title: string; body: string; code: string } | null>(null);

  const offers = [
    { title: "Flash Deal · Ends in 2h", body: "Flat 60% OFF up to ₹120", code: "FLASH60", grad: "var(--gradient-sunset)" },
    { title: "Weekend Combo", body: "2 Pizzas + Coke @ ₹499", code: "WEEKEND", grad: "var(--gradient-royal)" },
    { title: "Festival Feast", body: "Free dessert on orders above ₹599", code: "MITHAI", grad: "linear-gradient(135deg, var(--veg), oklch(0.6 0.18 130))" },
  ];

  const handleApplyOfferModal = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    toast.success(`Coupon "${code}" copied!`, {
      description: "Code copied to clipboard and applied at checkout.",
    });
    setSelectedOffer(null);
    navigate({ to: "/menu" });
  };

  return (
    <section>
      <SectionHead title="Special offers" sub="Grab them while they're hot" />
      <div className="grid gap-4 md:grid-cols-3">
        {offers.map((o) => (
          <div
            key={o.code}
            onClick={() => setSelectedOffer({ title: o.title, body: o.body, code: o.code })}
            className="card-lift card-lift-hover cursor-pointer overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-glow transition-all active:scale-[0.98]"
            style={{ background: o.grad }}
          >
            <div className="text-xs font-semibold opacity-80">{o.title}</div>
            <div className="mt-2 text-2xl font-black leading-tight">{o.body}</div>
            <div className="mt-6 flex items-center justify-between">
              <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-bold tracking-wider flex items-center gap-1">
                <Copy className="h-3 w-3" /> CODE · {o.code}
              </span>
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Special Offer Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/30 shadow-glow">
              <PartyPopper className="h-8 w-8" />
            </div>

            <div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-muted-foreground">{selectedOffer.title}</span>
              <h3 className="mt-2 text-2xl font-black text-foreground">{selectedOffer.body}</h3>
            </div>

            <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 flex items-center justify-between">
              <code className="text-xl font-black tracking-widest text-secondary">{selectedOffer.code}</code>
              <Button
                size="sm"
                onClick={() => handleApplyOfferModal(selectedOffer.code)}
                className="rounded-xl font-bold shadow-glow"
                style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
              >
                Copy & Claim
              </Button>
            </div>

            <Button variant="ghost" onClick={() => setSelectedOffer(null)} className="w-full text-xs text-muted-foreground">
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

function RewardsSection() {
  const navigate = useNavigate();
  const points = 340;
  const next = 500;
  return (
    <section>
      <SectionHead title="FoodFusion Rewards" sub="Every ₹100 spent = 10 points. Redeem for real discounts." />
      <div className="grid gap-6 rounded-3xl glass-strong p-6 lg:grid-cols-[1.2fr_1fr] border border-white/10">
        <div>
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl shadow-glow" style={{ background: "var(--gradient-sunset)" }}>
              <Gift className="h-8 w-8 text-[oklch(0.16_0.03_265)]" style={{ animation: "float-y 3s ease-in-out infinite" }} />
            </div>
            <div>
              <div className="text-xs uppercase text-muted-foreground">Current balance</div>
              <div className="text-3xl font-black text-foreground">{points} <span className="text-base font-semibold text-secondary">pts</span></div>
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Next reward · ₹350 OFF</span>
              <span>{points}/{next}</span>
            </div>
            <Progress value={(points / next) * 100} className="h-2 bg-white/10" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { p: 100, r: "₹50 OFF" },
              { p: 250, r: "₹150 OFF" },
              { p: 500, r: "₹350 OFF" },
            ].map((t) => (
              <div
                key={t.p}
                onClick={() => navigate({ to: "/rewards" })}
                className="rounded-2xl bg-white/5 p-3 text-center cursor-pointer hover:bg-white/10 transition-colors border border-white/5"
              >
                <div className="text-xs text-muted-foreground">{t.p} pts</div>
                <div className="mt-1 text-sm font-bold text-secondary">{t.r}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-black/25 p-5 flex flex-col justify-between border border-white/5">
          <div>
            <div className="text-sm font-semibold text-foreground">Recent activity</div>
            <ul className="mt-3 space-y-3 text-sm">
              {[
                { t: "Order · Napoli Wood Fire", p: "+28 pts" },
                { t: "Redeemed ₹50 OFF", p: "-100 pts" },
                { t: "Daily spin bonus", p: "+15 pts" },
              ].map((a, i) => (
                <li key={i} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-xs">
                  <span className="text-muted-foreground">{a.t}</span>
                  <span className={`font-bold ${a.p.startsWith("+") ? "text-veg" : "text-primary"}`}>{a.p}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/rewards" })}
            className="mt-4 w-full rounded-xl border border-white/10 text-xs font-semibold cursor-pointer"
          >
            View Reward Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}

function EngagementRow() {
  const navigate = useNavigate();

  // Modals state
  const [showSpinModal, setShowSpinModal] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);

  const [showScratchModal, setShowScratchModal] = useState(false);
  const [isScratched, setIsScratched] = useState(false);

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const handleStartSpin = () => {
    setIsSpinning(true);
    setSpinResult(null);
    setTimeout(() => {
      setIsSpinning(false);
      const rewards = ["FLAT 60% OFF (Code: SPIN60)", "₹50 CASHBACK (Code: SPIN50)", "FREE DESSERT (Code: SPINDESSERT)"];
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      setSpinResult(reward);
      toast.success(`🎉 You Won: ${reward}`);
    }, 2500);
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) setQuizScore((prev) => prev + 1);
    if (quizStep < 2) {
      setQuizStep((prev) => prev + 1);
    } else {
      setQuizStep(3); // Finished
    }
  };

  const quizQuestions = [
    { q: "1. Which city is famous for Hyderabadi Biryani?", options: ["Hyderabad", "Delhi", "Mumbai"], ans: 0 },
    { q: "2. What is the key cheese used in authentic Margherita Pizza?", options: ["Cheddar", "Mozzarella", "Processed Cheese"], ans: 1 },
    { q: "3. Which spice gives Butter Chicken its signature warm color?", options: ["Kashmiri Red Chilli", "Turmeric", "Black Pepper"], ans: 0 },
  ];

  return (
    <section>
      <SectionHead title="Play. Win. Eat." sub="Spin, scratch and quiz your way to tasty coupons." />
      <div className="grid gap-4 md:grid-cols-3">
        {/* Spin Wheel Card */}
        <div className="card-lift card-lift-hover overflow-hidden rounded-3xl glass p-6 flex flex-col justify-between border border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="grid h-12 w-12 place-items-center rounded-xl"
                style={{
                  background: "conic-gradient(from 0deg, var(--primary), var(--secondary), var(--royal), var(--veg), var(--primary))",
                  animation: "spin-slow 8s linear infinite",
                }}
              >
                <div className="h-8 w-8 rounded-full bg-[color:var(--surface)]" />
              </div>
              <div>
                <div className="font-bold text-foreground">Daily Spin Wheel</div>
                <div className="text-xs text-muted-foreground">1 free spin today</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Win 5-60% off, ₹30-₹50 coupons, free delivery or double points.</p>
          </div>
          <Button
            onClick={() => setShowSpinModal(true)}
            className="mt-4 w-full rounded-xl font-bold shadow-glow cursor-pointer"
            style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
          >
            <RotateCw className="mr-1.5 h-4 w-4" /> Spin now
          </Button>
        </div>

        {/* Festival Scratch Card */}
        <div className="card-lift card-lift-hover overflow-hidden rounded-3xl p-6 flex flex-col justify-between border border-white/10" style={{ background: "var(--gradient-royal)" }}>
          <div>
            <Sparkles className="h-6 w-6 text-white" />
            <div className="mt-3 text-xl font-black text-white">Festival Scratch Cards</div>
            <p className="mt-1 text-sm text-white/80">3 mystery cards waiting. Reveal & redeem coupons instantly.</p>
          </div>
          <Button onClick={() => setShowScratchModal(true)} variant="secondary" className="mt-4 w-full rounded-xl font-bold cursor-pointer">
            Scratch now
          </Button>
        </div>

        {/* Food Quiz */}
        <div className="card-lift card-lift-hover overflow-hidden rounded-3xl glass p-6 flex flex-col justify-between border border-white/10">
          <div>
            <div className="text-3xl">🧠</div>
            <div className="mt-2 text-xl font-black text-foreground">Food Quiz</div>
            <p className="mt-1 text-sm text-muted-foreground">3 questions. Score full marks to win a ₹100 coupon.</p>
          </div>
          <Button
            onClick={() => {
              setShowQuizModal(true);
              setQuizStep(0);
              setQuizScore(0);
            }}
            variant="ghost"
            className="mt-4 w-full rounded-xl border border-white/15 font-semibold text-foreground hover:bg-white/10 cursor-pointer"
          >
            <HelpCircle className="mr-1.5 h-4 w-4 text-primary" /> Start quiz
          </Button>
        </div>
      </div>

      {/* 🎡 SPIN WHEEL MODAL */}
      {showSpinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <button onClick={() => setShowSpinModal(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-white">
              <X className="h-5 w-5" />
            </button>

            <div>
              <h3 className="text-2xl font-black text-foreground">Daily Fortune Wheel</h3>
              <p className="text-xs text-muted-foreground mt-1">Spin the wheel to unlock your daily discount!</p>
            </div>

            {/* Visual Animated Wheel */}
            <div className="relative mx-auto h-48 w-48 rounded-full border-4 border-amber-400 p-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center overflow-hidden">
              <div
                className={`h-full w-full rounded-full transition-all duration-[2500ms] ${
                  isSpinning ? "rotate-[1440deg] ease-out" : ""
                }`}
                style={{
                  background: "conic-gradient(from 0deg, #f97316 0deg 60deg, #eab308 60deg 120deg, #22c55e 120deg 180deg, #3b82f6 180deg 240deg, #a855f7 240deg 300deg, #ec4899 300deg 360deg)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-xs font-black text-amber-400">
                  {isSpinning ? "SPINNING" : "FORTUNE"}
                </div>
              </div>
            </div>

            {spinResult ? (
              <div className="rounded-2xl bg-white/10 p-4 border border-amber-400/40 space-y-2">
                <PartyPopper className="mx-auto h-8 w-8 text-amber-400 animate-bounce" />
                <div className="text-base font-bold text-foreground">{spinResult}</div>
                <Button
                  onClick={() => {
                    setShowSpinModal(false);
                    navigate({ to: "/menu" });
                  }}
                  className="w-full h-10 rounded-xl font-bold shadow-glow"
                  style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                >
                  Use Coupon Now
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleStartSpin}
                disabled={isSpinning}
                className="w-full h-12 rounded-xl text-base font-bold shadow-glow"
                style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
              >
                {isSpinning ? "Spinning Wheel..." : "SPIN WHEEL NOW"}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* 🎴 FESTIVAL SCRATCH CARD MODAL */}
      {showScratchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <button onClick={() => setShowScratchModal(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-white">
              <X className="h-5 w-5" />
            </button>

            <div>
              <h3 className="text-2xl font-black text-foreground">Diwali Mystery Card</h3>
              <p className="text-xs text-muted-foreground mt-1">Scratch the gold card below to reveal your prize!</p>
            </div>

            <div
              onClick={() => setIsScratched(true)}
              className={`mx-auto h-40 w-full max-w-xs rounded-2xl border-2 border-amber-400 p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isScratched
                  ? "bg-gradient-to-tr from-emerald-900/60 to-slate-900 border-emerald-400"
                  : "bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 shadow-glow"
              }`}
            >
              {isScratched ? (
                <div className="space-y-1 animate-in zoom-in-50">
                  <Gift className="mx-auto h-8 w-8 text-emerald-400" />
                  <div className="text-lg font-black text-white">FREE DESSERT + ₹50 OFF</div>
                  <div className="text-xs font-mono text-amber-300">CODE: SCRATCHFREE</div>
                </div>
              ) : (
                <div className="text-black font-black text-base flex flex-col items-center gap-1">
                  <Sparkles className="h-7 w-7 text-black" />
                  <span>CLICK TO SCRATCH CARD</span>
                </div>
              )}
            </div>

            {isScratched ? (
              <Button
                onClick={() => {
                  toast.success("Coupon SCRATCHFREE Applied!");
                  setShowScratchModal(false);
                  navigate({ to: "/menu" });
                }}
                className="w-full h-11 rounded-xl font-bold shadow-glow"
                style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
              >
                Claim & Order Food
              </Button>
            ) : (
              <Button onClick={() => setIsScratched(true)} variant="secondary" className="w-full rounded-xl font-bold">
                Reveal Prize
              </Button>
            )}
          </div>
        </div>
      )}

      {/* 🧠 FOOD QUIZ MODAL */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-md rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl text-center space-y-5">
            <button onClick={() => setShowQuizModal(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-white">
              <X className="h-5 w-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-foreground">Food Master Quiz</h3>
              <p className="text-xs text-muted-foreground">Answer 3 questions to win a ₹100 discount coupon!</p>
            </div>

            {quizStep < 3 ? (
              <div className="space-y-4 text-left">
                <div className="text-xs font-bold text-primary">Question {quizStep + 1} of 3</div>
                <div className="text-sm font-bold text-foreground">{quizQuestions[quizStep].q}</div>
                <div className="space-y-2">
                  {quizQuestions[quizStep].options.map((opt, idx) => (
                    <button
                      key={opt}
                      onClick={() => handleQuizAnswer(idx === quizQuestions[quizStep].ans)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-left text-xs font-semibold text-foreground hover:border-primary hover:bg-primary/10 transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 py-2">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
                <h4 className="text-xl font-black text-foreground">Quiz Complete!</h4>
                <p className="text-xs text-muted-foreground">
                  Score: <span className="font-bold text-secondary">{quizScore}/3</span> correct!
                </p>
                <div className="rounded-xl bg-white/5 p-3 border border-white/10 text-xs">
                  <div className="font-bold text-secondary">Coupon Won: QUIZ100</div>
                  <div className="text-muted-foreground text-[11px]">Flat ₹100 OFF on orders above ₹399</div>
                </div>
                <Button
                  onClick={() => {
                    toast.success("Coupon QUIZ100 Applied!");
                    setShowQuizModal(false);
                    navigate({ to: "/menu" });
                  }}
                  className="w-full h-11 rounded-xl font-bold shadow-glow"
                  style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                >
                  Use Coupon Now
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
