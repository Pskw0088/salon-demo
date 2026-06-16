import { Suspense } from "react";
import { db } from "@/db";
import { services, stylists, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BookingClient } from "./BookingClient";

async function getData() {
  const allServices = await db
    .select()
    .from(services)
    .where(eq(services.isActive, true));

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
      isAvailable: stylists.isAvailable,
      workingHours: stylists.workingHours,
      user: {
        id: users.id,
        name: users.name,
        profilePhoto: users.profilePhoto,
      },
    })
    .from(stylists)
    .innerJoin(users, eq(stylists.userId, users.id))
    .where(eq(stylists.isActive, true));

  return { services: allServices, stylists: allStylists };
}

export const metadata = {
  title: "Book Appointment - Glamour Studio",
  description: "Book your beauty appointment online. Select services, choose your stylist, pick a time, and get instant confirmation.",
};

export default async function BookPage() {
  const { services, stylists } = await getData();

  return (
    <Suspense fallback={<BookingLoading />}>
      <BookingClient services={services} stylists={stylists} />
    </Suspense>
  );
}

function BookingLoading() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8">
            <div className="h-4 w-full bg-gray-200 rounded mb-8 animate-pulse" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
