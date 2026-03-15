import { Router } from "express";
import { getAccount } from "../controllers/accountController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/account", requireAuth, getAccount);

export default router;
