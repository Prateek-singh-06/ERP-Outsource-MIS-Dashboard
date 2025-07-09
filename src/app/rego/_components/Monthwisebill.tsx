import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import React from 'react';
import RegoUtilization from "@/data/REGO_Utilizationdata.json"
import Loading from '@/components/Loading';
type VehicleType = 'all' | 'BOLERO' | 'BUS' | 'TRAVELLER' | 'WINGER';

interface RegoDataItem {
  MONTH: string;
  all: number;
  BOLERO: number;
  BUS: number;
  TRAVELLER: number;
  WINGER: number;
}

interface ChartData {
  name: string;
  'Utilization%': number;
  amt?: number;
}


// Sample chart data

// Optional: Custom Y-axis formatter for ₹ in Lakhs
const formater = (value: number) => `${(value)}%`;

const MonthWiseBill = ({type}:{type:VehicleType}) => {
  const data: ChartData[] = RegoUtilization.map((onemonth: RegoDataItem) => ({
    name: onemonth.MONTH,
    "Utilization%": onemonth[type], 
  }));

  return (
    <>{data?(
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Monthly {type=="all"?"Overall":type} Utilization Comparative</h2>
        <p className="text-sm text-gray-500">Comparison of different Month Utilization</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 18, fill: 'black',fontWeight: 'bold' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
              padding={{ left: 60, right: 0 }}
            />
            <YAxis
              // tick={{ fontSize: 12, fill: '#6b7280' }}
              tick={{ fontSize: 17, fill: '#374151',fontWeight: 'bold' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
              tickFormatter={formater}
            />
            <Tooltip
              formatter={(value: number) => `${value}%`}
            />
            <Legend />
            {/* <Line
              type="monotone"
              dataKey="RML Approved"
              stroke="#10b981"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            /> */}
            <Line
              type="monotone"
              dataKey="Utilization%"
              stroke="#3b82f6"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>):<Loading/>}
    </>
  );
};

export default MonthWiseBill;
