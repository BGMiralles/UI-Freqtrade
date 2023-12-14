import { Router } from "express";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { createTechnicalResource, createTimeFrame, deleteTechnicalResource, deleteUser, getAllTechnicalResources, getAllUsers, updateTechnicalResource, updateUserRole } from "../controllers/superAdminController";

const router = Router()

router.get('/all', auth, isSuperAdmin, getAllUsers)
router.delete('/delete', auth, isSuperAdmin, deleteUser)
router.put('/update', auth, isSuperAdmin, updateUserRole)
router.post('/timeframe', auth, isSuperAdmin, createTimeFrame)
router.post('/technicalresource', auth, isSuperAdmin, createTechnicalResource)
router.delete('/deletetechnicalresource', auth, isSuperAdmin, deleteTechnicalResource)
router.put('/updatetechnicalresource', auth, isSuperAdmin, updateTechnicalResource)


export { router }