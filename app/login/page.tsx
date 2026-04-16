"use client"
import { loginWithGithub } from "@/lib/auth";
// import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className=" h-screen flex items-center justify-center bg-gray-200 px-4">

      <div className="w-full max-w-md bg-white/50 p-8 rounded-2xl shadow-sm border">

        {/* LOGO / BRAND */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-stone-500">LaundryOS</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to manage your orders
          </p>
        </div>

        {/* OAUTH BUTTONS */}
        <div className="space-y-3 text-gray-500">

          <button className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-200 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">
              Continue with Google
            </span>
          </button>

          <button onClick={()=>{loginWithGithub()}} className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition">
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
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">secure login</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* FOOTNOTE */}
        <p className="text-xs text-center text-gray-400">
          By continuing, you agree to our Terms & Privacy Policy
        </p>

      </div>
    </div>
  );
}