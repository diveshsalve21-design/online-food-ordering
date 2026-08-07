import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles, Trophy, Zap, Copy, Check, Flame, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const PRIZES = [
  { id: "lava", label: "🎁 FREE Lava Cake", wheelText: "🎁 FREE LAVA CAKE", code: "SCRATCHFREE", minOrder: 199, color: "#f59e0b" },
  { id: "flat100", label: "🎟️ Flat ₹100 OFF", wheelText: "🎟️ FLAT ₹100 OFF", code: "QUIZ100", minOrder: 199, color: "#10b981" },
  { id: "flash60", label: "⚡ 60% OFF Order", wheelText: "⚡ 60% OFF ORDER", code: "FLASH60", minOrder: 249, color: "#ef4444" },
  { id: "freedel", label: "🛵 FREE Delivery", wheelText: "🛵 FREE DELIVERY", code: "FREEDEL", minOrder: 149, color: "#3b82f6" },
  { id: "bogo", label: "🍕 BOGO 50% OFF", wheelText: "🍕 BOGO 50% OFF", code: "BOGO", minOrder: 249, color: "#8b5cf6" },
  { id: "bonus", label: "💰 ₹50 Bonus Cash", wheelText: "💰 ₹50 BONUS CASH", code: "FOODFUN50", minOrder: 149, color: "#ec4899" },
];

