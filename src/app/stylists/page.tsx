import { db } from "@/db";
import { stylists, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Star, Award, ArrowRight, Sparkles, Calendar } from "lucide-react";

export const metadata = {
  title: "Our Stylists - Glamour Studio",
  description: "Meet our team of expert stylists. Book appointments with certified professionals specializing in hair, makeup, skincare, and more.",
};

async function getStylists() {
  const allStylists = await db
    .select({
      id: stylists.id,
      userId: stylists.userId,
      designation: stylists.designation,
      specializations: stylists.specializations,
      experience: stylists.experience,
      bio: stylists.bio,
      rating: stylists.rating,
      totalReviews: stylists.totalReviews,
      totalAppointments: stylists.totalAppointments,
      isAvailable: stylists.isAvailable,
      user: {
        id: users.id,
        name: users.name,
        profilePhoto: users.profilePhoto,
      },
    })
    .from(stylists)
    .innerJoin(users, eq(stylists.userId, users.id))
    .where(eq(stylists.isActive, true))
    .orderBy(desc(stylists.rating));

  return allStylists;
}

export default async function StylistsPage() {
  const allStylists = await getStylists();

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-gold font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Our Team
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our
            <span className="gradient-text"> Expert Stylists</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our talented team of certified professionals is dedicated to bringing
            out your best look with skill and passion
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allStylists.map((stylist) => (
            <div key={stylist.id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div
                  className="h-64 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, var(--color-rose-gold) 0%, var(--color-gold) 100%)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/30">
                      {stylist.user.name.split(" ").map((n) => n[0]).join("")}
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
                    <span className="text-sm font-medium">{stylist.rating || "New"}</span>
                  </div>

                  {/* Availability */}
                  {stylist.isAvailable && (
                    <div className="absolute bottom-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      Available Today
                    </div>
                  )}

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
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-gold transition-colors">
                      {stylist.user.name}
                    </h3>
                    <p className="text-rose-gold text-sm font-medium capitalize">
                      {stylist.designation} Stylist
                    </p>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(stylist.specializations as string[] || []).slice(0, 3).map((spec, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-cream rounded-full text-gray-600"
                      >
                        {spec}
                      </span>
                    ))}
                    {(stylist.specializations as string[] || []).length > 3 && (
                      <span className="text-xs px-2 py-1 bg-cream rounded-full text-gray-600">
                        +{(stylist.specializations as string[]).length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="font-medium">{stylist.rating || "New"}</span>
                      <span>({stylist.totalReviews} reviews)</span>
                    </div>
                    <Link
                      href={`/book?stylist=${stylist.id}`}
                      className="text-rose-gold font-medium text-sm hover:underline flex items-center gap-1"
                    >
                      Book
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {allStylists.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Award className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No stylists available</h3>
            <p className="text-gray-600">
              Please check back later for our team updates
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-rose-gold to-rose-gold-dark rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Look?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Book an appointment with any of our expert stylists and experience
              the Glamour Studio difference
            </p>
            <Link href="/book" className="btn-gold inline-flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
