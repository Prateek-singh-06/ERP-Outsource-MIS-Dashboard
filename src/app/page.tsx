"use client";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Loader from "@/components/Loading";
import DashboardSection from "@/components/DashboardSection";

import { calculatePercentages } from "@/lib/calculatePercentages";
import { ModuleData, SheetPercentage } from "@/lib/types";

import pipelineData from "@/data/pipeline.json";
import onboardedData from "@/data/onboarded.json";
import outsourcingData from "@/data/outsourcing.json";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [pending, setPending] = useState<number>(3);

  // Progress states for each section
  const [pipelineProgress, setPipelineProgress] = useState<SheetPercentage[]>(
    []
  );
  const [onboardedProgress, setOnboardedProgress] = useState<ModuleData[]>([]);
  const [outsourcingProgress, setOutsourcingProgress] = useState<ModuleData[]>(
    []
  );

  useEffect(() => {
    async function loadPipelineProgress() {
      const finalPipelineData = pipelineData.map((sheet) => ({
        ...sheet,
        csvUrl: sheet.csvUrl.replace(
          "YOUR_PIPELINE_CSV_ID",
          process.env.NEXT_PUBLIC_PIPELINE_CSV_ID || ""
        ),
        url: sheet.url.replace(
          "YOUR_PIPELINE_LIVE_ID",
          process.env.NEXT_PUBLIC_PIPELINE_LIVE_ID || ""
        ),
      }));
      try {
        const results = await calculatePercentages(
          finalPipelineData,
          "pipeline"
        );
        setPipelineProgress(results as SheetPercentage[]);
      } catch (error) {
        console.error("Error calculating pipeline percentages", error);
      } finally {
        setPending((p: number) => p - 1);
      }
    }
    loadPipelineProgress();
  }, []);

  // Fetch Onboarded progress (using normal mode)
  useEffect(() => {
    async function loadOnboardedProgress() {
      const finalOnboardedData = onboardedData.map((sheet) => ({
        ...sheet,
        csvUrl: sheet.csvUrl.replace(
          "YOUR_NORMAL_CSV_ID",
          process.env.NEXT_PUBLIC_NORMAL_CSV_ID || ""
        ),
        url: sheet.url.replace(
          "YOUR_NORMAL_LIVE_ID",
          process.env.NEXT_PUBLIC_NORMAL_LIVE_ID || ""
        ),
      }));
      try {
        const results = await calculatePercentages(
          finalOnboardedData,
          "normal"
        );
        setOnboardedProgress(results as ModuleData[]);
      } catch (error) {
        console.error("Error calculating onboarded percentages", error);
      } finally {
        setPending((p: number) => p - 1);
      }
    }
    loadOnboardedProgress();
  }, []);

  // Fetch Outsourcing progress (using normal mode)
  useEffect(() => {
    const finalOutsourcingData = outsourcingData.map((sheet) => ({
      ...sheet,
      csvUrl: sheet.csvUrl.replace(
        "YOUR_NORMAL_CSV_ID",
        process.env.NEXT_PUBLIC_NORMAL_CSV_ID || ""
      ),
      url: sheet.url.replace(
        "YOUR_NORMAL_LIVE_ID",
        process.env.NEXT_PUBLIC_NORMAL_LIVE_ID || ""
      ),
    }));
    async function loadOutsourcingProgress() {
      try {
        const results = await calculatePercentages(
          finalOutsourcingData,
          "normal"
        );
        setOutsourcingProgress(results as ModuleData[]);
      } catch (error) {
        console.error("Error calculating outsourcing percentages", error);
      } finally {
        setPending((p: number) => p - 1);
      }
    }
    loadOutsourcingProgress();
  }, []);
  // Hide loader only when all fetches are done
  useEffect(() => {
    if (pending === 0) setLoading(false);
  }, [pending]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" min-h-screen relative bg-[#f8f9fa] text-[#212529]">
      <div className="mb-15 px-4 py-3">
        <DashboardSection
          pipelineProgress={pipelineProgress}
          onboardedProgress={onboardedProgress}
          outsourcingProgress={outsourcingProgress}
        />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
