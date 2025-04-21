'use client';

import { Table, Tag, Space, Button, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';


const data = [
    {
        key: '1',
        product: 'Handmade Pouch',
        subProductCount: 3,
        customer: 'John Bushmill',
        email: 'johnbb@mail.com',
        total: '$121.00',
        status: 'Processing',
    },
    {
        key: '2',
        product: 'Smartwatch E2',
        subProductCount: 1,
        customer: 'Ilham Budi Agung',
        email: 'ilhambudi@mail.com',
        total: '$590.00',
        status: 'Processing',
    },
    {
        key: '3',
        product: 'Smartwatch E1',
        subProductCount: 0,
        customer: 'Mohammad Karim',
        email: 'm_karim@mail.com',
        total: '$125.00',
        status: 'Shipped',
    },
    {
        key: '4',
        product: 'Headphone G1 Pro',
        subProductCount: 1,
        customer: 'Linda Blair',
        email: 'lindablair@mail.com',
        total: '$348.00',
        status: 'Shipped',
    },
    {
        key: '5',
        product: 'Iphone X',
        subProductCount: 0,
        customer: 'Josh Adam',
        email: 'josh_adam@mail.com',
        total: '$607.00',
        status: 'Delivered',
    },
];

const statusColors = {
    Processing: 'orange',
    Shipped: 'blue',
    Delivered: 'green',
};

const columns = [
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        render: (text, record) => (

            <div className="flex gap-2">
                <div className="w-[44px] h-[44px] bg-[#E0E2E7] rounded-sm" />
                <div className={` `}>
                    <div className="font-medium whitespace-nowrap">{text}</div>
                    {record.subProductCount > 0 && (
                        <div className="text-gray-500 text-xs whitespace-nowrap">+{record.subProductCount} other product{record.subProductCount > 1 ? 's' : ''}</div>
                    )}
                </div>
            </div>
        ),
    },
    {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
        render: (_, record) => (
            <div>
                <div className="font-medium">{record.customer}</div>
                <div className="text-gray-500 text-xs">{record.email}</div>
            </div>
        ),
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (text) => <span className="font-medium text-gray-700">{text}</span>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
            <Tag color={statusColors[status]} className="capitalize font-medium rounded-sm !border-0">{status}</Tag>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle" className='!gap-0'>
                <Tooltip title="View">
                    <Button type="text" shape="circle" icon={<Image
                        src={"/svgs/eye.svg"}
                        height={14}
                        width={14}
                        alt=""
                        className="#858d9d"
                    />} className='w-5' />
                </Tooltip>
                <Tooltip title="Delete">
                    <Button type="text" shape="circle" icon={<Image
                        src={"/svgs/trash.svg"}
                        height={14}
                        width={14}
                        alt=""
                        className="#858d9d"
                    />} />
                </Tooltip>
            </Space>
        ),
    },
];

export default function RecentOrdersTable() {
    return (
        <div className=" bg-white md:p-2.5 p-5 rounded-2xl md:gap-4 lg:mb-0 md:mb-4 mb-2.5 overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold">Recent Orders <Tag color="" className='!bg-green-50 !text-green-600 !border-0'>+2 Orders</Tag></div>
                <Space>
                    <div className="flex gap-2 text-sm text-gray-400 border bg-white border-gray-100 h-[40px] px-4 justify-center items-center rounded-sm">
                        <Image src={"/svgs/calendar.svg"} height={14} width={14} alt="" />
                        <span className="whitespace-nowrap">Select Dates</span>
                    </div>
                    <div className="flex gap-2 text-sm text-gray-400 border bg-white border-gray-100 h-[40px] px-4 justify-center items-center rounded-sm">
                        <Image src={"/svgs/filter.svg"} height={14} width={14} alt="" />
                        <span className="whitespace-nowrap">Filters</span>
                    </div>
                    <button className='bg-cyan-50 !text-cyan-500 !text-sm h-[40px] rounded-sm px-2.5'>See All</button>
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5, showTotal: (total) => `Showing 1–5 from ${total}` }}
                scroll={{ x: 0 }}
            />
        </div>
    );
}