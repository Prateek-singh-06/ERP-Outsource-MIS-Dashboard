// "use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Users, Calendar, FileCheck2, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // App Router (Next.js 13+)
import MyModal from "./MyModal";
import { DialogTrigger } from "@/components/ui/dialog";

export default function AttendanceDashboard() {
  const [SelectedPlant, setSelectedPlant] = useState<string | null>("ALL");
  const [SelectedDesignation, setSelectedDesignation] = useState<string | null>(
    "ALL"
  );
  const [SearchQuery, setSearchQuery] = useState<string>("");
  const [uniquePlants, setUniquePlants] = useState<string[] | null>(null);
  const [uniqueDesignations, setUniqueDesignations] = useState<string[] | null>(
    null
  );
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const data = {
    summary: {
      totalEmployees: 16,
      totalWorkdays: 22,
      totalLeaves: 27,
      totalPresents: 240,
    },
    employees: [
      {
        slNo: 1,
        name: "Soumendu Adhikari",
        employeeId: "",
        designation: "Safety Manager",
        mobile: "9615256657",
        plant: "RML-1",
        doj: "17.02.25",
        attendance: [
          "P",
          "P",
          "P",
          "WO",
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "L",
          "P",
          "P",
          "P",
          "L",
          "P",
          "P",
          "WO",
          "WO",
          "P",
          "P",
          "P",
        ],
        workdays: 18,
        leaves: 0,
        weeklyOff: 4,
        NationalHolidays: 3,
        PaidLeaves: 2,
        TotalDaysForPayment: 22,
      },
      {
        slNo: 2,
        name: "Indrajit Paul",
        employeeId: "",
        designation: "Safety Manager",
        mobile: "7858837201",
        plant: "RML-6",
        doj: "18.03.25",
        attendance: [
          "WO",
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
        ],
        workdays: 17,
        leaves: 0,
        weeklyOff: 5,
        NationalHolidays: 3,
        PaidLeaves: 2,
        TotalDaysForPayment: 22,
      },
      {
        slNo: 3,
        name: "Susil Kumar Singh",
        employeeId: "",
        designation: "Asst. Manager",
        mobile: "9449521851",
        plant: "RML-1",
        doj: "19.03.25",
        attendance: [
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
        ],
        workdays: 18,
        leaves: 0,
        weeklyOff: 4,
        NationalHolidays: 3,
        PaidLeaves: 2,
        TotalDaysForPayment: 22,
      },
      {
        slNo: 4,
        name: "Sanjib Kumar Jena",
        employeeId: "",
        designation: "Safety Manager",
        mobile: "7537995151",
        plant: "RML-1",
        doj: "21.03.25",
        attendance: [
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
        ],
        workdays: 18,
        leaves: 0,
        weeklyOff: 4,
        NationalHolidays: 3,
        PaidLeaves: 2,
        TotalDaysForPayment: 22,
      },
      {
        slNo: 5,
        name: "Vivek Shai",
        employeeId: "",
        designation: "Safety Analyst",
        mobile: "7706919999",
        plant: "RML-6",
        doj: "05.05.25",
        attendance: [
          "WO",
          "P",
          "L",
          "L",
          "L",
          "L",
          "L",
          "L",
          "L",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
        ],
        workdays: 12,
        leaves: 7,
        weeklyOff: 3,
        NationalHolidays: 3,
        PaidLeaves: 2,
        TotalDaysForPayment: 22,
      },
      {
        slNo: 6,
        name: "Ajay Oraon",
        employeeId: "",
        designation: "Asst. Manager",
        mobile: "7980599492",
        plant: "RML-6",
        doj: "04.03.25",
        attendance: [
          "WO",
          "L",
          "L",
          "P",
          "P",
          "P",
          "P",
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
          "P",
          "P",
          "P",
          "WO",
          "P",
          "P",
          "P",
        ],
        workdays: 16,
        leaves: 2,
        weeklyOff: 4,
        NationalHolidays: 3,
        PaidLeaves: 2,
        TotalDaysForPayment: 22,
      },
      {
        slNo: 7,
        name: "Jagjeet Singh Arora",
        employeeId: "",
        designation: "Safety Manager",
        mobile: "8928343446",
        plant: "RML-1",
        doj: "17.04.25",
        attendance: [
          "WO",
          "L",
          "L",
          "L",
          "L",
          "L",
          "L",
          "L",
          "L",
          "L",
          "L",
          "P",
          "P",
          "P",
          "WO",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "WO",
        ],
        workdays: 9,
        leaves: 10,
        weeklyOff: 3,
        NationalHolidays: 3,
        PaidLeaves: 2,
        TotalDaysForPayment: 22,
      },
      {
        slNo: 8,
        name: "Mesbauddin SK",
        employeeId: "",
        designation: "Asst. Manager",
        mobile: "8918431002",
        plant: "RML-1",
        doj: "20.02.25",
        attendance: [
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "RH",
          "WO",
          "L",
          "L",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
          "P",
        ],
        workdays: 18,
        leaves: 2,
        weeklyOff: 1,
        NationalHolidays: 3,
        PaidLeaves: 2,
        TotalDaysForPayment: 22,
      },
      // ... (Continue for all 16 employees similarly)
    ],
  };
  // This is a mock data structure. Replace it with your actual data fetching logic.
  // Example of how you might fetch data from an API or database
  // const { data } = await fetchAttendanceData();

  useEffect(() => {
    // Filter the unique plants and designations from the data
    const uniquePlants = Array.from(
      new Set(data.employees.map((emp) => emp.plant))
    );
    setUniquePlants(uniquePlants);
    const uniqueDesignations = Array.from(
      new Set(data.employees.map((emp) => emp.designation))
    );
    setUniqueDesignations(uniqueDesignations);
  }, []);
  const filteredEmployees = data.employees.filter((employee) => {
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
  });
  function handleClick(id: number) {
    // console.log(e.currentTarget);
    router.push(`/safety/u/${id}`);
  }

  return (
    <div className="bg-white min-h-screen p-6">
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
          Attendance Dashboard – June 2025
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
              <p className="text-sm text-muted-foreground">Leaves</p>
              <p className="text-xl font-semibold">
                {data.summary.totalLeaves}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-4">
              <UserCheck className="text-purple-700 mb-1" />
              <p className="text-sm text-muted-foreground">Present</p>
              <p className="text-xl font-semibold">
                {data.summary.totalPresents}
              </p>
            </CardContent>
          </Card>
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
                <TableHead className="text-white">SL No</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Designation</TableHead>
                <TableHead className="text-white">Mobile No.</TableHead>
                <TableHead className="text-white">Plant</TableHead>
                <TableHead className="text-white">Workdays</TableHead>
                <TableHead className="text-white">National Holidays</TableHead>
                <TableHead className="text-white">Weekly Off</TableHead>
                <TableHead className="text-white">Absent</TableHead>
                <TableHead className="text-white">Paid Leaves</TableHead>
                <TableHead className="text-white">
                  Total Days For Payment
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Map over your real data here */}

              {filteredEmployees.map((employee) => (
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
                  <TableCell>{employee.NationalHolidays}</TableCell>
                  <TableCell>{employee.weeklyOff}</TableCell>
                  <TableCell>{employee.leaves}</TableCell>
                  <TableCell>{employee.PaidLeaves}</TableCell>
                  <TableCell>{employee.TotalDaysForPayment}</TableCell>
                </TableRow>
                // </DialogTrigger>
              ))}
            </TableBody>
          </Table>
        </div>
       
        
      </main>
       <MyModal
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          employee={selectedEmployee}
        />
    </div>
  );
}
