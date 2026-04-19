import Link from "next/link";
export default function LandingPage() {
    return (
        <div className="bg-linear-to-bl from-slate-200 to-slate-900 text-gray-900 pt-20">
            {/* HERO */}
            <section className="min-h-[85vh] flex items-center justify-center px-6 text-center relative overflow-hidden">

                {/* subtle gradient background */}
                <div className="absolute inset-0 bg-linear-to-br from-gray-50 via-white to-gray-100 -z-10" />

                <div className="max-w-3xl">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                        Run Your Laundry Workflow
                        <span className="block text-gray-600">Without the Mess</span>
                    </h1>

                    <p className="text-lg text-gray-600 mb-8">
                        A simple system to create orders, track progress, and manage billing — designed like a modern SaaS tool.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link href="/login">
                            <button className="bg-black text-white px-6 py-3 rounded-xl shadow hover:opacity-90">
                                Create Order
                            </button>
                        </Link>
                        <Link href="/login">
                            <button className="px-6 py-3 rounded-xl border hover:bg-gray-100">
                                View Demo
                            </button>
                        </Link>
                    </div>

                    {/* trust strip */}
                    <div className="flex justify-center gap-8 mt-10 text-sm text-gray-500">
                        <span className="text-gray-400 md:text-gray-600">Orders</span>
                        <span className="text-gray-400 md:text-gray-600">Tracking</span>
                        <span className="text-gray-400 md:text-gray-600">Billing</span>
                        <span className="text-gray-400 md:text-gray-600">Dashboard</span>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
                <h2 className="text-2xl pt-20 font-semibold text-center mb-12">
                    Key Features
                </h2>
            <section className="pb-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                {[
                    {
                        title: "Order Creation",
                        desc: "Add garments, quantity, and pricing with automatic bill calculation."
                    },
                    {
                        title: "Status Tracking",
                        desc: "Move orders from received to delivered with full visibility."
                    },
                    {
                        title: "Insights Dashboard",
                        desc: "Track total orders, revenue, and operational status in one place."
                    }
                ].map((f, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl border border-black/30 bg-linear-to-br from-slate-500 to-gray-300 shadow-md shadow-black/30 hover:shadow-lg transition duration-300"
                    >
                        <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                        <p className="text-gray-600 text-sm">{f.desc}</p>
                    </div>
                ))}
            </section>

            {/* DASHBOARD PREVIEW */}
            <section className="py-20 px-6 ">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-semibold text-center mb-12">
                        Real-Time Overview
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-linear-to-bl from-slate-500 to-gray-200 p-6 rounded-2xl shadow-sm text-center">
                            <p className="text-3xl font-bold">120</p>
                            <p className="text-gray-500 text-sm">Total Orders</p>
                        </div>
                        <div className="bg-linear-to-bl from-slate-500 to-gray-200 p-6 rounded-2xl shadow-sm text-center">
                            <p className="text-3xl font-bold">₹25,000</p>
                            <p className="text-gray-500 text-sm">Revenue</p>
                        </div>
                        <div className="bg-linear-to-bl from-slate-500 to-gray-200 p-6 rounded-2xl shadow-sm text-center">
                            <p className="text-3xl font-bold">32</p>
                            <p className="text-gray-500 text-sm">Ready</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center">
                <h2 className="text-2xl font-semibold text-white/20 mb-4">
                    Start managing orders like a system, not chaos
                </h2>
                <Link href="/login">
                    <button className="bg-black text-white px-8 py-3 rounded-xl shadow">
                        Get Started
                    </button>
                </Link>
            </section>

        </div>
    );
}

