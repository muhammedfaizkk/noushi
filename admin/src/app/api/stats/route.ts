import { NextResponse } from "next/server";
import { getDashboardStats } from "@/data/adminStore";

export async function GET() {
  try {
    const stats = getDashboardStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch stats";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
