import { Router } from "express";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { deleteUser, getAllUsers, updateUserRole } from "../controllers/superAdminController";
import { createTechnicalResource, deleteTechnicalResource, updateTechnicalResource } from "../controllers/technicalResourceController";

const router = Router()


router.put('/update', auth, isSuperAdmin, updateUserRole)



export { router }