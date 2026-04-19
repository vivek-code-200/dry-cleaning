import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import StatusManager from "./components/Status";


export default async function OrderDetails(props: any) {
    const params = await props.params;
    const order = await prisma.order.findUnique({
        where: { id: params.id },
        include: { items: true }
    })
    if (!order) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6 bg-gray-100 flex-1 pt-24 md:pt-5">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-5 items-center">
                    <Link className="p-2 bg-gray-300 rounded-lg" href="/orders">
                        <ArrowLeft />
                    </Link>
                    <div>

                        <h1 className="text-2xl font-semibold">
                            {order.orderNumber}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                <span className="px-3 py-1 rounded-lg bg-gray-200 text-sm">
                    {order.status}
                </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

                {/* LEFT */}
                <div className="md:col-span-2 space-y-6">

                    {/* CUSTOMER */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <div>

                            <h2 className="font-medium mb-3">Customer</h2>
                            <p>{order.customerName}</p>
                            <p className="text-gray-500 text-sm">{order.phone}</p>
                        </div>
                        <div className="mt-8">

                            <h2 className="font-medium mb-2">Estimated Delivery</h2>
                            <p>{order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : 'Not set'}</p>
                        </div>
                    </div>

                    {/* ITEMS */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="font-medium mb-4">Items</h2>

                        <table className="w-full text-sm">
                            <thead className="text-gray-500 text-left">
                                <tr>
                                    <th className="pb-2">Garment</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {order.items.map((item: any) =>
                                    <tr key={item.id} className="border-t">
                                        <td className="py-2">{item.garment}</td>
                                        <td>{item.quantity}</td>
                                        <td>₹{item.price}</td>
                                        <td>₹{item.subtotal}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>

                {/* RIGHT */}
                <div className="space-y-6">



                    {/* STATUS UPDATE */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="font-medium mb-4">Update Status</h2>
                        <StatusManager orderId={order.id} currentStatus={order.status} />
                    </div>

                    {/* SUMMARY */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="font-medium mb-4">Summary</h2>

                        <div className="flex justify-between text-sm mb-2">
                            <span>Total</span>
                            <span className="font-semibold">₹{order.totalAmount}</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}