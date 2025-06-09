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
    Open: 39,
    Closed: 113,
    Low: 14,
    Medium: 7,
    High: 12,
    NoSeverity: 6,
    Total: 152,
  },
  {
    plant: "ISP",
    Open: 113,
    Closed: 300,
    Low: 15,
    Medium: 61,
    High: 30,
    NoSeverity: 7,
    Total: 413,
  },
  {
    plant: "New DIP",
    Open: 37,
    Closed: 139,
    Low: 2,
    Medium: 14,
    High: 16,
    NoSeverity: 5,
    Total: 176,
  },
  {
    plant: "RML 1",
    Open: 100,
    Closed: 197,
    Low: 14,
    Medium: 26,
    High: 44,
    NoSeverity: 16,
    Total: 297,
  },
  {
    plant: "Oxygen Plant",
    Open: 29,
    Closed: 83,
    Low: 1,
    Medium: 7,
    High: 19,
    NoSeverity: 2,
    Total: 112,
  },
  {
    plant: "Power Plant",
    Open: 35,
    Closed: 104,
    Low: 3,
    Medium: 12,
    High: 14,
    NoSeverity: 6,
    Total: 148,
  },
  {
    plant: "Seamless",
    Open: 54,
    Closed: 94,
    Low: 4,
    Medium: 16,
    High: 28,
    NoSeverity: 6,
    Total: 148,
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
