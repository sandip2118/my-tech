import React, { } from 'recharts';

const categories = [
  { name: 'Smartphone', count: 1509, change: '+12%', color: 'text-green-600', bg: 'bg-blue-100', icon: '📱' },
  { name: 'Tablet', count: 1460, change: '-5%', color: 'text-red-500', bg: 'bg-orange-100', icon: '📲' },
  { name: 'Earphone', count: 1229, change: '0%', color: 'text-gray-500', bg: 'bg-teal-100', icon: '🎧' },
  { name: 'Laptop & PC', count: 982, change: '+19%', color: 'text-red-500', bg: 'bg-pink-100', icon: '💻' },
  { name: 'Mouse', count: 791, change: '-25%', color: 'text-blue-600', bg: 'bg-blue-100', icon: '🖱️' },
  { name: 'Hardisk & USB Drive', count: 679, change: '+11%', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: '💾' },
  { name: 'Camera', count: 679, change: '+11%', color: 'text-yellow-600', bg: 'bg-gray-200', icon: '📷' },
];

export default function TopCategory() {
  return (
    <div className="bg-white rounded-2xl md:p-2.5 p-5 w-full mb-0">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="!text-lg !font-semibold !mb-0">Top Category</h2>
          <p className="text-sm text-gray-500 !mb-0">Top Category in This Month</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      </div>

      <div className="space-y-4">
        {categories.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.bg}`}>
                <span className="text-lg">{item.icon}</span>
              </div>
              <span className="text-sm font-semibold text-gray-700">{item.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-700">{item.count.toLocaleString()}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-opacity-20 ${item.color}`}>
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}