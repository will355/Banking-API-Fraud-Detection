import prisma from "../models/prismaClient.js";
import { scoreFraud, recordDeviceIfNew } from "./fraudService.js";

export async function listTransactionsForUser(userId) {
  return prisma.transaction.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }]
    },
    orderBy: { timestamp: "desc" },
    include: {
      senderAccount: true,
      receiverAccount: true
    }
  });
}

export async function getTransactionById(transactionId, userId) {
  return prisma.transaction.findFirst({
    where: {
      id: transactionId,
      OR: [{ senderId: userId }, { receiverId: userId }]
    },
    include: {
      senderAccount: true,
      receiverAccount: true
    }
  });
}

export async function transferFunds({ senderId, receiverAccountNumber, amount, ip }) {
  const senderAccount = await prisma.account.findUnique({ where: { userId: senderId } });
  if (!senderAccount) {
    return { error: "Sender account not found" };
  }

  const receiverAccount = await prisma.account.findUnique({
    where: { accountNumber: receiverAccountNumber },
    include: { user: true }
  });

  if (!receiverAccount) {
    return { error: "Receiver account not found" };
  }

  if (receiverAccount.id === senderAccount.id) {
    return { error: "Cannot transfer to the same account" };
  }

  if (Number(senderAccount.balance) < amount) {
    return { error: "Insufficient balance" };
  }

  const fraud = await scoreFraud({ senderId, amount, ip });
  const threshold = Number(process.env.FRAUD_SCORE_THRESHOLD || 70);
  const flagged = fraud.score >= threshold;
  const status = flagged ? "UNDER_REVIEW" : "COMPLETED";

  const result = await prisma.$transaction(async (tx) => {
    const updatedSender = await tx.account.update({
      where: { id: senderAccount.id },
      data: { balance: { decrement: amount } }
    });

    const updatedReceiver = await tx.account.update({
      where: { id: receiverAccount.id },
      data: { balance: { increment: amount } }
    });

    const txn = await tx.transaction.create({
      data: {
        senderAccountId: senderAccount.id,
        receiverAccountId: receiverAccount.id,
        senderId,
        receiverId: receiverAccount.userId,
        amount,
        status,
        fraudFlag: flagged,
        fraudScore: fraud.score,
        reason: fraud.reasons.join(", ") || null
      }
    });

    return { updatedSender, updatedReceiver, txn };
  });

  if (fraud.isNewDevice) {
    await recordDeviceIfNew({ userId: senderId, ip });
  }

  return { transaction: result.txn, status };
}
