import { NextFunction, Request, Response } from "express";

export const admindMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  console.log(user);

  if (user?.role === "ADMIN") {
    next();
  } else {
    return res.status(400).send({ message: "Require Admin Access" });
  }
};
