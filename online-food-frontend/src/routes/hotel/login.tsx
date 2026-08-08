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
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  X,
  UserPlus,
  LogIn,
  Phone,
  MapPin,
  Store,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/hotel/login")({
  head: () => ({
    meta: [
      { title: "Hotel Partner Login & Registration · Food Fusion" },
      {
        name: "description",
        content: "Partner portal for restaurant and hotel partner management on Food Fusion.",
      },
    ],
  }),
  component: HotelLogin,
});

export type HotelPartnerAccount = {
  hotelName: string;
  ownerName: string;
  email: string;
  phone: string;
  cuisine: string;
  address: string;
  city: string;
  password?: string;
  createdAt?: string;
};

// 5 PRE-CONFIGURED HOTEL PARTNER ACCOUNTS WITH EXACT SPECIFIED SURNAMES
export const DEFAULT_5_HOTELS: HotelPartnerAccount[] = [
  {
    hotelName: "Divesh Fusion Kitchen",
    ownerName: "Divesh Salve",
    email: "divesh.salve@foodfusion.com",
    phone: "9876543210",
    cuisine: "Multi-Cuisine · Fusion Special",
    address: "Station Road, Kalyan West",
    city: "Kalyan",
    password: "Divesh@123",
  },
  {
    hotelName: "Pritesh Spice Hub",
    ownerName: "Pritesh Kanitkar",
    email: "pritesh.kanitkar@foodfusion.com",
    phone: "9876543211",
    cuisine: "North Indian · Mughlai",
    address: "MG Road, Kalyan East",
    city: "Kalyan",
    password: "Pritesh@123",
  },
  {
    hotelName: "Rashmin Royal Grill",
    ownerName: "Rashmin Oak",
    email: "rashmin.oak@foodfusion.com",
    phone: "9876543212",
    cuisine: "BBQ & Tandoori Specials",
    address: "Sector 4, Kalyan West",
    city: "Kalyan",
    password: "Rashmin@123",
  },
  {
    hotelName: "Himanshu Bistro & Cafe",
    ownerName: "Himanshu Medhe",
    email: "himanshu.medhe@foodfusion.com",
    phone: "9876543213",
    cuisine: "Italian · Wood-Fired Pizza",
    address: "Ram Baug, Kalyan West",
    city: "Kalyan",
    password: "Himanshu@123",
  },
  {
    hotelName: "Swaraj Coastal Delights",
    ownerName: "Swaraj Angre",
    email: "swaraj.angre@foodfusion.com",
    phone: "9876543214",
    cuisine: "Konkan Seafood · Malvani",
    address: "Khadakpada, Kalyan West",
    city: "Kalyan",
    password: "Swaraj@123",
  },
];

const REGISTERED_HOTELS_KEY = "online_food_registered_hotels";
const ACTIVE_HOTEL_KEY = "online_food_active_hotel";

export function getRegisteredHotels(): HotelPartnerAccount[] {
  if (typeof window === "undefined") return DEFAULT_5_HOTELS;
  try {
    const raw = localStorage.getItem(REGISTERED_HOTELS_KEY);
    if (!raw) {
      localStorage.setItem(REGISTERED_HOTELS_KEY, JSON.stringify(DEFAULT_5_HOTELS));
      return DEFAULT_5_HOTELS;
    }
    const parsed: HotelPartnerAccount[] = JSON.parse(raw);
    let updated = [...parsed];
    let changed = false;
    for (const def of DEFAULT_5_HOTELS) {
      if (!updated.some((h) => h.ownerName.toLowerCase().includes(def.ownerName.split(" ")[0].toLowerCase()))) {
        updated.push(def);
        changed = true;
      }
    }
    if (changed) {
      localStorage.setItem(REGISTERED_HOTELS_KEY, JSON.stringify(updated));
    }
    return updated;
  } catch (err) {
    return DEFAULT_5_HOTELS;
  }
}

export function saveActiveHotel(hotel: HotelPartnerAccount) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(ACTIVE_HOTEL_KEY, JSON.stringify(hotel));
    } catch (err) {}
  }
}

