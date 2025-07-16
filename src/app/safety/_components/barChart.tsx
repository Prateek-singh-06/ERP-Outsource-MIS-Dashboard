"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import type { LabelProps } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SeverityLevelWise } from "@/lib/types";

export const description = "A bar chart with a label";

const chartConfig = {
  desktop: {
    label: "OPEN ISSUES",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarLabel({
  SeverityLevel,
  totalopen,
  Time,
}: {
  SeverityLevel: SeverityLevelWise;
  totalopen: number;
  Time: number;
}) {
  const chartData = [
    { month: "NO SEVERITY", desktop: SeverityLevel["NO SEVERITY"] },
    { month: "LOW", desktop: SeverityLevel.LOW },
    { month: "MEDIUM", desktop: SeverityLevel.MEDIUM },

    { month: "HIGH", desktop: SeverityLevel.HIGH },
  ];

  const totalDesktop = chartData.reduce((sum, entry) => sum + entry.desktop, 0);



const PercentageLabel = (props: LabelProps) => {
  const { x, y, value } = props;
  const percentage =
    typeof value === "number" && totalDesktop > 0
      ? ((value / totalDesktop) * 100).toFixed(1)
      : "0.0";
  return (
    <text
      x={typeof x === "number" ? x + 40 : 40} // Adjust the x position to center the label in the bar
      y={typeof y === "number" ? y-10  : 0} // Adjust the y position to place the label above the bar
      
      textAnchor="middle"
      fill="currentColor"
      fontSize={17}
    >
      {percentage}%
    </text>
  );
};

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Severity Level wise Open issues</CardTitle>
        <CardDescription>Till {Time}</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
            barCategoryGap={20}
            barSize={80}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              fontSize={15}
              fontWeight={700}
            
              // width={50}
              // height={50}
              // type="category"
              // interval={0}
              // allowDuplicatedCategory={false}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="blue" radius={8}>
              <LabelList
                position="middle"
                offset={7}
                className="fill-foreground"
                fontSize={12}
                content={PercentageLabel}
                // width={50}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-lg">
          Total {totalopen} open issues{" "}
          <TrendingUp className="h-4 w-4 text-red-400" />
        </div>
        {/* <div className="text-muted-foreground leading-none">
          total 445 open issues
        </div> */}
      </CardFooter>
    </Card>
  );
}
