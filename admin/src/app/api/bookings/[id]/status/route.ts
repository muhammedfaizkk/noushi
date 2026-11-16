import { NextRequest, NextResponse } from "next/server";
import { updateBookingStatus } from "@/data/adminStore";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 }
      );
    }

    const updated = updateBookingStatus(id, status);

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update booking status";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
