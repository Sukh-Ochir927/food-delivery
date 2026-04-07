import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        {
          data: {
            userId: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        },
        process.env.JWT_SECRET ?? "secret",
        // { expiresIn: "1h" },
      );
      return res.status(200).send({ message: "Login sucessfully", token });
    } else {
      res.status(401).send("invalid password");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
