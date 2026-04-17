// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { auth } from "@/auth";

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         const session = await auth()

//         const { customerName, phone, items } = body;

//         // 🔴 Basic validation
//         if (!customerName || !phone) {
//             return NextResponse.json(
//                 { error: "Customer details required" },
//                 { status: 400 }
//             );
//         }

//         if (!items || items.length === 0) {
//             return NextResponse.json(
//                 { error: "At least one item required" },
//                 { status: 400 }
//             );
//         }

//         // 🔥 Calculate totals safely
//         const processedItems = items.map((item: any) => {
//             const quantity = Number(item.quantity);
//             const price = Number(item.price);

//             return {
//                 garment: item.garment,
//                 quantity,
//                 price,
//                 subtotal: quantity * price,
//             };
//         });

//         const totalAmount = processedItems.reduce(
//             (sum: number, item: any) => sum + item.subtotal,
//             0
//         );

//         // 🔥 Generate Order Number (simple version)
//         const userId=session?.user.id
//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//             select: {
//                 OrderPrefix: true,
//                 OrderSequence: true,
//                 OrderSequenceYear: true,
//             },
//         });
//         const year = new Date().getFullYear();
//         const prefix = user?.OrderPrefix?.trim().toUpperCase() || "INV";
//         const isNewYear = !user || user.OrderSequenceYear < year;
//         const next = isNewYear ? 1 : (user.OrderSequence ?? 0) + 1;
//         const padded = String(next).padStart(4, "0");

//         const orderNumber = `${prefix}-${year}-${padded}`;
//         // ✅ Create Order + Items (transaction)
//         const order = await prisma.order.create({
//             data: {
//                 userId,
//                 orderNumber,
//                 customerName,
//                 phone,
//                 totalAmount,
//                 items: {
//                     create: processedItems,
//                 },
//             },
//             include: {
//                 items: true,
//             },
//         });

//         return NextResponse.json(order);

//     } catch (error) {
//         console.error("Create Order Error:", error);

//         return NextResponse.json(
//             { error: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

type ItemInput = {
    garment: string;
    quantity: number;
    price: number;
};

type ValidationErrors = Record<string, string>;

function validateOrderInput(
    customerName: string,
    phone: string,
    items: ItemInput[]
): ValidationErrors {
    const errors: ValidationErrors = {};

    // 🔹 Customer validation
    if (!customerName?.trim()) {
        errors.customerName = "Customer name is required";
    }

    if (!phone?.trim()) {
        errors.phone = "Phone number is required";
    }

    // 🔹 Items validation
    if (!items || items.length === 0) {
        errors.items = "At least one item is required";
        return errors;
    }

    items.forEach((item, index) => {
        if (!item.garment?.trim()) {
            errors[`items[${index}].garment`] = "Garment is required";
        }

        if (!item.quantity || item.quantity <= 0) {
            errors[`items[${index}].quantity`] =
                "Quantity must be greater than 0";
        }

        if (item.price == null || item.price <= 0) {
            errors[`items[${index}].price`] =
                "Price must be greater than 0";
        }
    });

    return errors;
}

export async function POST(req: Request) {
    try {
        // 🔐 Get logged-in user
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { customerName, phone, items } = body as {
            customerName: string;
            phone: string;
            items: ItemInput[];
        };

        const errors = validateOrderInput(customerName, phone, items);

        if (Object.keys(errors).length > 0) {
            return NextResponse.json(
                { errors },
                { status: 400 }
            );
        }
        console.log(customerName, phone, items)
        // 🔴 Validation
        if (!customerName || !phone) {
            return NextResponse.json(
                { error: "Customer details required" },
                { status: 400 }
            );
        }

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "At least one item required" },
                { status: 400 }
            );
        }

        // 🔥 Process items safely
        const processedItems = items.map((item) => {
            const quantity = Number(item.quantity);
            const price = Number(item.price);

            if (!item.garment || quantity <= 0 || price < 0) {
                throw new Error("Invalid item data");
            }

            return {
                garment: item.garment,
                quantity,
                price,
                subtotal: quantity * price,
            };
        });

        const totalAmount = processedItems.reduce(
            (sum, item) => sum + item.subtotal,
            0
        );

        // ⚡ Transaction (important)
        const order = await prisma.$transaction(async (tx) => {
            //   const count = await tx.order.count({
            //     where: { userId: session.user.id },
            //   });
            const year = new Date().getFullYear();

            const user = await prisma.user.findUnique({
                where: { id: session.user.id },
                select: {
                    OrderPrefix: true,
                    OrderSequence: true,
                    OrderSequenceYear: true,
                },
            });
            const isNewYear = !user || user.OrderSequenceYear < year;

            const updated = await prisma.user.update({
                where: { id: session.user.id },
                data: {
                    OrderSequence: isNewYear ? 1 : { increment: 1 },
                    OrderSequenceYear: year,
                },
                select: {
                    OrderPrefix: true,
                    OrderSequence: true,
                },
            });
            const prefix = updated.OrderPrefix?.trim().toUpperCase() || "INV";

            // const next = isNewYear ? 1 : (user.OrderSequence ?? 0) + 1;
            const padded = String(updated.OrderSequence).padStart(4, "0");

            const orderNumber = `${prefix}-${year}-${padded}`;

            //   const orderNumber = `ORD-${String(count + 1).padStart(3, "0")}`;

            return tx.order.create({
                data: {
                    userId: session.user.id,
                    orderNumber,
                    customerName,
                    phone,
                    totalAmount,
                    items: {
                        create: processedItems,
                    },
                },
                include: {
                    items: true,
                },
            });
        });

        return NextResponse.json(order, { status: 201 });

    } catch (error) {
        console.error("Create Order Error:", error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}