import prisma from "../models/prismaClient.js";

export async function getAccountForUser(userId) {
  return prisma.account.findUnique({
    where: { userId },
    include: { user: true }
  });
}
