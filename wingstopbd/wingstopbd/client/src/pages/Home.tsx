import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin, Clock, Phone, Star } from "lucide-react";
import { Link } from "wouter";

/**
 * Home Page - Wing Stop BD
 * Features: 3D Parallax Scrolling, Hero Section, Feature Cards, Testimonials
 * Design Philosophy: Cosmic Minimalism with deep space blacks and electric accents
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax calculation - different layers move at different speeds
  const parallaxHero = scrollY * 0.5;
  const parallaxLayer1 = scrollY * 0.3;
  const parallaxLayer2 = scrollY * 0.15;

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-background font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-foreground">Wing Stop BD</span>
          </div>
          <div className="flex gap-6 items-center">
            <Link href="/menu" className="text-foreground/70 hover:text-primary transition-colors">Menu</Link>
            <Link href="/reservations" className="text-foreground/70 hover:text-primary transition-colors">Reserve</Link>
            <Button className="bg-primary hover:bg-primary/90 text-background">Order Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Layers */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663751326509/YMXj8wRuR9EnpDSSj4WT7u/hero-spatial-landscape-9As5iheFYSLBU3GKm2Y4fp.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${parallaxHero}px)`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Taste the Extraordinary
          </h1>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Handcrafted wings, premium burgers, and artisan coffee. Experience Wing Stop BD—where flavor meets precision.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/menu">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-background gap-2">
                Explore Menu <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/reservations">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Make Reservation
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Signature Section */}
      <section className="py-20 relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663751326509/YMXj8wRuR9EnpDSSj4WT7u/neural-network-abstract-EWfd8XHfR6wGT6sHa2cFNn.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${parallaxLayer1}px)`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-bold mb-4 text-center">Our Signature Wings</h2>
          <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
            Crafted with precision, seasoned with passion. Each wing tells a story of flavor and quality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "BBQ Chicken Wings",
                price: "350/=",
                desc: "Smoky, sweet, and perfectly charred",
                image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop",
              },
              {
                name: "Dynamic Wings",
                price: "320/=",
                desc: "Spicy kick with a smooth finish",
                image: "https://images.unsplash.com/photo-1585238341710-4b9c6c85f5e5?w=500&h=500&fit=crop",
              },
              {
                name: "Honey Glazed Wings",
                price: "340/=",
                desc: "Sweet glaze with savory undertones",
                image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="bg-card border-border hover:border-primary transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-foreground/70 text-sm mb-4">{item.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{item.price}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-background">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50 relative">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663751326509/YMXj8wRuR9EnpDSSj4WT7u/spatial-interface-mockup-3qNnsaL5KdiMcFNmpprUu6.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${parallaxLayer2}px)`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-bold mb-16 text-center">Why Choose Wing Stop BD?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Star,
                title: "Premium Quality",
                desc: "Only the finest ingredients, sourced fresh daily",
              },
              {
                icon: Clock,
                title: "Quick Service",
                desc: "Fast preparation without compromising quality",
              },
              {
                icon: MapPin,
                title: "Prime Location",
                desc: "Conveniently located in Bashundhara R/A",
              },
              {
                icon: Phone,
                title: "24/7 Support",
                desc: "Always here to assist your dining needs",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon className="w-8 h-8 text-background" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-16 text-center">What Our Customers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rifat",
                rating: 5,
                text: "Good atmosphere and food is tasty. Best wings in Bashundhara!",
              },
              {
                name: "MM Mahir",
                rating: 5,
                text: "One of the best fast food restaurants. Specially for Smash Burger and Dynamic wings.",
              },
              {
                name: "Eni Patowary",
                rating: 5,
                text: "This food is so yummy! The Honey Glazed Wings are absolutely divine.",
              },
            ].map((review, idx) => (
              <Card key={idx} className="bg-card border-border p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-primary">{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Experience Wing Stop BD?</h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Order online for delivery or dine in at our Bashundhara location. Your next favorite meal awaits.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-background gap-2">
            Order Now <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Wing Stop BD</h3>
              <p className="text-foreground/70 text-sm">Premium wings, burgers, and coffee in Bashundhara.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><Link href="/menu" className="hover:text-primary">Menu</Link></li>
                <li><Link href="/reservations" className="hover:text-primary">Reservations</Link></li>
                <li><a href="#" className="hover:text-primary">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm text-foreground/70">+880 19580-66534</p>
              <p className="text-sm text-foreground/70">Bashundhara R/A, Dhaka</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hours</h4>
              <p className="text-sm text-foreground/70">Mon-Sun: 11 AM - 11 PM</p>
              <p className="text-sm text-foreground/70">Delivery Available 24/7</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-foreground/70 text-sm">
            <p>&copy; 2025 Wing Stop BD. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
