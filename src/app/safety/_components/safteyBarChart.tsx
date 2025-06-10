// components/charts/SafetyBarChart.tsx
import { Plant } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SafetyBarChart({ data }: { data: Plant[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        //  barCategoryGap={70}
        margin={{ top: 40, right: 0, left: 20, bottom: 5 }}
        barSize={30}
      >
        <text
          x="50%"
          y={24}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg font-semibold"
          style={{ fontSize: 20 }}
        >
          Safety Issues by Plant
        </text>
        <XAxis type="number" />
        <YAxis
          dataKey="plant"
          type="category"
          tickMargin={0}
          tickLine={false}
          axisLine={true}
        />
        <Tooltip />
        <Legend />
        {/* <Bar dataKey="Open" stackId="a" fill="#3498db" /> */}
        {/* <Bar dataKey="Closed" stackId="a" fill="#2ecc71" /> */}
        <Bar dataKey="NoSeverity" stackId="a" fill="#339900" />
        <Bar dataKey="Low" stackId="a" fill="#99cc33" />
        <Bar dataKey="Medium" stackId="a" fill="#ffcc00" />
        <Bar dataKey="High" stackId="a" fill="#ff9966" />
      </BarChart>
    </ResponsiveContainer>
  );
}
