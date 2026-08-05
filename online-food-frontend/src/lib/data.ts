import biryani from "@/assets/dish-biryani.jpg";
import burger from "@/assets/dish-burger.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import noodles from "@/assets/dish-noodles.jpg";
import pizza from "@/assets/dish-pizza.jpg";
import salad from "@/assets/dish-salad.jpg";

// Category-specific fallbacks keep a failed remote photo relevant to the food item.
export function getFoodImageFallback(category: string) {
  switch (category) {
    case "burger": return burger;
    case "biryani": return biryani;
    case "chinese": return noodles;
    case "healthy": return salad;
    case "dessert": return dessert;
    case "pizza":
    default: return pizza;
  }
}

export function getRestaurantImageFallback(cuisine: string) {
  const normalizedCuisine = cuisine.toLowerCase();
  if (normalizedCuisine.includes("burger")) return burger;
  if (normalizedCuisine.includes("biryani") || normalizedCuisine.includes("indian") || normalizedCuisine.includes("seafood")) return biryani;
  if (normalizedCuisine.includes("chinese") || normalizedCuisine.includes("asian")) return noodles;
  if (normalizedCuisine.includes("healthy") || normalizedCuisine.includes("salad")) return salad;
  if (normalizedCuisine.includes("dessert") || normalizedCuisine.includes("bakery")) return dessert;
  return pizza;
}

export const categories = [
  { key: "pizza", label: "Pizza", emoji: "🍕" }, { key: "burger", label: "Burgers", emoji: "🍔" },
  { key: "biryani", label: "Biryani", emoji: "🍛" }, { key: "chinese", label: "Chinese", emoji: "🍜" },
  { key: "healthy", label: "Healthy", emoji: "🥗" }, { key: "dessert", label: "Desserts", emoji: "🍰" },
];

