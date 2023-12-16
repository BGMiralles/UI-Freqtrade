import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createTechnicalResource, deleteTechnicalResource, getAllTechnicalResources, updateTechnicalResource } from "../controllers/technicalResourceController";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router()

router.get('/getAllTechnicalResources', auth, getAllTechnicalResources)
router.post('/createTechnicalResource', auth, isSuperAdmin, createTechnicalResource)
router.delete('/deleteTechnicalResource', auth, isSuperAdmin, deleteTechnicalResource)
router.put('/updateTechnicalResource', auth, isSuperAdmin, updateTechnicalResource)

export { router }