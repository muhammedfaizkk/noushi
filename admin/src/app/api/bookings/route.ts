import { NextRequest, NextResponse } from "next/server";
import { getBookings, createBooking } from "@/data/adminStore";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    const bookings = getBookings({ status, search });
    return NextResponse.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch bookings";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guestName, guestPhone } = body;

    if (!guestName || !guestPhone) {
      return NextResponse.json(
        {
          success: false,
          message: "Guest name and phone number are required.",
        },
        { status: 400 }
      );
    }

    const newBooking = createBooking(body);
    return NextResponse.json(
      { success: true, data: newBooking },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create booking";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
