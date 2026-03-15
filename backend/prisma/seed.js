import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("AdminPass123!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@bank.local" },
    update: {},
    create: {
      email: "admin@bank.local",
      fullName: "System Admin",
      passwordHash,
      role: "ADMIN",
      account: {
        create: {
          accountNumber: "9999999999",
          balance: 0,
          accountType: "ADMIN"
        }
      }
    }
  });

  console.log("Seeded admin:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
