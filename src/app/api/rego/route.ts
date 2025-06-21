import { NextResponse } from "next/server";
import {fetchGoogleSheetDataRego} from "@/lib/googleSheets";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gid = searchParams.get("param1"); // First string
    const type = searchParams.get("param2"); // Second string
    if (!gid || !type) {
        return NextResponse.json({ message: "Missing gid parameter or type" }, { status: 400 });
    }

  // Pass both params to your data fetcher if needed
  const saftey = await fetchGoogleSheetDataRego(gid,type);

  if (!saftey) {
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  }
  return NextResponse.json(saftey);
}

