"use client";
import { DataCard } from "./_components/Card";
// import { ChartBarLabel } from "./_components/barChart";
import Link from "next/link";
import { useEffect, useState } from "react";
import SafteyData from "@/data/saftey.json";
import { Safety } from "@/lib/types";
import Loading from "@/components/Loading";
import { DATA_REFRESH_INTERVAL } from "@/lib/constants";
import  PieChartCard  from "./_components/pieChartCard";
import StackedBarChart from "./_components/StackedBarChart";
// import Link from "next/link";
export default function SafetyPage() {
  const [safety, setSafety] = useState<Safety | null>(null);
  const rego={
    TotalKM:300,
    TotalExtraKM:100,
    TotalExtraHour: 50,
    TotalExtraBill:20000,
  }

  useEffect(() => {
    async function fetchTheData() {
      try {
        const response = await fetch(
          `/api/Saftey?param1=${encodeURIComponent(SafteyData[0].gid)}`
        );
        if (!response) {
          throw new Error("failed to fetch the data");
        }
        const data = await response.json();
        setSafety(data);
        // console.log(data);
      } catch (error) {
        console.log("Error", error);
      }
    }

    fetchTheData();
    // const interval = setInterval(fetchTheData, DATA_REFRESH_INTERVAL); // fetch every 20 seconds

    // return () => clearInterval(interval); // cleanup on unmount
  }, []);
   const icons = {
    "Total KM": (
      // Road/Speedometer icon
      <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 13v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    "Total Extra KM": (
      // Speed/Arrow icon
      <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 0h-1V7h-1m-4 0h1v4h1m-4 0h1v4h1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
      </svg>
    ),
    "Total Extra Hour": (
      // Clock icon
      <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
      </svg>
    ),
    "Total Extra Bill": (
      // Rupee icon
      <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 5H9.5a3.5 3.5 0 000 7H17M9.5 12H17M9.5 12l-5 7M17 19H9.5" />
      </svg>
    ),
  };

  return (
    <>
      {safety ? (
        <div className="mt-0 max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Meetings */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-0">
            <h1 className="text-xl md:text-2xl pt-4 font-bold mb-5 text-black">
              REGO DASHBOARD
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-0">
            
            <DataCard
              title="Total KM"
              type="km"
              value={rego.TotalKM}
              subtitle="Total KM driven"
              icon={icons["Total KM"]}
              hoverEffect="blue"
              className="bg-white hover:bg-blue-50 focus:ring-blue-500"
            />

            {/* Total Extra KM Card - Speed Icon */}
            <DataCard
              title="Total Extra KM"
              value={rego.TotalExtraKM}
              type="km"
              subtitle="Total Extra KM driven"
              icon={icons["Total Extra KM"]}
              hoverEffect="red"
              className="bg-white hover:bg-red-50 focus:ring-red-500"
            />
            {/* Total Extra Hour Card - Clock Icon */}
            <DataCard
              title="Total Extra Hour"
              type="hour"
              value={
                safety.Summary.totalObservations - safety.Summary.totalOpen
              }
              subtitle="Total Extra Hour driven"
              icon={icons["Total Extra Hour"]}
              hoverEffect="yellow"
              className="bg-white hover:bg-green-50 focus:ring-green-500"
            />
            {/* Total Extra Bill Card - Rupee Icon */}
            <DataCard
              title="Total Extra Bill"
              type="rupee"
              value={rego.TotalExtraBill}
              subtitle="Total extra bill incurred "
              icon={icons["Total Extra Bill"]}
              hoverEffect="purple"
              className="bg-white hover:bg-green-50 focus:ring-green-500"
            />
           
          </div>
          <div className="flex lg:flex-row flex-col gap-6">
          <div className="flex lg:flex-row flex-col gap-6 my-6 lg:w-[40%] w-full h-auto">
            <PieChartCard />
          </div>
          <div className="flex lg:flex-row flex-col gap-6 my-6 lg:w-[60%] w-full h-auto">
            <StackedBarChart />
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
