"use client"
import UserDropdown from './userDropdown'
import { usePathname } from "next/navigation";
import MobileSidebar from './MobileSidebar';

export default function Topbar({ name = "User" }: { name?: string }) {

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });
    const pathname = usePathname()
    const getTitle = () => {
        if (pathname === "/dashboard") return "Dashboard";
        if (pathname.startsWith("/orders")) return "Orders";

    };
    return (
        <div>
            <header className="bg-white max-[545px]:fixed max-[545px]:w-full top-0 border-b border-black/20 px-2 md:px-6 py-4 flex justify-between items-center">
                <div className='flex gap-1 items-center md:hidden'>
                    <div className="">
                        <MobileSidebar />
                    </div>

                    <div className=" font-black text-xl ">
                        Laundry<span className="text-indigo-500">OS</span>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <p className=" text-gray-800 ">
                        Hello, {name}
                    </p>
                    <h1 className="font-semibold">{ }</h1>

                    <h1 className="font-semibold">{getTitle()}</h1>

                    <p className="text-xs text-gray-500">{today}</p>
                </div>
                <UserDropdown />
            </header>
        </div>
    )
}