export function RewardsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<(typeof PRIZES)[0] | null>(null);
  const [copied, setCopied] = useState(false);

  // Daily Spin Limit State (Default 1 Spin Per Day)
  const [spinsLeft, setSpinsLeft] = useState<number>(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSpins = localStorage.getItem("foodfun_spins_count");
      if (savedSpins !== null) {
        setSpinsLeft(parseInt(savedSpins, 10));
      } else {
        localStorage.setItem("foodfun_spins_count", "1");
        setSpinsLeft(1);
      }
    }
  }, [open]);

  const handleSpin = () => {
    if (spinning) return;

    if (spinsLeft <= 0) {
      toast.error("⛔ Spin Limit Reached!", {
        description: "You have used your 1 Daily Spin. Place a food order to unlock +1 Bonus Spin!",
      });
      return;
    }

    setSpinning(true);
    setWonPrize(null);

    // Decrement spins count
    const nextSpins = spinsLeft - 1;
    setSpinsLeft(nextSpins);
    if (typeof window !== "undefined") {
      localStorage.setItem("foodfun_spins_count", nextSpins.toString());
    }

    // Pick random prize index
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const targetPrize = PRIZES[prizeIndex];

    // Calculate rotation degrees (5 full spins + slice offset)
    const sliceAngle = 360 / PRIZES.length;
    const extraRounds = 360 * 5;
    // Align target slice to 12 o'clock pointer (top)
    const targetDegree = extraRounds + (PRIZES.length - prizeIndex) * sliceAngle - sliceAngle / 2;

    setRotation((prev) => prev + targetDegree);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(targetPrize);
      toast.success(`Cool! Not bad! 🎉 You won ${targetPrize.label}!`, {
        description: `Code: "${targetPrize.code}" (Min order ₹${targetPrize.minOrder})`,
      });
    }, 4000);
  };

  const handleAddBonusSpin = () => {
    const nextSpins = spinsLeft + 1;
    setSpinsLeft(nextSpins);
    if (typeof window !== "undefined") {
      localStorage.setItem("foodfun_spins_count", nextSpins.toString());
    }
    toast.success("🎟️ +1 Bonus Spin Unlocked!", {
      description: "You have received 1 extra spin credit.",
    });
  };

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success(`Coupon code "${code}" copied to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // SVG Radial Slice Helper Math
  const numSlices = PRIZES.length;
  const sliceDeg = 360 / numSlices;
  const R = 145; // Outer radius
  const cx = 150;
  const cy = 150;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-white/20 bg-[color:var(--surface)] text-foreground rounded-3xl p-6 shadow-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-black text-foreground flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-amber-400 animate-bounce" />
            FoodFun Spin & Win Rewards!
          </DialogTitle>
          
          {/* 🎟️ SPIN LIMIT COUNTER BADGE */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              spinsLeft > 0 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}>
              🎟️ {spinsLeft} Spin{spinsLeft === 1 ? "" : "s"} Remaining Today
            </span>
            {spinsLeft <= 0 && (
              <button
                type="button"
                onClick={handleAddBonusSpin}
                className="text-[10px] font-bold text-amber-400 underline hover:text-amber-300 cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" /> Get Bonus Spin
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="mt-4 flex flex-col items-center space-y-5">
          {/* 🎡 ULTRA-CRISP SVG 3D FORTUNE WHEEL */}
          <div className="relative h-72 w-72 flex items-center justify-center">
            {/* Top Pointer Arrow */}
            <div className="absolute -top-3 z-30 h-0 w-0 border-x-8 border-x-transparent border-t-[18px] border-t-amber-400 drop-shadow-xl" />

            {/* Outer Glowing Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-amber-400/50 shadow-glow animate-pulse" />

            {/* Rotating SVG Wheel Body */}
            <div
              className="h-full w-full rounded-full overflow-hidden shadow-2xl border-4 border-amber-400 transition-transform duration-[4000ms] ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <svg viewBox="0 0 300 300" className="h-full w-full">
                {PRIZES.map((prize, i) => {
                  // Angles starting from top (-90deg)
                  const startAngle = i * sliceDeg - 90;
                  const endAngle = (i + 1) * sliceDeg - 90;
                  const midAngle = startAngle + sliceDeg / 2;

                  const radStart = (startAngle * Math.PI) / 180;
                  const radEnd = (endAngle * Math.PI) / 180;
                  const radMid = (midAngle * Math.PI) / 180;

                  const x1 = cx + R * Math.cos(radStart);
                  const y1 = cy + R * Math.sin(radStart);
                  const x2 = cx + R * Math.cos(radEnd);
                  const y2 = cy + R * Math.sin(radEnd);

                  // Radial position for text (85px from center)
                  const textR = 92;
                  const tx = cx + textR * Math.cos(radMid);
                  const ty = cy + textR * Math.sin(radMid);

                  // Text rotation angle
                  const textRotate = midAngle + 90;

                  return (
                    <g key={prize.id}>
                      {/* Wedge Slice Path */}
                      <path
                        d={`M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`}
                        fill={prize.color}
                        stroke="#1e293b"
                        strokeWidth="2"
                      />
                      {/* Bold Crisp Reward Text */}
                      <text
                        x={tx}
                        y={ty}
                        fill="#ffffff"
                        fontSize="10"
                        fontWeight="900"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${textRotate}, ${tx}, ${ty})`}
                        style={{
                          fontFamily: "system-ui, sans-serif",
                          letterSpacing: "0.5px",
                          filter: "drop-shadow(0px 1.5px 2px rgba(0,0,0,0.8))",
                        }}
                      >
                        {prize.wheelText}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Center Spin Button Badge */}
            <button
              type="button"
              onClick={handleSpin}
              disabled={spinning || spinsLeft <= 0}
              className="absolute z-20 grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-slate-950 text-xs font-black text-amber-400 shadow-2xl transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {spinning ? <Sparkles className="h-6 w-6 animate-spin text-amber-400" /> : spinsLeft > 0 ? "SPIN!" : "0 LEFT"}
            </button>
          </div>

          {/* 🏆 WON PRIZE CELEBRATION BOX */}
          {wonPrize ? (
            <div className="w-full rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center space-y-2 animate-in zoom-in-95">
              <div className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1">
                <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Cool! Not Bad! 🌟 Reward Unlocked!
              </div>
              <div className="text-lg font-black text-white">{wonPrize.label}</div>
              <div className="text-[11px] text-muted-foreground font-medium">Valid on minimum food order of ₹{wonPrize.minOrder}</div>
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="font-mono text-sm font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-500/30">
                  {wonPrize.code}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopyCode(wonPrize.code)}
                  className="h-8 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/10"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          ) : spinsLeft <= 0 ? (
            <div className="w-full rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-center text-xs text-amber-300 font-semibold flex items-center justify-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Daily spin limit reached! Place an order or click "Get Bonus Spin".
            </div>
          ) : (
            <Button
              onClick={handleSpin}
              disabled={spinning || spinsLeft <= 0}
              className="w-full h-12 rounded-2xl font-black text-sm shadow-glow cursor-pointer disabled:opacity-50"
              style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
            >
              <Flame className="mr-2 h-5 w-5" /> Spin Fortune Wheel ({spinsLeft} Left)
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
