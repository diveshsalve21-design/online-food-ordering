import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  CreditCard,
  MapPin,
  Truck,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Loader2,
  QrCode,
  Building,
  Smartphone,
  X,
  Lock,
  Tag,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useCart, inr } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout · Online Food Ordering System" },
      { name: "description", content: "Complete your food order with Razorpay test mode payment." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, gst, delivery: baseDelivery, clear, saveOrder } = useCart();

  // Delivery form state
  const [fullName, setFullName] = useState("Divesh Salve");
  const [phone, setPhone] = useState("9876543210");
  const [houseNo, setHouseNo] = useState("Flat 402, Sunshine Apartments");
  const [street, setStreet] = useState("Station Road, West");
  const [city, setCity] = useState("Kalyan");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("421 306");
  const [instructions, setInstructions] = useState("");

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "upi" | "card" | "cod">("razorpay");

  // Order status
  const [placed, setPlaced] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{ paymentId: string; orderId: string } | null>(null);

  // Coupon / Redeem Code State
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number; isFreeDelivery: boolean } | null>(null);

  // Calculate totals with coupon discount
  const delivery = appliedCoupon?.isFreeDelivery ? 0 : baseDelivery;
  const rawTotal = subtotal + gst + delivery;
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const total = Math.max(0, rawTotal - discount);

  // Razorpay Interactive Test Modal
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [rzpTab, setRzpTab] = useState<"card" | "upi" | "netbanking">("upi");
  const [testUpiId, setTestUpiId] = useState("divesh@okhdfcbank");
  const [testCardNumber, setTestCardNumber] = useState("4111 •••• •••• 1111");
  const [testCardExpiry, setTestCardExpiry] = useState("12/28");
  const [testCardCvv, setTestCardCvv] = useState("123");
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) {
      toast.error("Please enter a valid coupon code!");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty! Add items first.");
      return;
    }

    // Coupon Validation Logic
    if (code === "FLASH60" || code === "SPIN60") {
      const calcDiscount = Math.min(Math.round(subtotal * 0.6), 120);
      setAppliedCoupon({ code, discountAmount: calcDiscount, isFreeDelivery: false });
      toast.success(`Coupon "${code}" Applied! Saved ${inr(calcDiscount)}`);
    } else if (code === "QUIZ100" || code === "AARAV100" || code === "REFER100") {
      const calcDiscount = 100;
      setAppliedCoupon({ code, discountAmount: calcDiscount, isFreeDelivery: false });
      toast.success(`Coupon "${code}" Applied! Flat ₹100 OFF`);
    } else if (code === "SCRATCHFREE") {
      const calcDiscount = 50;
      setAppliedCoupon({ code, discountAmount: calcDiscount, isFreeDelivery: true });
      toast.success(`Coupon "${code}" Applied! Free Dessert + ₹50 OFF & FREE Delivery!`);
    } else if (code === "FREEDEL") {
      setAppliedCoupon({ code, discountAmount: 0, isFreeDelivery: true });
      toast.success(`Coupon "${code}" Applied! FREE Delivery Unlocked`);
    } else if (code === "BOGO" || code === "WEEKEND") {
      const calcDiscount = Math.round(subtotal * 0.5);
      setAppliedCoupon({ code, discountAmount: calcDiscount, isFreeDelivery: false });
      toast.success(`Coupon "${code}" Applied! Saved ${inr(calcDiscount)}`);
    } else {
      toast.error(`Invalid Coupon Code "${code}". Try FLASH60 or QUIZ100!`);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.info("Coupon removed.");
  };

  const handlePaymentSuccess = (paymentId: string) => {
    const mockOrderId = "ORD_" + Math.floor(100000 + Math.random() * 900000);
    const finalPaymentId = paymentId || "pay_rzp_test_" + Math.random().toString(36).substring(2, 10);
    
    // Persist placed order into Order History
    saveOrder({
      id: mockOrderId,
      paymentId: finalPaymentId,
      customerName: fullName,
      phone: phone,
      address: `${houseNo}, ${street}, ${city}, ${state} - ${pincode}`,
      items: [...items],
      subtotal: subtotal,
      gst: gst,
      delivery: delivery,
      discount: discount,
      total: total,
      status: "On the way",
      paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Razorpay (Test Mode)",
    });

    setPaymentDetails({
      paymentId: finalPaymentId,
      orderId: mockOrderId,
    });
    setPlaced(true);
    setShowRazorpayModal(false);
    setIsAuthorizing(false);
    clear();
    toast.success("Razorpay Payment Successful!", {
      description: `Payment ID: ${finalPaymentId}`,
    });
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty! Add items before placing an order.");
      return;
    }

    if (!fullName || !phone || !street || !city) {
      toast.error("Please fill in your delivery address details.");
      return;
    }

    if (paymentMethod === "cod") {
      setIsAuthorizing(true);
      setTimeout(() => {
        handlePaymentSuccess("pay_cod_" + Math.floor(100000 + Math.random() * 900000));
      }, 1000);
    } else {
      setShowRazorpayModal(true);
    }
  };

  const executeRazorpayTestPay = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      handlePaymentSuccess("pay_rzp_test_" + Math.random().toString(36).substring(2, 10));
    }, 1500);
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="glass-strong space-y-6 rounded-3xl p-8 border border-white/10 shadow-glow">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent/20 text-accent">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground">Order Confirmed!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you for ordering with Online Food Ordering System. Delivery to <span className="font-semibold text-foreground">{fullName} ({city})</span>.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4 text-left space-y-2 text-sm border border-white/10">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-bold text-foreground">{paymentDetails?.orderId}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-muted-foreground">Razorpay Payment ID</span>
              <span className="font-mono text-xs text-secondary">{paymentDetails?.paymentId}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold text-accent flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Paid via Razorpay (Test Mode)
              </span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between border-b border-white/10 pb-2 text-xs">
                <span className="text-muted-foreground">Coupon Discount ({appliedCoupon.code})</span>
                <span className="font-bold text-accent">-{inr(appliedCoupon.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between pt-1 font-bold text-base">
              <span>Amount Paid</span>
              <span className="text-primary">{inr(total)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              className="flex-1 rounded-xl font-bold shadow-glow cursor-pointer"
              style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
              onClick={() => navigate({ to: "/orders" })}
            >
              Track Live Order
            </Button>
            <Button
              variant="ghost"
              className="flex-1 rounded-xl border border-white/10 text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => navigate({ to: "/" })}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          <span>Back to Menu</span>
        </Link>

        {/* Razorpay Test Mode Badge */}
        <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs text-blue-400 font-semibold shadow-glow">
          <Zap className="h-3.5 w-3.5 text-blue-400" />
          <span>Razorpay Test Mode Active</span>
        </div>
      </div>

      <form onSubmit={handleStartPayment} className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          {/* Delivery Address */}
          <SectionCard title="Delivery Address" icon={<MapPin className="h-4 w-4 text-primary" />}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="rounded-xl border-white/10 bg-white/5 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Phone Number</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="rounded-xl border-white/10 bg-white/5 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Flat / House / Building</label>
              <Input
                value={houseNo}
                onChange={(e) => setHouseNo(e.target.value)}
                placeholder="Flat / House no."
                className="rounded-xl border-white/10 bg-white/5 text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Street & Area</label>
              <Input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Street, Area"
                className="rounded-xl border-white/10 bg-white/5 text-sm"
                required
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">City</label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="rounded-xl border-white/10 bg-white/5 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">State</label>
                <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="rounded-xl border-white/10 bg-white/5 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">PIN Code</label>
                <Input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="PIN"
                  className="rounded-xl border-white/10 bg-white/5 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Delivery Instructions (Optional)</label>
              <Textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="E.g. Leave with guard, ring doorbell..."
                className="rounded-xl border-white/10 bg-white/5 text-sm min-h-[70px]"
              />
            </div>
          </SectionCard>

          {/* Payment Method Section */}
          <SectionCard title="Payment Method" icon={<CreditCard className="h-4 w-4 text-primary" />}>
            <div className="space-y-3">
              {/* Razorpay Gateway Option */}
              <label
                onClick={() => setPaymentMethod("razorpay")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                  paymentMethod === "razorpay"
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    className="accent-primary h-4 w-4"
                  />
                  <div>
                    <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                      <span>Razorpay Payment Gateway</span>
                      <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                        TEST MODE
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Instant UPI, Cards, Google Pay, PhonePe & NetBanking
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-blue-900/40 px-2.5 py-1 border border-blue-500/30 text-xs font-bold text-blue-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                  Razorpay
                </div>
              </label>

              {/* Instant UPI */}
              <label
                onClick={() => setPaymentMethod("upi")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                  paymentMethod === "upi"
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="accent-primary h-4 w-4"
                  />
                  <div>
                    <div className="font-bold text-foreground text-sm flex items-center gap-2">
                      <span>UPI (GPay / PhonePe / Paytm)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Pay via UPI QR code or VPA</p>
                  </div>
                </div>
                <QrCode className="h-5 w-5 text-secondary" />
              </label>

              {/* Credit / Debit Cards */}
              <label
                onClick={() => setPaymentMethod("card")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-primary h-4 w-4"
                  />
                  <div>
                    <div className="font-bold text-foreground text-sm">Credit / Debit Card</div>
                    <p className="text-xs text-muted-foreground">Visa, Mastercard, RuPay, Maestro</p>
                  </div>
                </div>
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </label>

              {/* Cash on Delivery */}
              <label
                onClick={() => setPaymentMethod("cod")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                  paymentMethod === "cod"
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-primary h-4 w-4"
                  />
                  <div>
                    <div className="font-bold text-foreground text-sm">Cash on Delivery</div>
                    <p className="text-xs text-muted-foreground">Pay in cash when order arrives at doorstep</p>
                  </div>
                </div>
                <Truck className="h-5 w-5 text-muted-foreground" />
              </label>
            </div>
          </SectionCard>
        </div>

        {/* Order Summary & Payment Action */}
        <div className="space-y-4">
          <div className="glass-strong sticky top-24 rounded-3xl p-6 border border-white/10 shadow-soft">
            <div className="flex items-center gap-2 text-base font-bold text-foreground mb-4">
              <Truck className="h-5 w-5 text-primary" />
              Order Summary
            </div>

            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 text-sm">
              {items.length === 0 ? (
                <div className="text-muted-foreground text-center py-6">Your cart is empty.</div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2">
                    <span className="truncate text-muted-foreground">
                      <span className="font-semibold text-foreground">{item.qty}×</span> {item.name}
                    </span>
                    <span className="font-medium text-foreground">{inr(item.price * item.qty)}</span>
                  </div>
                ))
              )}
            </div>

            {/* 🎟️ COUPON REDEEM CODE INPUT SECTION */}
            <div className="mt-4 border-t border-white/10 pt-4 space-y-2">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-secondary" /> Redeem Coupon Code
              </label>
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-400" />
                    Coupon "{appliedCoupon.code}" Applied ({inr(appliedCoupon.discountAmount)} OFF)
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-xs text-rose-400 hover:underline font-bold px-1"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter code (e.g. FLASH60)"
                    className="rounded-xl border-white/10 bg-white/5 text-xs font-mono tracking-wider uppercase h-10"
                  />
                  <Button
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    className="h-10 rounded-xl text-xs font-bold px-4 shadow-glow"
                    style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                  >
                    Apply
                  </Button>
                </div>
              )}

              {/* Quick Coupon Suggestions */}
              {!appliedCoupon && (
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                  <span className="text-muted-foreground self-center">Try:</span>
                  {["FLASH60", "QUIZ100", "SCRATCHFREE"].map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setCouponCode(code);
                        handleApplyCoupon(code);
                      }}
                      className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-secondary hover:bg-white/10"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-muted-foreground">
              <SummaryRow label="Subtotal" value={inr(subtotal)} />
              <SummaryRow label="GST (5%)" value={inr(gst)} />
              <SummaryRow
                label="Delivery Fee"
                value={delivery === 0 ? "FREE" : inr(delivery)}
                valueClass={delivery === 0 ? "text-accent font-bold" : ""}
              />
              {appliedCoupon && appliedCoupon.discountAmount > 0 && (
                <div className="flex justify-between text-accent font-bold text-xs">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>-{inr(appliedCoupon.discountAmount)}</span>
                </div>
              )}
              <div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-lg font-black text-foreground">
                <span>Total Payable</span>
                <span className="text-primary">{inr(total)}</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={items.length === 0 || isAuthorizing}
              className="mt-6 h-12 w-full rounded-xl text-base font-bold transition-all shadow-glow hover:brightness-110 disabled:opacity-50 cursor-pointer"
              style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
            >
              <span className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Pay {inr(total)} via {paymentMethod === "cod" ? "COD" : "Razorpay (Test Mode)"}
              </span>
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>Encrypted 256-bit Razorpay Sandbox SSL</span>
            </div>
          </div>
        </div>
      </form>

      {/* Razorpay Interactive Test Checkout Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
            {/* Razorpay Top Header */}
            <div className="bg-[#0c2340] px-6 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black text-white text-lg">
                  R
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <span>Online Food Ordering System</span>
                    <span className="rounded-full bg-blue-500/30 px-2 py-0.5 text-[9px] font-bold text-blue-300 uppercase">
                      TEST MODE
                    </span>
                  </div>
                  <div className="text-xs text-blue-200/70">Merchant ID: TMuBr5MC7iovU2</div>
                </div>
              </div>
              <button
                onClick={() => setShowRazorpayModal(false)}
                className="rounded-full p-1.5 text-blue-200/70 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Total Amount Bar */}
            <div className="bg-[#122e52] px-6 py-3 flex items-center justify-between border-b border-white/10 text-xs">
              <span className="text-blue-200">Amount to Pay</span>
              <span className="text-lg font-black text-white">{inr(total)}</span>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="p-6 space-y-5">
              <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setRzpTab("upi")}
                  className={`flex-1 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    rzpTab === "upi" ? "bg-primary text-black shadow-glow" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  UPI / QR
                </button>
                <button
                  type="button"
                  onClick={() => setRzpTab("card")}
                  className={`flex-1 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    rzpTab === "card" ? "bg-primary text-black shadow-glow" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Cards
                </button>
                <button
                  type="button"
                  onClick={() => setRzpTab("netbanking")}
                  className={`flex-1 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    rzpTab === "netbanking" ? "bg-primary text-black shadow-glow" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  <Building className="h-3.5 w-3.5" />
                  NetBanking
                </button>
              </div>

              {/* Tab Contents */}
              {rzpTab === "upi" && (
                <div className="space-y-3">
                  <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-center">
                    <QrCode className="mx-auto h-12 w-12 text-secondary mb-2" />
                    <p className="text-xs text-muted-foreground">Scan QR or enter VPA</p>
                    <Input
                      value={testUpiId}
                      onChange={(e) => setTestUpiId(e.target.value)}
                      className="mt-2 text-center text-sm rounded-xl border-white/10 bg-white/5"
                      placeholder="vpa@upi"
                    />
                  </div>
                </div>
              )}

              {rzpTab === "card" && (
                <div className="space-y-3 text-left">
                  <div>
                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                      Test Card Number
                    </label>
                    <Input
                      value={testCardNumber}
                      onChange={(e) => setTestCardNumber(e.target.value)}
                      className="rounded-xl border-white/10 bg-white/5 text-sm font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Expiry</label>
                      <Input
                        value={testCardExpiry}
                        onChange={(e) => setTestCardExpiry(e.target.value)}
                        className="rounded-xl border-white/10 bg-white/5 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">CVV</label>
                      <Input
                        value={testCardCvv}
                        onChange={(e) => setTestCardCvv(e.target.value)}
                        className="rounded-xl border-white/10 bg-white/5 text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {rzpTab === "netbanking" && (
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak", "Yes Bank"].map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center font-medium hover:border-primary hover:bg-white/10"
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              )}

              {/* Pay Button */}
              <Button
                onClick={executeRazorpayTestPay}
                disabled={isAuthorizing}
                className="w-full h-12 rounded-xl text-base font-bold transition-all shadow-glow"
                style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
              >
                {isAuthorizing ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Authorizing Razorpay Test Payment...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" />
                    Pay {inr(total)} (Test Success)
                  </span>
                )}
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                <span>Secured by Razorpay Payments India</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="glass-strong space-y-4 rounded-3xl p-6 border border-white/10 shadow-soft">
      <div className="flex items-center gap-2 text-base font-bold text-foreground">{icon}{title}</div>
      {children}
    </section>
  );
}

function SummaryRow({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}
