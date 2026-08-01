import { createFileRoute } from "@tanstack/react-router";
import { Gift, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rewards")({
  head: () => ({ meta: [{ title: "Rewards · FoodFusion" }] }),
  component: Rewards,
});

function Rewards() {
  const points = 340;
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6">
      <div className="glass-strong overflow-hidden rounded-3xl p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="grid h-20 w-20 place-items-center rounded-2xl shadow-glow" style={{ background: "var(--gradient-sunset)" }}>
            <Gift className="h-9 w-9 text-[oklch(0.16_0.03_265)]" style={{ animation: "float-y 3s ease-in-out infinite" }} />
          </div>
          <div>
            <div className="text-xs uppercase text-muted-foreground">FoodFusion Rewards</div>
            <div className="text-4xl font-black">{points} <span className="text-lg font-semibold text-secondary">pts</span></div>
            <div className="mt-1 text-sm text-muted-foreground">Every ₹100 spent = 10 pts</div>
          </div>
          <div className="ml-auto max-w-sm flex-1">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground"><span>Next: ₹350 OFF</span><span>{points}/500</span></div>
            <Progress value={(points / 500) * 100} className="h-2 bg-white/10" />
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { p: 100, r: "₹50 OFF" },
            { p: 250, r: "₹150 OFF" },
            { p: 500, r: "₹350 OFF" },
          ].map((t) => (
            <div key={t.p} className="rounded-2xl bg-white/5 p-4 text-center">
              <div className="text-xs text-muted-foreground">{t.p} pts</div>
              <div className="mt-1 text-lg font-bold text-secondary">{t.r}</div>
              <Button size="sm" className="mt-2 w-full rounded-xl" style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}>Redeem</Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="glass rounded-3xl p-5">
          <div className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-primary" /> Reward history</div>
          <ul className="mt-3 space-y-2 text-sm">
            {["+28 pts · Napoli Wood Fire", "-100 pts · Redeemed ₹50 OFF", "+15 pts · Daily spin bonus", "+42 pts · Spice Route Kitchen"].map((x) => (
              <li key={x} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-muted-foreground">{x}</li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-3xl p-5">
          <div className="text-sm font-semibold">Refer & Earn</div>
          <p className="mt-2 text-sm text-muted-foreground">Invite friends. Both get ₹100 on first order.</p>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 p-3">
            <code className="text-sm font-bold text-secondary">AARAV100</code>
            <Button size="sm" className="ml-auto rounded-full" variant="ghost">Copy</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
