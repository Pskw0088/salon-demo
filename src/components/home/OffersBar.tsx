"use client";

import Link from "next/link";
import { Gift, Clock, ArrowRight, Percent, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const offers = [
  {
    id: 1,
    title: "First Visit Special",
    description: "Get 20% off on your first appointment",
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    validTill: "Limited time",
    gradient: "from-rose-gold to-pink-500",
  },
  {
    id: 2,
    title: "Refer & Earn",
    description: "Get ₹500 for every friend you refer",
    code: "REFER500",
    type: "flat",
    value: 500,
    validTill: "Always valid",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "Weekend Spa Deal",
    description: "Flat 30% off on all spa services",
    code: "WEEKEND30",
    type: "percentage",
    value: 30,
    validTill: "Sat-Sun only",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: 4,
    title: "Birthday Special",
    description: "Free facial on your birthday month",
    code: "BDAY",
    type: "free",
    value: 0,
    validTill: "Your birthday month",
    gradient: "from-gold to-amber-500",
  },
];

export function OffersBar() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Gift className="w-4 h-4" />
            Special Offers
          </span>
          <h2 className="section-title">
            Exclusive
            <span className="gradient-text"> Deals For You</span>
          </h2>
          <p className="section-subtitle">
            Don&apos;t miss out on these amazing offers. Use the coupon codes
            at checkout to avail discounts!
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-90`} />

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl transform -translate-x-4 translate-y-4" />

              {/* Content */}
              <div className="relative p-6 text-white h-full flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  {offer.type === "percentage" ? (
                    <Percent className="w-6 h-6" />
                  ) : offer.type === "free" ? (
                    <Sparkles className="w-6 h-6" />
                  ) : (
                    <Gift className="w-6 h-6" />
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
                <p className="text-white/80 text-sm mb-4 flex-grow">
                  {offer.description}
                </p>

                {/* Coupon Code */}
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/70">Use Code</p>
                      <p className="font-bold text-lg tracking-wider">{offer.code}</p>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(offer.code)}
                      className="px-3 py-1 bg-white/20 rounded text-xs hover:bg-white/30 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Valid Till */}
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Clock className="w-4 h-4" />
                  {offer.validTill}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/offers"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            View All Offers
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
