import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createSellSignal, deleteSellSignal, getAllSellSignals, getSellSignalById, updateSellSignal } from "../controllers/sellSignalsController";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router()

router.post('/createSellSignal', auth, createSellSignal)
router.get('/allSellSignals', auth,isSuperAdmin, getAllSellSignals)
router.delete('/deleteSellSignal', auth, deleteSellSignal)
router.put('/updateSellSignal', auth, updateSellSignal)
router.get('/getSellSignalById', auth, getSellSignalById)

export { router }