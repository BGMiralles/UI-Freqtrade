import { Router } from "express";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { createTimeFrame, deleteTimeFrame, getAllTimeFrames } from "../controllers/timeFrameController";

const router = Router();


router.get('/getAllTimeFrames', auth, getAllTimeFrames);
router.post('/createTimeFrame',auth, isSuperAdmin, createTimeFrame);
router.delete('/deleteTimeFrame',auth, isSuperAdmin, deleteTimeFrame);

export { router }
