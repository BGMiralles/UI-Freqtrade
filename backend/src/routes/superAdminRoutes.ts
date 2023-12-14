import { Router } from "express";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { deleteUser, getAllUsers } from "../controllers/superAdminController";

const router = Router()

router.get('/all', auth, isSuperAdmin, getAllUsers)
router.delete('/delete', auth, isSuperAdmin, deleteUser)

export { router }