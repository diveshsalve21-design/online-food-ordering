import { createFileRoute } from "@tanstack/react-router";
import { Gift, Heart, MapPin, Ticket, User } from "lucide-react";
import { restaurants } from "@/lib/data";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · FoodFusion" }] }),
  component: Profile,
});

function Profile() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 pb-16 pt-8 sm:px-6">
      <section className="glass-strong flex flex-wrap items-center gap-6 rounded-3xl p-6">
        <div className="grid h-20 w-20 place-items-center rounded-2xl text-2xl font-black shadow-glow" style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}>AS</div>
        <div>
          <h1 className="text-2xl font-black">Aarav Sharma</h1>
          <div className="text-sm text-muted-foreground">aarav@fusion.in · +91 98765 43210</div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/5 px-2 py-1 text-muted-foreground"><MapPin className="mr-1 inline h-3 w-3" />Koramangala, BLR</span>
            <span className="rounded-full bg-[color:var(--gold)]/15 px-2 py-1 font-semibold text-secondary">Gold Member</span>
          </div>
        </div>
        <div className="ml-auto grid grid-cols-3 gap-4 text-center">
          <Stat label="Points" value="340" />
          <Stat label="Orders" value="82" />
          <Stat label="Saved" value="₹4.2k" />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card icon={<Gift className="h-4 w-4" />} title="Rewards progress">
          <div className="text-xs text-muted-foreground">160 pts to ₹350 OFF</div>
          <Progress value={68} className="mt-2 h-2 bg-white/10" />
        </Card>
        <Card icon={<Ticket className="h-4 w-4" />} title="Coupon wallet">
          <div className="space-y-2 text-sm">
            <Coupon code="FLASH60" desc="60% off up to ₹120" />
            <Coupon code="FREEDEL" desc="Free delivery below ₹199" />
          </div>
        </Card>
        <Card icon={<Heart className="h-4 w-4" />} title="Favourite restaurants">
          <div className="space-y-2">
            {restaurants.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm">
                <img src={r.image} alt="" className="h-8 w-8 rounded-md object-cover" loading="lazy" />
                <span className="truncate">{r.name}</span>
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
    <div className="rounded-2xl bg-white/5 px-4 py-3">
      <div className="text-lg font-black text-secondary">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">{icon}{title}</div>
      {children}
    </div>
  );
}
function Coupon({ code, desc }: { code: string; desc: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-dashed border-white/15 bg-white/5 px-3 py-2">
      <div>
        <div className="font-bold text-secondary">{code}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <button className="text-xs font-bold text-primary">APPLY</button>
    </div>
  );
}
