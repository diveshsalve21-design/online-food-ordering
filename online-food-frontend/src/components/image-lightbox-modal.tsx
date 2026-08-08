import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, X, ShoppingBag, Flame, MapPin } from "lucide-react";
import { useCart, inr } from "@/lib/cart";
import { toast } from "sonner";

export type ImageLightboxData = {
  src: string;
  title: string;
  price?: number;
  restaurantName?: string;
  veg?: boolean;
  dishId?: string;
};

export function ImageLightboxModal({
  data,
  onClose,
}: {
  data: ImageLightboxData | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [zoom, setZoom] = useState(1);

  if (!data) return null;

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.5, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.5, 1));
  const handleResetZoom = () => setZoom(1);

  const handleAddToCart = () => {
    if (data.dishId && data.price) {
      add({
        id: data.dishId,
        name: data.title,
        price: data.price,
        image: data.src,
        veg: data.veg ?? false,
        restaurantName: data.restaurantName ?? "Food Fusion Kitchen",
      });
      toast.success(`Added 1x ${data.title} to cart!`);
    }
  };

  return (
    <Dialog open={!!data} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl border-white/20 bg-slate-950/95 text-white p-0 overflow-hidden rounded-3xl shadow-2xl backdrop-blur-2xl">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-white/10 p-4 bg-white/5">
          <div className="flex items-center gap-3">
            {data.veg !== undefined && (
              <span className={`inline-grid h-4 w-4 place-items-center rounded-sm border ${
                data.veg ? "border-emerald-500 bg-emerald-500/20" : "border-rose-500 bg-rose-500/20"
              }`}>
                <span className={`h-2 w-2 rounded-full ${data.veg ? "bg-emerald-500" : "bg-rose-500"}`} />
              </span>
            )}
            <div>
              <h3 className="font-black text-base text-white">{data.title}</h3>
              {data.restaurantName && (
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" /> {data.restaurantName}
                </div>
              )}
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleZoomIn}
              title="Zoom In"
              className="h-8 w-8 rounded-full border border-white/10 text-white hover:bg-white/10"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleZoomOut}
              title="Zoom Out"
              className="h-8 w-8 rounded-full border border-white/10 text-white hover:bg-white/10"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleResetZoom}
              title="Reset Zoom"
              className="h-8 w-8 rounded-full border border-white/10 text-white hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 🖼️ HIGH-RES IMAGE VIEWPORT */}
        <div className="relative min-h-[400px] max-h-[70vh] overflow-hidden flex items-center justify-center p-6 bg-black/60">
          <img
            src={data.src}
            alt={data.title}
            onDoubleClick={handleZoomIn}
            className="max-h-[60vh] max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-300 cursor-zoom-in"
            style={{ transform: `scale(${zoom})` }}
          />
          <div className="absolute bottom-3 right-4 text-[10px] font-semibold text-muted-foreground bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
            💡 Double-click image to zoom in ({Math.round(zoom * 100)}%)
          </div>
        </div>

        {/* Bottom CTA Bar */}
        {data.price && (
          <div className="flex items-center justify-between p-4 border-t border-white/10 bg-white/5">
            <div>
              <div className="text-xs text-muted-foreground font-semibold">Dish Price</div>
              <div className="text-xl font-black text-primary">{inr(data.price)}</div>
            </div>
            <Button
              onClick={handleAddToCart}
              className="h-11 px-6 rounded-xl font-bold shadow-glow cursor-pointer"
              style={{ background: "var(--gradient-sunset)", color: "oklch(0.16 0.03 265)" }}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart ({inr(data.price)})
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
