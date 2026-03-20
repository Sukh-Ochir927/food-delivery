import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

export const createUsers = async (req: Request, res: Response) => {
  const { email, password, age, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 7);

  console.log({ hashedPassword });

  const users = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      age,
      name,
    },
  });

  res.json(users);
};
