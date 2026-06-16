"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles, Gift } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const packages = [
  {
    id: 1,
    name: "Bridal Glow Package",
    description: "Complete bridal beauty experience for your special day",
    services: [
      "Pre-bridal facial (3 sessions)",
      "Full body polishing",
      "Hair spa treatment",
      "Bridal makeup trial",
      "Wedding day makeup & hair",
    ],
    originalPrice: 35000,
    packagePrice: 25000,
    tag: "Bestseller",
    tagColor: "bg-gold text-black",
    gradient: "from-rose-gold via-pink-400 to-rose-300",
  },
  {
    id: 2,
    name: "Couple Spa Retreat",
    description: "Relaxing spa experience for couples",
    services: [
      "Couples massage (60 min)",
      "Body scrub & wrap",
      "Facial for both",
      "Manicure & Pedicure",
      "Complimentary drinks",
    ],
    originalPrice: 12000,
    packagePrice: 8999,
    tag: "Popular",
    tagColor: "bg-emerald-500 text-white",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
  },
  {
    id: 3,
    name: "Party Ready Package",
    description: "Get glammed up for any special occasion",
    services: [
      "Party makeup",
      "Hair styling",
      "Nail art",
      "Eyelash extensions",
      "Touch-up kit",
    ],
    originalPrice: 8000,
    packagePrice: 5999,
    tag: "New",
    tagColor: "bg-blue-500 text-white",
    gradient: "from-amber-400 via-gold to-yellow-300",
  },
];

export function PackagesPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Gift className="w-4 h-4" />
            Special Packages
          </span>
          <h2 className="section-title">
            Value-Packed
            <span className="gradient-text"> Beauty Bundles</span>
          </h2>
          <p className="section-subtitle">
            Save more with our curated packages combining our best services
            at exclusive prices
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="group">
              <div className="card-hover h-full flex flex-col overflow-hidden">
                {/* Header with Gradient */}
                <div className={`h-32 bg-gradient-to-r ${pkg.gradient} relative p-6`}>
                  {/* Tag */}
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${pkg.tagColor}`}>
                    {pkg.tag}
                  </span>
                  
                  {/* Package Icon */}
                  <div className="absolute bottom-4 left-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-7 h-7 text-rose-gold" />
                    </div>
                  </div>

                  {/* Decorative */}
                  <div className="absolute top-1/2 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {pkg.description}
                  </p>

                  {/* Services List */}
                  <ul className="space-y-2 mb-6 flex-grow">
                    {pkg.services.map((service, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-rose-gold">
                        {formatCurrency(pkg.packagePrice)}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {formatCurrency(pkg.originalPrice)}
                      </span>
                      <span className="text-sm text-emerald-600 font-medium">
                        Save {Math.round(((pkg.originalPrice - pkg.packagePrice) / pkg.originalPrice) * 100)}%
                      </span>
                    </div>

                    <Link
                      href={`/book?package=${pkg.id}`}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      Book Package
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
            href="/packages"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            View All Packages
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
