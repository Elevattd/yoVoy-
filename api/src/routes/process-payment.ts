import { Router } from "express"
import { process_payment, updatePayment } from "../controllers/process-payment"
import { authenticateToken } from "../middlewares/authenticateToken"

export const router = Router()

router.post('/', authenticateToken, process_payment)
router.get("/update", updatePayment)