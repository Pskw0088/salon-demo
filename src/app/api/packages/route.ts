import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { packages, services } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const conditions = [eq(packages.isActive, true)];

    if (category) {
      conditions.push(eq(packages.category, category));
    }

    if (featured === "true") {
      conditions.push(eq(packages.isFeatured, true));
    }

    const allPackages = await db
      .select()
      .from(packages)
      .where(and(...conditions));

    // Get service details for each package
    const packagesWithServices = await Promise.all(
      allPackages.map(async (pkg) => {
        const serviceIds = pkg.services as number[];
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

    return NextResponse.json({
      success: true,
      data: packagesWithServices,
      count: packagesWithServices.length,
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}
