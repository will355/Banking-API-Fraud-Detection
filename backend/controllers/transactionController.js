import { transferSchema } from "../utils/validate.js";
import { listTransactionsForUser, getTransactionById, transferFunds } from "../services/transactionService.js";

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || "unknown";
}

export async function listTransactions(req, res) {
  const transactions = await listTransactionsForUser(req.user.id);
  return res.status(200).json({ transactions });
}

export async function getTransaction(req, res) {
  const transaction = await getTransactionById(req.params.id, req.user.id);
  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }
  return res.status(200).json({ transaction });
}

export async function transfer(req, res) {
  const parse = transferSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ message: "Invalid input", errors: parse.error.errors });
  }

  const ip = getClientIp(req);
  const result = await transferFunds({
    senderId: req.user.id,
    receiverAccountNumber: parse.data.receiverAccountNumber,
    amount: parse.data.amount,
    ip
  });

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(201).json({
    transaction: result.transaction,
    status: result.status
  });
}
