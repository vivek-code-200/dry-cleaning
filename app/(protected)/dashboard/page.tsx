import { auth } from "@/auth";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function ProductPreview() {

    const session = await auth();

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });

    const recentorder = await prisma.order.findMany({
        where: { userId: session?.user.id },
        orderBy: {
            createdAt: "desc"
        },
        take: 2,
    })

    const orders = await prisma.order.findMany({
        where: { userId: session?.user.id },
    })

    const PENDING_STATUSES = ["RECEIVED", "PROCESSING", "READY"] as const;
    let pending = 0;
    let revenue = 0;

    for (const order of orders) {
        if (order.status === "DELIVERED") {
            revenue += order.totalAmount;
        } else if (PENDING_STATUSES.includes(order.status as typeof PENDING_STATUSES[number])) {
            pending += order.totalAmount;
        }
    }

    const pendingOrders = orders.filter(order =>
        PENDING_STATUSES.includes(order.status as typeof PENDING_STATUSES[number])
    );

    return (
        <div className="flex-1 bg-gray-100 mt-24 md:mt-0">

            <div className="flex-1 flex flex-col">

                {/* TOPBAR */}
                <header className="bg-black/10 border-b border-black/20 px-6 py-4 flex justify-between">
                    <div>

                        {/* <h1 className="font-semibold">Dashboard</h1> */}
                        <p className=" text-gray-800 ">
                            Dashboard
                        </p>

                        <p className=" text-gray-500 text-xs">Here is your business overview</p>
                    </div>
                    <Link href="/orders/create"><button className=" bg-black text-white py-2 rounded-lg px-3 ">
                        + Create Order
                    </button></Link>
                </header>

                {/* CONTENT */}
                <main className="p-6 space-y-6 ">
                    <div className="md:hidden">
                        <p>Hello, {session?.user.name}</p>
                        <p className="text-gray-600 text-xs">{today}</p>
                    </div>
                    {/* STATS */}
                    <h1 className="font-semibold mx-2">Business Summary</h1>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="bg-green-500/50  p-4 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-800">Revenue</p>
                            <p className="text-xl font-semibold">₹{revenue.toLocaleString("en-IN")}</p>
                        </div>
                        <div className="bg-orange-500/50 p-4 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-800">Pending</p>
                            <p className="text-xl font-semibold">₹{pending.toLocaleString("en-IN")}</p>
                        </div>
                    </div>
                    <h1 className="font-semibold mx-2">Orders Summary</h1>
                    <div className="grid md:grid-cols-6 grid-cols-2 gap-4">
                        <Link href="/orders">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-black/10 hover:border-gray-500 transition cursor-pointer">
                                <p className="text-sm text-gray-500">Total Orders</p>
                                <p className="text-xl font-semibold">{orders.length}</p>
                            </div>
                        </Link>

                        <Link href="/orders?status=RECEIVED">
                            <div className="bg-whit bg-gray-200 text-gray-700 p-4 rounded-xl shadow-sm border border-black/10 hover:border-gray-700 transition cursor-pointer">
                                <p className="text-sm text-gray-500">Pending Orders</p>
                                <p className="text-xl font-semibold">{pendingOrders.length}</p>
                            </div>
                        </Link>
                        <Link href="/orders?status=READY">
                            <div className="bg-whit bg-green-100 text-green-700 p-4 rounded-xl shadow-sm border border-black/10 hover:border-green-500 transition cursor-pointer">
                                <p className="text-sm text-gray-500">Ready</p>
                                <p className="text-xl font-semibold">{orders.filter(o => o.status === "READY").length}</p>
                            </div>
                        </Link>

                        <Link href="/orders?status=PROCESSING">
                            <div className="bg-whit bg-blue-100 text-blue-700 p-4 rounded-xl shadow-sm border border-black/10 hover:border-indigo-500 transition cursor-pointer">
                                <p className="text-sm text-gray-500">Processing</p>
                                <p className="text-xl font-semibold">{orders.filter(o => o.status === "PROCESSING").length}</p>
                            </div>
                        </Link>

                        <Link href="/orders?status=DELIVERED">
                            <div className="bg-whit bg-black text-white p-4 rounded-xl shadow-sm border border-black/10 hover:border-white transition cursor-pointer">
                                <p className="text-sm text-gray-500">Delivered</p>
                                <p className="text-xl font-semibold">{orders.filter(o => o.status === "DELIVERED").length}</p>
                            </div>
                        </Link>
                        <Link href="/orders?status=DELIVERED">
                            <div className="bg-whit bg-red-100 text-red-700  p-4 rounded-xl shadow-sm border border-black/10 hover:border-red-500 transition cursor-pointer">
                                <p className="text-sm text-gray-500">Cancelled</p>
                                <p className="text-xl font-semibold">{orders.filter(o => o.status === "CANCELLED").length}</p>
                            </div>
                        </Link>
                    </div>

                    {/* TABLE */}
                    <div className="bg-white rounded-xl shadow-sm">
                        <div className="p-4 border-b flex justify-between">
                            <h2 className="font-medium">Recent Orders</h2>
                            <Link href="/orders" className="text-sm text-indigo-500 hover:underline mx-2">
                                View All
                            </Link>
                        </div>

                        <table className="w-full text-sm hidden md:table">
                            <thead className="text-left text-gray-500">
                                <tr>
                                    <th className="p-4">Order ID</th>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-6 text-gray-500">
                                            No orders yet.
                                        </td>
                                    </tr>
                                )}

                                {recentorder.map((o, i) => (
                                    <tr key={i} className="border-t">
                                        <td className="p-4">{o.orderNumber}</td>
                                        <td>{o.customerName}</td>
                                        <td>
                                            <StatusBadge status={o.status} />
                                        </td>
                                        <td>{o.totalAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="space-y-4 md:hidden mt-2">

                            {recentorder.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white p-4 rounded-2xl shadow-sm border flex flex-col gap-2"
                                >

                                    {/* TOP ROW */}
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-sm">
                                            {order.orderNumber}
                                        </p>

                                        <p className="font-semibold text-sm">
                                            ₹{order.totalAmount}
                                        </p>
                                    </div>

                                    {/* CUSTOMER */}
                                    <div>
                                        <p className="text-sm font-medium">
                                            {order.customerName}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {order.phone}
                                        </p>
                                    </div>

                                    {/* STATUS */}
                                    <div className="flex justify-between items-center mt-1">

                                        <span
                                            className={`
            text-xs px-2 py-1 rounded-full
            ${order.status === "RECEIVED"
                                                    ? "bg-gray-100 text-gray-600"
                                                    : order.status === "PROCESSING"
                                                        ? "bg-blue-100 text-blue-600"
                                                        : order.status === "READY"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : order.status === "DELIVERED"
                                                                ? "bg-green-100 text-green-600"
                                                                : "bg-red-100 text-red-600"
                                                }
          `}
                                        >
                                            {order.status}
                                        </span>

                                        <p className="text-xs text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>

                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        RECEIVED: "bg-gray-200 text-gray-700",
        PROCESSING: "bg-blue-100 text-blue-700",
        READY: "bg-green-100 text-green-700",
        DELIVERED: "bg-black text-white",
        CANCELLED: "bg-red-100 text-red-700",
    };

    return (
        <span
            className={`px-2 py-1 rounded text-xs ${styles[status] || "bg-gray-100"
                }`}
        >
            {status}
        </span>
    );
}
