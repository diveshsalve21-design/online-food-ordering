import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  LogIn,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "User Login & Register · Online Food Ordering System" },
      {
        name: "description",
        content: "Login or register a new customer account to order food online.",
      },
    ],
  }),
  component: UserLoginRegister,
});

export type CustomerUser = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
};

export function getCurrentUser(): CustomerUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("current_user");
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

export function saveCurrentUser(user: CustomerUser) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("current_user", JSON.stringify(user));
    } catch (err) {}
  }
}

function UserLoginRegister() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // LOGIN Form State
  const [loginEmail, setLoginEmail] = useState("divesh@fusion.in");
  const [loginPassword, setLoginPassword] = useState("Divesh@123");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // REGISTER Form State
  const [regFullName, setRegFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regCity, setRegCity] = useState("Kalyan");
  const [regPincode, setRegPincode] = useState("421 306");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Validation error states
  const [loginError, setLoginError] = useState("");
  const [regError, setRegError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail.trim() || !loginPassword) {
      setLoginError("Please enter your email and password.");
      return;
    }

    setIsLoggingIn(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoggingIn(false);

    // Save logged-in user details
    const userObj: CustomerUser = {
      fullName: loginEmail.includes("divesh") ? "Divesh Salve" : loginEmail.split("@")[0],
      email: loginEmail,
      phone: "+91 98765 43210",
      address: "Station Road, Kalyan West",
      city: "Kalyan",
      pincode: "421 306",
    };

    saveCurrentUser(userObj);
    toast.success(`Welcome back, ${userObj.fullName}! 🎉`, {
      description: "Logged in successfully.",
    });

    navigate({ to: "/profile" });
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");

    if (!regFullName.trim()) {
      setRegError("Full Name is required.");
      return;
    }
    if (!regEmail.trim() || !regEmail.includes("@")) {
      setRegError("Please enter a valid Email Address.");
      return;
    }
    if (!regPhone.trim() || regPhone.length < 10) {
      setRegError("Please enter a valid 10-digit Phone Number.");
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setRegError("Password must be at least 6 characters long.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError("Passwords do not match. Please re-check.");
      return;
    }

    setIsRegistering(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsRegistering(false);

    const newUser: CustomerUser = {
      fullName: regFullName,
      email: regEmail,
      phone: regPhone,
      address: regAddress || "Kalyan West",
      city: regCity || "Kalyan",
      pincode: regPincode || "421 306",
    };

    saveCurrentUser(newUser);

    // Save to list of registered users
    if (typeof window !== "undefined") {
      try {
        const rawList = localStorage.getItem("registered_users");
        const list = rawList ? JSON.parse(rawList) : [];
        list.push(newUser);
        localStorage.setItem("registered_users", JSON.stringify(list));
      } catch (err) {}
    }

    toast.success(`🎉 Account Created Successfully! Welcome ${regFullName}`, {
      description: "You are now logged in. Enjoy ordering food!",
    });

    navigate({ to: "/profile" });
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 text-primary" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            <span>Customer Portal</span>
          </div>
        </div>

        {/* Auth Card */}
        <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-white/10 shadow-soft">
          <div className="mb-6 text-center">
            <div
              className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow"
              style={{ background: "var(--gradient-sunset)" }}
            >
              <User className="h-7 w-7 text-[oklch(0.16_0.03_265)]" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Customer <span className="gradient-text">Portal</span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Sign in to your account or register a new account to order delicious food.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-white/5 p-1 border border-white/10 mb-6">
              <TabsTrigger
                value="login"
                className="rounded-xl text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-black shadow-glow"
              >
                <LogIn className="mr-1.5 h-3.5 w-3.5" /> Existing User Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="rounded-xl text-xs font-bold data-[state=active]:bg-secondary data-[state=active]:text-black shadow-glow"
              >
                <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Register New Account
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: EXISTING USER LOGIN */}
            <TabsContent value="login" className="space-y-4 focus-visible:outline-none">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="flex items-center gap-2 rounded-xl bg-destructive/20 border border-destructive/40 p-3 text-xs text-destructive font-semibold">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Email / Phone</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="divesh@fusion.in"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="h-11 rounded-xl border-white/10 bg-white/5 pl-10 pr-10 text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-white"
                    >
                      {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoggingIn}
                  className="mt-2 h-12 w-full rounded-xl text-base font-bold transition-all shadow-glow cursor-pointer"
                  style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                >
                  {isLoggingIn ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" /> Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" /> Login to Account
                    </span>
                  )}
                </Button>

                <div className="rounded-xl bg-white/5 p-3 text-center text-xs text-muted-foreground border border-white/5">
                  Demo User: <span className="text-secondary font-bold">divesh@fusion.in</span> / <span className="text-secondary font-bold">Divesh@123</span>
                </div>
              </form>
            </TabsContent>

            {/* TAB 2: REGISTER NEW ACCOUNT */}
            <TabsContent value="register" className="space-y-4 focus-visible:outline-none">
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                {regError && (
                  <div className="flex items-center gap-2 rounded-xl bg-destructive/20 border border-destructive/40 p-3 text-xs text-destructive font-semibold">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{regError}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Full Name</Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="e.g. Divesh Salve"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      className="h-10 rounded-xl border-white/10 bg-white/5 pl-10 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Email Address</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="h-10 rounded-xl border-white/10 bg-white/5 pl-10 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Phone Number</Label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        placeholder="9876543210"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="h-10 rounded-xl border-white/10 bg-white/5 pl-10 text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">City</Label>
                    <Input
                      placeholder="Kalyan"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      className="h-10 rounded-xl border-white/10 bg-white/5 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">PIN Code</Label>
                    <Input
                      placeholder="421 306"
                      value={regPincode}
                      onChange={(e) => setRegPincode(e.target.value)}
                      className="h-10 rounded-xl border-white/10 bg-white/5 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Delivery Address</Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Flat no, Street & Area, Kalyan"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      className="h-10 rounded-xl border-white/10 bg-white/5 pl-10 text-sm"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Password</Label>
                    <Input
                      type={showRegPassword ? "text" : "password"}
                      placeholder="Create password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="h-10 rounded-xl border-white/10 bg-white/5 text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Confirm Password</Label>
                    <Input
                      type={showRegPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="h-10 rounded-xl border-white/10 bg-white/5 text-sm"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isRegistering}
                  className="mt-2 h-12 w-full rounded-xl text-base font-bold transition-all shadow-glow cursor-pointer"
                  style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
                >
                  {isRegistering ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" /> Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" /> Create & Register Account
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
