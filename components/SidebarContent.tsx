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
      { name: "Orders", href: "/orders", icon: CheckSquare },
    ],
  },
];

export default function SidebarContent({ onNavigate }: any) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-full bg-white border border-black/20 shadow-lg overflow-hidden backdrop-blur-2xl">

      {/* Logo */}
      <div className="p-4 font-black">
          Laundry<span className="text-indigo-500">OS</span>
      </div>

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
                        : "text-gray-500 hover:bg-white/10"
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
      <div className="px-4 py-3 border-t border-black/30">
        <div className="flex items-center gap-3">
          <img
            src={session?.user?.image || "/avtar.avif"}
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <p className="text-sm text-gray-900">{session?.user?.name}</p>
            <p className="text-xs text-gray-400">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}