import { Router } from "express";
import { login, profile, register } from "../controllers/usersController";
import { auth } from "../middlewares/auth";

const router = Router()

router.post('/register', register)
router.post('/login', login)

router.get('/profile', auth, profile)

export { router }
