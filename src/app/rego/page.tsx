"use client";
import { DataCard } from "./_components/Card";
// import { ChartBarLabel } from "./_components/barChart";
import Link from "next/link";
import { useEffect, useState } from "react";
import RegoData from "@/data/RegoBilling.json";
import { Rego } from "@/lib/types";
import Loading from "@/components/Loading";
// import { DATA_REFRESH_INTERVAL } from "@/lib/constants";
// import PieChartCard from "./_components/pieChartCard";
// import StackedBarChart from "./_components/StackedBarChart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VehicleUtilizationChart from "./_components/Utilization";
import MonthWiseBill from "./_components/Monthwisebill";
import RegoFinancial from "./_components/RegoFinancial";
type VehicleType = 'all' | 'BOLERO' | 'BUS' | 'TRAVELLER' | 'WINGER';
export default function RegoPage() {
  const [rego, setRego] = useState<Rego | null>(null);
  const [month, setMonth] = useState<string>("JULY 2025");
  const [Type, setType] = useState<VehicleType>("all");

  useEffect(() => {
    async function fetchTheData() {
      try {
        const response = await fetch(
          `/api/rego?param1=${encodeURIComponent(
            RegoData[0].gid
          )}&param2=${encodeURIComponent(Type)}&param3=${encodeURIComponent(
            month
          )}`
        );
        if (!response) {
          throw new Error("failed to fetch the data");
        }
        const data = await response.json();
        setRego(data);
      } catch (error) {
        console.log("Error", error);
      }
    }

    fetchTheData();
    // const interval = setInterval(fetchTheData, DATA_REFRESH_INTERVAL); // fetch every 20 seconds

    // return () => clearInterval(interval); // cleanup on unmount
  }, [Type, month]);
  const icons = {
    "Total KM": (
      // Road/Speedometer icon
      <svg
        className="h-5 w-5 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 13v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    ),
    "Total Extra KM": (
      // Speed/Arrow icon
      <svg
        className="h-5 w-5 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m4 0h-1V7h-1m-4 0h1v4h1m-4 0h1v4h1"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 19c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
        />
      </svg>
    ),
    "Total Extra Hour": (
      // Clock icon
      <svg
        className="h-5 w-5 text-yellow-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" strokeWidth={2} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6l4 2"
        />
      </svg>
    ),
    "Total Extra Bill": (
      // Rupee icon
      <svg
        className="h-5 w-5 text-purple-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 5H9.5a3.5 3.5 0 000 7H17M9.5 12H17M9.5 12l-5 7M17 19H9.5"
        />
      </svg>
    ),
    "Average KM": (
      // Calculator/Average icon
      <svg
        className="h-5 w-5 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 8h8M8 12h8M8 16h4"
        />
      </svg>
    ),
    "Average Extra KM": (
      // Trending up icon for average
      <svg
        className="h-5 w-5 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    "Average Extra Hour": (
      // Bar chart icon for average
      <svg
        className="h-5 w-5 text-yellow-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    "Average Bill": (
      // Pie chart icon for average
      <svg
        className="h-5 w-5 text-purple-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
  };
  const selected = RegoData.find((item) => item.month === month);
  const liveId = selected?.liveId || "";
  const gid = selected?.gid || "";
  return (
    <>
      {rego ? (
        <div className="mt-0 max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Meetings */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <h1 className="text-xl md:text-2xl pt-4 font-bold mb-5 text-black mr-5">
                REGO ETS DASHBOARD
              </h1>
              <div className="ml-5 text-[16px] font-bold">
                <Select value={month} onValueChange={setMonth} >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Select a Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Months</SelectLabel>
                      {/* <SelectItem value="OVERALL">OVERALL</SelectItem>  */}
                      <SelectItem value="APRIL 2025" >APRIL</SelectItem>
                      <SelectItem value="MAY 2025" >MAY</SelectItem>
                      <SelectItem value="JUNE 2025" >JUNE</SelectItem>
                      <SelectItem value="JULY 2025" >JULY</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Tabs defaultValue={Type} className="w-auto h-auto">
                <TabsList className="py-[20px] ">
                  <TabsTrigger
                    value="all"
                    className="text-[16px] font-bold px-3 py-4 cursor-pointer"
                    onClick={() => setType("all")}
                  >
                    OVERALL
                  </TabsTrigger>
                  <TabsTrigger
                    value="BOLERO"
                    className="text-[16px] px-3 py-4  cursor-pointer  font-bold"
                    onClick={() => setType("BOLERO")}
                  >
                    BOLERO
                  </TabsTrigger>
                  <TabsTrigger
                    value="BUS"
                    className="text-[16px] px-3 py-4 cursor-pointer  font-bold"
                    onClick={() => setType("BUS")}
                  >
                    BUS
                  </TabsTrigger>
                  <TabsTrigger
                    value="TRAVELLER"
                    className="text-[16px] px-3 py-4 cursor-pointer  font-bold"
                    onClick={() => setType("TRAVELLER")}
                  >
                    TRAVELLER
                  </TabsTrigger>
                  <TabsTrigger
                    value="WINGER"
                    className="text-[16px] px-3 py-4 cursor-pointer  font-bold"
                    onClick={() => setType("WINGER")}
                  >
                    WINGER
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-0">
            <Link
              href={`https://docs.google.com/spreadsheets/d/${liveId}/edit?gid=${gid}#gid=${gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Total KM"
                type="km"
                value={rego.Summary.TotalKM.toLocaleString('en-IN')}
                subtitle="Total KM driven"
                icon={icons["Total KM"]}
                hoverEffect="blue"
                className="bg-white hover:bg-blue-50 focus:ring-blue-500"
              />
            </Link>

            {/* Total Extra KM Card - Speed Icon */}
            <Link
              href={`https://docs.google.com/spreadsheets/d/${liveId}/edit?gid=${gid}#gid=${gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Total Extra KM"
                value={rego.Summary.TotalExtraKM.toLocaleString('en-IN')}
                type="km"
                subtitle="Total Extra KM driven"
                icon={icons["Total KM"]}
                hoverEffect="red"
                className="bg-white hover:bg-red-50 focus:ring-red-500"
              />
            </Link>
            {/* Total Extra Hour Card - Clock Icon */}
            <Link
              href={`https://docs.google.com/spreadsheets/d/${liveId}/edit?gid=${gid}#gid=${gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Total Extra Hour"
                type="hour"
                value={(Math.round(rego.Summary.TotalExtraHour * 10) / 10).toLocaleString('en-IN')}
                subtitle="Total Extra Hour driven"
                icon={icons["Total Extra Hour"]}
                hoverEffect="yellow"
                className="bg-white hover:bg-green-50 focus:ring-green-500"
              />
            </Link>
            {/* Total Extra Bill Card - Rupee Icon */}
            <Link
              href={`https://docs.google.com/spreadsheets/d/${liveId}/edit?gid=${gid}#gid=${gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Total Bill"
                type="rupee"
                value={Math.round(rego.Summary.TotalExtraBill).toLocaleString('en-IN')}
                subtitle="Total bill incurred "
                icon={icons["Total Extra Bill"]}
                hoverEffect="purple"
                className="bg-white hover:bg-green-50 focus:ring-green-500"
              />
            </Link>
            <Link
              href={`https://docs.google.com/spreadsheets/d/${liveId}/edit?gid=${gid}#gid=${gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Average KM"
                type="km"
                value={
                  (Math.round(
                    (rego.Summary.AverageKMPerVehiclePerDay ?? 0) * 10
                  ) / 10).toLocaleString('en-IN')
                }
                subtitle="Average KM per vehicle per day"
                icon={icons["Average KM"]}
                hoverEffect="blue"
                className="bg-white hover:bg-blue-50 focus:ring-blue-500"
              />
            </Link>

            {/* Total Extra KM Card - Speed Icon */}
            <Link
              href={`https://docs.google.com/spreadsheets/d/${liveId}/edit?gid=${gid}#gid=${gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Average Extra KM"
                value={
                  (Math.round(
                    (rego.Summary.AverageExtraKMPerVehiclePerDay ?? 0) * 10
                  ) / 10).toLocaleString('en-IN')
                }
                type="km"
                subtitle="Average Extra KM per vehicle per day"
                icon={icons["Average Extra KM"]}
                hoverEffect="red"
                className="bg-white hover:bg-red-50 focus:ring-red-500"
              />
            </Link>
            {/* Total Extra Hour Card - Clock Icon */}
            <Link
              href={`https://docs.google.com/spreadsheets/d/${liveId}/edit?gid=${gid}#gid=${gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Average Extra Hour"
                type="hour"
                value={
                  (Math.round(
                    (rego.Summary.AverageExtraHourPerVehiclePerDay ?? 0) * 100
                  ) / 100).toLocaleString('en-IN')
                }
                subtitle="Average Extra Hour per vehicle per day "
                icon={icons["Average Extra Hour"]}
                hoverEffect="yellow"
                className="bg-white hover:bg-green-50 focus:ring-green-500"
              />
            </Link>
            {/* Total Extra Bill Card - Rupee Icon */}
            <Link
              href={`https://docs.google.com/spreadsheets/d/${liveId}/edit?gid=${gid}#gid=${gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Average Bill"
                type="rupee"
                value={Math.round(
                  rego.Summary.AverageBillPerVehicalPerDay ?? 0
                ).toLocaleString('en-IN')}
                subtitle="Average bill per vehicle per day "
                icon={icons["Average Bill"]}
                hoverEffect="purple"
                className="bg-white hover:bg-green-50 focus:ring-green-500"
              />
            </Link>
          </div>
          {/* <div className="flex lg:flex-row flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 my-6 lg:w-[40%] w-full h-auto">
              <PieChartCard data={rego.PieData} />
            </div>
            <div className="flex lg:flex-row flex-col gap-6 my-6 lg:w-[60%] w-full h-auto">
              <StackedBarChart data={rego.BarData} type={Type} />
            </div>
          </div> */}
          <div>
            <VehicleUtilizationChart
              UtilizationData={rego.Utilization}
              type={Type}
            />
          </div>
          <div className="w-full h-auto mb-10 ">
            <MonthWiseBill type={Type}  />
          </div>
          <div className="w-full h-auto mb-10 ">
            <RegoFinancial />
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </>
  );
}