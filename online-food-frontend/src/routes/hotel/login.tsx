import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  UtensilsCrossed,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const Route = createFileRoute("/hotel/login")({
  head: () => ({
    meta: [
      { title: "Hotel Partner Login · FoodFusion" },
      {
        name: "description",
        content: "Partner login portal for restaurant and hotel management on FoodFusion.",
      },
    ],
  }),
  component: HotelLogin,
});

function HotelLogin() {
  const navigate = useNavigate();

  // Form states (Pre-filled for Divesh Salve)
  const [email, setEmail] = useState("divesh.salve@foodfusion.com");
  const [password, setPassword] = useState("Divesh@123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Validation error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password modal states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [isForgotSending, setIsForgotSending] = useState(false);

  const validateEmail = (val: string) => {
    if (!val.trim()) {
      return "Hotel Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      return "Please enter a valid email address (e.g. hotel@fusion.in)";
    }
    return "";
  };

  const validatePassword = (val: string) => {
    if (!val) {
      return "Password is required";
    }
    if (val.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      setEmailError(validateEmail(val));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (touched.password) {
      setPasswordError(validatePassword(val));
    }
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    setPasswordError(validatePassword(password));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    const eErr = validateEmail(email);
    const pErr = validatePassword(password);

    setEmailError(eErr);
    setPasswordError(pErr);

    if (eErr || pErr) {
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate authentication request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Hotel Login Successful!", {
        description: `Welcome back to FoodFusion Partner Hub, ${email}`,
      });

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "hotel_user",
          JSON.stringify({
            email,
            rememberMe,
            role: "hotel_partner",
            loggedInAt: new Date().toISOString(),
          })
        );
      }

      setTimeout(() => {
        navigate({ to: "/hotel/dashboard" });
      }, 1000);
    } catch (err) {
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(forgotEmail);
    if (err) {
      setForgotError(err);
      return;
    }
    setForgotError("");
    setIsForgotSending(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsForgotSending(false);
    setForgotSubmitted(true);
    toast.success("Reset link dispatched to " + forgotEmail);
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setForgotEmail("");
    setForgotSubmitted(false);
    setForgotError("");
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Top Header & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 text-primary" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            <span>Partner Security</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-white/10 shadow-soft">
          {/* Top Decorative Banner */}
          <div className="mb-6 text-center">
            <div
              className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow transition-transform hover:scale-105"
              style={{ background: "var(--gradient-sunset)" }}
            >
              <Building2 className="h-7 w-7 text-[oklch(0.16_0.03_265)]" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Hotel Partner <span className="gradient-text">Login</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Access your restaurant dashboard, manage live orders, and update menus.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Hotel Email Field */}
            <div className="space-y-2">
              <Label htmlFor="hotel-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Hotel Email
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="hotel-email"
                  type="email"
                  placeholder="divesh.salve@foodfusion.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  aria-invalid={!!emailError}
                  disabled={isSubmitting}
                  className={`h-11 rounded-xl border pl-10 pr-4 text-sm bg-white/5 text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:ring-primary ${
                    emailError
                      ? "border-destructive/80 focus-visible:ring-destructive"
                      : touched.email && !emailError && email
                      ? "border-accent/60"
                      : "border-white/10"
                  }`}
                />
              </div>
              {emailError && (
                <div className="flex items-center gap-1.5 text-xs text-destructive font-medium animate-in fade-in-50">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{emailError}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="hotel-password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="hotel-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  aria-invalid={!!passwordError}
                  disabled={isSubmitting}
                  className={`h-11 rounded-xl border pl-10 pr-10 text-sm bg-white/5 text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:ring-primary ${
                    passwordError
                      ? "border-destructive/80 focus-visible:ring-destructive"
                      : touched.password && !passwordError && password
                      ? "border-accent/60"
                      : "border-white/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <div className="flex items-center gap-1.5 text-xs text-destructive font-medium animate-in fade-in-50">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  disabled={isSubmitting}
                  className="rounded-md border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="remember-me"
                  className="cursor-pointer text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Remember Me
                </Label>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-12 w-full rounded-xl text-base font-bold transition-all shadow-glow hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "var(--gradient-sunset)",
                color: "oklch(0.16 0.03 265)",
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-[oklch(0.16_0.03_265)]" />
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-[oklch(0.16_0.03_265)]" />
                  Login to Partner Hub
                </span>
              )}
            </Button>
          </form>

          {/* Footer note inside card */}
          <div className="mt-6 border-t border-white/10 pt-4 text-center text-xs text-muted-foreground">
            Want to register a new restaurant?{" "}
            <a href="#" className="font-semibold text-secondary hover:underline">
              Partner with FoodFusion
            </a>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog / Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in-50">
          <div className="glass-strong relative w-full max-w-md rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-4">
            <button
              onClick={closeForgotModal}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-xl"
                style={{ background: "var(--gradient-sunset)" }}
              >
                <HelpCircle className="h-5 w-5 text-[oklch(0.16_0.03_265)]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Reset Password</h3>
                <p className="text-xs text-muted-foreground">
                  Enter your registered hotel email address below.
                </p>
              </div>
            </div>

            {forgotSubmitted ? (
              <div className="space-y-4 py-4 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent/20 text-accent">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <p className="text-sm text-foreground font-medium">
                  Password reset link sent!
                </p>
                <p className="text-xs text-muted-foreground">
                  We've emailed instructions to <span className="font-semibold text-secondary">{forgotEmail}</span>. Please check your inbox.
                </p>
                <Button
                  onClick={closeForgotModal}
                  className="w-full rounded-xl"
                  style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                >
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-xs font-semibold uppercase text-muted-foreground">
                    Hotel Registered Email
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="hotel@restaurant.com"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        if (forgotError) setForgotError(validateEmail(e.target.value));
                      }}
                      className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-sm"
                    />
                  </div>
                  {forgotError && (
                    <p className="text-xs text-destructive font-medium flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {forgotError}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={closeForgotModal}
                    className="flex-1 rounded-xl text-muted-foreground hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isForgotSending}
                    className="flex-1 rounded-xl font-bold"
                    style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                  >
                    {isForgotSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
