import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { listTransactions, getTransaction, transfer } from "../controllers/transactionController.js";

const router = Router();

router.get("/transactions", requireAuth, listTransactions);
router.get("/transactions/:id", requireAuth, getTransaction);
router.post("/transfer", requireAuth, transfer);

export default router;
