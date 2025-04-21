"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="w-full h-[calc(100vh-88px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
