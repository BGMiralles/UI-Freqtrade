import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createSellTechnical, deleteSellTechnical, getAllSellTechnicals } from "../controllers/sellTechnicalController";

const router = Router()

router.post('/createSellTechnical', auth, createSellTechnical)
router.get('/allSellTechnicals', auth, getAllSellTechnicals)
router.delete('/deleteSellTechnical', auth, deleteSellTechnical)

export { router }