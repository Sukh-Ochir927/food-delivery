import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createFoods = async (req: Request, res: Response) => {
  const { name, price, FoodCategoryId, description, posterPath } = req.body;
  console.log(req.body);

  try {
    const foods = await prisma.food.create({
      data: {
        name,
        price,
        FoodCategoryId,
        description,
        posterPath,
      },
    });
    return res.status(201).json(foods);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create food", error });
  }
};
