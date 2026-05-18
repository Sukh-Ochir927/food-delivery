import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

const email = process.env.ADMIN_EMAIL || "admin001@example.com";
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME || "Admin";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("MISSING_DATABASE_URL");
  }

  if (!password) {
    throw new Error("ADMIN_PASSWORD is required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: "ADMIN",
      name,
    },
    create: {
      email,
      password: hashedPassword,
      role: "ADMIN",
      name,
    },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
    },
  });

  console.log(`Admin ready: ${admin.email} (${admin.role})`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
