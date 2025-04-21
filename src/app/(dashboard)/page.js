'use client'
import Image from "next/image";
import StatsCardGroup from "@/components/dahsboard/StatsCardGroup";
import RevenueTargetCard from "@/components/dahsboard/RevenueTargetCard";
import StatisticChart from "@/components/dahsboard/StatisticChart";
import SalesSourceChart from "@/components/dahsboard/SalesSourceChart";
import TopProducts from "@/components/dahsboard/TopProducts";
import TopCategory from "@/components/dahsboard/TopCategory";
import RecentOrdersTable from "@/components/dahsboard/RecentOrdersTable";
import CustomerGrowth from "@/components/dahsboard/CustomerGrowth";

const dashboardStats = [
  {
    title: 'Total Project',
    value: '6,784',
    bgColor: 'bg-cyan-50',
    trend: { value: 10, isPositive: true },
    price: '+$150',
    img: '/svgs/file-check.svg'
  },
  {
    title: 'In Progress',
    value: '1,920',
    bgColor: 'bg-orange-50',
    trend: { value: 10, isPositive: true },
    price: '+$150',
    img: '/svgs/time-fast.svg'
  },
  {
    title: 'Finished',
    value: '4,412',
    bgColor: 'bg-green-50',
    trend: { value: 10, isPositive: true },
    price: '+$150',
    img: '/svgs/time-check.svg'
  },
  {
    title: 'Unfinished',
    value: '329',
    bgColor: 'bg-red-50',
    trend: { value: 10, isPositive: true },
    price: '+$150',
    img: '/svgs/time-delete.svg'
  },
];

export default function Home() {
  return (
    <div className="sm:px-4 px-2.5 flex flex-col md:gap-4 gap-2.5">
      <div className="flex items-end">
        <div className="w-full">
          <p className="md:text-2xl text-xl !font-semibold text-gray-900 !mb-0">Welcome Back Jenil</p>
          <p className="text-sm text-gray-500 !mb-0">Lorem ipsum dolor si amet welcome back jenil</p>
        </div>
        <div className="flex gap-2 text-sm text-gray-400 border bg-white border-gray-100 h-[40px] px-4 justify-center items-center rounded-sm">
          <Image src={"/svgs/calendar.svg"} height={14} width={14} alt="" />
          <span className="whitespace-nowrap">Select Dates</span>
        </div>
      </div>
      <div className='rounded-xl md:mt-6 mt-2.5'>
        <StatsCardGroup stats={dashboardStats} />
      </div>

      <div className="lg:flex block lg:gap-4 gap-2.5">
        <RevenueTargetCard />
        <StatisticChart />
      </div>

     <div className="lg:flex block md:gap-4 gap-2.5">
        <SalesSourceChart />
        <TopProducts />
        <TopCategory />
      </div>

       <div className="lg:flex block md:gap-4 gap-2.5">
        <RecentOrdersTable />
        <CustomerGrowth />
      </div>

    </div>
  );
}
