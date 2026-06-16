import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { stylists, users } from "@/db/schema";
import { eq, and, gte, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get("specialization");
    const minRating = searchParams.get("minRating");
    const available = searchParams.get("available");

    const conditions = [eq(stylists.isActive, true)];

    if (available === "true") {
      conditions.push(eq(stylists.isAvailable, true));
    }

    if (minRating) {
      conditions.push(gte(stylists.rating, minRating));
    }

    const allStylists = await db
      .select({
        id: stylists.id,
        userId: stylists.userId,
        designation: stylists.designation,
        specializations: stylists.specializations,
        experience: stylists.experience,
        bio: stylists.bio,
        about: stylists.about,
        certifications: stylists.certifications,
        portfolio: stylists.portfolio,
        workingHours: stylists.workingHours,
        rating: stylists.rating,
        totalReviews: stylists.totalReviews,
        totalAppointments: stylists.totalAppointments,
        isAvailable: stylists.isAvailable,
        socialMedia: stylists.socialMedia,
        joinedAt: stylists.joinedAt,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          phone: users.phone,
          profilePhoto: users.profilePhoto,
        },
      })
      .from(stylists)
      .innerJoin(users, eq(stylists.userId, users.id))
      .where(and(...conditions))
      .orderBy(desc(stylists.rating));

    // Filter by specialization if provided
    let filteredStylists = allStylists;
    if (specialization) {
      filteredStylists = allStylists.filter((stylist) =>
        (stylist.specializations as string[])?.some(
          (s) => s.toLowerCase().includes(specialization.toLowerCase())
        )
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredStylists,
      count: filteredStylists.length,
    });
  } catch (error) {
    console.error("Error fetching stylists:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stylists" },
      { status: 500 }
    );
  }
}