export function getActiveHotel(): HotelPartnerAccount | null {
  if (typeof window === "undefined") return DEFAULT_5_HOTELS[0];
  try {
    const raw = localStorage.getItem(ACTIVE_HOTEL_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_5_HOTELS[0];
  } catch (err) {
    return DEFAULT_5_HOTELS[0];
  }
}

function HotelLogin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // HOTEL LOGIN FORM STATE
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // HOTEL REGISTER FORM STATE
  const [regHotelName, setRegHotelName] = useState("");
  const [regOwnerName, setRegOwnerName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCuisine, setRegCuisine] = useState("North Indian · Biryani");
  const [regAddress, setRegAddress] = useState("");
  const [regCity, setRegCity] = useState("Kalyan");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regError, setRegError] = useState("");

  // QUICK SWITCH LOGIN FOR 5 HOTEL OWNERS
  const handleQuickHotelLogin = (hotel: HotelPartnerAccount) => {
    saveActiveHotel(hotel);
    toast.success(`Logged in as Hotel Owner ${hotel.ownerName}! 🏬`, {
      description: `Opened ${hotel.hotelName} Dashboard`,
    });
    navigate({ to: "/hotel/dashboard" });
  };

  // REAL HOTEL LOGIN HANDLER
  const handleHotelLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const emailOrPhone = loginEmail.trim().toLowerCase();
    const pwd = loginPassword;

    if (!emailOrPhone || !pwd) {
      setLoginError("Please enter your hotel email or phone and password.");
      return;
    }

    setIsLoggingIn(true);
    await new Promise((r) => setTimeout(r, 600));

    const hotels = getRegisteredHotels();
    const cleanSearch = emailOrPhone.replace(/\s+/g, "");
    const cleanDigits = emailOrPhone.replace(/\D/g, "");

    const match = hotels.find((h) => {
      const hEmail = h.email.toLowerCase();
      const hName = h.hotelName.toLowerCase().replace(/\s+/g, "");
      const hOwner = h.ownerName.toLowerCase().replace(/\s+/g, "");
      const hPhone = h.phone.replace(/\D/g, "");
      return (
        hEmail === cleanSearch ||
        hName === cleanSearch ||
        hOwner === cleanSearch ||
        (cleanDigits.length >= 4 && hPhone.includes(cleanDigits))
      );
    });

    if (!match) {
      setIsLoggingIn(false);
      setLoginError(`No registered hotel partner account found for "${loginEmail}". Please click one of the 5 Hotel Partner buttons below or register!`);
      toast.error("Hotel account not found!");
      return;
    }

    if (match.password && match.password !== pwd) {
      setIsLoggingIn(false);
      setLoginError("Incorrect password. Please try again.");
      toast.error("Incorrect hotel password!");
      return;
    }

    setIsLoggingIn(false);
    saveActiveHotel(match);

    toast.success(`Welcome back, ${match.hotelName}! 🏪`, {
      description: `Logged in as Hotel Owner ${match.ownerName}`,
    });

    navigate({ to: "/hotel/dashboard" });
  };

  // REAL NEW HOTEL REGISTRATION HANDLER
  const handleHotelRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");

    const cleanEmail = regEmail.trim().toLowerCase();
    const cleanPhone = regPhone.trim().replace(/\D/g, "");

    if (!regHotelName.trim()) {
      setRegError("Hotel / Restaurant Name is required.");
      return;
    }
    if (!regOwnerName.trim()) {
      setRegError("Owner / Manager Name is required.");
      return;
    }
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setRegError("Please enter a valid Hotel Email address.");
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
    await new Promise((r) => setTimeout(r, 800));

    const hotels = getRegisteredHotels();

    // Check Duplicate Email
    const existingEmail = hotels.find((h) => h.email.toLowerCase() === cleanEmail);
    if (existingEmail) {
      setIsRegistering(false);
      setRegError(`The email "${cleanEmail}" is already registered to another hotel.`);
      toast.error("Hotel email already registered!");
      return;
    }

    const newHotel: HotelPartnerAccount = {
      hotelName: regHotelName.trim(),
      ownerName: regOwnerName.trim(),
      email: cleanEmail,
      phone: regPhone.trim(),
      cuisine: regCuisine.trim() || "Multi-Cuisine",
      address: regAddress.trim() || "Station Road",
      city: regCity.trim() || "Kalyan",
      password: regPassword,
      createdAt: new Date().toISOString(),
    };

    const updatedHotels = [...hotels, newHotel];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(REGISTERED_HOTELS_KEY, JSON.stringify(updatedHotels));
      } catch (err) {}
    }

    saveActiveHotel(newHotel);
    setIsRegistering(false);

    toast.success(`🎉 Hotel "${newHotel.hotelName}" Registered Successfully!`, {
      description: `Logged in as Owner ${newHotel.ownerName}`,
    });

    navigate({ to: "/hotel/dashboard" });
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-2xl space-y-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          <span>Back to Customer Storefront</span>
        </Link>

        {/* 🏬 5 QUICK SWITCH HOTEL OWNER DASHBOARDS BAR */}
        <div className="glass-strong rounded-3xl p-5 border border-white/15 shadow-glow space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <Users className="h-4 w-4 text-secondary" /> 5 Hotel Partner Dashboards
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
              1-Click Instant Login
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {DEFAULT_5_HOTELS.map((h) => (
              <button
                key={h.ownerName}
                type="button"
                onClick={() => handleQuickHotelLogin(h)}
                className="flex flex-col items-center text-center p-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary transition-all cursor-pointer group"
              >
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary/20 text-primary font-black text-xs group-hover:scale-110 transition-transform">
                  {h.ownerName.charAt(0)}
                </div>
                <div className="font-black text-xs text-foreground mt-1.5 leading-tight">{h.ownerName}</div>
                <div className="text-[9px] text-muted-foreground line-clamp-1">{h.hotelName.split(" ")[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Card Container */}
        <div className="glass-strong relative overflow-hidden rounded-3xl border border-white/15 p-6 shadow-2xl sm:p-8">
          {/* Top Banner */}
          <div className="mb-6 text-center">
            <div
              className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow"
              style={{ background: "var(--gradient-sunset)" }}
            >
              <Building2 className="h-7 w-7 text-[oklch(0.16_0.03_265)]" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Hotel Partner <span className="gradient-text">Portal</span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Login to your restaurant partner account or register a new hotel account.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-white/5 p-1 border border-white/10 mb-6">
              <TabsTrigger
                value="login"
                className="rounded-xl text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-black shadow-glow cursor-pointer"
              >
                <LogIn className="mr-1.5 h-3.5 w-3.5" /> Hotel Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="rounded-xl text-xs font-bold data-[state=active]:bg-secondary data-[state=active]:text-black shadow-glow cursor-pointer"
              >
                <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Register New Hotel
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: EXISTING HOTEL LOGIN */}
            <TabsContent value="login" className="space-y-4 focus-visible:outline-none">
              <form onSubmit={handleHotelLoginSubmit} className="space-y-4" autoComplete="off" autoCapitalize="off">
                {loginError && (
                  <div className="flex items-center gap-2 rounded-xl bg-destructive/20 border border-destructive/40 p-3 text-xs text-destructive font-semibold">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground">Hotel Registered Email / Phone / Owner Name</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      autoComplete="off"
                      placeholder="e.g. Divesh Salve, Pritesh Kanitkar, Rashmin Oak, Himanshu Medhe, Swaraj Angre"
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
                      autoComplete="new-password"
                      placeholder="Enter hotel password"
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
                      <Loader2 className="h-5 w-5 animate-spin" /> Authenticating Hotel...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" /> Login to Hotel Dashboard
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* TAB 2: REGISTER NEW HOTEL */}
            <TabsContent value="register" className="space-y-4 focus-visible:outline-none">
              <form onSubmit={handleHotelRegisterSubmit} className="space-y-3" autoComplete="off" autoCapitalize="off">
                {regError && (
                  <div className="flex items-center gap-2 rounded-xl bg-destructive/20 border border-destructive/40 p-3 text-xs text-destructive font-semibold">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{regError}</span>
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Hotel / Restaurant Name</Label>
                    <div className="relative">
                      <Store className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="e.g. Divesh Fusion Kitchen"
                        value={regHotelName}
                        onChange={(e) => setRegHotelName(e.target.value)}
                        className="h-10 rounded-xl border-white/10 bg-white/5 pl-10 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Owner / Manager Name</Label>
                    <Input
                      placeholder="e.g. Divesh Salve"
                      value={regOwnerName}
                      onChange={(e) => setRegOwnerName(e.target.value)}
                      className="h-10 rounded-xl border-white/10 bg-white/5 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Hotel Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="hotel@foodfusion.com"
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
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">Cuisine Type</Label>
                    <Input
                      placeholder="e.g. Biryani · North Indian"
                      value={regCuisine}
                      onChange={(e) => setRegCuisine(e.target.value)}
                      className="h-10 rounded-xl border-white/10 bg-white/5 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">City</Label>
                    <Input
                      placeholder="Kalyan"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      className="h-10 rounded-xl border-white/10 bg-white/5 text-sm"
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
                      <Loader2 className="h-5 w-5 animate-spin" /> Registering Hotel Partner...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" /> Register Hotel Account
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground border-t border-white/10 pt-4">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Encrypted Partner Portal · Food Fusion Merchant Services</span>
          </div>
        </div>
      </div>
    </div>
  );
}
