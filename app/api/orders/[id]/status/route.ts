import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const validTransitions: Record<string, string[]> = {
    RECEIVED: ["PROCESSING", "CANCELLED"],
    PROCESSING: ["READY", "CANCELLED"],
    READY: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: [],
};

export async function PATCH(
    req: Request,
    props: any
) {
    try {
        const { status } = await req.json();
        const params = await props.params;

        if (!status) {
            return NextResponse.json(
                { error: "Status is required" },
                { status: 400 }
            );
        }

        const order = await prisma.order.findUnique({
            where: { id: params.id },
        });

        let estimatedDelivery = order?.estimatedDelivery;

        if (status === "PROCESSING") {
            estimatedDelivery = new Date();
            estimatedDelivery.setDate(estimatedDelivery.getDate() + 1);
        }

        if (status === "READY") {
            estimatedDelivery = new Date(); // today
        }

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        const allowed = validTransitions[order.status] || [];

        if (!allowed.includes(status)) {
            return NextResponse.json(
                { error: "Invalid status transition" },
                { status: 400 }
            );
        }

        const updated = await prisma.order.update({
            where: { id: params.id },
            data: { status ,estimatedDelivery},
        });
        return NextResponse.json(updated);

    } catch (error) {
        console.error("Error updating order status:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}