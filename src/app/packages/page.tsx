import Link from "next/link";
import { db } from "@/db";
import { packages, services } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { Check, ArrowRight, Sparkles, Gift } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Packages - Glamour Studio",
  description: "Discover our value-packed beauty packages combining our best services at exclusive prices.",
};

async function getPackages() {
  const allPackages = await db
    .select()
    .from(packages)
    .where(eq(packages.isActive, true));

  const packagesWithServices = await Promise.all(
    allPackages.map(async (pkg) => {
      const serviceIds = pkg.services as number[];
      if (serviceIds.length === 0) return { ...pkg, serviceDetails: [] };
      
      const packageServices = await db
        .select()
        .from(services)
        .where(inArray(services.id, serviceIds));

      return {
        ...pkg,
        serviceDetails: packageServices,
      };
    })
  );

  return packagesWithServices;
}

export default async function PackagesPage() {
  const allPackages = await getPackages();

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Gift className="w-4 h-4" />
            Special Packages
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Value-Packed
            <span className="gradient-text"> Beauty Bundles</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Save more with our curated packages combining our best services at exclusive prices
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {allPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all">
              {/* Header */}
              <div className="h-32 bg-gradient-to-r from-rose-gold to-gold relative p-6">
                {pkg.tag && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-white text-rose-gold">
                    {pkg.tag}
                  </span>
                )}
                <div className="absolute bottom-4 left-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-7 h-7 text-rose-gold" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

                {/* Services */}
                <ul className="space-y-2 mb-6">
                  {pkg.serviceDetails.map((service) => (
                    <li key={service.id} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{service.name}</span>
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
                      Save {pkg.discount}%
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
          ))}
        </div>

        {/* Empty State */}
        {allPackages.length === 0 && (
          <div className="text-center py-16">
            <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No packages available</h3>
            <p className="text-gray-600">Check back soon for exciting package deals!</p>
          </div>
        )}
      </div>
    </div>
  );
}
