import React from 'react'
import UserDropdown from './userDropdown'
import { auth } from '@/auth'

export default async function Topbar() {
    const session = await auth();

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });
    return (
        <div>
            <header className="bg-white border-b border-black/20 px-6 py-4 flex justify-between">
                <div>
                    <p className=" text-gray-800 ">
                        Hello, {session?.user?.name}
                    </p>
                <h1 className="font-semibold">Dashboard</h1>

                    {/* <h1 className="font-semibold">Dashboard</h1> */}

                    <p className="text-xs text-gray-500">{today}</p>
                </div>
                <UserDropdown />
            </header>
        </div>
    )
}

