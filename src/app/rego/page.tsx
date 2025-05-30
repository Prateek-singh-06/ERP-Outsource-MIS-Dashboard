"use client";
import { use, useEffect } from "react";
import RegoBilling from "@/data/RegoBilling.json";
import Papa from "papaparse";


export default function RegoPage() {
    useEffect(() => {
        // This effect runs once when the component mounts  
        const fetchData = async () => {
            try {
                console.log(RegoBilling);
                const response = await fetch(RegoBilling[0].csvUrl);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const text= await response.text();
                const parsedData = Papa.parse<Record<string, string>>(text, {
                          header: true,
                          skipEmptyLines: true,
                        });
                console.log(parsedData.data[0]);
                // You can use: const text = await response.text(); if you want the CSV content
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        };
        fetchData();
    }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Rego Page</h1>
      <p className="text-lg">This is the Rego page content.</p>
    </div>
  );
}