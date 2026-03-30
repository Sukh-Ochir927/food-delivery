import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateFoods = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, FoodCategoryId, description, posterPath } = req.body;
  try {
    const updateFood = await prisma.food.update({
      where: { id: Number(id) },
      data: { name, price, FoodCategoryId, description, posterPath },
    });
    res.json(updateFood);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
