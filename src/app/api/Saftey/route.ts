import { NextResponse } from "next/server";
import {fetchGoogleSheetDataSaftey } from "@/lib/googleSheets";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gid = searchParams.get("param1"); // First string

  // Pass both params to your data fetcher if needed
  const saftey = await fetchGoogleSheetDataSaftey(gid);

  if (!saftey) {
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  }
  return NextResponse.json(saftey);
}