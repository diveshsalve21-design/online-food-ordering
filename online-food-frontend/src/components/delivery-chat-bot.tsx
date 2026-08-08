import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Bike,
  Tag,
  FileText,
  PhoneCall,
  Sparkles,
  HelpCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStoredOrders } from "@/lib/cart";
import { getCurrentUser } from "@/routes/login";
import { toast } from "sonner";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
};

export function DeliveryChatBot() {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeUser = getCurrentUser();
  const orders = getStoredOrders();
  const activeLiveOrder = orders.length > 0 ? orders[0] : null;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: `Hello ${activeUser?.fullName ? activeUser.fullName.split(" ")[0] : "there"}! 👋 I am your Food Fusion AI Delivery Assistant. How can I help you with your order today?`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const addBotMessage = (text: string, actionButton?: { label: string; onClick: () => void }) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionButton,
        },
      ]);
    }, 600);
  };

  const handleSend = (userText?: string) => {
    const text = (userText || inputText).trim();
    if (!text) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInputText("");

    const lower = text.toLowerCase();

    // AI Bot Intent Processing
    if (lower.includes("where") || lower.includes("status") || lower.includes("track") || lower.includes("order")) {
      if (activeLiveOrder) {
        addBotMessage(
          `🚀 Your order #${activeLiveOrder.id} is ON THE WAY! Assigned rider Naman is approx 1.8 km away and arriving in ~14 mins.`,
          {
            label: "View Live Map",
            onClick: () => {
              setOpen(false);
              if (typeof window !== "undefined") window.location.href = "/orders";
            },
          }
        );
      } else {
        addBotMessage(
          "You don't have any active live delivery in progress right now. Would you like to check our delicious menu?",
          {
            label: "Explore Menu",
            onClick: () => {
              setOpen(false);
              if (typeof window !== "undefined") window.location.href = "/menu";
            },
          }
        );
      }
    } else if (lower.includes("rider") || lower.includes("call") || lower.includes("driver") || lower.includes("naman")) {
      addBotMessage(
        "📞 Your assigned delivery partner is Naman Sharma (+91 98201 44102). Riding Bajaj Pulsar (MH 05 EV 9821). Rating: 4.9 ★",
        {
          label: "Call Rider Naman",
          onClick: () => {
            toast.info("Calling Delivery Partner Naman (+91 98201 44102)...");
            if (typeof window !== "undefined") window.location.href = "tel:+919820144102";
          },
        }
      );
    } else if (lower.includes("coupon") || lower.includes("offer") || lower.includes("discount") || lower.includes("code")) {
      addBotMessage(
        "🎟️ Here are the active working coupons:\n• FLASH60 : 60% OFF up to ₹120\n• QUIZ100 : Flat ₹100 OFF\n• SCRATCHFREE : Free Dessert + ₹50 OFF & Free Delivery!",
        {
          label: "View All Offers",
          onClick: () => {
            setOpen(false);
            if (typeof window !== "undefined") window.location.href = "/offers";
          },
        }
      );
    } else if (lower.includes("invoice") || lower.includes("bill") || lower.includes("receipt") || lower.includes("payment")) {
      addBotMessage(
        "📄 All your tax invoices and Razorpay test mode payment receipts are saved in your Order History. You can view & download PDF invoices anytime!",
        {
          label: "Order History & Invoices",
          onClick: () => {
            setOpen(false);
            if (typeof window !== "undefined") window.location.href = "/orders";
          },
        }
      );
    } else {
      addBotMessage(
        `Thanks for reaching out! I can help you track your live food order, contact your delivery rider, or find discount coupons. What would you like to do?`
      );
    }
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full px-4 py-3 text-black font-bold text-sm shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/30"
          style={{ background: "var(--gradient-sunset)" }}
        >
          <div className="relative">
            <Bot className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>
          <span className="hidden sm:inline font-black">Delivery Support</span>
        </button>
      )}

      {/* FLOATING CHAT BOT MODAL */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[360px] sm:max-w-[390px] overflow-hidden rounded-3xl border border-white/20 bg-slate-950/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3.5 border-b border-white/10"
            style={{ background: "var(--gradient-sunset)" }}
          >
            <div className="flex items-center gap-2.5 text-black">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-black/20 text-black font-bold">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="font-black text-sm tracking-tight flex items-center gap-1.5">
                  Delivery Assistant <Sparkles className="h-3.5 w-3.5 text-amber-950" />
                </div>
                <div className="text-[10px] font-bold text-black/70 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 animate-pulse" /> Online · Instant Support
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-black/70 hover:bg-black/10 hover:text-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-primary text-black font-semibold rounded-br-none shadow-glow"
                      : "bg-white/10 text-foreground border border-white/10 rounded-bl-none"
                  }`}
                >
                  {m.text}

                  {m.actionButton && (
                    <div className="mt-2.5 pt-2 border-t border-white/15">
                      <Button
                        size="sm"
                        onClick={m.actionButton.onClick}
                        className="w-full h-8 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-[11px] cursor-pointer"
                      >
                        {m.actionButton.label}
                      </Button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-muted-foreground mt-1 px-1">{m.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Pills */}
          <div className="px-3 py-2 bg-white/5 border-t border-white/10 flex flex-wrap gap-1.5">
            <button
              onClick={() => handleSend("Where is my order?")}
              className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bike className="h-3 w-3 text-primary" /> Track Order
            </button>
            <button
              onClick={() => handleSend("Contact Delivery Rider")}
              className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <PhoneCall className="h-3 w-3 text-emerald-400" /> Call Rider Naman
            </button>
            <button
              onClick={() => handleSend("Active Coupons")}
              className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Tag className="h-3 w-3 text-secondary" /> Coupons
            </button>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-black/40 border-t border-white/10 flex items-center gap-2"
          >
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about live delivery, rider, coupons..."
              className="h-10 rounded-xl border-white/10 bg-white/5 text-xs text-foreground placeholder:text-muted-foreground/60"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputText.trim()}
              className="h-10 w-10 shrink-0 rounded-xl text-black font-bold disabled:opacity-40 cursor-pointer shadow-glow"
              style={{ background: "var(--gradient-sunset)" }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
