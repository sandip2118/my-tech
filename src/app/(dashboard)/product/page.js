"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Table,
  Input,
  Button,
  Popconfirm,
  Dropdown,
  Checkbox,
  Menu,
  Form,
  message,
} from 'antd';
import {
  SearchOutlined,
} from '@ant-design/icons';
import { Loader2, ChevronRight, Plus } from 'lucide-react';
import { usePathname, useRouter } from "next/navigation";
import * as XLSX from 'xlsx';
import { Modal } from 'antd';
import { DateRange, DefinedRange } from 'react-date-range';
import { addDays } from 'date-fns';
// import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';

const initialData = [
  {
    "id": '1',
    "name": "Handmade Pouch",
    "varient": 3,
    "sku": "300182",
    "category": "Bag & Pouch",
    "stock": 10,
    "price": "$120.00",
    "status": "Low Stock",
    "added": "20 Dec 2022"
  },
  {
    "id": '2',
    "name": "Smartwatch K2",
    "varient": 2,
    "sku": "300181",
    "category": "Watch",
    "stock": 404,
    "price": "$250.00",
    "status": "Published",
    "added": "24 Dec 2022"
  },
  {
    "id": '3',
    "name": "Smartwatch E1",
    "varient": 3,
    "sku": "300180",
    "category": "Watch",
    "stock": 0,
    "price": "$199.00",
    "status": "Draft",
    "added": "23 Dec 2022"
  },
  {
    "id": '4',
    "name": "Headphone G1 Pro",
    "varient": 4,
    "sku": "300182",
    "category": "Audio",
    "stock": 420,
    "price": "$348.00",
    "status": "Published",
    "added": "21 Dec 2022"
  },
  {
    "id": '5',
    "name": "Ubron X",
    "varient": 2,
    "sku": "300160",
    "category": "Smartphone",
    "stock": 120,
    "price": "$927.00",
    "status": "Published",
    "added": "21 Dec 2022"
  },
  {
    "id": '6',
    "name": "Puma Shoes",
    "varient": 1,
    "sku": "300165",
    "category": "Shoes",
    "stock": 420,
    "price": "$224.00",
    "status": "Published",
    "added": "10 Dec 2022"
  },
  {
    "id": '7',
    "name": "Logie Wireless Mouse",
    "varient": 3,
    "sku": "284643",
    "category": "Mouse",
    "stock": 0,
    "price": "$170.00",
    "status": "Out of Stock",
    "added": "12 Nov 2022"
  },
  {
    "id": '8',
    "name": "Nike Shoes",
    "varient": 3,
    "sku": "300185",
    "category": "Shoes",
    "stock": 120,
    "price": "$300.00",
    "status": "Published",
    "added": "20 Nov 2022"
  },
  {
    "id": '9',
    "name": "Large Car",
    "varient": 3,
    "sku": "300105",
    "category": "Toys",
    "stock": 600,
    "price": "$212.00",
    "status": "Published",
    "added": "18 Aug 2022"
  },
  {
    "id": '10',
    "name": "PS Wireless Controller",
    "varient": 3,
    "sku": "300186",
    "category": "Beauty",
    "stock": 30,
    "price": "$120.00",
    "status": "Draft",
    "added": "10 Aug 2022"
  }
];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const tabs = ['All Product', 'Published', 'Low Stock', 'Draft'];

