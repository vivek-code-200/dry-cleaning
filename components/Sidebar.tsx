"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CheckSquare,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const navItems = [
    {
        label: "Overview",
        items: [
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        ],
    },
    {
        label: "Workspace",
        items: [
            { name: "Orders", href: "/orders", icon: CheckSquare},
        ],
    }
];

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session, status } = useSession()

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            className={`h-screen hidden md:flex z-30 border-r border-black/10 bg-white flex-col transition-all ${collapsed ? "w-16" : "w-80"
                }`}
        >
            {/* Top */}
            <div className="flex items-center justify-between p-4">
                {!collapsed && (
                    <Link href="/" className='flex self-start items-center justify-center gap-0 text-2xl font-bold text-gray-900 mb-2 ml-'>Laundry<span className='text-indigo-600'>OS</span></Link>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded bg-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-2 space-y-6">
                {navItems.map((section) => (
                    <div key={section.label}>
                        {!collapsed && (
                            <p className="text-xs text-gray-400 px-2 mb-2 uppercase">
                                {section.label}
                            </p>
                        )}

                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname.startsWith(item.href);

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive
                                            ? "bg-indigo-600 text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        <item.icon size={18} />

                                        {!collapsed && <span>{item.name}</span>}
                                    </Link>

                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom */}
            <div className="px-2 py-3 border-t border-black/10">
                <div className="flex items-center  gap-3">
                    {session?.user?.image && <img src={session.user.image} className='w-12  rounded-full border' alt="User Image" />}
                    {!collapsed && (
                        <div>
                            <p className="text-sm text-gray-900 font-medium">{session?.user?.name}</p>
                            <p className="text-xs text-gray-400 font-medium">{session?.user?.email}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}