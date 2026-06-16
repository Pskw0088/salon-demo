"use client";

import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  BadgePercent, 
  ThumbsUp, 
  CalendarCheck 
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Expert Stylists",
    description: "Trained professionals with years of experience in the latest trends",
    color: "bg-rose-gold/10 text-rose-gold",
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    description: "We use only high-quality, salon-grade products for best results",
    color: "bg-gold/10 text-amber-600",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Environment",
    description: "Strict sanitization protocols for your safety and comfort",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: BadgePercent,
    title: "Best Prices",
    description: "Competitive pricing without compromising on quality",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: ThumbsUp,
    title: "100% Satisfaction",
    description: "We're not happy until you are. Your satisfaction is our priority",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description: "Book appointments online 24/7 with instant confirmation",
    color: "bg-pink-100 text-pink-600",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <ThumbsUp className="w-4 h-4" />
            Why Glamour Studio
          </span>
          <h2 className="section-title">
            Why Clients
            <span className="gradient-text"> Choose Us</span>
          </h2>
          <p className="section-subtitle">
            We combine expertise, premium products, and personalized care
            to deliver exceptional beauty experiences
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-cream hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 p-8 bg-gradient-to-r from-rose-gold to-rose-gold-dark rounded-2xl text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">98%</p>
              <p className="text-white/80 text-sm">Customer Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50+</p>
              <p className="text-white/80 text-sm">Services Offered</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">15+</p>
              <p className="text-white/80 text-sm">Award-Winning Stylists</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-white/80 text-sm">Hygiene Standards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
