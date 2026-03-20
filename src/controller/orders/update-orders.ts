import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updateOrder = await prisma.foodOrder.update({
      where: { id: Number(id) },
      data: { status: status },
    });
    res.send(updateOrder);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
