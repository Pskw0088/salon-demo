import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { offers } from "@/db/schema";
import { eq, and, gte, lte } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const active = searchParams.get("active");

    const now = new Date();
    const conditions = [eq(offers.isActive, true)];

    if (active === "true") {
      conditions.push(lte(offers.startDate, now));
      conditions.push(gte(offers.endDate, now));
    }

    if (featured === "true") {
      conditions.push(eq(offers.isFeatured, true));
    }

    const allOffers = await db
      .select()
      .from(offers)
      .where(and(...conditions));

    return NextResponse.json({
      success: true,
      data: allOffers,
      count: allOffers.length,
    });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch offers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { couponCode } = body;

    if (!couponCode) {
      return NextResponse.json(
        { success: false, error: "Coupon code is required" },
        { status: 400 }
      );
    }

    const now = new Date();
    const [offer] = await db
      .select()
      .from(offers)
      .where(
        and(
          eq(offers.couponCode, couponCode.toUpperCase()),
          eq(offers.isActive, true),
          lte(offers.startDate, now),
          gte(offers.endDate, now)
        )
      );

    if (!offer) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired coupon code" },
        { status: 404 }
      );
    }

    // Check usage limit
    if (offer.usageLimit && offer.usedCount >= offer.usageLimit) {
      return NextResponse.json(
        { success: false, error: "Coupon usage limit reached" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: offer,
      message: "Coupon applied successfully",
    });
  } catch (error) {
    console.error("Error applying coupon:", error);
    return NextResponse.json(
      { success: false, error: "Failed to apply coupon" },
      { status: 500 }
    );
  }
}
