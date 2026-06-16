"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const transformations = [
  {
    id: 1,
    type: "Hair Color",
    stylist: "Priya Sharma",
    likes: 234,
    beforeColor: "linear-gradient(135deg, #3D3D3D 0%, #1a1a1a 100%)",
    afterColor: "linear-gradient(135deg, #B76E79 0%, #D4A5A5 100%)",
    description: "Stunning rose gold balayage transformation",
  },
  {
    id: 2,
    type: "Bridal Makeup",
    stylist: "Ananya Patel",
    likes: 456,
    beforeColor: "linear-gradient(135deg, #D4A5A5 0%, #FFF8F0 100%)",
    afterColor: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    description: "Elegant bridal look with traditional touch",
  },
  {
    id: 3,
    type: "Haircut",
    stylist: "Rahul Verma",
    likes: 189,
    beforeColor: "linear-gradient(135deg, #4B6587 0%, #7B8FA1 100%)",
    afterColor: "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)",
    description: "Modern textured crop with fade",
  },
  {
    id: 4,
    type: "Hair Treatment",
    stylist: "Priya Sharma",
    likes: 312,
    beforeColor: "linear-gradient(135deg, #8B4513 0%, #654321 100%)",
    afterColor: "linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)",
    description: "Keratin treatment for silky smooth hair",
  },
];

export function BeforeAfterGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  return (
    <section className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Transformations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stunning
            <span className="text-rose-gold"> Before & After</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See the amazing transformations created by our talented stylists.
            Your next look could be featured here!
          </p>
        </div>

        {/* Desktop Gallery */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {transformations.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                {/* Before */}
                <div
                  className={cn(
                    "absolute inset-0 transition-transform duration-500",
                    hoveredId === item.id ? "-translate-x-full" : "translate-x-0"
                  )}
                  style={{ background: item.beforeColor }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-4xl font-bold">BEFORE</span>
                  </div>
                </div>

                {/* After */}
                <div
                  className={cn(
                    "absolute inset-0 transition-transform duration-500",
                    hoveredId === item.id ? "translate-x-0" : "translate-x-full"
                  )}
                  style={{ background: item.afterColor }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-4xl font-bold">AFTER</span>
                  </div>
                </div>

                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-xs text-rose-gold-light font-medium">
                      {item.type}
                    </span>
                    <p className="text-white text-sm mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        by {item.stylist}
                      </span>
                      <button className="flex items-center gap-1 text-white/70 hover:text-rose-gold transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs">{item.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Slide Indicator */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs">
                  Hover to see after
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {transformations.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                    {/* Split View */}
                    <div className="absolute inset-0 flex">
                      <div
                        className="w-1/2 relative"
                        style={{ background: item.beforeColor }}
                      >
                        <span className="absolute top-4 left-4 bg-black/50 px-2 py-1 rounded text-xs">
                          Before
                        </span>
                      </div>
                      <div
                        className="w-1/2 relative"
                        style={{ background: item.afterColor }}
                      >
                        <span className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs">
                          After
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <span className="text-xs text-rose-gold-light font-medium">
                        {item.type}
                      </span>
                      <p className="text-white text-sm mt-1">
                        {item.description}
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        by {item.stylist}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentIndex ? "w-6 bg-rose-gold" : "bg-white/30"
                  )}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
