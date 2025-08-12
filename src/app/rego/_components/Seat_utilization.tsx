import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  Bus,
  Users,
  Calendar,
  TrendingUp,
  Activity,
  AlertCircle,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMonth, setSelectedMonth] = useState("29th July 2025");

  // Raw data
  const rawData = [
    {
      vehicle: "WB19Q6112",
      pickup: 14,
      drop: 3,
      total: 100,
      type: "BUS",
      duty: 12,
      seats: 55,
      pickupPercent: 5,
      dropPercent: 25,
    },
    {
      vehicle: "WB19Q6125",
      pickup: 4,
      drop: 0,
      total: 100,
      type: "BUS",
      duty: 12,
      seats: 55,
      pickupPercent: 0,
      dropPercent: 7,
    },
    {
      vehicle: "WB19Q6360",
      pickup: 20,
      drop: 5,
      total: 100,
      type: "BUS",
      duty: 12,
      seats: 55,
      pickupPercent: 9,
      dropPercent: 36,
    },
    {
      vehicle: "WB19Q6610",
      pickup: 20,
      drop: 5,
      total: 100,
      type: "BUS",
      duty: 12,
      seats: 55,
      pickupPercent: 9,
      dropPercent: 36,
    },
    {
      vehicle: "WB19Q6649",
      pickup: 32,
      drop: 7,
      total: 100,
      type: "BUS",
      duty: 12,
      seats: 55,
      pickupPercent: 13,
      dropPercent: 58,
    },
    {
      vehicle: "WB25P9979",
      pickup: 7,
      drop: 2,
      total: 100,
      type: "TRAVELLER",
      duty: 12,
      seats: 25,
      pickupPercent: 8,
      dropPercent: 28,
    },
    {
      vehicle: "WB25R9885",
      pickup: 1,
      drop: 0,
      total: 100,
      type: "TRAVELLER",
      duty: 12,
      seats: 25,
      pickupPercent: 0,
      dropPercent: 4,
    },
    {
      vehicle: "WB29C4709",
      pickup: 5,
      drop: 1,
      total: 100,
      type: "TRAVELLER",
      duty: 12,
      seats: 25,
      pickupPercent: 4,
      dropPercent: 20,
    },
    {
      vehicle: "WB33J5120",
      pickup: 15,
      drop: 1,
      total: 100,
      type: "BUS",
      duty: 12,
      seats: 55,
      pickupPercent: 2,
      dropPercent: 27,
    },
    {
      vehicle: "WB33J8490",
      pickup: 10,
      drop: 0,
      total: 100,
      type: "WINGER",
      duty: 12,
      seats: 10,
      pickupPercent: 0,
      dropPercent: 100,
    },
    {
      vehicle: "WB33J8492",
      pickup: 1,
      drop: 0,
      total: 100,
      type: "WINGER",
      duty: 12,
      seats: 10,
      pickupPercent: 0,
      dropPercent: 10,
    },
  ];

  // Calculate summary statistics
  const totalPickups = rawData.reduce((sum, item) => sum + item.pickup, 0);
  const totalDrops = rawData.reduce((sum, item) => sum + item.drop, 0);
  const totalTrips = rawData.reduce((sum, item) => sum + item.total, 0);
  const totalSeats = rawData.reduce((sum, item) => sum + item.seats, 0);

  // Vehicle type distribution
  const vehicleTypes = rawData.reduce(
    (acc: { [key: string]: number }, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    },
    {}
  );

  const typeData = Object.entries(vehicleTypes).map(([type, count]) => ({
    name: type,
    value: count,
  }));
  console.log(typeData);

  // Performance data for each vehicle
  const performanceData = rawData.map((item) => ({
    vehicle: item.vehicle.slice(-4), // Last 4 chars for cleaner display
    utilization: Math.round((item.total / item.seats) * 100),
    efficiency: Math.round(
      ((item.pickup + item.drop) / (item.seats * 2)) * 100
    ),
    pickupPercent: item.pickupPercent,
    dropPercent: item.dropPercent,
    total: item.total,
    type: item.type,
  }));

  // Capacity utilization by vehicle type
  const capacityByType = Object.entries(
    rawData.reduce(
      (
        acc: {
          [key: string]: { total: number; capacity: number; count: number };
        },
        item
      ) => {
        if (!acc[item.type])
          acc[item.type] = { total: 0, capacity: 0, count: 0 };
        acc[item.type].total += item.total;
        acc[item.type].capacity += item.seats;
        acc[item.type].count += 1;
        return acc;
      },
      {}
    )
  ).map(([type, data]) => ({
    type,
    utilization: Math.round((data.total / data.capacity) * 100),
    avgCapacity: Math.round(data.capacity / data.count),
    totalTrips: data.total,
  }));

  const colors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"];

  type StatCardProps = {
    icon: React.ElementType;
    title: string;
    value: React.ReactNode;
    subtitle?: string;
    color?: string;
  };

  const StatCard: React.FC<StatCardProps> = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "blue",
  }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-3 bg-${color}-100 rounded-full`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  type TabButtonProps = {
    id: string;
    label: string;
    active: boolean;
    onClick: (id: string) => void;
  };

  const TabButton: React.FC<TabButtonProps> = ({
    id,
    label,
    active,
    onClick,
  }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 font-medium text-sm rounded-lg transition-colors ${
        active
          ? "bg-blue-100 text-blue-700 border border-blue-300"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Transportation Fleet Dashboard
          </h1>
          <p className="text-gray-600">
            Fleet performance overview for July 29th
          </p>
        </div>

        {/* Summary Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Users} 
            title="Total Pickups" 
            value={totalPickups} 
            subtitle="Passenger pickups"
            color="blue"
          />
          <StatCard 
            icon={Activity} 
            title="Total Drops" 
            value={totalDrops} 
            subtitle="Passenger drops"
            color="green"
          />
          <StatCard 
            icon={TrendingUp} 
            title="Total Trips" 
            value={totalTrips} 
            subtitle="Combined operations"
            color="purple"
          />
          <StatCard 
            icon={Bus} 
            title="Fleet Utilization" 
            value={`${Math.round((totalTrips / totalSeats) * 100)}%`} 
            subtitle={`${rawData.length} vehicles active`}
            color="orange"
          />
        </div> */}

        {/* Tab Navigation */}
        <div className="mb-6 flex">
          <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm border mr-auto">
            <TabButton
              id="overview"
              label="Overview"
              active={activeTab === "overview"}
              onClick={setActiveTab}
            />
            {/* <TabButton id="performance" label="Performance" active={activeTab === 'performance'} onClick={setActiveTab} /> */}
            <TabButton
              id="capacity"
              label="Capacity Analysis"
              active={activeTab === "capacity"}
              onClick={setActiveTab}
            />
          </div>
          <div className="mb-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border rounded-lg text-gray-700"
          >
            <option>29th July 2025</option>
            <option>30th July 2025</option>
            <option>31st July 2025</option>
            
          </select>
        </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vehicle Type Distribution */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Fleet Composition
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string, props: any) => {
                      // value is count, props.payload is the whole data object
                      const total = typeData.reduce(
                        (sum, d) => sum + d.value,
                        0
                      );
                      const percent = ((value / total) * 100).toFixed(1);
                      return [`${percent}%`, name];
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Pickup vs Drop Comparison */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Pickup vs Drop Operations
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={rawData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="vehicle"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={10}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pickup" fill="#3B82F6" name="Pickups" />
                  {/* <Bar dataKey="drop" fill="#EF4444" name="Drops" /> */}
                  <Bar dataKey="total" fill="#88E788" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="space-y-6">
            {/* Vehicle Performance Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Vehicle Performance Metrics
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vehicle" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [`${value}%`, name]}
                    labelFormatter={(label) => `Vehicle: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="pickupPercent"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    name="Pickup %"
                  />
                  <Area
                    type="monotone"
                    dataKey="dropPercent"
                    stackId="1"
                    stroke="#10B981"
                    fill="#10B981"
                    name="Drop %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Detailed Performance
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Vehicle
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Total Trips
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Pickup %
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Drop %
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {rawData.map((vehicle, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">
                          {vehicle.vehicle}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {vehicle.type}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {vehicle.total}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {vehicle.pickupPercent}%
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {vehicle.dropPercent}%
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              vehicle.dropPercent > 50
                                ? "bg-green-100 text-green-800"
                                : vehicle.dropPercent > 25
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {vehicle.dropPercent > 50
                              ? "High"
                              : vehicle.dropPercent > 25
                              ? "Medium"
                              : "Low"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "capacity" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Capacity by Vehicle Type */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Capacity Utilization by Type
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={capacityByType}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "utilization" ? `${value}%` : value,
                      name,
                    ]}
                  />
                  <Bar
                    dataKey="utilization"
                    fill="#8B5CF6"
                    name="Utilization %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Individual Vehicle Utilization */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Individual Vehicle Utilization
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vehicle" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Utilization"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="utilization"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Capacity Summary */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Capacity Analysis Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {capacityByType.map((type, index) => (
                  <div key={type.type} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {type.type}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Utilization:
                        </span>
                        <span className="text-sm font-medium">
                          {type.utilization}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Avg Capacity:
                        </span>
                        <span className="text-sm font-medium">
                          {type.avgCapacity} seats
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Total Trips:
                        </span>
                        <span className="text-sm font-medium">
                          {type.totalTrips}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
