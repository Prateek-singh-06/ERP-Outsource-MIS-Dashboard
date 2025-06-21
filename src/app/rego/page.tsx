"use client";
import { DataCard } from "./_components/Card";
// import { ChartBarLabel } from "./_components/barChart";
import Link from "next/link";
import { useEffect, useState } from "react";
import RegoData from "@/data/RegoBilling.json";
import { Rego } from "@/lib/types";
import Loading from "@/components/Loading";
import { DATA_REFRESH_INTERVAL } from "@/lib/constants";
import PieChartCard from "./_components/pieChartCard";
import StackedBarChart from "./_components/StackedBarChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Link from "next/link";
export default function RegoPage() {
  const [rego, setRego] = useState<Rego | null>(null);
  const [month, setMonth] = useState<string>("overall");
  const [Type, setType] = useState<string>("all");

  useEffect(() => {
    async function fetchTheData() {
      try {
        const response = await fetch(
          `/api/rego?param1=${encodeURIComponent(
            RegoData[0].gid
          )}&param2=${encodeURIComponent(Type)}`
        );
        if (!response) {
          throw new Error("failed to fetch the data");
        }
        const data = await response.json();
        setRego(data);
        console.log(data);
      } catch (error) {
        console.log("Error", error);
      }
    }

    fetchTheData();
    // const interval = setInterval(fetchTheData, DATA_REFRESH_INTERVAL); // fetch every 20 seconds

    // return () => clearInterval(interval); // cleanup on unmount
  }, [Type]);
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
  };

  return (
    <>
      {rego ? (
        <div className="mt-0 max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Meetings */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-0">
            <h1 className="text-xl md:text-2xl pt-4 font-bold mb-5 text-black">
              REGO DASHBOARD
            </h1>
            <div>
              <Tabs defaultValue={Type} className="w-auto h-auto">
                <TabsList className="py-6">
                  <TabsTrigger value="all" className="text-lg px-5 py-4 mx-2" onClick={() => setType("all")}>OVERALL</TabsTrigger>
                  <TabsTrigger value="BOLERO" className="text-lg px-5 py-4 mx-2" onClick={() => setType("BOLERO")}>BOLERO</TabsTrigger>
                  <TabsTrigger value="BUS" className="text-lg px-5 py-4 mx-2" onClick={() => setType("BUS")}>BUS</TabsTrigger>
                  <TabsTrigger value="TRAVELLER" className="text-lg px-5 py-4 mx-2" onClick={() => setType("TRAVELLER")}>TRAVELLER</TabsTrigger>
                  <TabsTrigger value="WINGER" className="text-lg px-5 py-4 mx-2" onClick={() => setType("WINGER")}>WINGER</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-0">
            <Link
              href={`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_REGO_LIVE_ID}/edit?gid=${RegoData[0].gid}#gid=${RegoData[0].gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Total KM"
                type="km"
                value={rego.Summary.TotalKM}
                subtitle="Total KM driven"
                icon={icons["Total KM"]}
                hoverEffect="blue"
                className="bg-white hover:bg-blue-50 focus:ring-blue-500"
              />
            </Link>

            {/* Total Extra KM Card - Speed Icon */}
            <Link
              href={`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_REGO_LIVE_ID}/edit?gid=${RegoData[0].gid}#gid=${RegoData[0].gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Total Extra KM"
                value={rego.Summary.TotalExtraKM}
                type="km"
                subtitle="Total Extra KM driven"
                icon={icons["Total Extra KM"]}
                hoverEffect="red"
                className="bg-white hover:bg-red-50 focus:ring-red-500"
              />
            </Link>
            {/* Total Extra Hour Card - Clock Icon */}
            <Link
              href={`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_REGO_LIVE_ID}/edit?gid=${RegoData[0].gid}#gid=${RegoData[0].gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Total Extra Hour"
                type="hour"
                value={Math.round(rego.Summary.TotalExtraHour * 10) / 10}
                subtitle="Total Extra Hour driven"
                icon={icons["Total Extra Hour"]}
                hoverEffect="yellow"
                className="bg-white hover:bg-green-50 focus:ring-green-500"
              />
            </Link>
            {/* Total Extra Bill Card - Rupee Icon */}
            <Link
              href={`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_REGO_LIVE_ID}/edit?gid=${RegoData[0].gid}#gid=${RegoData[0].gid}`}
              className="no-underline h-full"
              target="_blank"
            >
              <DataCard
                title="Total Extra Bill"
                type="rupee"
                value={Math.round(rego.Summary.TotalExtraBill)}
                subtitle="Total extra bill incurred "
                icon={icons["Total Extra Bill"]}
                hoverEffect="purple"
                className="bg-white hover:bg-green-50 focus:ring-green-500"
              />
            </Link>
          </div>
          <div className="flex lg:flex-row flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 my-6 lg:w-[40%] w-full h-auto">
              <PieChartCard data={rego.PieData} />
            </div>
            <div className="flex lg:flex-row flex-col gap-6 my-6 lg:w-[60%] w-full h-auto">
              <StackedBarChart data={rego.BarData} />
            </div>
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
