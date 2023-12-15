import { Router } from "express";
import { auth } from "../middlewares/auth";
import { createRole, deleteRole, getRoleById, getRoles, updateRole } from "../controllers/rolesController";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router()

router.get('/allRoles', auth, isSuperAdmin, getRoles)
router.get('/getRoleById', auth, isSuperAdmin, getRoleById)
router.post('/createRole', auth, isSuperAdmin, createRole)
router.put('/updateRole', auth, isSuperAdmin, updateRole)
router.delete('/deleteRole', auth, isSuperAdmin, deleteRole)

export { router }