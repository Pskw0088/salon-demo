"use client";

import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Meera Kapoor",
    role: "Regular Customer",
    rating: 5,
    text: "Glamour Studio transformed my hair completely! The balayage they did was exactly what I wanted. Priya is incredibly talented and really listened to what I wanted. I've been coming here for 2 years now and never disappointed!",
    service: "Hair Coloring",
    date: "2 weeks ago",
    initials: "MK",
    bgColor: "bg-rose-gold/20",
  },
  {
    id: 2,
    name: "Arun Sharma",
    role: "VIP Member",
    rating: 5,
    text: "Best grooming experience in the city! Rahul really knows men's styling. The attention to detail is amazing - from the hot towel treatment to the perfect fade. Worth every rupee!",
    service: "Men's Grooming",
    date: "1 week ago",
    initials: "AS",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    name: "Riya Malhotra",
    role: "Bride",
    rating: 5,
    text: "My bridal makeup was absolutely stunning! Everyone at my wedding couldn't stop complimenting my look. The team handled everything from trials to the D-day perfectly. Thank you for making my special day even more special!",
    service: "Bridal Package",
    date: "1 month ago",
    initials: "RM",
    bgColor: "bg-gold/20",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Regular Customer",
    rating: 5,
    text: "The spa treatments here are divine! I come every month for their signature facial and massage. It's my self-care ritual. The ambience is so relaxing and the staff is always so welcoming.",
    service: "Spa & Facial",
    date: "3 days ago",
    initials: "SR",
    bgColor: "bg-purple-100",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-cream overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Testimonials
          </span>
          <h2 className="section-title">
            What Our Clients
            <span className="gradient-text"> Say About Us</span>
          </h2>
          <p className="section-subtitle">
            Don&apos;t just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Cards */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl relative">
                      {/* Quote Icon */}
                      <Quote className="absolute top-8 right-8 w-16 h-16 text-rose-gold/10" />

                      {/* Rating */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-5 h-5",
                              i < testimonial.rating
                                ? "text-gold fill-gold"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-full ${testimonial.bgColor} flex items-center justify-center text-lg font-bold text-gray-700`}
                        >
                          {testimonial.initials}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {testimonial.role} • {testimonial.service}
                          </p>
                        </div>
                        <span className="ml-auto text-sm text-gray-400">
                          {testimonial.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-rose-gold hover:text-white transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      index === activeIndex
                        ? "bg-rose-gold w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-rose-gold hover:text-white transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-4xl font-bold text-gray-900">4.9</span>
              <Star className="w-8 h-8 text-gold fill-gold" />
            </div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900 mb-2">2,500+</p>
            <p className="text-gray-600">Happy Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900 mb-2">98%</p>
            <p className="text-gray-600">Would Recommend</p>
          </div>
        </div>
      </div>
    </section>
  );
}
