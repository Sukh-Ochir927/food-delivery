import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createCategories = async (req: Request, res: Response) => {
  const { name } = req.body;
  const categories = await prisma.foodCategory.create({
    data: {
      name,
    },
  });

  res.json(categories);
};
