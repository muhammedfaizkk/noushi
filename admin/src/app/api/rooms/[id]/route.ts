import { NextRequest, NextResponse } from "next/server";
import { getRoomById, updateRoom, deleteRoom } from "@/data/adminStore";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const room = getRoomById(id);

    if (!room) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: room });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch room";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updated = updateRoom(id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update room";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const deleted = deleteRoom(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Room removed",
      data: deleted,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete room";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
