import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createBuySignal, deleteBuySignal, getAllBuySignals, getBuySignalById, updateBuySignal } from "../controllers/buySignalsController";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router()

router.post('/createBuySignal', auth, createBuySignal)
router.get('/allBuySignals', auth, isSuperAdmin, getAllBuySignals)
router.delete('/deleteBuySignal', auth, deleteBuySignal)
router.put('/updateBuySignal', auth, updateBuySignal)
router.get('/getBuySignalById', auth, getBuySignalById)

export { router }