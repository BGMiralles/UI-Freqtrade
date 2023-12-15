import { Request, Response } from "express";
import { Strategy } from "../models/Strategy";

const getAllStrategies = async (req: Request, res: Response) => {
  try {
    const strategies = await Strategy.find();
    res.status(200).json({
      sucess: true,
      message: "Strategies retrieved",
      data: strategies,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Error retrieving strategies",
      error: error,
    });
  }
};

const getStrategyById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const strategy = await Strategy.findOneBy(id);
    if (!strategy || strategy.user_id !== req.token.id) {
      return res.status(404).json({
        sucess: false,
        message: "Strategy not found",
      });
    }
    res.status(200).json({
      sucess: true,
      message: "Strategy retrieved",
      data: strategy,
    });
  } catch (error) {
    res.status(500).json({
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
    });
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
