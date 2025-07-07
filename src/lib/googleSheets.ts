// "use server";
import Papa from "papaparse";
import {
  ERP,
  ERPInput,
  Plant,
  Rego,
  RegoBarData,
  RegoPieData,
  RegoSummary,
  Safety,
  SafetyAttendanceData,
  SafetyAttendanceSummary,
  SafetySummary,
  SeverityLevelWise,
} from "@/lib/types";
import regodata from "../data/RegoBilling.json";

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
  for (let i = 7; i < 19; i++) {
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
  const severityRow = data[19] as Record<string, number>;
  const SeverityLevelWise: SeverityLevelWise = {
    LOW: severityRow._5,
    MEDIUM: severityRow._6,
    HIGH: severityRow._7,
    "NO SEVERITY": severityRow._8,
  };
  const time = typedData[0]._7; // Assuming the time is in the first row and second column
  const Safety: Safety = {
    Summary: summary,
    Plant: Plant,
    SeverityLevelWise: SeverityLevelWise,
    Time: time,
  };
  return Safety;
}
export async function fetchGoogleSheetDataSafteyAttendance(
  gid: string | null
): Promise<SafetyAttendanceData> {
  const SAFETY_CSV_URL = `https://docs.google.com/spreadsheets/d/e/${process.env.NEXT_PUBLIC_SAFETY_ATTENDANCE_CSV_ID}/pub?gid=${gid}&single=true&output=csv`;
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
  function convertAttendanceData(
    rawData: Array<Record<string, number>>
  ): SafetyAttendanceData {
    const summary: SafetyAttendanceSummary = {
      totalEmployees: 16,
      totalWorkdays: rawData[19]["_38"],
      totalLeaves: rawData[19]["_43"],
      totalPresents: rawData[19]["_45"],
      paidLeaves:rawData[19]["_44"],
      weeklyOff:rawData[19]["_40"],
      Holidays:rawData[19]["_39"]
    };
    console.log(summary);
    const employees = [];
    for (let i = 3; i < 19; i++) {
      const row = rawData[i];
      if (!row[""]) {
        summary.totalEmployees=i-3;
        continue;
      }
      const attendance = [];
      for (let i = 7; i <= 37; i++) {
        const dayKey = `_${i}`;
        const value = row[dayKey];
        if (!value) {
          continue;
        }
        attendance.push(String(value));
      }
      const oneEmployee = {
        slNo: Number(row[""]),
        name: String(row["_1"]),
        designation: String(row["_3"]),
        mobile: String(row["_4"]),
        plant: String(row["_5"]),
        doj: String(row["_6"]),
        attendance: attendance,
        workdays: Number(row["_38"]),
        leaves: Number(row["_43"]),
        weeklyOff: Number(row["_40"]),
        NationalHolidays: Number(row["_39"]),
        PaidLeaves: Number(row["_44"]),
        TotalDaysForPayment: Number(row["_45"]),
      };
      employees.push(oneEmployee);
    }

    return {
      summary: summary,
      employees: employees,
    };
  }
  const formatedData: SafetyAttendanceData = convertAttendanceData(typedData);

  return formatedData;
}

