import { Router } from "express";
import { createCheckout , testCheckout} from "../controller/paymentController.js";

const router = Router();

router.post("/mp/payment", createCheckout)
router.get("/mp/testcheckout", testCheckout)

export default router;