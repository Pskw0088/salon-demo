"use client";

import Link from "next/link";
import { Star, Award, ArrowRight, Sparkles } from "lucide-react";

const stylists = [
  {
    id: 1,
    name: "Priya Sharma",
    designation: "Master Stylist",
    specializations: ["Hair Color", "Bridal", "Balayage"],
    experience: 10,
    rating: 4.9,
    reviews: 456,
    image: "linear-gradient(135deg, #B76E79 0%, #D4A5A5 100%)",
    initials: "PS",
  },
  {
    id: 2,
    name: "Rahul Verma",
    designation: "Senior Stylist",
    specializations: ["Men's Grooming", "Haircuts", "Beard"],
    experience: 8,
    rating: 4.8,
    reviews: 312,
    image: "linear-gradient(135deg, #4B6587 0%, #7B8FA1 100%)",
    initials: "RV",
  },
  {
    id: 3,
    name: "Ananya Patel",
    designation: "Expert Stylist",
    specializations: ["Skin Care", "Facials", "Spa"],
    experience: 12,
    rating: 5.0,
    reviews: 528,
    image: "linear-gradient(135deg, #D4AF37 0%, #E6C869 100%)",
    initials: "AP",
  },
];

export function FeaturedStylists() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Our Team
          </span>
          <h2 className="section-title">
            Meet Our
            <span className="gradient-text"> Expert Stylists</span>
          </h2>
          <p className="section-subtitle">
            Our talented team of professionals is dedicated to making you
            look and feel your absolute best
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stylists.map((stylist) => (
            <div key={stylist.id} className="group">
              <div className="card-hover overflow-hidden">
                {/* Image/Avatar */}
                <div
                  className="h-72 relative overflow-hidden"
                  style={{ background: stylist.image }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/30">
                      {stylist.initials}
                    </span>
                  </div>
                  
                  {/* Experience Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium">{stylist.experience} yrs</span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="text-sm font-medium">{stylist.rating}</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Link
                      href={`/stylists/${stylist.id}`}
                      className="w-full btn-primary text-center"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-gold transition-colors">
                        {stylist.name}
                      </h3>
                      <p className="text-rose-gold text-sm font-medium">
                        {stylist.designation}
                      </p>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {stylist.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-cream rounded-full text-gray-600"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Reviews */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="font-medium">{stylist.rating}</span>
                      <span>({stylist.reviews} reviews)</span>
                    </div>
                    <Link
                      href={`/book?stylist=${stylist.id}`}
                      className="text-rose-gold font-medium text-sm hover:underline flex items-center gap-1"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/stylists"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            Meet All Stylists
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
