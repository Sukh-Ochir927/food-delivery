import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getFoods = async (req: Request, res: Response) => {
  const foods = await prisma.food.findMany();

  res.json(foods);
};
