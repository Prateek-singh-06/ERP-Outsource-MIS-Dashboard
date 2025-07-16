// "use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import safetyAttendance from "@/data/safetyAttendance.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Users, Calendar, FileCheck2, UserCheck } from "lucide-react";
import {
  Users,
  Calendar,
  Coffee,
  PartyPopper,
  Heart,
  DollarSign,
} from "lucide-react";
import { useEffect, useState } from "react";
import MyModal from "./MyModal";
import { SafetyAttendanceData, SafetyEmployeeAttendance } from "@/lib/types";
import Loading from "@/components/Loading";
export default function AttendanceDashboard({
  selectedMonth,
}: {
  selectedMonth: string;
}) {
  const [SelectedPlant, setSelectedPlant] = useState<string | null>("ALL");
  const [SelectedDesignation, setSelectedDesignation] = useState<string | null>(
    "ALL"
  );
  const [SearchQuery, setSearchQuery] = useState<string>("");
  const [uniquePlants, setUniquePlants] = useState<string[] | null>(null);
  const [uniqueDesignations, setUniqueDesignations] = useState<string[] | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<SafetyEmployeeAttendance | null>(null);
  const [data, setData] = useState<SafetyAttendanceData | null>(null);
  const [filteredEmployees, setFilteredEmployees] = useState<
    SafetyEmployeeAttendance[] | null
  >();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // Filter the unique plants and designations from the data
    if (!data) return;
    const uniquePlants: string[] = Array.from(
      new Set(data.employees.map((emp: SafetyEmployeeAttendance) => emp.plant))
    );
    setUniquePlants(uniquePlants);
    const uniqueDesignations: string[] = Array.from(
      new Set(
        data.employees.map((emp: SafetyEmployeeAttendance) => emp.designation)
      )
    );
    setUniqueDesignations(uniqueDesignations);
  }, [data]);

  useEffect(() => {
    // var index=0
    async function fetchTheData() {
      try {
        if (!safetyAttendance) {
          return;
        }
        let index = safetyAttendance.findIndex(
          (item) => item.Month === selectedMonth
        );
        if (index === -1) {
          index = 0; // Default to the first item if not found
        }
        setIndex(index);
        const response = await fetch(
          `/api/SafetyAttendance?param1=${encodeURIComponent(
            safetyAttendance[index].gid
          )}`
        );
        if (!response) {
          throw new Error("failed to fetch the data");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log("Error", error);
      }
    }

    fetchTheData();
    // const interval = setInterval(fetchTheData, DATA_REFRESH_INTERVAL); // fetch every 20 seconds

    // return () => clearInterval(interval); // cleanup on unmount
  }, [selectedMonth]);

  useEffect(() => {
    if (!data) return;
    const filtereddata = data.employees.filter(
      (employee: SafetyEmployeeAttendance | null) => {
        if (!employee) return false;
        const plantMatch =
          SelectedPlant != "ALL" ? employee.plant === SelectedPlant : true;
        const designationMatch =
          SelectedDesignation != "ALL"
            ? employee.designation === SelectedDesignation
            : true;
        const searchMatch = SearchQuery
          ? employee.name.toLowerCase().includes(SearchQuery.toLowerCase()) ||
            employee.designation
              .toLowerCase()
              .includes(SearchQuery.toLowerCase()) ||
            employee.plant.toLowerCase().includes(SearchQuery.toLowerCase())
          : true;
        return plantMatch && designationMatch && searchMatch;
      }
    );
    setFilteredEmployees(filtereddata);
  }, [SelectedDesignation, SelectedPlant, SearchQuery, data]);
  function getMonthNumber(monthYear: string): number | undefined {
    // Example input: "JULY 2025"
    const [monthStr] = monthYear.trim().split(" ");
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    const idx = months.indexOf(monthStr.toUpperCase());
    return idx !== -1 ? idx + 1 : undefined;
  }

  return (
    <>
      {filteredEmployees && data ? (
        <div className="bg-white min-h-screen ">
          <header className="bg-purple-700 text-white py-4 px-6 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-white rounded-sm" />
              <h1 className="text-lg font-semibold">SGS</h1>
              <span className="text-sm">RML Site Attendance</span>
            </div>
            {/* <Button variant="outline" className="text-black border-white hover:bg-white hover:text-purple-700">Export</Button> */}
          </header>

          <main className="bg-gray-50 rounded-b-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Attendance Dashboard – {safetyAttendance[index].Month}
            </h2>

            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <Users className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">Employees</p>
                  <p className="text-xl font-semibold">
                    {data.summary.totalEmployees}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <Calendar className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">Workdays</p>
                  <p className="text-xl font-semibold">
                    {data.summary.totalWorkdays}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <FileCheck2 className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">Absent</p>
                  <p className="text-xl font-semibold">
                    {data.summary.totalLeaves}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <FileCheck2 className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">WeeklyOff</p>
                  <p className="text-xl font-semibold">
                    {data.summary.weeklyOff}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <FileCheck2 className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">Holidays</p>
                  <p className="text-xl font-semibold">
                    {data.summary.Holidays}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <FileCheck2 className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">Paid Leaves</p>
                  <p className="text-xl font-semibold">
                    {data.summary.paidLeaves}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <UserCheck className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">Total Days For Payment</p>
                  <p className="text-xl font-semibold">
                    {data.summary.totalPresents}
                  </p>
                </CardContent>
              </Card>
            </div> */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <Card className=" cursor-pointer py-0 ">
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <Users className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">Employees</p>
                  <p className="text-xl font-semibold">
                    {data.summary.totalEmployees}
                  </p>
                </CardContent>
              </Card>

              <Card className=" cursor-pointer py-0  ">
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <Calendar className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">Workdays</p>
                  <p className="text-xl font-semibold">
                    {data.summary.totalWorkdays}
                  </p>
                </CardContent>
              </Card>

              {/* <Card className=" cursor-pointer py-0  ">
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <Coffee className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">WeeklyOff</p>
                  <p className="text-xl font-semibold">
                    {data.summary.weeklyOff}
                  </p>
                </CardContent>
              </Card> */}

              {/* <Card className=" cursor-pointer py-0  ">
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <PartyPopper className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">Holidays</p>
                  <p className="text-xl font-semibold">
                    {data.summary.Holidays}
                  </p>
                </CardContent>
              </Card> */}

              {/* <Card className=" cursor-pointer py-0  ">
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <Heart className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">Paid Leaves</p>
                  <p className="text-xl font-semibold">
                    {data.summary.paidLeaves}
                  </p>
                </CardContent>
              </Card> */}
              <Card className=" cursor-pointer py-0  ">
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <Heart className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground">Absent</p>
                  <p className="text-xl font-semibold">
                    {(data.summary.paidLeaves ?? 0) +
                      (data.summary.Holidays ?? 0) +
                      (data.summary.weeklyOff ?? 0)}
                  </p>
                </CardContent>
              </Card>

              {/* <Card className=" cursor-pointer py-0  ">
                <CardContent className="flex flex-col items-center justify-center py-4">
                  <DollarSign className="text-purple-700 mb-1" />
                  <p className="text-sm text-muted-foreground text-center">
                    Total Days For Payment
                  </p>
                  <p className="text-lg font-semibold">
                    {data.summary.totalPresents}
                  </p>
                </CardContent>
              </Card> */}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <Select
                value={SelectedPlant ?? undefined}
                onValueChange={setSelectedPlant}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Select Plant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Plants</SelectItem>
                  {uniquePlants &&
                    uniquePlants.map((plant) => (
                      <SelectItem key={plant} value={plant}>
                        {plant}
                      </SelectItem>
                    ))}
                  {/* <SelectItem value="rml-1">RML-1</SelectItem>
              <SelectItem value="rml-6">RML-6</SelectItem> */}
                </SelectContent>
              </Select>

              <Select
                value={SelectedDesignation ?? undefined}
                onValueChange={setSelectedDesignation}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Select Designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Designations</SelectItem>
                  {uniqueDesignations &&
                    uniqueDesignations.map((designations) => (
                      <SelectItem key={designations} value={designations}>
                        {designations}
                      </SelectItem>
                    ))}
                  {/* <SelectItem value="safety-manager">Safety Manager</SelectItem>
              <SelectItem value="asst-manager">Asst. Manager</SelectItem> */}
                </SelectContent>
              </Select>

              <Input
                placeholder="Search"
                className="w-full md:w-[200px]"
                value={SearchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* <Button className="bg-purple-700 hover:bg-purple-800 text-white">Download</Button> */}
            </div>

            <div className="overflow-auto rounded-md border">
              <Table>
                <TableHeader className="bg-purple-700 text-white">
                  <TableRow>
                    <TableHead className="text-white text-center">
                      SL No
                    </TableHead>
                    <TableHead className="text-white text-center">
                      Name
                    </TableHead>
                    <TableHead className="text-white text-center">
                      Designation
                    </TableHead>
                    <TableHead className="text-white text-center">
                      Mobile No.
                    </TableHead>
                    <TableHead className="text-white text-center">
                      Plant
                    </TableHead>
                    <TableHead className="text-white text-center">
                      Workdays
                    </TableHead>
                    {/* <TableHead className="text-white">
                      National Holidays
                    </TableHead>
                    <TableHead className="text-white">Weekly Off</TableHead> */}
                    <TableHead className="text-white">Absent</TableHead>
                    {/* <TableHead className="text-white">Paid Leaves</TableHead>
                    <TableHead className="text-white">
                      Total Days For Payment
                    </TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Map over your real data here */}

                  {filteredEmployees.map(
                    (employee: SafetyEmployeeAttendance) => (
                      // <DialogTrigger >
                      <TableRow
                        className="text-center cursor-pointer "
                        key={employee.slNo}
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setDialogOpen(true);
                        }}
                        // onClick={() => handleClick(employee.slNo)}
                      >
                        <TableCell>{employee.slNo}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.designation}</TableCell>
                        <TableCell>{employee.mobile}</TableCell>
                        <TableCell>{employee.plant}</TableCell>
                        <TableCell>{employee.workdays}</TableCell>
                        {/* <TableCell>{employee.NationalHolidays}</TableCell> */}
                        {/* <TableCell>{employee.weeklyOff}</TableCell> */}
                        <TableCell>
                          {employee.leaves +
                            employee.PaidLeaves +
                            employee.weeklyOff +
                            employee.NationalHolidays}
                        </TableCell>
                        {/* <TableCell>{employee.PaidLeaves}</TableCell> */}
                        {/* <TableCell>{employee.TotalDaysForPayment}</TableCell> */}
                      </TableRow>
                      // </DialogTrigger>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </main>
          <MyModal
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            employee={selectedEmployee}
            month={getMonthNumber(selectedMonth)}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
