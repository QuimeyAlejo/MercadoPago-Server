import { Router } from "express";
import { createCheckout , confirmPayment } from "../controller/paymentController.js";

const router = Router();

router.post("/mp/payment", createCheckout)
router.post("/mp/confirm",confirmPayment)

export default router;