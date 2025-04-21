import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
  } from 'recharts';
  
  const data = [
    { month: 'Jan', revenue: 650, sales: 600 },
    { month: 'Feb', revenue: 710, sales: 250 },
    { month: 'Mar', revenue: 640, sales: 628 },
    { month: 'Apr', revenue: 780, sales: 630 },
    { month: 'May', revenue: 820, sales: 727 },
    { month: 'Jun', revenue: 1240, sales: 1030 },
    { month: 'Jul', revenue: 950, sales: 822 },
    { month: 'Aug', revenue: 1020, sales: 1024 },
    { month: 'Sep', revenue: 1100, sales: 1026 },
    { month: 'Oct', revenue: 880, sales: 720 },
    { month: 'Nov', revenue: 720, sales: 618 },
    { month: 'Dec', revenue: 790, sales: 721 },
  ];
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white text-sm p-3 rounded shadow">
          <p className="mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            Revenue : {payload[0].value}
          </p>
          <p>
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
            Sales : {payload[1].value}%
          </p>
        </div>
      );
    }
  
    return null;
  };
  
  export default function StatisticChart() {
    return (
      <div className="bg-white rounded-2xl md:p-2.5 p-5 w-full">
        <div className="mb-6">
          <h2 className="!text-lg !font-semibold !mb-0">Statistic</h2>
          <p className="!text-sm text-gray-500 !mb-0">Revenue and Sales</p>
        </div>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" className='text-xs'/>
              <YAxis tickFormatter={(value) => `$${value}`} className='text-xs'/>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }