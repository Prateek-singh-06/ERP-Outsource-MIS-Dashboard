"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart with a label"

const chartData = [
  { month: "LOW", desktop: 39 },
  { month: "MEDIUM", desktop: 125 },
  { month: "HIGH", desktop: 154 },
  { month: "NO SEVERITY", desktop: 45 },
]

const chartConfig = {
  desktop: {
    label: "OPEN ISSUES",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarLabel() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Severity Level wise Open issues</CardTitle>
        <CardDescription>Till June 3</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
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
                position="top"
                offset={7}
                className="fill-foreground"
                fontSize={12}
                // width={50}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total 363 open issues <TrendingUp className="h-4 w-4 text-red-400" />
        </div>
        {/* <div className="text-muted-foreground leading-none">
          total 445 open issues
        </div> */}
      </CardFooter>
    </Card>
  )
}
