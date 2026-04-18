// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import Filter from "./components/filter";
import { getOrders } from "./actions/filterOrders";
import { ArrowLeft } from "lucide-react";
import { CANCELLED } from "dns";


type Order = {
    id: string;
    orderNumber: string;
    customerName: string;
    phone: string;
    status: string;
    totalAmount: number;
    createdAt: string;
};

export default async function OrdersPage({ searchParams,
}: {
    searchParams: Promise<{ search?: string; status?: string }>;
}) {
    const params = await searchParams;

    const search = params.search || "all";
    const status = params.status || "all";
    //   const [orders, setOrders] = useState<Order[]>([]);
    //   const [search, setSearch] = useState("");
    //   const [status, setStatus] = useState("");
    const session = await auth()
    // const orders = await prisma.order.findMany({
    //     where: { userId: session?.user.id }
    // })
    const orders = await getOrders({
        search: params.search,
        status: params.status,
        userId: session?.user.id, // replace with auth later
    });


    //   const router = useRouter();

    //   const fetchOrders = async () => {
    //     const query = new URLSearchParams();

    //     if (search) query.append("search", search);
    //     if (status) query.append("status", status);

    //     const res = await fetch(`/api/orders?${query.toString()}`);
    //     const data = await res.json();

    //     setOrders(data);
    //   };

    //   useEffect(() => {
    //     fetchOrders();
    //   }, [search, status]);

    return (
        <div className=" bg-gray-100 flex-1 mt-24 md:mt-0">

            {/* HEADER */}
            {/* <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Link href="/dashboard">
                        <div className="p-1 bg-gray-300 hover:bg-gray-400 transition duration-300 cursor-pointer rounded-lg">
                            <ArrowLeft />
                        </div>
                    </Link>
                    <h1 className="text-2xl font-semibold">Orders</h1>
                </div>

                <Link href="/orders/create">
                    <button
                        className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-black/80 hover:text-white transition duration-300"
                    >
                        + Create Order
                    </button>
                </Link>
            </div> */}

            <header className="bg-black/10 border-b border-black/20 px-3 py-4 flex justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/dashboard">
                        <div className="p-1 bg-gray-200 hover:bg-gray-400 transition duration-300 cursor-pointer rounded-lg">
                            <ArrowLeft className="w-5" />
                        </div>
                    </Link>
                    <h1 className="text-2xl font-semibold">Orders</h1>
                </div>
                <Link href="/orders/create"><button className=" bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg px-3 ">
                    + Create Order
                </button></Link>
            </header>

            {/* FILTERS */}
            <div className="p-6 pb-2">


                <Filter />

            </div>

            {/* TABLE */}
            <div className="md:bg-white rounded-2xl md:shadow-sm overflow-hidden m-6 mt-0">

                <table className="w-full text-sm hidden md:table">

                    <thead className="text-left text-gray-500 border-b">
                        <tr>
                            <th className="p-4">Order</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        )}

                        {orders.map((order) => (
                            // <Link href={order.id} key={order.id} className="border-t cursor-pointer hover:bg-gray-50">
                            <tr
                                key={order.id} className="border-t cursor-pointer hover:bg-gray-50"
                            // onClick={() => router.push(`/orders/${order.id}`)}
                            // className="border-t cursor-pointer hover:bg-gray-50"
                            >
                                <td className="p-4 font-medium">
                                    {order.orderNumber}
                                </td>

                                <td>
                                    <p>{order.customerName}</p>
                                    <p className="text-xs text-gray-500">
                                        {order.phone}
                                    </p>
                                </td>

                                <td>
                                    <StatusBadge status={order.status} />
                                </td>

                                <td>₹{order.totalAmount}</td>

                                <td className="text-gray-500 text-xs">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="text-gray-500 text-xs">
                                    <Link className="border border-black/20 rounded-lg p-2 hover:bg-black/80 hover:text-white" href={`orders/${order.id}`}>View</Link>
                                </td>

                            </tr>
                            // </Link>
                        ))}
                    </tbody>

                </table>

                <div className="space-y-4 md:hidden">

                    {orders.map((order) => (
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
