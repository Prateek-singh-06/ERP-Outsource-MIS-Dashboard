import Papa from "papaparse";
import {
  ERP,
  ERPInput,
  Plant,
  Safety,
  SafetySummary,
  SeverityLevelWise,
} from "@/lib/types";

const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/e/${process.env.MAIN_SHEET_ID}/pub?gid=0&single=true&output=csv`;

const safeSplit = (
  value: string | undefined,
  separator: RegExp | string
): string[] =>
  value
    ? value
        .split(separator)
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : [];

const safeString = (value: string | undefined): string =>
  value ? value.trim() : "";

export async function fetchGoogleSheetData(): Promise<ERP[]> {
  const response = await fetch(SHEET_CSV_URL, {
    next: { revalidate: 0 },
  });

  const csvData = await response.text();

  const { data } = Papa.parse<ERPInput>(csvData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });
  let lastName = "";
  const filledData = data.map((row) => {
    if (row.name && row.name.trim().length > 0) {
      lastName = row.name.trim();
      return { ...row, name: lastName };
    } else {
      return { ...row, name: lastName };
    }
  });

  const filteredData = filledData.filter(
    (row) => row.companies && row.companies.trim().length > 0
  );

  return filteredData.map((row, index) => ({
    id: index + 1,
    name: safeString(row.name),
    companies: safeSplit(
      row.companies?.replace(/[\r\n]+/g, "/").replace(/\s*\/\s*/g, "/"),
      "/"
    ),
    lastUpdated: safeString(row.lastUpdated),
    status: safeString(row.status),
    delayStatus: safeString(row.delayStatus),
    currentStatus: safeSplit(row.currentStatus, /\r?\n/),
    nextSteps: safeSplit(row.nextSteps, /\r?\n/),
    targetDate: safeSplit(row.targetDate, /\r?\n/),
    extendedDate: row.extendedDate ? safeSplit(row.extendedDate, /\r?\n/) : [],
    Support: safeSplit(row.Support, /\r?\n/),
    Issues: safeSplit(row.Issues, /\r?\n/),
    primaryContacts: safeSplit(row.primaryContacts, "/"),
    businessUsers: safeSplit(row.businessUsers, "/"),
    NDA: safeSplit(row.NDA, /\r?\n/),
    Agreement: safeSplit(row.Agreement, /\r?\n/),
    Commercial: safeSplit(row.Commercial, /\r?\n/),
    Brochures: safeSplit(row.Brochures, /\r?\n/),
    MOMs: safeSplit(row.MOMs, /\r?\n/),
    implementationPlan: safeSplit(row.implementationPlan, /\r?\n/),
    SOWTracker: safeSplit(row.SOWTracker, /\r?\n/),
    Correspondence: safeString(row.Correspondence),
    Comparative: safeString(row.Comparative),
    Miscellaneous: safeString(row.Miscellaneous),
    Reports: safeString(row.Reports),
  }));
}
export async function fetchGoogleSheetDataSaftey(
  gid: string | null
): Promise<Safety> {
  const SAFETY_CSV_URL = `https://docs.google.com/spreadsheets/d/e/${process.env.NEXT_PUBLIC_SAFETY_CSV_ID}/pub?gid=${gid}&single=true&output=csv`;
  const response2 = await fetch(SAFETY_CSV_URL, {
    next: { revalidate: 0 },
  });

  const csvData = await response2.text();

  const { data } = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  // Assert type for data rows
  const typedData = data as Array<Record<string, number>>;

  const summary: SafetySummary = {
    totalObservations: typedData[4]._3,
    totalOpen: typedData[2]._3,
    closedPercent: typedData[3]._4,
    avgAgeofclosed: typedData[2]._7,
    avgAgeofopen: typedData[3]._7,
  };
  const Plant: Plant[] = [];
  for (let i = 7; i < 14; i++) {
    const oneplant: Plant = mapToPlants(data[i] as Record<string, number>);
    Plant.push(oneplant);
    function mapToPlants(mapData: Record<string, number>): Plant {
      return {
        plant: String(mapData._2), // ensure plant is a string
        Open: Number(mapData._3),
        Closed: Number(mapData._4),
        Low: Number(mapData._5),
        Medium: Number(mapData._6),
        High: Number(mapData._7),
        NoSeverity: Number(mapData._8),
        Total: Number(mapData._9),
      };
    }
  }
  const severityRow = data[14] as Record<string, number>;
  const SeverityLevelWise: SeverityLevelWise = {
    LOW: severityRow._5,
    MEDIUM: severityRow._6,
    HIGH: severityRow._7,
    "NO SEVERITY": severityRow._8,
  };
  const time=typedData[0]._7; // Assuming the time is in the first row and second column
  const Safety: Safety = {
    Summary: summary,
    Plant: Plant,
    SeverityLevelWise: SeverityLevelWise,
    Time: time
  };
  return Safety;
}
