import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createCategories = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const categories = await prisma.foodCategory.create({
      data: {
        name,
      },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
