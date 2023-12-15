import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  createTrade,
  deleteTrade,
  getAllTrades,
  getTradeById,
} from "../controllers/tradeController";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";

const router = Router();

router.get("/getalltrades", auth, isSuperAdmin, getAllTrades);
router.get("/getTradeById", auth, getTradeById);
router.post("/createtrade", auth, createTrade);
router.delete("/deletetrade", auth, deleteTrade);

export { router };
