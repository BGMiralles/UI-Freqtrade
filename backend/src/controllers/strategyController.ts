import { Request, Response } from "express";
import { Strategy } from "../models/Strategy";

const getAllStrategies = async (req: Request, res: Response) => {
  try {
    const strategies = await Strategy.find({
      select: {
        id: true,
        name: true,
        description: true,
        user_id: true,
        buy_signal_id: true,
        sell_signal_id: true,
        time_frame_id: true,
        created_at: true,
        updated_at: true,
      },
      relations: ["BuySignals", "SellSignals", "TimeFrames"],
    });

    const niceView = strategies.map((strate) => ({
      id: strate.id,
      name: strate.name,
      description: strate.description,
      buy_technical_id: Array.isArray(strate.buySignal)
        ? strate.buySignal.map((bt) => bt.technicalResource.name)
        : [],
      sell_technical_id: Array.isArray(strate.sellSignal)
        ? strate.sellSignal.map((bt) => bt.technicalResource.name)
        : [],
      time_frame_id: strate.timeFrame.time_frame,
      created_at: strate.created_at,
      updated_at: strate.updated_at,
    }));
    return res.status(200).json({
      sucess: true,
      message: "Strategies retrieved",
      data: niceView,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error retrieving strategies",
      error: error,
    });
  }
};

const getStrategyById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const strategy = await Strategy.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        user_id: true,
        buy_signal_id: true,
        sell_signal_id: true,
        time_frame_id: true,
        created_at: true,
        updated_at: true,
      },
      relations: ["BuySignals", "SellSignals", "TimeFrames"],
    });
    if (!strategy || strategy.user_id !== req.token.id) {
      return res.status(404).json({
        sucess: false,
        message: "Strategy not found",
      });
    }
    const niceView = {
      id: strategy.id,
      name: strategy.name,
      description: strategy.description,
      buy_technical_id: Array.isArray(strategy.buySignal)
        ? strategy.buySignal.map((bt) => bt.technicalResource.name)
        : [],
      sell_technical_id: Array.isArray(strategy.sellSignal)
        ? strategy.sellSignal.map((bt) => bt.technicalResource.name)
        : [],
      time_frame_id: strategy.timeFrame.time_frame,
      created_at: strategy.created_at,
      updated_at: strategy.updated_at,
    };
    return res.status(200).json({
      sucess: true,
      message: "Strategy retrieved",
      data: niceView,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error retrieving strategy",
      error: error,
    });
  }
};

const createStrategy = async (req: Request, res: Response) => {
  const { name, description, buy_signal_id, sell_signal_id, time_frame_id } =
    req.body;
  try {
    const strategy = await Strategy.create({
      name,
      description,
      user_id: req.token.id,
      buy_signal_id,
      sell_signal_id,
      time_frame_id,
    }).save();
    return res.status(201).json({
      sucess: true,
      message: "Strategy created",
      data: strategy,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error creating strategy",
      error: error,
    });
  }
};

const updateStrategy = async (req: Request, res: Response) => {
  const {
    id,
    name,
    description,
    buy_signal_id,
    sell_signal_id,
    time_frame_id,
  } = req.body;
  try {
    const strategy = await Strategy.findOneBy({
      id,
    });
    if (!strategy || strategy.user_id !== req.token.id) {
      return res.status(404).json({
        sucess: false,
        message: "Strategy not found",
      });
    }
    if (name) {
      strategy.name = name;
    }
    if (description) {
      strategy.description = description;
    }
    if (buy_signal_id) {
      strategy.buy_signal_id = buy_signal_id;
    }
    if (sell_signal_id) {
      strategy.sell_signal_id = sell_signal_id;
    }
    if (time_frame_id) {
      strategy.time_frame_id = time_frame_id;
    }
    await strategy.save();
    return res.status(200).json({
      sucess: true,
      message: "Strategy updated",
      data: strategy,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error updating strategy",
      error: error,
    });
  }
};

const deleteStrategy = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const strategy = await Strategy.findOneBy(id);
    if (!strategy || strategy.user_id !== req.token.id) {
      return res.status(404).json({
        sucess: false,
        message: "Strategy not found",
      });
    }
    return res.status(200).json({
      sucess: true,
      message: "Strategy deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Error deleting strategy",
      error: error,
    });
  }
};

export {
  deleteStrategy,
  getAllStrategies,
  getStrategyById,
  createStrategy,
  updateStrategy,
};
