import { createFileRoute } from "@tanstack/react-router";
import { Gift, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/rewards")({
  head: () => ({ meta: [{ title: "Rewards · FoodFusion" }] }),
  component: Rewards,
});

function Rewards() {
  const [points, setPoints] = useState(340);
  const [copied, setCopied] = useState(false);

  const handleRedeem = (requiredPts: number, rewardText: string) => {
    if (points < requiredPts) {
      toast.error(`You need ${requiredPts - points} more points to redeem ${rewardText}!`);
      return;
    }
    setPoints((prev) => prev - requiredPts);
    toast.success(`Successfully redeemed ${rewardText}!`, {
      description: "Coupon code added to your checkout wallet.",
    });
  };

  const handleCopyReferral = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("AARAV100");
    }
    setCopied(true);
    toast.success("Referral Code AARAV100 copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 space-y-8">
      <div className="glass-strong overflow-hidden rounded-3xl p-6 border border-white/10 shadow-soft">
        <div className="flex flex-wrap items-center gap-6">
          <div
            className="grid h-20 w-20 place-items-center rounded-2xl shadow-glow"
            style={{ background: "var(--gradient-sunset)" }}
          >
            <Gift
              className="h-9 w-9 text-[oklch(0.16_0.03_265)]"
              style={{ animation: "float-y 3s ease-in-out infinite" }}
            />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              FoodFusion Rewards
            </div>
            <div className="text-4xl font-black text-foreground">
              {points} <span className="text-lg font-semibold text-secondary">pts</span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">Every ₹100 spent = 10 pts</div>
          </div>
          <div className="ml-auto max-w-sm flex-1">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>Next Reward: ₹350 OFF</span>
              <span>{points}/500</span>
            </div>
            <Progress value={Math.min((points / 500) * 100, 100)} className="h-2.5 bg-white/10" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { p: 100, r: "₹50 OFF" },
            { p: 250, r: "₹150 OFF" },
            { p: 500, r: "₹350 OFF" },
          ].map((t) => (
            <div key={t.p} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="text-xs text-muted-foreground">{t.p} pts required</div>
              <div className="mt-1 text-xl font-bold text-secondary">{t.r}</div>
              <Button
                size="sm"
                onClick={() => handleRedeem(t.p, t.r)}
                disabled={points < t.p}
                className="mt-3 w-full rounded-xl font-bold transition-all shadow-glow disabled:opacity-40"
                style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
              >
                {points >= t.p ? "Redeem Now" : "Need More Pts"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass rounded-3xl p-6 border border-white/10">
          <div className="flex items-center gap-2 text-base font-bold text-foreground mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            Reward History
          </div>
          <ul className="space-y-2.5 text-sm">
            {[
              { t: "+28 pts · Napoli Wood Fire", d: "Yesterday" },
              { t: "-100 pts · Redeemed ₹50 OFF", d: "3 days ago" },
              { t: "+15 pts · Daily spin bonus", d: "5 days ago" },
              { t: "+42 pts · Spice Route Kitchen", d: "1 week ago" },
            ].map((x) => (
              <li
                key={x.t}
                className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2.5 text-xs text-muted-foreground border border-white/5"
              >
                <span className="font-medium text-foreground">{x.t}</span>
                <span className="text-[11px] opacity-70">{x.d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-3xl p-6 border border-white/10 space-y-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Refer & Earn ₹100</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Invite your friends to FoodFusion. You both get ₹100 credited when they place their first order.
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 p-3.5">
            <code className="text-base font-black tracking-wider text-secondary">AARAV100</code>
            <Button
              size="sm"
              onClick={handleCopyReferral}
              className="rounded-xl px-4 text-xs font-bold"
              style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? "Copied" : "Copy Code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
