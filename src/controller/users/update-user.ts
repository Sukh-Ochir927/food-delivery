import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateUsers = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);

  const { name, age, email, password } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: { name, age, email, password },
  });

  res.json(user);
};
