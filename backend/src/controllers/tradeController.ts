import { Request, Response } from "express";
import { Trade } from "../models/Trade";

const getAllTrades = async (req: Request, res: Response) => {
  try {
    const trades = await Trade.find({
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
      relations: ["strategy"],
    });

    return res.status(200).json({
      success: true,
      message: "Trades retrieved",
      data: trades.map((trade) => ({
        id: trade.id,
        PNL: trade.PNL,
        status: trade.status,
        entry_price: trade.entry_price,
        amount: trade.amount,
        strategy_id: trade.strategy.name,
        created_at: trade.created_at,
        updated_at: trade.updated_at,
        strategy: {
          name: trade.strategy.name,
          user_id: trade.strategy.user_id,
        },
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving trades",
      error: error,
    });
  }
};

const getTradeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const userId = req.token.id;
    const trade = await Trade.findOne({
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
          id: true,
          name: true,
          user_id: true,
        },
      },
      where: {
        id: id,
        strategy: { user_id: userId },
      },
      relations: ["strategy"],
    });

    if (!trade) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }

    const niceView = {
      id: trade.id,
      PNL: trade.PNL,
      status: trade.status,
      entry_price: trade.entry_price,
      amount: trade.amount,
      strategy_id: trade.strategy.id,
      created_at: trade.created_at,
      updated_at: trade.updated_at,
      strategy: {
        name: trade.strategy.name,
        user_id: trade.strategy.user_id,
      },
    };

    return res.status(200).json({
      success: true,
      message: "Trade retrieved",
      data: niceView,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
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
        strategy: { user_id: userId },
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
