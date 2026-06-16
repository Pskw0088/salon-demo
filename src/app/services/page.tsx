import { Suspense } from "react";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ServicesClient } from "./ServicesClient";

async function getServices() {
  const allServices = await db
    .select()
    .from(services)
    .where(eq(services.isActive, true));
  return allServices;
}

export const metadata = {
  title: "Services - Glamour Studio",
  description: "Explore our complete range of beauty services including hair styling, coloring, spa, facials, nails, bridal makeup and more.",
};

export default async function ServicesPage() {
  const allServices = await getServices();

  return (
    <Suspense fallback={<ServicesLoading />}>
      <ServicesClient services={allServices} />
    </Suspense>
  );
}

function ServicesLoading() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-96 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-80 bg-gray-200 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
              <div className="h-40 bg-gray-200 rounded-xl mb-4" />
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-8 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
