import { Request, Response } from "express";
import { Trade } from "../models/Trade";

const getAllTrades = async (req: Request, res: Response) => {
  try {
    const trade = await Trade.find();
    return res.status(200).json({
      sucess: true,
      message: "Trades retrieved",
      data: trade,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error retrieving trades",
      error: error,
    });
  }
};

const getTradeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const userId = req.token.id;
    const transaction = await Trade.findOne({
      select: {
        id: true,
        PNL: true,
        status: true,
        entry_price: true,
        amount: true,
        strategy_id: true,
        created_at: true,
        updated_at: true,
        strategy: {
          name: true,
          user_id: true,
        },
      },
      where: {
        id: id,
        user_id: userId,
      } as any,
      relations: ["strategy"],
    });

    if (!transaction) {
      return res.status(404).json({
        sucess: false,
        message: "Trade not found",
      });
    }

    return res.status(200).json({
      sucess: true,
      message: "Trade retrieved",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error retrieving trade",
      error: error,
    });
  }
};

const createTrade = async (req: Request, res: Response) => {
  const { PNL, status, entry_price, amount, strategy_id } = req.body;
  try {
    const newTransaction = await Trade.create({
      PNL,
      status,
      entry_price,
      amount,
      strategy_id,
    }).save();
    return res.status(201).json({
      sucess: true,
      message: "Trade created",
      data: newTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error creating transaction",
      error: error,
    });
  }
};

const deleteTrade = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const userId = req.token.id;
    const deletedTrade = await Trade.findOne({
      select: {
        id: true,
        PNL: true,
        status: true,
        entry_price: true,
        amount: true,
        strategy_id: true,
        created_at: true,
        updated_at: true,
        strategy: {
          name: true,
          user_id: true,
        },
      },
      where: {
        id: id,
        user_id: userId,
      } as any,
      relations: ["strategy"],
    });
    if (!deletedTrade) {
      return res.status(404).json({
        sucess: false,
        message: "Transaction not found",
      });
    }
    await Trade.delete(id);
    return res.status(200).json({
      sucess: true,
      message: "Transaction deleted successfully",
      data: deletedTrade,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error deleting transaction",
      error: error,
    });
  }
};

export { deleteTrade, createTrade, getTradeById, getAllTrades };
