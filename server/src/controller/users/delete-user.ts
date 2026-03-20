import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deleteUsers = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);

  const user = await prisma.user.delete({
    where: { id },
  });

  res.json(user);
};
