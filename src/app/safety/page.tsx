"use client";
import { DataCard } from "./_components/Card";
import { AgingCard } from "./_components/Agingcard";
import { ChartBarLabel } from "./_components/barChart";
import SafetyBarChart from "./_components/safteyBarChart";
// import Link from "next/link";

export default function SafteyPage() {
  const summary = {
    totalObservations: 1526,
    totalOpen: 440,
    closedPercent: 71,
    avgAgeofclosed: 3,
    avgAgeofopen: 16,
  };

  // const plants = [
  //   {
  //     plant: "Bio Mass",
  //     open: 31,
  //     closed: 103,
  //     low: 10,
  //     medium: 6,
  //     high: 9,
  //     noSeverity: 6,
  //     total: 134,
  //   },
  //   {
  //     plant: "ISP",
  //     open: 107,
  //     closed: 281,
  //     low: 15,
  //     medium: 57,
  //     high: 30,
  //     noSeverity: 5,
  //     total: 388,
  //   },
  //   {
  //     plant: "New DIP",
  //     open: 25,
  //     closed: 135,
  //     low: 15,
  //     medium: 30,
  //     high: 10,
  //     noSeverity: 6,
  //     total: 388,
  //   },
  //   {
  //     plant: "RML 1",
  //     open: 140,
  //     closed: 107,
  //     low: 22,
  //     medium: 38,
  //     high: 55,
  //     noSeverity: 32,
  //     total: 247,
  //   },
  //   {
  //     plant: "Oxygen Plant",
  //     open: 24,
  //     closed: 72,
  //     low: 22,
  //     medium: 5,
  //     high: 17,
  //     noSeverity: 1,
  //     total: 247,
  //   },
  //   {
  //     plant: "Power Plant",
  //     open: 26,
  //     closed: 99,
  //     low: 26,
  //     medium: 16,
  //     high: 28,
  //     noSeverity: 8,
  //     total: 125,
  //   },
  //   {
  //     plant: "Seamless",
  //     open: 54,
  //     closed: 83,
  //     low: 33,
  //     medium: 16,
  //     high: 28,
  //     noSeverity: 9,
  //     total: 137,
  //   },
  // ];

  return (
    <div className="mt-0 max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Meetings */}
      <h1 className="text-xl md:text-2xl pt-4 font-bold mb-5 text-black">
        SAFETY OBSERVATION DASHBOARD
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-0">
        {/* Total Observations Card - Eye/View Icon */}
        {/* <Link href="https://docs.google.com/spreadsheets/d/1Geh-U247eGXRAAtrXbA9G1HidrX9Hzlj3i1hnb4jRCc/edit?gid=1258674082#gid=1258674082" className="no-underline h-full"> */}
        <DataCard
          title="Total Observations"
          value={summary.totalObservations}
          subtitle="All time observations"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          }
          hoverEffect="blue"
          className="bg-white hover:bg-blue-50 focus:ring-blue-500"
        />
        {/* </Link> */}

        {/* Open Issues Card - Alert/Warning Icon */}
        {/* <Link href="https://docs.google.com/spreadsheets/d/1Geh-U247eGXRAAtrXbA9G1HidrX9Hzlj3i1hnb4jRCc/edit?gid=1258674082#gid=1258674082" className="no-underline h-full"> */}
        <DataCard
          title="Open Issues"
          value={summary.totalOpen}
          subtitle="Requires attention"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          }
          progress={{
            value:
              Math.floor(
                (summary.totalOpen * 100) / summary.totalObservations
              ) || 0,
            max: 100,
            label: "OPEN %",
            color: "red",
          }}
          trend={{
            value: Math.floor(
              (summary.totalOpen * 100) / summary.totalObservations
            ),
            isPositive: false,
          }}
          hoverEffect="red"
          className="bg-white hover:bg-red-50 focus:ring-red-500"
        />
        {/* </Link> */}

        {/* Closed Issues Card - Check/Success Icon */}
        <DataCard
          title="Closed Issues"
          value={summary.totalObservations - summary.totalOpen}
          subtitle="Resolved issues"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          progress={{
            value: summary.closedPercent,
            max: 100,
            label: "CLOSED %",
            color: "green",
          }}
          trend={{ value: summary.closedPercent, isPositive: true }}
          hoverEffect="green"
          className="bg-white hover:bg-green-50 focus:ring-green-500"
        />

        {/* Aging Card - Clock/Time Icon */}
        <AgingCard
          title="Average Age of Issues"
          subtitle="Days"
          closedAge={{ label: "Closed Issues", value: summary.avgAgeofclosed }}
          openAge={{ label: "Open Issues", value: summary.avgAgeofopen }}
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          className="bg-white hover:bg-purple-50 focus:ring-purple-500 cursor-pointer"
        />
      </div>
      <div className="flex lg:flex-row flex-col gap-6 mt-6">
        <div className="lg:w-[40%] w-full">
          <ChartBarLabel />
        </div>
        <div className="lg:w-[60%] w-full lg:h-auto h-[400px]  rounded-xl border border-gray-200 bg-white shadow-sm lg:mb-0 mb-10">
          <SafetyBarChart />
        </div>
      </div>
    </div>
  );
}
