"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { AppsIcon, CaretIcon, CartIcon } from "@/assets/icon/svgIcons";

const manu = [
  {
    route: "/",
    title: "Dashboard",
    notif: 0,
    icon: (props) => <AppsIcon {...props} />,
  },
  {
    route: "",
    title: "E-Commerce",
    notif: 2,
    child: [
      { title: "Product", route: "/product" },
      { title: "Categories", route: "/categories" },
      { title: "Orders", route: "/order" },
      { title: "Custome", route: "/custome" },
    ],
    icon: (props) => <CartIcon {...props} />,
  },
  // {
  //   title: "Project",
  //   route: "/project",
  //   icon: (props) => <ShoppingBagIcon {...props} />,
  // },
  // {
  //   title: "Contact",
  //   route: "/contact",
  //   icon: (props) => <ShoppingBagIcon {...props} />,
  // },
  // {
  //   title: "File Manager",
  //   route: "/file-manager",
  //   icon: (props) => <ShoppingBagIcon {...props} />,
  // },
  // {
  //   title: "Chat",
  //   route: "/chat",
  //   icon: (props) => <ShoppingBagIcon {...props} />,
  // },
  // {
  //   title: "Calender",
  //   route: "/calender",
  //   icon: (props) => <ShoppingBagIcon {...props} />,
  // },
];

export default function Sidebar() {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleDrawer}
        className="p-2 focus:outline-none md:hidden fixed top-4 left-4 z-50 bg-white shadow-lg rounded-full"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[246px] bg-white shadow-lg transform ${open ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="relative">
          <button
            onClick={toggleDrawer}
            className="text-gray-500 absolute top-2 right-3"
          >
            ✕
          </button>
        </div>
        <Content />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[246px] bg-white shadow-lg h-screen">
        <Content />
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
        />
      )}
    </>
  );
}

const ChildList = ({ list }) => {
  const router = useRouter()
  const path = usePathname();
  return (
    <ul className="gap-1 w-full">
      {list.map(({ title, route }) => {
        const active = path === route;
        console.log('route', route);

        return (
          <li key={title}
            className={`${!active ? "bg-white border-l-4 border-transparent" : "bg-blue-200 border-l-4 border-blue-600"
              } md:p-2.5 p-6 py-2 mt-1 w-full h-[40px] flex flex-col justify-center`}
          >
            <button key={title} onClick={() => router.push(route)} className={` ${!active ? "!text-gray-600" : " !text-blue-600"} !w-full flex items-start text-sm font-medium`}>
              {title}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const Content = () => {
  const path = usePathname();
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(path);
  }, [path]);

  return (
    <div className="overflow-y-auto h-full w-full">
      <div className="flex md:px-2.5 px-5 py-6 gap-2 items-center">
        <Image
          width={40}
          height={40}
          alt={`Logo Image`}
          src={`/svgs/Logo.svg`}
          className="w-[40px] h-[40px] rounded-full mb-4"
        />
        <p className="text-black text-[20px] font-semibold">Mytech</p>
      </div>
      <div>
        {manu.map(({ title, notif, child, icon, route }) => {
          return (
            <div key={title}>
              <div
                className={`${active === route ? "bg-blue-200" : "bg-white"
                  } md:p-2.5 p-6 justify-between items-center py-2 ${child && open ? "" : "mb-4"
                  } flex `}
                onClick={() => {
                  setOpen(false);
                  setActive(route);
                  !child ? push(route) : setOpen(true);
                }}
              >
                <span className={`${active !== route ? "!text-gray-600" : " !text-blue-600"} text-sm font-medium flex items-center lg:gap-1.5 gap-3`}>
                  {icon &&
                    icon({
                      width: 24,
                      height: 24,
                      color: active === route ? "#2086BF" : "#858D9D",
                    })}
                  {title}
                </span>
                {notif != 0 &&
                  <div className=" flex flex-col bg-cyan-500 text-[10px] justify-center items-center text-white rounded-sm w-[19px] h-[18px] top-2 right-2">
                    {notif}
                  </div>
                }
                {title == 'E-Commerce' &&
                  <div className={`${active == route ? "rotate-0" : "rotate-180"}`}>
                    <CaretIcon color={active === route ? "#2086BF" : "#858D9D"} />
                  </div>
                } 
              </div>
              {!!child && !!open && <ChildList key={title} list={child} active={active} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
