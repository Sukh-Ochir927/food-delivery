import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  let databaseConnected = false;
  let userFound = false;
  let passwordMatch = false;

  try {
    const { email, password } = req.body;
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    console.info("[auth] login request received", {
      databaseUrlConfigured: Boolean(process.env.DATABASE_URL),
      jwtSecretConfigured: Boolean(process.env.JWT_SECRET),
      emailReceived: Boolean(normalizedEmail),
      passwordReceived: typeof password === "string" && password.length > 0,
    });

    if (!normalizedEmail || !password) {
      res
        .status(400)
        .json({ success: false, message: "EMAIL_PASSWORD_REQUIRED" });
      return;
    }

    if (!process.env.DATABASE_URL) {
      res.status(500).json({ success: false, message: "MISSING_DATABASE_URL" });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      res.status(500).json({ success: false, message: "MISSING_JWT_SECRET" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    databaseConnected = true;
    userFound = Boolean(user);

    console.info("[auth] database lookup complete", {
      databaseConnected: true,
      userFound,
    });

    if (!user) {
      res.status(404).json({ success: false, message: "USER_NOT_FOUND" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    passwordMatch = isMatch;

    console.info("[auth] password verification complete", {
      userFound,
      passwordMatch,
    });

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
    console.error("[auth] login failed", {
      databaseConnected,
      userFound,
      passwordMatch,
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    });
    res.status(500).json({ success: false, message: "AUTH_ERROR" });
    return;
  }
};
