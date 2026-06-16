import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { appointments, stylists, users } from "@/db/schema";
import { eq, and, desc, gte, lte } from "drizzle-orm";
import { generateBookingId } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");
    const stylistId = searchParams.get("stylistId");
    const status = searchParams.get("status");
    const date = searchParams.get("date");

    const conditions = [];

    if (customerId) {
      conditions.push(eq(appointments.customerId, parseInt(customerId)));
    }

    if (stylistId) {
      conditions.push(eq(appointments.stylistId, parseInt(stylistId)));
    }

    if (status) {
      conditions.push(eq(appointments.status, status as "pending" | "confirmed" | "inProgress" | "completed" | "cancelled" | "noShow"));
    }

    if (date) {
      conditions.push(eq(appointments.date, date));
    }

    const allAppointments = await db
      .select({
        id: appointments.id,
        bookingId: appointments.bookingId,
        customerId: appointments.customerId,
        stylistId: appointments.stylistId,
        services: appointments.services,
        appointmentType: appointments.appointmentType,
        date: appointments.date,
        timeSlot: appointments.timeSlot,
        totalDuration: appointments.totalDuration,
        totalPrice: appointments.totalPrice,
        status: appointments.status,
        homeAddress: appointments.homeAddress,
        specialRequests: appointments.specialRequests,
        discount: appointments.discount,
        couponCode: appointments.couponCode,
        finalAmount: appointments.finalAmount,
        createdAt: appointments.createdAt,
      })
      .from(appointments)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(appointments.createdAt));

    return NextResponse.json({
      success: true,
      data: allAppointments,
      count: allAppointments.length,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.customerId || !body.services || !body.date || !body.timeSlot) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate totals
    const totalDuration = body.services.reduce(
      (sum: number, s: { duration: number }) => sum + s.duration,
      0
    );
    const totalPrice = body.services.reduce(
      (sum: number, s: { price: number }) => sum + s.price,
      0
    );

    // Calculate discount and final amount
    const discount = body.discount || 0;
    const finalAmount = totalPrice - discount;

    // Generate booking ID
    const bookingId = generateBookingId();

    const [newAppointment] = await db
      .insert(appointments)
      .values({
        bookingId,
        customerId: body.customerId,
        stylistId: body.stylistId || null,
        services: body.services,
        appointmentType: body.appointmentType || "inSalon",
        date: body.date,
        timeSlot: body.timeSlot,
        totalDuration,
        totalPrice: totalPrice.toString(),
        status: "pending",
        homeAddress: body.homeAddress,
        specialRequests: body.specialRequests,
        discount: discount.toString(),
        couponCode: body.couponCode,
        finalAmount: finalAmount.toString(),
        referencePhotos: body.referencePhotos || [],
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: newAppointment,
        message: "Appointment booked successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
