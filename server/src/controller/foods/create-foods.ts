import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createFoods = async (req: Request, res: Response) => {
  const { name, price, FoodCategoryId, description, posterPath } = req.body;

  const foods = await prisma.food.create({
    data: {
      name,
      price,
      FoodCategoryId,
      description,
      posterPath,
    },
  });

  res.json(foods);
};
