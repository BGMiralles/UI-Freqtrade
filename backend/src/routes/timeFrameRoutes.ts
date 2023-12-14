import { Router } from "express";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { createTimeFrame, deleteTimeFrame, getAllTimeFrames } from "../controllers/timeFrameController";

const router = Router();


router.get('/getalltimeframes', auth, getAllTimeFrames);
router.post('/createtimeframe',auth, isSuperAdmin, createTimeFrame);
router.delete('/deletetimeframe', deleteTimeFrame);

export { router }
