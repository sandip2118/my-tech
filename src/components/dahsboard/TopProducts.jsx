import React, { } from 'recharts';

const products = [
  { name: 'Logic+ Wireless Mouse', category: 'Mouse', price: 1240 },
  { name: 'PS Wireless Controller', category: 'Smartphone', price: 1189 },
  { name: 'Ximi Mechanical Keyboard', category: 'Smartphone', price: 1100 },
  { name: 'Audia Tech Earphone', category: 'Earphone', price: 908 },
  { name: 'Sams S14 Pro', category: 'Tablet', price: 900 },
  { name: 'Sams A13 5G', category: 'Smartphone', price: 870 },
  { name: 'Jsound P01 TWS', category: 'Earphone', price: 870 },
];

export default function TopProducts() {
  return (
    <div className="bg-white rounded-2xl p-5 w-full lg:mb-0 md:mb-4 mb-2.5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="!text-lg !font-semibold !mb-0">Top Product</h2>
          <p className="!text-sm text-gray-500 !mb-0">Top Product in This Month</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      </div>

      <div className="space-y-4">
        {products.map((product, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-md" />
              <div>
                <p className="text-sm font-semibold text-gray-900 !mb-0">{product.name}</p>
                <p className="text-xs text-gray-500 !mb-0">{product.category}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-900">${product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}