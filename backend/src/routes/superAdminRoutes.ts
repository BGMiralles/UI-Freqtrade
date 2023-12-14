import { Router } from "express";
import { getAllUsers } from "../controllers/usersController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router()

router.get('/all', auth, isSuperAdmin, getAllUsers)

export { router }