export async function fetchGoogleSheetDataRego(
  gid: string | null,
  type: string | null,
  Month?: string | null
): Promise<Rego> {
  if (!Month) {
    Month = new Date()
      .toLocaleString("default", { month: "long" })
      .toUpperCase();
  }
  const regodatafiltered = regodata.filter((row) => row.month === Month);
  if (regodatafiltered.length === 0) {
    throw new Error(`No data found for month: ${Month}`);
  }
  const SAFETY_CSV_URL = `https://docs.google.com/spreadsheets/d/e/${regodatafiltered[0].csvId}/pub?gid=${regodatafiltered[0].gid}&single=true&output=csv`;
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
  const totalLength = typedData.length;
  function timeStringToHours(time: string | undefined): number {
    if (!time) return 0;
    const [hours, minutes] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 0;
    return hours + minutes / 60;
  }
  function extractNumber(value: string | undefined): number {
    if (!value) return 0;
    // Remove all non-digit and non-decimal characters
    const num = value.replace(/[^0-9.]/g, "");
    return Number(num) || 0;
  }

  const regosummary: RegoSummary = {
    TotalKM: typedData[Math.min(35, totalLength - 1)]["Total Running Kms"],
    TotalExtraKM: typedData[Math.min(35, totalLength - 1)]["EXTRA KMS"],
    TotalExtraHour: timeStringToHours(
      String(typedData[Math.min(35, totalLength - 1)]["Extra Hours"])
    ),
    TotalExtraBill: extractNumber(
      String(
        typedData[Math.min(35, totalLength - 1)][
          "Total Rented \n+ Extra KMs \n+ Extra HRs"
        ]
      )
    ),
  };
  if (type !== "all") {
    regosummary.TotalKM = 0;
    regosummary.TotalExtraKM = 0;
    regosummary.TotalExtraHour = 0;
    regosummary.TotalExtraBill = 0;
    for (let i = 0; i < Math.min(35, totalLength - 1); i++) {
      const row = typedData[i];

      if (String(row["Type"]) === type) {
        regosummary.TotalKM += row["Total Running Kms"] || 0;
        regosummary.TotalExtraBill +=
          extractNumber(
            String(row["Total Rented \n+ Extra KMs \n+ Extra HRs"])
          ) || 0;
        regosummary.TotalExtraKM += row["EXTRA KMS"] || 0;
        regosummary.TotalExtraHour +=
          timeStringToHours(String(row["Extra Hours"])) || 0;
      }
    }
  }

  const RegoPieData: RegoPieData[] = [];
  const BaseRent = {
    name: "Base Rent",
    value: 0,
  };
  const ExtraKMCharges = {
    name: "Extra KM Charges",
    value: 0,
  };
  const ExtraHourCharges = {
    name: "Extra hour Charges",
    value: 0,
  };
  const UtilizationData=[];
  for (let i = 0; i < Math.min(35, totalLength - 1); i++) {
    const row = typedData[i];
    if (type === "all" || String(row["Type"]) === type) {
      const VehicleUtilization={
          Utilization:extractNumber(String(row["UTILIZATION % "])),
          Vehicle:String(row["Vehicle No"])
      }
      UtilizationData.push(VehicleUtilization);
      BaseRent.value += extractNumber(String(row["Actual Rent"])) || 0;
      ExtraKMCharges.value +=
        extractNumber(String(row["Extra KM Charges"])) || 0;
      ExtraHourCharges.value +=
        extractNumber(String(row["Extra HRs. Charges"])) || 0;
    }
  }

  RegoPieData.push(ExtraKMCharges);
  RegoPieData.push(ExtraHourCharges);
  RegoPieData.push(BaseRent);

  const RegoBarData: RegoBarData[] = [];
  for (let i = 0; i < Math.min(35, totalLength - 1); i++) {
    const row = typedData[i];

    if (type === "all" || String(row["Type"]) === type) {
      const oneRegoVehicle: RegoBarData = {
        name: String(row["Vehicle No"] ?? ""),
        "Extra KM Charges":
          extractNumber(String(typedData[i]["Extra KM Charges"])) || 0,
        "Extra hour Charges":
          extractNumber(String(typedData[i]["Extra HRs. Charges"])) || 0,
        "Total Extra Charges": 0, // will set below
      };
      oneRegoVehicle["Total Extra Charges"] =
        oneRegoVehicle["Extra KM Charges"] +
        oneRegoVehicle["Extra hour Charges"];
      RegoBarData.push(oneRegoVehicle);
      // typedData[i]['Total Rented \n+ Extra KMs \n+ Extra HRs'] || 0
    }
  }
  RegoBarData.sort(
    (a, b) => (b["Total Extra Charges"] || 0) - (a["Total Extra Charges"] || 0)
  );
  const Rego: Rego = {
    Summary: regosummary,
    PieData: RegoPieData,
    BarData: RegoBarData,
    Utilization:UtilizationData,
  };
  return Rego;
}
