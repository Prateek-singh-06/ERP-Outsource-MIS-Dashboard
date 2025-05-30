"use client";
import ERPCard from "@/components/ERPCard";
import Footer from "@/components/Footer";
import Loader from "@/components/Loading";
// import Nav from "@/components/nav/nav";
import { useEffect, useState } from "react";
import { DATA_REFRESH_INTERVAL } from "@/lib/constants";
import { ERP } from "@/lib/types";

export default function FinancePage() {
  const [erps, setErps] = useState<ERP[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTab","pipeline");
      return "pipeline";
    }
    return "pipeline";
  });

  const filterData = (status: string) => {
    if (status === "pipeline") {
      return erps.filter((erp) => erp.status === "In Pipeline");
    } else if (status === "onboarded") {
      return erps.filter((erp) => erp.status === "Onboarded");
    } else if (status === "outsourcing") {
      return erps.filter((erp) => erp.status === "Outsourcing Contract");
    }
    return [];
  };
  const handleTabChange = (newTab: string) => {
    setSelectedTab(newTab);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTab", newTab);
    }
  };
  const statusesForERP = [
    { label: "ERP IN PIPELINE", key: "pipeline", color: "bg-slate-500" },
    { label: "ERP ONBOARDED", key: "onboarded", color: "bg-slate-500" },
    {
      label: "OUTSOURCING CONTRACT",
      key: "outsourcing",
      color: "bg-slate-500",
    },
  ];
  const renderHeadingTabs = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {statusesForERP.map((status) => (
            <button
              key={status.key}
              className={`text-lg md:text-2xl font-bold rounded cursor-pointer p-2 hover:bg-blue-300 ${
                selectedTab === status.key
                  ? "bg-blue-400 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleTabChange(status.key)}
            >
              {status.label}
            </button>
          ))}
        </div>
      );
  };
  useEffect(() => {
    async function loadERPData() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${baseUrl}/api/erps`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch ERP Data");
        const data = await res.json();
        setErps(data);
      } catch (error) {
        console.error("Error fetching ERP data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadERPData();
    const interval = setInterval(loadERPData, DATA_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className=" min-h-screen relative bg-[#f8f9fa] text-[#212529]">
      {/* <Nav /> */}
      <div className="mb-15 p-4">
        <h1 className="text-3xl font-bold mb-4">ERPs/Contracts details</h1>
        {renderHeadingTabs()}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
          {filterData(selectedTab).map((erp) => (
            <ERPCard key={erp.id} erp={erp} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
