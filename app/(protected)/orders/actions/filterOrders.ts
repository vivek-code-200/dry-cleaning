import prisma from "@/lib/prisma";
import { Prisma,OrderStatus } from "@prisma/client";

export async function getOrders({
  search,
  status,
  userId,
}: {
  search?: string;
  status?: string;
  userId?: string;
}) {
  const PENDING_STATUSES: OrderStatus[] = [
    "RECEIVED",
    "PROCESSING",
    "READY",
  ];

  let statusFilter: Prisma.OrderWhereInput["status"] | undefined;

  if (status === "PENDING") {
    statusFilter = { in: PENDING_STATUSES };
  } else if (status && status !== "ALL") {
    statusFilter = status as OrderStatus;
  }

  return prisma.order.findMany({
    where: {
      userId,
      ...(statusFilter && { status: statusFilter }),
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