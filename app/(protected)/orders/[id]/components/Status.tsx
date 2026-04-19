"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";

type OrderStatus =
    | "RECEIVED"
    | "PROCESSING"
    | "READY"
    | "DELIVERED"
    | "CANCELLED";

const steps: OrderStatus[] = [
    "RECEIVED",
    "PROCESSING",
    "READY",
    "DELIVERED",
];



export default function StatusManager({
    orderId,
    currentStatus,
}: {
    orderId: string;
    currentStatus: OrderStatus;
}) {
    const [isPending, startTransition] = useTransition();

    const currentIndex = steps.indexOf(currentStatus);
    const canCancel = currentStatus !== "READY" && currentStatus !== "DELIVERED" && currentStatus !== "CANCELLED";
    const router = useRouter()
    const isCancelled = currentStatus === "CANCELLED";

    const handleUpdate = (status: OrderStatus) => {
        startTransition(async () => {
            const res = await fetch(`/api/orders/${orderId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.error);
                return;
            }
            const data = await res.json();

            toast.success(`Status updated to ${data.status}!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            router.refresh()
        });
    };

    return (
        <div className="space-y-6">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {/* TITLE */}
            <p className="text-sm text-gray-500">Order Workflow</p>

            {/* STEPPER */}
            <div className="relative w-full mt-6">

                {/* BASE LINE */}
                <div className="absolute top-4 left-0 w-full h-0.75 bg-gray-200" />

                {/* ACTIVE LINE (ONLY COMPLETED) */}
                <div
                    className="absolute top-4 left-0 h-0.75 bg-black transition-all duration-300"
                    style={{
                        width:
                            currentIndex === 0
                                ? "0%"
                                : `${((currentIndex) / (steps.length - 1)) * 100}%`,
                    }}
                />

                {/* STEPS */}
                <div className="relative flex justify-between">

                    {steps.map((step, index) => {
                        const isCompleted = index < currentIndex;
                        const isCurrent = index === currentIndex;
                        const isNext = index === currentIndex + 1;

                        return (
                            <div key={step} className="flex flex-col items-center">

                                {/* NODE */}
                                <button
                                    disabled={isCancelled || !isNext || isPending}
                                    onClick={() => isNext && handleUpdate(step)}
                                    className={`
                    w-9 h-9 flex items-center justify-center rounded-full text-xs font-medium z-10 transition-all
                    ${isCancelled
                                            ? "bg-red-500 text-white"
                                            : isCompleted
                                                ? "bg-black text-white"
                                                : isCurrent
                                                    ? "bg-blue-500 text-white ring-4 ring-blue-100"
                                                    : isNext
                                                        ? "bg-white border border-black cursor-pointer hover:bg-gray-100"
                                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }
                  `}
                                >
                                    {isCompleted ? "✓" : index + 1}
                                </button>



                                {/* LABEL */}
                                <span
                                    className={`mt-2 text-xs ${isCurrent
                                        ? "text-black font-medium"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {step}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* STATUS TEXT */}
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    Current Status:{" "}
                    <span className="font-medium">{currentStatus}</span>
                </p>
                {canCancel && (
                    <button
                        onClick={() => handleUpdate("CANCELLED")}
                        disabled={isPending}
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Cancel Order
                    </button>
                )}
            </div>
        </div>
    );
}