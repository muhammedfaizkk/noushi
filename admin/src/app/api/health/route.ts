import { NextResponse } from "next/server";
import { roomsStore, bookingsStore } from "@/data/adminStore";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    framework: "Next.js 16 App Router",
    service: "Driftwood Stays Admin Backend",
    timestamp: new Date().toISOString(),
    totalRooms: roomsStore.length,
    totalBookings: bookingsStore.length,
  });
}
