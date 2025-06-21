import { RegoBarData } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'WB19A1234',
    "Extra KM Charges": 4000,
    "Extra hour Charges": 2400,
    amt: 2400,
  },
  {
    name: 'WB19A5678',
    "Extra KM Charges": 3000,
    "Extra hour Charges": 1398,
    amt: 2210,
  },
  {
    name: 'WB19A9012',
    "Extra KM Charges": 2000,
    "Extra hour Charges": 9800,
    amt: 2290,
  },
  {
    name: 'WB19A3456',
    "Extra KM Charges": 2780,
    "Extra hour Charges": 3908,
    amt: 2000,
  },
  {
    name: 'WB19A7890',
    "Extra KM Charges": 1890,
    "Extra hour Charges": 4800,
    amt: 2181,
  },
  {
    name: 'WB19A2345',
    "Extra KM Charges": 2390,
    "Extra hour Charges": 3800,
    amt: 2500,
  },
  {
    name: 'WB19A6789',
    "Extra KM Charges": 3490,
    "Extra hour Charges": 4300,
    amt: 2100,
  },
  {
    name: 'WB19A0123',
    "Extra KM Charges": 3490,
    "Extra hour Charges": 4300,
    amt: 2100,
  },
  {
    name: 'WB19A4567',
    "Extra KM Charges": 3490,
    "Extra hour Charges": 4300,
    amt: 2100,
  },
  {
    name: 'WB19A8901',
    "Extra KM Charges": 3490,
    "Extra hour Charges": 4300,
    amt: 2100,
  },
];

export default function StackedBarChart({data}: {data: RegoBarData[]}) {
  // Ensure data is not empty and slice the top 10 entries
  let topTenData: RegoBarData[] = [];
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }
  if (data.length > 10) {
     topTenData = data.slice(0, 10);
  }
  else {
    topTenData = data;
  }

 

  return (
    <div
      className="w-full h-full flex flex-col transition-shadow duration-300 rounded-2xl shadow-xl hover:shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        border: '1px solid #e0e7ff',
        padding: 32,
        boxSizing: 'border-box',
      }}
    >
      {/* Title */}
      <h2
        className="mb-2"
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: '#3a3a5a',
          letterSpacing: '0.5px',
          textShadow: '0 2px 8px rgba(120,120,180,0.08)',
        }}
      >
        Top 10 Vehicle Rego Extra Charges Distribution
      </h2>
      {/* Description */}
      <p
        className="mb-6"
        style={{
          fontSize: 15,
          color: '#6b7280',
          fontWeight: 500,
          letterSpacing: '0.2px',
          marginBottom: 24,
        }}
      >
        This chart shows the distribution of rego charges across different categories, including extra hour charge, extra KM charge, and base rent.
      </p>
      {/* Chart */}
      <div
        className="flex items-center justify-center rounded-xl"
        style={{
          background: 'rgba(255,255,255,0.85)',
          minHeight: 350,
          boxShadow: '0 2px 16px 0 rgba(120,120,180,0.06)',
          padding: 16,
        }}
      >
         <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <BarChart
          width={500}
          height={400}
          data={topTenData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name"
            style={{ fontSize: 10, fontWeight: 'semi-bold' }}
            angle={-25}
            textAnchor="end"
            interval={0} // Ensures all labels are shown
            tick={{ fill: '#333', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#ccc', strokeWidth: 1 }}
            allowDuplicatedCategory={false} // Prevents duplicate categories

          />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{paddingTop:"16px"}} />
          <Bar dataKey="Extra KM Charges" stackId="a" fill="#8884d8" />
          <Bar dataKey="Extra hour Charges" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}

// import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// const data = [
 
//   { name: 'Extra hour charge', value: 337500 },
//   { name: 'Extra KM charge', value: 821145 },
//    { name: 'Base rent', value: 2648900 },
// ];

// const COLORS = ['#7582FF', '#87C9F5','#67D5D0'];
// // '#0088FE',#FFBB28 #FF8042
// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
// }: {
//   cx: number;
//   cy: number;
//   midAngle: number;
//   innerRadius: number;
//   outerRadius: number;
//   percent: number;
//   index: number;
// }) => {
//   const radius = outerRadius + (outerRadius - innerRadius) * 0.1;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// export default function PieChartCard() {
//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 w-full h-full flex flex-col">
//       {/* Title */}
//       <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
//         Rego Charges Distribution
//       </h2>
//       {/* Description */}
//       <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//         This chart shows the distribution of rego charges across different categories, including extra hour charge, extra KM charge, and base rent.
//       </p>
//       {/* Chart */}
//       <div className="min-h-[250px] " style={{height: 400}}>
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               label={renderCustomizedLabel}
//               labelLine={false}
              
//               outerRadius="90%"
//               innerRadius="40%"
//               fill="#8884d8"
//               dataKey="value"
//               isAnimationActive={true}
//               animationDuration={400}
//               animationEasing="ease-in-out"
//               startAngle={30}
//               endAngle={390}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend wrapperStyle={{ paddingTop:15 }} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }