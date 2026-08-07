import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, QrCode, Copy, Check, Plus, UserPlus, Sparkles, Receipt, Building2, Flame } from "lucide-react";
import { useCart, inr } from "@/lib/cart";
import { toast } from "sonner";

export function GroupOrderModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { items, add, subtotal, gst, delivery, total } = useCart();
  const [copied, setCopied] = useState(false);
  const [roomCode] = useState("FF-ROOM-9821");

  // Simulated Group Room Members
  const [members, setMembers] = useState([
    { name: "Divesh Salve (Host 👑)", itemsCount: items.length > 0 ? items.length : 1, amount: subtotal > 0 ? Math.round(subtotal * 0.6) : 240 },
    { name: "Pritesh Kanitkar", itemsCount: 1, amount: 189 },
  ]);

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/group?code=${roomCode}` : "http://localhost:8080/group";
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Group Room Link copied to clipboard!", {
        description: "Share this link with friends to let them order from their phones.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSimulateFriendJoin = () => {
    // Add friend dish to cart
    add({
      id: "grill-burger",
      name: "Smoky Chicken Burger",
      price: 289,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=95",
      veg: false,
      restaurantName: "Burger Lab",
    });

    setMembers((prev) => [
      ...prev,
      { name: "Rashmin Oak", itemsCount: 1, amount: 289 },
    ]);

    toast.success("Friend Rashmin Oak joined the Group Room!", {
      description: "Rashmin added 1x Smoky Chicken Burger from Burger Lab.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-white/20 bg-[color:var(--surface)] text-foreground rounded-3xl p-6 shadow-2xl space-y-4">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-black text-foreground flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            AI Group Order Room & Bill Splitter
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Order food with friends! Friends scan QR code, add dishes from their phones, and AI splits the bill automatically.
          </p>
        </DialogHeader>

        {/* 📱 ROOM CODE & QR CODE BOX */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* QR Code Container */}
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-white p-2 shadow-lg text-slate-900">
            <QrCode className="h-full w-full" />
          </div>

          <div className="flex-1 space-y-1.5 min-w-0">
            <div className="text-xs text-muted-foreground font-semibold">Active Group Room Code</div>
            <div className="text-xl font-mono font-black text-primary tracking-wider">{roomCode}</div>
            <div className="flex items-center gap-2 pt-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyLink}
                className="h-8 rounded-xl border border-white/10 bg-white/10 text-xs font-bold hover:bg-white/20 cursor-pointer"
              >
                {copied ? <Check className="mr-1 h-3.5 w-3.5 text-emerald-400" /> : <Copy className="mr-1 h-3.5 w-3.5 text-primary" />}
                {copied ? "Link Copied" : "Copy Room Link"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSimulateFriendJoin}
                className="h-8 rounded-xl border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold hover:bg-secondary/20 cursor-pointer"
              >
                <UserPlus className="mr-1 h-3.5 w-3.5" /> + Simulate Friend
              </Button>
            </div>
          </div>
        </div>

        {/* 🧮 LIVE MEMBERS & AUTO BILL SPLIT TABLE */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Receipt className="h-4 w-4 text-emerald-400" /> Live Member Bill Breakdown</span>
            <span>{members.length} Members</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {members.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between gap-2 rounded-2xl bg-white/5 p-3 border border-white/5 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/20 text-[10px] font-black text-primary">
                    {m.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="truncate min-w-0">
                    <div className="font-bold text-foreground truncate">{m.name}</div>
                    <div className="text-[10px] text-muted-foreground">{m.itemsCount} Item(s) Selected</div>
                  </div>
                </div>
                <div className="text-right whitespace-nowrap">
                  <div className="font-black text-emerald-400">{inr(m.amount)}</div>
                  <div className="text-[10px] text-muted-foreground">Individual Share</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Summary Bar */}
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-3.5 flex items-center justify-between text-xs font-bold">
          <div>
            <div className="text-muted-foreground">Total Combined Group Cart</div>
            <div className="text-lg font-black text-primary">{inr(total > 0 ? total : 429)}</div>
          </div>
          <Button
            onClick={() => {
              onOpenChange(false);
              toast.success("Group Cart updated! Ready for Razorpay single-click split checkout.");
            }}
            className="h-10 rounded-xl text-xs font-bold shadow-glow cursor-pointer"
            style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
          >
            <Flame className="mr-1.5 h-4 w-4" /> Proceed to Group Checkout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
