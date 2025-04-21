import React, { } from 'recharts';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { ZoomIn, ZoomOut } from 'lucide-react';

const countriesData = [
    { name: 'USA', customers: 1240, growth: 80, color: 'bg-green-400' },
    { name: 'Japan', customers: 1240, growth: 60, color: 'bg-orange-400' },
    { name: 'France', customers: 1240, growth: 49, color: 'bg-yellow-400' },
    { name: 'Germany', customers: 1240, growth: 100, color: 'bg-blue-500' },
    { name: 'South Korea', customers: 1240, growth: 50, color: 'bg-red-400' },
];

const geoUrl =
    'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

export default function CustomerGrowth() {
    return (
        <div className="bg-white rounded-2xl md:p-2.5 p-5 w-full lg:mb-0 md:mb-4 mb-2.5">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="!text-lg !font-semibold !mb-0">Customer Growth</h2>
                    <p className="text-sm text-gray-500 !mb-0">Based on Country</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">⋮</button>
            </div>

            <div className="relative">
                <div className="h-40 overflow-hidden rounded-md border border-gray-200">
                    <ComposableMap
                        projectionConfig={{ scale: 100 }}
                        width={400}
                        height={200}
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={
                                            geo.properties.name === 'United States of America'
                                                ? '#3B82F6' // highlight USA
                                                : '#E5E7EB'
                                        }
                                        stroke="#fff"
                                        strokeWidth={0.5}
                                    />
                                ))
                            }
                        </Geographies>
                    </ComposableMap>
                </div>
                <div className="absolute top-2 left-2 flex gap-2">
                    <button className="p-1 rounded bg-white shadow hover:bg-gray-100">
                        <ZoomIn size={16} />
                    </button>
                    <button className="p-1 rounded bg-white shadow hover:bg-gray-100">
                        <ZoomOut size={16} />
                    </button>
                </div>
            </div>

            <div className="space-y-3 mt-4">
                {countriesData.map((country) => (
                    <div key={country.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200" />
                            <div>
                                <p className="text-sm font-semibold text-gray-700 !mb-0">{country.name}</p>
                                <p className="text-xs text-gray-500 !mb-0">{country.customers.toLocaleString()} Customers</p>
                            </div>
                        </div>
                        <div className="flex w-24 items-center gap-2">
                            <div className="w-full h-2 bg-gray-100 rounded-full">
                                <div
                                    className={`h-2 rounded-full ${country.color}`}
                                    style={{ width: `${country.growth}%` }}
                                />
                            </div>
                            <p className="text-xs text-right text-gray-500 !mb-0">
                                {country.growth}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}