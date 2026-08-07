import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, Heart, MapPin, Ticket, User, CheckCircle2 } from "lucide-react";
import { restaurants } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · FoodFusion" }] }),
  component: Profile,
});

function Profile() {
  const handleApplyCoupon = (code: string, desc: string) => {
    toast.success(`Coupon ${code} Applied!`, {
      description: `${desc}. Discount will be reflected at checkout.`,
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-16 pt-8 sm:px-6">
      <section className="glass-strong flex flex-wrap items-center gap-6 rounded-3xl p-6 border border-white/10 shadow-soft">
        <div
          className="grid h-20 w-20 place-items-center rounded-2xl text-2xl font-black shadow-glow"
          style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
        >
          DS
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Divesh Salve</h1>
          <div className="text-sm text-muted-foreground">divesh@fusion.in · +91 98765 43210</div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/5 px-3 py-1 text-muted-foreground border border-white/5">
              <MapPin className="mr-1 inline h-3 w-3 text-primary" />
              Kalyan, MH (421306)
            </span>
            <span className="rounded-full bg-[color:var(--gold)]/15 px-3 py-1 font-semibold text-secondary border border-[color:var(--gold)]/30">
              Gold Member
            </span>
          </div>
        </div>
        <div className="ml-auto grid grid-cols-3 gap-3 text-center">
          <Stat label="Points" value="340" />
          <Stat label="Orders" value="82" />
          <Stat label="Saved" value="₹4.2k" />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card icon={<Gift className="h-4 w-4 text-primary" />} title="Rewards progress">
          <div className="text-xs text-muted-foreground">160 pts to ₹350 OFF</div>
          <Progress value={68} className="mt-2 h-2.5 bg-white/10" />
          <div className="mt-4">
            <Button
              size="sm"
              asChild
              className="w-full rounded-xl text-xs font-bold"
              style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
            >
              <Link to="/rewards">View All Rewards</Link>
            </Button>
          </div>
        </Card>

        <Card icon={<Ticket className="h-4 w-4 text-secondary" />} title="Coupon wallet">
          <div className="space-y-2.5 text-sm">
            <Coupon
              code="FLASH60"
              desc="60% off up to ₹120"
              onApply={() => handleApplyCoupon("FLASH60", "60% off up to ₹120")}
            />
            <Coupon
              code="FREEDEL"
              desc="Free delivery on orders above ₹199"
              onApply={() => handleApplyCoupon("FREEDEL", "Free delivery applied")}
            />
          </div>
        </Card>

        <Card icon={<Heart className="h-4 w-4 text-destructive" />} title="Favourite restaurants">
          <div className="space-y-2">
            {restaurants.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-xl bg-white/5 p-2 text-sm border border-white/5">
                <div className="flex items-center gap-2">
                  <img src={r.image} alt={r.name} className="h-8 w-8 rounded-lg object-cover" loading="lazy" />
                  <span className="truncate text-xs font-semibold">{r.name}</span>
                </div>
                <Button size="sm" variant="ghost" asChild className="h-7 px-2 rounded-lg text-xs text-primary hover:bg-white/10">
                  <Link to="/menu" search={{ hotel: r.id }}>Menu</Link>
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 px-4 py-3 border border-white/5">
      <div className="text-lg font-black text-secondary">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-5 border border-white/10">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">{icon}{title}</div>
      {children}
    </div>
  );
}

function Coupon({ code, desc, onApply }: { code: string; desc: string; onApply: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-dashed border-white/15 bg-white/5 px-3 py-2">
      <div>
        <div className="font-bold text-secondary text-sm">{code}</div>
        <div className="text-[11px] text-muted-foreground">{desc}</div>
      </div>
      <button
        onClick={onApply}
        className="text-xs font-bold text-primary hover:underline px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
      >
        APPLY
      </button>
    </div>
  );
}
