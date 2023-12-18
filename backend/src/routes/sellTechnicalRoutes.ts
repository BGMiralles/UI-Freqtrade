import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createSellTechnical, deleteSellTechnical, getAllSellTechnicals, getSellTechnicalById } from "../controllers/sellTechnicalController";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router()

router.post('/createSellTechnical', auth, createSellTechnical)
router.get('/allSellTechnicals', auth, isSuperAdmin, getAllSellTechnicals)
router.get('/getSellTechnicalById', auth, getSellTechnicalById)
router.delete('/deleteSellTechnical', auth, deleteSellTechnical)

export { router }