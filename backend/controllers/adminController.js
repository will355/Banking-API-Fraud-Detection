import prisma from "../models/prismaClient.js";

export async function listFlaggedTransactions(req, res) {
  const flagged = await prisma.transaction.findMany({
    where: { fraudFlag: true },
    orderBy: { timestamp: "desc" }
  });

  return res.status(200).json({ transactions: flagged });
}

export async function reviewTransaction(req, res) {
  const { action } = req.body;
  if (!action || !["SAFE", "FRAUD"].includes(action)) {
    return res.status(400).json({ message: "Action must be SAFE or FRAUD" });
  }

  const status = action === "SAFE" ? "COMPLETED" : "REJECTED";
  const fraudFlag = action === "FRAUD";

  const updated = await prisma.transaction.update({
    where: { id: req.params.transactionId },
    data: { status, fraudFlag }
  });

  return res.status(200).json({ transaction: updated });
}
