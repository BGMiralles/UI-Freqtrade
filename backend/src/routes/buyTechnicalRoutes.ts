import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createBuyTechnical, deleteBuyTechnical, getAllBuyTechnicals, getBuyTechnicalById } from "../controllers/buyTechnicalController";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router()

router.post('/createBuyTechnical', auth, createBuyTechnical)
router.get('/allBuyTechnicals', auth,isSuperAdmin, getAllBuyTechnicals)
router.delete('/deleteBuyTechnical', auth, deleteBuyTechnical)
router.get('/getBuyTechnicalById', auth, getBuyTechnicalById)

export { router }