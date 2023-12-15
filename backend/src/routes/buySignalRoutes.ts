import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createBuySignal, deleteBuySignal, getAllBuySignals, getBuySignalById, updateBuySignal } from "../controllers/buySignalsController";

const router = Router()

router.post('/createBuySignal', auth, createBuySignal)
router.get('/allBuySignals', auth, getAllBuySignals)
router.delete('/deleteBuySignal', auth, deleteBuySignal)
router.put('/updateBuySignal', auth, updateBuySignal)
router.get('/getBuySignalById', auth, getBuySignalById)

export { router }