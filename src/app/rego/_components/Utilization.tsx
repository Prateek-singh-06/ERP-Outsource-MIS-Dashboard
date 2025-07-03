import { VehicleUtilization } from '@/lib/types';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { TooltipProps } from 'recharts';

const VehicleUtilizationChart = ({UtilizationData}:{UtilizationData:VehicleUtilization[]}) => {

  // Transform data for the chart
  const chartData = UtilizationData.map((oneutilization) => ({
    vehicle: oneutilization.Vehicle,
    vehicleShort: oneutilization.Vehicle.slice(-4), // Last 4 characters for display
    utilization: oneutilization.Utilization,
    fullVehicleNo: oneutilization.Vehicle
  }));

  // Custom color function based on utilization percentage
  const getBarColor = (utilization: number) => {
    if (utilization >= 150) return '#991b1b'; 
    if (utilization >= 100) return '#f87171'; 
    if (utilization >= 80) return '#16a34a'; 
    return '#FFBF00'; 
  };

  // Custom tooltip
 

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Vehicle: ${data.payload.fullVehicleNo}`}</p>
          <p className="text-blue-600">
            <span className="font-medium">Utilization: </span>
            <span className="font-bold">{`${data.value}%`}</span>
          </p>
          <div className="mt-1 text-xs text-gray-500">
            {(data.value ?? 0) >=150 && "⚠️ Critical - Over utilized"}
            {(data.value ?? 0) >= 100 && (data.value ?? 0) < 150 && "📈 Above optimal"}
            {(data.value ?? 0) >= 80 && (data.value ?? 0) < 100 && "✅ Optimal range"}
            {(data.value ?? 0) < 80 && "⚡ Under utilized"}
          </div>
        </div>
      );
    }
    return null;
  };

  // Extract utilization values for statistics
  const utilizationData = UtilizationData.map(u => u.Utilization);

  // Calculate statistics
  const maxUtilization = Math.max(...utilizationData);
  const minUtilization = Math.min(...utilizationData);
  const avgUtilization = Math.round(utilizationData.reduce((a, b) => a + b, 0) / utilizationData.length);
  const overUtilized = utilizationData.filter(u => u > 120).length;
  const underUtilized = utilizationData.filter(u => u < 80).length;

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Vehicle Utilization Analysis</h2>
        <p className="text-gray-600">Monthly utilization percentage across all vehicles</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">{avgUtilization}%</div>
          <div className="text-sm text-blue-600">Average</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-700">{maxUtilization}%</div>
          <div className="text-sm text-green-600">Maximum</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-700">{minUtilization}%</div>
          <div className="text-sm text-yellow-600">Minimum</div>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-700">{overUtilized}</div>
          <div className="text-sm text-red-600">Over 120%</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-700">{underUtilized}</div>
          <div className="text-sm text-orange-600">Under 80%</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="vehicleShort" 
              tick={{ fontSize: 10, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              angle={-45}
              textAnchor="end"
            //   height={80}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              label={{ value: 'Utilization %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="utilization" 
              radius={[4, 4, 0, 0]}
              stroke="#fff"
              strokeWidth={1}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.utilization)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-600">Under-utilized (&lt;80%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-600">Optimal (80-100%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400 rounded"></div>
          <span className="text-gray-600">High (100-150%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-800 rounded"></div>
          <span className="text-gray-600">Critical (&gt;150%)</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleUtilizationChart;