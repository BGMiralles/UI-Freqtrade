import { Router } from "express";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { createTimeFrame, deleteUser, getAllUsers, updateUserRole } from "../controllers/superAdminController";
import { createTechnicalResource, deleteTechnicalResource, updateTechnicalResource } from "../controllers/technicalResourceController";

const router = Router()

router.get('/all', auth, isSuperAdmin, getAllUsers)
router.delete('/delete', auth, isSuperAdmin, deleteUser)
router.put('/update', auth, isSuperAdmin, updateUserRole)
router.post('/timeframe', auth, isSuperAdmin, createTimeFrame)
router.post('/technicalresource', auth, isSuperAdmin, createTechnicalResource)
router.delete('/deletetechnicalresource', auth, isSuperAdmin, deleteTechnicalResource)
router.put('/updatetechnicalresource', auth, isSuperAdmin, updateTechnicalResource)


export { router }