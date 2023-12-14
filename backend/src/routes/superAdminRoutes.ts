import { Router } from "express";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { createTechnicalResource, createTimeFrame, deleteUser, getAllUsers, updateUserRole } from "../controllers/superAdminController";

const router = Router()

router.get('/all', auth, isSuperAdmin, getAllUsers)
router.delete('/delete', auth, isSuperAdmin, deleteUser)
router.put('/update', auth, isSuperAdmin, updateUserRole)
router.get('/timeframe', auth, isSuperAdmin, createTimeFrame)
router.get('/technicalresource', auth, isSuperAdmin, createTechnicalResource)

export { router }