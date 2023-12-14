import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getAllTechnicalResources } from "../controllers/technicalResourceController";

const router = Router()

router.get('/getalltechnicalresources', auth, getAllTechnicalResources)