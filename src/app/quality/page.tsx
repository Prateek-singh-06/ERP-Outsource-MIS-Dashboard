"use client";
import {Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
//  LineChart, 
import { TrendingUp, Factory, Calendar, BarChart3 } from "lucide-react";
  import type { TooltipProps } from "recharts";

const productionData = [
  { date: "09-07-2025", production: 0, formatted: "Jul 09" },
  { date: "10-07-2025", production: 69.88, formatted: "Jul 10" },
  { date: "11-07-2025", production: 129.48, formatted: "Jul 11" },
  { date: "12-07-2025", production: 102.73, formatted: "Jul 12" },
  { date: "13-07-2025", production: 119.38, formatted: "Jul 13" },
  { date: "14-07-2025", production: 66.95, formatted: "Jul 14" },
];

export default function ProductionDashboard() {
  const totalProduction = productionData.reduce((sum, day) => sum + day.production, 0);
  const averageProduction = (totalProduction / productionData.length).toFixed(2);
  const maxProduction = Math.max(...productionData.map(d => d.production));
  const minNonZeroProduction = Math.min(...productionData.filter(d => d.production > 0).map(d => d.production));



  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-100">
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-blue-600 text-lg font-bold">
            {payload[0].value?.toFixed(2)} MT
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 flex ">
          <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg  mr-4 shadow-lg">
            <Factory className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl mr-auto font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Production Analytics
          </h1>
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium">July 09 – July 14, 2025</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group bg-white/80 backdrop-blur-sm px-4 py-3 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mr-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            <p className="text-gray-500 text-sm font-medium mb-2 mr-auto">Total Production</p>
              <div className="text-blue-500 text-2xl font-bold group-hover:scale-110 transition-transform duration-300">📊</div>
            </div>
            <span className="text-3xl font-bold text-gray-800 mb-1 mr-2">{totalProduction.toFixed(2)}</span>
            <span className="text-blue-600 text-sm font-semibold">MT</span>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm px-4 py-3 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mr-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            <p className="text-gray-500 text-sm font-medium mb-2 mr-auto">Daily Average</p>
              <div className="text-blue-500 text-2xl font-bold group-hover:scale-110 transition-transform duration-300">📈</div>
            </div>
            <span className="text-3xl font-bold text-gray-800 mb-1 mr-2">{averageProduction}</span>
            <span className="text-blue-600 text-sm font-semibold">MT/Day</span>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm px-4 py-3 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mr-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Factory className="w-6 h-6 text-white" />
              </div>
            <p className="text-gray-500 text-sm font-medium mb-2 mr-auto">Peak Production</p>
              <div className="text-blue-500 text-2xl font-bold group-hover:scale-110 transition-transform duration-300">🏆</div>
            </div>
            <span className="text-3xl font-bold text-gray-800 mb-1 mr-2">{maxProduction.toFixed(2)}</span>
            <span className="text-blue-600 text-sm font-semibold">MT</span>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm px-4 py-3 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mr-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white rotate-180" />
              </div>
            <p className="text-gray-500 text-sm font-medium mb-2 mr-auto">Lowest Production</p>
              <div className="text-blue-500 text-2xl font-bold group-hover:scale-110 transition-transform duration-300">📉</div>
            </div>
            <span className="text-3xl font-bold text-gray-800 mb-1 mr-2">{minNonZeroProduction.toFixed(2)}</span>
            <span className="text-blue-600 text-sm font-semibold">MT</span>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Production Trend</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 font-medium">Daily Output</span>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={productionData}>
              <defs>
                <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="formatted" 
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="production"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#colorProduction)"
              />
              <Line
                type="monotone"
                dataKey="production"
                stroke="#1E40AF"
                strokeWidth={3}
                dot={{ fill: '#1E40AF', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#3B82F6' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Data Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">Production Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Production (MT)</th>
                  {/* <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productionData.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50/50 transition-colors duration-200">
                    <td className="px-8 py-6 text-sm font-medium text-gray-900">{item.date}</td>
                    <td className="px-8 py-6 text-sm text-gray-900">
                      {item.production === 0 ? (
                        <span className="text-red-500 font-semibold">0.00</span>
                      ) : (
                        <span className="font-semibold">{item.production.toFixed(2)}</span>
                      )}
                    </td>
                    {/* <td className="px-8 py-6 text-sm">
                      {item.production === 0 ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          No Production
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Active
                        </span>
                      )}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}