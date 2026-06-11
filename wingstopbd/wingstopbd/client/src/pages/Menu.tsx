import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus, ShoppingCart, Badge } from "lucide-react";

/**
 * Menu Page - Wing Stop BD
 * Features: Interactive menu with categories, 3D parallax backgrounds, cart management
 */

interface MenuItem {
  id: string;
  name: string;
  price: number;
  desc: string;
  badge?: string;
  image: string;
  category: string;
}

const MENU_ITEMS: MenuItem[] = [
  // Wings
  {
    id: "bbq-wings",
    name: "BBQ Chicken Wings",
    price: 350,
    desc: "Smoky BBQ sauce with perfect char",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
    category: "wings",
  },
  {
    id: "honey-wings",
    name: "Honey Glazed Wings",
    price: 340,
    desc: "Sweet honey glaze with savory notes",
    badge: "100 Orders",
    image: "https://images.unsplash.com/photo-1585238341710-4b9c6c85f5e5?w=400&h=400&fit=crop",
    category: "wings",
  },
  {
    id: "dynamic-wings",
    name: "Dynamic Wings",
    price: 320,
    desc: "Spicy kick with smooth finish",
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=400&fit=crop",
    category: "wings",
  },
  {
    id: "naga-wings",
    name: "Naga Wings",
    price: 300,
    desc: "Extremely spicy for heat lovers",
    badge: "SPICY",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
    category: "wings",
  },
  {
    id: "korean-wings",
    name: "Hot Korean Wings",
    price: 290,
    desc: "Korean-inspired spicy glaze",
    image: "https://images.unsplash.com/photo-1585238341710-4b9c6c85f5e5?w=400&h=400&fit=crop",
    category: "wings",
  },
  {
    id: "crispy-wings",
    name: "Crispy Chicken Wings",
    price: 250,
    desc: "Golden crispy with light seasoning",
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=400&fit=crop",
    category: "wings",
  },

  // Burgers
  {
    id: "smokey-beef",
    name: "Classic Smash Smokey Beef",
    price: 570,
    desc: "Smoky beef patty with premium toppings",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    category: "burgers",
  },
  {
    id: "classic-beef",
    name: "Classic Smash Beef",
    price: 580,
    desc: "Juicy beef with fresh vegetables",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    category: "burgers",
  },
  {
    id: "chicken-burger",
    name: "Classic Smash Chicken",
    price: 470,
    desc: "Tender chicken breast burger",
    image: "https://images.unsplash.com/photo-1562547256-fa0fef2500f5?w=400&h=400&fit=crop",
    category: "burgers",
  },

  // Coffee
  {
    id: "espresso-single",
    name: "Espresso (Single)",
    price: 220,
    desc: "Rich, concentrated coffee shot",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    category: "coffee",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 280,
    desc: "Smooth espresso with velvety foam",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=400&h=400&fit=crop",
    category: "coffee",
  },
  {
    id: "latte",
    name: "Latte",
    price: 320,
    desc: "Creamy coffee with steamed milk",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba20d4d?w=400&h=400&fit=crop",
    category: "coffee",
  },

  // Drinks & Shakes
  {
    id: "vanilla-shake",
    name: "Vanilla Shake",
    price: 300,
    desc: "Creamy vanilla milkshake",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
    category: "drinks",
  },
  {
    id: "chocolate-shake",
    name: "Chocolate Shake",
    price: 300,
    desc: "Rich chocolate milkshake",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
    category: "drinks",
  },
  {
    id: "mint-lemonade",
    name: "Mint Lemonade",
    price: 180,
    desc: "Refreshing mint and lemon blend",
    image: "https://images.unsplash.com/photo-1585518419759-87e50d6b5b67?w=400&h=400&fit=crop",
    category: "drinks",
  },
];

const CATEGORIES = [
  { id: "wings", name: "Wings", count: 6 },
  { id: "burgers", name: "Burgers", count: 3 },
  { id: "coffee", name: "Coffee", count: 11 },
  { id: "drinks", name: "Drinks & Shakes", count: 9 },
];

export default function Menu() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState("wings");
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxBg = scrollY * 0.3;
  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  const addToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((total, [itemId, qty]) => {
    const item = MENU_ITEMS.find((i) => i.id === itemId);
    return total + (item?.price || 0) * qty;
  }, 0);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-background font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold">Wing Stop BD</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663751326509/YMXj8wRuR9EnpDSSj4WT7u/neural-network-abstract-EWfd8XHfR6wGT6sHa2cFNn.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${parallaxBg}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Menu
          </h1>
          <p className="text-xl text-foreground/80">Explore our carefully crafted selection</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-primary text-background font-bold"
                      : "bg-card border border-border hover:border-primary text-foreground"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{cat.name}</span>
                    <span className="text-sm opacity-70">({cat.count})</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-card border-border hover:border-primary transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.badge && (
                      <Badge className="absolute top-4 right-4 bg-primary text-background">
                        {item.badge}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                    <p className="text-foreground/70 text-sm mb-4">{item.desc}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">{item.price}/=</span>

                      {cart[item.id] ? (
                        <div className="flex items-center gap-2 bg-card border border-primary rounded-lg">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-primary/20 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-bold">{cart[item.id]}</span>
                          <button
                            onClick={() => addToCart(item.id)}
                            className="p-1 hover:bg-primary/20 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-background gap-1"
                          onClick={() => addToCart(item.id)}
                        >
                          <Plus className="w-4 h-4" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Summary - Sticky Footer */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div>
              <p className="text-foreground/70">Total Items: {cartCount}</p>
              <p className="text-2xl font-bold text-primary">{cartTotal}/= BDT</p>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-background">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
