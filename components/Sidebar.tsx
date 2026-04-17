// import React from 'react'

// const Sidebar = () => {
//   return (
//     <div>
//       <aside className="w-64 h-screen bg-white border-r p-6 hidden md:block">
//         <h2 className="text-xl font-semibold mb-8">LaundryOS</h2>

//         <nav className="space-y-4 text-sm">
//           <p className="text-gray-500">Dashboard</p>
//           <p className="text-gray-500">Orders</p>
//           <p className="text-gray-500">Customers</p>
//         </nav>

//         <button className="mt-10 w-full bg-black text-white py-2 rounded-lg">
//           + Create Order
//         </button>
//       </aside>
//     </div>
//   )
// }

// export default Sidebar

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Settings,
} from "lucide-react";
import { useSession } from "next-auth/react";

const navItems = [
  {
    label: "Overview",
    items: [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Workspace",
    items: [
      { name: "Customer", href: "/clients", icon: Users },
      { name: "Orders", href: "/tasks", icon: CheckSquare },
    ],
  },
//   {
//     label: "System",
//     items: [
//       { name: "Settings", href: "/settings/account", icon: Settings },
//     ],
//   },
];

export default function SidebarContent({ onNavigate }: any) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-screen bg-white border-r border-black/20 w-76">

      {/* Logo */}
      <div className="m-5 mb-8">
        <Link href="/" className="text-xl font-black ">
          Laundry<span className="text-indigo-500">OS</span>
        </Link>
      </div>
      {/* <h2 className="text-xl  m-5 mb-8 font-black">LaundryOS</h2> */}

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-2 space-y-6">
        {navItems.map((section) => (
          <div key={section.label}>
            <p className="text-xs text-gray-400 px-2 mb-2 uppercase">
              {section.label}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-gray-400 hover:bg-black/10"
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom User */}
      <div className="px-4 py-3 border-t border-black/10">
        <div className="flex items-center gap-3">
          <img
            src={session?.user?.image || "/avtar.avif"}
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <p className="text-sm text-black">{session?.user?.name}</p>
            <p className="text-xs text-gray-400">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
