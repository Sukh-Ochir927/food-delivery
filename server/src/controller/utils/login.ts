import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "EMAIL_PASSWORD_REQUIRED" });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      res.status(500).json({ success: false, message: "MISSING_JWT_SECRET" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "USER_NOT_FOUND" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ success: false, message: "INVALID_PASSWORD" });
      return;
    }

    const token = jwt.sign(
      {
        data: {
          userId: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      jwtSecret,
    );

    res.status(200).json({ success: true, message: "LOGIN_SUCCESS", token });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INVALID_PASSWORD" });
    return;
  }
};
