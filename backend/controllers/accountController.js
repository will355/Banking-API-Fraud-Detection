import { getAccountForUser } from "../services/accountService.js";

export async function getAccount(req, res) {
  const account = await getAccountForUser(req.user.id);
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  return res.status(200).json({
    accountNumber: account.accountNumber,
    balance: account.balance,
    accountType: account.accountType,
    createdAt: account.createdAt
  });
}
