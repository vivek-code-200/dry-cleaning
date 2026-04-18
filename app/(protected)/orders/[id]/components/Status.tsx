// "use client";

// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";

// const STATUS_OPTIONS = ["RECEIVED","PROCESSING","READY", "DELIVERED"];

// export default function Status({
//   initialStatus,
//   Id,
// }: {
//   initialStatus: string;
//   Id: string;
// }) {
//   const [status, setStatus] = useState(initialStatus);
//   const [editing, setEditing] = useState(false);
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const updateStatus = (newStatus: string) => {
//     setStatus(newStatus);
//     setEditing(false);

//     startTransition(async () => {
//       await fetch(`/api/order/${Id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       router.push(`/orders/${Id}`); // Navigate to client page to see updated status
//       router.refresh();
//     });
//   };

//   return (
//     <div className="  flex gap-1">

//       {!editing ? (
//         <span
//           onClick={() => setEditing(true)}
//           className={`cursor-pointer text-xs px-3 py-1 rounded-full
//           ${
//             status === "Active"
//               ? "bg-green-500/20 text-green-400"
//               : status === "Lead"
//               ? "bg-yellow-500/20 text-yellow-400"
//               : "bg-gray-500/20 text-gray-400"
//           }`}
//         >
//           {status}
//         </span>
//       ) : (
//         <select
//           autoFocus
//           value={status}
//           onChange={(e) => updateStatus(e.target.value)}
//           onBlur={() => setEditing(false)}
//           className="bg-white/10 border border-white/10 rounded px-2 py-1 text-sm"
//         >
//           {STATUS_OPTIONS.map((s) => (
//             <option className="bg-gray-800" key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>
//       )}

//       {isPending && (
//         <p className="text-xs text-gray-500 mt-1">Saving...</p>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useTransition } from "react";

// type OrderStatus =
//   | "RECEIVED"
//   | "PROCESSING"
//   | "READY"
//   | "DELIVERED";

// const steps: OrderStatus[] = [
//   "RECEIVED",
//   "PROCESSING",
//   "READY",
//   "DELIVERED",
// ];

// export default function StatusManager({
//   orderId,
//   currentStatus,
// }: {
//   orderId: string;
//   currentStatus: OrderStatus;
// }) {
//   const [isPending, startTransition] = useTransition();

//   const currentIndex = steps.indexOf(currentStatus);

//   const handleUpdate = (status: OrderStatus) => {
//     startTransition(async () => {
//       const res = await fetch(`/api/orders/${orderId}/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status }),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         alert(data.error);
//         return;
//       }

//       // simple approach for now
//       location.reload();
//     });
//   };

//   return (
//     <div className="space-y-6">

//       {/* TITLE */}
//       <p className="text-sm text-gray-500">Order Workflow</p>

//       {/* STEPPER */}
//       <div className="relative w-full mt-8">

//   {/* BASE LINE */}
//   <div className="absolute top-4 left-0 w-full h-[3px] bg-gray-200" />

//   {/* ACTIVE LINE */}
//   <div
//     className="absolute top-4 left-0 h-[3px] bg-black transition-all duration-300"
//     style={{
//       width: `${(currentIndex / (steps.length - 1)) * 100}%`,
//     }}
//   />

//   {/* STEPS */}
//   <div className="relative flex justify-between">

//     {steps.map((step, index) => {
//       const isCompleted = index < currentIndex;
//       const isCurrent = index === currentIndex;
//       const isNext = index === currentIndex + 1;

//       return (
//         <div key={step} className="flex flex-col items-center">

//           {/* NODE */}
//           <button
//             disabled={!isNext || isPending}
//             onClick={() => isNext && handleUpdate(step)}
//             className={`
//               w-9 h-9 flex items-center justify-center rounded-full text-xs font-medium z-10
//               ${
//                 isCompleted
//                   ? "bg-black text-white"
//                   : isCurrent
//                   ? "bg-blue-500 text-white ring-4 ring-blue-100"
//                   : isNext
//                   ? "bg-white border border-black"
//                   : "bg-gray-100 text-gray-400"
//               }
//             `}
//           >
//             {isCompleted ? "✓" : index + 1}
//           </button>

//           {/* LABEL */}
//           <span className="mt-2 text-xs text-gray-500">
//             {step}
//           </span>
//         </div>
//       );
//     })}
//   </div>
// </div>

//       {/* STATUS TEXT */}
//       <p className="text-sm text-gray-600">
//         Current Status:{" "}
//         <span className="font-medium">{currentStatus}</span>
//       </p>
//     </div>
//   );
// }

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

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
    const canCancel = currentStatus !== "DELIVERED" && currentStatus !== "CANCELLED";
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

            location.reload(); // simple for now
            alert("Status updated")
            router.refresh()
        });
    };

    return (
        <div className="space-y-6">

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
                                                        ? "bg-white border border-black"
                                                        : "bg-gray-100 text-gray-400"
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