import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JWTPayLoad = {
  data: {
    userId: number;
    email: string;
    role: "USER" | "ADMIN" | "MODERATOR" | "GUEST" | "SUPERADMIN";
  };
};

export const authMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const autherization = req.headers.authorization;

  if (!autherization) return res.status(400).send({ meesage: "invalid" });

  const accessToken = autherization.split(" ")[1];

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
    ) as JWTPayLoad;

    req.user = decoded.data;
    next();
  } catch (error) {
    res.status(400).send({ message: error });
  }
};
