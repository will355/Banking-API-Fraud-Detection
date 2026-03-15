import prisma from "../models/prismaClient.js";

const LARGE_TXN_AMOUNT = 5000;
const VELOCITY_LIMIT = 5;

export async function scoreFraud({ senderId, amount, ip }) {
  let score = 0;
  const reasons = [];

  if (amount > LARGE_TXN_AMOUNT) {
    score += 50;
    reasons.push("Large transaction");
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recentTransfers = await prisma.transaction.count({
    where: {
      senderId,
      timestamp: { gte: oneHourAgo }
    }
  });

  if (recentTransfers > VELOCITY_LIMIT) {
    score += 40;
    reasons.push("High transfer velocity");
  }

  const existingDevice = await prisma.userDevice.findUnique({
    where: { userId_ip: { userId: senderId, ip } }
  });

  if (!existingDevice) {
    score += 20;
    reasons.push("New IP address");
  }

  return { score, reasons, isNewDevice: !existingDevice };
}

export async function recordDeviceIfNew({ userId, ip }) {
  await prisma.userDevice.upsert({
    where: { userId_ip: { userId, ip } },
    update: {},
    create: { userId, ip }
  });
}
