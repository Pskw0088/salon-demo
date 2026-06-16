"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Play, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "Transform Your Look",
    subtitle: "Book Your Glamour Session Today",
    description: "Experience luxury beauty services with our expert stylists",
    cta: "Book Appointment",
    image: "linear-gradient(135deg, #B76E79 0%, #D4A5A5 50%, #FFF8F0 100%)",
    overlay: "from-black/60 via-black/40 to-transparent",
  },
  {
    id: 2,
    title: "Before & After Magic",
    subtitle: "See The Transformation",
    description: "Witness stunning makeovers by our talented team",
    cta: "View Gallery",
    href: "/gallery",
    image: "linear-gradient(135deg, #D4AF37 0%, #B76E79 50%, #8B4D57 100%)",
    overlay: "from-black/50 via-black/30 to-transparent",
  },
  {
    id: 3,
    title: "Bridal Special",
    subtitle: "Your Perfect Day Deserves Perfection",
    description: "Complete bridal packages starting at ₹25,000",
    cta: "Explore Packages",
    href: "/packages",
    image: "linear-gradient(135deg, #FFF8F0 0%, #D4A5A5 50%, #B76E79 100%)",
    overlay: "from-black/60 via-black/40 to-transparent",
    badge: "20% Off",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);
  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);

  return (
    <section className="relative h-[90vh] md:h-screen overflow-hidden -mt-20">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{ background: slide.image }}
          />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-xl" />
            <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-gold/20 blur-2xl" />
            <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-rose-gold/20 blur-xl" />
          </div>

          {/* Overlay */}
          <div className={cn("absolute inset-0 bg-gradient-to-r", slide.overlay)} />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 pt-20">
              <div className="max-w-3xl">
                {slide.badge && (
                  <span className="inline-block mb-4 px-4 py-2 bg-gold text-black text-sm font-bold rounded-full animate-pulse">
                    {slide.badge}
                  </span>
                )}
                
                <p className="text-rose-gold-light text-lg md:text-xl mb-2 font-medium tracking-wide animate-fade-in">
                  {slide.subtitle}
                </p>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif leading-tight animate-slide-up">
                  {slide.title}
                </h1>
                
                <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl animate-fade-in">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
                  <Link
                    href={slide.href || "/book"}
                    className="inline-flex items-center justify-center gap-2 btn-primary text-lg px-8 py-4"
                  >
                    <Calendar className="w-5 h-5" />
                    {slide.cta}
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center gap-2 btn-secondary border-white text-white hover:bg-white hover:text-gray-900"
                  >
                    <Play className="w-5 h-5" />
                    Watch Video Tour
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 flex items-center gap-6 text-white/70 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-gold to-gold border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                        >
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm">10k+ Happy Clients</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1">
                    <Star className="w-5 h-5 text-gold fill-gold" />
                    <span className="font-semibold text-white">4.9</span>
                    <span className="text-sm">(2,500+ reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-8 bg-rose-gold"
                : "w-2 bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest rotate-90 origin-center translate-x-8">SCROLL</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
