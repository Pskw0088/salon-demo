"use client";

import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const services = [
  {
    id: 1,
    name: "Hair Styling",
    description: "Trendy cuts, styling & treatments by expert stylists",
    icon: "✂️",
    priceMin: 500,
    priceMax: 3000,
    duration: 45,
    popular: true,
    image: "linear-gradient(135deg, #B76E79 0%, #D4A5A5 100%)",
  },
  {
    id: 2,
    name: "Hair Coloring",
    description: "Global colors, highlights, balayage & more",
    icon: "🎨",
    priceMin: 2000,
    priceMax: 15000,
    duration: 120,
    popular: true,
    image: "linear-gradient(135deg, #D4AF37 0%, #E6C869 100%)",
  },
  {
    id: 3,
    name: "Bridal Makeup",
    description: "Complete bridal packages for your special day",
    icon: "👰",
    priceMin: 15000,
    priceMax: 50000,
    duration: 180,
    popular: true,
    image: "linear-gradient(135deg, #FFD1DC 0%, #FFF0F5 100%)",
  },
  {
    id: 4,
    name: "Spa & Wellness",
    description: "Relaxing body massages & rejuvenating treatments",
    icon: "🧖",
    priceMin: 1500,
    priceMax: 5000,
    duration: 90,
    popular: false,
    image: "linear-gradient(135deg, #98D8C8 0%, #BFEFDB 100%)",
  },
  {
    id: 5,
    name: "Nail Art",
    description: "Manicure, pedicure & creative nail designs",
    icon: "💅",
    priceMin: 500,
    priceMax: 3000,
    duration: 60,
    popular: false,
    image: "linear-gradient(135deg, #F8B4D9 0%, #FCCED4 100%)",
  },
  {
    id: 6,
    name: "Facial Treatments",
    description: "Deep cleansing, anti-aging & glow facials",
    icon: "✨",
    priceMin: 1000,
    priceMax: 5000,
    duration: 75,
    popular: true,
    image: "linear-gradient(135deg, #A7D9F7 0%, #D1ECFF 100%)",
  },
];

export function FeaturedServices() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Our Services
          </span>
          <h2 className="section-title">
            Discover Your Perfect
            <span className="gradient-text"> Beauty Treatment</span>
          </h2>
          <p className="section-subtitle">
            From classic cuts to complete transformations, we offer a full range
            of premium beauty services tailored just for you
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services?category=${service.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group card-hover overflow-hidden"
            >
              {/* Image/Gradient Header */}
              <div
                className="h-40 relative overflow-hidden"
                style={{ background: service.image }}
              >
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-90 group-hover:scale-125 transition-transform duration-500">
                    {service.icon}
                  </span>
                </div>
                
                {/* Popular Badge */}
                {service.popular && (
                  <span className="absolute top-4 right-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}

                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-gold transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-rose-gold">
                      {formatCurrency(service.priceMin)}
                      {service.priceMax && (
                        <span className="text-sm font-normal text-gray-500">
                          {" "}
                          - {formatCurrency(service.priceMax)}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {service.duration} mins
                    </p>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-rose-gold/10 flex items-center justify-center text-rose-gold group-hover:bg-rose-gold group-hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
