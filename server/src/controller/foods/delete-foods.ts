import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deleteFoods = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.food.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete food", error });
  }
};
