import Link from "next/link"
import { LogIn } from "lucide-react"

export function Navbar() {
    return (<header className="flex justify-between items-center md:px-24 px-5 py-4 border-b border-black/30 backdrop-blur-md fixed w-full top-0 z-50 ">
        <Link href="/">
            <div className=" font-black text-xl ">
                Laundry<span className="text-indigo-500">OS</span>
            </div>
        </Link>
        <div className="flex gap-4">
            <Link href="/login"><button className="text-sm flex items-center text-gray-700 border border-black/70 px-4 py-2 rounded-lg hover:text-white hover:bg-black transition duration-300 cursor-pointer">
                <LogIn className="w-4 h-4 mr-1" />
                Login
            </button></Link>
            
        </div>
    </header>)
}