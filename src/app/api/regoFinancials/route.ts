import { NextResponse } from "next/server";
import { fetchGoogleSheetDataRegoFinancials } from "@/lib/googleSheets";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gid = searchParams.get("param1"); // First string
  const type = searchParams.get("param2"); // Second string
  const Month = searchParams.get("param3"); // Third string, if needed
  if (!gid || !type) {
    return NextResponse.json(
      { message: "Missing gid parameter or type" },
      { status: 400 }
    );
  }

  // Pass both params to your data fetcher if needed
  const RegoFinancialData = await fetchGoogleSheetDataRegoFinancials(gid, type, Month);
//   console.log(RegoFinancialData);

  if (!RegoFinancialData) {
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  }
  return NextResponse.json(RegoFinancialData);
}
