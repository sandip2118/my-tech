'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Official Website', value: 10000 },
  { name: 'Offline Store', value: 10000 },
  { name: 'Amazon Store', value: 10000 },
  { name: 'Reseller', value: 10000 },
];

const COLORS = ['#0284c7', '#38bdf8', '#0ea5e9', '#60a5fa']; // matching blue tones

export default function SalesSourceChart() {
  return (
    <div className="bg-white rounded-2xl md:p-2.5 p-5 w-full lg:mb-0 md:mb-4 mb-2.5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="!text-lg !font-semibold !mb-0">Sales Source</h2>
        </div>
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      </div>

      {/* Donut Chart */}
      <div className="relative flex justify-center items-center">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute text-center">
          <p className="text-2xl font-semibold">$75.5k</p>
          <p className="text-green-600 text-sm bg-green-100 px-2 py-0.5 rounded-full mt-1 inline-block">+10%</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mt-6 space-y-2 text-sm">
        {data.map((entry, idx) => (
          <div key={entry.name} className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[idx] }}
              ></span>
              <span className="text-gray-700 ">{entry.name}</span>
            </div>
            <span className="text-black font-medium">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}