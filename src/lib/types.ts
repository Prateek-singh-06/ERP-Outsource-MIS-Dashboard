export interface ERP {
  id: number;
  name: string;
  companies: string[];
  lastUpdated: string;
  status: string;
  delayStatus: string;
  currentStatus: string[];
  nextSteps: string[];
  targetDate: string[];
  extendedDate?: string[];
  Support: string[];
  primaryContacts: string[];
  businessUsers: string[];
  NDA: string[];
  Agreement: string[];
  Commercial: string[];
  Brochures: string[];
  MOMs: string[];
  implementationPlan: string[];
  SOWTracker: string[];
  Correspondence: string;
  Comparative: string;
  Miscellaneous: string;
  Reports: string;
  Issues: string[];
}

export interface ERPInput {
  id: number;
  name: string;
  companies: string;
  lastUpdated: string;
  status: string;
  delayStatus: string;
  currentStatus: string;
  nextSteps: string;
  targetDate: string;
  extendedDate?: string;
  Support: string;
  primaryContacts: string;
  businessUsers: string;
  NDA: string;
  Agreement: string;
  Commercial: string;
  Brochures: string;
  MOMs: string;
  implementationPlan: string;
  SOWTracker: string;
  Correspondence: string;
  Comparative: string;
  Miscellaneous: string;
  Reports: string;
  Issues: string;
}

export interface SheetPercentage {
  name: string;
  progress: number;
  url: string;
}

export interface CsvSheet {
  name: string;
  csvUrl: string;
  url: string;
}

export interface ModuleData {
  id: string;
  name: string;
  progress: number;
  status: string;
  tasks: number;
  tasksCompleted: number;
  url: string;
}
export interface SafetySummary {
  totalObservations: number;
  totalOpen: number;
  closedPercent: number;
  avgAgeofclosed: number;
  avgAgeofopen: number;
}
export interface Plant {
  plant: string;
  Open: number;
  Closed: number;
  Low: number;
  Medium: number;
  High: number;
  NoSeverity: number;
  Total: number;
}
export interface SeverityLevelWise {
  LOW: number;
  MEDIUM: number;
  HIGH: number;
  "NO SEVERITY": number;
}
export interface Safety {
  Summary: SafetySummary;
  Plant: Plant[];
  SeverityLevelWise: SeverityLevelWise;
  Time: number;
}

export interface RegoSummary {
  TotalKM: number;
  TotalExtraKM: number;
  TotalExtraHour: number;
  TotalExtraBill: number;
  AverageKMPerVehiclePerDay?: number;
  AverageExtraKMPerVehiclePerDay?: number;
  AverageExtraHourPerVehiclePerDay?: number;
  AverageBillPerVehicalPerDay?: number;
  TotalDays?: number;
}

export interface RegoPieData {
  name: string;
  value: number;
}
export interface RegoBarData {
  name: string;
  "Extra KM Charges": number;
  "Extra hour Charges": number;
  "Total Extra Charges"?: number;
}
export interface VehicleUtilization {
  Utilization: number;
  Vehicle: string;
  type?: "BOLERO" | "BUS" | "TRAVELLER" | "WINGER" ;
}
export interface Rego {
  Summary: RegoSummary;
  PieData: RegoPieData[];
  BarData: RegoBarData[];
  Utilization: VehicleUtilization[];
}
// Interface for attendance summary
export interface SafetyAttendanceSummary {
  totalEmployees: number;
  totalWorkdays: number;
  totalLeaves: number;
  totalPresents: number;
  paidLeaves?: number;
  weeklyOff?: number;
  Holidays?: number;
}

// Interface for individual employee attendance record
export interface SafetyEmployeeAttendance {
  slNo: number;
  name: string;
  employeeId?: string;
  designation: string;
  mobile: string | number | null;
  plant: string;
  doj: string;
  attendance: string[];
  workdays: number;
  leaves: number;
  weeklyOff: number;
  NationalHolidays: number;
  PaidLeaves: number;
  TotalDaysForPayment: number;
}

// Complete attendance data structure
export interface SafetyAttendanceData {
  summary: SafetyAttendanceSummary;
  employees: SafetyEmployeeAttendance[];
}
export interface RegoFinancialData {
  month: string;
  vendorClaimed: number;
  calculated: number;
  deductions: number;
  hold: number;
  paid: number;
  status: string;
}

