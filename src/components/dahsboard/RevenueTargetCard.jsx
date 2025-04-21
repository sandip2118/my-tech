import { PieChart, Pie, Cell } from 'recharts';

const data = [{ value: 75.55 }, { value: 100 - 75.55 }];
const COLORS = ['#3b82f6', '#e5e7eb']; // Blue, Light Gray

export default function RevenueTargetCard() {
  return (
    <div className="bg-white rounded-2xl md:p-2.5 p-5 w-full lg:mb-0 md:mb-4 mb-2.5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="!text-lg !font-semibold !mb-0">Target</h2>
          <p className="!text-sm text-gray-500 !mb-0">Revenue Target</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      </div>

      {/* Chart */}
      <div className="flex flex-col items-center justify-center">
        <PieChart width={180} height={180}>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={300}
            endAngle={0}
            innerRadius={60}
            outerRadius={70}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} cornerRadius={50} />
            ))}
          </Pie>
        </PieChart>
        <div className="-mt-8 text-center">
          <p className="text-xl font-semibold">75.55%</p>
          <span className="text-green-600 text-sm bg-green-100 px-2 py-0.5 rounded-full inline-block">+10%</span>
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          You succeed earn <span className="text-black font-medium">$240</span> today, it's higher than yesterday
        </p>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm">
        <div>
          <p className="text-gray-500 !mb-0 text-sm">Target</p>
          <p className="text-black font-semibold text-[16px]">
            $20k <span className="text-red-500">↓</span>
          </p>
        </div>
        <div>
          <p className="text-gray-500 !mb-0 text-sm">Revenue</p>
          <p className="text-black font-semibold text-[16px]">
            $16k <span className="text-green-500">↑</span>
          </p>
        </div>
        <div>
          <p className="text-gray-500 !mb-0 text-sm">Today</p>
          <p className="text-black font-semibold text-[16px]">
            $1.5k <span className="text-green-500">↑</span>
          </p>
        </div>
      </div>
    </div>
  );
}