import { NextResponse } from "next/server";
import {fetchGoogleSheetDataSafteyAttendance } from "@/lib/googleSheets";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gid = searchParams.get("param1"); // First string

  // Pass both params to your data fetcher if needed
  const safteyAttendance = await fetchGoogleSheetDataSafteyAttendance(gid);

  if (!safteyAttendance) {
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  }
  return NextResponse.json(safteyAttendance);
}