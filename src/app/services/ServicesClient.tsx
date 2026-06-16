"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  Clock, 
  ArrowRight, 
  X,
  Sparkles,
  Check
} from "lucide-react";
import { cn, formatCurrency, serviceIcons } from "@/lib/utils";
import type { Service } from "@/db/schema";

const categories = [
  { id: "all", label: "All Services", icon: "✨" },
  { id: "womens", label: "Women's", icon: "👩" },
  { id: "mens", label: "Men's", icon: "👨" },
  { id: "kids", label: "Kids", icon: "👶" },
  { id: "unisex", label: "Unisex", icon: "💇" },
];

const subCategories = [
  { id: "all", label: "All" },
  { id: "haircut", label: "Haircut" },
  { id: "color", label: "Hair Color" },
  { id: "spa", label: "Spa" },
  { id: "nail", label: "Nails" },
  { id: "facial", label: "Facial" },
  { id: "bridal", label: "Bridal" },
  { id: "treatment", label: "Treatment" },
  { id: "massage", label: "Massage" },
  { id: "grooming", label: "Grooming" },
];

interface Props {
  services: Service[];
}

export function ServicesClient({ services }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
      const matchesSubCategory = selectedSubCategory === "all" || service.subCategory === selectedSubCategory;
      const matchesSearch =
        searchQuery === "" ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSubCategory && matchesSearch;
    });
  }, [services, selectedCategory, selectedSubCategory, searchQuery]);

  const toggleServiceSelection = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const selectedTotal = useMemo(() => {
    return services
      .filter((s) => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + parseFloat(s.priceMin), 0);
  }, [services, selectedServices]);

  const selectedDuration = useMemo(() => {
    return services
      .filter((s) => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.duration, 0);
  }, [services, selectedServices]);

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Our Services
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Your Perfect
            <span className="gradient-text"> Treatment</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From haircuts to complete makeovers, explore our comprehensive range
            of premium beauty services
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-gold focus:border-transparent outline-none"
              />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-xl"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Category Tabs */}
          <div className={cn(
            "mt-6 flex flex-wrap gap-2",
            !showFilters && "hidden md:flex"
          )}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all",
                  selectedCategory === cat.id
                    ? "bg-rose-gold text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sub-category Pills */}
          <div className={cn(
            "mt-4 flex flex-wrap gap-2",
            !showFilters && "hidden md:flex"
          )}>
            {subCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCategory(sub.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                  selectedSubCategory === sub.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredServices.length}</span> services
          </p>
          {selectedServices.length > 0 && (
            <button
              onClick={() => setSelectedServices([])}
              className="text-sm text-rose-gold hover:underline flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear selection ({selectedServices.length})
            </button>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={cn(
                "group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300",
                selectedServices.includes(service.id) && "ring-2 ring-rose-gold"
              )}
            >
              {/* Header */}
              <div
                className="h-32 relative"
                style={{
                  background: `linear-gradient(135deg, var(--color-rose-gold) 0%, var(--color-gold) 100%)`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl opacity-80">
                    {serviceIcons[service.subCategory] || "✨"}
                  </span>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {service.isPopular && (
                    <span className="bg-gold text-black text-xs font-bold px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  {service.isFeatured && (
                    <span className="bg-white text-rose-gold text-xs font-bold px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                {/* Select Button */}
                <button
                  onClick={() => toggleServiceSelection(service.id)}
                  className={cn(
                    "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    selectedServices.includes(service.id)
                      ? "bg-rose-gold text-white"
                      : "bg-white/80 text-gray-600 hover:bg-white"
                  )}
                >
                  <Check className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs text-rose-gold font-medium uppercase tracking-wider">
                      {service.subCategory}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">
                      {service.name}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-lg font-bold text-rose-gold">
                      {formatCurrency(service.priceMin)}
                      {service.priceMax && (
                        <span className="text-sm font-normal text-gray-500">
                          {" "}- {formatCurrency(service.priceMax)}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {service.duration} mins
                    </p>
                  </div>

                  <button
                    onClick={() => toggleServiceSelection(service.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium text-sm transition-all",
                      selectedServices.includes(service.id)
                        ? "bg-rose-gold text-white"
                        : "bg-rose-gold/10 text-rose-gold hover:bg-rose-gold hover:text-white"
                    )}
                  >
                    {selectedServices.includes(service.id) ? "Selected" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedSubCategory("all");
                setSearchQuery("");
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Selection Bar */}
      {selectedServices.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 z-50 animate-slide-up">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-500">Selected Services</p>
                <p className="text-lg font-bold text-gray-900">
                  {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm text-gray-500">Total Duration</p>
                <p className="text-lg font-bold text-gray-900">{selectedDuration} mins</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Starting From</p>
                <p className="text-lg font-bold text-rose-gold">
                  {formatCurrency(selectedTotal)}
                </p>
              </div>
            </div>

            <Link
              href={`/book?services=${selectedServices.join(",")}`}
              className="btn-primary flex items-center gap-2"
            >
              Continue to Book
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
