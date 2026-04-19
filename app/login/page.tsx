"use client"
import { loginWithGithub } from "@/lib/auth";
import { loginWithGoogle } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/dashboard");
        }
    }, [session]);


    return (
        <div className=" h-screen flex items-center justify-center bg-linear-to-br from-slate-200 to-slate-800 px-4">

            <div className="w-full max-w-md bg-white/10 p-8 rounded-2xl shadow-md shadow-black/40 border border-black/30 backdrop-blur-2xl">

                {/* LOGO / BRAND */}
                <div className="text-center mb-6">
                    <div className=" font-black text-xl ">
                        Laundry<span className="text-indigo-500">OS</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                        Sign in to manage your orders
                    </p>
                </div>

                {/* OAUTH BUTTONS */}
                <div className="space-y-3 text-gray-800">

                    <button onClick={()=>{loginWithGoogle()}} className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-200 transition">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="google"
                            className="w-5 h-5"
                        />
                        <span className="text-sm font-medium">
                            Continue with Google
                        </span>
                    </button>

                    <button onClick={() => { loginWithGithub() }} className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition">
                        <img
                            src="https://www.svgrepo.com/show/512317/github-142.svg"
                            alt="github"
                            className="w-5 h-5"
                        />
                        <span className="text-sm font-medium">
                            Continue with GitHub
                        </span>
                    </button>

                </div>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-500" />
                    <span className="text-xs text-gray-800">secure login</span>
                    <div className="flex-1 h-px bg-gray-600" />
                </div>

                {/* FOOTNOTE */}
                <p className="text-xs text-center text-gray-700">
                    By continuing, you agree to our Terms & Privacy Policy
                </p>

            </div>
        </div>
    );
}