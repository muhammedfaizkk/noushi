import { NextRequest, NextResponse } from "next/server";
import { getRooms, createRoom } from "@/data/adminStore";

export async function GET() {
  try {
    const rooms = getRooms();
    return NextResponse.json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch rooms";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, location, price } = body;

    if (!title || !price || !location) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, price and location are required fields.",
        },
        { status: 400 }
      );
    }

    const newRoom = createRoom(body);
    return NextResponse.json(
      { success: true, data: newRoom },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create room";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
