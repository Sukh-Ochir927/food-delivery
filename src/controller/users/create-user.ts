import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createUsers = async (req: Request, res: Response) => {
  const { email, password, age, name } = req.body;

  const users = await prisma.user.create({
    data: {
      email,
      password,
      age,
      name,
    },
  });

  res.json(users);
};
