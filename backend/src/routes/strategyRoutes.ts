import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  createStrategy,
  deleteStrategy,
  getAllStrategies,
  getStrategyById,
  updateStrategy,
} from "../controllers/strategyController";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router();

router.get("/allStrategies", auth, isSuperAdmin, getAllStrategies);
router.get("/getStrategyById", auth, getStrategyById);
router.post("/createStrategy", auth, createStrategy);
router.put("/updateStrategy", auth, updateStrategy);
router.delete("/deleteStrategy", auth, deleteStrategy);

export { router };