export default function Product() {
  const router = useRouter();
  const pathname = usePathname();


  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [editingKey, setEditingKey] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Product');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    varient: 1,
    sku: '',
    category: '',
    stock: 0,
    price: '',
    status: 'Draft',
    added: new Date().toLocaleDateString(),
  });

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  const [isDateFilterVisible, setIsDateFilterVisible] = useState(false); // State to toggle visibility

  const handleToggleDateFilter = () => {
    setIsDateFilterVisible((prev) => !prev); // Toggle visibility
  };

  const handleApply = () => {
    console.log('Applied range:', state[0]);
    setIsDateFilterVisible(false); // Hide after applying
  };

  const handleCancelDate = () => {
    console.log('Cancelled');
    setIsDateFilterVisible(false); // Hide after canceling
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
        message.success('Row updated');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDeleteSelected = () => {
    setData((prev) => prev.filter((item) => !selectedRowKeys.includes(item.id)));
    setSelectedRowKeys([]);
    message.success('Selected rows deleted');
  };

  const toggleColumnVisibility = (id) => {
    setHiddenColumns((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div className="p-2">
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={confirm}
          className="mb-2"
        />
        <Button type="primary" onClick={confirm} icon={<SearchOutlined />} size="small">
          Search
        </Button>
      </div>
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
  });

  const defaultColumns = [
    {
      title: 'Product',
      dataIndex: 'name',
      id: 'name',
      editable: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
      render: (value, record) => {
        return (
          <div className="flex gap-2"
            onClick={() => router.push(`/product/${record.id}`)}
          >
            <div className="w-[44px] h-[44px] bg-[#E0E2E7] rounded-sm" />
            <div className={` `}>
              <p className="!font-medium whitespace-nowrap !mb-0">{value}</p>
              <p className="text-gray-500 !font-medium whitespace-nowrap !mb-0">{record?.varient} varient</p>
            </div>
          </div>
        )
      }
    },
    // {
    //   title: 'SKU',
    //   dataIndex: 'sku',
    //   id: 'sku',
    //   editable: true,
    //   sorter: (a, b) => a.sku.localeCompare(b.sku)
    // },
    {
      title: 'Category',
      dataIndex: 'category',
      id: 'category',
      editable: true,
      filters: [
        { text: 'Watch', value: 'Watch' },
        { text: 'Audio', value: 'Audio' },
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (value, record) => {
        return (
          <div className={` `}>
            <p className="text-gray-500 !font-medium whitespace-nowrap !mb-0">{value}</p>
          </div>
        )
      }
    },
    // {
    //   title: 'Stock',
    //   dataIndex: 'stock',
    //   id: 'stock',
    //   editable: true,
    // },
    {
      title: 'Price',
      dataIndex: 'price',
      id: 'price',
      editable: true,
      sorter: (a, b) =>
        parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')),
      render: (value, record) => {
        return (
          <div className={` `}>
            <p className="text-gray-500 !font-medium whitespace-nowrap !mb-0">{value}</p>
          </div>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      id: 'status',
      editable: true,
      filters: [
        { text: 'Published', value: 'Published' },
        { text: 'Draft', value: 'Draft' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (value, record) => {
        let bgColor;
        let textColor;
        if (value == 'Low Stock') {
          bgColor = 'bg-orange-50 text-orange-500'
        } else if (value == 'Published') {
          bgColor = 'bg-green-50 text-green-600'
        } else if (value == 'Draft') {
          bgColor = 'bg-gray-50 text-gray-500'
        } else {
          bgColor = 'bg-red-50 text-red-500'
        }
        return (
          <div className={` ${bgColor} rounded-lg px-[10px] py-1 w-fit`}>
            <span className="!font-medium whitespace-nowrap">{value}</span>
          </div>
        )
      }
    },
    // {
    //   title: 'Added',
    //   dataIndex: 'added',
    //   id: 'added',
    // },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.id)}
              type="link"
              style={{ marginRight: 8 }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button type="link">Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button
              icon={<Image
                src={"/svgs/pencil.svg"}
                height={14}
                width={14}
                alt=""
                className="#858d9d"
              />}
              type="link"
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{ marginRight: 8 }}
            >
            </Button>
            <Popconfirm
              title="Are you sure to delete this record?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<Image
                src={"/svgs/trash.svg"}
                height={14}
                width={14}
                alt=""
                className="#858d9d"
              />} type="link" danger>
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const visibleColumns = defaultColumns.filter((col) => !hiddenColumns.includes(col.id));

  const mergedColumns = visibleColumns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const menu = (
    <Menu>
      {defaultColumns
        .filter((col) => col.id !== 'action')
        .map((col , i) => (
          <Menu.Item key={i} id={col.id}>
            <Checkbox
              checked={!hiddenColumns.includes(col.id)}
              onChange={() => toggleColumnVisibility(col.id)}
            >
              {col.title}
            </Checkbox>
          </Menu.Item>
        ))}
    </Menu>
  );

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    message.success('Record deleted successfully');
  };

  const handleGlobalSearch = (e) => {
    setGlobalSearch(e.target.value.toLowerCase());
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(globalSearch)
    );

    if (activeTab === 'All Product') {
      return matchesSearch;
    } else if (activeTab === 'Published') {
      return matchesSearch && item.status === 'Published';
    } else if (activeTab === 'Low Stock') {
      return matchesSearch && item.status === 'Low Stock';
    } else if (activeTab === 'Draft') {
      return matchesSearch && item.status === 'Draft';
    }

    return matchesSearch;
  });

  const handleExport = () => {
    const exportData = data.map(({ id, ...rest }) => rest);

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'products.xlsx');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewProduct({
      name: '',
      sku: '',
      category: '',
      stock: 0,
      price: '',
      status: 'Draft',
      added: new Date().toLocaleDateString(),
    });
  };

  const handleAddProduct = () => {
    setData((prevData) => [
      ...prevData,
      { id: (prevData.length + 1).toString(), ...newProduct },
    ]);
    message.success('Product added successfully');
    handleCancel();
  };

  return (
    <div className="w-full rounded-lg px-4 h-full overflow-y-auto">
      <div className="md:flex block items-end justify-between sm:mb-4 mb-2.5">
        <div className="">
          <h1 className="md:!text-2xl !text-xl !font-semibold text-gray-900 !mb-0">Product</h1>
          <div className="flex items-center text-sm !font-medium mt-1">
            <button className="!text-blue-600 cursor-pointer" onClick={() => router.push('/')}>Dashboard</button>
            {/* <a href="/dashboard" className="text-blue-600 hover:underline">{pathname}</a> */}
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <span className="text-gray-500 cursor-pointer">Product List</span>
          </div>
        </div>
        <div className="flex md:gap-4 gap-2.5 justify-end">
          <button
            onClick={handleExport}
            className="flex gap-2 items-center bg-cyan-50 !text-cyan-600 md:!text-sm !text-xs !font-medium md:px-4 px-2.5 md:h-[40px] h-[30px] rounded-md">
            <Image src={"/svgs/download.svg"} height={14} width={14} alt="" />
            Export
          </button>
          <button
            onClick={() => router.push('/product/Add')}
            className="inline-flex items-center gap-2 md:px-4 px-2.5 md:h-[40px] h-[30px] md:!text-sm !text-xs !font-medium !text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>



      <div className="xl:flex block justify-between">
        <div className="flex md:w-fit w-full md:gap-6 gap-2.5 border border-gray-100 bg-white rounded-lg p-1 h-[40px] md:text-sm text-xs font-medium xl:mb-0 mb-2.5">
          {tabs.map((tab, i) => (
            <button
              id={tab}
              key={i}
              onClick={() => setActiveTab(tab)}
              className={`transition-colors px-2 rounded-lg md:w-fit w-full
                 ${activeTab === tab
                  ? '!text-blue-600 font-medium bg-cyan-50'
                  : '!text-gray-500 hover:!text-blue-500'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="sm:flex block justify-end items-center mb-2 sm:mb-4 gap-4">
          <div>
            <Input
              placeholder="Search products..."
              prefix={<Image src={"/svgs/search.svg"} height={24} width={24} alt="" />}
              value={globalSearch}
              onChange={handleGlobalSearch}
              // style={{ width: 300 }}
              className="sm:max-w-60 w-full text-gray-400 md:!h-[40px] !h-[30px] mb-2 sm:mb-0 "
            />
          </div>
          <div className="flex md:gap-4 gap-2 justify-end">
            <Dropdown trigger={["click"]} overlay={
              <Menu>
                <div className="flex bg-white rounded-lg shadow-md p-4 space-x-4 max-w-[500px] max-h-[300px] overflow-x-auto">
                  <div className="border-r border-gray-100 pr-4">
                    <DefinedRange
                      ranges={state}
                      onChange={(item) => setState([item.selection])}
                    />
                  </div>
                  <div className="flex flex-col">
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setState([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={state}
                      months={2}
                      direction="horizontal"
                    />

                    <div className="flex justify-between mt-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={state[0].startDate.toLocaleDateString()}
                          readOnly
                          className="w-full !bg-gray-50 !text-sm border border-gray-100 h-[36px] rounded-sm px-3"
                        />
                        <span className="self-center">–</span>
                        <input
                          type="text"
                          value={state[0].endDate.toLocaleDateString()}
                          readOnly
                          className="w-full !bg-gray-50 !text-sm border border-gray-100 h-[36px] rounded-sm px-3"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCancelDate}
                          className=" items-center !text-gray-400 !text-sm !font-medium px-4 h-[40px] rounded-md border border-gray-400">
                          Cancel
                        </button>
                        <button
                          onClick={handleApply}
                          className="inline-flex items-center gap-2 md:px-4 px-2.5 md:h-[40px] h-[30px] md:!text-sm !text-xs !font-medium !text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Menu>
            }
              visible={isDateFilterVisible}
              onVisibleChange={(visible) => setIsDateFilterVisible(visible)}
              className="border-4">
              <Button icon={<Image src={"/svgs/calendar.svg"} height={14} width={14} alt="" />}
                className="!text-gray-500 !font-semibold md:!h-[40px] !h-[30px] md:!text-sm !text-xs"
              >Date Filter</Button>
            </Dropdown>
            <Popconfirm
              title="Delete selected rows?"
              onConfirm={handleDeleteSelected}
              okText="Yes"
              cancelText="No"
              disabled={selectedRowKeys.length === 0}
              className="h-[40px]"
            >
              <Button
                icon={<Image
                  src={"/svgs/trash.svg"}
                  height={14}
                  width={14}
                  alt=""
                  className="#858d9d"
                />}
                danger
                disabled={selectedRowKeys.length === 0}
                className="md:!h-[40px] !h-[30px] md:!text-sm !text-xs"
              >
                Delete Selected
              </Button>
            </Popconfirm>
            <Dropdown overlay={menu} className="border-4">
              <Button icon={<Image src={"/svgs/layout.svg"} height={14} width={14} alt="" />}
                className="!text-gray-500 !font-semibold md:!h-[40px] !h-[30px] md:!text-sm !text-xs"
              >Edit Columns</Button>
            </Dropdown>
          </div>
        </div>
      </div>
      {
        isLoading ?
          <div className="flex h-48 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
          :
          <Form form={form} component={false}>

            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              rowSelection={{
                selectedRowKeys,
                onChange: setSelectedRowKeys,
              }}
              bordered
              dataSource={filteredData} // Use filtered data
              columns={mergedColumns}
              pagination={{ pageSize: 10 }}
              scroll={{ x: '' }}
            />
          </Form>
      }

      <Modal
        title="Add New Product"
        visible={isModalVisible}
        onOk={handleAddProduct}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Product Name" required>
            <Input
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </Form.Item>
          {/* <Form.Item label="SKU" required>
            <Input
              value={newProduct.sku}
              onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
            />
          </Form.Item> */}
          <Form.Item label="Category" required>
            <Input
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
          </Form.Item>
          {/* <Form.Item label="Stock" required>
            <Input
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value, 10) })}
            />
          </Form.Item> */}
          <Form.Item label="Price" required>
            <Input
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Status" required>
            <select
              value={newProduct.status}
              onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
              className="w-full border rounded px-2 py-1"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Low Stock">Low Stock</option>
            </select>
          </Form.Item>
        </Form>
      </Modal>
    </div >
  );
}
