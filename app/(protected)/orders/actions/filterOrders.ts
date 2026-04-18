import prisma from "@/lib/prisma";
// import { OrderStatus } from "@prisma/client";

export async function getOrders({
  search,
  status,
  userId,
}: {
  search?: string;
  status?: string;
  userId?: string;
}) {
  return prisma.order.findMany({
    where: {
      userId,

      ...(status && { status: status as any }),

      ...(search && {
        OR: [
          {
            customerName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: search,
            },
          },
        ],
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}