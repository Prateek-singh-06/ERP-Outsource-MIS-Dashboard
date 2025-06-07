// components/charts/SafetyBarChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    plant: "Bio Mass",
    Open: 36,
    Closed: 105,
    Low: 12,
    Medium: 7,
    High: 11,
    NoSeverity: 6,
    Total: 141,
  },
  {
    plant: "ISP",
    Open: 105,
    Closed: 291,
    Low: 14,
    Medium: 56,
    High: 30,
    NoSeverity: 5,
    Total: 396,
  },
  {
    plant: "New DIP",
    Open: 29,
    Closed: 136,
    Low: 1,
    Medium: 9,
    High: 14,
    NoSeverity: 5,
    Total: 165,
  },
  {
    plant: "RML 1",
    Open: 83,
    Closed: 188,
    Low: 6,
    Medium: 21,
    High: 40,
    NoSeverity: 16,
    Total: 271,
  },
  {
    plant: "Oxygen Plant",
    Open: 28,
    Closed: 79,
    Low: 1,
    Medium: 6,
    High: 19,
    NoSeverity: 2,
    Total: 107,
  },
  {
    plant: "Power Plant",
    Open: 28,
    Closed: 102,
    Low: 1,
    Medium: 10,
    High: 12,
    NoSeverity: 5,
    Total: 130,
  },
  {
    plant: "Seamless",
    Open: 54,
    Closed: 88,
    Low: 4,
    Medium: 16,
    High: 28,
    NoSeverity: 6,
    Total: 142,
  },
];

export default function SafetyBarChart() {
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
