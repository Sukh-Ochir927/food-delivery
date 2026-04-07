import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getOrders = async (req: Request, res: Response) => {
  const orders = await prisma.foodOrder.findMany({
    include: {
      userOrder: true,
      FoodOrderItems: {
        include: {
          food: true,
        },
      },
    },
  });
  res.json(orders);
};