export const dishes = [
  { id: "napoli-margherita", restaurantId: "napoli", name: "Truffle Margherita", desc: "Wood-fired pizza with basil, mozzarella and truffle oil.", price: 349, veg: true, category: "pizza", calories: 620, time: 25, image: pizza },
  { id: "napoli-tiramisu", restaurantId: "napoli", name: "Classic Tiramisu", desc: "Espresso-soaked ladyfingers and mascarpone cream.", price: 229, veg: true, category: "dessert", calories: 420, time: 15, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=85" },
  { id: "napoli-pepperoni", restaurantId: "napoli", name: "Spicy Pepperoni Pizza", desc: "Wood-fired pizza with pepperoni, mozzarella and chilli honey.", price: 429, veg: false, category: "pizza", calories: 720, time: 28, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=85" },
  { id: "napoli-pasta", restaurantId: "napoli", name: "Creamy Alfredo Pasta", desc: "Fettuccine tossed with parmesan, garlic and cream.", price: 369, veg: true, category: "pizza", calories: 650, time: 24, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85" },
  { id: "napoli-garlic-bread", restaurantId: "napoli", name: "Cheesy Garlic Bread", desc: "Toasted garlic bread with mozzarella and herbs.", price: 189, veg: true, category: "pizza", calories: 390, time: 16, image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=1000&q=85" },
  { id: "napoli-mousse", restaurantId: "napoli", name: "Dark Chocolate Mousse", desc: "Silky dark chocolate mousse with cocoa crumble.", price: 199, veg: true, category: "dessert", calories: 380, time: 15, image: dessert },
  { id: "spice-biryani", restaurantId: "spice-route", name: "Hyderabadi Dum Biryani", desc: "Aromatic basmati rice, spices and tender chicken.", price: 379, veg: false, category: "biryani", calories: 760, time: 30, image: biryani },
  { id: "spice-paneer", restaurantId: "spice-route", name: "Paneer Butter Masala", desc: "Charred paneer in a rich tomato and cashew gravy.", price: 319, veg: true, category: "biryani", calories: 540, time: 28, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=85" },
  { id: "spice-kebab", restaurantId: "spice-route", name: "Tandoori Chicken Kebab", desc: "Yoghurt-marinated chicken, charred in the tandoor.", price: 349, veg: false, category: "biryani", calories: 510, time: 25, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1000&q=85" },
  { id: "spice-dal", restaurantId: "spice-route", name: "Dal Makhani", desc: "Slow-cooked black lentils finished with butter and cream.", price: 249, veg: true, category: "biryani", calories: 430, time: 25, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85" },
  { id: "spice-naan", restaurantId: "spice-route", name: "Butter Garlic Naan", desc: "Clay-oven bread brushed with garlic butter.", price: 79, veg: true, category: "biryani", calories: 230, time: 12, image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=1000&q=85" },
  { id: "spice-gulab", restaurantId: "spice-route", name: "Gulab Jamun", desc: "Warm milk dumplings steeped in fragrant sugar syrup.", price: 129, veg: true, category: "dessert", calories: 310, time: 15, image: "https://images.unsplash.com/photo-1666190092159-3171cf0f93e5?auto=format&fit=crop&w=1000&q=85" },
  { id: "wok-noodles", restaurantId: "wok-house", name: "Chilli Garlic Noodles", desc: "Wok-tossed noodles with vegetables and chilli garlic.", price: 249, veg: true, category: "chinese", calories: 480, time: 18, image: noodles },
  { id: "wok-chicken", restaurantId: "wok-house", name: "Szechuan Chicken Bowl", desc: "Spicy chicken, jasmine rice and crisp greens.", price: 329, veg: false, category: "chinese", calories: 610, time: 22, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=85" },
  { id: "wok-fried-rice", restaurantId: "wok-house", name: "Veg Fried Rice", desc: "Wok-seared rice with vegetables, soy and spring onion.", price: 229, veg: true, category: "chinese", calories: 460, time: 18, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=85" },
  { id: "wok-dumplings", restaurantId: "wok-house", name: "Crispy Chilli Dumplings", desc: "Pan-fried vegetable dumplings in a spicy chilli glaze.", price: 259, veg: true, category: "chinese", calories: 440, time: 20, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=1000&q=85" },
  { id: "wok-prawns", restaurantId: "wok-house", name: "Honey Chilli Prawns", desc: "Crispy prawns with sesame, peppers and honey chilli sauce.", price: 399, veg: false, category: "chinese", calories: 520, time: 24, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=85" },
  { id: "wok-soup", restaurantId: "wok-house", name: "Hot and Sour Soup", desc: "A warming broth with tofu, mushrooms and vegetables.", price: 149, veg: true, category: "chinese", calories: 180, time: 15, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85" },
  { id: "grill-burger", restaurantId: "burger-lab", name: "Smoky Chicken Burger", desc: "Grilled chicken, cheese and house smoky sauce.", price: 289, veg: false, category: "burger", calories: 540, time: 20, image: burger },
  { id: "grill-veggie", restaurantId: "burger-lab", name: "Crispy Veggie Burger", desc: "Crisp patty, pickles and smoky chipotle mayo.", price: 229, veg: true, category: "burger", calories: 480, time: 18, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1000&q=85" },
  { id: "grill-double", restaurantId: "burger-lab", name: "Double Cheese Burger", desc: "Two grilled patties, double cheese and caramelised onions.", price: 389, veg: false, category: "burger", calories: 780, time: 24, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=85" },
  { id: "grill-fries", restaurantId: "burger-lab", name: "Loaded Peri Peri Fries", desc: "Crisp fries with peri peri seasoning and cheese sauce.", price: 179, veg: true, category: "burger", calories: 470, time: 16, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=85" },
  { id: "grill-wings", restaurantId: "burger-lab", name: "BBQ Chicken Wings", desc: "Sticky barbecue wings with a smoky char.", price: 329, veg: false, category: "burger", calories: 590, time: 22, image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=1000&q=85" },
  { id: "grill-shake", restaurantId: "burger-lab", name: "Salted Caramel Shake", desc: "Thick vanilla shake blended with salted caramel.", price: 169, veg: true, category: "dessert", calories: 440, time: 12, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=85" },
  { id: "green-bowl", restaurantId: "green-bowl", name: "Garden Protein Bowl", desc: "Fresh greens, grains, avocado and a citrus dressing.", price: 269, veg: true, category: "healthy", calories: 390, time: 15, image: salad },
  { id: "green-salad", restaurantId: "green-bowl", name: "Mediterranean Grain Salad", desc: "Herbed quinoa, olives, feta and roasted vegetables.", price: 299, veg: true, category: "healthy", calories: 430, time: 17, image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1000&q=85" },
  { id: "green-avocado", restaurantId: "green-bowl", name: "Avocado Toast Plate", desc: "Sourdough toast with avocado, cherry tomatoes and seeds.", price: 249, veg: true, category: "healthy", calories: 360, time: 14, image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=1000&q=85" },
  { id: "green-wrap", restaurantId: "green-bowl", name: "Grilled Veggie Wrap", desc: "Roasted vegetables, hummus and greens in a warm wrap.", price: 239, veg: true, category: "healthy", calories: 410, time: 16, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1000&q=85" },
  { id: "green-smoothie", restaurantId: "green-bowl", name: "Mango Protein Smoothie", desc: "Mango, oats and plant protein blended cold.", price: 199, veg: true, category: "healthy", calories: 280, time: 10, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=1000&q=85" },
  { id: "green-chicken", restaurantId: "green-bowl", name: "Herb Chicken Bowl", desc: "Grilled chicken, quinoa and seasonal vegetables.", price: 349, veg: false, category: "healthy", calories: 510, time: 20, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=85" },
  { id: "sweet-lava", restaurantId: "sweet-tooth", name: "Chocolate Lava Cake", desc: "Warm dark chocolate cake with a molten centre.", price: 179, veg: true, category: "dessert", calories: 420, time: 15, image: dessert },
  { id: "sweet-cheesecake", restaurantId: "sweet-tooth", name: "Berry Cheesecake", desc: "Creamy baked cheesecake with a berry compote.", price: 219, veg: true, category: "dessert", calories: 460, time: 15, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=85" },
  { id: "sweet-brownie", restaurantId: "sweet-tooth", name: "Walnut Fudge Brownie", desc: "Dense dark chocolate brownie with toasted walnuts.", price: 159, veg: true, category: "dessert", calories: 450, time: 15, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85" },
  { id: "sweet-waffle", restaurantId: "sweet-tooth", name: "Belgian Chocolate Waffle", desc: "Warm waffle with chocolate sauce and vanilla cream.", price: 249, veg: true, category: "dessert", calories: 560, time: 18, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=85" },
  { id: "sweet-donut", restaurantId: "sweet-tooth", name: "Strawberry Sprinkle Donut", desc: "Fluffy glazed donut with strawberry sprinkles.", price: 109, veg: true, category: "dessert", calories: 330, time: 12, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1000&q=85" },
  { id: "sweet-icecream", restaurantId: "sweet-tooth", name: "Mango Ice Cream Sundae", desc: "Creamy mango ice cream with fruit and almond crunch.", price: 189, veg: true, category: "dessert", calories: 380, time: 12, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=85" },
  { id: "coastal-prawn-curry", restaurantId: "coastal-curry", name: "Konkan Prawn Curry", desc: "Coastal prawns simmered in a fragrant coconut and kokum curry.", price: 429, veg: false, category: "biryani", calories: 520, time: 28, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=85" },
  { id: "coastal-fish-fry", restaurantId: "coastal-curry", name: "Crispy Surmai Fry", desc: "Spiced king mackerel fried crisp and served with fresh salad.", price: 389, veg: false, category: "biryani", calories: 460, time: 24, image: "https://images.unsplash.com/photo-1518732751612-2c0787ff5684?auto=format&fit=crop&w=1000&q=85" },
  { id: "coastal-sol-kadhi", restaurantId: "coastal-curry", name: "Kokum Sol Kadhi", desc: "Refreshing kokum and coconut drink, a perfect coastal side.", price: 99, veg: true, category: "healthy", calories: 90, time: 8, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=85" },
  { id: "bistro-vada-pav", restaurantId: "bombay-bistro", name: "Mumbai Vada Pav", desc: "Spiced potato fritter in a soft pav with dry garlic chutney.", price: 119, veg: true, category: "burger", calories: 350, time: 12, image: "https://images.unsplash.com/photo-1750767396969-f37060ebe07d?auto=format&fit=crop&w=1000&q=85" },
  { id: "bistro-pav-bhaji", restaurantId: "bombay-bistro", name: "Butter Pav Bhaji", desc: "Rich mashed vegetable bhaji served with buttered pav.", price: 189, veg: true, category: "biryani", calories: 510, time: 18, image: "https://images.unsplash.com/photo-1753357303396-704b5abe8945?auto=format&fit=crop&w=1000&q=85" },
  { id: "bistro-frankie", restaurantId: "bombay-bistro", name: "Tandoori Chicken Frankie", desc: "Juicy tandoori chicken wrapped with onions and mint chutney.", price: 209, veg: false, category: "burger", calories: 480, time: 16, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1000&q=85" },
];

export const restaurants = [
  { id: "napoli", name: "Napoli Wood Fire", cuisine: "Italian · Pizza", rating: 4.8, time: "25–30 min", distance: "1.2 km", price: 249, veg: true, discount: "40% OFF", image: pizza },
  { id: "spice-route", name: "Spice Route Kitchen", cuisine: "Biryani · North Indian", rating: 4.7, time: "30–35 min", distance: "2.1 km", price: 199, veg: false, discount: "₹125 OFF", image: biryani },
  { id: "wok-house", name: "Wok House", cuisine: "Chinese · Asian", rating: 4.6, time: "20–25 min", distance: "1.8 km", price: 179, veg: true, discount: "Free delivery", image: noodles },
  { id: "burger-lab", name: "Burger Lab", cuisine: "Burgers · American", rating: 4.5, time: "20–25 min", distance: "2.4 km", price: 199, veg: false, discount: "20% OFF", image: burger },
  { id: "green-bowl", name: "Green Bowl Co.", cuisine: "Healthy · Salads", rating: 4.7, time: "15–20 min", distance: "1.5 km", price: 219, veg: true, discount: "Free delivery", image: salad },
  { id: "sweet-tooth", name: "Sweet Tooth", cuisine: "Desserts · Bakery", rating: 4.6, time: "20–30 min", distance: "3.0 km", price: 159, veg: true, discount: "₹75 OFF", image: dessert },
  { id: "coastal-curry", name: "Coastal Curry House", cuisine: "Seafood · Konkan", rating: 4.7, time: "25–35 min", distance: "2.8 km", price: 259, veg: false, discount: "15% OFF", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=85" },
  { id: "bombay-bistro", name: "Bombay Street Bistro", cuisine: "Street Food · Indian", rating: 4.5, time: "15–25 min", distance: "1.9 km", price: 129, veg: false, discount: "Free delivery", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85" },
];

export const getRestaurant = (id?: string) => restaurants.find((restaurant) => restaurant.id === id);
export const getRestaurantDishes = (id?: string) => id ? dishes.filter((dish) => dish.restaurantId === id) : dishes;
