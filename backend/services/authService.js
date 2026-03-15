import prisma from "../models/prismaClient.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";

function generateAccountNumber() {
  const base = Math.floor(1000000000 + Math.random() * 9000000000);
  return String(base);
}

export async function registerUser({ email, password, fullName, accountType }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Email already in use" };
  }

  const passwordHash = await hashPassword(password);
  const accountNumber = generateAccountNumber();

  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        email,
        fullName,
        passwordHash,
        account: {
          create: {
            accountNumber,
            accountType,
            balance: 0
          }
        }
      },
      include: { account: true }
    });

    return created;
  });

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { user, token };
}

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { account: true }
  });

  if (!user) {
    return { error: "Invalid credentials" };
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return { error: "Invalid credentials" };
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { user, token };
}
