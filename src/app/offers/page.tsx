import { db } from "@/db";
import { offers } from "@/db/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import { Gift, Clock, Percent, Copy, Sparkles } from "lucide-react";

export const metadata = {
  title: "Offers & Deals - Glamour Studio",
  description: "Discover exclusive offers, discounts, and coupon codes for your favorite beauty services.",
};

async function getOffers() {
  const now = new Date();
  const activeOffers = await db
    .select()
    .from(offers)
    .where(
      and(
        eq(offers.isActive, true),
        lte(offers.startDate, now),
        gte(offers.endDate, now)
      )
    );
  return activeOffers;
}

export default async function OffersPage() {
  const allOffers = await getOffers();

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Gift className="w-4 h-4" />
            Special Offers
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Exclusive
            <span className="gradient-text"> Deals For You</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Save big on your favorite beauty services with our special offers and coupon codes
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {allOffers.map((offer) => (
            <div
              key={offer.id}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-gold to-gold opacity-90" />

              {/* Content */}
              <div className="relative p-6 text-white h-full flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  {offer.type === "percentage" ? (
                    <Percent className="w-6 h-6" />
                  ) : offer.type === "freeService" ? (
                    <Sparkles className="w-6 h-6" />
                  ) : (
                    <Gift className="w-6 h-6" />
                  )}
                </div>

                {/* Badge */}
                {offer.isFeatured && (
                  <span className="absolute top-4 right-4 bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}

                {/* Title & Description */}
                <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
                <p className="text-white/80 text-sm mb-4 flex-grow">
                  {offer.description}
                </p>

                {/* Coupon Code */}
                {offer.couponCode && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/70">Use Code</p>
                        <p className="font-bold text-lg tracking-wider">{offer.couponCode}</p>
                      </div>
                      <button
                        className="px-3 py-1 bg-white/20 rounded text-xs hover:bg-white/30 transition-colors flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                {/* Valid Till */}
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Clock className="w-4 h-4" />
                  Valid till {new Date(offer.endDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {allOffers.length === 0 && (
          <div className="text-center py-16">
            <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No active offers</h3>
            <p className="text-gray-600">Check back soon for exciting deals!</p>
          </div>
        )}

        {/* Referral Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Refer & Earn ₹500</h2>
                <p className="text-white/80 mb-4">
                  Share your referral code with friends and family. When they book their first appointment, you both get ₹500 off!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-center">
                    <p className="text-xs text-white/70">Your Referral Code</p>
                    <p className="text-xl font-bold tracking-wider">GLAM2024</p>
                  </div>
                  <button className="px-6 py-3 bg-white text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors">
                    Share Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
