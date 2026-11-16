import { NextRequest, NextResponse } from "next/server";
import { deleteBooking } from "@/data/adminStore";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const deleted = deleteBooking(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted",
      data: deleted,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete booking";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
