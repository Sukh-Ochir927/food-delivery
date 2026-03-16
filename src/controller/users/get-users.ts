import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  res.json(users);
};
