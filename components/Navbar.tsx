"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import UserDropdown from "./userDropdown"

export function Navbar() {
    const { data: session, status } = useSession()
    return (<header className="flex justify-between items-center px-24 py-4 border-b bg-black/20 backdrop-blur-md fixed w-full top-0 z-50 ">
        <Link href="/"><h1 className="font-semibold text-lg">LaundryOS</h1></Link>
        {!session && (<div className="flex gap-4">
             <Link href="/login"><button className="text-sm text-gray-600 hover:text-black">
                Login
            </button></Link>
            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
                Get Started
            </button>
        </div>)}
        {session && <UserDropdown/>}
    </header>)
}