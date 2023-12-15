import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createBuyTechnical, deleteBuyTechnical, getAllBuyTechnicals } from "../controllers/buyTechnicalController";

const router = Router()

router.post('/createBuyTechnical', auth, createBuyTechnical)
router.get('/allBuyTechnicals', auth, getAllBuyTechnicals)
router.delete('/deleteBuyTechnical', auth, deleteBuyTechnical)

export { router }