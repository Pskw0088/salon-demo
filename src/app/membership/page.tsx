import { db } from "@/db";
import { memberships } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Check, Crown, Star, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Membership Plans - Glamour Studio",
  description: "Join our membership program and enjoy exclusive discounts, priority booking, and special perks.",
};

async function getMemberships() {
  const plans = await db
    .select()
    .from(memberships)
    .where(eq(memberships.isActive, true));
  return plans;
}

export default async function MembershipPage() {
  const plans = await getMemberships();

  const tierColors: Record<string, string> = {
    Basic: "from-gray-400 to-gray-600",
    Premium: "from-rose-gold to-pink-500",
    VIP: "from-gold to-amber-500",
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Crown className="w-4 h-4" />
            Membership
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join Our
            <span className="gradient-text"> Exclusive Club</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Become a member and enjoy exclusive benefits, discounts, and priority services
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${
                plan.name === "Premium" ? "md:-mt-4 md:mb-4 ring-2 ring-rose-gold" : ""
              }`}
            >
              {plan.name === "Premium" && (
                <div className="absolute top-0 left-0 right-0 bg-rose-gold text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className={`h-32 bg-gradient-to-br ${tierColors[plan.name] || "from-gray-400 to-gray-600"} ${plan.name === "Premium" ? "mt-8" : ""} flex items-center justify-center`}>
                <div className="text-center text-white">
                  {plan.name === "VIP" && <Crown className="w-10 h-10 mx-auto mb-2" />}
                  {plan.name === "Premium" && <Star className="w-10 h-10 mx-auto mb-2" />}
                  {plan.name === "Basic" && <Sparkles className="w-10 h-10 mx-auto mb-2" />}
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
              </div>

              {/* Price */}
              <div className="p-6 text-center border-b border-gray-100">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="p-6">
                <ul className="space-y-4">
                  {(plan.benefits as string[]).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                <Link
                  href="/login"
                  className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center ${
                    plan.name === "Premium"
                      ? "btn-primary"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {plans.length === 0 && (
          <div className="text-center py-16">
            <Crown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No membership plans available</h3>
            <p className="text-gray-600">Check back soon for our membership offerings!</p>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Membership FAQ
          </h2>
          <div className="space-y-4">
            {[
              { q: "How do I become a member?", a: "Simply choose a plan and sign up. Your membership starts immediately after payment." },
              { q: "Can I cancel anytime?", a: "Yes, you can cancel your membership at any time. Benefits remain until the end of your billing period." },
              { q: "Are the discounts stackable with offers?", a: "Membership discounts can be combined with select offers. Check individual offer terms for details." },
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-xl shadow-md overflow-hidden group">
                <summary className="p-6 cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                  {faq.q}
                  <span className="text-rose-gold group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
