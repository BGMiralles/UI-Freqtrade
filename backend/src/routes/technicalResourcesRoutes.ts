import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createTechnicalResource, deleteTechnicalResource, getAllTechnicalResources, updateTechnicalResource } from "../controllers/technicalResourceController";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router()

router.get('/getalltechnicalresources', auth, getAllTechnicalResources)
router.post('/technicalresource', auth, isSuperAdmin, createTechnicalResource)
router.delete('/deletetechnicalresource', auth, isSuperAdmin, deleteTechnicalResource)
router.put('/updatetechnicalresource', auth, isSuperAdmin, updateTechnicalResource)

export { router }