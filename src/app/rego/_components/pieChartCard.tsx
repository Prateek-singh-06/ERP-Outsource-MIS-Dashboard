import { RegoPieData } from '@/lib/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// const data = [
//   { name: 'Extra hour charge', value: 337500 },
//   { name: 'Extra KM charge', value: 821145 },
//   { name: 'Base rent', value: 2648900 },
// ];

const COLORS = ['#7582FF', '#87C9F5', '#67D5D0'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = outerRadius + (outerRadius - innerRadius) * 0.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#22223b"
      fontWeight={600}
      fontSize={16}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{
        textShadow: '0 1px 4px rgba(0,0,0,0.08)',
        letterSpacing: '0.5px',
      }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartCard({ data }: { data: RegoPieData[] }) {
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
        Rego Charges Distribution
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
        className="flex-1 flex items-center justify-center rounded-xl"
        style={{
          background: 'rgba(255,255,255,0.85)',
          minHeight: 320,
          boxShadow: '0 2px 16px 0 rgba(120,120,180,0.06)',
          padding: 16,
        }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              label={renderCustomizedLabel}
              labelLine={false}
              outerRadius="90%"
              innerRadius="45%"
              fill="#8884d8"
              dataKey="value"
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-in-out"
              startAngle={30}
              endAngle={390}
              stroke="#fff"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(120,120,180,0.10))',
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                background: '#fff',
                border: '1px solid #e0e7ff',
                color: '#3a3a5a',
                fontWeight: 500,
                fontSize: 14,
                boxShadow: '0 2px 8px rgba(120,120,180,0.10)',
              }}
              itemStyle={{
                color: '#3a3a5a',
                fontWeight: 500,
                fontSize: 14,
              }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{
                paddingTop: 24,
                fontSize: 14,
                fontWeight: 500,
                color: '#3a3a5a',
                letterSpacing: '0.2px',
              }}
            />
          </PieChart>
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