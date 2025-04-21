import React from 'react';
import { cn } from '@/utils/classNames';
import Image from 'next/image';

const StatsCardGroup = ({ stats, className }) => {
    return (
        <div className=''>
            <div
                className={cn(
                    'grid gap-4',
                    'grid-cols-1',
                    'sm:grid-cols-2',
                    'lg:grid-cols-2',
                    'xl:grid-cols-4',
                    className
                )}
            >
                {stats?.map((stat, index) => {
                    return (
                        <div key={index} className="relative border-none bg-white hover:shadow-lg rounded-md"                        >
                            <div className="md:p-2.5 p-5">
                                <div className="flex items-center justify-between">
                                    <p className="!text-xs !font-medium text-gray-500 md:text-base">
                                        {stat?.title}
                                    </p>
                                    <div className={` ${stat?.bgColor} flex justify-center items-center rounded-xl sm:w-9 w-8 sm:h-9 h-8`}>
                                        <Image src={stat?.img} height={18} width={18} alt="" />
                                    </div>
                                </div>
                                <span className='sm:text-5xl text-xl font-semibold'>{stat?.value}</span>
                                <div className="mt-3 !text-xs !font-medium">
                                    <span className='text-green-600'>{stat?.trend?.value}% ▲</span>{' '}
                                    <span className='text-gray-500'>+$150 today</span>
                                    {/* {Math.abs(stat?.trend.value)}%{' '}
                                {stat?.trend.isPositive ? '▲' : '▼'} */}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default StatsCardGroup;
