import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { RegoFinancialData } from "@/lib/types";
import Loading from "@/components/Loading";
import RegoFinancialCard from "./RegoFinancialsCard";
import Link from "next/link";
import { DATA_REFRESH_INTERVAL } from "@/lib/constants";

// const financialData = [
//   {
//     month: "MARCH 2025",
//     vendorClaimed: 2269471,
//     calculated: 2200000,
//     deductions: 21480,
//     hold: 0,
//     paid: 2247991,
//     status: "Paid",
//   },
//   {
//     month: "APRIL 2025",
//     vendorClaimed: 3856033,
//     calculated: 3856033,
//     deductions: 137707,
//     hold: 329307,
//     paid: 3389019,
//     status: "Paid",
//   },
//   {
//     month: "MAY 2025",
//     vendorClaimed: 5311441,
//     calculated: 5300000,
//     deductions: 11441,
//     hold: 300000,
//     paid: 5000000,
//     status: "Hold",
//   },
//   // Add more months as needed
// ];

export default function RegoFinancialSection() {
  // const [selectedStatus, setSelectedStatus] = useState("All Payments");
  const [FinancialsMonth, setFinancialsMonth] = useState("MARCH");
  const [FinancialData, setFinancialData] = useState<
    RegoFinancialData[] | null
  >(null);
  const [SelectedMonthData, setSelectedMonthData] = useState<
    RegoFinancialData[] | undefined
  >();
  const chartData = FinancialData?.map((item) => ({
    name: item.month,
    Paid: item.paid,
    Hold: item.hold,
    Deductions: item.deductions,
  }));

  useEffect(() => {
    async function fetchTheData() {
      try {
        const response = await fetch(
          `/api/regoFinancials?param1=${encodeURIComponent(
            "gid number"
          )}&param2=${encodeURIComponent("all")}&param3=${encodeURIComponent(
            "MAY 2025"
          )}`
        );
        if (!response) {
          throw new Error("failed to fetch the data");
        }
        const data = await response.json();
        console.log(data);
        setFinancialData(data);
      } catch (error) {
        console.log("Error", error);
      }
    }

    fetchTheData();
    const interval = setInterval(fetchTheData, DATA_REFRESH_INTERVAL); // fetch every 20 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  useEffect(() => {
    const SelectedMonthDatalocal: RegoFinancialData[] | undefined =
      FinancialData?.filter((item) => item.month === FinancialsMonth);
    setSelectedMonthData(SelectedMonthDatalocal);
  }, [FinancialsMonth, FinancialData]);

  return (
    <>
      {FinancialData ? (
        <div className="space-y-6">
          <div className="flex flex-wrap justify-between gap-4 items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Rego Financial Overview
            </h2>
            <div className="flex flex-wrap gap-2">
              <Select
                value={FinancialsMonth}
                onValueChange={setFinancialsMonth}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="January 2024 - July 2025" />
                </SelectTrigger>
                <SelectContent>
                  {FinancialData?.map((onemonth, index) => {
                    return (
                      <SelectItem key={index} value={onemonth.month}>
                        {onemonth.month}
                      </SelectItem>
                    );
                  })}
                  {/* <SelectItem value="MAY 2025">Jan 2024 - Jul 2025</SelectItem> */}
                </SelectContent>
              </Select>

              {/* <Select onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Payments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Payments">All Payments</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Hold">Hold</SelectItem>
            </SelectContent>
          </Select> */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* <Card>
              <CardHeader>
                <CardTitle>Rego Billed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-gray-700">
                  {SelectedMonthData?.[0]?.vendorClaimed?.toLocaleString(
                    "en-IN"
                  ) ?? "—"}
                </p>
              </CardContent>
            </Card> */}
            <Link
              href="https://docs.google.com/spreadsheets/d/1RixWkiXeGQ6FFptv5xgHvBm_bqzvcrJam8xL2Wvf5BA/edit?gid=242989939#gid=242989939"
              target="_blank"
            >
              <RegoFinancialCard
                title="Rego Billed"
                amount={SelectedMonthData?.[0].vendorClaimed}
                icon="vendor"
                month={SelectedMonthData?.[0].month}
              />
            </Link>
            <Link
              href="https://docs.google.com/spreadsheets/d/1RixWkiXeGQ6FFptv5xgHvBm_bqzvcrJam8xL2Wvf5BA/edit?gid=242989939#gid=242989939"
              target="_blank"
            >
              <RegoFinancialCard
                title="RML Approved"
                amount={SelectedMonthData?.[0].paid}
                icon="payment"
                month={SelectedMonthData?.[0].month}
              />
            </Link>
            <Link
              href="https://docs.google.com/spreadsheets/d/1RixWkiXeGQ6FFptv5xgHvBm_bqzvcrJam8xL2Wvf5BA/edit?gid=242989939#gid=242989939"
              target="_blank"
            >
              <RegoFinancialCard
                title="Total On Hold"
                amount={SelectedMonthData?.[0].hold}
                icon="package"
                month={SelectedMonthData?.[0].month}
              />
            </Link>
            <Link
              href="https://docs.google.com/spreadsheets/d/1RixWkiXeGQ6FFptv5xgHvBm_bqzvcrJam8xL2Wvf5BA/edit?gid=242989939#gid=242989939"
              target="_blank"
            >
              <RegoFinancialCard
                title="Total Deductions"
                amount={SelectedMonthData?.[0].deductions}
                icon="credit"
                month={SelectedMonthData?.[0].month}
              />
            </Link>
            {/* <Card>
              <CardHeader>s
                <CardTitle>Total Paid to Rego</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-green-600">
                  {SelectedMonthData?.[0]?.paid?.toLocaleString("en-IN")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total On Hold</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-yellow-500">
                  {SelectedMonthData?.[0]?.hold?.toLocaleString("en-IN")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Deductions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-red-500">
                  {SelectedMonthData?.[0].deductions.toLocaleString("en-IN")}
                </p>
              </CardContent>
            </Card> */}
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <ResponsiveContainer width="100%" height={450}>
              <BarChart
                data={chartData}
                barSize={100}
                margin={{ top: 20, right: 30, left: 50, bottom: 10 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 18, fontWeight: "bold", fill: "#374151" }}
                />
                <YAxis
                  tick={{ fontSize: 18, fontWeight: "bold", fill: "#374151" }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="Paid" stackId="a" fill="#4ade80" />
                <Bar dataKey="Hold" stackId="a" fill="#facc15" />
                <Bar dataKey="Deductions" stackId="a" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Month</th>
                  <th className="p-2">Rego Billed</th>
                  <th className="p-2">RML Approved</th>
                  <th className="p-2">Deductions</th>
                  <th className="p-2">Hold</th>
                  {/* <th className="p-2">Paid</th>
              <th className="p-2">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {FinancialData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium text-gray-700">
                      {item.month}
                    </td>
                    <td className="p-2">₹{item.vendorClaimed}</td>
                    <td className="p-2">₹{item.paid}</td>
                    <td className="p-2">₹{item.deductions}</td>
                    <td className="p-2">₹{item.hold}</td>
                    {/* <td className="p-2">
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${item.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{item.status}</span>
                  </td>
                  <td className="p-2">
                    <Eye className="h-4 w-4 text-gray-500 cursor-pointer" />
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
