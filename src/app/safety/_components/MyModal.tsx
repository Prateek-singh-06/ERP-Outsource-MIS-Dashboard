"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SafetyEmployeeAttendance } from "@/lib/types";

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: SafetyEmployeeAttendance | null;
  month?: number; // 1-based (e.g. 6 for June)
  year?: number; // e.g. 2025
}

const statusLabels: Record<string, string> = {
  P: "Present",
  L: "Leave",
  WO: "Weekly Off",
  RH: "Holiday",
  A: "Absent",
};

const statusColors: Record<string, string> = {
  P: "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-400",
  L: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-400",
  WO: "bg-gradient-to-r from-purple-500 to-violet-500 text-white border-purple-400",
  RH: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-400",
  A: "bg-gradient-to-r from-red-500 to-rose-500 text-white border-red-400",
};

const statusIcons: Record<string, string> = {
  P: "✓",
  L: "📋",
  WO: "🏖️",
  RH: "🎉",
  A: "✗",
};

function getStatusBadge(status: string) {
  const color =
    statusColors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  const label = statusLabels[status] || status;
  const icon = statusIcons[status] || "❓";

  return (
    <div
      className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold 
                  ${color} shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105`}
      title={label}
    >
      <span className="text-xs">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </div>
  );
}

export default function EmployeeDialog({
  open,
  onOpenChange,
  employee,
  month = 6,
  year = 2025,
}: EmployeeDialogProps) {
  // Prepare day-wise attendance
  const attendance = employee?.attendance || [];
  // Count summary
  const summary = attendance.reduce(
    (acc: Record<string, number>, curr: string) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    },
    {}
  );

  // Weekday headers
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate the weekday index for the 1st of the month (0=Sun, 1=Mon, ...)
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[1100px] max-w-non !max-w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-800">
            {employee ? employee.name : "Employee Details"}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            {employee ? (
              <>
                <span className="font-semibold">{employee.designation}</span>{" "}
                &mdash; <span>{employee.plant}</span>
                <br />
                <span className="text-sm text-gray-500">
                  DOJ: {employee.doj}
                </span>
              </>
            ) : (
              "No employee selected."
            )}
          </DialogDescription>
        </DialogHeader>

        {employee && (
          <div>
            {/* Attendance Summary */}
            <div className="flex flex-wrap gap-3 mb-2">
              {Object.entries(summary).map(([status, count]) => (
                <div
                  key={status}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-50 border text-sm shadow-sm"
                >
                  {getStatusBadge(status)}
                  <span className="font-medium">{String(count)}</span>
                </div>
              ))}
            </div>

            {/* Calendar-style Attendance Grid */}
            <div className="rounded-lg border bg-white shadow p-4">
              <div className="grid grid-cols-7 gap-2">
                {/* Weekday headers */}
                {weekdays.map((day) => (
                  <div
                    key={day}
                    className="text-xs font-semibold text-purple-700 text-center pb-1"
                  >
                    {day}
                  </div>
                ))}
                {/* Padding for the first week */}
                {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                  <div
                    key={`pad-${idx}`}
                    className="border border-gray-200 rounded-md bg-gray-50 min-h-[56px]"
                  />
                ))}
                {/* Attendance days */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  if (idx < attendance.length) {
                    // Attendance day
                    return (
                      <div
                        key={idx}
                        className="group relative flex flex-col items-center justify-between px-3 py-1 sm:px-3  sm:py-1
             border border-gray-200/60 rounded-2xl bg-white/80 backdrop-blur-sm
             min-h-[56px] shadow-sm hover:shadow-lg hover:shadow-blue-100/50
             transition-all duration-300 ease-out hover:scale-105 hover:border-blue-200/80
             cursor-pointer overflow-hidden"
                      >
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                        {/* Date number with enhanced styling */}
                        <div
                          className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full
                  bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200/50
                  group-hover:from-blue-100 group-hover:to-blue-50 group-hover:border-blue-200
                  transition-all duration-300"
                        >
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                            {idx + 1}
                          </span>
                        </div>

                        {/* Status badge container with improved positioning */}
                        <div className="relative z-10 flex items-center justify-center mt-2">
                          {getStatusBadge(attendance[idx])}
                        </div>

                        {/* Optional: Add a subtle accent line */}
                        <div
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 
                  bg-gradient-to-r from-blue-400 to-purple-400 
                  group-hover:w-8 transition-all duration-300 rounded-full"
                        />
                      </div>
                    );
                  } else {
                    // Empty day (no attendance data)
                    return (
                      <div
                        key={idx}
                        className="group relative flex flex-col items-center justify-between px-3 py-1 sm:p-4 
             border border-gray-200/60 rounded-2xl bg-white/80 backdrop-blur-sm
             min-h-[90px] shadow-sm hover:shadow-lg hover:shadow-blue-100/50
             transition-all duration-300 ease-out hover:scale-105 hover:border-blue-200/80
             cursor-pointer overflow-hidden"
                      >
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                        {/* Date number with enhanced styling */}
                        <div
                          className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full
                  bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200/50
                  group-hover:from-blue-100 group-hover:to-blue-50 group-hover:border-blue-200
                  transition-all duration-300"
                        >
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                            {idx + 1}
                          </span>
                        </div>

                        {/* Status badge container with improved positioning */}
                        <div className="relative z-10 flex items-center justify-center mt-2">
                        </div>

                        {/* Optional: Add a subtle accent line */}
                        <div
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 
                  bg-gradient-to-r from-blue-400 to-purple-400 
                  group-hover:w-8 transition-all duration-300 rounded-full"
                        />
                      </div>
                    );
                  }
                })}
                {/* Pad the last week to fill the grid */}
                {(() => {
                  const totalCells = firstDayOfMonth + attendance.length;
                  const remainder = totalCells % 7;
                  if (remainder === 0) return null;
                  return Array.from({ length: 7 - remainder }).map((_, idx) => (
                    <div key={`end-pad-${idx}`} />
                  ));
                })()}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
