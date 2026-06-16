import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, and, ilike, or } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const featured = searchParams.get("featured");
    const popular = searchParams.get("popular");
    const search = searchParams.get("search");

    let query = db.select().from(services).where(eq(services.isActive, true));

    const conditions = [eq(services.isActive, true)];

    if (category && category !== "all") {
      conditions.push(eq(services.category, category as "mens" | "womens" | "kids" | "unisex"));
    }

    if (subCategory) {
      conditions.push(eq(services.subCategory, subCategory as "haircut" | "color" | "spa" | "nail" | "facial" | "bridal" | "treatment" | "massage" | "grooming"));
    }

    if (featured === "true") {
      conditions.push(eq(services.isFeatured, true));
    }

    if (popular === "true") {
      conditions.push(eq(services.isPopular, true));
    }

    if (search) {
      conditions.push(
        or(
          ilike(services.name, `%${search}%`),
          ilike(services.description, `%${search}%`)
        ) ?? eq(services.isActive, true)
      );
    }

    const allServices = await db
      .select()
      .from(services)
      .where(and(...conditions));

    return NextResponse.json({
      success: true,
      data: allServices,
      count: allServices.length,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newService = await db.insert(services).values({
      name: body.name,
      description: body.description,
      category: body.category,
      subCategory: body.subCategory,
      priceMin: body.priceMin,
      priceMax: body.priceMax,
      duration: body.duration,
      image: body.image,
      icon: body.icon,
      isPopular: body.isPopular || false,
      isFeatured: body.isFeatured || false,
      availableFor: body.availableFor || "both",
      productsUsed: body.productsUsed || [],
      aftercareInstructions: body.aftercareInstructions,
    }).returning();

    return NextResponse.json({
      success: true,
      data: newService[0],
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create service" },
      { status: 500 }
    );
  }
}
