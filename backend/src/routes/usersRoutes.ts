import { Router } from "express";
import { login, profile, register, updateUser } from "../controllers/usersController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { deleteUser, getAllUsers } from "../controllers/superAdminController";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', auth, profile)
router.put('/update', auth, updateUser)
router.get('/all', auth, isSuperAdmin, getAllUsers)
router.delete('/delete', auth, isSuperAdmin, deleteUser)

export { router }
