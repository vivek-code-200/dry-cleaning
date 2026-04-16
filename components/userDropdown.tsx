"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Settings, User, LogOut,ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";

export default function UserDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { data: session } = useSession();


    // 🔥 Close on outside click
    useEffect(() => {
        const handler = (e: any) => {
            if (!ref.current?.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // 🔥 Close on ESC
    useEffect(() => {
        const esc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, []);

    const handleLogout = async () => {
        // TODO: your logout logic
        await signOut();
    };

    return (
        <div className="relative" ref={ref}>

            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-gray-200 hover:bg-white/5 transition  border-white/10"
            >
                {/* <div className="w-8 h-8 rounded-full bg-gray-500" /> */}
                {session?.user?.image ? <img src={session.user.image} className='w-12  rounded-full border border-white/50' alt="User Image" /> : <img src="/avtar.avif" className='w-10 h-10 rounded-full border' alt="User Image" />}
                <ChevronDown size={16} />
                {/* <span className="text-sm text-gray-300 hidden md:block">
                    {session?.user?.name || "User"}
                </span> */}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 fadeInFast mt-2 w-64 bg-[#111827] border border-white/10 rounded-xl shadow-lg overflow-hidden z-50">

                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                        {session?.user?.image ? <img src={session.user.image} className='w-12  rounded-full border border-white/50' alt="User Image" /> : <img src="/avtar.avif" className='w-10 h-10 rounded-full border' alt="User Image" />}
                        <div>

                            <p className="text-sm font-medium text-gray-100">{session?.user?.name || "User"}</p>
                            <p className="text-[11px] text-gray-400">
                                {session?.user?.email || "user@email.com"}
                            </p>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="py-1 text-gray-400">

                        <button
                            onClick={() => router.push("/profile")}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition"
                        >
                            <User size={16} className="inline mr-2" />
                            Profile
                        </button>

                        <button
                            onClick={() => router.push("/settings")}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition"
                        >
                            <Settings size={16} className="inline mr-2" />
                            Settings
                        </button>

                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10" />

                    {/* Logout */}
                    <div className="py-1">
                        <button
                            onClick={()=>signOut()}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
                        >
                            <LogOut size={16} className="inline mr-2" />
                            Sign out
                        </button>
                    </div>

                </div>
            )
            }
        </div >
    );
}