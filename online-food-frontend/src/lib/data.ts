import biryani from "@/assets/dish-biryani.jpg";
import burger from "@/assets/dish-burger.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import noodles from "@/assets/dish-noodles.jpg";
import pizza from "@/assets/dish-pizza.jpg";
import salad from "@/assets/dish-salad.jpg";

export const categories = [
  { key: "pizza", label: "Pizza", emoji: "🍕" }, { key: "burger", label: "Burgers", emoji: "🍔" },
  { key: "biryani", label: "Biryani", emoji: "🍛" }, { key: "chinese", label: "Chinese", emoji: "🍜" },
  { key: "healthy", label: "Healthy", emoji: "🥗" }, { key: "dessert", label: "Desserts", emoji: "🍰" },
];

export const dishes = [
  { id: "margherita", name: "Truffle Margherita", desc: "Wood-fired pizza with basil, mozzarella and truffle oil.", price: 349, veg: true, category: "pizza", calories: 620, time: 25, image: pizza },
  { id: "burger", name: "Smoky Chicken Burger", desc: "Grilled chicken, cheese and house smoky sauce.", price: 289, veg: false, category: "burger", calories: 540, time: 20, image: burger },
  { id: "biryani", name: "Hyderabadi Dum Biryani", desc: "Aromatic basmati rice, spices and tender chicken.", price: 379, veg: false, category: "biryani", calories: 760, time: 30, image: biryani },
  { id: "noodles", name: "Chilli Garlic Noodles", desc: "Wok-tossed noodles with vegetables and chilli garlic.", price: 249, veg: true, category: "chinese", calories: 480, time: 18, image: noodles },
  { id: "salad", name: "Garden Protein Bowl", desc: "Fresh greens, grains, avocado and a citrus dressing.", price: 269, veg: true, category: "healthy", calories: 390, time: 15, image: salad },
  { id: "dessert", name: "Chocolate Lava Cake", desc: "Warm dark chocolate cake with a molten centre.", price: 179, veg: true, category: "dessert", calories: 420, time: 15, image: dessert },
];

export const restaurants = [
  { id: "napoli", name: "Napoli Wood Fire", cuisine: "Italian · Pizza", rating: 4.8, time: "25–30 min", distance: "1.2 km", price: 249, veg: true, discount: "40% OFF", image: pizza },
  { id: "spice-route", name: "Spice Route Kitchen", cuisine: "Biryani · North Indian", rating: 4.7, time: "30–35 min", distance: "2.1 km", price: 199, veg: false, discount: "₹125 OFF", image: biryani },
  { id: "wok-house", name: "Wok House", cuisine: "Chinese · Asian", rating: 4.6, time: "20–25 min", distance: "1.8 km", price: 179, veg: true, discount: "Free delivery", image: noodles },
];
