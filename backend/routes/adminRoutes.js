import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";
import { listFlaggedTransactions, reviewTransaction } from "../controllers/adminController.js";

const router = Router();

router.get("/admin/fraud-transactions", requireAuth, requireAdmin, listFlaggedTransactions);
router.patch("/admin/review/:transactionId", requireAuth, requireAdmin, reviewTransaction);

export default router;
